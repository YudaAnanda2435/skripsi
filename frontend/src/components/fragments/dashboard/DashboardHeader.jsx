import Location from "../../../assets/img/dashboard/location.svg";
import { getWeatherIcon, translateCondition } from "./dashboardUtils";

const DashboardHeader = ({
  dataDashboardTampil,
  desktopDateRangeControl,
  greeting,
  locationName,
  mobileDateRangeControl,
  weather,
}) => (
  <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-start">
    <div className="flex-1 flex flex-col gap-1">
      <div className="flex items-start justify-between gap-3 md:block">
        <p className="text-gray-500 text-base md:text-lg font-medium">
          {greeting},
        </p>
        {mobileDateRangeControl}
      </div>
      <h1 className="text-2xl md:text-[2.2rem] font-bold text-gray-900 leading-tight">
        {dataDashboardTampil.nama}
      </h1>
      <div className="flex items-center gap-1.5 mt-1.5">
        <img src={Location} alt="Loc" className="w-4 h-4 opacity-60" />
        <p className="text-gray-500 text-sm!">{locationName}</p>
      </div>
    </div>

    <div className="flex flex-col gap-5 md:flex-row-reverse md:items-start md:justify-end">
      {desktopDateRangeControl}

      <div className="bg-[#faf8f3] border border-[#eee8da] rounded-2xl px-5 py-4 flex items-center gap-4 min-w-[250px] md:min-w-[280px] shadow-sm">
        <div className="flex flex-col gap-0.5 flex-1">
          <p className="text-gray-600 text-xs font-semibold">
            {translateCondition(weather.condition)}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 leading-none">
            {weather.temp}Â°C
          </h2>
          <p className="text-[11px] text-gray-500 mt-1">
            Kelembaban {weather.humidity}% â€¢ Angin {weather.wind} Km/h
          </p>
        </div>
        <img
          src={getWeatherIcon(weather.condition)}
          alt="Weather"
          className="w-14 h-14 object-contain"
        />
      </div>
    </div>
  </div>
);

export default DashboardHeader;
