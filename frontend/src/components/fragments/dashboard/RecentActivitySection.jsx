import { Link } from "react-router-dom";
import ActivityIcon from "./ActivityIcon";
import { waktuRelatif } from "./dashboardUtils";

const RecentActivitySection = ({ aktivitas }) => (
  <div className="flex-1 md:flex-[2] flex flex-col gap-3">
    <div className="flex justify-between items-center">
      <h2 className="font-bold text-gray-800 text-lg!">
        Aktivitas Terakhir
      </h2>
      <Link
        to="/bukti-analisa"
        className="text-sm text-gray-500 font-semibold hover:text-primary transition-colors"
      >
        Lihat Semua
      </Link>
    </div>

    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
      {aktivitas.length > 0 ? (
        aktivitas.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-4 hover:bg-gray-50/50 transition-colors"
          >
            <ActivityIcon type={item.icon} />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {item.title}
              </p>
              <p className="text-xs text-gray-400">
                {waktuRelatif(item.time)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-6 text-center">
          <p className="text-sm text-gray-400">
            Belum ada aktivitas terbaru.
          </p>
        </div>
      )}
    </div>
  </div>
);

export default RecentActivitySection;
