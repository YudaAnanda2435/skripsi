import IconClear from "../../../assets/img/weather/clear.png";
import IconClouds from "../../../assets/img/weather/clouds.png";
import IconDrizzle from "../../../assets/img/weather/drizzle.png";
import IconMist from "../../../assets/img/weather/mist.png";
import IconRain from "../../../assets/img/weather/rain.png";
import IconThunderstorm from "../../../assets/img/weather/thunderstorm.png";

export const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
};

export const getWeatherIcon = (condition) => {
  const map = {
    Clear: IconClear,
    Clouds: IconClouds,
    Drizzle: IconDrizzle,
    Rain: IconRain,
    Thunderstorm: IconThunderstorm,
    Mist: IconMist,
    Haze: IconMist,
    Fog: IconMist,
    Smoke: IconMist,
    Dust: IconMist,
  };
  return map[condition] || IconClouds;
};

export const translateCondition = (condition) => {
  const map = {
    Clear: "Cerah",
    Clouds: "Berawan",
    Drizzle: "Gerimis",
    Rain: "Hujan",
    Thunderstorm: "Badai Petir",
    Mist: "Kabut Tipis",
    Haze: "Udara Kabur",
    Fog: "Kabut Tebal",
    Smoke: "Asap",
    Dust: "Berdebu",
    "Loading...": "Memuat...",
  };
  return map[condition] || condition;
};

export const waktuRelatif = (dateStr) => {
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay} hari yang lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
};

export const toDateInputValue = (dateValue) => {
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const normalizeDate = (dateValue) => {
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const getLahanDate = (item) =>
  item.created_at || item.tanggal_tanam || item.updated_at;

export const bulanNama = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
