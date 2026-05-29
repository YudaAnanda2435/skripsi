import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Leaf,
  MapPin,
  Maximize2,
  MoreVertical,
  Plus,
  Search,
  Sprout,
  Trash2,
  Trees,
} from "lucide-react";
import BottomMenu from "../components/layouts/bottomMenu";
import TopNavbar from "../components/layouts/navbarDashboard";
import { useToast } from "../components/ui/toast/ToastContext";
import { useConfirm } from "../components/ui/confirm/useConfirm";
import farmPlaceholder from "../assets/img/dashboard/farm-placeholder.png";

const lahanThumbnails = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBhZ166vqnV-kozoevO5r4a5xIkPVMXzimUdd14ZqExtLXM_PhI8NahXnkmONaCNr9p2f5jaEiWZvyOJhdz6j4z2aByqPQofSgAsHMIEbRzH8nfZhdxjgbgJ4ki8MdE7CLO3kJut_KyzPnwbLk--7_85R9pBQFT7QQGpjfXfF_6u8on5Xq-VW9213JACYvGAgK75HYlQgIHBKA5kEOs5lDqDAUISjf_qoK3jHUb7geBszqCCr9Zam0yNNbNWvgxZXZuMwKy87hmzM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAX237nMCCofotHRsstoq4eOImqMV0ddBoENXY6khMGlcrzcurbsxkVJTvU3n9q39OD1CpZtDpLJ0uyOeynLpWwshsrNOI2SVjpMePeRIoT4R6uWPiw4J6jnnbeYPFbKMxrqhbOzZMXfFVnvZTH2jHJWrUwlRc-nEmlNfKM9c18jmR1Ed4kDwEDLDo081ueou3Hxs7O7Jn6pm1v2-d7DPCL2MWR3mAAEwK2NnwWtRcIY2-wL8w5IKkETrA9jy1z31AONUnNmPe4ZSc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5tAkMsleRHyr4oWDUFOIfM6WXdkjrZCk8SSvigr7qiGO6skrlOuQXgBPI2jyeGxD7DAToLiEhaelDg9jro1sZFBceHp_gkC20r4_tTVAZiQjSg1-sBWMHn0l2OQXxarOR_AfR0DLJQEMZTEEF2hiuGUtWtSQTW0WgKoWeodThnY_4zlrnRLSWsugdKr3By8d7vypnGnCy4MU1uCKEA8EpIZ9_KG68mVAuRCb3vKIkmCtVfsZjYRHWgHwMyDIFdQckLWcyB9RXxGo",
];

const tabLahan = [
  { id: "semua", label: "Semua Lahan" },
  { id: "aktif", label: "Lahan Aktif" },
  { id: "akan-panen", label: "Akan Panen" },
  { id: "selesai", label: "Selesai" },
];

