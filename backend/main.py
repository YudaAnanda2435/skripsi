import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.database import engine, Base
from sqlalchemy import inspect, text
from routers import auth, lahan, deteksi, harga, riwayat

load_dotenv()

Base.metadata.create_all(bind=engine)


def ensure_lahan_tanggal_panen_column():
    inspector = inspect(engine)
    if "lahan" not in inspector.get_table_names():
        return

    column_names = {column["name"] for column in inspector.get_columns("lahan")}
    if "tanggal_panen" not in column_names:
        with engine.begin() as connection:
            connection.execute(text("ALTER TABLE lahan ADD COLUMN tanggal_panen VARCHAR"))


ensure_lahan_tanggal_panen_column()

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
