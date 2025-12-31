import React, { useEffect, useRef, useState } from "react";
import Hand1 from "../assets/Photo/hand1.png";
import Hand2 from "../assets/Photo/Hand2.png";
import People3 from "../assets/Photo/pepole3.png";
import RectangleBlue1 from "../assets/Photo/rectangleblue1.png";
import RectangleBlue2 from "../assets/Photo/rectangleblue2.png";
import VolunteerBg from "../assets/Photo/Group.png";

export function JoinUsText({ className = "", variant = "default" }) {
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

  const isMobileVariant = variant === "mobile";

  const containerClassName = `joinus flex font-neue-machina ${
    isMobileVariant ? "gap-[2px]" : "gap-2"
  } ${className}`;

  const spanClassName = isMobileVariant
    ? "inline-block opacity-0 animate-[bounceDrop_1.2s_ease-out_forwards] text-[#2F5BD7] text-[42px] font-black uppercase tracking-tight select-none [-webkit-text-stroke:2px_white]"
    : "inline-block opacity-0 animate-[bounceDrop_1.2s_ease-out_forwards] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight cursor-pointer select-none hover:-translate-y-3 hover:scale-110 hover:text-[#7CB342] transition-all duration-300 [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:2px_black]";

  return (
    <div ref={ref} className={containerClassName}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${i * 120}ms`,
            textShadow: isMobileVariant
              ? "0px 6px 0px #7CB342"
              : "6px 0px 0px #7CB342",
          }}
          className={spanClassName}
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

  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!isVolunteerModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsVolunteerModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    nameInputRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVolunteerModalOpen]);

  const closeModal = () => setIsVolunteerModalOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVolunteerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Thank you! We will contact you soon.");
    setVolunteerForm({ name: "", phone: "" });
  };

	  return (
	    <section
	      className="relative w-full pt-8 pb-20 flex justify-center bg-cover bg-right bg-no-repeat -mb-16 z-10 [clip-path:polygon(0_0,0_calc(100%-56px),50%_100%,100%_calc(100%-56px),100%_0)] sm:pt-12 sm:mb-0 sm:z-auto sm:[clip-path:none] sm:bg-center sm:w-[calc(100%+3rem)] sm:-mx-6 md:w-[calc(100%+10rem)] md:-mx-20"
	      style={{ backgroundImage: `url(${VolunteerBg})` }}
	    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-transparent pointer-events-none sm:hidden"
        aria-hidden="true"
      />
      <div className="relative w-[92%] max-w-[1400px]">
        {/* Mobile layout (matches screenshot) */}
        <div className="sm:hidden mx-auto w-full max-w-[420px] overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/10">
          {/* Top background with Join Us */}
          <div className="relative h-[140px]">
            <img
              src={VolunteerBg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-right scale-[1.15]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute left-6 top-5 h-10 w-10 opacity-60 bg-[radial-gradient(#74C425_1px,transparent_1px)] [background-size:6px_6px]"
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full items-center justify-center pt-2">
              <JoinUsText variant="mobile" className="justify-center leading-none" />
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white"
              aria-hidden="true"
            />
          </div>

          {/* Middle content */}
          <div className="px-6 pt-2 pb-6 text-center">
            <div className="relative mx-auto mt-2 h-[230px] w-full max-w-[340px]">
              <img
                src={RectangleBlue1}
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-[58px] w-[260px] select-none pointer-events-none"
              />
              <img
                src={Hand1}
                alt=""
                className="absolute left-3 top-2 w-[150px] rounded-[18px] object-cover"
              />
              <img
                src={Hand2}
                alt=""
                className="absolute right-2 top-8 w-[160px] rounded-[18px] object-cover"
              />

              <div className="absolute left-1/2 top-[140px] w-[250px] -translate-x-1/2">
                <img
                  src={RectangleBlue2}
                  alt=""
                  aria-hidden="true"
                  className="w-full select-none pointer-events-none"
                />
                <img
                  src={People3}
                  alt=""
                  className="absolute left-1/2 top-3 w-[120px] -translate-x-1/2 rounded-[18px] object-cover"
                />
              </div>
            </div>

            <h3 className="mt-3 text-[22px] translate-y-12 translate-x-2 font-extrabold uppercase tracking-wide text-slate-900">
              BECOME OUR
            </h3>
            <h4 className="text-[22px] font-black translate-x-1 translate-y-10 uppercase tracking-wide text-[#7BCF2A]">
              VOLUNTEER
            </h4>
           
            <p className="mt-10 text-[14px] leading-relaxed text-slate-700">
              Fighting cancer the natural way   through{" "}
              <span className="font-semibold text-[#7BCF2A]">
                Natural Immunotherapy
              </span>{" "}
              that rebuilds your body’s defense and restores lasting health.
            </p>

            <p className="mt-4 text-[18px] font-semibold text-[#2F5BD7]">
              we are looking for the best people!
            </p>
          </div>

          {/* Bottom background + CTA */}
          <div className="relative h-[190px]">
            <img
              src={VolunteerBg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
              aria-hidden="true"
            />
            <div
              className="absolute top-0 left-0 right-0 h-14 bg-white [clip-path:polygon(0_0,100%_0,100%_60%,50%_100%,0_60%)]"
              aria-hidden="true"
            />

            <div className="relative z-10 flex h-full items-end justify-center px-6 pb-10">
              <button
                type="button"
                onClick={() => {
                  setStatus("");
                  setIsVolunteerModalOpen(true);
                }}
                className="cursor-pointer bg-[#F26522] hover:bg-[#1118A6] transition text-white text-[16px] font-semibold px-10 py-4 rounded-[18px] shadow-md"
              >
                BECOME OUR VOLUNTEER
              </button>
            </div>
          </div>
        </div>

        {/* Desktop layout (unchanged) */}
        <div className="hidden sm:block">
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
          <div className="relative z-20 mt-6 flex justify-center lg:mt-0 lg:absolute lg:top-[520px] lg:right-1 lg:-translate-x-1/2">
            <button
              type="button"
              onClick={() => {
                setStatus("");
                setIsVolunteerModalOpen(true);
              }}
              className="cursor-pointer bg-[#F26522] hover:bg-[#1118A6] transition text-white text-lg sm:text-xl lg:text-2xl font-semibold px-10 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-[20px]"
            >
              BECOME OUR VOLUNTEER
            </button>
          </div>
        </div>

        {isVolunteerModalOpen && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8"
            onClick={closeModal}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="volunteer-modal-title"
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 transition hover:bg-slate-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1118A6]"
              >
                <span className="sr-only">Close</span>
                <span aria-hidden="true" className="text-2xl leading-none">
                  ×
                </span>
              </button>

              <div className="p-6 sm:p-8">
                <h3
                  id="volunteer-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-900"
                >
                  Become Our Volunteer
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Share your details and our team will reach out.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="volunteer-name"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Full name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="volunteer-name"
                      name="name"
                      value={volunteerForm.name}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1118A6]/20"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="volunteer-phone"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Phone number
                    </label>
                    <input
                      id="volunteer-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={volunteerForm.phone}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1118A6]/20"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#74C425] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1118A6]"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>

                  {status && (
                    <p className="pt-2 text-center text-sm font-medium text-green-700">
                      {status}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
