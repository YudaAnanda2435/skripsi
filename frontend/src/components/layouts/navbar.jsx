import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda" },
  { id: "masalah", label: "Masalah" },
  { id: "fitur", label: "Fitur" },
  { id: "cara-kerja", label: "Cara Kerja" },
  { id: "faq", label: "FAQ" },
];


const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [activeSection, setActiveSection] = useState("beranda");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        for (const { id } of NAV_ITEMS) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top >= -100 && rect.top < window.innerHeight / 2) {
              setActiveSection(id);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (id) => {
    if (id === "beranda") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleNavClick = (id) => {
    closeMenu();
    setActiveSection(id);
    if (isHomePage) {
      scrollToSection(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-lp-bg backdrop-blur-md shadow-lp-sm border-b border-lp-outline transition-all duration-300 ease-in-out font-jakarta">
      <div className="flex justify-between items-center w-full max-w-[1920px] mx-auto px-[24px] md:px-[40px] h-20">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-lp no-underline"
          onClick={() => handleNavClick("beranda")}
        >
          ChiliVision
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`bg-transparent  cursor-pointer transition-colors duration-200 font-jakarta text-sm font-medium ${
                activeSection === id
                  ? "text-lp border-b-2! border-lp!"
                  : "text-lp-muted hover:text-lp border-b-2 border-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="border border-lp-outline text-lp font-medium px-6 py-2.5 rounded-lg hover:bg-white transition-colors no-underline text-sm"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="bg-lp text-white font-medium px-6 py-2.5 rounded-lg hover:bg-lp-light transition-all shadow-lp-sm no-underline text-sm"
          >
            Mulai Estimasi
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-lp cursor-pointer bg-transparent border-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className="material-symbols-outlined text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}

      <div
        className={`lg:hidden fixed h-screen inset-0 top-20 bg-lp-bg backdrop-blur-xl z-40 flex flex-col items-center justify-start pt-16 gap-6 transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "pointer-events-none opacity-0 translate-y-4"}`}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            className={`bg-transparent border-none cursor-pointer text-2xl font-jakarta font-medium transition-colors duration-200 ${
              activeSection === id ? "text-lp" : "text-lp-muted"
            }`}
          >
            {label}
          </button>
        ))}
        <div className="flex flex-col gap-3 mt-8 w-64">
          <Link
            to="/login"
            onClick={closeMenu}
            className="border border-lp-outline text-lp font-medium px-6 py-3 rounded-lg text-center no-underline hover:bg-white transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className="bg-lp text-white font-medium px-6 py-3 rounded-lg text-center no-underline hover:bg-lp-light transition-colors"
          >
            Mulai Estimasi
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
