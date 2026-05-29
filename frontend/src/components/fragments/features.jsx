const featureCards = [
  {
    icon: "query_stats",
    iconBg: "bg-lp/10",
    iconColor: "text-lp",
    title: "Estimasi Tonase AI",
    description:
      "Model YOLOv8 mendeteksi buah cabai dalam gambar dengan akurasi tinggi untuk memprediksi total tonase secara objektif, menyingkirkan bias estimasi manual.",
  },
  {
    icon: "center_focus_strong",
    iconBg: "bg-lp-accent/20",
    iconColor: "text-lp",
    title: "Digital Sampling",
    description:
      "Ganti metode tebakan acak dengan sampling foto representatif dari bedengan tertentu untuk hasil ekstrapolasi yang jauh lebih akurat dan terukur secara statistik.",
  },
  {
    icon: "nature_people",
    iconBg: "bg-lp/10",
    iconColor: "text-lp",
    title: "Manajemen Lahan",
    description:
      "Simpan profil setiap petak lahan, populasi tanaman aktual, dan jarak tanam untuk menyempurnakan kalkulasi estimasi sistem sesuai kondisi spesifik kebun Anda.",
  },
  {
    icon: "history",
    iconBg: "bg-lp-warn/10",
    iconColor: "text-lp-warn",
    title: "Histori & Evaluasi",
    description:
      "Catat dan bandingkan hasil estimasi dengan hasil panen aktual secara historis untuk mengevaluasi efektivitas teknik budidaya dari musim ke musim.",
  },
];

const Features = () => {
  return (
    <section id="fitur" className="container-lp font-jakarta">
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-lp mb-6 font-jakarta">
          Fitur Utama ChiliVision
        </h2>
        <p className="text-lg text-lp-muted leading-relaxed font-jakarta">
          Solusi digital menyeluruh yang dirancang khusus untuk manajemen panen
          cabai rawit berbasis presisi.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {featureCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-8 md:p-10 rounded-3xl border border-lp-outline shadow-lp-sm relative overflow-hidden group"
          >
            {/* Login Badge */}
            <div className="absolute top-6 right-6 bg-lp-bg text-lp-muted text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-lp-outline">
              Setelah login
            </div>

            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center mb-8`}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {card.icon}
              </span>
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold text-lp mb-4 font-jakarta">
              {card.title}
            </h3>
            <p className="text-lp-muted leading-relaxed text-lg font-jakarta">
              {card.description}
            </p>
          </div>
        ))}

        {/* Full-width AgroBot Card */}
        <div className="md:col-span-2 bg-lp p-8 md:p-10 rounded-3xl border border-lp shadow-lp-soft relative overflow-hidden">
          {/* Login Badge */}
          <div className="absolute top-6 right-6 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide backdrop-blur-sm border border-white/10">
            Setelah login
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Icon */}
            <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/10 text-white flex items-center justify-center">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-jakarta">
                AgroBot Assistant
              </h3>
              <p className="text-white/80 leading-relaxed text-lg max-w-3xl font-jakarta">
                Asisten AI interaktif yang siap membantu Anda kapan saja.
                Dapatkan panduan instan terkait cara pengambilan foto yang ideal
                untuk hasil deteksi terbaik, dan bantuan navigasi penggunaan
                seluruh fitur aplikasi ChiliVision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
