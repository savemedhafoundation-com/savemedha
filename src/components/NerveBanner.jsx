import { useEffect, useRef } from "react";
import nerveBannerImg from "../assets/Photo/nerve (1).png";

export default function NerveBanner({ isNerveTreatment }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isNerveTreatment || !containerRef.current) return;

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
  }, [isNerveTreatment]);

  if (!isNerveTreatment) {
    return null;
  }

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <img
        src={nerveBannerImg}
        alt="Nerve banner"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-" />

      <div
        ref={containerRef}
        className="relative z-10 flex flex-col items-center gap-2 px-4 text-center nerve-banner-container"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <span className="nerve-banner-title" aria-label="Nerve">
            NERVE
          </span>
        </div>

       
      </div>
    </div>
  );
}
