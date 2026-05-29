const Limitations = () => {
  return (
    <section className="container-lp font-jakarta">
      <div className="bg-white p-8 md:p-14 rounded-3xl border border-lp-warn/30 flex flex-col md:flex-row gap-8 items-start">
        {/* Warning Icon */}
        <div className="w-16 h-16 shrink-0 rounded-2xl bg-lp-warn text-white flex items-center justify-center mt-2">
          <span
            className="material-symbols-outlined text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            info
          </span>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-lp mb-4 font-jakarta">
            Penting untuk Diketahui (Batasan Sistem)
          </h3>
          <p className="text-lg text-lp/80 leading-relaxed mb-6 font-jakarta">
            ChiliVisiont adalah alat bantu (decision support system), bukan
            pengganti pertimbangan ahli. Akurasi hasil akhir sangat bergantung
            pada dua faktor kritis:
          </p>
          <ul className="list-disc pl-6 text-lg text-lp/80 flex flex-col gap-3 font-jakarta">
            <li>
              <strong className="text-lp font-bold">
                Kualitas Foto Sampel:
              </strong>{" "}
              Foto yang terlalu gelap, blur, atau diambil dari jarak yang
              terlalu jauh/dekat akan menurunkan akurasi deteksi AI.
            </li>
            <li>
              <strong className="text-lp font-bold">
                Akurasi Input Manual:
              </strong>{" "}
              Estimasi berat rata-rata per buah dan total populasi tanaman murni
              bergantung pada input pengguna. Data yang salah di sini akan
              menghasilkan kalkulasi tonase yang meleset.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Limitations;
