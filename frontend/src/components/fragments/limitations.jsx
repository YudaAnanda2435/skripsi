import { CircleAlert } from "lucide-react";

const Limitations = () => {
  const content = {
    title: "Batasan Sistem",
    paragraph:
      "ChiliVision adalah alat bantu (decision support system), bukan pengganti pertimbangan ahli. Akurasi hasil akhir sangat bergantung pada dua faktor kritis:",
    limitations: [
      {
        title: "Kualitas photo sampel: ",
        description:
          "Foto yang terlalu gelap, blur, atau diambil dari jarak yang terlalu jauh/dekat akan menurunkan akurasi deteksi AI.",
      },
      {
        title: "Akurasi Input Manual: ",
        description:
          "Estimasi berat rata-rata per buah dan total populasi tanaman murni bergantung pada input pengguna. Data yang salah di sini akan menghasilkan kalkulasi tonase yang meleset.",
      },
    ],
  };
  return (
    <section className="container-lp font-jakarta">
      <div className="bg-white p-8 md:p-14 rounded-3xl border border-lp-warn/30 flex flex-col md:flex-row gap-8 items-start">
        {/* Warning Icon */}
        {/* <div className="w-16 h-16 shrink-0 rounded-2xl bg-lp-warn text-white flex items-center justify-center mt-2">
          <span
            className="material-symbols-outlined text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            info
          </span>
        </div> */}

        {/* Content */}
        <div>
          <div className="flex items-center gap-4 justify-start pb-6">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-lp-warn text-white flex items-center justify-center mt-2">
          <CircleAlert className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-[36px] font-bold text-lp font-jakarta">
              {content.title}
            </h3>
          </div>
          <p className="text-lg text-lp/80 leading-relaxed mb-6 font-jakarta">
            {content.paragraph}
          </p>
          <ul className="list-disc pl-6 text-lg text-lp/80 flex flex-col gap-3 font-jakarta">
            {content.limitations.map((item, index) => (
              <li key={index}>
                <strong className="text-lp font-bold">{item.title}</strong>
                {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Limitations;
