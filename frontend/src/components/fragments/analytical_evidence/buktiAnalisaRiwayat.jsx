import { ChevronLeft, ChevronRight, Eye, Search, Sprout } from "lucide-react";
import { formatRupiah } from "./buktiAnalisaUtils";

const RiwayatBuktiAnalisa = ({
  daftarBukti,
  daftarBuktiTampil,
  daftarNamaLahan,
  filterLahan,
  filterWaktu,
  pencarianBukti,
  onBukaDetail,
  onFilterLahanChange,
  onFilterWaktuChange,
  onPencarianChange,
}) => (
  <div className="flex flex-col gap-8 font-jakarta">
    <div>
      <p className="text-[18px] leading-7 text-[#414844]">Semua Hasil Analisa Scan Panen Anda.</p>
    </div>

    <FilterRiwayat
      daftarNamaLahan={daftarNamaLahan}
      filterLahan={filterLahan}
      filterWaktu={filterWaktu}
      pencarianBukti={pencarianBukti}
      onFilterLahanChange={onFilterLahanChange}
      onFilterWaktuChange={onFilterWaktuChange}
      onPencarianChange={onPencarianChange}
    />

    {daftarBukti.length === 0 ? (
      <KondisiKosong
        deskripsi={
          <>
            Lakukan pemindaian lahan di halaman <span className="font-bold">Scan Tonase</span> terlebih dahulu.
          </>
        }
        judul="Belum Ada Data Tersimpan"
      />
    ) : daftarBuktiTampil.length === 0 ? (
      <KondisiKosong
        deskripsi="Coba ubah kata pencarian atau filter lahan."
        judul="Data tidak ditemukan"
      />
    ) : (
      <TabelRiwayat
        daftarBukti={daftarBukti}
        daftarBuktiTampil={daftarBuktiTampil}
        onBukaDetail={onBukaDetail}
      />
    )}
  </div>
);

