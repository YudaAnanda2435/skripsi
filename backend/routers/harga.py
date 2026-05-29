from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from core.database import get_db
from models import user as models_user
from schemas import user as schemas_user
from routers.auth import get_current_user

router = APIRouter(prefix="/harga", tags=["Harga Pasar"])

def dapatkan_waktu_sekarang():
    return datetime.now().strftime("%d %B %Y, %H:%M")

@router.post("", response_model=schemas_user.HargaResponse)
def tambah_varietas_baru(
    data_harga: schemas_user.HargaCreate, 
    db: Session = Depends(get_db), 
    pengguna: models_user.User = Depends(get_current_user)
):
    waktu_sekarang = dapatkan_waktu_sekarang()
    
    # 1. Simpan harga utama
    harga_baru = models_user.Harga(
        user_id=pengguna.id,
        varietas=data_harga.varietas,
        harga=data_harga.harga,
        terakhir_update=waktu_sekarang,
        tren="tetap",
        selisih=0
    )
    db.add(harga_baru)
    
    # 2. Catat ke riwayat
    riwayat_baru = models_user.RiwayatHarga(
        user_id=pengguna.id,
        varietas=data_harga.varietas,
        harga=data_harga.harga,
        tanggal=waktu_sekarang
    )
    db.add(riwayat_baru)
    
    db.commit()
    db.refresh(harga_baru)
    return harga_baru

@router.get("", response_model=list[schemas_user.HargaResponse])
def baca_daftar_harga(db: Session = Depends(get_db), pengguna: models_user.User = Depends(get_current_user)):
    return db.query(models_user.Harga).filter(models_user.Harga.user_id == pengguna.id).order_by(models_user.Harga.id.desc()).all()

@router.get("/riwayat", response_model=list[schemas_user.RiwayatHargaResponse])
def baca_riwayat_harga(db: Session = Depends(get_db), pengguna: models_user.User = Depends(get_current_user)):
    return db.query(models_user.RiwayatHarga).filter(models_user.RiwayatHarga.user_id == pengguna.id).order_by(models_user.RiwayatHarga.id.desc()).all()

@router.get("/varietas/{nama_varietas}")
def ambil_harga_berdasarkan_varietas(
    nama_varietas: str, 
    db: Session = Depends(get_db),
    pengguna: models_user.User = Depends(get_current_user)
):
    # Cari harga milik pengguna aktif dengan varietas yang sesuai
    data_harga = db.query(models_user.Harga).filter(
        models_user.Harga.user_id == pengguna.id,
        models_user.Harga.varietas == nama_varietas
    ).first()

    if not data_harga:
        raise HTTPException(status_code=404, detail="Harga untuk varietas ini belum diatur.")

    return {"harga": data_harga.harga}

@router.put("/{harga_id}", response_model=schemas_user.HargaResponse)
def perbarui_harga(
    harga_id: int, 
    data_update: schemas_user.HargaUpdate, 
    db: Session = Depends(get_db), 
    pengguna: models_user.User = Depends(get_current_user)
):
    harga_lama = db.query(models_user.Harga).filter(models_user.Harga.id == harga_id, models_user.Harga.user_id == pengguna.id).first()
    
    if not harga_lama:
        raise HTTPException(status_code=404, detail="Data harga tidak ditemukan")

    waktu_sekarang = dapatkan_waktu_sekarang()

    # 1. Update harga utama
    harga_lama.harga = data_update.harga
    harga_lama.tren = data_update.tren
    harga_lama.selisih = data_update.selisih
    harga_lama.terakhir_update = waktu_sekarang

    # 2. Catat perubahan ke riwayat
    riwayat_baru = models_user.RiwayatHarga(
        user_id=pengguna.id,
        varietas=harga_lama.varietas,
        harga=data_update.harga,
        tanggal=waktu_sekarang
    )
    db.add(riwayat_baru)

    db.commit()
    db.refresh(harga_lama)
    return harga_lama

@router.delete("/{harga_id}")
def hapus_harga(
    harga_id: int, 
    db: Session = Depends(get_db), 
    pengguna: models_user.User = Depends(get_current_user)
):
    harga = db.query(models_user.Harga).filter(models_user.Harga.id == harga_id, models_user.Harga.user_id == pengguna.id).first()
    if not harga:
        raise HTTPException(status_code=404, detail="Data harga tidak ditemukan")
    
    db.delete(harga)
    db.commit()
    return {"message": "Data harga berhasil dihapus"}

@router.delete("")
def hapus_semua_harga(
    db: Session = Depends(get_db), 
    pengguna: models_user.User = Depends(get_current_user)
):
    db.query(models_user.Harga).filter(models_user.Harga.user_id == pengguna.id).delete()
    db.commit()
    return {"message": "Semua data harga berhasil dihapus"}

@router.delete("/riwayat/{riwayat_id}")
def hapus_riwayat(
    riwayat_id: int, 
    db: Session = Depends(get_db), 
    pengguna: models_user.User = Depends(get_current_user)
):
    riwayat = db.query(models_user.RiwayatHarga).filter(models_user.RiwayatHarga.id == riwayat_id, models_user.RiwayatHarga.user_id == pengguna.id).first()
    if not riwayat:
        raise HTTPException(status_code=404, detail="Data riwayat tidak ditemukan")
    
    db.delete(riwayat)
    db.commit()
    return {"message": "Data riwayat berhasil dihapus"}

@router.delete("/riwayat")
def hapus_semua_riwayat(
    db: Session = Depends(get_db), 
    pengguna: models_user.User = Depends(get_current_user)
):
    # This must be distinct from /riwayat/{riwayat_id} but since it's a different path entirely, it's fine. Wait, FastAPI treats /riwayat and /riwayat/{riwayat_id} differently based on path variables.
    # But we need to make sure the order of routes is correct. Let's put /riwayat above /riwayat/{riwayat_id} or just use the exact path. Since there's no path variable in /riwayat, it will match exactly.
    db.query(models_user.RiwayatHarga).filter(models_user.RiwayatHarga.user_id == pengguna.id).delete()
    db.commit()
    return {"message": "Semua riwayat berhasil dihapus"}

