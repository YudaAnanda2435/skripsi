import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  BarChart3,
  Calculator,
  Check,
  Info,
  RefreshCw,
  Save,
} from "lucide-react";
import { kategoriSampel } from "./scanTonaseConstants";
import { formatAngka, normalisasiSrcGambar } from "./scanTonaseUtils";

const DetailAngka = ({ label, value }) => (
  <div className="rounded-lg bg-[#f6f3eb] p-3">
    <p className="text-xs font-semibold text-gray-500">{label}</p>
    <p className="mt-1 text-sm font-extrabold text-black">{value}</p>
  </div>
);

const LangkahHitung = ({ nomor, judul, keterangan, hasil }) => (
  <div className="rounded-lg border border-[#e5e2da] bg-white p-4">
    <div className="mb-2 flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#173d2d] text-xs font-extrabold text-white">
        {nomor}
      </span>
      <div>
        <h4 className="text-sm font-extrabold text-black">{judul}</h4>
        <p className="mt-1 text-xs leading-5 text-gray-600">{keterangan}</p>
      </div>
    </div>
    <div className="mt-3 rounded-md bg-[#dcf8e9] px-3 py-2 text-sm font-extrabold text-[#002719]">
      {hasil}
    </div>
  </div>
);

const HasilEstimasiStep = ({
  akurasiAI,
  beratRataRata,
  beratSampleKg,
  faktorEkstrapolasi,
  fotoHasilAI,
  detailDeteksi = {},
  jumlahTerdeteksi,
  lahanPilihan,
  lightboxIndex,
  persentase = {},
  resetScan,
  setLightboxIndex,
  simpanAnalisa,
  slidesHasilAI,
  totalPendapatan,
  totalTonase,
}) => {
  const jumlahLebat = Number(detailDeteksi.lebat || 0);
  const jumlahSedang = Number(detailDeteksi.sedang || 0);
  const jumlahKurang = Number(detailDeteksi.kurang || 0);
  const persenLebat = Number(persentase.lebat || 0);
  const persenSedang = Number(persentase.sedang || 0);
  const persenKurang = Number(persentase.kurang || 0);
  const rataCabaiPerTanaman =
    jumlahLebat * (persenLebat / 100) +
    jumlahSedang * (persenSedang / 100) +
    jumlahKurang * (persenKurang / 100);
  const totalPopulasi = Number(faktorEkstrapolasi || 0);
  const estimasiTotalBuah = rataCabaiPerTanaman * totalPopulasi;
  const beratPerBuah = Number(beratRataRata || 0);
  const estimasiTonase = (estimasiTotalBuah * beratPerBuah) / 1000;

  const formatRingkas = (nilai) =>
    Number(nilai || 0).toLocaleString("id-ID", { maximumFractionDigits: 2 });

  return (
    <div className="font-jakarta">
      <div className="mb-8">
        <h2 className="text-[30px] font-extrabold leading-9 text-black">
          Hasil Estimasi Panen
        </h2>
        <p className="mt-2 text-[16px] leading-6 text-gray-700">
          Berdasarkan analisis sampel AI dan data lahan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="flex flex-col gap-8">
          <section className="overflow-hidden rounded-xl border border-[#cfe7d8] bg-white shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
            <div className="bg-[#dcf8e9] p-8">
              <div className="mb-5 flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-[#087044]" />
                <h3 className="text-[24px] font-extrabold leading-8 text-[#002719]">
                  Estimasi Total Panen
                </h3>
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-[48px] font-extrabold leading-none text-[#002719]">
                  {formatAngka(totalTonase)}
                </span>
                <span className="pb-1 text-[24px] font-bold text-[#173d2d]">
                  kg
                </span>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#087044] px-4 py-1.5 text-sm font-bold text-[#087044]">
                <Check className="h-4 w-4" />
                Akurasi AI: {akurasiAI}%
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-[#e5e2da] bg-white p-6 sm:grid-cols-3">
              <div className="border-[#dcdad2] sm:border-r">
                <p className="text-xs font-semibold text-gray-500">
                  Jumlah Terdeteksi
                </p>
                <p className="mt-2 text-lg font-extrabold text-black">
                  {formatAngka(jumlahTerdeteksi)} buah
                </p>
              </div>
              <div className="border-[#dcdad2] sm:border-r sm:px-5">
                <p className="text-xs font-semibold text-gray-500">
                  Berat Sampel
                </p>
                <p className="mt-2 text-lg font-extrabold text-black">
                  {formatAngka(beratSampleKg)} kg
                </p>
              </div>
              <div className="sm:px-5">
                <p className="text-xs font-semibold text-gray-500">
                  Potensi Pendapatan
                </p>
                <p className="mt-2 text-lg font-extrabold text-[#087044]">
                  Rp {formatAngka(totalPendapatan)}
                </p>
              </div>
            </div>
          </section>

          <section className="flex gap-5 rounded-xl border-l-4 border-[#316947] bg-[#efede6] p-6">
            <Info className="mt-1 h-6 w-6 shrink-0 text-[#316947]" />
            <div>
              <h3 className="text-[17px] font-extrabold text-black">
                Rekomendasi Agronomi
              </h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-6 text-gray-700">
                Hasil estimasi cukup baik. Pastikan perbedaan tanaman tetap
                optimal hingga masa panen. Jaga kelembapan tanah di angka
                60-70% selama fase pematangan buah.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-[22px] font-extrabold leading-7 text-black">
              Bukti Scan AI
            </h3>
            <p className="mt-1 text-[15px] text-gray-700">
              Visualisasi deteksi objek YOLOv8 pada sampel lahan Anda.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {kategoriSampel.map((kategori, index) => (
                <button
                  type="button"
                  key={kategori.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group text-left"
                >
                  <div className="relative h-36 overflow-hidden rounded-xl border border-[#dcdad2] bg-black shadow-sm">
                    <img
                      src={normalisasiSrcGambar(fotoHasilAI[kategori.id])}
                      alt={`Hasil AI kondisi ${kategori.label}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 border border-[#b3f1c5]/60" />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-[#002719] shadow-sm backdrop-blur-sm">
                      {formatAngka(detailDeteksi[kategori.id] || 0)} cabai
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs font-bold text-white">
                        Klik untuk perbesar
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-sm font-extrabold tracking-wide text-[#173d2d]">
                    Kondisi {kategori.label}
                  </p>
                  <p className="mt-1 text-center text-xs font-semibold text-gray-600">
                    {formatAngka(detailDeteksi[kategori.id] || 0)} cabai terdeteksi
                  </p>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <aside className="h-fit rounded-xl border border-[#dcdad2] bg-white p-6 shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
            <div className="mb-5 flex items-center gap-3 border-b border-[#e5e2da] pb-4">
              <Calculator className="h-5 w-5 text-[#173d2d]" />
              <div>
                <h3 className="text-[17px] font-extrabold text-black">
                  Rincian Kalkulasi
                </h3>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  Ringkasan cara sistem mengubah hasil scan menjadi estimasi panen.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <DetailAngka label="Populasi Tanaman" value={`${formatAngka(totalPopulasi)} pohon`} />
                <DetailAngka label="Berat per Cabai" value={`${formatAngka(beratPerBuah)} g`} />
                <DetailAngka label="Luas Lahan" value={`${formatAngka(lahanPilihan?.luas_area)} m2`} />
                <DetailAngka label="Total Sampel AI" value={`${formatAngka(jumlahTerdeteksi)} cabai`} />
              </div>

              <div className="rounded-lg border border-[#e5e2da] bg-[#fcf9f1] p-4">
                <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-[#316947]">
                  Hasil Scan per Kondisi
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-md bg-white p-2">
                    <p className="font-extrabold text-black">{formatAngka(jumlahLebat)}</p>
                    <p className="mt-1 text-gray-500">Lebat ({persenLebat}%)</p>
                  </div>
                  <div className="rounded-md bg-white p-2">
                    <p className="font-extrabold text-black">{formatAngka(jumlahSedang)}</p>
                    <p className="mt-1 text-gray-500">Sedang ({persenSedang}%)</p>
                  </div>
                  <div className="rounded-md bg-white p-2">
                    <p className="font-extrabold text-black">{formatAngka(jumlahKurang)}</p>
                    <p className="mt-1 text-gray-500">Kurang ({persenKurang}%)</p>
                  </div>
                </div>
              </div>

              <LangkahHitung
                nomor="1"
                judul="Hitung rata-rata cabai per tanaman"
                keterangan={`${formatAngka(jumlahLebat)} x ${persenLebat}% + ${formatAngka(jumlahSedang)} x ${persenSedang}% + ${formatAngka(jumlahKurang)} x ${persenKurang}%`}
                hasil={`${formatRingkas(rataCabaiPerTanaman)} cabai / tanaman`}
              />

              <LangkahHitung
                nomor="2"
                judul="Kalikan dengan jumlah tanaman"
                keterangan={`${formatRingkas(rataCabaiPerTanaman)} cabai/tanaman x ${formatAngka(totalPopulasi)} pohon`}
                hasil={`${formatAngka(estimasiTotalBuah)} total cabai`}
              />

              <LangkahHitung
                nomor="3"
                judul="Ubah total cabai menjadi kilogram"
                keterangan={`${formatAngka(estimasiTotalBuah)} cabai x ${formatAngka(beratPerBuah)} g, lalu dibagi 1000`}
                hasil={`${formatAngka(estimasiTonase)} kg panen`}
              />
            </div>
          </aside>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={simpanAnalisa}
              className="flex h-12 items-center justify-center gap-3 rounded-lg bg-[#002719] px-6 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#173d2d]"
            >
              <Save className="h-5 w-5" />
              Simpan Hasil
            </button>
            <button
              type="button"
              onClick={resetScan}
              className="flex h-12 items-center justify-center gap-3 rounded-lg border border-[#316947] bg-white px-6 text-sm font-extrabold text-[#173d2d] transition-colors hover:bg-[#eef8f2]"
            >
              <RefreshCw className="h-5 w-5" />
              Scan Lagi
            </button>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex < 0 ? 0 : lightboxIndex}
        slides={slidesHasilAI}
        styles={{
          container: { backgroundColor: "rgba(0, 20, 12, 0.94)" },
        }}
      />
    </div>
  );
};

export default HasilEstimasiStep;
