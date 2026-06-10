import { Check } from "lucide-react";
import { stepperScan } from "./scanTonaseConstants";

const ScanStepper = ({ langkahVisual }) => (
  <div className="mb-7 rounded-xl bg-white py-5 shadow-[0_4px_24px_rgba(23,61,45,0.04)] ">
    <div className="grid w-full grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto] items-start gap-x-2 md:gap-x-4">
      {stepperScan.map((step, index) => {
        const isDone = langkahVisual > step.id;
        const isActive = langkahVisual === step.id;
        const circleClass = [
          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold",
          isDone
            ? "bg-[#002719] text-white"
            : isActive
              ? "border-2 border-[#173d2d] bg-[#b3f1c5] text-[#173d2d]"
              : "bg-[#e5e2da] text-gray-500",
        ].join(" ");
        const labelClass = [
          "mt-2 block max-w-[92px] text-[11px] font-extrabold leading-4 md:max-w-none md:text-xs",
          isActive ? "text-[#173d2d]" : "text-gray-500",
        ].join(" ");

        return (
          <div
            key={step.id}
            className="contents"
          >
            <div className="flex flex-col items-center text-center">
              <div className={circleClass}>
                {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : step.id}
              </div>
              <span className={labelClass}>{step.label}</span>
            </div>
            {index < stepperScan.length - 1 && (
              <div className="mt-4 h-0.5 w-full bg-[#c1c8c2]" />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export default ScanStepper;
