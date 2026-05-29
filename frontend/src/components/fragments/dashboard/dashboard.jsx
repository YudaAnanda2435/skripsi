import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import BottomMenu from "../../layouts/bottomMenu";
import TopNavbar from "../../layouts/navbarDashboard";
import DashboardHeader from "./DashboardHeader";
import DashboardSidePanel from "./DashboardSidePanel";
import DashboardStats from "./DashboardStats";
import DateRangeControl from "./DateRangeControl";
import RecentActivitySection from "./RecentActivitySection";
import {
  bulanNama,
  getGreeting,
  getLahanDate,
  normalizeDate,
  toDateInputValue,
} from "./dashboardUtils";

const lokasiDefault = {
  latitude: -6.9237,
  longitude: 106.9287,
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const greeting = useMemo(() => getGreeting(), []);
  const [locationName, setLocationName] = useState("Mencari lokasi...");
  const [weather, setWeather] = useState({
    temp: 0,
    condition: "Loading...",
    humidity: 0,
    wind: 0,
  });
  const [dataDashboard, setDataDashboard] = useState({
    nama: "Petani",
    totalLahan: 0,
    estimasiPanen: 0,
    potensiPendapatan: 0,
    trenPendapatanPersen: 0,
    trenPendapatanStatus: "tetap",
    trenPanenPersen: 0,
    trenPanenStatus: "tetap",
    hargaPasar: null,
    riwayat: [],
  });
  const [rawRiwayat, setRawRiwayat] = useState([]);
  const [rawLahan, setRawLahan] = useState([]);
  const [rawHargaRiwayat, setRawHargaRiwayat] = useState([]);
  const [rentangTanggal, setRentangTanggal] = useState({
    mulai: "",
    selesai: "",
  });
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    if (location.state?.fromLogin) {
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 800);
    }
  }, [location.pathname, location.state?.fromLogin, navigate]);

  const fetchWeather = async (lat, lon) => {
    const API_KEY = "7a919905a688abfb83ec1bbe833ca34a";
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );
      const data = await res.json();
      setLocationName(`${data.name}, ${data.sys.country}`);
      setWeather({
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed * 3.6),
      });
    } catch (e) {
      console.error("Gagal mengambil data cuaca:", e);
      setLocationName("Sukabumi, Indonesia");
    }
  };

  const isInSelectedRange = useCallback(
    (dateValue) => {
      const itemDate = normalizeDate(dateValue);
      if (!itemDate) return !rentangTanggal.mulai && !rentangTanggal.selesai;

      const startDate = rentangTanggal.mulai
        ? normalizeDate(rentangTanggal.mulai)
        : null;
      const endDate = rentangTanggal.selesai
        ? normalizeDate(rentangTanggal.selesai)
        : null;

      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    },
    [rentangTanggal.mulai, rentangTanggal.selesai],
  );

  const tanggalTersedia = useMemo(() => {
    const tanggal = [
      ...rawRiwayat.map((item) => item.tanggal),
      ...rawLahan.map((item) => getLahanDate(item)),
      ...rawHargaRiwayat.map((item) => item.tanggal_iso || item.tanggal),
    ]
      .map(normalizeDate)
      .filter(Boolean)
      .sort((a, b) => a - b);

    return {
      min: tanggal.length ? toDateInputValue(tanggal[0]) : "",
      max: tanggal.length ? toDateInputValue(tanggal[tanggal.length - 1]) : "",
    };
  }, [rawRiwayat, rawLahan, rawHargaRiwayat]);

  const labelRentangTanggal = useMemo(() => {
    if (!rentangTanggal.mulai && !rentangTanggal.selesai) {
      return "Semua tanggal";
    }
    const format = (value) =>
      new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    if (rentangTanggal.mulai && rentangTanggal.selesai) {
      return `${format(rentangTanggal.mulai)} - ${format(rentangTanggal.selesai)}`;
    }
    if (rentangTanggal.mulai) return `Mulai ${format(rentangTanggal.mulai)}`;
    return `Sampai ${format(rentangTanggal.selesai)}`;
  }, [rentangTanggal]);

  const dashboardTerfilter = useMemo(() => {
    let totalPanen = 0;
    let totalPendapatan = 0;
    let pendapatanBulanIni = 0;
    let pendapatanBulanLalu = 0;
    let panenBulanIni = 0;
    let panenBulanLalu = 0;
    const now = new Date();
    const cm = now.getMonth();
    const cy = now.getFullYear();
    const filteredRiwayat = rawRiwayat.filter((item) =>
      isInSelectedRange(item.tanggal),
    );
    const lahanAktif = rawLahan.filter(
      (l) =>
        (l.status === "Belum Panen" || !l.status) &&
        isInSelectedRange(getLahanDate(l)),
    );

    filteredRiwayat.forEach((item) => {
      const ton = item.estimasi_tonase || 0;
      const pend = item.potensi_pendapatan || 0;
      totalPanen += ton;
      totalPendapatan += pend;
      const d = new Date(item.tanggal);
      const im = d.getMonth();
      const iy = d.getFullYear();
      if (iy === cy && im === cm) {
        pendapatanBulanIni += pend;
        panenBulanIni += ton;
      } else if (
        (iy === cy && im === cm - 1) ||
        (cm === 0 && iy === cy - 1 && im === 11)
      ) {
        pendapatanBulanLalu += pend;
        panenBulanLalu += ton;
      }
    });

    let pctPendapatan = 0;
    let trenPendapatan = "tetap";
    if (pendapatanBulanLalu > 0) {
      pctPendapatan =
        ((pendapatanBulanIni - pendapatanBulanLalu) / pendapatanBulanLalu) *
        100;
    } else if (pendapatanBulanIni > 0) {
      pctPendapatan = 100;
    }
    if (pctPendapatan > 0) trenPendapatan = "naik";
    else if (pctPendapatan < 0) trenPendapatan = "turun";

    let pctPanen = 0;
    let trenPanen = "tetap";
    if (panenBulanLalu > 0) {
      pctPanen = ((panenBulanIni - panenBulanLalu) / panenBulanLalu) * 100;
    } else if (panenBulanIni > 0) {
      pctPanen = 100;
    }
    if (pctPanen > 0) trenPanen = "naik";
    else if (pctPanen < 0) trenPanen = "turun";

    const feed = [];
    filteredRiwayat.forEach((item) => {
      feed.push({
        type: "scan",
        title: `Scan panen "${item.lahan ? item.lahan.nama_lahan : "Lahan"}" selesai`,
        time: new Date(item.tanggal),
        icon: "camera",
      });
    });
    rawHargaRiwayat
      .filter((item) => isInSelectedRange(item.tanggal_iso || item.tanggal))
      .forEach((item) => {
        const t = item.tanggal_iso
          ? new Date(item.tanggal_iso)
          : new Date(item.tanggal || 0);
        feed.push({
          type: "harga",
          title: `Harga "${item.varietas}" diperbarui`,
          time: t,
          icon: "trend",
        });
      });
    rawLahan
      .filter((item) => isInSelectedRange(getLahanDate(item)))
      .forEach((item) => {
        const t = getLahanDate(item)
          ? new Date(getLahanDate(item))
          : new Date(0);
        feed.push({
          type: "lahan",
          title: `Lahan "${item.nama_lahan}" ditambahkan`,
          time: t,
          icon: "location",
        });
      });
    feed.sort((a, b) => b.time - a.time);

    const monthKeys = [
      ...new Set(
        filteredRiwayat.map((item) => {
          const d = new Date(item.tanggal);
          return `${d.getFullYear()}-${d.getMonth()}`;
        }),
      ),
    ].sort((a, b) => {
      const [ay, am] = a.split("-").map(Number);
      const [by, bm] = b.split("-").map(Number);
      return new Date(ay, am, 1) - new Date(by, bm, 1);
    });
    const selectedMonthKeys =
      monthKeys.length > 0
        ? monthKeys.slice(-6)
        : Array.from({ length: 6 }, (_, idx) => {
            const m = new Date(
              now.getFullYear(),
              now.getMonth() - (5 - idx),
              1,
            );
            return `${m.getFullYear()}-${m.getMonth()}`;
          });
    const currentKey = selectedMonthKeys[selectedMonthKeys.length - 1];
    const monthlyData = selectedMonthKeys.map((key) => {
      const [year, monthIdx] = key.split("-").map(Number);
      const total = filteredRiwayat
        .filter((r) => {
          const d = new Date(r.tanggal);
          return d.getMonth() === monthIdx && d.getFullYear() === year;
        })
        .reduce((sum, r) => sum + (r.estimasi_tonase || 0), 0);
      return {
        label: bulanNama[monthIdx],
        value: total,
        isCurrent: key === currentKey,
      };
    });

    return {
      aktivitas: feed.slice(0, 5),
      dataBulanan: monthlyData,
      statistik: {
        totalLahan: lahanAktif.length,
        estimasiPanen: totalPanen,
        potensiPendapatan: totalPendapatan,
        trenPendapatanPersen: Math.abs(pctPendapatan).toFixed(0),
        trenPendapatanStatus: trenPendapatan,
        trenPanenPersen: Math.abs(pctPanen).toFixed(0),
        trenPanenStatus: trenPanen,
      },
    };
  }, [rawRiwayat, rawLahan, rawHargaRiwayat, isInSelectedRange]);

  useEffect(() => {
    let dibatalkan = false;

    Promise.all([
      api.get("/me"),
      api.get("/riwayat-analisa"),
      api.get("/lahan"),
      api.get("/harga"),
      api.get("/harga/riwayat").catch(() => ({ data: [] })),
    ])
      .then(([resProfil, resRiwayat, resLahan, resHarga, resHargaRiwayat]) => {
        if (dibatalkan) return;

        const profil = resProfil.data;
        const riwayat = resRiwayat.data || [];
        const lahanList = resLahan.data || [];
        const hargaList = resHarga.data || [];
        const hargaRiwayatList = resHargaRiwayat.data || [];

        setRawRiwayat(riwayat);
        setRawLahan(lahanList);
        setRawHargaRiwayat(hargaRiwayatList);
        setDataDashboard((prev) => ({
          ...prev,
          nama: profil.nama || "Petani",
          hargaPasar: hargaList.length > 0 ? hargaList[0] : null,
        }));
      })
      .catch((error) => {
        console.error("Gagal mengambil data dashboard:", error);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(lokasiDefault.latitude, lokasiDefault.longitude),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    } else {
      Promise.resolve().then(() =>
        fetchWeather(lokasiDefault.latitude, lokasiDefault.longitude),
      );
    }

    return () => {
      dibatalkan = true;
    };
  }, []);

  const dataDashboardTampil = {
    ...dataDashboard,
    ...dashboardTerfilter.statistik,
  };
  const { aktivitas, dataBulanan } = dashboardTerfilter;
  const maxChart = Math.max(...dataBulanan.map((d) => d.value), 1);
  const dateRangeProps = {
    datePickerOpen,
    labelRentangTanggal,
    rentangTanggal,
    setDatePickerOpen,
    setRentangTanggal,
    tanggalTersedia,
  };

  return (
    <section className="core-layout font-jakarta">
      <div className="core-content">
        <TopNavbar />
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 md:px-8 py-6 md:py-8  flex flex-col gap-6 md:gap-8 bg-white">
            <DashboardHeader
              dataDashboardTampil={dataDashboardTampil}
              desktopDateRangeControl={
                <DateRangeControl
                  {...dateRangeProps}
                  align="right"
                  className="hidden md:block"
                />
              }
              greeting={greeting}
              locationName={locationName}
              mobileDateRangeControl={
                <DateRangeControl
                  {...dateRangeProps}
                  align="right"
                  className="shrink-0 md:hidden"
                />
              }
              weather={weather}
            />

            <DashboardStats dataDashboardTampil={dataDashboardTampil} />

            <div className="flex flex-col md:flex-row gap-6">
              <RecentActivitySection aktivitas={aktivitas} />
              <DashboardSidePanel dataBulanan={dataBulanan} maxChart={maxChart} />
            </div>
          </div>
        </div>
      </div>
      <BottomMenu />
    </section>
  );
};

export default Dashboard;
