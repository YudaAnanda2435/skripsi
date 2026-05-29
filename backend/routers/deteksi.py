import base64
import traceback
from pathlib import Path

import cv2
import numpy as np
import torch

from fastapi import APIRouter, HTTPException, UploadFile, File
from sahi import AutoDetectionModel
from sahi.predict import get_sliced_prediction


router = APIRouter(tags=["Deteksi AI"])


# =========================
# Konfigurasi Model
# =========================

MODEL_PATH = "best.pt"

# Threshold awal untuk menekan false positive batang/daun
CONFIDENCE_THRESHOLD = 0.66
# CONFIDENCE_THRESHOLD = 0.665

SLICE_HEIGHT = 1024
SLICE_WIDTH = 1024

OVERLAP_HEIGHT_RATIO = 0.15
OVERLAP_WIDTH_RATIO = 0.15

POSTPROCESS_TYPE = "GREEDYNMM"
# POSTPROCESS_MATCH_METRIC = "IOS"
POSTPROCESS_MATCH_METRIC = "IOU"
POSTPROCESS_MATCH_THRESHOLD = 0.20

MIN_BOX_AREA_RATIO = 0.00010
MIN_BOX_AREA_ABS = 1500
MAX_ASPECT_RATIO = 8
MIN_SHORT_SIDE = 16

DUPLICATE_IOS_THRESHOLD = 0.60

USE_COLOR_FILTER = True

# MIN_CHILI_COLOR_RATIO = 0.14
# MIN_CENTER_CHILI_RATIO = 0.14
# MAX_GREEN_DOMINANT_RATIO = 0.60

# STEM_ASPECT_RATIO_LIMIT = 3.5
# MIN_CHILI_RATIO_FOR_LONG_OBJECT = 0.28

# MIN_CHILI_COLOR_RATIO = 0.16
# MIN_CENTER_CHILI_RATIO = 0.16
# MAX_GREEN_DOMINANT_RATIO = 0.55
# STEM_ASPECT_RATIO_LIMIT = 3.0
# MIN_CHILI_RATIO_FOR_LONG_OBJECT = 0.32

MIN_CHILI_COLOR_RATIO = 0.12
MIN_CENTER_CHILI_RATIO = 0.12
MAX_CENTER_GREEN_RATIO = 0.55

STEM_ASPECT_RATIO_LIMIT = 2.8
MIN_CHILI_RATIO_FOR_LONG_OBJECT = 0.25

# USE_COLOR_FILTER = True
# MIN_CHILI_COLOR_RATIO = 0.10
# MIN_CENTER_CHILI_RATIO = 0.12
# MAX_GREEN_DOMINANT_RATIO = 0.65
# MIN_CHILI_COLOR_RATIO = 0.06
# MAX_GREEN_DOMINANT_RATIO = 0.78


def get_device():
    """
    Memilih device secara otomatis.
    Jika GPU tersedia tetapi VRAM kecil, sistem memakai CPU agar lebih stabil.
    """
    if torch.cuda.is_available():
        gpu_memory_gb = torch.cuda.get_device_properties(0).total_memory / (1024 ** 3)
        gpu_name = torch.cuda.get_device_name(0)

        print(f"GPU terdeteksi: {gpu_name}")
        print(f"VRAM GPU: {gpu_memory_gb:.2f} GB")

        if gpu_memory_gb >= 4:
            print("Device yang digunakan: cuda:0")
            return "cuda:0"

        print("VRAM GPU kurang dari 4 GB. Sistem memakai CPU agar lebih stabil.")
        return "cpu"

    print("GPU tidak tersedia. Sistem memakai CPU.")
    return "cpu"


def box_ios(box_a, box_b):
    """
    Menghitung Intersection over Smaller Area.
    Digunakan untuk menghapus bbox ganda pada objek yang sama.
    """
    ax1, ay1, ax2, ay2 = box_a
    bx1, by1, bx2, by2 = box_b

    inter_x1 = max(ax1, bx1)
    inter_y1 = max(ay1, by1)
    inter_x2 = min(ax2, bx2)
    inter_y2 = min(ay2, by2)

    inter_w = max(0, inter_x2 - inter_x1)
    inter_h = max(0, inter_y2 - inter_y1)
    inter_area = inter_w * inter_h

    area_a = max((ax2 - ax1) * (ay2 - ay1), 1)
    area_b = max((bx2 - bx1) * (by2 - by1), 1)

    return inter_area / min(area_a, area_b)


