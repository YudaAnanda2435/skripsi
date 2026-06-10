import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link, useLocation } from "react-router-dom";

const pagesTitles = {
  "/dashboard": "Dashboard",
  "/lahan": "Lahan",
  "/scan-tonase": "Scan Tonase",
  "/bukti-analisa": "Bukti Analisa",
  "/harga-jual": "Harga Jual",
  "/profil": "Profil",
  "/panduan": "Panduan",
};

const TopNavbar = () => {
  const [namaUser, setNamaUser] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pageTitle =
    Object.entries(pagesTitles).find(([path]) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
    )?.[1] || "Dashboard";

  useEffect(() => {
    const handleMobileMenuState = (event) => {
      setMobileMenuOpen(Boolean(event.detail?.isOpen));
    };

    window.addEventListener("chilivision:mobile-menu-state", handleMobileMenuState);
    return () =>
      window.removeEventListener(
        "chilivision:mobile-menu-state",
        handleMobileMenuState,
      );
  }, []);

  useEffect(() => {
    const ambilProfil = async () => {
      try {
        const res = await api.get("/me");
        setNamaUser(res.data.nama || "U");
      } catch (err) {
        console.error("TopNavbar: gagal ambil profil", err);
      }
    };
    ambilProfil();
  }, []);

  const toggleMobileMenu = () => {
    const isOpen = !mobileMenuOpen;
    setMobileMenuOpen(isOpen);
    window.dispatchEvent(
      new CustomEvent("chilivision:mobile-menu-toggle", { detail: { isOpen } }),
    );
  };

  return (
    <nav className="relative z-[70] flex w-full shrink-0 items-center justify-between gap-1.5 bg-[#f6f3eb] px-5 py-2.5 md:z-40 md:gap-2 md:px-5 md:py-3">
      <div className="min-w-0 flex-1">
        <span className="font-jakarta block max-w-[150px] truncate text-[24px] font-bold text-gray-900 md:max-w-[240px] md:text-2xl">
          {pageTitle}
        </span>
      </div>
      <div className="flex flex-row items-center gap-3">
        {/* Notification Bell */}
        <button
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-all hover:bg-gray-100 active:scale-95 md:h-10 md:w-10"
          title="Notifikasi"
        >
          <svg
            className="h-[20px] w-[20px] md:h-[22px] md:w-[22px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-red-500"></span>
        </button>

        {/* Settings Gear */}
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-all hover:bg-gray-100 active:scale-95 md:h-10 md:w-10"
          title="Pengaturan"
        >
          <svg
            className="h-[20px] w-[20px] md:h-[22px] md:w-[22px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileMenuOpen}
          className="ml-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-lp text-white shadow-md transition-transform duration-300 ease-out active:scale-95 md:hidden"
        >
          <span
            className={`relative block h-4 w-4 transition-transform duration-500 ease-out ${mobileMenuOpen ? "rotate-180" : "rotate-0"}`}
          >
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-out ${mobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0"}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-4 rounded-full bg-current transition-all duration-200 ease-out ${mobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-out ${mobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0"}`}
            />
          </span>
        </button>

        {/* Profile Avatar (Desktop Only) */}
        <Link
          to="/profil"
          className="ml-0.5 hidden h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-green-700 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 md:flex"
          title="Profil Saya"
        >
          {namaUser ? namaUser.charAt(0).toUpperCase() : "U"}
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
