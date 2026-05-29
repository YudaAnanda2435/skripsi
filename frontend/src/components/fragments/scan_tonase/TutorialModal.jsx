const TutorialModal = ({ onClose }) => (
  <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">
        Cara Hitung Rata-rata
      </h2>
      <ol className="list-decimal list-inside text-sm text-gray-600 flex flex-col gap-2">
        <li>Ambil 100 butir cabai acak.</li>
        <li>Timbang cabai tersebut dalam gram.</li>
        <li>Bagi total berat dengan 100.</li>
      </ol>
      <button
        onClick={onClose}
        className="w-full mt-4 py-3 bg-gray-800 text-white font-bold rounded-xl"
      >
        Tutup
      </button>
    </div>
  </div>
);

export default TutorialModal;
