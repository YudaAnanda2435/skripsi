import jsPDF from "jspdf";
import { PDF_SAMPLES, formatRupiah, hitungCabaiPerSampel } from "./buktiAnalisaUtils";

const normalisasiFotoPdf = (foto) => {
  if (!foto) return null;
  return foto.startsWith("data:image")
    ? foto
    : `data:image/jpeg;base64,${foto}`;
};

const tambahTeksPdf = (pdf, teks, x, y, opsi = {}) => {
  const {
    size = 10,
    color = [28, 28, 23],
    style = "normal",
    maxWidth,
    lineHeight = 5,
  } = opsi;

  pdf.setFont("helvetica", style);
  pdf.setFontSize(size);
  pdf.setTextColor(...color);

  if (maxWidth) {
    const lines = pdf.splitTextToSize(String(teks), maxWidth);
    pdf.text(lines, x, y, { lineHeightFactor: lineHeight / size });
    return y + lines.length * lineHeight;
  }

  pdf.text(String(teks), x, y);
  return y + lineHeight;
};

const tambahKartuPdf = (pdf, x, y, width, height, fill = [255, 255, 255]) => {
  pdf.setFillColor(...fill);
  pdf.setDrawColor(193, 200, 194);
  pdf.setLineWidth(0.25);
  pdf.roundedRect(x, y, width, height, 3, 3, "FD");
};

const tambahFotoPdf = (pdf, foto, x, y, width, height) => {
  tambahKartuPdf(pdf, x, y, width, height, [246, 243, 235]);

  if (!foto) {
    tambahTeksPdf(pdf, "Tidak ada gambar tersimpan", x + 8, y + height / 2, {
      size: 9,
      color: [113, 121, 115],
    });
    return;
  }

  try {
    const props = pdf.getImageProperties(foto);
    const rasioGambar = props.width / props.height;
    const rasioKotak = width / height;
    let imgWidth = width;
    let imgHeight = height;
    let imgX = x;
    let imgY = y;

    if (rasioGambar > rasioKotak) {
      imgHeight = width / rasioGambar;
      imgY = y + (height - imgHeight) / 2;
    } else {
      imgWidth = height * rasioGambar;
      imgX = x + (width - imgWidth) / 2;
    }

    pdf.addImage(
      foto,
      props.fileType || "JPEG",
      imgX,
      imgY,
      imgWidth,
      imgHeight,
    );
  } catch (error) {
    console.error("Gagal memasukkan foto ke PDF:", error);
    tambahTeksPdf(
      pdf,
      "Gambar tidak dapat dimuat ke PDF",
      x + 8,
      y + height / 2,
      {
        size: 9,
        color: [186, 26, 26],
      },
    );
  }
};