const FilterRiwayat = ({
  daftarNamaLahan,
  filterLahan,
  filterWaktu,
  pencarianBukti,
  onFilterLahanChange,
  onFilterWaktuChange,
  onPencarianChange,
}) => (
  <div className="rounded-xl border border-[#e5e2da] bg-white p-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <label className="flex-1">
        <span className="mb-2 block text-sm font-semibold text-[#414844]">Cari Hasil Analisa</span>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#717973]" />
          <input
            type="search"
            value={pencarianBukti}
            onChange={(event) => onPencarianChange(event.target.value)}
            placeholder="Cari nama lahan atau ID..."
            className="h-14 w-full rounded-lg border border-[#c1c8c2] bg-[#f6f3eb] px-12 text-[18px] text-[#1c1c17] outline-none transition-colors placeholder:text-[#717973] focus:border-[#002719] focus:ring-2 focus:ring-[#002719]/10"
          />
        </div>
      </label>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-auto">
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#414844]">Filter Lahan</span>
          <select
            value={filterLahan}
            onChange={(event) => onFilterLahanChange(event.target.value)}
            className="h-14 w-full rounded-lg border border-[#c1c8c2] bg-[#f6f3eb] px-4 text-[18px] text-[#1c1c17] outline-none focus:border-[#002719] focus:ring-2 focus:ring-[#002719]/10 lg:w-60"
          >
            <option value="semua">Semua Lahan</option>
            {daftarNamaLahan.map((nama) => (
              <option key={nama} value={nama}>{nama}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#414844]">Rentang Waktu</span>
          <select
            value={filterWaktu}
            onChange={(event) => onFilterWaktuChange(event.target.value)}
            className="h-14 w-full rounded-lg border border-[#c1c8c2] bg-[#f6f3eb] px-4 text-[18px] text-[#1c1c17] outline-none focus:border-[#002719] focus:ring-2 focus:ring-[#002719]/10 lg:w-60"
          >
            <option value="30">30 Hari Terakhir</option>
            <option value="7">7 Hari Terakhir</option>
            <option value="bulan-ini">Bulan Ini</option>
            <option value="semua">Semua Waktu</option>
          </select>
        </label>
      </div>
    </div>
  </div>
);

const KondisiKosong = ({ deskripsi, judul }) => (
  <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-[#c1c8c2] bg-white/70 px-4 text-center">
    <h3 className="text-lg font-bold text-gray-700">{judul}</h3>
    <p className="mt-2 text-sm leading-relaxed text-gray-500">{deskripsi}</p>
  </div>
);

const TabelRiwayat = ({ daftarBukti, daftarBuktiTampil, onBukaDetail }) => (
  <div className="overflow-hidden rounded-xl border border-[#e5e2da] bg-white shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e5e2da] bg-[#f6f3eb]">
            <th className="px-5 py-4 text-sm font-extrabold tracking-wide text-[#414844]">Lahan</th>
            <th className="px-5 py-4 text-sm font-extrabold tracking-wide text-[#414844]">Tanggal</th>
            <th className="px-5 py-4 text-right text-sm font-extrabold tracking-wide text-[#414844]">Jumlah Terdeteksi</th>
            <th className="px-5 py-4 text-right text-sm font-extrabold tracking-wide text-[#414844]">Estimasi Bobot</th>
            <th className="px-5 py-4 text-right text-sm font-extrabold tracking-wide text-[#414844]">Potensi Pendapatan</th>
            <th className="px-5 py-4 text-center text-sm font-extrabold tracking-wide text-[#414844]">Status</th>
            <th className="px-5 py-4 text-center text-sm font-extrabold tracking-wide text-[#414844]">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e5e2da]">
          {daftarBuktiTampil.map((bukti) => (
            <BarisRiwayat key={bukti.id} bukti={bukti} onBukaDetail={onBukaDetail} />
          ))}
        </tbody>
      </table>
    </div>
    <FooterTabel jumlahSemua={daftarBukti.length} jumlahTampil={daftarBuktiTampil.length} />
  </div>
);

const BarisRiwayat = ({ bukti, onBukaDetail }) => (
  <tr className="group transition-colors hover:bg-[#f6f3eb]/60">
    <td className="px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#b3f1c5] text-[#173d2d]">
          <Sprout className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <span className="text-[18px] font-extrabold text-black">{bukti.lahan}</span>
      </div>
    </td>
    <td className="whitespace-nowrap px-5 py-5 text-[18px] text-[#414844]">
      {bukti.tanggal}, {bukti.waktu}
    </td>
    <td className="whitespace-nowrap px-5 py-5 text-right">
      <span className="text-[18px] font-extrabold text-black">
        {formatRupiah(bukti.cabaiTerdeteksi)}
      </span>{" "}
      <span className="text-sm text-[#414844]">buah</span>
    </td>
    <td className="whitespace-nowrap px-5 py-5 text-right">
      <span className="text-[18px] font-extrabold text-black">
        {formatRupiah(bukti.estimasiTonase)}
      </span>{" "}
      <span className="text-sm text-[#414844]">kg</span>
    </td>
    <td className="whitespace-nowrap px-5 py-5 text-right text-[18px] font-extrabold text-[#002719]">
      Rp {formatRupiah(bukti.potensiPendapatan)}
    </td>
    <td className="px-5 py-5 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#b3f1c5]/35 px-3 py-1.5 text-sm font-semibold text-[#165131]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#316947]" />
        Selesai
      </span>
    </td>
    <td className="px-5 py-5 text-center">
      <button
        type="button"
        onClick={() => onBukaDetail(bukti)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#717973] transition-colors hover:bg-[#f1eee6] hover:text-[#002719]"
        aria-label={`Lihat detail ${bukti.lahan}`}
      >
        <Eye className="h-5 w-5" strokeWidth={2.2} />
      </button>
    </td>
  </tr>
);

const FooterTabel = ({ jumlahSemua, jumlahTampil }) => (
  <div className="flex flex-col gap-3 border-t border-[#e5e2da] bg-[#f6f3eb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
    <span className="text-sm font-semibold text-[#414844]">
      Menampilkan 1-{jumlahTampil} dari {jumlahSemua} data
    </span>
    <div className="flex items-center gap-1">
      <button disabled className="flex h-9 w-9 items-center justify-center rounded-md text-[#717973] opacity-40">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button className="flex h-10 w-10 items-center justify-center rounded-md bg-[#002719] text-sm font-extrabold text-white">1</button>
      <button className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-semibold text-[#414844] hover:bg-[#ebe8e0]">2</button>
      <button className="flex h-10 w-10 items-center justify-center rounded-md text-sm font-semibold text-[#414844] hover:bg-[#ebe8e0]">3</button>
      <button className="flex h-9 w-9 items-center justify-center rounded-md text-[#414844] hover:bg-[#ebe8e0]">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default RiwayatBuktiAnalisa;
