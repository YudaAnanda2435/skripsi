import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../api/axios";
import BottomMenu from "../../layouts/bottomMenu";
import TopNavbar from "../../layouts/navbarDashboard";
import { useToast } from "../../ui/toast/ToastContext";
import HasilEstimasiStep from "./HasilEstimasiStep";
import PilihLahanStep from "./PilihLahanStep";
import ProsesAiStep from "./ProsesAiStep";
import ScanAnimationStyle from "./ScanAnimationStyle";
import ScanStepper from "./ScanStepper";
import TutorialModal from "./TutorialModal";
import UploadSampelStep from "./UploadSampelStep";
import { kategoriSampel } from "./scanTonaseConstants";
import {
  dapatkanStatusLahan,
  kompresGambarBase64,
  normalisasiSrcGambar,
} from "./scanTonaseUtils";

const stepLabels = {
  2: "Upload Sampel",
  4: "Proses AI",
  5: "Hasil Estimasi",
};

const ScanTonase = () => {
  const [daftarLahan, setDaftarLahan] = useState([]);
  const [isLoadingLahan, setIsLoadingLahan] = useState(true);
  const [langkah, setLangkah] = useState(1);
  const [lahanPilihan, setLahanPilihan] = useState(null);
  const [bukaTutorial, setBukaTutorial] = useState(false);
  const [sedangMemproses, setSedangMemproses] = useState(false);
  const [progressAI, setProgressAI] = useState(0);
  const [filterLahan, setFilterLahan] = useState("semua");
  const [pencarianLahan, setPencarianLahan] = useState("");
  const [hargaOtomatis, setHargaOtomatis] = useState(0);
  const [fotoHasilAI, setFotoHasilAI] = useState({
    lebat: null,
    sedang: null,
    kurang: null,
  });
  const [beratRataRata, setBeratRataRata] = useState("");
  const [persentase, setPersentase] = useState({
    lebat: "",
    sedang: "",
    kurang: "",
  });
  const [foto, setFoto] = useState({ lebat: null, sedang: null, kurang: null });
  const [pratinjauFoto, setPratinjauFoto] = useState({
    lebat: null,
    sedang: null,
    kurang: null,
  });
  const [hasilEstimasi, setHasilEstimasi] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const location = useLocation();
  const { showToast } = useToast();
  const progressIntervalRef = useRef(null);

  const resetScan = useCallback(() => {
    setProgressAI(0);
    setLangkah(1);
    setLahanPilihan(null);
    setFoto({ lebat: null, sedang: null, kurang: null });
    setPratinjauFoto({ lebat: null, sedang: null, kurang: null });
    setHasilEstimasi(null);
  }, []);

  const hentikanProgressAI = () => {
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const mulaiProgressAI = () => {
    hentikanProgressAI();
    setProgressAI(0);

    const waktuMulai = Date.now();
    progressIntervalRef.current = window.setInterval(() => {
      const durasiBerjalan = Date.now() - waktuMulai;
      const progressBertahap = 96 * (1 - Math.exp(-durasiBerjalan / 9000));

      setProgressAI((progressSaatIni) =>
        Math.max(progressSaatIni, Math.min(96, Math.round(progressBertahap))),
      );
    }, 180);
  };

  const selesaikanProgressAI = () => {
    hentikanProgressAI();
    setProgressAI(100);

    return new Promise((resolve) => {
      window.setTimeout(resolve, 500);
    });
  };

  useEffect(() => () => hentikanProgressAI(), []);

  const pilihLahan = useCallback(
    async (lahan) => {
      setLahanPilihan(lahan);

      try {
        const response = await api.get(`/harga/varietas/${lahan.varietas}`);
        setHargaOtomatis(response.data.harga);
      } catch (error) {
        console.error("Gagal menarik harga otomatis:", error);
        setHargaOtomatis(0);
        showToast(
          `Harga varietas ${lahan.varietas} belum diatur. Estimasi pendapatan akan Rp 0.`,
          "warning",
        );
      }

      setLangkah(2);
    },
    [showToast],
  );

  useEffect(() => {
    let dibatalkan = false;
    const lahanTitipan = location.state?.lahanTitipan;

    api
      .get("/lahan")
      .then((response) => {
        if (!dibatalkan) {
          setDaftarLahan(response.data);
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil data lahan:", error);
      })
      .finally(() => {
        if (!dibatalkan) {
          setIsLoadingLahan(false);
        }
      });

    if (lahanTitipan) {
      Promise.resolve().then(() => {
        if (!dibatalkan) {
          pilihLahan(lahanTitipan);
        }
      });
    }

    return () => {
      dibatalkan = true;
    };
  }, [location.state, pilihLahan]);

  const inheritedBreadcrumbs = location.state?.breadcrumbs || [];
  const breadcrumbs =
    inheritedBreadcrumbs.length > 0
      ? inheritedBreadcrumbs.map((item, index) =>
          index === inheritedBreadcrumbs.length - 1 && langkah > 1
            ? { ...item, onClick: resetScan }
            : item,
        )
      : [
          {
            label: "Scan Tonase",
            onClick: langkah > 1 ? resetScan : undefined,
          },
        ];

  if (!inheritedBreadcrumbs.length && lahanPilihan) {
    breadcrumbs.push({
      label: lahanPilihan.nama_lahan,
      onClick: langkah > 2 ? () => setLangkah(2) : undefined,
    });
  }
  if (langkah > 1) breadcrumbs.push({ label: stepLabels[langkah] });

  const tanganiPersentase = (e) => {
    const { name, value } = e.target;
    setPersentase({ ...persentase, [name]: value });
  };

  const tanganiUnggahFoto = (e, kondisi) => {
    const file = e.target.files[0];
    if (file) {
      setFoto({ ...foto, [kondisi]: file });
      setPratinjauFoto({
        ...pratinjauFoto,
        [kondisi]: URL.createObjectURL(file),
      });
    }
  };

  const hapusFoto = (kondisi) => {
    setFoto({ ...foto, [kondisi]: null });
    setPratinjauFoto({ ...pratinjauFoto, [kondisi]: null });
  };

  const kirimGambarKeAI = async (fileGambar) => {
    const formData = new FormData();
    formData.append("file", fileGambar);

    try {
      const response = await api.post("/deteksi", formData);
      return {
        jumlah: response.data.hasil.length,
        gambar: response.data.gambar_hasil,
      };
    } catch (error) {
      console.error("Gagal deteksi:", error);
      return { jumlah: 0, gambar: null };
    }
  };

  const prosesYOLOv8 = async () => {
    setSedangMemproses(true);
    mulaiProgressAI();

    const [resLebat, resSedang, resKurang] = await Promise.all([
      kirimGambarKeAI(foto.lebat),
      kirimGambarKeAI(foto.sedang),
      kirimGambarKeAI(foto.kurang),
    ]);

    setFotoHasilAI({
      lebat: resLebat.gambar,
      sedang: resSedang.gambar,
      kurang: resKurang.gambar,
    });

    await selesaikanProgressAI();
    setSedangMemproses(false);

    const jmlLebat = resLebat.jumlah;
    const jmlSedang = resSedang.jumlah;
    const jmlKurang = resKurang.jumlah;

    if (jmlLebat === 0 && jmlSedang === 0 && jmlKurang === 0) return;

    const totalPohon = lahanPilihan.populasi_pohon;
    const propLebat = Number(persentase.lebat) / 100;
    const propSedang = Number(persentase.sedang) / 100;
    const propKurang = Number(persentase.kurang) / 100;
    const beratGram = Number(beratRataRata);
    const hargaKg = Number(hargaOtomatis);

    const totalCabaiLahan =
      totalPohon * propLebat * jmlLebat +
      totalPohon * propSedang * jmlSedang +
      totalPohon * propKurang * jmlKurang;

    const tonaseKg = (totalCabaiLahan * beratGram) / 1000;
    const totalPendapatan = tonaseKg * hargaKg;

    setHasilEstimasi({
      cabaiTerdeteksi: jmlLebat + jmlSedang + jmlKurang,
      detailDeteksi: { lebat: jmlLebat, sedang: jmlSedang, kurang: jmlKurang },
      tonaseTotal: tonaseKg.toFixed(2),
      potensiPendapatan: totalPendapatan,
    });

    setLangkah(5);
  };

  const mulaiScanAI = () => {
    const total =
      Number(persentase.lebat) +
      Number(persentase.sedang) +
      Number(persentase.kurang);

    if (!beratRataRata) {
      showToast("Masukkan berat rata-rata cabai terlebih dahulu.", "warning");
      return;
    }
    if (total !== 100) {
      showToast(`Total persentase harus 100%. Total saat ini: ${total}%`, "warning");
      return;
    }
    if (!foto.lebat || !foto.sedang || !foto.kurang) {
      showToast("Lengkapi ketiga foto sampel terlebih dahulu.", "warning");
      return;
    }
    setLangkah(4);
    prosesYOLOv8();
  };

  const simpanAnalisa = async () => {
    try {
      const [lebatKompres, sedangKompres, kurangKompres] = await Promise.all([
        kompresGambarBase64(fotoHasilAI.lebat),
        kompresGambarBase64(fotoHasilAI.sedang),
        kompresGambarBase64(fotoHasilAI.kurang),
      ]);
      const dataKirim = {
        lahan_id: parseInt(lahanPilihan.id),
        total_cabai: parseInt(hasilEstimasi.cabaiTerdeteksi),
        estimasi_tonase: parseFloat(hasilEstimasi.tonaseTotal),
        potensi_pendapatan: parseFloat(hasilEstimasi.potensiPendapatan),
        persentase_lebat: parseFloat(persentase.lebat),
        persentase_sedang: parseFloat(persentase.sedang),
        persentase_kurang: parseFloat(persentase.kurang),
        berat_rata_rata: parseFloat(beratRataRata),
        foto_lebat: lebatKompres,
        foto_sedang: sedangKompres,
        foto_kurang: kurangKompres,
      };

      await api.post("/riwayat-analisa", dataKirim);
      showToast("Data analisa berhasil tersimpan ke database! ðŸŒ¿", "success");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      if (error.response) {
        const rincianGalat = JSON.stringify(error.response.data.detail, null, 2);
        showToast(`Server menolak data: ${rincianGalat}`, "error");
      } else {
        showToast("Gagal terhubung ke server. Pastikan server menyala.", "error");
      }
    }
  };

  const daftarLahanTampil = useMemo(
    () =>
      daftarLahan.filter((lahan) => {
        const status = dapatkanStatusLahan(lahan);
        const cocokFilter = filterLahan === "semua" || status.id === filterLahan;
        const kataKunci = pencarianLahan.trim().toLowerCase();
        const cocokPencarian =
          kataKunci.length === 0 ||
          [lahan.nama_lahan, lahan.varietas, lahan.status]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(kataKunci));

        return cocokFilter && cocokPencarian;
      }),
    [daftarLahan, filterLahan, pencarianLahan],
  );

  const langkahVisual =
    langkah >= 5 ? 4 : langkah >= 4 ? 3 : langkah >= 2 ? 2 : 1;
  const slidesHasilAI = kategoriSampel.map((kategori) => ({
    src: normalisasiSrcGambar(fotoHasilAI[kategori.id]),
    title: `Kondisi ${kategori.label}`,
  }));
  const totalPopulasi = Number(lahanPilihan?.populasi_pohon || 0);
  const totalTonase = Number(hasilEstimasi?.tonaseTotal || 0);
  const totalPendapatan = Number(hasilEstimasi?.potensiPendapatan || 0);
  const jumlahTerdeteksi = Number(hasilEstimasi?.cabaiTerdeteksi || 0);
  const beratSampleKg = (jumlahTerdeteksi * Number(beratRataRata || 0)) / 1000;
  const akurasiAI = jumlahTerdeteksi > 0 ? 94 : 0;
  const faktorEkstrapolasi = totalPopulasi || 0;

  return (
    <section className="core-layout">
      <ScanAnimationStyle />
      <div className="core-content">
        <TopNavbar breadcrumbs={breadcrumbs} />

        <div className="flex-1 overflow-y-auto p-5 pb-24">
          <ScanStepper langkahVisual={langkahVisual} />

          {langkah === 1 && (
            <PilihLahanStep
              daftarLahan={daftarLahan}
              daftarLahanTampil={daftarLahanTampil}
              dapatkanStatusLahan={dapatkanStatusLahan}
              isLoadingLahan={isLoadingLahan}
              filterLahan={filterLahan}
              pencarianLahan={pencarianLahan}
              pilihLahan={pilihLahan}
              setFilterLahan={setFilterLahan}
              setPencarianLahan={setPencarianLahan}
            />
          )}

          {langkah === 2 && (
            <UploadSampelStep
              beratRataRata={beratRataRata}
              foto={foto}
              hapusFoto={hapusFoto}
              lahanPilihan={lahanPilihan}
              mulaiScanAI={mulaiScanAI}
              persentase={persentase}
              pratinjauFoto={pratinjauFoto}
              setBeratRataRata={setBeratRataRata}
              setBukaTutorial={setBukaTutorial}
              setLangkah={setLangkah}
              tanganiPersentase={tanganiPersentase}
              tanganiUnggahFoto={tanganiUnggahFoto}
            />
          )}

          {langkah === 4 && sedangMemproses && (
            <ProsesAiStep pratinjauFoto={pratinjauFoto} progressAI={progressAI} />
          )}

          {langkah === 5 && hasilEstimasi && (
            <HasilEstimasiStep
              akurasiAI={akurasiAI}
              beratRataRata={beratRataRata}
              beratSampleKg={beratSampleKg}
              faktorEkstrapolasi={faktorEkstrapolasi}
              fotoHasilAI={fotoHasilAI}
              detailDeteksi={hasilEstimasi.detailDeteksi}
              jumlahTerdeteksi={jumlahTerdeteksi}
              lahanPilihan={lahanPilihan}
              lightboxIndex={lightboxIndex}
              persentase={persentase}
              resetScan={resetScan}
              setLightboxIndex={setLightboxIndex}
              simpanAnalisa={simpanAnalisa}
              slidesHasilAI={slidesHasilAI}
              totalPendapatan={totalPendapatan}
              totalTonase={totalTonase}
            />
          )}
        </div>
      </div>

      {bukaTutorial && <TutorialModal onClose={() => setBukaTutorial(false)} />}
      <BottomMenu />
    </section>
  );
};

export default ScanTonase;