const LahanPage = () => {
  const [daftarLahan, setDaftarLahan] = useState([]);
  const [lahanAktif, setLahanAktif] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { showToast } = useToast();
  const confirm = useConfirm();

  // Kontrol Modal
  const [isModalTambahBuka, setIsModalTambahBuka] = useState(false);
  const [isModalPanenBuka, setIsModalPanenBuka] = useState(false);
  const [isModalEditBuka, setIsModalEditBuka] = useState(false);

  // State Formulir
  const [formLahan, setFormLahan] = useState({
    nama_lahan: "",
    varietas: "",
    luas_area: "",
    populasi_pohon: "",
  });

  const [formEditLahan, setFormEditLahan] = useState({
    nama_lahan: "",
    varietas: "",
    luas_area: "",
    populasi_pohon: "",
    tanggal_tanam: "",
  });

  const [inputTonase, setInputTonase] = useState("");
  const [filterAktif, setFilterAktif] = useState("semua");
  const [pencarianLahan, setPencarianLahan] = useState("");
  const kembaliKeDaftarLahan = () => {
    setLahanAktif(null);
    setIsModalTambahBuka(false);
    setIsModalEditBuka(false);
    setIsModalPanenBuka(false);
  };
  const tutupModalLahan = () => {
    setIsModalTambahBuka(false);
    setIsModalEditBuka(false);
    setIsModalPanenBuka(false);
  };
  const breadcrumbs = [
    {
      label: "Lahan",
      onClick: lahanAktif || isModalTambahBuka ? kembaliKeDaftarLahan : undefined,
    },
  ];

  if (lahanAktif) {
    breadcrumbs.push({
      label: lahanAktif.nama_lahan,
      onClick: isModalEditBuka || isModalPanenBuka ? tutupModalLahan : undefined,
    });
  }

  if (isModalTambahBuka) breadcrumbs.push({ label: "Tambah Lahan" });
  if (isModalEditBuka) breadcrumbs.push({ label: "Edit Data" });
  if (isModalPanenBuka) breadcrumbs.push({ label: "Tandai Panen" });

  useEffect(() => {
    ambilDaftarLahan();
  }, []);

  const ambilDaftarLahan = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/lahan");
      setDaftarLahan(response.data);
    } catch (error) {
      console.error("Gagal mengambil data lahan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const tanganiPerubahanInput = (e) => {
    const { name, value } = e.target;
    setFormLahan({ ...formLahan, [name]: value });
  };

  const tanganiPerubahanEdit = (e) => {
    const { name, value } = e.target;
    setFormEditLahan({ ...formEditLahan, [name]: value });
  };

  const simpanLahanBaru = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/lahan", {
        nama_lahan: formLahan.nama_lahan,
        varietas: formLahan.varietas,
        luas_area: parseFloat(formLahan.luas_area),
        populasi_pohon: parseInt(formLahan.populasi_pohon),
      });

      setDaftarLahan([...daftarLahan, response.data]);
      setIsModalTambahBuka(false);
      setFormLahan({ nama_lahan: "", varietas: "", luas_area: "", populasi_pohon: "" });
      showToast(`Lahan "${response.data.nama_lahan}" berhasil ditambahkan!`, "success");
    } catch (error) {
      console.error("Gagal menyimpan lahan:", error);
      showToast("Gagal menambahkan lahan baru. Periksa koneksi Anda.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const bukaModalEdit = () => {
    setFormEditLahan({
      nama_lahan: lahanAktif.nama_lahan,
      varietas: lahanAktif.varietas,
      luas_area: lahanAktif.luas_area,
      populasi_pohon: lahanAktif.populasi_pohon,
      tanggal_tanam: lahanAktif.tanggal_tanam || "",
    });
    setIsModalEditBuka(true);
  };

  const simpanEditLahan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.put(`/lahan/${lahanAktif.id}`, {
        nama_lahan: formEditLahan.nama_lahan,
        varietas: formEditLahan.varietas,
        luas_area: parseFloat(formEditLahan.luas_area),
        populasi_pohon: parseInt(formEditLahan.populasi_pohon),
        tanggal_tanam: formEditLahan.tanggal_tanam || null,
      });

      const lahanDiperbarui = response.data;
      setDaftarLahan(
        daftarLahan.map((l) =>
          l.id === lahanDiperbarui.id ? lahanDiperbarui : l,
        ),
      );
      setLahanAktif(lahanDiperbarui);
      setIsModalEditBuka(false);
      showToast("Data lahan berhasil diperbarui!", "success");
    } catch (error) {
      console.error("Gagal memperbarui lahan:", error);
      showToast("Gagal memperbarui data lahan.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const hapusLahan = async (id_hapus) => {
    const ok = await confirm(
      "Semua data riwayat yang terkait dengan lahan ini akan ikut terhapus secara permanen.",
      { title: "Hapus Lahan?", confirmLabel: "Ya, Hapus", color: "danger" },
    );
    if (!ok) return;

    setIsLoading(true);
    try {
      await api.delete(`/lahan/${id_hapus}`);
      setDaftarLahan(daftarLahan.filter((l) => l.id !== id_hapus));
      setLahanAktif(null);
      showToast("Lahan berhasil dihapus.", "success");
    } catch (error) {
      console.error("Gagal menghapus lahan:", error);
      showToast("Gagal menghapus lahan. Coba beberapa saat lagi.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const simpanDataPanen = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.put(`/lahan/${lahanAktif.id}/panen`, {
        tonase_asli: parseFloat(inputTonase),
        status: "Sudah Panen",
      });

      const lahanDiperbarui = response.data;
      setDaftarLahan(
        daftarLahan.map((l) =>
          l.id === lahanDiperbarui.id ? lahanDiperbarui : l,
        ),
      );
      setLahanAktif(lahanDiperbarui);
      setIsModalPanenBuka(false);
      setInputTonase("");
      showToast(`Data panen ${inputTonase} Kg berhasil dicatat! 🌾`, "success");
    } catch (error) {
      console.error("Gagal menyimpan data panen:", error);
      showToast("Gagal merekam data panen. Coba lagi.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const hitungAkurasi = (estimasi, asli) => {
    if (!estimasi || !asli || asli === 0) return 0;
    const selisih = Math.abs(estimasi - asli);
    const akurasi = 100 - (selisih / asli) * 100;
    return akurasi > 0 ? akurasi.toFixed(1) : 0;
  };

  const formatAngka = (nilai) =>
    Number(nilai || 0).toLocaleString("id-ID", { maximumFractionDigits: 2 });

  const dapatkanStatusLahan = (lahan) => {
    const status = (lahan.status || "").toLowerCase();

    if (status.includes("sudah") || status.includes("selesai")) {
      return {
        id: "selesai",
        label: "Selesai",
        className: "border-gray-200 bg-gray-100 text-gray-600",
      };
    }

    if (status.includes("akan") || status.includes("pra")) {
      return {
        id: "akan-panen",
        label: "Akan Panen",
        className: "border-[#ffecb3] bg-[#fff8e1] text-[#f57f17]",
      };
    }

    return {
      id: "aktif",
      label: "Aktif",
      className: "border-green-200 bg-green-50 text-green-700",
    };
  };

  const daftarLahanTampil = daftarLahan.filter((lahan) => {
    const status = dapatkanStatusLahan(lahan);
    const cocokFilter = filterAktif === "semua" || status.id === filterAktif;
    const kataKunci = pencarianLahan.trim().toLowerCase();
    const cocokPencarian =
      kataKunci.length === 0 ||
      [lahan.nama_lahan, lahan.varietas, lahan.status]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(kataKunci));

    return cocokFilter && cocokPencarian;
  });

  return (
    <section className="core-layout">
      <div className="core-content">
        <TopNavbar breadcrumbs={breadcrumbs} />
        {/* <div className="w-full p-5 md:p-6 bg-white shadow-sm flex flex-row justify-between items-center shrink-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">
          {lahanAktif ? lahanAktif.nama_lahan : "Lahan Saya"}
        </h1>
        {lahanAktif ? (
          <button
            onClick={() => setLahanAktif(null)}
            className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full"
          >
            Kembali
          </button>
        ) : (
          <button
            onClick={() => setIsModalTambahBuka(true)}
            className="text-sm font-medium text-white bg-primary px-4 py-2 rounded-full shadow-md"
          >
            + Tambah
          </button>
        )}
      </div> */}

        <div className="flex-1 overflow-y-auto p-5 md:p-6 pb-24">
          {isLoading && daftarLahan.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-gray-500">
                Memuat data lahan...
              </p>
            </div>
          ) : lahanAktif ? (
            <div className="flex flex-col gap-10 font-jakarta">
              <section className="relative overflow-hidden rounded-2xl border border-[#173d2d]/30 bg-gradient-to-br from-[#173d2d] to-[#2a5d44] p-8 text-white shadow-xl md:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-white/75">
                      Status Lahan
                    </p>
                    <h2 className="text-[40px] font-normal leading-none tracking-normal md:text-[56px]">
                      {lahanAktif.status === "Belum Panen" || !lahanAktif.status
                        ? "Masa Perawatan"
                        : "Selesai Panen"}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[20px] font-medium leading-7 text-white/85">
                      {lahanAktif.status === "Belum Panen" || !lahanAktif.status
                        ? "Lakukan estimasi cerdas AI sebelum musim panen tiba."
                        : "Data panen telah dicatat untuk evaluasi produktivitas lahan."}
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-white/20 bg-white/10 px-7 py-3 text-base font-extrabold text-white shadow-inner backdrop-blur-md">
                    {lahanAktif.status || "Belum Panen"}
                  </span>
                </div>
              </section>

              {lahanAktif.status !== "Belum Panen" && lahanAktif.status && (
                <section className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)] md:grid-cols-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Estimasi YOLOv8
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-[#173d2d]">
                      {formatAngka(lahanAktif.estimasi_ai)} Kg
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Tonase Asli
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-[#173d2d]">
                      {formatAngka(lahanAktif.tonase_asli)} Kg
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Tingkat Akurasi AI
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-[#087044]">
                      {lahanAktif.estimasi_ai && lahanAktif.tonase_asli
                        ? hitungAkurasi(
                            lahanAktif.estimasi_ai,
                            lahanAktif.tonase_asli,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </section>
              )}

              <section>
                <h3 className="mb-5 text-[28px] font-extrabold leading-9 text-black">
                  Informasi Pertanian
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:border-[#316947]/30">
                    <div className="mb-6 flex items-center gap-4">
                      <Leaf
                        className="h-6 w-6 text-[#002719]"
                        strokeWidth={2.4}
                      />
                      <p className="text-sm font-semibold text-gray-600">
                        Varietas
                      </p>
                    </div>
                    <p className="text-[20px] font-medium text-black">
                      {lahanAktif.varietas || "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:border-[#316947]/30">
                    <div className="mb-6 flex items-center gap-4">
                      <Maximize2
                        className="h-6 w-6 text-[#002719]"
                        strokeWidth={2.4}
                      />
                      <p className="text-sm font-semibold text-gray-600">
                        Luas Area
                      </p>
                    </div>
                    <p className="text-[20px] font-medium text-black">
                      {formatAngka(lahanAktif.luas_area)} Hektar
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:border-[#316947]/30">
                    <div className="mb-6 flex items-center gap-4">
                      <Trees
                        className="h-6 w-6 text-[#002719]"
                        strokeWidth={2.4}
                      />
                      <p className="text-sm font-semibold text-gray-600">
                        Jumlah Pohon
                      </p>
                    </div>
                    <p className="text-[20px] font-medium text-black">
                      {formatAngka(lahanAktif.populasi_pohon)} Batang
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:border-[#316947]/30">
                    <div className="mb-6 flex items-center gap-4">
                      <CalendarDays
                        className="h-6 w-6 text-[#002719]"
                        strokeWidth={2.4}
                      />
                      <p className="text-sm font-semibold text-gray-600">
                        Mulai Tanam
                      </p>
                    </div>
                    <p className="text-[20px] font-medium text-black">
                      {lahanAktif.tanggal_tanam || "-"}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mx-auto flex w-full max-w-[760px] flex-col gap-4">
                {(lahanAktif.status === "Belum Panen" ||
                  !lahanAktif.status) && (
                  <>
                    <Link
                      to="/scan-tonase"
                      state={{
                        lahanTitipan: lahanAktif,
                        breadcrumbs: [
                          { label: "Lahan", to: "/lahan" },
                          { label: lahanAktif.nama_lahan },
                          { label: "Scan Tonase" },
                        ],
                      }}
                    >
                      <button className="flex h-[72px] w-full items-center justify-center gap-3 rounded-xl bg-[#002719] px-8 text-[17px] font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#173d2d] active:scale-[0.99]">
                        <BrainCircuit className="h-6 w-6" strokeWidth={2.4} />
                        Mulai Estimasi YOLOv8
                      </button>
                    </Link>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <button
                        onClick={() => setIsModalPanenBuka(true)}
                        className="flex h-16 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 text-[17px] font-extrabold text-black shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:bg-[#f6f3eb]"
                      >
                        <CheckCircle2 className="h-6 w-6 text-[#002719]" />
                        Tandai Sudah Panen
                      </button>

                      <button
                        onClick={bukaModalEdit}
                        className="flex h-16 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 text-[17px] font-extrabold text-black shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:bg-[#f6f3eb]"
                      >
                        <Edit3 className="h-6 w-6 text-[#002719]" />
                        Edit Data Lahan
                      </button>
                    </div>
                  </>
                )}

                {lahanAktif.status !== "Belum Panen" && lahanAktif.status && (
                  <button
                    onClick={bukaModalEdit}
                    className="flex h-16 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-6 text-[17px] font-extrabold text-black shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:bg-[#f6f3eb]"
                  >
                    <Edit3 className="h-6 w-6 text-[#002719]" />
                    Edit Data Lahan
                  </button>
                )}

                <button
                  onClick={() => hapusLahan(lahanAktif.id)}
                  className="mt-3 flex h-16 w-full items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 px-6 text-[17px] font-extrabold text-red-600 transition-colors hover:bg-red-100"
                >
                  <Trash2 className="h-6 w-6" />
                  Hapus Lahan
                </button>
              </section>
            </div>
          ) : daftarLahan.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center opacity-60">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  ></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                Belum Ada Lahan
              </h2>
              <p className="text-sm text-gray-500 px-4">
                Anda belum mendaftarkan lahan. Tambahkan lahan baru untuk
                menghitung panen.
              </p>
              <button
                type="button"
                onClick={() => setIsModalTambahBuka(true)}
                className="mt-3 inline-flex h-12 items-center gap-2 rounded-lg bg-[#173d2d] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#002719] active:scale-95"
              >
                <Plus className="h-5 w-5" strokeWidth={2.4} />
                Tambah Lahan
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-7 font-jakarta">
              <div className="flex flex-col gap-4 border-b border-[#e5e2da] pb-5">
                {/* <div className="flex justify-end">
              
              </div> */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex w-full gap-7 overflow-x-auto pb-1 lg:w-auto lg:pb-0">
                    {tabLahan.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFilterAktif(tab.id)}
                        className={`shrink-0 border-b-2 pb-3 text-[16px] font-semibold leading-5 tracking-wide transition-colors ${
                          filterAktif === tab.id
                            ? "border-[#002719] text-[#002719]"
                            : "border-transparent text-gray-700 hover:text-[#002719]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center flex-row gap-3">
                    <label className="relative w-full lg:w-[360px]">
                      <Search
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                        strokeWidth={2.2}
                      />
                      <input
                        type="search"
                        value={pencarianLahan}
                        onChange={(event) =>
                          setPencarianLahan(event.target.value)
                        }
                        placeholder="Cari lahan..."
                        className="h-12 w-full rounded-lg border border-gray-300 bg-white px-12 text-[18px] text-gray-700 outline-none transition-colors placeholder:text-gray-500 focus:border-[#316947] focus:ring-2 focus:ring-[#316947]/15"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsModalTambahBuka(true)}
                      className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#173d2d] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#002719] active:scale-95"
                    >
                      <Plus className="h-5 w-5" strokeWidth={2.4} />
                      Tambah Lahan
                    </button>
                  </div>
                </div>
              </div>

              {daftarLahanTampil.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white/70 p-8 text-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    Lahan tidak ditemukan
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Coba ubah kata pencarian atau pilih tab lainnya.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {daftarLahanTampil.map((lahan, index) => {
                    const statusLahan = dapatkanStatusLahan(lahan);

                    return (
                      <div
                        key={lahan.id}
                        onClick={() => setLahanAktif(lahan)}
                        className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:border-[#316947]/40 active:scale-[0.99] md:min-h-[182px] md:flex-row md:gap-6"
                      >
                        <div className="h-36 w-full shrink-0 overflow-hidden rounded-lg bg-[#f1eee6] md:h-[140px] md:w-[140px]">
                          <img
                            src={
                              lahanThumbnails[index % lahanThumbnails.length]
                            }
                            alt={lahan.nama_lahan || "Foto lahan"}
                            onError={(event) => {
                              event.currentTarget.src = farmPlaceholder;
                            }}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 py-1">
                          <div>
                            <div className="mb-3 flex items-start justify-between gap-3">
                              <h3 className="min-w-0 truncate text-[22px] font-extrabold leading-7 text-black">
                                {lahan.nama_lahan || "Lahan Tanpa Nama"}
                              </h3>
                              <button
                                type="button"
                                onClick={(event) => event.stopPropagation()}
                                className="-mr-2 -mt-1 rounded-full p-1 text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#002719]"
                                aria-label={`Menu ${lahan.nama_lahan || "lahan"}`}
                              >
                                <MoreVertical
                                  className="h-6 w-6"
                                  strokeWidth={3}
                                />
                              </button>
                            </div>

                            <p className="flex items-center gap-1.5 text-[16px] leading-6 text-gray-700">
                              <MapPin
                                className="h-4 w-4 shrink-0"
                                strokeWidth={2.2}
                              />
                              <span className="truncate">
                                {lahan.lokasi || "Sukabumi, Jawa Barat"}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[16px] leading-6 text-gray-700">
                              <span className="flex items-center gap-1.5 whitespace-nowrap">
                                <Sprout
                                  className="h-4 w-4 text-[#316947]"
                                  strokeWidth={2.2}
                                />
                                {formatAngka(lahan.populasi_pohon)} Pohon
                              </span>
                              <span className="flex items-center gap-1.5 whitespace-nowrap">
                                <Maximize2
                                  className="h-4 w-4 text-[#316947]"
                                  strokeWidth={2.2}
                                />
                                Luas {formatAngka(lahan.luas_area)} m²
                              </span>
                            </div>

                            <span
                              className={`w-fit rounded-md border px-3 py-1.5 text-[13px] font-extrabold leading-4 ${statusLahan.className}`}
                            >
                              {statusLahan.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Tambah Lahan */}
      {isModalTambahBuka && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">Tambah Lahan</h2>
              <button
                onClick={() => setIsModalTambahBuka(false)}
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <form onSubmit={simpanLahanBaru} className="flex flex-col gap-3">
              <input
                required
                type="text"
                name="nama_lahan"
                value={formLahan.nama_lahan}
                onChange={tanganiPerubahanInput}
                placeholder="Nama Lahan / Blok"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <input
                required
                type="text"
                name="varietas"
                value={formLahan.varietas}
                onChange={tanganiPerubahanInput}
                placeholder="Varietas (Contoh: Kaliber)"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <input
                required
                type="number"
                step="0.01"
                name="luas_area"
                value={formLahan.luas_area}
                onChange={tanganiPerubahanInput}
                placeholder="Luas Area (Hektar)"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <input
                required
                type="number"
                name="populasi_pohon"
                value={formLahan.populasi_pohon}
                onChange={tanganiPerubahanInput}
                placeholder="Jumlah Pohon"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <button
                type="submit"
                className="w-full mt-3 py-3 bg-primary text-white font-bold rounded-xl shadow-md"
              >
                Simpan Lahan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Lahan */}
      {isModalEditBuka && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Data Lahan
              </h2>
              <button
                onClick={() => setIsModalEditBuka(false)}
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <form onSubmit={simpanEditLahan} className="flex flex-col gap-3">
              <label className="text-xs text-gray-500 font-bold -mb-2">
                Nama Lahan
              </label>
              <input
                required
                type="text"
                name="nama_lahan"
                value={formEditLahan.nama_lahan}
                onChange={tanganiPerubahanEdit}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />

              <label className="text-xs text-gray-500 font-bold -mb-2">
                Varietas
              </label>
              <input
                required
                type="text"
                name="varietas"
                value={formEditLahan.varietas}
                onChange={tanganiPerubahanEdit}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />

              <label className="text-xs text-gray-500 font-bold -mb-2">
                Luas Area (Hektar)
              </label>
              <input
                required
                type="number"
                step="0.01"
                name="luas_area"
                value={formEditLahan.luas_area}
                onChange={tanganiPerubahanEdit}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />

              <label className="text-xs text-gray-500 font-bold -mb-2">
                Populasi Pohon
              </label>
              <input
                required
                type="number"
                name="populasi_pohon"
                value={formEditLahan.populasi_pohon}
                onChange={tanganiPerubahanEdit}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />

              <label className="text-xs text-gray-500 font-bold -mb-2">
                Tanggal Mulai Tanam
              </label>
              <input
                type="date"
                name="tanggal_tanam"
                value={formEditLahan.tanggal_tanam}
                onChange={tanganiPerubahanEdit}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />

              <button
                type="submit"
                className="w-full mt-3 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tandai Panen */}
      {isModalPanenBuka && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">Tandai Panen</h2>
              <button
                onClick={() => setIsModalPanenBuka(false)}
                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Masukkan total hasil timbangan asli lahan ini untuk menguji
              akurasi algoritma YOLOv8.
            </p>
            <form onSubmit={simpanDataPanen} className="flex flex-col gap-3">
              <input
                required
                type="number"
                step="0.01"
                value={inputTonase}
                onChange={(e) => setInputTonase(e.target.value)}
                placeholder="Total Tonase Asli (Kg)"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm"
              />
              <button
                type="submit"
                className="w-full mt-3 py-3 bg-gray-800 text-white font-bold rounded-xl shadow-md"
              >
                Simpan Data Panen
              </button>
            </form>
          </div>
        </div>
      )}
      <BottomMenu />
    </section>
  );
};

export default LahanPage;
