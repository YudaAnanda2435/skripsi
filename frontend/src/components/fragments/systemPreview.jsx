const SystemPreview = () => {
  return (
    <section id="preview" className="bg-white border-y border-lp-outline ">
      <div className="container-lp font-jakarta">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lp mb-6 font-jakarta">
            Mulai Membangun Database Lahan Anda
          </h2>
          <p className="text-lg text-lp-muted leading-relaxed font-jakarta">
            Intip beberapa tampilan dashboard ChiliVision yang akan membantu
            Anda mengelola data panen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview 1: Dashboard Ringkasan */}
          <div className="bg-lp-bg rounded-3xl border border-lp-outline shadow-lp-sm p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-lp font-jakarta">
                Dashboard Ringkasan Estimasi
              </h3>
              <span className="bg-white text-lp-muted text-xs font-bold px-3 py-1 rounded-full border border-lp-outline whitespace-nowrap">
                Preview fitur setelah login
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-lp-outline shadow-lp-sm">
                <span className="text-sm font-medium text-lp-muted block mb-2 font-jakarta">
                  Total Cabai Terdeteksi
                </span>
                <span className="text-3xl md:text-4xl font-bold text-lp block font-jakarta">
                  142
                </span>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-lp-outline shadow-lp-sm">
                <span className="text-sm font-medium text-lp-muted block mb-2 font-jakarta">
                  Estimasi Total Panen
                </span>
                <span className="text-3xl md:text-4xl font-bold text-lp-accent block font-jakarta">
                  887{" "}
                  <span className="text-lg text-lp-muted font-medium">kg</span>
                </span>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-lp-outline shadow-lp-sm col-span-2">
                <span className="text-sm font-medium text-lp-muted block mb-2 font-jakarta">
                  Potensi Nilai Jual (Berdasarkan harga pasar inputan)
                </span>
                <span className="text-3xl md:text-4xl font-bold text-lp block font-jakarta">
                  Rp 26.610.000
                </span>
              </div>
            </div>

            <p className="text-lp-muted leading-relaxed font-jakarta text-base">
              Dapatkan ringkasan instan nilai ekonomi dari lahan Anda
              berdasarkan deteksi sampel terbaru.
            </p>
          </div>

          {/* Preview 2: Riwayat Produktivitas */}
          <div className="bg-lp-bg rounded-3xl border border-lp-outline shadow-lp-sm p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-lp font-jakarta">
                Riwayat Produktivitas Lahan
              </h3>
              <span className="bg-white text-lp-muted text-xs font-bold px-3 py-1 rounded-full border border-lp-outline whitespace-nowrap">
                Preview fitur setelah login
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Record 1 */}
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-lp-outline shadow-lp-sm flex justify-between items-center">
                <div>
                  <span className="text-base md:text-lg font-bold text-lp block mb-1 font-jakarta">
                    Blok A Selatan
                  </span>
                  <span className="text-sm text-lp-muted flex items-center gap-1 font-jakarta">
                    <span className="material-symbols-outlined text-[16px]">
                      calendar_today
                    </span>{" "}
                    12 Okt 2024
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl md:text-2xl font-bold text-lp-accent block font-jakarta">
                    887 kg
                  </span>
                  <span className="text-xs text-lp-accent font-medium font-jakarta">
                    +12% dari panen lalu
                  </span>
                </div>
              </div>

              {/* Record 2 */}
              <div className="bg-white p-4 md:p-6 rounded-2xl border border-lp-outline shadow-lp-sm flex justify-between items-center">
                <div>
                  <span className="text-base md:text-lg font-bold text-lp block mb-1 font-jakarta">
                    Blok B Utara
                  </span>
                  <span className="text-sm text-lp-muted flex items-center gap-1 font-jakarta">
                    <span className="material-symbols-outlined text-[16px]">
                      calendar_today
                    </span>{" "}
                    10 Okt 2024
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl md:text-2xl font-bold text-lp-muted block font-jakarta">
                    640 kg
                  </span>
                  <span className="text-xs text-lp-error font-medium font-jakarta">
                    -5% dari panen lalu
                  </span>
                </div>
              </div>
            </div>

            <p className="text-lp-muted leading-relaxed font-jakarta text-base">
              Pantau tren hasil panen dari waktu ke waktu untuk setiap petak
              lahan guna evaluasi performa pupuk atau metode perawatan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemPreview;
