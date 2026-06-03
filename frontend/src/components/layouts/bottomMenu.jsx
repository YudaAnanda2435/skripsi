import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
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

      if (window.innerWidth < 768) {
        gsap.set(indicator, { autoAlpha: 0 });
        return;
      }

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
  }, [activeItem, captureActiveIndicatorPosition]);

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
    <section
      className={`${className || ""} sections relative bottom-0 w-full shrink-0 md:w-64 md:max-w-64`}
    >
      <ul
        ref={menuRef}
        className="relative flex w-full flex-row items-center justify-between overflow-hidden rounded-t-3xl bg-lp px-5 py-3 shadow-2xl md:min-h-screen! md:flex-col md:items-stretch md:justify-start md:gap-2 md:rounded-none md:py-6 md:pl-5 md:pr-0 md:shadow-none"
      >
        <div
          ref={activeIndicatorRef}
          className="bottom-menu-active-indicator pointer-events-none absolute top-0 z-0 hidden opacity-0 md:block"
        />

        {/* Header Sidebar (Desktop Only) */}
        <div className="relative z-10 mb-6 hidden w-full cursor-pointer flex-row items-center justify-start gap-3 px-2 md:flex">
          <h2 className="text-2xl font-bold text-white no-underline">
            ChiliVision
          </h2>
        </div>

        {bottomMenuItem.map((item) => (
          <li
            ref={(node) => {
              itemRefs.current[item.id] = node;
            }}
            className="relative z-10 block! w-full"
            key={item.id}
          >
            <NavLink
              to={item.to}
              end={item.to === "/dashboard"}
              title={item.label}
              onPointerDown={captureActiveIndicatorPosition}
              className={({ isActive }) =>
                `group flex h-12 w-full items-center justify-center rounded-xl text-white/70 transition-colors duration-300 md:h-16 md:justify-start md:gap-4 md:rounded-l-full md:rounded-r-none md:pl-4 md:pr-0
                ${isActive ? "bg-white/12 md:bg-transparent" : "hover:bg-white/10 md:hover:bg-transparent"}`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={24}
                    className={`shrink-0  transition-transform duration-300 ${isActive ? " text-black scale-105" : "group-hover:scale-105"}`}
                  />
                  <span
                    className={`hidden text-sm font-bold  md:block md:text-base ${isActive ? "text-black" : ""}`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}

        {/* Logout (Desktop Only) */}
        <li className="relative z-10 mt-auto hidden w-full pb-4 md:block">
          <button
            onClick={handleLogout}
            className="group bg-white/12 flex w-full cursor-pointer items-center justify-start gap-4 rounded-l-full px-4 py-2 text-white transition-colors hover:bg-white/10"
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
  );
};

export default BottomMenu;
