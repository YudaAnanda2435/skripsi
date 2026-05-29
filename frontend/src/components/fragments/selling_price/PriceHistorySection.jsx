import { Trash } from "lucide-react";
import { formatRupiah } from "./sellingPriceUtils";

const PriceHistorySection = ({
  hapusRiwayat,
  hapusSemuaRiwayat,
  riwayatHarga,
  riwayatHargaTampil,
}) => (
  <section className="overflow-hidden rounded-xl border border-[#e5e2da] bg-white shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
    <div className="flex flex-col gap-3 border-b border-[#e5e2da] bg-[#f6f3eb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-extrabold text-black">
          Riwayat Perubahan
        </h2>
        <p className="mt-1 text-sm text-[#717973]">
          Catatan perubahan harga dari varietas cabai yang dikelola.
        </p>
      </div>
      {riwayatHarga.length > 0 && (
        <button
          type="button"
          onClick={hapusSemuaRiwayat}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-red-100 bg-red-50 px-4 text-sm font-extrabold text-red-600 transition-colors hover:bg-red-100"
        >
          Hapus Semua Riwayat
        </button>
      )}
    </div>

    {riwayatHargaTampil.length === 0 ? (
      <div className="p-8 text-center text-sm font-semibold text-[#717973]">
        Riwayat harga belum tersedia atau tidak sesuai pencarian.
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#e5e2da] bg-white">
              <th className="px-5 py-4 text-sm font-extrabold text-[#414844]">
                Varietas
              </th>
              <th className="px-5 py-4 text-sm font-extrabold text-[#414844]">
                Tanggal
              </th>
              <th className="px-5 py-4 text-right text-sm font-extrabold text-[#414844]">
                Harga
              </th>
              <th className="px-5 py-4 text-center text-sm font-extrabold text-[#414844]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e2da]">
            {riwayatHargaTampil.map((riwayat) => (
              <tr
                key={riwayat.id}
                className="transition-colors hover:bg-[#f6f3eb]/60"
              >
                <td className="px-5 py-4 text-[16px] font-extrabold text-black">
                  {riwayat.varietas}
                </td>
                <td className="px-5 py-4 text-[15px] text-[#414844]">
                  {riwayat.tanggal}
                </td>
                <td className="px-5 py-4 text-right text-[16px] font-extrabold text-[#002719]">
                  Rp {formatRupiah(riwayat.harga)}
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => hapusRiwayat(riwayat.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                    aria-label={`Hapus riwayat ${riwayat.varietas}`}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default PriceHistorySection;
