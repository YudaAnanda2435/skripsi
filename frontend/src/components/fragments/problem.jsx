const problemCards = [
  {
    icon: "visibility_off",
    iconBg: "bg-lp-error/10",
    iconColor: "text-lp-error",
    title: "Estimasi Visual Tidak Akurat",
    description:
      "Menebak hasil panen hanya dengan melihat seringkali meleset jauh, menyebabkan kesalahan fatal dalam perencanaan logistik dan pemasaran.",
  },
  {
    icon: "trending_down",
    iconBg: "bg-lp-warn/10",
    iconColor: "text-lp-warn",
    title: "Kelemahan Sistem Tebasan",
    description:
      "Kurangnya data akurat membuat petani kehilangan daya tawar, seringkali terpaksa menjual dengan harga lebih rendah dari nilai sebenarnya ke tengkulak.",
  },
  {
    icon: "analytics",
    iconBg: "bg-lp/10",
    iconColor: "text-lp",
    title: "Tidak Ada Standar Data",
    description:
      "Kesulitan dalam melacak histori produktivitas lahan secara berkala, menghambat evaluasi dan perbaikan metode budidaya untuk musim tanam berikutnya.",
  },
];

const Problem = () => {
  return (
    <section id="masalah" className="bg-white border-y border-lp-outline">
      <div className="container-lp font-jakarta">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lp mb-6 font-jakarta">
            Tantangan Petani Cabai Indonesia
          </h2>
          <p className="text-lg text-lp-muted leading-relaxed font-jakarta">
            Pendekatan tradisional dalam mengestimasi hasil panen seringkali
            tidak cukup akurat untuk persaingan dan dinamika pasar modern.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problemCards.map((card, index) => (
            <div
              key={index}
              className="bg-lp-bg p-8 md:p-10 rounded-3xl border border-lp-outline flex flex-col gap-6 transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center`}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {card.icon}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xl font-bold text-lp mb-3 font-jakarta">
                  {card.title}
                </h3>
                <p className="text-lp-muted leading-relaxed font-jakarta text-base">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
