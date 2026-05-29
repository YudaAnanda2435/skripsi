import { useState } from "react";

const faqs = [
  {
    q: "Apakah saya perlu membuat akun untuk mulai estimasi?",
    a: "Ya, Anda diharuskan untuk login atau membuat akun terlebih dahulu. Hal ini sangat diperlukan agar sistem dapat menyimpan profil spesifik lahan Anda (populasi, jarak tanam), menyimpan riwayat estimasi dari waktu ke waktu, dan memastikan data Anda aman serta dapat diakses kembali.",
  },
  {
    q: "Seberapa akurat prediksi hasil panennya?",
    a: "Akurasi deteksi model YOLOv8 kami rata-rata mencapai 90-95% untuk buah yang terlihat dalam foto berkualitas baik. Namun, akurasi total estimasi tonase pada akhirnya sangat bergantung pada seberapa representatif titik sampel yang Anda ambil dan keakuratan input jumlah populasi di lahan Anda.",
  },
  {
    q: "Apakah bisa mendeteksi jenis tanaman lain selain cabai rawit?",
    a: "Saat ini, model AI ChiliVision dilatih secara eksklusif untuk mendeteksi buah cabai rawit (Capsicum frutescens). Kami fokus memberikan akurasi tertinggi untuk satu komoditas ini sebelum merambah ke varietas lain di masa depan.",
  },
  {
    q: "Apakah aplikasi ini gratis digunakan?",
    a: "Ya, aplikasi ini sepenuhnya gratis untuk digunakan. Cukup daftarkan akun Anda dan langsung mulai mengelola lahan serta melakukan estimasi panen tanpa biaya apapun.",
  },
  {
    q: "Apakah data lahan dan hasil panen saya aman?",
    a: "Seluruh data yang Anda masukkan disimpan di server yang terproteksi dan hanya dapat diakses oleh akun Anda sendiri. Kami tidak menjual atau membagikan data Anda ke pihak ketiga manapun.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="container-lp font-jakarta">
      <div className="max-w-[760px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lp mb-6 font-jakarta">
            Pertanyaan Umum
          </h2>
          <p className="text-lg text-lp-muted leading-relaxed font-jakarta">
            Jawaban untuk pertanyaan seputar penggunaan ChiliVision.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border shadow-lp-sm overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-lp-accent/40 shadow-md"
                    : "border-lp-outline hover:shadow-md"
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left cursor-pointer bg-transparent border-none"
                >
                  <span className="text-lg md:text-xl font-bold text-lp pr-4 font-jakarta">
                    {faq.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-lp-accent transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Answer - animated with grid trick */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition:
                      "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div className="px-6 pb-6">
                      <div className="border-t border-lp-outline/50 pt-4">
                        <p className="text-lp-muted text-base md:text-lg leading-relaxed font-jakarta">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
