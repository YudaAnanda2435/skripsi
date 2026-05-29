import { Check } from "lucide-react";
import { stepperScan } from "./scanTonaseConstants";

const ScanStepper = ({ langkahVisual }) => (
  <div className="mb-7 rounded-xl bg-white px-4 py-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)] md:px-8">
    <div className="relative grid grid-cols-4 items-start gap-2">
      <div className="absolute left-[9%] right-[9%] top-4 h-0.5 bg-[#c1c8c2]" />
      {stepperScan.map((step) => {
        const isDone = langkahVisual > step.id;
        const isActive = langkahVisual === step.id;

        return (
          <div
            key={step.id}
            className="relative z-10 w-fit justify-between flex flex-col items-center gap-2 bg-white px-1 text-center"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${
                isDone
                  ? "bg-[#002719] text-white"
                  : isActive
                    ? "border-2 border-[#173d2d] bg-[#b3f1c5] text-[#173d2d]"
                    : "bg-[#e5e2da] text-gray-500"
              }`}
            >
              {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : step.id}
            </div>
            <span
              className={`text-[11px] font-extrabold leading-4 md:text-xs ${
                isActive ? "text-[#173d2d]" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default ScanStepper;
