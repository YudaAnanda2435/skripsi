import { Info } from "lucide-react";

const SellingPriceInfoNotice = () => (
  <div className="flex items-start gap-3 rounded-xl border border-[#c1c8c2]/70 bg-[#f6f3eb] p-4 text-[#414844]">
    <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#316947]" />
    <p className="text-sm leading-6">
      Harga pasar ini dipakai sistem untuk menghitung potensi
      pendapatan pada hasil estimasi panen.
    </p>
  </div>
);

export default SellingPriceInfoNotice;
