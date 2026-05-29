import { Check, Info, UploadCloud } from "lucide-react";
import { kategoriSampel } from "./scanTonaseConstants";

const UploadSampelStep = ({
  beratRataRata,
  foto,
  hapusFoto,
  lahanPilihan,
  mulaiScanAI,
  persentase,
  pratinjauFoto,
  setBeratRataRata,
  setBukaTutorial,
  setLangkah,
  tanganiPersentase,
  tanganiUnggahFoto,
}) => (
  <div className="font-jakarta">
    <div className="mb-7">
      <h2 className="mb-2 text-[28px] font-extrabold leading-9 text-[#002719]">
        Upload Sampel Cabai Rawit
      </h2>
      <p className="text-[16px] leading-6 text-gray-600">
        Lengkapi data kondisi lahan dan unggah foto sampel untuk dianalisis.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="flex flex-col gap-5">
        <div className="rounded-lg border border-[#316947] bg-[#eef8f2] p-5">
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-[#316947]">
            Lahan Terpilih
          </p>
          <h3 className="text-[22px] font-extrabold leading-7 text-[#002719]">
            {lahanPilihan.nama_lahan}
          </h3>
          <p className="mt-1 text-[15px] font-semibold text-gray-700">
            Total Populasi:{" "}
            {lahanPilihan.populasi_pohon.toLocaleString("id-ID")} Pohon
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-end justify-between gap-3">
            <label className="text-[16px] font-extrabold text-gray-800">
              Berat Rata-rata per Cabai (Gram)
            </label>
            <button
              type="button"
              onClick={() => setBukaTutorial(true)}
              className="text-xs font-extrabold text-[#316947] hover:text-[#002719]"
            >
              Cara Hitung?
            </button>
          </div>
          <input
            type="number"
            step="0.1"
            min="0"
            value={beratRataRata}
            onChange={(e) => setBeratRataRata(e.target.value)}
            placeholder="Contoh: 1.5"
            className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-[15px] text-gray-800 outline-none focus:border-[#316947] focus:ring-2 focus:ring-[#316947]/15"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[16px] font-extrabold text-gray-800">
              Proporsi Kondisi Lahan (%)
            </label>
            <p className="mt-1 text-xs font-semibold text-gray-500">
              Total ketiga kolom harus 100%.
            </p>
          </div>

          {kategoriSampel.map((kategori) => (
            <div key={kategori.id} className="grid grid-cols-[86px_minmax(0,1fr)] items-center gap-4">
              <label className="text-[15px] font-semibold text-gray-700">
                {kategori.label}
              </label>
              <input
                type="number"
                name={kategori.id}
                value={persentase[kategori.id]}
                onChange={tanganiPersentase}
                onWheel={(e) => e.target.blur()}
                className="h-12 w-full rounded-md border border-gray-300 bg-white px-4 text-[15px] text-gray-800 outline-none focus:border-[#316947] focus:ring-2 focus:ring-[#316947]/15"
                placeholder={kategori.id === "kurang" ? "20" : "40"}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[17px] font-extrabold text-gray-800">
            Unggah Foto Sampel
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {kategoriSampel.map((kategori) => (
              <div key={kategori.id}>
                {!foto[kategori.id] ? (
                  <label className="relative flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#c1c8c2] bg-[#fcf9f1] p-4 text-center transition-colors hover:border-[#316947] hover:bg-[#eef8f2]">
                    <span className="mb-4 text-[13px] font-extrabold leading-4 text-[#002719]">
                      Sampel Lahan {kategori.label}
                    </span>
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe8e0] text-[#316947]">
                      <UploadCloud className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <span className="text-[11px] font-semibold leading-4 text-gray-600">
                      Unggah 1 foto representatif
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => tanganiUnggahFoto(e, kategori.id)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-44 overflow-hidden rounded-lg border border-[#c1c8c2] bg-white">
                    <img
                      src={pratinjauFoto[kategori.id]}
                      alt={`Sampel ${kategori.label}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 text-left">
                      <p className="text-xs font-extrabold text-white">
                        Sampel {kategori.label}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => hapusFoto(kategori.id)}
                      className="absolute right-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs font-extrabold text-white shadow"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-3 border-t border-[#dcdad2] pt-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setLangkah(1)}
            className="h-12 rounded-lg border border-gray-300 bg-white px-6 text-sm font-extrabold text-gray-700 transition-colors hover:border-[#316947] hover:text-[#173d2d] sm:w-[110px]"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={mulaiScanAI}
            className="h-12 flex-1 rounded-lg bg-[#08a95a] px-6 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#078f4d] active:scale-[0.99]"
          >
            Mulai Scan AI
          </button>
        </div>
      </div>

      <aside className="h-fit rounded-xl border border-[#dcdad2] bg-[#fcf9f1] p-5">
        <div className="mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-[#316947]" />
          <h3 className="text-[16px] font-extrabold text-[#173d2d]">
            Tips Pengambilan Foto
          </h3>
        </div>
        <ul className="flex flex-col gap-4 text-[14px] font-semibold leading-5 text-gray-600">
          <li className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#316947]" />
            Ambil foto saat cahaya cukup pagi atau sore hari.
          </li>
          <li className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#316947]" />
            Gunakan sampel yang jelas dan fokus.
          </li>
          <li className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#316947]" />
            Pastikan cabai terlihat penuh dalam frame.
          </li>
          <li className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#316947]" />
            Ambil dari beberapa titik lahan yang berbeda.
          </li>
        </ul>
      </aside>
    </div>
  </div>
);

export default UploadSampelStep;
