import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/layouts/navbarDashboard";

const PanduanPage = () => {
  const navigate = useNavigate();

  return (
    <section className="core-layout">
      <div className="core-content">
      <TopNavbar />
      {/* HEADER STATIS DENGAN TOMBOL KEMBALI */}
      <div className="w-full p-5 bg-white shadow-sm shrink-0 flex items-center gap-4 z-10">
        <button
          onClick={() => navigate(-1)} // Fungsi kembali ke halaman sebelumnya
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 active:scale-95 transition-transform"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Panduan Aplikasi</h1>
      </div>

      {/* AREA KONTEN DAFTAR PANDUAN */}
      <div className="flex-1 overflow-y-auto p-5 pb-10">
        <div className="flex flex-col gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-md font-bold text-gray-800">
                Cara Scan AI (YOLOv8)
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Buka menu Scan Tonase. Arahkan kamera ponsel Anda ke hamparan
              tanaman cabai. Sistem AI ChiliVision akan mendeteksi buah cabai
              secara otomatis. Tekan tombol ambil gambar untuk memulai
              perhitungan estimasi panen.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-md font-bold text-gray-800">
                Manajemen Lahan
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Buka menu Lahan. Tekan tombol Tambah Lahan Baru. Masukkan nama
              lahan, luas area, dan jumlah populasi pohon. Aplikasi membutuhkan
              data ini untuk mengalikan sampel AI dengan total lahan Anda secara
              presisi.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-md font-bold text-gray-800">
                Membaca Bukti Analisa
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Buka menu Bukti Analisa. Pilih salah satu dokumen dari riwayat
              scan Anda. Layar akan menampilkan detail tonase, estimasi nilai
              jual, dan proporsi kondisi cabai. Gunakan tombol bagikan untuk
              mengirim laporan ke tengkulak.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default PanduanPage;
