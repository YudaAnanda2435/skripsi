import { CiCalendarDate } from "react-icons/ci";

const DateRangeControl = ({
  align = "left",
  className = "",
  datePickerOpen,
  labelRentangTanggal,
  rentangTanggal,
  setDatePickerOpen,
  setRentangTanggal,
  tanggalTersedia,
}) => (
  <div className={`relative flex flex-row items-center font-jakarta ${className}`}>
    <button
      type="button"
      onClick={() => setDatePickerOpen((open) => !open)}
      className="flex-row md:flex-col flex justify-center mx-auto h-9 md:h-26 items-center gap-2 rounded-2xl border border-gray-200 bg-lp-bg px-3 md:px-6 text-xs font-bold text-gray-700 shadow-sm transition-colors hover:border-primary hover:text-primary"
    >
      <CiCalendarDate className="w-7 h-7" />
      <span className="max-w-[110px] truncate">
        {rentangTanggal.mulai || rentangTanggal.selesai
          ? "Terfilter"
          : "Tanggal"}
      </span>
    </button>

    {datePickerOpen && (
      <div
        className={`absolute top-11 z-30 w-[280px] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl ${align === "right" ? "right-0" : "left-0"}`}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-800">Rentang tanggal</p>
            <p className="mt-0.5 truncate text-[11px] text-gray-500">
              {labelRentangTanggal}
            </p>
          </div>
          {(rentangTanggal.mulai || rentangTanggal.selesai) && (
            <button
              type="button"
              onClick={() => setRentangTanggal({ mulai: "", selesai: "" })}
              className="text-[11px] font-bold text-primary hover:text-green-800"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-600">
            Dari
            <input
              type="date"
              value={rentangTanggal.mulai}
              min={tanggalTersedia.min}
              max={rentangTanggal.selesai || tanggalTersedia.max}
              onChange={(e) =>
                setRentangTanggal((prev) => ({
                  ...prev,
                  mulai: e.target.value,
                }))
              }
              className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:bg-white"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-600">
            Sampai
            <input
              type="date"
              value={rentangTanggal.selesai}
              min={rentangTanggal.mulai || tanggalTersedia.min}
              max={tanggalTersedia.max}
              onChange={(e) =>
                setRentangTanggal((prev) => ({
                  ...prev,
                  selesai: e.target.value,
                }))
              }
              className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:bg-white"
            />
          </label>
        </div>

        {tanggalTersedia.min && tanggalTersedia.max && (
          <p className="mt-3 text-[10px] leading-relaxed text-gray-400">
            Data tersedia{" "}
            {new Date(tanggalTersedia.min).toLocaleDateString("id-ID")} -{" "}
            {new Date(tanggalTersedia.max).toLocaleDateString("id-ID")}.
          </p>
        )}
      </div>
    )}
  </div>
);

export default DateRangeControl;
