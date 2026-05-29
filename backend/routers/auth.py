from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

from core.database import get_db
from core import security
from models import user as models_user
from schemas import user as schemas_user

router = APIRouter(tags=["Otentikasi"])
security_scheme = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security_scheme), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token tidak valid")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token sudah kedaluwarsa")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token tidak valid")

    db_user = db.query(models_user.User).filter(models_user.User.email == email).first()
    if db_user is None:
        raise HTTPException(status_code=401, detail="Pengguna tidak ditemukan")
    return db_user

@router.post("/register")
def register_user(user: schemas_user.UserCreate, db: Session = Depends(get_db)):
    cek_email = db.query(models_user.User).filter(models_user.User.email == user.email).first()
    if cek_email:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")
    sandi_acak = security.get_password_hash(user.password)
    pengguna_baru = models_user.User(nama=user.nama, email=user.email, password_hash=sandi_acak)
    db.add(pengguna_baru)
    db.commit()
    db.refresh(pengguna_baru)
    return {"pesan": "Registrasi berhasil", "nama": pengguna_baru.nama}

@router.post("/login", response_model=schemas_user.Token)
def login_user(user: schemas_user.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models_user.User).filter(models_user.User.email == user.email).first()
    if not db_user or not security.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Email atau kata sandi salah")
    akses_token = security.create_access_token(data={"sub": db_user.email})
    refresh_token = security.create_refresh_token(data={"sub": db_user.email})
    return {"access_token": akses_token, "refresh_token": refresh_token, "token_type": "bearer"}

@router.post("/refresh", response_model=schemas_user.RefreshTokenResponse)
def refresh_user_token(request: schemas_user.RefreshTokenRequest, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(request.refreshToken, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Refresh token tidak valid")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token sudah kedaluwarsa")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Refresh token tidak valid")

    db_user = db.query(models_user.User).filter(models_user.User.email == email).first()
    if db_user is None:
        raise HTTPException(status_code=401, detail="Pengguna tidak ditemukan")
        
    akses_token_baru = security.create_access_token(data={"sub": db_user.email})
    return {"accessToken": akses_token_baru}

@router.get("/me", response_model=schemas_user.UserResponse)
def baca_profil_pengguna(pengguna_saat_ini: models_user.User = Depends(get_current_user)):
    return pengguna_saat_ini

@router.put("/me", response_model=schemas_user.UserResponse)
def perbarui_profil_pengguna(data_baru: schemas_user.UserUpdate, db: Session = Depends(get_db), pengguna_saat_ini: models_user.User = Depends(get_current_user)):
    pengguna_saat_ini.nama = data_baru.nama
    pengguna_saat_ini.telepon = data_baru.telepon
    pengguna_saat_ini.lokasi = data_baru.lokasi
    db.commit()
    db.refresh(pengguna_saat_ini)
    return pengguna_saat_ini