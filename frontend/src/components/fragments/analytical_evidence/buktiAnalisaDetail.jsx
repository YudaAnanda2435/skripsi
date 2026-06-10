import { Download, ShieldCheck, Trash2 } from "lucide-react";
import { VISUAL_SAMPLES, formatRupiah, hitungCabaiPerSampel } from "./buktiAnalisaUtils";

const DetailBuktiAnalisa = ({
  areaLaporanRef,
  buktiAktif,
  onHapusBukti,
  onUnduhLaporan,
}) => (
  <div className="flex flex-col gap-8 font-jakarta">
    <LaporanBuktiAnalisa
      areaLaporanRef={areaLaporanRef}
      buktiAktif={buktiAktif}
    />
    <AksiDetailBukti
      buktiAktif={buktiAktif}
      onHapusBukti={onHapusBukti}
      onUnduhLaporan={onUnduhLaporan}
    />
  </div>
);

const LaporanBuktiAnalisa = ({ areaLaporanRef, buktiAktif }) => (
  <div
    ref={areaLaporanRef}
    className="flex flex-col gap-8 bg-[#fcf9f1] p-1 pb-8"
  >
    <RingkasanUtama buktiAktif={buktiAktif} />
    <InformasiAnalisa buktiAktif={buktiAktif} />
    <VisualisasiSampel buktiAktif={buktiAktif} />
    <p className="border-t border-[#c1c8c2]/50 pt-8 text-center text-[11px] italic text-[#717973]">
      Dokumen nomor {buktiAktif.id}. Dibuat otomatis oleh sistem AI ChiliVision.
    </p>
  </div>
);

const RingkasanUtama = ({ buktiAktif }) => (
  <section className="relative overflow-hidden rounded-3xl bg-[#173d2d] p-8 text-white shadow-lg md:p-10">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(64,120,86,.65),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(0,39,25,.9),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(0,20,12,.65),transparent_45%)]" />
    <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="space-y-6">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-white/70">
            Pemilik Lahan
          </p>
          <h3 className="mt-1 text-[28px] font-extrabold leading-9">
            {buktiAktif.lahan}
          </h3>
        </div>
        <div>
          <p className="text-xs font-bold text-white/75">
            Estimasi Total Panen
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-[52px] font-extrabold leading-none">
              {formatRupiah(buktiAktif.estimasiTonase)}
            </p>
            <span className="text-2xl font-bold text-[#a7d0b9]">Kg</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-left shadow-inner backdrop-blur-md md:text-right">
        <div className="mb-3 flex items-center gap-2 text-[#a7d0b9] md:justify-end">
          <ShieldCheck className="h-4 w-4" />
          <p className="text-xs font-extrabold uppercase tracking-wide">
            Tervalidasi YOLOv8
          </p>
        </div>
        <p className="text-xs font-semibold text-white/80">
          Estimasi Nilai Jual
        </p>
        <p className="mt-2 text-[30px] font-extrabold leading-9 text-white">
          Rp {formatRupiah(buktiAktif.potensiPendapatan)}
        </p>
      </div>
    </div>
  </section>
);

const InformasiAnalisa = ({ buktiAktif }) => (
  <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
    <KartuInformasiPengujian buktiAktif={buktiAktif} />
    <KartuParameterAi buktiAktif={buktiAktif} />
    <KartuProporsiTanaman buktiAktif={buktiAktif} />
  </section>
);

const KartuInformasiPengujian = ({ buktiAktif }) => (
  <div className="col-span-1 flex flex-col justify-between rounded-3xl border border-[#c1c8c2] bg-white p-8 shadow-sm md:col-span-4">
    <div>
      <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#414844]">
        Waktu Analisa
      </h4>
      <p className="mt-3 text-[16px] text-[#1c1c17]">
        {buktiAktif.tanggal}, {buktiAktif.waktu}
      </p>
    </div>
    <div className="mt-8">
      <p className="mb-1 text-xs font-semibold text-[#414844]">
        Jumlah Tanaman
      </p>
      <div className="flex items-baseline gap-2">
        <p className="text-[40px] font-extrabold leading-none text-[#1c1c17]">
          {formatRupiah(buktiAktif.populasi)}
        </p>
        <p className="text-xs font-semibold text-[#414844]">Pohon</p>
      </div>
    </div>
  </div>
);

