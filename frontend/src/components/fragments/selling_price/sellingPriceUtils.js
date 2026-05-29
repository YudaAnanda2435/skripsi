export const formatRupiah = (nilai) => Number(nilai || 0).toLocaleString("id-ID");

export const hitungHargaTertinggi = (daftarHarga) =>
  daftarHarga.reduce(
    (tertinggi, item) => Math.max(tertinggi, Number(item.harga || 0)),
    0,
  );

export const filterDaftarHarga = (daftarHarga, kataKunciHarga) =>
  daftarHarga.filter((item) =>
    kataKunciHarga.length === 0
      ? true
      : [item.varietas, item.tren]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(kataKunciHarga)),
  );

export const filterRiwayatHarga = (riwayatHarga, kataKunciHarga) =>
  riwayatHarga.filter((item) =>
    kataKunciHarga.length === 0
      ? true
      : [item.varietas, item.tanggal]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(kataKunciHarga)),
  );
