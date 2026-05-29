const Technology = () => {
  return (
    <section id="teknologi" className="container-lp font-jakarta">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: AI Pipeline Visualization */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-lp-outline shadow-lp-sm flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-lp text-center mb-4 font-jakarta">
            Pipeline Pemrosesan AI
          </h3>

          <div className="flex flex-col gap-4 relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-lp-outline"></div>

            {/* Step 1 */}
            <div className="flex items-center gap-6 bg-lp-bg p-5 md:p-6 rounded-2xl border border-lp-outline relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lp-sm shrink-0">
                <span className="material-symbols-outlined text-lp">image</span>
              </div>
              <div>
                <span className="font-bold text-lp block text-base md:text-lg mb-1 font-jakarta">
                  1. Image Input & Pre-processing
                </span>
                <span className="text-lp-muted text-sm font-jakarta">
                  Normalisasi gambar dan penyesuaian resolusi.
                </span>
              </div>
            </div>

            {/* Step 2 - Highlighted */}
            <div className="flex items-center gap-6 bg-lp p-5 md:p-6 rounded-2xl shadow-lp-soft relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white">
                  memory
                </span>
              </div>
              <div>
                <span className="font-bold text-white block text-base md:text-lg mb-1 font-jakarta">
                  2. YOLOv8 Inference
                </span>
                <span className="text-white/80 text-sm font-jakarta">
                  Ekstraksi fitur dan prediksi bounding box secara real-time.
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-6 bg-lp-bg p-5 md:p-6 rounded-2xl border border-lp-outline relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lp-sm shrink-0">
                <span className="material-symbols-outlined text-lp">
                  calculate
                </span>
              </div>
              <div>
                <span className="font-bold text-lp block text-base md:text-lg mb-1 font-jakarta">
                  3. Ekstrapolasi Data
                </span>
                <span className="text-lp-muted text-sm font-jakarta">
                  (Rata-rata buah × Est. berat) × Total Populasi.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technology Details */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-lp font-jakarta">
            Teknologi di Balik ChiliVision
          </h2>
          <p className="text-lg text-lp-muted leading-relaxed font-jakarta">
            Sistem ini menggabungkan arsitektur computer vision terkini dengan
            prinsip-prinsip agrikultur presisi.
          </p>

          <div className="flex flex-col gap-6 mt-4">
            {/* YOLOv8 */}
            <div className="bg-lp-bg p-6 md:p-8 rounded-2xl border border-lp-outline">
              <h4 className="text-xl font-bold text-lp mb-2 flex items-center gap-3 font-jakarta">
                <span className="material-symbols-outlined text-lp-accent">
                  model_training
                </span>
                Arsitektur YOLOv8
              </h4>
              <p className="text-lp-muted leading-relaxed font-jakarta text-base">
                Menggunakan model state-of-the-art You Only Look Once version 8
                yang telah di-fine-tune khusus untuk mendeteksi objek kecil dan
                occluded seperti cabai rawit di tengah rimbunnya dedaunan hijau.
              </p>
            </div>

            {/* Sampling */}
            <div className="bg-lp-bg p-6 md:p-8 rounded-2xl border border-lp-outline">
              <h4 className="text-xl font-bold text-lp mb-2 flex items-center gap-3 font-jakarta">
                <span className="material-symbols-outlined text-lp-accent">
                  science
                </span>
                Metodologi Sampling Statistik
              </h4>
              <p className="text-lp-muted leading-relaxed font-jakarta text-base">
                Ekstrapolasi bukan sekadar tebakan. Sistem menggunakan formula
                statistik berdasarkan input jumlah populasi ril dan rata-rata
                sampling untuk memberikan margin error yang terukur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
