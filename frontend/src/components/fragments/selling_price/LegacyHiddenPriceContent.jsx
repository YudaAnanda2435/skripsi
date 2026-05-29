import { Trash } from "lucide-react";

const LegacyHiddenPriceContent = ({
  bukaModalUpdate,
  daftarHarga,
  hapusHarga,
  hapusRiwayat,
  hapusSemuaHarga,
  hapusSemuaRiwayat,
  riwayatHarga,
  setIsModalTambahBuka,
}) => (
  <div className="hidden">
    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 shadow-sm">
      <div className="text-blue-500 mt-0.5">â„¹ï¸</div>
      <p className="text-xs text-blue-800 leading-relaxed">
        Perbarui harga jual per kilogram secara rutin. Sistem AI akan
        menggunakan data ini untuk menghitung total Potensi Pendapatan
        Anda.
      </p>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-bold text-gray-800 text-lg">
          Harga Saat Ini
        </h2>
        <div className="flex gap-2">
          {daftarHarga.length > 0 && (
            <button
              onClick={hapusSemuaHarga}
              className="text-xs font-bold text-white bg-red-500 px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform"
            >
              Hapus Semua
            </button>
          )}
          <button
            onClick={() => setIsModalTambahBuka(true)}
            className="text-xs font-bold text-white bg-primary px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform"
          >
            + Varietas Baru
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto pr-1 pb-2">
        {daftarHarga.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 shrink-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-gray-800">
                  {item.varietas}
                </h3>
                <p className="text-[10px] text-gray-500">
                  Update: {item.terakhirUpdate}
                </p>
              </div>

              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold ${
                  item.tren === "naik"
                    ? "bg-green-100 text-green-700"
                    : item.tren === "turun"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.tren === "naik"
                  ? "â–²"
                  : item.tren === "turun"
                    ? "â–¼"
                    : "â– "}
                {item.selisih > 0 ? `Rp ${item.selisih}` : "Tetap"}
              </div>
            </div>

            <div className="flex justify-between items-end mt-1">
              <h2 className="text-xl font-bold text-primary">
                Rp {item.harga.toLocaleString("id-ID")}{" "}
                <span className="text-xs text-gray-500 font-normal">
                  / Kg
                </span>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => bukaModalUpdate(item)}
                  className="px-3 py-1.5 bg-gray-800 text-white text-[10px] font-bold rounded-lg shadow-md active:scale-95 transition-transform"
                >
                  Ubah Harga
                </button>
                <button
                  onClick={() => hapusHarga(item.id)}
                  className="px-3 py-1.5 bg-red-50 text-red-500 font-bold rounded-lg active:scale-95 transition-transform flex items-center justify-center"
                >
                  <Trash className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-bold text-gray-800 text-lg">
          Riwayat Perubahan
        </h2>
        {riwayatHarga.length > 0 && (
          <button
            onClick={hapusSemuaRiwayat}
            className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md active:scale-95 transition-transform"
          >
            Hapus Semua Riwayat
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col max-h-[30vh] overflow-y-auto">
        {riwayatHarga.map((riwayat, index) => (
          <div
            key={riwayat.id}
            className={`p-4 flex justify-between items-center shrink-0 ${index !== riwayatHarga.length - 1 ? "border-b border-gray-50" : ""}`}
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-bold text-gray-800">
                {riwayat.varietas}
              </h4>
              <p className="text-[10px] text-gray-500">
                {riwayat.tanggal}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs font-bold text-gray-800">
                Rp {riwayat.harga.toLocaleString("id-ID")}
              </div>
              <button
                onClick={() => hapusRiwayat(riwayat.id)}
                className="text-red-500 text-base leading-none active:scale-95 transition-transform"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LegacyHiddenPriceContent;
