import { Link } from "react-router-dom";

const DashboardSidePanel = ({ dataBulanan, maxChart }) => (
  <div className="md:flex-1 flex flex-col gap-4">
    <Link to="/scan-tonase" className="block rounded-2xl overflow-hidden shadow-sm group">
      <div className="bg-gradient-to-br from-primary to-green-800 p-6 md:p-8 flex flex-col items-center text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <svg
            className="w-7 h-7 text-white"
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
        <h3 className="font-bold text-lg">Mulai Pemindaian</h3>
        <p className="text-white/70 text-xs mt-1">
          Upload foto untuk estimasi
        </p>
      </div>
    </Link>

    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-800 text-sm mb-4">
        Estimasi Panen Bulanan
      </h3>
      <div className="flex items-end justify-between gap-2 h-28">
        {dataBulanan.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
            <span className="text-[10px] text-gray-500 font-medium">
              {item.value > 0
                ? item.value >= 1000
                  ? `${(item.value / 1000).toFixed(1)}K`
                  : item.value
                : ""}
            </span>
            <div
              className={`w-full max-w-[28px] rounded-md transition-all duration-500 ${item.isCurrent ? "bg-primary" : "bg-primary/30"}`}
              style={{
                height: `${item.value > 0 ? Math.max((item.value / maxChart) * 80, 8) : 4}px`,
              }}
            ></div>
            <span
              className={`text-[10px] font-semibold ${item.isCurrent ? "text-primary" : "text-gray-400"}`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardSidePanel;