def suppress_duplicate_detections(detections, ios_threshold=0.60):
    """
    Menghapus bbox ganda berdasarkan skor confidence tertinggi.
    """
    detections = sorted(detections, key=lambda x: x["akurasi"], reverse=True)
    final_detections = []

    for det in detections:
        box_det = (
            det["bbox"]["x_min"],
            det["bbox"]["y_min"],
            det["bbox"]["x_max"],
            det["bbox"]["y_max"]
        )

        is_duplicate = False

        for kept in final_detections:
            box_kept = (
                kept["bbox"]["x_min"],
                kept["bbox"]["y_min"],
                kept["bbox"]["x_max"],
                kept["bbox"]["y_max"]
            )

            if box_ios(box_det, box_kept) > ios_threshold:
                is_duplicate = True
                break

        if not is_duplicate:
            final_detections.append(det)

    return final_detections

# def has_chili_like_color(img_bgr, x1, y1, x2, y2):
#     crop = img_bgr[y1:y2, x1:x2]

#     if crop.size == 0:
#         return False

#     hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)

#     h = hsv[:, :, 0]
#     s = hsv[:, :, 1]
#     v = hsv[:, :, 2]

#     # Rentang warna cabai rawit pada dataset: kuning, kuning kehijauan, oranye
#     yellow_mask = (h >= 18) & (h <= 45) & (s >= 30) & (v >= 90)
#     orange_mask = (h >= 5) & (h < 18) & (s >= 45) & (v >= 90)
#     pale_yellow_mask = (h >= 35) & (h <= 55) & (s >= 20) & (v >= 130)

#     chili_mask = yellow_mask | orange_mask | pale_yellow_mask
#     chili_ratio = np.count_nonzero(chili_mask) / chili_mask.size

#     # Area hijau dominan, biasanya daun atau rumput
#     green_mask = (h >= 45) & (h <= 85) & (s >= 25) & (v >= 50)
#     green_ratio = np.count_nonzero(green_mask) / green_mask.size

#     if chili_ratio < MIN_CHILI_COLOR_RATIO and green_ratio > MAX_GREEN_DOMINANT_RATIO:
#         return False

#     return True

def has_chili_like_color(img_bgr, x1, y1, x2, y2):
    crop = img_bgr[y1:y2, x1:x2]

    if crop.size == 0:
        return False

    crop_h, crop_w = crop.shape[:2]

    if crop_h <= 0 or crop_w <= 0:
        return False

    hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)

    h = hsv[:, :, 0]
    s = hsv[:, :, 1]
    v = hsv[:, :, 2]

    # Warna cabai rawit: kuning, kuning pucat, oranye.
    # Saturation dibuat lebih ketat agar batang hijau pucat tidak mudah lolos.
    yellow_mask = (h >= 18) & (h <= 45) & (s >= 45) & (v >= 100)
    orange_mask = (h >= 5) & (h < 18) & (s >= 50) & (v >= 100)
    pale_yellow_mask = (h >= 28) & (h <= 50) & (s >= 45) & (v >= 130)

    chili_mask = yellow_mask | orange_mask | pale_yellow_mask
    chili_ratio = np.count_nonzero(chili_mask) / chili_mask.size

    # Mask hijau untuk daun, rumput, dan batang
    green_mask = (h >= 45) & (h <= 90) & (s >= 25) & (v >= 50)
    green_ratio = np.count_nonzero(green_mask) / green_mask.size

    # Area tengah bbox
    cx1 = int(crop_w * 0.25)
    cy1 = int(crop_h * 0.25)
    cx2 = int(crop_w * 0.75)
    cy2 = int(crop_h * 0.75)

    center_chili_mask = chili_mask[cy1:cy2, cx1:cx2]
    center_green_mask = green_mask[cy1:cy2, cx1:cx2]

    if center_chili_mask.size == 0:
        center_chili_ratio = 0
        center_green_ratio = 0
    else:
        center_chili_ratio = np.count_nonzero(center_chili_mask) / center_chili_mask.size
        center_green_ratio = np.count_nonzero(center_green_mask) / center_green_mask.size

    # Hitung bentuk bbox
    box_w = x2 - x1
    box_h = y2 - y1

    if box_w <= 0 or box_h <= 0:
        return False

    short_side = min(box_w, box_h)
    long_side = max(box_w, box_h)
    aspect_ratio = long_side / max(short_side, 1)

    # Aturan 1: objek harus punya warna cabai yang cukup
    if chili_ratio < MIN_CHILI_COLOR_RATIO:
        return False

    # Aturan 2: bagian tengah bbox harus mengandung warna cabai
    if center_chili_ratio < MIN_CENTER_CHILI_RATIO:
        return False

    # Aturan 3: jika bagian tengah dominan hijau, tolak
    if center_green_ratio > MAX_CENTER_GREEN_RATIO and center_chili_ratio < 0.18:
        return False

    # Aturan 4: objek memanjang seperti batang harus punya warna cabai lebih kuat
    if aspect_ratio >= STEM_ASPECT_RATIO_LIMIT and chili_ratio < MIN_CHILI_RATIO_FOR_LONG_OBJECT:
        return False

    return True


