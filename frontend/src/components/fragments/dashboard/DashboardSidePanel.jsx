import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

const formatChartValue = (value) => {
  if (!value) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return `${value}`;
};

const useIsMobileChart = () => {
  const [isMobileChart, setIsMobileChart] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => setIsMobileChart(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobileChart;
};

const DashboardSidePanel = ({ dataBulanan }) => {
  const isMobileChart = useIsMobileChart();
  const chartData = dataBulanan.map((item) => Number(item.value) || 0);
  const chartLabels = dataBulanan.map((item) => item.label);
  const chartHeight = isMobileChart ? 180 : 210;
  const chartMargin = isMobileChart
    ? { top: 16, right: 8, bottom: 24, left: 22 }
    : { top: 18, right: 14, bottom: 28, left: 30 };

  return (
    <div className="flex flex-col gap-4 md:flex-1">
      <Link to="/scan-tonase" className="group block overflow-hidden rounded-2xl shadow-sm">
        <div className="relative flex flex-col items-center overflow-hidden bg-gradient-to-br from-primary to-green-800 p-6 text-center text-white md:p-8">
          <div className="absolute right-0 top-0 -mr-12 -mt-12 h-32 w-32 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-150"></div>
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform group-hover:scale-110">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold">Mulai Pemindaian</h3>
          <p className="mt-1 text-xs text-white/70">
            Upload foto untuk estimasi
          </p>
        </div>
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              Estimasi Panen Bulanan
            </h3>
            <p className="mt-1 text-xs font-medium text-gray-400">
              Tren estimasi panen dari data bulanan
            </p>
          </div>
        </div>

        <div
          className="w-full overflow-hidden rounded-xl bg-[#f6f3eb]/60 px-0.5 pt-2 md:px-1"
          style={{ height: chartHeight }}
        >
          <LineChart
            height={chartHeight}
            margin={chartMargin}
            series={[
              {
                data: chartData,
                area: true,
                showMark: false,
                color: "#002719",
                valueFormatter: (value) => `${formatChartValue(value || 0)} kg`,
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: chartLabels,
                valueFormatter: (value) =>
                  isMobileChart ? String(value).slice(0, 3) : value,
              },
            ]}
            yAxis={[
              {
                valueFormatter: (value) => formatChartValue(value),
              },
            ]}
            grid={{ horizontal: true }}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: "none",
              },
              "& .MuiAreaElement-root": {
                fillOpacity: 0.22,
              },
              "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": {
                stroke: "#d7d2c8",
              },
              "& .MuiChartsAxis-tickLabel": {
                fill: "#717973",
                fontSize: isMobileChart ? 10 : 11,
                fontWeight: 700,
              },
              "& .MuiChartsGrid-line": {
                stroke: "#e5e2da",
                strokeDasharray: "4 6",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidePanel;

