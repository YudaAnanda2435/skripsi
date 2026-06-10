import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.database import engine, Base
from routers import auth, lahan, deteksi, harga, riwayat

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ChiliVision API")

origins = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(lahan.router)
app.include_router(deteksi.router)
app.include_router(harga.router)
app.include_router(riwayat.router)
