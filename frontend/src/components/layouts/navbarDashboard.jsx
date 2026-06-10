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
  const location = useLocation();
  const pageTitle =
    Object.entries(pagesTitles).find(([path]) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
    )?.[1] || "Dashboard";

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

  return (
    <nav className="relative z-40 flex w-full shrink-0 items-center justify-between gap-1.5 bg-[#f6f3eb] px-5 py-2.5 md:gap-2 md:px-5 md:py-3">
      <div className="min-w-0 flex-1">
        <span className="block max-w-[150px] truncate text-[30px] font-bold text-gray-900 md:max-w-[240px] md:text-2xl font-jakarta">
          {pageTitle}
        </span>
      </div>
      <div className="flex flex-row gap-3 items-center">
        {/* Notification Bell */}
        <button
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all relative cursor-pointer"
          title="Notifikasi"
        >
          <svg
            className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
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
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Settings Gear */}
        <button
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
          title="Pengaturan"
        >
          <svg
            className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]"
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

        {/* Profile Avatar */}
        <Link
          to="/profil"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-green-700 flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white hover:scale-105 active:scale-95 transition-transform ml-0.5"
          title="Profil Saya"
        >
          {namaUser ? namaUser.charAt(0).toUpperCase() : "U"}
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
