import { useEffect, useMemo, useRef, useState } from "react";
import api from "../../../api/axios";
import BottomMenu from "../../layouts/bottomMenu";
import TopNavbar from "../../layouts/navbarDashboard";
import { useConfirm } from "../../ui/confirm/useConfirm";
import { useToast } from "../../ui/toast/ToastContext";
import DetailBuktiAnalisa from "./buktiAnalisaDetail";
import { buatLaporanPdf } from "./buktiAnalisaPdf";
import RiwayatBuktiAnalisa from "./buktiAnalisaRiwayat";
import { normalisasiBuktiAnalisa } from "./buktiAnalisaUtils";

const BuktiAnalisa = () => {
  const [daftarBukti, setDaftarBukti] = useState([]);
  const [buktiAktif, setBuktiAktif] = useState(null);
  const [pencarianBukti, setPencarianBukti] = useState("");
  const [filterLahan, setFilterLahan] = useState("semua");
  const [filterWaktu, setFilterWaktu] = useState("30");

  const areaLaporanRef = useRef(null);
  const { showToast } = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    let dibatalkan = false;

    api
      .get("/riwayat-analisa")
      .then((response) => {
        if (!dibatalkan) {
          setDaftarBukti(response.data.map(normalisasiBuktiAnalisa));
        }
      })
      .catch((error) => {
        console.error("Gagal menarik riwayat analisa:", error);
        if (!dibatalkan) {
          setDaftarBukti([]);
        }
      });

    return () => {
      dibatalkan = true;
    };
  }, []);

  const daftarNamaLahan = useMemo(
    () => [...new Set(daftarBukti.map((item) => item.lahan))],
    [daftarBukti],
  );

  const daftarBuktiTampil = useMemo(() => {
    const kataKunci = pencarianBukti.trim().toLowerCase();

    return daftarBukti.filter((bukti) => {
      const cocokPencarian =
        kataKunci.length === 0 ||
        [bukti.lahan, String(bukti.id)].some((value) =>
          value.toLowerCase().includes(kataKunci),
        );
      const cocokLahan = filterLahan === "semua" || bukti.lahan === filterLahan;

      return cocokPencarian && cocokLahan;
    });
  }, [daftarBukti, filterLahan, pencarianBukti]);

  const breadcrumbs = useMemo(() => {
    const items = [
      {
        label: "Bukti Analisa",
        onClick: buktiAktif ? () => setBuktiAktif(null) : undefined,
      },
    ];

    if (buktiAktif) items.push({ label: buktiAktif.lahan });
    return items;
  }, [buktiAktif]);

  const hapusBukti = async (id_hapus) => {
    const ok = await confirm(
      "Dokumen analisa ini akan dihapus secara permanen dan tidak dapat dipulihkan.",
      { title: "Hapus Dokumen Analisa?", confirmLabel: "Ya, Hapus", color: "danger" },
    );
    if (!ok) return;

    try {
      await api.delete(`/riwayat-analisa/${id_hapus}`);
      setDaftarBukti((prevDaftarBukti) =>
        prevDaftarBukti.filter((item) => item.id !== id_hapus),
      );
      setBuktiAktif(null);
      showToast("Dokumen analisa berhasil dihapus.", "success");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      showToast("Gagal menghapus dokumen dari server.", "error");
    }
  };

  return (
    <section className="core-layout">
      <div className="core-content">
        <TopNavbar breadcrumbs={breadcrumbs} />

        <div className="flex-1 overflow-y-auto p-5 pb-12">
          {buktiAktif ? (
            <DetailBuktiAnalisa
              areaLaporanRef={areaLaporanRef}
              buktiAktif={buktiAktif}
              onHapusBukti={hapusBukti}
              onUnduhLaporan={() => buatLaporanPdf(buktiAktif, showToast)}
            />
          ) : (
            <RiwayatBuktiAnalisa
              daftarBukti={daftarBukti}
              daftarBuktiTampil={daftarBuktiTampil}
              daftarNamaLahan={daftarNamaLahan}
              filterLahan={filterLahan}
              filterWaktu={filterWaktu}
              pencarianBukti={pencarianBukti}
              onBukaDetail={setBuktiAktif}
              onFilterLahanChange={setFilterLahan}
              onFilterWaktuChange={setFilterWaktu}
              onPencarianChange={setPencarianBukti}
            />
          )}
        </div>
      </div>
      <BottomMenu />
    </section>
  );
};

export default BuktiAnalisa;