DEVICE = get_device()

if not Path(MODEL_PATH).exists():
    raise FileNotFoundError(f"Model tidak ditemukan: {MODEL_PATH}")


# Model dipanggil satu kali saat server berjalan
detection_model = AutoDetectionModel.from_pretrained(
    model_type="yolov8",
    model_path=MODEL_PATH,
    confidence_threshold=CONFIDENCE_THRESHOLD,
    device=DEVICE
)


@router.post("/deteksi")
async def deteksi_cabai(file: UploadFile = File(...)):
    try:
        allowed_types = ["image/jpeg", "image/jpg", "image/png"]

        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail="Format file tidak didukung. Gunakan JPG, JPEG, atau PNG."
            )

        contents = await file.read()

        if not contents:
            raise HTTPException(
                status_code=400,
                detail="File gambar kosong."
            )

        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(
                status_code=400,
                detail="Gagal membaca gambar."
            )

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_h, img_w = img.shape[:2]
        img_area = img_h * img_w

        result = get_sliced_prediction(
    img_rgb,
    detection_model,
    slice_height=SLICE_HEIGHT,
    slice_width=SLICE_WIDTH,
    overlap_height_ratio=OVERLAP_HEIGHT_RATIO,
    overlap_width_ratio=OVERLAP_WIDTH_RATIO,
    perform_standard_pred=True,
    postprocess_type=POSTPROCESS_TYPE,
    postprocess_match_metric=POSTPROCESS_MATCH_METRIC,
    postprocess_match_threshold=POSTPROCESS_MATCH_THRESHOLD,
    postprocess_class_agnostic=True
)

        raw_detections = []

        for annotation in result.object_prediction_list:
            bbox = annotation.bbox
            conf = float(annotation.score.value)
            kelas = annotation.category.name

            x1 = max(int(bbox.minx), 0)
            y1 = max(int(bbox.miny), 0)
            x2 = min(int(bbox.maxx), img_w)
            y2 = min(int(bbox.maxy), img_h)

            box_w = x2 - x1
            box_h = y2 - y1
            box_area = box_w * box_h

            # Lewati bbox yang tidak valid
            if box_w <= 0 or box_h <= 0:
                continue

            # Filter bbox terlalu kecil
            min_box_area = max(
                MIN_BOX_AREA_ABS,
                int(img_area * MIN_BOX_AREA_RATIO)
            )

            if box_area < min_box_area:
                continue

            # Filter sisi pendek terlalu kecil
            short_side = min(box_w, box_h)
            long_side = max(box_w, box_h)

            if short_side < MIN_SHORT_SIDE:
                continue

            # Filter bentuk terlalu ekstrem
            aspect_ratio = long_side / max(short_side, 1)

            if aspect_ratio > MAX_ASPECT_RATIO:
                continue
            
            if USE_COLOR_FILTER and not has_chili_like_color(img, x1, y1, x2, y2): 
                continue

            raw_detections.append({
                "kelas": kelas,
                "akurasi": round(conf, 4),
                "bbox": {
                    "x_min": x1,
                    "y_min": y1,
                    "x_max": x2,
                    "y_max": y2
                }
            })

        # Hapus bbox ganda setelah semua deteksi terkumpul
        daftar_deteksi = suppress_duplicate_detections(
            raw_detections,
            ios_threshold=DUPLICATE_IOS_THRESHOLD
        )
        
        

        # Gambar bbox final
        warna_kotak = (0, 0, 255)  # Merah dalam format BGR OpenCV
        tebal_garis = 3

        for det in daftar_deteksi:
            x1 = det["bbox"]["x_min"]
            y1 = det["bbox"]["y_min"]
            x2 = det["bbox"]["x_max"]
            y2 = det["bbox"]["y_max"]
            kelas = det["kelas"]
            conf = det["akurasi"]

            cv2.rectangle(
                img,
                (x1, y1),
                (x2, y2),
                warna_kotak,
                tebal_garis
            )

            label = f"{kelas} {conf:.2f}"

            cv2.putText(
                img,
                label,
                (x1, max(y1 - 10, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                warna_kotak,
                2
            )

        success, buffer = cv2.imencode(".jpg", img)

        if not success:
            raise HTTPException(
                status_code=500,
                detail="Gagal mengubah hasil deteksi menjadi gambar."
            )

        img_base64 = base64.b64encode(buffer).decode("utf-8")

        return {
            "total_cabai": len(daftar_deteksi),
            "hasil": daftar_deteksi,
            "gambar_hasil": f"data:image/jpeg;base64,{img_base64}"
        }

    except HTTPException:
        raise

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))