import farmPlaceholder from "../../../assets/img/dashboard/farm-placeholder.png";

export const formatAngka = (nilai) =>
  Number(nilai || 0).toLocaleString("id-ID", { maximumFractionDigits: 2 });

export const dapatkanStatusLahan = (lahan) => {
  const status = (lahan.status || "").toLowerCase();

  if (status.includes("sudah") || status.includes("selesai")) {
    return {
      id: "selesai",
      label: "Selesai",
      className: "border-gray-200 bg-gray-100 text-gray-600",
    };
  }

  if (status.includes("akan") || status.includes("pra")) {
    return {
      id: "akan-panen",
      label: "Akan Panen",
      className: "border-[#ffecb3] bg-[#fff8e1] text-[#f57f17]",
    };
  }

  return {
    id: "aktif",
    label: "Aktif",
    className: "border-green-200 bg-green-50 text-green-700",
  };
};

export const normalisasiSrcGambar = (src) => {
  if (!src) return farmPlaceholder;
  return src.startsWith("data:image") ? src : `data:image/jpeg;base64,${src}`;
};

export const kompresGambarBase64 = (base64Str, maxWidth = 600) => {
  return new Promise((resolve) => {
    if (!base64Str) return resolve(null);

    const img = new Image();
    img.src = base64Str.startsWith("data:image")
      ? base64Str
      : `data:image/jpeg;base64,${base64Str}`;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const rasio = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * rasio;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const hasilKompres = canvas.toDataURL("image/jpeg", 0.6);
      resolve(hasilKompres.split(",")[1]);
    };

    img.onerror = () => resolve(null);
  });
};
