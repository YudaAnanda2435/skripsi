import { Link } from "react-router-dom";
import Petik from "../../assets/img/petik.mp4"
const CTA = () => {
  return (
    <section className="relative overflow-hidden container-lp text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      ><source src={ Petik} type="video/mp4" /></video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-8 font-jakarta">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-jakarta">
          Mulai Gunakan Pendekatan Data untuk Panen Anda
        </h2>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-jakarta">
          Tinggalkan metode estimasi tebakan. Buat akun sekarang untuk mulai
          mengukur potensi lahan Anda dengan lebih presisi.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full sm:w-auto">
          <Link
            to="/register"
            className="bg-white text-lp font-bold text-lg px-10 py-5 rounded-xl hover:bg-lp-bg transition-colors shadow-lg w-full sm:w-auto text-center no-underline"
          >
            Daftar & Mulai Sekarang
          </Link>
          <Link
            to="/login"
            className="border-2 border-white/30 text-white font-bold text-lg px-10 py-5 rounded-xl hover:bg-white/10 transition-colors w-full sm:w-auto text-center no-underline"
          >
            Masuk ke Akun
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
