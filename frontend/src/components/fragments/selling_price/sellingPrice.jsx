import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import BottomMenu from "../../layouts/bottomMenu";
import TopNavbar from "../../layouts/navbarDashboard";
import { useConfirm } from "../../ui/confirm/useConfirm";
import { useToast } from "../../ui/toast/ToastContext";
import CurrentPriceSection from "./CurrentPriceSection";
import LegacyHiddenPriceContent from "./LegacyHiddenPriceContent";
import { AddVarietyModal, UpdatePriceModal } from "./PriceModals";
import PriceHistorySection from "./PriceHistorySection";
import SellingPriceHero from "./SellingPriceHero";
import SellingPriceInfoNotice from "./SellingPriceInfoNotice";
import SellingPriceToolbar from "./SellingPriceToolbar";
import {
  filterDaftarHarga,
  filterRiwayatHarga,
  hitungHargaTertinggi,
} from "./sellingPriceUtils";

const SellingPrice = () => {
  const [daftarHarga, setDaftarHarga] = useState([]);
  const [riwayatHarga, setRiwayatHarga] = useState([]);
  const [isModalUpdateBuka, setIsModalUpdateBuka] = useState(false);
  const [isModalTambahBuka, setIsModalTambahBuka] = useState(false);
  const [varietasTerpilih, setVarietasTerpilih] = useState(null);
  const [inputHargaBaru, setInputHargaBaru] = useState("");
  const [pencarianHarga, setPencarianHarga] = useState("");
  const [formVarietas, setFormVarietas] = useState({ nama: "", hargaAwal: "" });

  const { showToast } = useToast();
  const confirm = useConfirm();

  const tutupModalHarga = () => {
    setIsModalUpdateBuka(false);
    setIsModalTambahBuka(false);
  };

  const breadcrumbs = [
    {
      label: "Harga Jual",
      onClick:
        isModalUpdateBuka || isModalTambahBuka ? tutupModalHarga : undefined,
    },
  ];

  if (isModalUpdateBuka && varietasTerpilih) {
    breadcrumbs.push({ label: varietasTerpilih.varietas });
  }
  if (isModalTambahBuka) breadcrumbs.push({ label: "Tambah Varietas" });

  async function panggilDataHarga() {
    try {
      const [resHarga, resRiwayat] = await Promise.all([
        api.get("/harga"),
        api.get("/harga/riwayat"),
      ]);
      setDaftarHarga(resHarga.data);
      setRiwayatHarga(resRiwayat.data);
    } catch (error) {
      console.error("Gagal mengambil data harga dari peladen:", error);
    }
  }

  useEffect(() => {
    let dibatalkan = false;

    Promise.all([api.get("/harga"), api.get("/harga/riwayat")])
      .then(([resHarga, resRiwayat]) => {
        if (!dibatalkan) {
          setDaftarHarga(resHarga.data);
          setRiwayatHarga(resRiwayat.data);
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil data harga dari peladen:", error);
      });

    return () => {
      dibatalkan = true;
    };
  }, []);

  const bukaModalUpdate = (item) => {
    setVarietasTerpilih(item);
    setInputHargaBaru(item.harga);
    setIsModalUpdateBuka(true);
  };

  const simpanHargaBaru = async (e) => {
    e.preventDefault();
    const hargaBaruNum = Number(inputHargaBaru);

    let trenBaru = "tetap";
    let selisihBaru = 0;

    if (hargaBaruNum > varietasTerpilih.harga) {
      trenBaru = "naik";
      selisihBaru = hargaBaruNum - varietasTerpilih.harga;
    } else if (hargaBaruNum < varietasTerpilih.harga) {
      trenBaru = "turun";
      selisihBaru = varietasTerpilih.harga - hargaBaruNum;
    }

    try {
      await api.put(`/harga/${varietasTerpilih.id}`, {
        harga: hargaBaruNum,
        tren: trenBaru,
        selisih: selisihBaru,
      });

      await panggilDataHarga();
      setIsModalUpdateBuka(false);
      setInputHargaBaru("");
      showToast(
        `Harga ${varietasTerpilih.varietas} berhasil diperbarui!`,
        "success",
      );
    } catch (error) {
      showToast("Gagal memperbarui harga. Periksa koneksi Anda.", "error");
      console.error(error);
    }
  };

  const tanganiInputVarietas = (e) => {
    const { name, value } = e.target;
    setFormVarietas({ ...formVarietas, [name]: value });
  };

  const simpanVarietasBaru = async (e) => {
    e.preventDefault();
    const hargaAwalNum = Number(formVarietas.hargaAwal);

    try {
      await api.post("/harga", {
        varietas: formVarietas.nama,
        harga: hargaAwalNum,
      });

      await panggilDataHarga();
      setIsModalTambahBuka(false);
      setFormVarietas({ nama: "", hargaAwal: "" });
      showToast(
        `Varietas "${formVarietas.nama}" berhasil ditambahkan!`,
        "success",
      );
    } catch (error) {
      showToast("Gagal menyimpan varietas baru.", "error");
      console.error(error);
    }
  };

  const hapusHarga = async (id) => {
    const ok = await confirm(
      "Varietas ini dan riwayat terkait akan dihapus permanen.",
      {
        title: "Hapus Varietas?",
        confirmLabel: "Ya, Hapus",
        color: "danger",
      },
    );
    if (!ok) return;
    try {
      await api.delete(`/harga/${id}`);
      await panggilDataHarga();
      showToast("Varietas berhasil dihapus.", "success");
    } catch (error) {
      showToast("Gagal menghapus varietas.", "error");
      console.error(error);
    }
  };

  const hapusSemuaHarga = async () => {
    const ok = await confirm(
      "Semua varietas dan harga akan dihapus secara permanen.",
      {
        title: "Hapus Semua Varietas?",
        confirmLabel: "Ya, Hapus Semua",
        color: "danger",
      },
    );
    if (!ok) return;
    try {
      await api.delete("/harga");
      await panggilDataHarga();
      showToast("Semua varietas berhasil dihapus.", "success");
    } catch (error) {
      showToast("Gagal menghapus semua varietas.", "error");
      console.error(error);
    }
  };

  const hapusRiwayat = async (id) => {
    const ok = await confirm("Riwayat harga ini akan dihapus permanen.", {
      title: "Hapus Riwayat?",
      confirmLabel: "Ya, Hapus",
      color: "warning",
    });
    if (!ok) return;
    try {
      await api.delete(`/harga/riwayat/${id}`);
      await panggilDataHarga();
      showToast("Riwayat berhasil dihapus.", "success");
    } catch (error) {
      showToast("Gagal menghapus riwayat.", "error");
      console.error(error);
    }
  };

  const hapusSemuaRiwayat = async () => {
    const ok = await confirm(
      "Seluruh riwayat perubahan harga akan dihapus permanen.",
      {
        title: "Hapus Semua Riwayat?",
        confirmLabel: "Ya, Hapus Semua",
        color: "warning",
      },
    );
    if (!ok) return;
    try {
      await api.delete("/harga/riwayat");
      await panggilDataHarga();
      showToast("Semua riwayat berhasil dihapus.", "success");
    } catch (error) {
      showToast("Gagal menghapus semua riwayat.", "error");
      console.error(error);
    }
  };

  const kataKunciHarga = pencarianHarga.trim().toLowerCase();
  const daftarHargaTampil = useMemo(
    () => filterDaftarHarga(daftarHarga, kataKunciHarga),
    [daftarHarga, kataKunciHarga],
  );
  const riwayatHargaTampil = useMemo(
    () => filterRiwayatHarga(riwayatHarga, kataKunciHarga),
    [kataKunciHarga, riwayatHarga],
  );
  const hargaTertinggi = useMemo(
    () => hitungHargaTertinggi(daftarHarga),
    [daftarHarga],
  );

  return (
    <section className="core-layout">
      <div className="core-content">
        <TopNavbar breadcrumbs={breadcrumbs} />

        <div className="flex-1 overflow-y-auto p-5 md:p-6 pb-24">
          <div className="flex flex-col gap-7 font-jakarta">
            <SellingPriceHero
              hargaTertinggi={hargaTertinggi}
              jumlahVarietas={daftarHarga.length}
            />
            <SellingPriceToolbar
              hapusSemuaHarga={hapusSemuaHarga}
              jumlahHarga={daftarHarga.length}
              pencarianHarga={pencarianHarga}
              setIsModalTambahBuka={setIsModalTambahBuka}
              setPencarianHarga={setPencarianHarga}
            />
            <CurrentPriceSection
              bukaModalUpdate={bukaModalUpdate}
              daftarHarga={daftarHarga}
              daftarHargaTampil={daftarHargaTampil}
              hapusHarga={hapusHarga}
            />
            <PriceHistorySection
              hapusRiwayat={hapusRiwayat}
              hapusSemuaRiwayat={hapusSemuaRiwayat}
              riwayatHarga={riwayatHarga}
              riwayatHargaTampil={riwayatHargaTampil}
            />
            <SellingPriceInfoNotice />
          </div>
        </div>

        <LegacyHiddenPriceContent
          bukaModalUpdate={bukaModalUpdate}
          daftarHarga={daftarHarga}
          hapusHarga={hapusHarga}
          hapusRiwayat={hapusRiwayat}
          hapusSemuaHarga={hapusSemuaHarga}
          hapusSemuaRiwayat={hapusSemuaRiwayat}
          riwayatHarga={riwayatHarga}
          setIsModalTambahBuka={setIsModalTambahBuka}
        />

        {isModalUpdateBuka && (
          <UpdatePriceModal
            inputHargaBaru={inputHargaBaru}
            setInputHargaBaru={setInputHargaBaru}
            setIsModalUpdateBuka={setIsModalUpdateBuka}
            simpanHargaBaru={simpanHargaBaru}
            varietasTerpilih={varietasTerpilih}
          />
        )}

        {isModalTambahBuka && (
          <AddVarietyModal
            formVarietas={formVarietas}
            setIsModalTambahBuka={setIsModalTambahBuka}
            simpanVarietasBaru={simpanVarietasBaru}
            tanganiInputVarietas={tanganiInputVarietas}
          />
        )}
      </div>
      <BottomMenu />
    </section>
  );
};

export default SellingPrice;
