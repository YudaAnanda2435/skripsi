import ButtonSeccondary from "../elements/button";
import About1 from "../../assets/about1.png";
import About2 from "../../assets/about2.png";

const About = () => {
  return (
    <section id="tentang" className="containers bg-white py-20 flex flex-col gap-2 md:gap-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex flex-col gap-3">
          <span className="text-[#c68b44] font-semibold text-sm tracking-wider uppercase block">
            Tentang Kami
          </span>
          <h2 className="w-full max-w-[650px] text-3xl md:text-5xl font-bold text-[#112d20] mb-2">
            Solusi cerdas perpaduan alam dan teknologi AI.
          </h2>
          <div className="mt-2">
            <ButtonSeccondary>Mulai Estimasi</ButtonSeccondary>
          </div>
        </div>
        <p className="w-full max-w-[550px] text-gray-600 text-sm md:text-base text-justify leading-relaxed">
          Kami berdedikasi mentransformasi pertanian cabai melalui teknologi mutakhir. Dengan integrasi kecerdasan buatan (AI) terdepan, kami hadir untuk membantu petani mengestimasi hasil panen secara instan, mengelola lahan dengan efisien, serta meningkatkan produktivitas kebun secara berkelanjutan.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Tambahkan w-full dan gap-4 di sini agar kedua bingkai punya jarak */}
        <div className="flex flex-row w-full gap-4">
          {/* --- BINGKAI 1 --- */}
          {/* Pindahkan w-2/3, aspect, dan rounded-2xl ke bingkai ini */}
          <div className="w-2/3 overflow-hidden rounded-2xl aspect-[3/2] md:aspect-[21/9]">
            <img
              loading="lazy"
              src={About1}
              alt="Agriculture technology"
              // Gambar cukup memenuhi bingkai (w-full h-full object-cover)
              // Tambahkan transition-transform duration-500 agar efek scale-nya mulus (tidak patah/kaget)
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* --- BINGKAI 2 --- */}
          {/* Pindahkan w-1/3, aspect, dan rounded-2xl ke bingkai ini */}
          <div className="w-1/3 overflow-hidden rounded-2xl aspect-[3/2] md:aspect-[21/9]">
            <img
              loading="lazy"
              src={About2}
              alt="Farming solution"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
