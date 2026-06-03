import {
  CircleDollarSign,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatRupiah, formatTanggalHarga } from "./sellingPriceUtils";

const PRICE_ITEMS_PER_PAGE = 4;

const CurrentPriceSection = ({
  bukaModalUpdate,
  daftarHarga,
  daftarHargaTampil,
  hapusHarga,
}) => {
  const [halamanAktif, setHalamanAktif] = useState(1);
  const totalHalaman = Math.max(
    1,
    Math.ceil(daftarHargaTampil.length / PRICE_ITEMS_PER_PAGE),
  );
  const halamanHargaTampil = useMemo(() => {
    const awal = (halamanAktif - 1) * PRICE_ITEMS_PER_PAGE;

    return daftarHargaTampil.slice(awal, awal + PRICE_ITEMS_PER_PAGE);
  }, [daftarHargaTampil, halamanAktif]);

  useEffect(() => {
    setHalamanAktif(1);
  }, [daftarHargaTampil]);

  useEffect(() => {
    if (halamanAktif > totalHalaman) {
      setHalamanAktif(totalHalaman);
    }
  }, [halamanAktif, totalHalaman]);

  const bisaSebelumnya = halamanAktif > 1;
  const bisaSelanjutnya = halamanAktif < totalHalaman;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[28px] font-extrabold leading-9 text-black">
          Harga Saat Ini
        </h2>
        <span className="rounded-full bg-[#f1eee6] px-4 py-2 text-sm font-semibold text-[#414844]">
          {daftarHargaTampil.length} data
        </span>
      </div>

      {daftarHarga.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#c1c8c2] bg-white/70 p-8 text-center">
          <h3 className="text-lg font-bold text-gray-800">
            Belum Ada Data Harga
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Tambahkan varietas cabai untuk mulai mengelola harga pasar.
          </p>
        </div>
      ) : daftarHargaTampil.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#c1c8c2] bg-white/70 p-8 text-center">
          <h3 className="text-lg font-bold text-gray-800">
            Harga tidak ditemukan
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Coba gunakan kata kunci varietas cabai yang lain.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {halamanHargaTampil.map((item) => (
              <PriceCard
                bukaModalUpdate={bukaModalUpdate}
                hapusHarga={hapusHarga}
                item={item}
                key={item.id}
              />
            ))}
          </div>

          {totalHalaman > 1 && (
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setHalamanAktif((halaman) => Math.max(1, halaman - 1))
                }
                disabled={!bisaSebelumnya}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e5e2da] bg-white px-3 text-sm font-extrabold text-[#414844] transition-colors hover:bg-[#f6f3eb] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </button>
              <span className="text-sm font-bold text-[#717973]">
                {halamanAktif} / {totalHalaman}
              </span>
              <button
                type="button"
                onClick={() =>
                  setHalamanAktif((halaman) =>
                    Math.min(totalHalaman, halaman + 1),
                  )
                }
                disabled={!bisaSelanjutnya}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#002719] px-3 text-sm font-extrabold text-white transition-colors hover:bg-[#173d2d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Berikutnya
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

const PriceCard = ({ bukaModalUpdate, hapusHarga, item }) => {
  const isNaik = item.tren === "naik";
  const isTurun = item.tren === "turun";
  const TrenIcon = isNaik ? TrendingUp : isTurun ? TrendingDown : CircleDollarSign;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:border-[#316947]/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#b3f1c5] text-[#173d2d]">
            <CircleDollarSign className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-[20px] font-extrabold leading-7 text-black">
              {item.varietas}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#717973]">
              <Clock3 className="h-4 w-4" />
              Update: {formatTanggalHarga(item)}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold ${
            isNaik
              ? "bg-green-50 text-green-700"
              : isTurun
                ? "bg-red-50 text-red-700"
                : "bg-[#f1eee6] text-[#414844]"
          }`}
        >
          <TrenIcon className="h-4 w-4" />
          {item.selisih > 0 ? `Rp ${formatRupiah(item.selisih)}` : "Tetap"}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[28px] font-extrabold leading-none text-[#002719]">
          Rp {formatRupiah(item.harga)}
          <span className="ml-2 text-sm font-medium text-[#717973]">
            / Kg
          </span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => bukaModalUpdate(item)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#002719] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#173d2d]"
          >
            <Edit3 className="h-4 w-4" />
            Ubah
          </button>
          <button
            type="button"
            onClick={() => hapusHarga(item.id)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors hover:bg-red-100"
            aria-label={`Hapus ${item.varietas}`}
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CurrentPriceSection;
