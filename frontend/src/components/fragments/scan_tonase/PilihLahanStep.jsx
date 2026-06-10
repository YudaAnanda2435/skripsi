import {
  ChevronRight,
  CircleDashed,
  MapPin,
  Maximize2,
  MoreVertical,
  Plus,
  Scale,
  Search,
  Sprout,
} from "lucide-react";
import { Link } from "react-router-dom";
import farmPlaceholder from "../../../assets/img/dashboard/farm-placeholder.png";
import { lahanThumbnails, tabLahan } from "./scanTonaseConstants";
import { formatAngka } from "./scanTonaseUtils";

const PilihLahanStep = ({
  daftarLahan,
  daftarLahanTampil,
  dapatkanStatusLahan,
  isLoadingLahan,
  filterLahan,
  pencarianLahan,
  pilihLahan,
  setFilterLahan,
  setPencarianLahan,
}) => (
  <div className="flex flex-col gap-7 font-jakarta">
    <div>
      <h2 className="mb-1 text-[28px] font-extrabold leading-9 text-[#173d2d]">
        Pilih Lahan Target
      </h2>
      <p className="text-[16px] leading-6 text-gray-600">
        Pilih lahan yang akan digunakan sebagai target estimasi tonase.
      </p>
    </div>

    <div className="flex flex-col gap-4 border-b border-[#e5e2da] pb-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full gap-7 overflow-x-auto pb-1 lg:w-auto lg:pb-0">
        {tabLahan.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterLahan(tab.id)}
            className={`shrink-0 border-b-2 pb-3 text-[16px] font-semibold leading-5 tracking-wide transition-colors ${
              filterLahan === tab.id
                ? "border-[#002719] text-[#002719]"
                : "border-transparent text-gray-700 hover:text-[#002719]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <label className="relative w-full lg:w-[360px]">
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
          strokeWidth={2.2}
        />
        <input
          type="search"
          value={pencarianLahan}
          onChange={(event) => setPencarianLahan(event.target.value)}
          placeholder="Cari lahan..."
          className="h-14 w-full rounded-lg border border-gray-300 bg-white px-12 text-[18px] text-gray-700 outline-none transition-colors placeholder:text-gray-500 focus:border-[#316947] focus:ring-2 focus:ring-[#316947]/15"
        />
      </label>
    </div>
    {isLoadingLahan ? (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white/70 p-8 text-center">
        <CircleDashed className="mx-auto mb-3 h-8 w-8 animate-spin text-[#316947]" />
        <p className="text-sm font-bold text-gray-500">
          Memuat data lahan...
        </p>
      </div>
    ) : daftarLahan.length === 0 ? (
      <div className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-10 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Scale className="h-10 w-10" strokeWidth={2.2} />
        </div>
        <h3 className="text-xl font-extrabold text-gray-500">
          Belum Ada Lahan
        </h3>
        <p className="mt-5 max-w-2xl text-[16px] leading-6 text-gray-400">
          Anda belum mendaftarkan lahan. Tambahkan lahan baru untuk menghitung panen.
        </p>
        <Link
          to="/lahan"
          className="mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#7a8f83] px-7 text-base font-extrabold text-white shadow-sm transition-colors hover:bg-[#667b70] active:scale-95"
        >
          <Plus className="h-5 w-5" strokeWidth={2.6} />
          Tambah Lahan
        </Link>
      </div>
    ) : daftarLahanTampil.length === 0 ? (
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
              onClick={() => pilihLahan(lahan)}
              className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)] transition-colors hover:border-[#316947]/40 active:scale-[0.99] md:min-h-[182px] md:flex-row md:gap-6"
            >
              <div className="h-36 w-full shrink-0 overflow-hidden rounded-lg bg-[#f1eee6] md:h-[140px] md:w-[140px]">
                <img
                  src={lahanThumbnails[index % lahanThumbnails.length]}
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
                      <MoreVertical className="h-6 w-6" strokeWidth={3} />
                    </button>
                  </div>

                  <p className="flex items-center gap-1.5 text-[16px] leading-6 text-gray-700">
                    <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.2} />
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
                      Luas {formatAngka(lahan.luas_area)} mÂ²
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`w-fit rounded-md border px-3 py-1.5 text-[13px] font-extrabold leading-4 ${statusLahan.className}`}
                    >
                      {statusLahan.label}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b3f1c5] text-[#173d2d] transition-transform group-hover:translate-x-1">
                      <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default PilihLahanStep;
