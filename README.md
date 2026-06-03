# ChiliVision

ChiliVision adalah aplikasi web untuk membantu petani atau pemilik lahan cabai
mengelola data lahan, mencatat harga jual, melakukan deteksi jumlah cabai dari
foto sampel menggunakan YOLOv8, lalu menghitung estimasi tonase dan potensi
pendapatan panen.

Proyek ini terdiri dari dua bagian utama:

- `backend`: REST API berbasis FastAPI, SQLAlchemy, PostgreSQL, JWT, YOLOv8,
  SAHI, OpenCV, dan PyTorch.
- `frontend`: aplikasi React berbasis Vite untuk landing page, autentikasi,
  dashboard, manajemen lahan, scan tonase, bukti analisa, harga jual, panduan,
  dan profil pengguna.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Prasyarat](#prasyarat)
- [Setup Database](#setup-database)
- [Menjalankan Backend](#menjalankan-backend)
- [Menjalankan Frontend](#menjalankan-frontend)
- [Alur Penggunaan Aplikasi](#alur-penggunaan-aplikasi)
- [Cara Kerja Estimasi Tonase](#cara-kerja-estimasi-tonase)
- [Endpoint API](#endpoint-api)
- [Skema Database](#skema-database)
- [Catatan Model AI](#catatan-model-ai)
- [Troubleshooting](#troubleshooting)
- [Catatan Keamanan dan Produksi](#catatan-keamanan-dan-produksi)

## Fitur Utama

### Autentikasi dan Profil

- Registrasi pengguna baru.
- Login menggunakan email dan password.
- JWT access token dan refresh token.
- Proteksi halaman dashboard menggunakan token pada `localStorage`.
- Lihat dan ubah profil pengguna, termasuk nama, telepon, lokasi, dan peran.

### Dashboard

- Ringkasan jumlah lahan aktif.
- Estimasi panen dan potensi pendapatan dari riwayat analisa.
- Tren pendapatan dan tren panen.
- Aktivitas terbaru dari scan, perubahan harga, dan penambahan lahan.
- Filter data berdasarkan rentang tanggal.
- Informasi cuaca berbasis geolocation dengan fallback lokasi Sukabumi.

### Manajemen Lahan

- Tambah data lahan.
- Lihat daftar lahan milik pengguna aktif.
- Ubah data lahan.
- Hapus lahan beserta riwayat analisa terkait.
- Tandai lahan sebagai sudah panen dan simpan tonase asli.

### Harga Jual

- Tambah harga cabai berdasarkan varietas.
- Update harga, tren, dan selisih harga.
- Lihat riwayat perubahan harga.
- Hapus satu data harga atau seluruh data harga.
- Hapus satu riwayat harga atau seluruh riwayat harga.
- Harga varietas digunakan otomatis pada proses estimasi pendapatan.

### Scan Tonase AI

- Pilih lahan yang akan dianalisa.
- Upload tiga foto sampel berdasarkan kondisi tanaman:
  - lebat
  - sedang
  - kurang
- Masukkan persentase distribusi kondisi lahan, total harus `100%`.
- Masukkan berat rata-rata cabai dalam gram.
- Kirim foto ke endpoint deteksi AI.
- Tampilkan jumlah cabai terdeteksi, gambar hasil bounding box, estimasi tonase,
  dan potensi pendapatan.
- Simpan hasil analisa ke database sebagai bukti analisa.

### Bukti Analisa

- Menampilkan daftar riwayat analisa pengguna.
- Menyimpan data estimasi tonase, potensi pendapatan, persentase kondisi lahan,
  berat rata-rata, dan foto hasil AI.
- Mendukung detail bukti analisa dan utilitas PDF pada sisi frontend.

## Teknologi

### Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT
- Passlib dan bcrypt
- PyTorch
- Ultralytics YOLOv8
- SAHI
- OpenCV
- NumPy

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- Axios
- React Router DOM
- Framer Motion
- GSAP
- Lucide React
- React Icons
- MUI Joy
- jsPDF
- html-to-image
- Yet Another React Lightbox

## Struktur Proyek

```text
App/
├── backend/
│   ├── best.pt
│   ├── best1.pt
│   ├── main.py
│   ├── requirements.txt
│   ├── core/
│   │   ├── database.py
│   │   └── security.py
│   ├── models/
│   │   └── user.py
│   ├── routers/
│   │   ├── auth.py
│   │   ├── deteksi.py
│   │   ├── harga.py
│   │   ├── lahan.py
│   │   └── riwayat.py
│   └── schemas/
│       └── user.py
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
├── .gitignore
└── README.md
```

## Prasyarat

Pastikan sudah terpasang:

- Python 3.10 atau lebih baru.
- Node.js dan npm.
- PostgreSQL.
- Git.
- GPU NVIDIA bersifat opsional. Jika GPU tersedia dan VRAM minimal 4 GB,
  backend akan mencoba memakai CUDA. Jika tidak, backend memakai CPU.

## Setup Database

Konfigurasi database saat ini berada di `backend/core/database.py`.

```python
postgresql://postgres:123@localhost:5433/chilivision_db
```

Berdasarkan konfigurasi tersebut, siapkan PostgreSQL dengan:

- host: `localhost`
- port: `5433`
- user: `postgres`
- password: `123`
- database: `chilivision_db`

Contoh membuat database melalui `psql`:

```bash
createdb -U postgres -p 5433 chilivision_db
```

Tabel akan dibuat otomatis saat backend dijalankan karena `main.py` memanggil:

```python
Base.metadata.create_all(bind=engine)
```

## Menjalankan Backend

Masuk ke folder backend:

```bash
cd backend
```

Buat virtual environment:

```bash
python -m venv .venv
```

Aktifkan virtual environment.

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

macOS atau Linux:

```bash
source .venv/bin/activate
```

Install dependency:

```bash
pip install -r requirements.txt
```

Jalankan server:

```bash
uvicorn main:app --reload
```

Backend berjalan di:

```text
http://localhost:8000
```

Dokumentasi Swagger tersedia di:

```text
http://localhost:8000/docs
```

Catatan penting: jalankan perintah dari folder `backend` karena file model
dipanggil dengan path relatif `best.pt`.

## Menjalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Frontend biasanya berjalan di:

```text
http://localhost:5173
```

Frontend mengarah ke backend melalui konfigurasi Axios:

```text
http://localhost:8000
```

## Script Frontend

Script yang tersedia pada `frontend/package.json`:

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan Vite development server. |
| `npm run build` | Membuat build production. |
| `npm run lint` | Menjalankan ESLint. |
| `npm run preview` | Preview hasil build production. |

## Alur Penggunaan Aplikasi

1. Buka frontend di `http://localhost:5173`.
2. Registrasi akun baru melalui halaman register.
3. Login menggunakan akun yang sudah dibuat.
4. Tambahkan data lahan pada halaman Lahan.
5. Tambahkan harga jual cabai berdasarkan varietas pada halaman Harga Jual.
6. Masuk ke halaman Scan Tonase.
7. Pilih lahan yang akan dianalisa.
8. Upload foto sampel kondisi lebat, sedang, dan kurang.
9. Isi berat rata-rata cabai dan persentase distribusi kondisi lahan.
10. Jalankan proses AI.
11. Simpan hasil analisa agar tampil pada Bukti Analisa dan Dashboard.

## Cara Kerja Estimasi Tonase

Frontend mengirim tiga foto sampel ke endpoint `/deteksi`.

Backend melakukan:

- Validasi format gambar `JPG`, `JPEG`, atau `PNG`.
- Pembacaan gambar dengan OpenCV.
- Deteksi objek cabai menggunakan YOLOv8 melalui SAHI sliced prediction.
- Filter bounding box berdasarkan ukuran, rasio bentuk, confidence, duplikasi,
  dan warna mirip cabai.
- Mengembalikan jumlah cabai, daftar bounding box, dan gambar hasil anotasi
  dalam format base64.

Setelah jumlah cabai dari tiga sampel diterima, frontend menghitung:

```text
total_cabai_lahan =
  populasi_pohon * proporsi_lebat * jumlah_cabai_sampel_lebat
  + populasi_pohon * proporsi_sedang * jumlah_cabai_sampel_sedang
  + populasi_pohon * proporsi_kurang * jumlah_cabai_sampel_kurang

estimasi_tonase_kg = total_cabai_lahan * berat_rata_rata_gram / 1000

potensi_pendapatan = estimasi_tonase_kg * harga_per_kg
```

Persentase kondisi lahan harus berjumlah `100%`.

## Endpoint API

Sebagian besar endpoint membutuhkan header:

```http
Authorization: Bearer <access_token>
```

Kecuali endpoint register, login, refresh token, dan deteksi AI.

### Autentikasi

| Method | Endpoint | Auth | Deskripsi |
| --- | --- | --- | --- |
| `POST` | `/register` | Tidak | Registrasi pengguna baru. |
| `POST` | `/login` | Tidak | Login dan mendapatkan access token serta refresh token. |
| `POST` | `/refresh` | Tidak | Membuat access token baru dari refresh token. |
| `GET` | `/me` | Ya | Mengambil profil pengguna aktif. |
| `PUT` | `/me` | Ya | Memperbarui profil pengguna aktif. |

Contoh request login:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Contoh response login:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer"
}
```

### Lahan

| Method | Endpoint | Auth | Deskripsi |
| --- | --- | --- | --- |
| `POST` | `/lahan` | Ya | Menambah lahan baru. |
| `GET` | `/lahan` | Ya | Mengambil seluruh lahan milik pengguna aktif. |
| `PUT` | `/lahan/{lahan_id}` | Ya | Memperbarui data lahan. |
| `PUT` | `/lahan/{lahan_id}/panen` | Ya | Menandai lahan sudah panen. |
| `DELETE` | `/lahan/{lahan_id}` | Ya | Menghapus lahan dan riwayat analisa terkait. |

Contoh body tambah lahan:

```json
{
  "nama_lahan": "Lahan Cabai Rawit A",
  "varietas": "Cabai Rawit",
  "luas_area": 1200,
  "populasi_pohon": 850
}
```

### Harga

| Method | Endpoint | Auth | Deskripsi |
| --- | --- | --- | --- |
| `POST` | `/harga` | Ya | Menambah harga varietas baru. |
| `GET` | `/harga` | Ya | Mengambil daftar harga pengguna aktif. |
| `GET` | `/harga/riwayat` | Ya | Mengambil riwayat perubahan harga. |
| `GET` | `/harga/varietas/{nama_varietas}` | Ya | Mengambil harga berdasarkan varietas. |
| `PUT` | `/harga/{harga_id}` | Ya | Memperbarui harga, tren, dan selisih. |
| `DELETE` | `/harga/{harga_id}` | Ya | Menghapus satu data harga. |
| `DELETE` | `/harga` | Ya | Menghapus seluruh data harga. |
| `DELETE` | `/harga/riwayat/{riwayat_id}` | Ya | Menghapus satu riwayat harga. |
| `DELETE` | `/harga/riwayat` | Ya | Menghapus seluruh riwayat harga. |

Contoh body tambah harga:

```json
{
  "varietas": "Cabai Rawit",
  "harga": 45000
}
```

Contoh body update harga:

```json
{
  "harga": 47000,
  "tren": "naik",
  "selisih": 2000
}
```

### Deteksi AI

| Method | Endpoint | Auth | Deskripsi |
| --- | --- | --- | --- |
| `POST` | `/deteksi` | Tidak | Mendeteksi cabai dari file gambar. |

Request menggunakan `multipart/form-data` dengan field:

```text
file: gambar JPG, JPEG, atau PNG
```

Contoh response:

```json
{
  "total_cabai": 12,
  "hasil": [
    {
      "kelas": "cabai",
      "akurasi": 0.91,
      "bbox": {
        "x_min": 120,
        "y_min": 80,
        "x_max": 180,
        "y_max": 160
      }
    }
  ],
  "gambar_hasil": "data:image/jpeg;base64,..."
}
```

### Riwayat Analisa

| Method | Endpoint | Auth | Deskripsi |
| --- | --- | --- | --- |
| `POST` | `/riwayat-analisa` | Ya | Menyimpan hasil analisa tonase. |
| `GET` | `/riwayat-analisa` | Ya | Mengambil daftar riwayat analisa pengguna aktif. |
| `DELETE` | `/riwayat-analisa/{riwayat_id}` | Ya | Menghapus satu riwayat analisa. |

Contoh body simpan riwayat analisa:

```json
{
  "lahan_id": 1,
  "total_cabai": 42,
  "estimasi_tonase": 127.5,
  "potensi_pendapatan": 5737500,
  "persentase_lebat": 40,
  "persentase_sedang": 35,
  "persentase_kurang": 25,
  "berat_rata_rata": 3.5,
  "foto_lebat": "base64...",
  "foto_sedang": "base64...",
  "foto_kurang": "base64..."
}
```

## Skema Database

Model SQLAlchemy berada di `backend/models/user.py`.

### `users`

Menyimpan data pengguna.

- `id`
- `nama`
- `email`
- `password_hash`
- `telepon`
- `lokasi`
- `peran`

### `lahan`

Menyimpan data lahan pengguna.

- `id`
- `nama_lahan`
- `varietas`
- `luas_area`
- `populasi_pohon`
- `status`
- `estimasi_ai`
- `tonase_asli`
- `tanggal_tanam`
- `tanggal_panen`
- `user_id`

### `harga`

Menyimpan harga aktif per varietas.

- `id`
- `user_id`
- `varietas`
- `harga`
- `terakhir_update`
- `tren`
- `selisih`

### `riwayat_harga`

Menyimpan histori perubahan harga.

- `id`
- `user_id`
- `varietas`
- `harga`
- `tanggal`

### `riwayat_analisa`

Menyimpan hasil estimasi tonase.

- `id`
- `user_id`
- `lahan_id`
- `total_cabai`
- `estimasi_tonase`
- `potensi_pendapatan`
- `persentase_lebat`
- `persentase_sedang`
- `persentase_kurang`
- `berat_rata_rata`
- `foto_lebat`
- `foto_sedang`
- `foto_kurang`
- `tanggal`

## Catatan Model AI

Backend menggunakan file model:

```text
backend/best.pt
```

Konfigurasi deteksi berada di `backend/routers/deteksi.py`, antara lain:

- `MODEL_PATH = "best.pt"`
- `CONFIDENCE_THRESHOLD = 0.68`
- ukuran slice SAHI `1024 x 1024`
- overlap slice `0.15`
- postprocess `GREEDYNMM`
- filter warna cabai berbasis HSV
- filter bounding box kecil, bentuk ekstrem, dan duplikasi

Jika file model tidak ditemukan, backend akan gagal berjalan dengan pesan:

```text
Model tidak ditemukan: best.pt
```

Pastikan server dijalankan dari folder `backend` dan file `best.pt` tersedia.

## Troubleshooting

### Backend gagal konek database

Periksa PostgreSQL:

- service PostgreSQL sudah berjalan
- database `chilivision_db` sudah dibuat
- port yang digunakan adalah `5433`
- user dan password sesuai konfigurasi

### Frontend tidak bisa mengambil data

Pastikan backend berjalan di:

```text
http://localhost:8000
```

Frontend saat ini memakai base URL tersebut di `frontend/src/api/axios.js`.

### Endpoint protected mengembalikan 401

Penyebab umum:

- belum login
- token sudah kedaluwarsa
- refresh token tidak tersedia
- token di `localStorage` terhapus

Solusi cepat: logout atau hapus token lama dari browser, lalu login ulang.

### Proses AI lambat

Jika GPU tidak tersedia atau VRAM kurang dari 4 GB, backend memakai CPU.
Proses deteksi gambar dapat memakan waktu lebih lama.

### File gambar ditolak

Endpoint `/deteksi` hanya menerima:

- `image/jpeg`
- `image/jpg`
- `image/png`

### Estimasi tidak muncul

Pastikan:

- semua foto sampel terisi
- berat rata-rata cabai sudah diisi
- persentase lebat, sedang, dan kurang berjumlah `100%`
- setidaknya ada cabai yang terdeteksi oleh AI

## Catatan Keamanan dan Produksi

Konfigurasi saat ini cocok untuk pengembangan lokal. Untuk produksi, sebaiknya:

- Pindahkan URL database ke environment variable.
- Pindahkan `SECRET_KEY` JWT ke environment variable.
- Batasi CORS agar tidak memakai `allow_origins=["*"]`.
- Jangan menyimpan credential database langsung di source code.
- Pastikan file model AI dan aset sensitif tidak ikut terpublikasi tanpa sengaja.
- Gunakan HTTPS.
- Gunakan migrasi database seperti Alembic jika struktur tabel sering berubah.
- Validasi ukuran file upload agar server tidak menerima gambar terlalu besar.

## Ringkasan URL Lokal

| Layanan | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:8000` |
| Swagger Docs | `http://localhost:8000/docs` |

## Lisensi

Belum ada lisensi yang didefinisikan pada repository ini.
