from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException


# 1. Deklarasikan APIRouter agar error "router is not defined" hilang
router = APIRouter(tags=["Riwayat Analisa"])

# =====================================================================
# PENTING: Ganti kata 'database', 'auth', 'models', dan 'schemas' 
# dengan nama file Python Anda yang sebenarnya.
# =====================================================================

# 2. Impor fungsi koneksi database (Mengatasi "get_db is not defined")
from core.database import get_db

# 3. Impor fungsi pengecekan sesi login (Mengatasi "get_current_user is not defined")
from routers.auth import get_current_user

# 4. Impor struktur tabel database (Mengatasi "RiwayatAnalisa is not defined")
from models.user import RiwayatAnalisa 

# 5. Impor skema Pydantic untuk validasi input (Mengatasi "SkemaRiwayatBuat is not defined")
from schemas.user import SkemaRiwayatBuat 


@router.post("/riwayat-analisa")
async def simpan_riwayat(
    data_riwayat: SkemaRiwayatBuat, 
    db: Session = Depends(get_db),
    pengguna_saat_ini = Depends(get_current_user)
):
    riwayat_baru = RiwayatAnalisa(
        user_id=pengguna_saat_ini.id,
        lahan_id=data_riwayat.lahan_id,
        total_cabai=data_riwayat.total_cabai,
        estimasi_tonase=data_riwayat.estimasi_tonase,
        # --- Tambahkan ini ---
        potensi_pendapatan=data_riwayat.potensi_pendapatan,
        persentase_lebat=data_riwayat.persentase_lebat,
        persentase_sedang=data_riwayat.persentase_sedang,
        persentase_kurang=data_riwayat.persentase_kurang,
        berat_rata_rata=data_riwayat.berat_rata_rata,
        # --- Tambahkan 3 baris ini ---
        foto_lebat=data_riwayat.foto_lebat,
        foto_sedang=data_riwayat.foto_sedang,
        foto_kurang=data_riwayat.foto_kurang
        
    )
    db.add(riwayat_baru)
    db.commit()
    return {"pesan": "Riwayat analisa lengkap berhasil disimpan"}

# Anda juga bisa menambahkan @router.get() di bawah sini

@router.get("/riwayat-analisa")
async def ambil_riwayat(
    db: Session = Depends(get_db),
    pengguna_saat_ini = Depends(get_current_user)
):
    # Sistem menarik daftar riwayat milik pengguna yang sedang login
    # order_by(RiwayatAnalisa.id.desc()) memastikan data terbaru berada di posisi paling atas
    daftar_riwayat = (
        db.query(RiwayatAnalisa)
        .options(joinedload(RiwayatAnalisa.lahan))
        .filter(RiwayatAnalisa.user_id == pengguna_saat_ini.id)
        .order_by(RiwayatAnalisa.id.desc())
        .all()
    )
    
    return daftar_riwayat

@router.delete("/riwayat-analisa/{riwayat_id}")
async def hapus_riwayat(
    riwayat_id: int, 
    db: Session = Depends(get_db),
    pengguna_saat_ini = Depends(get_current_user)
):
    data_riwayat = db.query(RiwayatAnalisa).filter(
        RiwayatAnalisa.id == riwayat_id,
        RiwayatAnalisa.user_id == pengguna_saat_ini.id
    ).first()

    if not data_riwayat:
        raise HTTPException(status_code=404, detail="Riwayat tidak ditemukan")

    db.delete(data_riwayat)
    db.commit()
    
    return {"pesan": "Riwayat analisa berhasil dihapus"}