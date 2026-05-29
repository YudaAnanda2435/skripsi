import potCabai from "../../assets/img/potCabai.png";
import LoginImage from "../../assets/img/loginImage.png";
import LogoLoop from "../elements/LogoLoop";

const AuthLayouts = ({ children, title }) => {
  return (
    <section className="flex flex-col-reverse md:flex-row h-screen w-full overflow-hidden">
      {/* ── KIRI: Panel Form ── */}
      <div
        className="w-full md:w-1/3 flex-1 md:h-full flex flex-col items-center justify-center px-6 py-6 relative -mt-8 md:mt-0 rounded-t-3xl md:rounded-none z-10 bg-lp-bg"
     
      >
        {/* Decorative orbs */}
        <div
          className="absolute -top-32 -left-32 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(81,154,102,0.25) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(198,139,68,0.15) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Card Form */}
        <div
          className="w-full max-w-md rounded-2xl py-6 px-4 md:p-8 relative z-10"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Heading */}
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-8 sm:mb-5 leading-tight font-jakarta">
            {title}
          </h1>

          {/* Form content */}
          {children}
        </div>

        {/* Bottom hint */}
        <p
          className="mt-5 text-xs text-center"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          © {new Date().getFullYear()} AgroCount — Smart Agriculture Platform
        </p>
      </div>

      {/* ── KANAN: Panel Visual ── */}
      <div className="w-full h-[40%] md:w-3/5 md:h-full relative overflow-hidden shrink-0">
        <img
          loading="lazy"
          src={LoginImage}
          alt="Smart Farming"
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(15,26,19,0.55) 0%, rgba(17,45,32,0.75) 100%)",
          }}
        />

        {/* Floating content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 sm:p-12 text-white">
          <img
            loading="lazy"
            src={potCabai}
            alt="AgroCount Icon"
            className="w-10 sm:w-28 sm:mb-6 mb-3 drop-shadow-2xl"
          />
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight sm:mb-4 text-center">
            Smart Agriculture,
            <br />
            <span style={{ color: "#7ce2a1" }}>Real Results.</span>
          </h2>
          <p
            className="text-base text-center w-full hidden sm:block  lg:max-w-md sm:leading-relaxed"
            style={{ color: "rgba(220,245,232,0.75)" }}
          >
            Estimasi panen cabai rawit secara akurat menggunakan teknologi AI.
            Pantau lahan Anda kapan saja, di mana saja.
          </p>

          {/* Logo Loop */}
          <div className="hidden sm:block w-full max-w-1/2  mt-8">
            <LogoLoop
              items={[
                { icon: "🤖", label: "YOLOv8", sub: "AI Model" },
                { icon: "⚡", label: "FastAPI", sub: "Backend" },
                { icon: "🐍", label: "Python", sub: "Language" },
                { icon: "⚛️", label: "React", sub: "Frontend" },
                { icon: "🌿", label: "100% Gratis", sub: "No credit card" },
                { icon: "🎯", label: "3x Lebih Cepat", sub: "vs Manual" },
                { icon: "🔒", label: "Data Aman", sub: "Encrypted" },
              ]}
              speed={45}
              gap={16}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayouts;
