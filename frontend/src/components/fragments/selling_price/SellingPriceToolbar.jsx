import { Plus, Search } from "lucide-react";

const SellingPriceToolbar = ({
  jumlahHarga,
  hapusSemuaHarga,
  pencarianHarga,
  setIsModalTambahBuka,
  setPencarianHarga,
}) => (
  <section className="rounded-xl border border-[#e5e2da] bg-white p-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <label className="flex-1">
        <span className="mb-2 block text-sm font-semibold text-[#414844]">
          Cari Nama Cabai
        </span>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#717973]" />
          <input
            type="search"
            value={pencarianHarga}
            onChange={(event) => setPencarianHarga(event.target.value)}
            placeholder="Cari varietas cabai..."
            className="h-14 w-full rounded-lg border border-[#c1c8c2] bg-[#f6f3eb] px-12 text-[18px] text-[#1c1c17] outline-none transition-colors placeholder:text-[#717973] focus:border-[#002719] focus:ring-2 focus:ring-[#002719]/10"
          />
        </div>
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        {jumlahHarga > 0 && (
          <button
            type="button"
            onClick={hapusSemuaHarga}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-red-100 bg-red-50 px-5 text-sm font-extrabold text-red-600 transition-colors hover:bg-red-100"
          >
            Hapus Semua
          </button>
        )}
        <button
          type="button"
          onClick={() => setIsModalTambahBuka(true)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#173d2d] px-5 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#002719]"
        >
          <Plus className="h-5 w-5" />
          Varietas Baru
        </button>
      </div>
    </div>
  </section>
);

export default SellingPriceToolbar;
