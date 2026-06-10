import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { MdOutlineDashboard } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { TbChartHistogram } from "react-icons/tb";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { IoIosPricetags } from "react-icons/io";
import { useConfirm } from "../ui/confirm/useConfirm";

const bottomMenuItem = [
  {
    id: "home",
    label: "Dashboard",
    to: "/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    id: "land",
    label: "Lahan",
    to: "/lahan",
    icon: PiFlowerTulipDuotone,
  },
  {
    id: "scanning",
    label: "Scan Panen",
    to: "/scan-tonase",
    icon: IoCameraOutline,
  },
  {
    id: "save",
    label: "Bukti Analisa",
    to: "/bukti-analisa",
    icon: TbChartHistogram,
  },
  {
    id: "price",
    label: "Harga",
    to: "/harga-jual",
    icon: IoIosPricetags,
  },
  {
    id: "profil",
    label: "Profil Saya",
    to: "/profil",
    icon: CiUser,
  },
];

const isMenuItemActive = (pathname, item) => {
  if (item.to === "/dashboard") return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
};

let lastActiveIndicatorPosition = null;

const getIndicatorPosition = (indicator) => {
  if (!indicator) return null;

  const y = Number(gsap.getProperty(indicator, "y")) || 0;
  const height =
    Number(gsap.getProperty(indicator, "height")) ||
    indicator.offsetHeight ||
    0;

  if (!height) return null;

  return { y, height };
};

const BottomMenu = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const confirm = useConfirm();
  const menuRef = useRef(null);
  const activeIndicatorRef = useRef(null);
  const itemRefs = useRef({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const captureActiveIndicatorPosition = useCallback(() => {
    const currentPosition = getIndicatorPosition(activeIndicatorRef.current);

    if (currentPosition) {
      lastActiveIndicatorPosition = currentPosition;
    }
  }, []);

  const activeItem = useMemo(
    () =>
      bottomMenuItem.find((item) => isMenuItemActive(location.pathname, item)),
    [location.pathname],
  );


  const setMobileDrawerOpen = useCallback((isOpen) => {
    setMobileMenuOpen(isOpen);
    window.dispatchEvent(
      new CustomEvent("chilivision:mobile-menu-state", { detail: { isOpen } }),
    );
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setMobileDrawerOpen(false);
    };
    const handleToggleRequest = (event) => {
      setMobileDrawerOpen(Boolean(event.detail?.isOpen));
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("chilivision:mobile-menu-toggle", handleToggleRequest);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("chilivision:mobile-menu-toggle", handleToggleRequest);
    };
  }, [setMobileDrawerOpen]);

  useLayoutEffect(() => {
    const activeElement = activeItem ? itemRefs.current[activeItem.id] : null;
    const indicator = activeIndicatorRef.current;

    if (!activeElement || !indicator) return;

    const animateIndicator = () => {
      const currentPosition = getIndicatorPosition(indicator);

      if (currentPosition) {
        lastActiveIndicatorPosition = currentPosition;
      }

      gsap.killTweensOf(indicator);

      const nextPosition = {
        y: activeElement.offsetTop,
        height: activeElement.offsetHeight,
      };

      if (!lastActiveIndicatorPosition) {
        gsap.set(indicator, {
          ...nextPosition,
          autoAlpha: 1,
        });
        lastActiveIndicatorPosition = nextPosition;
        return;
      }

      const startPosition = lastActiveIndicatorPosition || nextPosition;

      gsap.fromTo(indicator, {
        y: startPosition.y,
        height: startPosition.height,
        autoAlpha: 1,
      }, {
        ...nextPosition,
        autoAlpha: 1,
        duration: 0.42,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          lastActiveIndicatorPosition = getIndicatorPosition(indicator) || nextPosition;
        },
        onComplete: () => {
          lastActiveIndicatorPosition = nextPosition;
        },
      });
    };

    animateIndicator();
    window.addEventListener("resize", animateIndicator);

    return () => {
      captureActiveIndicatorPosition();
      window.removeEventListener("resize", animateIndicator);
    };
  }, [activeItem, captureActiveIndicatorPosition, mobileMenuOpen]);

  const handleLogout = async () => {
    const ok = await confirm("Anda akan keluar dari sesi ini.", {
      title: "Keluar Aplikasi?",
      confirmLabel: "Ya, Keluar",
      cancelLabel: "Batal",
      color: "neutral",
    });
    if (!ok) return;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };

  return (
    <>
      <button
        type="button"
        aria-label="Tutup menu"
        onClick={() => setMobileDrawerOpen(false)}
        className={`fixed inset-0 z-[55] bg-black/35 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <section
        className={`${className || ""} sections fixed left-0 top-0 z-[60] h-[100dvh] w-72 max-w-[86vw] shrink-0 transition-transform duration-300 ease-out md:relative md:inset-auto md:z-auto md:h-screen md:w-64 md:max-w-64 md:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul
          ref={menuRef}
          className="relative flex h-full min-h-[100dvh] w-full flex-col items-stretch justify-start gap-2 overflow-hidden rounded-r-3xl bg-lp py-6 pl-5 pr-0 shadow-2xl md:rounded-none md:shadow-none"
        >
          <div
            ref={activeIndicatorRef}
            className="bottom-menu-active-indicator pointer-events-none absolute top-0 z-0 block opacity-0"
          />

          <div className="relative z-10 mb-6 flex w-full cursor-pointer flex-row items-center justify-start gap-3 pl-12 pr-5 md:pl-2">
            <h2 className="text-2xl font-bold text-white no-underline">
              ChiliVision
            </h2>
          </div>

          {bottomMenuItem.map((item) => (
            <li
              ref={(node) => {
                itemRefs.current[item.id] = node;
              }}
              className="relative z-10 block w-full"
              key={item.id}
            >
              <NavLink
                to={item.to}
                end={item.to === "/dashboard"}
                title={item.label}
                onPointerDown={captureActiveIndicatorPosition}
                onClick={() => setMobileDrawerOpen(false)}
                className={({ isActive }) =>
                  `group flex h-16 w-full items-center justify-start gap-4 rounded-l-full rounded-r-none pl-4 pr-0 text-white/70 transition-colors duration-300
                  ${isActive ? "bg-transparent" : "hover:bg-white/10 md:hover:bg-transparent"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={24}
                      className={`shrink-0 transition-transform duration-300 ${isActive ? "scale-105 text-black" : "group-hover:scale-105"}`}
                    />
                    <span
                      className={`block text-base font-bold ${isActive ? "text-black" : ""}`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}

          <li className="relative z-10 mt-auto w-full pb-4">
            <button
              onClick={handleLogout}
              className="group flex w-full cursor-pointer items-center justify-start gap-4 rounded-l-full bg-white/12 px-4 py-2 text-white transition-colors hover:bg-white/10"
              title="Keluar"
            >
              <div className="flex h-10 w-10 items-center justify-center text-white transition-colors">
                <svg
                  className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">Keluar</span>
            </button>
          </li>
        </ul>
      </section>
    </>
  );
};

export default BottomMenu;




