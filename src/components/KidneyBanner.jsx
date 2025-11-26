import { useEffect, useRef } from "react";

const LETTERS = "KIDNEY".split("");

export default function KidneyBanner({ isKidneyTreatment }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isKidneyTreatment || !containerRef.current) return;

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
  }, [isKidneyTreatment]);

  if (!isKidneyTreatment) {
    return null;
  }

  return (
    <div ref={containerRef} className="kidney-banner-container">
      {LETTERS.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          style={{ animationDelay: `${index * 0.12}s` }}
          className="kidney-letter text-5xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl lg:text-[120px]"
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
