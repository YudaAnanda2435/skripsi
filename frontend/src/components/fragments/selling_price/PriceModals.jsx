const UpdatePriceModal = ({
  inputHargaBaru,
  setInputHargaBaru,
  setIsModalUpdateBuka,
  simpanHargaBaru,
  varietasTerpilih,
}) => (
  <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-bold text-gray-800">
          Perbarui Harga
        </h2>
        <button
          onClick={() => setIsModalUpdateBuka(false)}
          className="text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-600">Varietas:</p>
        <h3 className="font-bold text-gray-800 text-lg">
          {varietasTerpilih.varietas}
        </h3>
      </div>
      <form onSubmit={simpanHargaBaru} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500">
            Harga Baru (Rp/Kg)
          </label>
          <input
            required
            type="number"
            value={inputHargaBaru}
            onChange={(e) => setInputHargaBaru(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary font-bold"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 py-3 bg-primary text-white font-bold rounded-xl shadow-md"
        >
          Simpan Harga
        </button>
      </form>
    </div>
  </div>
);

const AddVarietyModal = ({
  formVarietas,
  setIsModalTambahBuka,
  simpanVarietasBaru,
  tanganiInputVarietas,
}) => (
  <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-bold text-gray-800">
          Tambah Varietas
        </h2>
        <button
          onClick={() => setIsModalTambahBuka(false)}
          className="text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
      <form onSubmit={simpanVarietasBaru} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500">
            Nama Varietas
          </label>
          <input
            required
            type="text"
            name="nama"
            value={formVarietas.nama}
            onChange={tanganiInputVarietas}
            placeholder="Misal: Cabai Merah Besar"
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500">
            Harga Awal (Rp/Kg)
          </label>
          <input
            required
            type="number"
            name="hargaAwal"
            value={formVarietas.hargaAwal}
            onChange={tanganiInputVarietas}
            placeholder="Contoh: 35000"
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-primary text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 py-3 bg-primary text-white font-bold rounded-xl shadow-md"
        >
          Simpan Varietas
        </button>
      </form>
    </div>
  </div>
);

export { AddVarietyModal, UpdatePriceModal };
