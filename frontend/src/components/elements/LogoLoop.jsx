import Marquee from "react-fast-marquee";

/**
 * LogoLoop — infinite marquee dengan fade gradient halus di tepi
 * Menggunakan mask-image CSS (bukan gradient bawaan react-fast-marquee)
 * agar fade lebih smooth dan tidak kontras
 */
const LogoLoop = ({
  items = [],
  speed = 50,
  direction = "left",
  fadeWidth = 80,
}) => {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        WebkitMaskImage: `linear-gradient(
          to right,
          transparent 0%,
          rgba(0,0,0,0.3) 5%,
          rgba(0,0,0,0.7) 10%,
          black 18%,
          black 82%,
          rgba(0,0,0,0.7) 90%,
          rgba(0,0,0,0.3) 95%,
          transparent 100%
        )`,
        maskImage: `linear-gradient(
          to right,
          transparent 0%,
          rgba(0,0,0,0.3) 5%,
          rgba(0,0,0,0.7) 10%,
          black 18%,
          black 82%,
          rgba(0,0,0,0.7) 90%,
          rgba(0,0,0,0.3) 95%,
          transparent 100%
        )`,
      }}
    >
      <Marquee
        speed={speed}
        direction={direction}
        gradient={false}
        pauseOnHover
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center px-4 py-2.5 rounded-xl mx-2"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.11)",
              backdropFilter: "blur(8px)",
              minWidth: "90px",
            }}
          >
            {item.icon && (
              <span className="text-xl mb-0.5">{item.icon}</span>
            )}
            <span
              className="text-sm font-bold whitespace-nowrap"
              style={{ color: "#7ce2a1" }}
            >
              {item.label}
            </span>
            {item.sub && (
              <span
                className="text-[10px] mt-0.5 whitespace-nowrap"
                style={{ color: "rgba(200,230,215,0.6)" }}
              >
                {item.sub}
              </span>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoLoop;
