import { useEffect, useRef } from "react";
import heartBannerImg from "../assets/Photo/HEART BANNER.png";

const LETTERS = "HEART".split("");

export default function HeartBanner({ isHeartTreatment }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isHeartTreatment || !containerRef.current) return;

    const element = containerRef.current;

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("animate");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== element) return;
          if (entry.isIntersecting) {
            element.classList.add("animate");
          } else {
            element.classList.remove("animate");
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isHeartTreatment]);

  if (!isHeartTreatment) {
    return null;
  }

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden "
      aria-hidden="true"
    >
      <img
        src={heartBannerImg}
        alt="Heart banner"
        className="absolute inset-0  h-full w-full object-fill"
        loading="lazy"
      />
      <div className="absolute inset-0  via-[#8f0d2e]/65 to-[#b5173c]/55" />

      <div
        ref={containerRef}
        className="relative z-10 flex flex-col items-center gap-2 px-4 text-center heart-banner-container"
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {LETTERS.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{ animationDelay: `${index * 0.12}s` }}
              className="heart-letter text-4xl font-black uppercase tracking-[0.22em] text-white  sm:text-5xl md:text-6xl lg:text-[84px]"
            >
              {letter}
            </span>
          ))}
        </div>

        <p className="text-sm  font-semibold uppercase tracking-[0.28em] text-white/90 pt-6 sm:text-base md:text-lg text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ">
          Disease Category
        </p>
      </div>
    </div>
  );
}
