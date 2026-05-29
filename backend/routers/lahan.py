from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from models import user as models_user
from schemas import user as schemas_user
from routers.auth import get_current_user

# Fitur prefix otomatis menambahkan /lahan ke semua rute di bawah ini
router = APIRouter(prefix="/lahan", tags=["Lahan"])

@router.post("", response_model=schemas_user.LahanResponse)
def tambah_lahan(lahan: schemas_user.LahanCreate, db: Session = Depends(get_db), pengguna_saat_ini: models_user.User = Depends(get_current_user)):
    lahan_baru = models_user.Lahan(nama_lahan=lahan.nama_lahan, varietas=lahan.varietas, luas_area=lahan.luas_area, populasi_pohon=lahan.populasi_pohon, user_id=pengguna_saat_ini.id)
    db.add(lahan_baru)
    db.commit()
    db.refresh(lahan_baru)
    return lahan_baru

@router.get("", response_model=list[schemas_user.LahanResponse])
def baca_daftar_lahan(db: Session = Depends(get_db), pengguna_saat_ini: models_user.User = Depends(get_current_user)):
    return db.query(models_user.Lahan).filter(models_user.Lahan.user_id == pengguna_saat_ini.id).all()

@router.put("/{lahan_id}", response_model=schemas_user.LahanResponse)
def perbarui_lahan(lahan_id: int, data_update: schemas_user.LahanUpdate, db: Session = Depends(get_db), pengguna_saat_ini: models_user.User = Depends(get_current_user)):
    lahan = db.query(models_user.Lahan).filter(models_user.Lahan.id == lahan_id, models_user.Lahan.user_id == pengguna_saat_ini.id).first()
    if not lahan:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")
    for kunci, nilai in data_update.dict(exclude_unset=True).items():
        setattr(lahan, kunci, nilai)
    db.commit()
    db.refresh(lahan)
    return lahan

@router.put("/{lahan_id}/panen", response_model=schemas_user.LahanResponse)
def tandai_panen(lahan_id: int, data_panen: schemas_user.LahanPanen, db: Session = Depends(get_db), pengguna_saat_ini: models_user.User = Depends(get_current_user)):
    lahan = db.query(models_user.Lahan).filter(models_user.Lahan.id == lahan_id, models_user.Lahan.user_id == pengguna_saat_ini.id).first()
    if not lahan:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")
    lahan.tonase_asli = data_panen.tonase_asli
    lahan.status = data_panen.status
    db.commit()
    db.refresh(lahan)
    return lahan

@router.delete("/{lahan_id}")
def hapus_lahan(lahan_id: int, db: Session = Depends(get_db), pengguna_saat_ini: models_user.User = Depends(get_current_user)):
    lahan = db.query(models_user.Lahan).filter(models_user.Lahan.id == lahan_id, models_user.Lahan.user_id == pengguna_saat_ini.id).first()
    if not lahan:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")
    
    # Hapus semua riwayat analisa yang terkait dengan lahan ini agar tidak error constraint
    db.query(models_user.RiwayatAnalisa).filter(models_user.RiwayatAnalisa.lahan_id == lahan_id).delete()
    
    # Hapus lahan
    db.delete(lahan)
    db.commit()
    return {"detail": "Lahan berhasil dihapus"}