const DashboardStats = ({ dataDashboardTampil }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-sm font-medium">
          Potensi Pendapatan
        </p>
        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">
        Rp {dataDashboardTampil.potensiPendapatan.toLocaleString("id-ID")}
      </h3>
      {dataDashboardTampil.trenPendapatanStatus !== "tetap" && (
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${dataDashboardTampil.trenPendapatanStatus === "naik" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
        >
          {dataDashboardTampil.trenPendapatanStatus === "naik"
            ? "Naik"
            : "Turun"}{" "}
          {dataDashboardTampil.trenPendapatanPersen}% dari minggu lalu
        </span>
      )}
    </div>

    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-sm font-medium">Estimasi Panen</p>
        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">
        {dataDashboardTampil.estimasiPanen.toLocaleString("id-ID")}{" "}
        <span className="text-sm font-normal text-gray-500">Kg</span>
      </h3>
      {dataDashboardTampil.trenPanenStatus !== "tetap" && (
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${dataDashboardTampil.trenPanenStatus === "naik" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
        >
          {dataDashboardTampil.trenPanenStatus === "naik" ? "Naik" : "Turun"}{" "}
          {dataDashboardTampil.trenPanenPersen}% dari minggu lalu
        </span>
      )}
    </div>

    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-sm font-medium">Lahan Aktif</p>
        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">
        {dataDashboardTampil.totalLahan}{" "}
        <span className="text-sm font-normal text-gray-500">Lahan</span>
      </h3>
      <p className="text-xs text-gray-400">Total lahan aktif</p>
    </div>
  </div>
);

export default DashboardStats;