export const buatLaporanPdf = async (buktiAktif, showToast) => {
  if (!buktiAktif) return;

  try {
    showToast("Sedang menyusun laporan PDF...", "info");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    pdf.setProperties({
      title: `Laporan YOLOv8 - ${buktiAktif.lahan}`,
      subject: "Bukti Analisa Scan Panen ChiliVision",
      author: "ChiliVision",
    });

    pdf.setFillColor(252, 249, 241);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    pdf.setFillColor(23, 61, 45);
    pdf.roundedRect(margin, 14, contentWidth, 42, 4, 4, "F");
    tambahTeksPdf(pdf, "CHILIVISION", margin + 8, 25, {
      size: 9,
      color: [194, 236, 213],
      style: "bold",
    });
    tambahTeksPdf(pdf, "Laporan Bukti Analisa YOLOv8", margin + 8, 37, {
      size: 18,
      color: [255, 255, 255],
      style: "bold",
    });
    tambahTeksPdf(
      pdf,
      `${buktiAktif.tanggal}, ${buktiAktif.waktu}`,
      margin + 8,
      48,
      {
        size: 10,
        color: [243, 241, 233],
      },
    );

    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(145, 22, 38, 24, 3, 3, "F");
    tambahTeksPdf(pdf, "Tervalidasi", 152, 31, {
      size: 8,
      color: [49, 105, 71],
      style: "bold",
    });
    tambahTeksPdf(pdf, "YOLOv8", 155, 40, {
      size: 13,
      color: [0, 39, 25],
      style: "bold",
    });

    tambahKartuPdf(pdf, margin, 66, 86, 42);
    tambahTeksPdf(pdf, "Pemilik / Lahan", margin + 7, 78, {
      size: 9,
      color: [65, 72, 68],
      style: "bold",
    });
    tambahTeksPdf(pdf, buktiAktif.lahan, margin + 7, 91, {
      size: 18,
      color: [0, 39, 25],
      style: "bold",
      maxWidth: 70,
      lineHeight: 7,
    });

    tambahKartuPdf(pdf, margin + 94, 66, 88, 42);
    tambahTeksPdf(pdf, "Estimasi Total Panen", margin + 101, 78, {
      size: 9,
      color: [65, 72, 68],
      style: "bold",
    });
    tambahTeksPdf(
      pdf,
      `${formatRupiah(buktiAktif.estimasiTonase)} Kg`,
      margin + 101,
      94,
      {
        size: 24,
        color: [0, 39, 25],
        style: "bold",
      },
    );

    tambahKartuPdf(pdf, margin, 116, 56, 36);
    tambahTeksPdf(pdf, "Jumlah Tanaman", margin + 6, 128, {
      size: 8,
      color: [65, 72, 68],
      style: "bold",
    });
    tambahTeksPdf(
      pdf,
      `${formatRupiah(buktiAktif.populasi)} Pohon`,
      margin + 6,
      142,
      {
        size: 15,
        color: [28, 28, 23],
        style: "bold",
      },
    );

    tambahKartuPdf(pdf, margin + 63, 116, 56, 36);
    tambahTeksPdf(pdf, "Total Cabai", margin + 69, 128, {
      size: 8,
      color: [65, 72, 68],
      style: "bold",
    });
    tambahTeksPdf(
      pdf,
      `${formatRupiah(buktiAktif.cabaiTerdeteksi)} cabai`,
      margin + 69,
      142,
      {
        size: 15,
        color: [28, 28, 23],
        style: "bold",
      },
    );

    tambahKartuPdf(pdf, margin + 126, 116, 56, 36);
    tambahTeksPdf(pdf, "Potensi Pendapatan", margin + 132, 128, {
      size: 8,
      color: [65, 72, 68],
      style: "bold",
    });
    tambahTeksPdf(
      pdf,
      `Rp ${formatRupiah(buktiAktif.potensiPendapatan)}`,
      margin + 132,
      142,
      {
        size: 13,
        color: [0, 39, 25],
        style: "bold",
      },
    );

    tambahKartuPdf(pdf, margin, 162, contentWidth, 54);
    tambahTeksPdf(pdf, "Parameter Perhitungan AI", margin + 7, 175, {
      size: 11,
      color: [0, 39, 25],
      style: "bold",
    });
    tambahKartuPdf(pdf, margin + 7, 184, 80, 22, [246, 243, 235]);
    tambahTeksPdf(pdf, "Berat Rata-rata per Cabai", margin + 13, 193, {
      size: 8,
      color: [65, 72, 68],
    });
    tambahTeksPdf(
      pdf,
      `${formatRupiah(buktiAktif.parameter.beratRata)} Gram`,
      margin + 13,
      202,
      {
        size: 13,
        color: [28, 28, 23],
        style: "bold",
      },
    );
    tambahKartuPdf(pdf, margin + 94, 184, 81, 22, [246, 243, 235]);
    tambahTeksPdf(pdf, "Nomor Dokumen", margin + 100, 193, {
      size: 8,
      color: [65, 72, 68],
    });
    tambahTeksPdf(pdf, `#${buktiAktif.id}`, margin + 100, 202, {
      size: 13,
      color: [28, 28, 23],
      style: "bold",
    });

    tambahKartuPdf(pdf, margin, 226, contentWidth, 43);
    tambahTeksPdf(pdf, "Proporsi Kondisi Tanaman", margin + 7, 239, {
      size: 11,
      color: [0, 39, 25],
      style: "bold",
    });
    const barX = margin + 7;
    const barY = 247;
    const barWidth = contentWidth - 14;
    pdf.setFillColor(49, 105, 71);
    pdf.roundedRect(
      barX,
      barY,
      barWidth * (Number(buktiAktif.parameter.lebat) / 100),
      6,
      2,
      2,
      "F",
    );
    pdf.setFillColor(245, 158, 11);
    pdf.rect(
      barX + barWidth * (Number(buktiAktif.parameter.lebat) / 100),
      barY,
      barWidth * (Number(buktiAktif.parameter.sedang) / 100),
      6,
      "F",
    );
    pdf.setFillColor(234, 88, 12);
    pdf.roundedRect(
      barX +
        barWidth *
          ((Number(buktiAktif.parameter.lebat) +
            Number(buktiAktif.parameter.sedang)) /
            100),
      barY,
      barWidth * (Number(buktiAktif.parameter.kurang) / 100),
      6,
      2,
      2,
      "F",
    );
    tambahTeksPdf(pdf, `${buktiAktif.parameter.lebat}% Lebat`, barX, 263, {
      size: 8,
    });
    tambahTeksPdf(
      pdf,
      `${buktiAktif.parameter.sedang}% Sedang`,
      barX + 70,
      263,
      { size: 8 },
    );
    tambahTeksPdf(
      pdf,
      `${buktiAktif.parameter.kurang}% Kurang`,
      barX + 140,
      263,
      { size: 8 },
    );

    pdf.addPage();
    pdf.setFillColor(252, 249, 241);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");
    tambahTeksPdf(pdf, "Visualisasi Sampel YOLOv8", margin, 24, {
      size: 18,
      color: [0, 39, 25],
      style: "bold",
    });
    tambahTeksPdf(
      pdf,
      "Foto bukti analisa yang sudah diproses dan diberi deteksi oleh AI.",
      margin,
      34,
      {
        size: 10,
        color: [65, 72, 68],
        maxWidth: contentWidth,
      },
    );

    const jumlahCabaiPerSampel = hitungCabaiPerSampel(buktiAktif);
    let posisiY = 46;
    PDF_SAMPLES.forEach((item) => {
      const foto = normalisasiFotoPdf(buktiAktif.foto?.[item.id]);
      const jumlahCabai = jumlahCabaiPerSampel[item.id] || 0;

      tambahKartuPdf(pdf, margin, posisiY, contentWidth, 76);
      tambahTeksPdf(pdf, item.label, margin + 7, posisiY + 11, {
        size: 12,
        color: item.color,
        style: "bold",
      });
      tambahTeksPdf(
        pdf,
        `${formatRupiah(jumlahCabai)} cabai terdeteksi`,
        margin + 7,
        posisiY + 20,
        {
          size: 10,
          color: [0, 39, 25],
          style: "bold",
        },
      );
      tambahTeksPdf(
        pdf,
        `Kepercayaan Deteksi: ${item.confidence}%`,
        margin + 72,
        posisiY + 20,
        {
          size: 9,
          color: [65, 72, 68],
        },
      );
      tambahFotoPdf(pdf, foto, margin + 7, posisiY + 27, contentWidth - 14, 43);
      posisiY += 80;
    });

    tambahTeksPdf(
      pdf,
      `Dokumen nomor ${buktiAktif.id}. Dibuat otomatis oleh sistem AI ChiliVision.`,
      margin,
      286,
      {
        size: 8,
        color: [113, 121, 115],
        maxWidth: contentWidth,
      },
    );
    const namaFile = `Laporan_YOLOv8_${buktiAktif.lahan.replace(/\s+/g, "_")}_${buktiAktif.tanggal.replace(/\s+/g, "")}.pdf`;
    pdf.save(namaFile);
    showToast("Laporan PDF berhasil dibuat.", "success");
  } catch (error) {
    console.error("Gagal membuat PDF:", error);
    showToast("Terjadi kesalahan saat menyusun dokumen PDF.", "error");
  }
};
