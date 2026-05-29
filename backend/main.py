from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.database import engine, Base

# Panggil semua rute dari folder routers
from routers import auth, lahan, deteksi, harga, riwayat

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ChiliVision API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Daftarkan rute ke dalam aplikasi utama
app.include_router(auth.router)
app.include_router(lahan.router)
app.include_router(deteksi.router)
app.include_router(harga.router)
app.include_router(riwayat.router)
