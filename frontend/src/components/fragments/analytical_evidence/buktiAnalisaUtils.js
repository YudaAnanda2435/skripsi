export const VISUAL_SAMPLES = [
  { id: "lebat", label: "Lebat", color: "#316947", conf: 98 },
  { id: "sedang", label: "Sedang", color: "#f59e0b", conf: 94 },
  { id: "kurang", label: "Kurang", color: "#ea580c", conf: 91 },
];

export const PDF_SAMPLES = [
  { id: "lebat", label: "Kondisi Lebat", color: [49, 105, 71], confidence: 98 },
  { id: "sedang", label: "Kondisi Sedang", color: [245, 158, 11], confidence: 94 },
  { id: "kurang", label: "Kondisi Kurang", color: [234, 88, 12], confidence: 91 },
];

export const formatRupiah = (nilai) => Number(nilai || 0).toLocaleString("id-ID");

const formatTanggalAnalisa = (tanggal) =>
  new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const formatWaktuAnalisa = (tanggal) =>
  new Date(tanggal).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const normalisasiBuktiAnalisa = (item) => ({
  id: item.id,
  lahan: item.lahan ? item.lahan.nama_lahan : `Lahan ID ${item.lahan_id}`,
  tanggal: formatTanggalAnalisa(item.tanggal),
  waktu: formatWaktuAnalisa(item.tanggal),
  populasi: item.lahan ? item.lahan.populasi_pohon : 0,
  estimasiTonase: item.estimasi_tonase,
  cabaiTerdeteksi: item.total_cabai,
  potensiPendapatan: item.potensi_pendapatan,
  parameter: {
    lebat: item.persentase_lebat,
    sedang: item.persentase_sedang,
    kurang: item.persentase_kurang,
    beratRata: item.berat_rata_rata,
  },
  foto: {
    lebat: item.foto_lebat || null,
    sedang: item.foto_sedang || null,
    kurang: item.foto_kurang || null,
  },
});
