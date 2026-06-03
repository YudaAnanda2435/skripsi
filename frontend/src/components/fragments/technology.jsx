import { useEffect, useState } from "react";

const pipelineSteps = [
  {
    icon: "image",
    title: "1. Image Input & Pre-processing",
    description: "Normalisasi gambar dan penyesuaian resolusi.",
  },
  {
    icon: "memory",
    title: "2. YOLOv8 Inference",
    description: "Ekstraksi fitur dan prediksi bounding box secara real-time.",
  },
  {
    icon: "calculate",
    title: "3. Ekstrapolasi Data",
    description: "(Rata-rata buah × Est. berat) × Total Populasi.",
  },
];

const Technology = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveStep((currentStep) => (currentStep + 1) % pipelineSteps.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

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
            <div
              className="absolute left-8 top-12 w-0.5 bg-lp rounded-full transition-all duration-700 ease-out"
              style={{
                height: `${((activeStep + 1) / pipelineSteps.length) * 100}%`,
                maxHeight: "calc(100% - 6rem)",
              }}
            ></div>

            {pipelineSteps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  className={`flex items-center gap-6 p-5 md:p-6 rounded-2xl border relative z-10 transition-all duration-700 ease-out ${
                    isActive
                      ? "bg-lp border-lp shadow-lp-soft translate-x-1 md:translate-x-4 "
                      : "bg-lp-bg border-lp-outline translate-x-0 scale-100"
                  }`}
                  key={step.title}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lp-sm shrink-0 transition-all duration-700 ease-out ${
                      isActive
                        ? "bg-white/15 ring-4 ring-white/10"
                        : "bg-white ring-0"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined transition-colors duration-700 ${
                        isActive ? "text-white" : "text-lp"
                      }`}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`font-bold block text-base md:text-lg mb-1 font-jakarta transition-colors duration-700 ${
                        isActive ? "text-white" : "text-lp"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      className={`text-sm font-jakarta transition-colors duration-700 ${
                        isActive ? "text-white/80" : "text-lp-muted"
                      }`}
                    >
                      {step.description}
                    </span>
                  </div>
                </div>
              );
            })}
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
