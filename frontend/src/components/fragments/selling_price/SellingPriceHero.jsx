import { formatRupiah } from "./sellingPriceUtils";

const SellingPriceHero = ({ jumlahVarietas, hargaTertinggi }) => (
  <section className="rounded-2xl border border-[#173d2d]/20 bg-gradient-to-br from-[#173d2d] to-[#2a5d44] p-7 text-white shadow-xl md:p-8">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-white/70">
          Harga Pasar
        </p>
        <h2 className="mt-3 text-[32px] font-extrabold leading-10 md:text-[40px]">
          Pantau Harga Cabai
        </h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-7 text-white/80">
          Perbarui harga jual per kilogram secara rutin agar estimasi
          pendapatan AI tetap mengikuti kondisi pasar terbaru.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:min-w-[340px]">
        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <p className="text-xs font-semibold text-white/70">
            Varietas
          </p>
          <p className="mt-1 text-2xl font-extrabold">
            {jumlahVarietas}
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <p className="text-xs font-semibold text-white/70">
            Harga Tertinggi
          </p>
          <p className="mt-1 text-2xl font-extrabold">
            Rp {formatRupiah(hargaTertinggi)}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default SellingPriceHero;
