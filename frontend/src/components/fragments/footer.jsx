import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-lp-outline font-jakarta">
      <div className="container-lp py-16 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-6 max-w-sm">
          <span className="text-2xl md:text-3xl font-bold text-lp font-jakarta">
            ChiliVision
          </span>
          <span className="text-base md:text-lg text-lp-muted leading-relaxed font-jakarta">
            Platform presisi agrikultur untuk estimasi hasil panen cabai
            berbasis kecerdasan buatan.
          </span>
          <span className="text-sm text-lp-muted/70 mt-4 font-jakarta">
            © {currentYear} ChiliVision. Hak Cipta Dilindungi.
          </span>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lp text-lg mb-2 font-jakarta">
            Navigasi
          </h4>
          {[
            { label: "Beranda", href: "#beranda" },
            { label: "Masalah", href: "#masalah" },
            { label: "Fitur", href: "#fitur" },
            { label: "Cara Kerja", href: "#cara-kerja" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base md:text-lg text-lp-muted hover:text-lp transition-colors no-underline font-jakarta"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Legal & Help Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lp text-lg mb-2 font-jakarta">
            Legal & Bantuan
          </h4>
          {[
            { label: "Pusat Bantuan", href: "#" },
            { label: "Kebijakan Privasi", href: "#" },
            { label: "Syarat & Ketentuan", href: "#" },
            { label: "Hubungi Kami", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base md:text-lg text-lp-muted hover:text-lp transition-colors no-underline font-jakarta"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
