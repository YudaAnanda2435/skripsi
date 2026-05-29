from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from core.database import Base 

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    telepon = Column(String, nullable=True)
    lokasi = Column(String, nullable=True)
    peran = Column(String, default="Pemilik Lahan")
    
    lahan = relationship("Lahan", back_populates="pemilik")
    # PERBAIKAN: Ubah back_populates menjadi "pemilik"
    riwayat_analisa = relationship("RiwayatAnalisa", back_populates="pemilik")

class Lahan(Base):
    __tablename__ = "lahan"

    id = Column(Integer, primary_key=True, index=True)
    nama_lahan = Column(String, index=True)
    varietas = Column(String)
    luas_area = Column(Float) 
    populasi_pohon = Column(Integer)
    status = Column(String, default="Belum Panen")
    estimasi_ai = Column(Float, nullable=True) 
    tonase_asli = Column(Float, nullable=True) 
    tanggal_tanam = Column(String, nullable=True)
    tanggal_panen = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id")) 
    
    pemilik = relationship("User", back_populates="lahan")
    # PERBAIKAN: Tambahkan relasi ini di kelas Lahan
    riwayat_analisa = relationship("RiwayatAnalisa", back_populates="lahan")
    
class Harga(Base):
    __tablename__ = "harga"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    varietas = Column(String)
    harga = Column(Integer)
    terakhir_update = Column(String)
    tren = Column(String, default="tetap")
    selisih = Column(Integer, default=0)

    pemilik = relationship("User")

class RiwayatHarga(Base):
    __tablename__ = "riwayat_harga"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    varietas = Column(String)
    harga = Column(Integer)
    tanggal = Column(String)

    pemilik = relationship("User")
    
class RiwayatAnalisa(Base):
    __tablename__ = "riwayat_analisa"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lahan_id = Column(Integer, ForeignKey("lahan.id"))
    total_cabai = Column(Integer)
    estimasi_tonase = Column(Float)
    
    potensi_pendapatan = Column(Float)
    persentase_lebat = Column(Float)
    persentase_sedang = Column(Float)
    persentase_kurang = Column(Float)
    berat_rata_rata = Column(Float)
    
    # --- 3 Kolom Baru untuk Foto ---
    foto_lebat = Column(Text, nullable=True)
    foto_sedang = Column(Text, nullable=True)
    foto_kurang = Column(Text, nullable=True)
    
    tanggal = Column(DateTime, server_default=func.now())

    pemilik = relationship("User", back_populates="riwayat_analisa")
    lahan = relationship("Lahan", back_populates="riwayat_analisa")
    # PERBAIKAN: Baris duplikat dihapus dari sini