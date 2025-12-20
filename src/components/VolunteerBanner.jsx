import React, { useEffect, useRef } from "react";
import Hand1 from "../assets/Photo/hand1.png";
import Hand2 from "../assets/Photo/Hand2.png";
import People3 from "../assets/Photo/pepole3.png";
import RectangleBlue1 from "../assets/Photo/rectangleblue1.png";
import RectangleBlue2 from "../assets/Photo/rectangleblue2.png";
import VolunteerBg from "../assets/Photo/valunteerBg.png";

export function JoinUsText({ className = "" }) {
  const ref = useRef(null);
  const text = "JOIN US";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate");
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`joinus flex gap-2 font-neue-machina ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${i * 120}ms`,
            textShadow: "6px 0px 0px #080808",
          }}
          className="inline-block opacity-0 animate-[bounceDrop_1.2s_ease-out_forwards] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight cursor-pointer select-none hover:-translate-y-3 hover:scale-110 hover:text-[#7CB342] transition-all duration-300 drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)] [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:2px_black]"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default function VolunteerBanner() {
  const textContainerClassName =
    "mx-auto w-full max-w-[560px] items-center text-center lg:mx-0 lg:ml-auto lg:max-w-[960px] lg:items-end lg:text-right lg:pr-10";
  const bodyTextClassName = "mx-auto lg:ml-auto";
  const taglineClassName = "whitespace-nowrap mx-auto lg:ml-auto";

  return (
    <section
      className="relative w-full py-12 pb-20 flex justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${VolunteerBg})` }}
    >
      <div className="absolute inset-0" aria-hidden="true" />
      <div className="relative w-[92%] max-w-[1400px]">
        {/* MAIN CARD */}
        <div className="relative rounded-[28px] overflow-hidden ">
          {/* ANGLED TOP EDGE */}
          <div />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[420px_1fr_420px] gap-10">
            {/* LEFT COLLAGE */}
            <div className="relative mx-auto w-full max-w-[520px] px-4 pt-6 pb-6 sm:px-6 sm:pt-8 lg:mx-0 lg:max-w-none lg:px-10 lg:pt-14 lg:pb-14">
              <div className="relative h-[280px] sm:h-[320px] lg:h-[420px]">
                <img
                  src={RectangleBlue1}
                  alt=""
                  className="absolute left-0 top-[80px] w-[280px] sm:top-[90px] sm:w-[320px] lg:top-[110px] lg:w-[360px] select-none pointer-events-none"
                />

                <img
                  src={Hand1}
                  alt=""
                  className="absolute left-2 top-4 w-[170px] sm:left-3 sm:top-6 sm:w-[200px] lg:left-3 lg:top-10 lg:w-[230px] rounded-[22px] object-cover"
                />

                <img
                  src={Hand2}
                  alt=""
                  className="absolute left-[130px] top-6 w-[190px] sm:left-[170px] sm:top-6 sm:w-[220px] lg:left-[250px] lg:top-10 lg:w-[260px] rounded-[22px] object-cover"
                />

                <div className="absolute left-0 top-[170px] w-[300px] sm:left-2 sm:top-[200px] sm:w-[340px] lg:left-4 lg:top-[270px] lg:w-[390px]">
                  <img
                    src={RectangleBlue2}
                    alt=""
                    className="w-full select-none pointer-events-none"
                  />
                  <img
                    src={People3}
                    alt=""
                    className="absolute left-6 top-3 w-[140px] sm:left-12 sm:top-4 sm:w-[160px] lg:left-20 lg:top-4 lg:w-[190px] rounded-[18px] object-cover"
                  />
                </div>
              </div>

              <JoinUsText className="mt-6 justify-center sm:mt-10 lg:mt-30 lg:justify-start" />
            </div>

            {/* CENTER CONTENT */}
            <div
              className={`px-4 sm:px-6 lg:px-35 py-10 sm:py-12 lg:py-16 flex flex-col justify-center ${textContainerClassName}`}
            >
              <h2 className="flex items-baseline justify-center gap-3 leading-none whitespace-nowrap lg:justify-end">
                <span className="font-extrabold text-black text-[clamp(1.25rem,4.5vw,3rem)]">
                  BECOME OUR
                </span>
                <span className="font-black text-[#7BCF2A] text-[clamp(1.5rem,5.5vw,3.75rem)]">
                  VOLUNTEER
                </span>
              </h2>

              <p
                className={`mt-4 sm:mt-6 text-base sm:text-lg lg:text-2xl text-black/80 leading-relaxed max-w-[40ch] ${bodyTextClassName}`}
              >
                Fighting cancer the natural way — through{" "}
                <span className="text-[#7BCF2A] font-semibold">
                  Natural Immunotherapy
                </span>{" "}
                that rebuilds your body’s defense and restores lasting health.
              </p>

              <p
                className={`mt-4 sm:mt-6 text-lg sm:text-2xl lg:text-4xl font-semibold text-[#2F5BD7] ${taglineClassName}`}
              >
                we are looking for the best people!
              </p>
            </div>

            {/* RIGHT IMAGE (ONLY PLACE VolunteerBg IS USED) */}
            <div className="hidden lg:block relative min-h-[520px] overflow-hidden" />
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="mt-6 flex justify-center lg:mt-0 lg:absolute lg:top-[520px] lg:right-1 lg:-translate-x-1/2">
          <button
            type="button"
            className="cursor-pointer bg-[#F26522] hover:bg-[#e0561f] transition text-white text-lg sm:text-xl lg:text-2xl font-semibold px-10 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-[20px] shadow-2xl"
          >
            BECOME OUR VOLUNTEER
          </button>
        </div>
      </div>
    </section>
  );
}
