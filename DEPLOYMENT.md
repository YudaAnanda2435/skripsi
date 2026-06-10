# ChiliVision Deployment

Konfigurasi environment memisahkan alamat API frontend, koneksi database backend, dan origin CORS. Perpindahan development ke production tidak memerlukan perubahan source code.

## Local Development

### PostgreSQL lokal

Siapkan PostgreSQL lokal dengan konfigurasi berikut:

- Host: `localhost`
- Port: `5433`
- Database: `chilivision_db`
- User: `postgres`

Cara cepat menjalankan PostgreSQL lokal dengan Docker:

```powershell
docker run --name chilivision-postgres -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=chilivision_db -p 5433:5432 -d postgres:16
```

Untuk penggunaan berikutnya, jalankan kembali container dengan `docker start chilivision-postgres`.

Nilai development backend disimpan di `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:123@localhost:5433/chilivision_db
ALLOWED_ORIGINS=http://localhost:5173,https://chilivision.vercel.app
```

Sesuaikan password lokal bila diperlukan. File `backend/.env` tidak boleh di-commit.

### Backend FastAPI

```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend development tersedia di `http://localhost:8000`.

### Frontend Vite

`frontend/.env.development` otomatis digunakan oleh Vite saat menjalankan development server. Salin `frontend/.env.example` menjadi `frontend/.env.local`, lalu isi `VITE_OPENWEATHER_API_KEY` untuk fitur cuaca lokal.

```powershell
cd frontend
npm install
npm run dev
```

Frontend development tersedia di `http://localhost:5173` dan request aplikasi diarahkan ke backend development melalui `VITE_API_URL`.

## Backend Render

Atur Root Directory service Render ke `backend` dan gunakan start command:

```text
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Tambahkan Environment Variables di Render:

```env
DATABASE_URL=<Supabase PostgreSQL connection string>
ALLOWED_ORIGINS=https://chilivision.vercel.app
```

Jangan memasukkan kredensial Supabase ke source code atau file yang di-commit. Setelah mengubah environment variable, pilih **Manual Deploy > Deploy latest commit** atau jalankan redeploy dari dashboard Render.

Production backend: `https://chilivision-backend.onrender.com`

## Frontend Vercel

Atur Root Directory project Vercel ke `frontend`, Build Command ke `npm run build`, dan Output Directory ke `dist`.

Tambahkan Environment Variable untuk Production:

```env
VITE_API_URL=https://chilivision-backend.onrender.com
VITE_OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_OPENWEATHER_API_KEY=<OpenWeather API key>
```

Nilai yang sama tersedia di `frontend/.env.production` untuk build production lokal. Setelah mengubah environment variable di Vercel, lakukan redeploy agar nilai Vite dimasukkan ke build baru.

Production frontend: `https://chilivision.vercel.app`

## Deployment Checklist

- PostgreSQL lokal berjalan sebelum backend development dimulai.
- `backend/.env` memiliki `DATABASE_URL` dan `ALLOWED_ORIGINS` development.
- Render memiliki `DATABASE_URL` Supabase dan `ALLOWED_ORIGINS=https://chilivision.vercel.app`.
- Vercel memiliki `VITE_API_URL`, `VITE_OPENWEATHER_API_URL`, dan `VITE_OPENWEATHER_API_KEY`.
- CORS production tidak menggunakan wildcard.
- Kredensial database dan key OpenWeather tidak di-commit. Perlu diingat bahwa variabel `VITE_*` tetap terlihat di browser, sehingga key OpenWeather harus diberi pembatasan penggunaan.
- Build frontend dan syntax backend telah diverifikasi sebelum deploy.
