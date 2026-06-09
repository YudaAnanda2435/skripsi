import { Check, Info, Sparkles, Wallet, Weight } from "lucide-react";
import farmPlaceholder from "../../../assets/img/dashboard/farm-placeholder.png";
import { kategoriSampel } from "./scanTonaseConstants";

const ProsesAiStep = ({ pratinjauFoto, progressAI = 0 }) => {
  const progress = Math.min(100, Math.max(0, Math.round(progressAI)));

  return (
    <div className="flex flex-col gap-6 font-jakarta">
    <div>
      <h2 className="mb-1 text-[28px] font-extrabold leading-9 text-[#173d2d]">
        Memproses Sampel dengan AI
      </h2>
      <p className="text-[16px] leading-6 text-gray-600">
        Sistem sedang mendeteksi dan menghitung cabai pada tiga sampel Anda.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="rounded-xl border border-[#e5e2da] bg-white p-4 shadow-[0_4px_24px_rgba(23,61,45,0.04)] xl:col-span-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {kategoriSampel.map((kategori, index) => (
            <div key={kategori.id} className="flex flex-col gap-3">
              <div className="relative h-56 overflow-hidden rounded-lg bg-black md:h-64 xl:h-72">
                <img
                  src={pratinjauFoto[kategori.id] || farmPlaceholder}
                  alt={`Sampel ${kategori.label}`}
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="ai-box absolute left-[18%] top-[20%] h-20 w-12 rounded-sm border-2 border-[#b3f1c5]" style={{ animationDelay: `${index * 0.18}s` }}>
                  <span className="absolute -top-5 left-0 rounded-sm bg-[#b3f1c5] px-1 text-[10px] font-bold text-[#00210f]">
                    Cabai 0.98
                  </span>
                </div>
                <div className="ai-box absolute left-[58%] top-[44%] h-16 w-10 rounded-sm border-2 border-[#b3f1c5]" style={{ animationDelay: `${0.24 + index * 0.18}s` }}>
                  <span className="absolute -top-5 left-0 rounded-sm bg-[#b3f1c5] px-1 text-[10px] font-bold text-[#00210f]">
                    Cabai 0.93
                  </span>
                </div>
                <div className="scan-line absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[#b3f1c5]/25 to-transparent" />
              </div>

              <div className="rounded-lg border border-[#e5e2da] bg-[#fcf9f1] px-3 py-2">
                <p className="text-sm font-extrabold text-[#173d2d]">
                  Sampel {kategori.label}
                </p>
                <p className="text-xs text-gray-600">{kategori.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 px-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-extrabold text-[#173d2d]">
              <Sparkles className="h-4 w-4 animate-spin" />
              Proses AI berjalan... Mohon tunggu sebentar.
            </span>
            <span className="text-sm font-extrabold text-[#173d2d]">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e5e2da]">
            <div className="relative h-full overflow-hidden rounded-full bg-[#173d2d] transition-all duration-300 ease-out" style={{ width: `${progress}%` }}>
              <div className="ai-shimmer absolute inset-0 bg-white/25" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 xl:col-span-4">
        <div className="flex items-center gap-4 rounded-xl border border-[#e5e2da] bg-white p-4 shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c2ecd5] text-[#002114]">
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-gray-900">
              Mengunggah Sampel
            </h4>
            <p className="text-xs font-semibold text-[#316947]">
              3 foto berhasil dibaca
            </p>
          </div>
        </div>

        <div className="scale-[1.02] flex items-center gap-4 rounded-xl border border-[#173d2d] bg-[#173d2d]/5 p-4 shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b3f1c5] text-[#00210f]">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#173d2d]">
              Mendeteksi Objek
            </h4>
            <p className="text-xs font-semibold text-gray-600">
              YOLOv8 sedang memproses...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-[#e5e2da] bg-white p-4 opacity-60 shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5e2da] text-gray-600">
            <Weight className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-gray-900">
              Mengestimasi Bobot
            </h4>
            <p className="text-xs font-semibold text-gray-600">Menunggu...</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-[#e5e2da] bg-white p-4 opacity-60 shadow-[0_4px_24px_rgba(23,61,45,0.04)]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5e2da] text-gray-600">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-gray-900">
              Menghitung Potensi
            </h4>
            <p className="text-xs font-semibold text-gray-600">Menunggu...</p>
          </div>
        </div>

        <div className="mt-auto flex gap-3 rounded-xl border border-[#c1c8c2] bg-[#ebe8e0] p-4">
          <Info className="h-5 w-5 shrink-0 text-gray-600" />
          <p className="text-xs font-semibold leading-5 text-gray-600">
            Waktu pemrosesan bergantung pada resolusi gambar dan jumlah objek
            yang terdeteksi. Jangan tutup halaman ini.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProsesAiStep;
