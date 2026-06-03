import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomMenu from "../components/layouts/bottomMenu";
import TopNavbar from "../components/layouts/navbarDashboard";
import api from "../api/axios";
import { useToast } from "../components/ui/toast/ToastContext";
import { useConfirm } from "../components/ui/confirm/useConfirm";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  CircleHelp,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  Sprout,
  Wallet,
} from "lucide-react";

const ProfilPage = () => {
  const [halamanAktif, setHalamanAktif] = useState("profil");
  const navigate = useNavigate();
  const [dataProfil, setDataProfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { showToast } = useToast();
  const confirm = useConfirm();

  const [formEdit, setFormEdit] = useState({
    nama: "",
    telepon: "",
    lokasi: "",
  });
  const breadcrumbs = [
    {
      label: "Profil",
      onClick: halamanAktif === "edit" ? () => setHalamanAktif("profil") : undefined,
    },
  ];
  if (halamanAktif === "edit") breadcrumbs.push({ label: "Edit Profil" });

  useEffect(() => {
    ambilDataProfil();
  }, []);

  const ambilDataProfil = async () => {
    setIsLoading(true);
    try {
      // Mengambil data pengguna asli dari database
      const [response, responseLahan, responseRiwayat] = await Promise.all([
        api.get("/me"),
        api.get("/lahan").catch(() => ({ data: [] })),
        api.get("/riwayat-analisa").catch(() => ({ data: [] })),
      ]);
      const dataAsli = response.data;
      const daftarLahan = Array.isArray(responseLahan.data) ? responseLahan.data : [];
      const daftarRiwayat = Array.isArray(responseRiwayat.data)
        ? responseRiwayat.data
        : [];

      // Menggunakan data asli dari database
      const dataLengkap = {
        ...dataAsli,
        totalLahan: daftarLahan.length,
        totalScan: daftarRiwayat.length,
        totalEstimasi: daftarRiwayat.reduce(
          (total, item) => total + Number(item.estimasi_tonase || 0),
          0,
        ),
        potensiPendapatan: daftarRiwayat.reduce(
          (total, item) => total + Number(item.potensi_pendapatan || 0),
          0,
        ),
      };

      setDataProfil(dataLengkap);
      setFormEdit({
        nama: dataAsli.nama,
        telepon: dataAsli.telepon || "",
        lokasi: dataAsli.lokasi || "",
      });
    } catch (error) {
      console.error("Gagal mengambil profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const ok = await confirm("Anda akan keluar dari sesi ini.", {
      title: "Keluar Aplikasi?",
      confirmLabel: "Ya, Keluar",
      cancelLabel: "Batal",
      color: "neutral",
    });
    if (!ok) return;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };

  const tanganiPerubahanInput = (e) => {
    const { name, value } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
  };

  const formatAngka = (nilai) =>
    Number(nilai || 0).toLocaleString("id-ID", { maximumFractionDigits: 1 });

  const formatRupiah = (nilai) =>
    Number(nilai || 0).toLocaleString("id-ID", { maximumFractionDigits: 0 });

  const ambilInisial = (nama = "") =>
    nama
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((kata) => kata.charAt(0))
      .join("")
      .toUpperCase() || "CV";

 const simpanProfil = async (e) => {
   e.preventDefault();
   setIsLoading(true);

   try {
     const response = await api.put("/me", formEdit);
     const dataTerbaru = response.data;

     setDataProfil({
       ...dataProfil,
       nama: dataTerbaru.nama,
       telepon: dataTerbaru.telepon,
       lokasi: dataTerbaru.lokasi,
     });

     showToast("Profil berhasil diperbarui!", "success");
     setHalamanAktif("profil");
   } catch (error) {
     console.error("Gagal menyimpan profil:", error);
     showToast("Gagal memperbarui profil. Coba lagi.", "error");
   } finally {
     setIsLoading(false);
   }
 };

  return (
    // Menggunakan kerangka persis seperti BuktiAnalisaPage
    <section className="core-layout">
      <div className="core-content">
      <TopNavbar breadcrumbs={breadcrumbs} />
      {/* 1. HEADER STATIS */}
      {/* <div className="w-full p-5 bg-white shadow-sm shrink-0 flex items-center justify-between z-10">
        <h1 className="text-xl font-bold text-gray-800">
          {halamanAktif === "edit" ? "Edit Profil" : "Profil Saya"}
        </h1>
        {halamanAktif === "edit" && !isLoading && (
          <button
            onClick={() => setHalamanAktif("profil")}
            className="text-sm font-bold text-gray-500 bg-gray-100 px-4 py-2 rounded-full active:scale-95 transition-transform"
          >
            Batal
          </button>
        )}
      </div> */}

      {/* 2. AREA KONTEN (Menghapus flex flex-col gap-6 dari sini) */}
      <div className="flex-1 overflow-y-auto p-5 pb-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-gray-500">Memproses...</p>
          </div>
        ) : halamanAktif === "edit" ? (
          /* FORMULIR EDIT */
          <form onSubmit={simpanProfil} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formEdit.nama}
                onChange={tanganiPerubahanInput}
                required
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-800 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="telepon"
                value={formEdit.telepon}
                onChange={tanganiPerubahanInput}
                required
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-800 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Domisili / Lokasi
              </label>
              <input
                type="text"
                name="lokasi"
                value={formEdit.lokasi}
                onChange={tanganiPerubahanInput}
                required
                className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-800 font-medium"
              />
            </div>

            <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-1 opacity-70 cursor-not-allowed">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Peran Akun
              </label>
              <input
                type="text"
                value={dataProfil?.peran || ""}
                disabled
                className="w-full bg-transparent text-gray-600 font-bold outline-none"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Peran akun tidak dapat diubah oleh pengguna.
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-primary text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform text-lg"
            >
              Simpan Perubahan
            </button>
          </form>
        ) : dataProfil ? (
          <div className="grid grid-cols-1 gap-6 font-jakarta xl:grid-cols-[480px_1fr]">
            <aside className="rounded-2xl border border-[#e5e2da] bg-white p-6 shadow-[0_12px_40px_rgba(23,61,45,0.04)]">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#316947] text-[42px] font-extrabold leading-none text-white">
                  {ambilInisial(dataProfil.nama)}
                </div>
                <h2 className="mt-7 text-[22px] font-extrabold leading-9 text-black">
                  {dataProfil.nama}
                </h2>
                <p className="mt-2 text-[18px] font-medium leading-7 text-[#002719]">
                  {dataProfil.peran || "Pemilik Lahan"}
                </p>
              </div>

              <div className="my-9 h-px bg-[#e5e2da]" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#717973]" />
                  <div>
                    <p className="text-sm font-semibold text-[#717973]">Lokasi</p>
                    <p className="mt-1 text-[18px] leading-7 text-black">
                      {dataProfil.lokasi || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 shrink-0 text-[#717973]" />
                  <div>
                    <p className="text-sm font-semibold text-[#717973]">Email</p>
                    <p className="mt-1 break-all text-[18px] leading-7 text-black">
                      {dataProfil.email || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-6 w-6 shrink-0 text-[#717973]" />
                  <div>
                    <p className="text-sm font-semibold text-[#717973]">No. Telepon</p>
                    <p className="mt-1 text-[18px] leading-7 text-black">
                      {dataProfil.telepon || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHalamanAktif("edit")}
                className="mt-11 flex h-14 w-full items-center justify-center rounded-lg border border-[#717973] bg-[#f6f3eb] px-6 text-[18px] font-extrabold text-black transition-colors hover:bg-[#ebe8e0]"
              >
                Edit Profil
              </button>
            </aside>

            <div className="flex flex-col gap-7">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="flex items-center gap-5 rounded-2xl border border-[#e5e2da] bg-white p-5 shadow-[0_12px_40px_rgba(23,61,45,0.04)]">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f1eee6] text-[#002719]">
                    <Sprout className="h-8 w-8" strokeWidth={2.4} />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-[#717973]">Total Lahan</p>
                    <p className="mt-1 text-[18px] font-extrabold leading-none text-black">
                      {formatAngka(dataProfil.totalLahan)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-2xl border border-[#e5e2da] bg-white p-5 shadow-[0_12px_40px_rgba(23,61,45,0.04)]">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f1eee6] text-[#002719]">
                    <BarChart3 className="h-8 w-8" strokeWidth={2.4} />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-[#717973]">Total Analisa</p>
                    <p className="mt-1 text-[18px] font-extrabold leading-none text-black">
                      {formatAngka(dataProfil.totalScan)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-2xl border border-[#e5e2da] bg-white p-5 shadow-[0_12px_40px_rgba(23,61,45,0.04)]">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#f1eee6] text-[#002719]">
                    <Scale className="h-8 w-8" strokeWidth={2.4} />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-[#717973]">Estimasi Total</p>
                    <p className="mt-1 text-[18px] font-extrabold leading-none text-black">
                      {formatAngka(dataProfil.totalEstimasi)}
                      <span className="ml-2 text-[18px] font-medium text-[#717973]">kg</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 rounded-2xl border border-[#e5e2da] bg-white p-5 shadow-[0_12px_40px_rgba(23,61,45,0.04)]">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#194b34] text-[#c2ecd5]">
                    <Wallet className="h-8 w-8" strokeWidth={2.4} />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium text-[#717973]">Potensi Pendapatan</p>
                    <p className="mt-1 text-[18px] font-extrabold leading-none text-[#002719]">
                      Rp {formatRupiah(dataProfil.potensiPendapatan)}
                    </p>
                  </div>
                </div>
              </div>

              <section className="overflow-hidden rounded-2xl border border-[#e5e2da] bg-white shadow-[0_12px_40px_rgba(23,61,45,0.04)]">
                <div className="border-b border-[#e5e2da] bg-[#fcf9f1] p-5">
                  <h3 className="text-[20px] font-extrabold leading-9 text-black">
                    Pengaturan Akun
                  </h3>
                </div>
                <button
                type="button"
                onClick={() =>
                  navigate("/panduan", {
                    state: {
                      breadcrumbs: [
                        { label: "Profil", to: "/profil" },
                        { label: "Panduan" },
                      ],
                    },
                  })
                }
                className="flex w-full items-center justify-between border-b border-[#e5e2da] p-5 text-left transition-colors hover:bg-[#f6f3eb]"
              >
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f1eee6] text-[#002719]">
                    <BookOpen className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  <span>
                    <span className="block text-[18px] font-semibold leading-7 text-black">
                      Panduan Penggunaan
                    </span>
                    <span className="mt-1 block text-[15px] font-medium text-[#717973]">
                      Pelajari cara menggunakan ChiliVision
                    </span>
                  </span>
                </div>
                <ChevronRight className="h-6 w-6 text-[#717973]" />
              </button>

                <button
                  type="button"
                  className="flex w-full cursor-default items-center justify-between border-b border-[#e5e2da] p-5 text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f1eee6] text-[#002719]">
                      <Shield className="h-7 w-7" strokeWidth={2.2} />
                    </span>
                    <span>
                      <span className="block text-[18px] font-semibold leading-7 text-black">
                        Keamanan Akun
                      </span>
                      <span className="mt-1 block text-[15px] font-medium text-[#717973]">
                        Ubah kata sandi dan autentikasi
                      </span>
                    </span>
                  </div>
                  <ChevronRight className="h-6 w-6 text-[#717973]" />
                </button>

                <button
                  type="button"
                  className="flex w-full cursor-default items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f1eee6] text-[#002719]">
                      <CircleHelp className="h-7 w-7" strokeWidth={2.2} />
                    </span>
                    <span>
                      <span className="block text-[18px] font-semibold leading-7 text-black">
                        Bantuan & Dukungan
                      </span>
                      <span className="mt-1 block text-[15px] font-medium text-[#717973]">
                        Hubungi tim kami jika ada masalah
                      </span>
                    </span>
                  </div>
                  <ChevronRight className="h-6 w-6 text-[#717973]" />
                </button>
              </section>

            <button
              onClick={handleLogout}
              className="w-full p-4 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Keluar Aplikasi
            </button>
          </div>
          </div>
        ) : null}
      </div>
      </div>

      {/* 3. MENU BAWAH */}
      <BottomMenu />
    </section>
  );
};

export default ProfilPage;
