const steps = [
  {
    number: 1,
    title: "Registrasi & Profil Lahan",
    description:
      "Buat akun dan masukkan parameter dasar lahan Anda seperti luas, jarak tanam, dan estimasi populasi total tanaman untuk keperluan ekstrapolasi data.",
  },
  {
    number: 2,
    title: "Pengambilan Citra Sampel",
    description:
      "Ambil foto tanaman cabai dari beberapa titik representatif di lahan Anda menggunakan kamera smartphone sesuai panduan jarak dan pencahayaan.",
  },
  {
    number: 3,
    title: "Deteksi Object YOLOv8",
    description:
      "Unggah foto ke sistem. AI akan menganalisis gambar dalam hitungan detik, mendeteksi dan menghitung setiap buah cabai yang terlihat dalam frame.",
  },
  {
    number: 4,
    title: "Kalkulasi Tonase Ekstrapolasi",
    description:
      "Berdasarkan rata-rata jumlah buah per sampel dan parameter berat rata-rata per buah, sistem akan mengalikan hasilnya dengan total populasi tanaman Anda.",
  },
];

const HowItWorks = () => {
  return (
    <section id="cara-kerja" className="bg-white border-y border-lp-outline">
      <div className="container-lp max-w-4xl font-jakarta">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-lp mb-6 font-jakarta">
            Cara Kerja Sistem
          </h2>
          <p className="text-lg text-lp-muted leading-relaxed font-jakarta">
            Alur kerja vertikal yang sederhana untuk mendapatkan estimasi yang
            akurat.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-lp-outline ml-1"></div>

          <div className="flex flex-col gap-12 relative z-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-8 items-start group"
              >
                {/* Step Number */}
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-lp-bg border-2 border-lp-outline flex items-center justify-center text-2xl font-bold text-lp group-hover:bg-lp group-hover:text-white group-hover:border-lp transition-all duration-300 shadow-lp-sm font-jakarta">
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="bg-lp-bg p-6 md:p-8 rounded-2xl border border-lp-outline flex-grow group-hover:border-lp/30 transition-colors duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-lp mb-3 font-jakarta">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-lp-muted leading-relaxed font-jakarta">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