const KartuParameterAi = ({ buktiAktif }) => (
  <div className="col-span-1 rounded-3xl border border-[#c1c8c2] bg-white p-8 shadow-sm md:col-span-8">
    <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-[#414844]">
      Parameter Perhitungan AI
    </h4>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="rounded-2xl bg-[#f6f3eb] p-6">
        <p className="mb-2 text-xs font-semibold text-[#414844]">
          Berat Rata-rata per Cabai
        </p>
        <p className="text-[26px] font-extrabold text-[#1c1c17]">
          {formatRupiah(buktiAktif.parameter.beratRata)}{" "}
          <span className="text-base font-normal text-[#414844]">Gram</span>
        </p>
      </div>
      <div className="rounded-2xl bg-[#f6f3eb] p-6">
        <p className="mb-2 text-xs font-semibold text-[#414844]">
          Total Cabai Terdeteksi
        </p>
        <p className="text-[26px] font-extrabold text-[#1c1c17]">
          {formatRupiah(buktiAktif.cabaiTerdeteksi)}{" "}
          <span className="text-base font-normal text-[#414844]">cabai</span>
        </p>
      </div>
    </div>
  </div>
);

const KartuProporsiTanaman = ({ buktiAktif }) => (
  <div className="col-span-1 rounded-3xl border border-[#c1c8c2] bg-white p-8 shadow-sm md:col-span-12">
    <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-[#414844]">
      Proporsi Kondisi Tanaman
    </h4>
    <div className="space-y-4">
      <div className="flex h-6 w-full overflow-hidden rounded-full shadow-inner">
        <div
          className="h-full bg-[#316947]"
          style={{ width: `${buktiAktif.parameter.lebat}%` }}
        />
        <div
          className="h-full bg-[#f59e0b]"
          style={{ width: `${buktiAktif.parameter.sedang}%` }}
        />
        <div
          className="h-full bg-[#ea580c]"
          style={{ width: `${buktiAktif.parameter.kurang}%` }}
        />
      </div>
      <div className="flex justify-between px-2 text-center">
        <LabelProporsi
          color="#316947"
          label="Lebat"
          value={buktiAktif.parameter.lebat}
        />
        <LabelProporsi
          color="#f59e0b"
          label="Sedang"
          value={buktiAktif.parameter.sedang}
        />
        <LabelProporsi
          color="#ea580c"
          label="Kurang"
          value={buktiAktif.parameter.kurang}
        />
      </div>
    </div>
  </div>
);

const LabelProporsi = ({ color, label, value }) => (
  <div>
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-extrabold">{value}%</span>
    </div>
    <span className="text-xs text-[#414844]">{label}</span>
  </div>
);

const VisualisasiSampel = ({ buktiAktif }) => {
  const jumlahCabaiPerSampel = hitungCabaiPerSampel(buktiAktif);

  return (
  <section className="space-y-8 pt-4">
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-[32px] font-extrabold leading-10 text-[#1c1c17]">
        Visualisasi Sampel YOLOv8
      </h3>
      <span className="rounded-full bg-[#ebe8e0] px-4 py-2 text-xs font-semibold text-[#414844]">
        3 Sampel Diambil
      </span>
    </div>
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {VISUAL_SAMPLES.map((item, index) => (
        <KartuVisualisasi
          key={item.id}
          buktiAktif={buktiAktif}
          index={index}
          item={item}
          jumlahCabai={jumlahCabaiPerSampel[item.id]}
        />
      ))}
    </div>
  </section>
  );
};

const KartuVisualisasi = ({ buktiAktif, item, jumlahCabai }) => (
  <div
    className={`group relative overflow-hidden rounded-3xl border border-[#c1c8c2]/60 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl`}
  >
    <div className="absolute left-4 top-4 z-10">
      <span
        className="flex items-center gap-2 rounded-full bg-[#fcf9f1]/90 px-4 py-2 text-sm font-extrabold shadow-sm backdrop-blur"
        style={{ color: item.color }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        {item.label}
      </span>
    </div>
    <div className="aspect-[4/3] w-full overflow-hidden bg-[#f1eee6]">
      {buktiAktif.foto && buktiAktif.foto[item.id] ? (
        <img
          src={`data:image/jpeg;base64,${buktiAktif.foto[item.id]}`}
          alt={`Kondisi ${item.label}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#717973]">
          Tidak ada gambar tersimpan
        </div>
      )}
    </div>
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent p-6 pt-12">
      <p className="text-sm font-extrabold text-[#002719]">
        {formatRupiah(jumlahCabai)} cabai terdeteksi
      </p>
      <p className="mt-1 text-xs font-semibold text-[#414844]">
        Kepercayaan Deteksi: {item.conf}%
      </p>
    </div>
  </div>
);

const AksiDetailBukti = ({ buktiAktif, onHapusBukti, onUnduhLaporan }) => (
  <div className="mx-auto flex w-full max-w-3xl flex-col justify-center gap-4 sm:flex-row">
    <button
      onClick={onUnduhLaporan}
      className="flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl bg-[#002719] px-8 text-sm font-extrabold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#173d2d] hover:shadow-lg"
    >
      <Download className="h-5 w-5" />
      Unduh Laporan (PDF)
    </button>

    <button
      onClick={() => onHapusBukti(buktiAktif.id)}
      className="flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl border-2 border-red-200 bg-white px-8 text-sm font-extrabold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
    >
      <Trash2 className="h-5 w-5" />
      Hapus Dokumen Analisa
    </button>
  </div>
);

export default DetailBuktiAnalisa;
