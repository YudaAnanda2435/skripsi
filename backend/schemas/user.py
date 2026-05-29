from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    nama: str
    email: str
    password: str
    
class UserLogin(BaseModel):
    email: str
    password: str
    
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class RefreshTokenRequest(BaseModel):
    refreshToken: str

class RefreshTokenResponse(BaseModel):
    accessToken: str
    
class UserResponse(BaseModel):
    id: int
    nama: str
    email: str

    class Config:
        from_attributes = True
        
        # 1. Tambahkan skema baru ini untuk menerima pembaruan profil
class UserUpdate(BaseModel):
    nama: str
    telepon: Optional[str] = None
    lokasi: Optional[str] = None

# 2. Perbarui UserResponse agar FastAPI mengirimkan data lengkap ke React
class UserResponse(BaseModel):
    nama: str
    email: str
    telepon: Optional[str] = None
    lokasi: Optional[str] = None
    peran: Optional[str] = None

    class Config:
        from_attributes = True
        
        
         
#lahan
class LahanBase(BaseModel):
    nama_lahan: str
    varietas: str
    luas_area: float
    populasi_pohon: int

class LahanCreate(LahanBase):
    pass

# Skema baru untuk fitur Edit Data Lahan
class LahanUpdate(BaseModel):
    nama_lahan: Optional[str] = None
    varietas: Optional[str] = None
    luas_area: Optional[float] = None
    populasi_pohon: Optional[int] = None
    tanggal_tanam: Optional[str] = None
    tanggal_panen: Optional[str] = None

# Skema baru untuk fitur Tandai Panen
class LahanPanen(BaseModel):
    tonase_asli: float
    status: str = "Sudah Panen"

# Perbarui LahanResponse agar mengembalikan seluruh data baru ke React
class LahanResponse(LahanBase):
    id: int
    user_id: int
    status: str
    estimasi_ai: Optional[float] = None
    tonase_asli: Optional[float] = None
    tanggal_tanam: Optional[str] = None
    tanggal_panen: Optional[str] = None

    class Config:
        from_attributes = True
        
# Tambahkan kode ini di bagian bawah schemas/user.py

class HargaCreate(BaseModel):
    varietas: str
    harga: int

class HargaUpdate(BaseModel):
    harga: int
    tren: str
    selisih: int

class HargaResponse(BaseModel):
    id: int
    varietas: str
    harga: int
    terakhir_update: str
    tren: str
    selisih: int

    class Config:
        from_attributes = True

class RiwayatHargaResponse(BaseModel):
    id: int
    varietas: str
    harga: int
    tanggal: str

    class Config:
        from_attributes = True
        
class SkemaRiwayatBuat(BaseModel):
    lahan_id: int
    total_cabai: int
    estimasi_tonase: float
    potensi_pendapatan: float
    persentase_lebat: float
    persentase_sedang: float
    persentase_kurang: float
    berat_rata_rata: float
    
    # --- Tambahkan 3 baris ini ---
    foto_lebat: Optional[str] = None
    foto_sedang: Optional[str] = None
    foto_kurang: Optional[str] = None