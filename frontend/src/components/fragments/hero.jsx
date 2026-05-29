import heroImg from "../../assets/hero-img.png";
import { useState, useEffect, useRef } from "react";
import ButtonSecondary from "../elements/button";

const Hero = () => {
  const [confidence, setConfidence] = useState(0);
  const totalDeteksiRef = useRef(null);
  const kepercayaanRef = useRef(null);
  const estimasiBeratRef = useRef(null);
  const potensiJualRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
     setConfidence(Math.floor(Math.random() * 15) + 85);
    }, 90)
    return () => clearInterval(interval);
  })

  useEffect(() => {
    const nilaiFinal = {
      totalDeteksi: "156 Buah",
      kepercayaan: "94%",
      estimasiBerat: "0.8 kg / smpl",
      potensiJual: "Rp 24.000",
    };

    const interval = setInterval(() => {
      if (totalDeteksiRef.current) {
        totalDeteksiRef.current.textContent = `${Math.floor(Math.random() * 120) + 60} Buah`;
      }
      if (kepercayaanRef.current) {
        kepercayaanRef.current.textContent = `${Math.floor(Math.random() * 15) + 85}%`;
      }
      if (estimasiBeratRef.current) {
        estimasiBeratRef.current.textContent = `${(Math.random() * 1.1 + 0.3).toFixed(1)} kg / smpl`;
      }
      if (potensiJualRef.current) {
        const nilai = Math.floor((Math.random() * 30000 + 8000) / 1000) * 1000;
        potensiJualRef.current.textContent = `Rp ${nilai.toLocaleString("id-ID")}`;
      }
    }, 90);

    const selesai = setTimeout(() => {
      clearInterval(interval);
      if (totalDeteksiRef.current) totalDeteksiRef.current.textContent = nilaiFinal.totalDeteksi;
      if (kepercayaanRef.current) kepercayaanRef.current.textContent = nilaiFinal.kepercayaan;
      if (estimasiBeratRef.current) estimasiBeratRef.current.textContent = nilaiFinal.estimasiBerat;
      if (potensiJualRef.current) potensiJualRef.current.textContent = nilaiFinal.potensiJual;
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(selesai);
    };
  }, []);

  return (
    <section
      id="beranda"
      className="container-lp pt-6 md:pt-0 md:h-screen grid lg:grid-cols-2 gap-16 items-center font-jakarta"
    >
      {/* Left: Text Content */}
      <div className="flex flex-col gap-4 md:gap-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-lp-outline w-fit shadow-lp-sm">
          <span className="w-2 h-2 rounded-full bg-lp-accent"></span>
          <span className="text-sm font-semibold text-lp">
            YOLOv8 Powered Agriculture
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-lp leading-tight tracking-tight font-jakarta">
          Prediksi Hasil Panen Cabai Rawit Lebih Terukur dengan AI
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-lp-muted leading-relaxed max-w-lg font-jakarta">
          Gunakan sistem sampling digital berbasis machine learning untuk
          menghitung jumlah buah dan estimasi tonase panen dengan presisi
          tinggi.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <ButtonSecondary
            to="/register"
            className="bg-lp text-white w-full md:w-fit font-medium text-lg px-8 py-3.5 md:py-4 rounded-xl hover:bg-lp-light transition-all shadow-lp-soft flex items-center justify-center gap-2 no-underline"
          >
            Mulai Estimasi Sekarang
          </ButtonSecondary>
          <button
            onClick={() => {
              const el = document.getElementById("cara-kerja");
              if (el) {
                const top =
                  el.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="border-2 text-[16px] md:text-[18px] border-lp-outline text-lp font-medium text-lg px-8 py-3.5 md:py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 bg-white/50 cursor-pointer"
          >
            Pelajari Cara Kerja
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center gap-2 md:gap-6 md:pt-8 border-t border-lp-outline/50 mt-4 flex-wrap">
          <div className="flex items-center gap-1 md:gap-2 text-sm text-lp-muted font-medium">
            <span className="material-symbols-outlined text-lp-accent">
              check_circle
            </span>
            Akurasi &gt;90%
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-sm text-lp-muted font-medium">
            <span className="material-symbols-outlined text-lp-accent">
              speed
            </span>
            Proses Cepat
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-sm text-lp-muted font-medium">
            <span className="material-symbols-outlined text-lp-accent">
              data_usage
            </span>
            Data Historis
          </div>
        </div>
      </div>

      {/* Right: Preview Card */}
      <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-lp-soft border border-lp-outline flex flex-col gap-6">
        {/* Preview Badge */}
        <div className="absolute -top-4 -right-4 bg-lp-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 z-10">
          <span className="material-symbols-outlined text-[16px]">
            visibility
          </span>
          Preview sistem setelah login
        </div>

        {/* Image with Bounding Boxes */}
        <div className="relative h-60 md:h-80 rounded-2xl overflow-hidden border border-lp-outline bg-lp-bg">
          <img
            alt="Tanaman cabai dengan AI bounding boxes"
            className="w-full h-full object-cover"
            src={heroImg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lp/40 to-transparent"></div>
          {/* Mock Bounding Boxes */}
          <div className="absolute top-1/4 left-1/4 w-16 h-20 border-[3px] border-lp-warn rounded flex flex-col shadow-lp-sm animate-bounce-scale">
            <span className="bg-lp-warn text-white text-[10px] font-bold px-1.5 py-0.5 self-start rounded-br">
              Chili {confidence}%
            </span>
          </div>
          <div className="absolute top-1/2 left-2/3 w-12 h-16 border-[3px] border-lp-warn rounded flex flex-col shadow-lp-sm animate-bounce-scale">
            <span className="bg-lp-warn text-white text-[10px] font-bold px-1.5 py-0.5 self-start rounded-br">
              Chili {confidence}%
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-lp-bg rounded-xl p-4 border border-lp-outline/50">
            <span className="text-sm font-medium text-lp-muted block mb-1 font-jakarta">
              Total Deteksi
            </span>
            <span ref={totalDeteksiRef} className="text-2xl font-bold text-lp block font-jakarta">
              156 Buah
            </span>
          </div>
          <div className="bg-lp-bg rounded-xl p-4 border border-lp-outline/50">
            <span className="text-sm font-medium text-lp-muted block mb-1 font-jakarta">
              Tingkat Kepercayaan
            </span>
            <span ref={kepercayaanRef} className="text-2xl font-bold text-lp-accent block font-jakarta">
              94%
            </span>
          </div>
          <div className="bg-lp-bg rounded-xl p-4 border border-lp-outline/50">
            <span className="text-sm font-medium text-lp-muted block mb-1 font-jakarta">
              Estimasi Berat
            </span>
            <span ref={estimasiBeratRef} className="text-2xl font-bold text-lp block font-jakarta">
              0.8 kg / smpl
            </span>
          </div>
          <div className="bg-lp-bg rounded-xl p-4 border border-lp-outline/50">
            <span className="text-sm font-medium text-lp-muted block mb-1 font-jakarta">
              Potensi Nilai Jual
            </span>
            <span ref={potensiJualRef} className="text-2xl font-bold text-lp block font-jakarta">
              Rp 24.000
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
