import { useEffect } from "react";
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/layouts/navbar";
import Hero from "../components/fragments/hero";
import Problem from "../components/fragments/problem";
import Features from "../components/fragments/features";
import HowItWorks from "../components/fragments/howItWorks";
import Technology from "../components/fragments/technology";
import Limitations from "../components/fragments/limitations";
import SystemPreview from "../components/fragments/systemPreview";
import FAQ from "../components/fragments/faq";
import CTA from "../components/fragments/cta";
// import AiChat from "../components/fragments/aiChat";
import Footer from "../components/fragments/footer";
import ButtonUp from "../components/fragments/buttonUp";

const landingSections = [
  {
    id: "hero",
    element: <Hero />,
    aos: "fade-down",
    duration: 900,
    delay: 0,
    anchorPlacement: "top-bottom",
  },
  {
    id: "problem",
    element: <Problem />,
    aos: "fade-right",
    duration: 850,
    delay: 80,
    anchorPlacement: "top-center",
  },
  {
    id: "features",
    element: <Features />,
    aos: "fade-up",
    duration: 850,
    delay: 120,
    anchorPlacement: "top-center",
  },
  {
    id: "how-it-works",
    element: <HowItWorks />,
    aos: "fade-up",
    duration: 850,
    delay: 80,
    anchorPlacement: "top-center",
  },
  {
    id: "technology",
    element: <Technology />,
    aos: "zoom-in-up",
    duration: 900,
    delay: 120,
    anchorPlacement: "top-center",
  },
  {
    id: "limitations",
    element: <Limitations />,
    aos: "fade-up",
    duration: 850,
    delay: 80,
    anchorPlacement: "top-center",
  },
  {
    id: "system-preview",
    element: <SystemPreview />,
    aos: "zoom-in",
    duration: 900,
    delay: 120,
    anchorPlacement: "top-center",
  },
  {
    id: "faq",
    element: <FAQ />,
    aos: "fade-up",
    duration: 800,
    delay: 60,
    anchorPlacement: "top-center",
  },
  {
    id: "cta",
    element: <CTA />,
    aos: "zoom-in-up",
    duration: 850,
    delay: 80,
    anchorPlacement: "top-bottom",
  },
];

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
    AOS.refresh();

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    let lenis = null;
    let frameId = null;

    const stopLenis = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    const startLenis = () => {
      if (!mediaQuery.matches || lenis) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    const handleMediaChange = () => {
      if (mediaQuery.matches) startLenis();
      else stopLenis();
    };

    startLenis();
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      stopLenis();
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow mt-20 bg-lp-bg min-h-screen">
        {landingSections.map(
          ({ id, element, aos, duration, delay, anchorPlacement }) => (
            <section
              key={id}
              data-aos={aos}
              data-aos-duration={duration}
              data-aos-delay={delay}
              data-aos-anchor-placement={anchorPlacement}
            >
              {element}
            </section>
          ),
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Components */}
      {/* <AiChat /> */}
      <ButtonUp />
    </>
  );
};

export default LandingPage;
