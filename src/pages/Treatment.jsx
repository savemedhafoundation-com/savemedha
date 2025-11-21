import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBanner from "../assets/Photo/banner.png";
import happyPatientImg from "../assets/Photo/wellpeople.png";
import immuneImg from "../assets/Photo/immunesystem.png";
import { motion } from "framer-motion";
import { TREATMENTS } from "../data/treatments";

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`translate-y-8 transform opacity-0 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

const TreatmentCard = ({ item, delay, onSelect }) => (
  <FadeInSection delay={delay}>
    <div
      className="treatment-card relative overflow-hidden rounded-[28px] bg-white shadow-lg"
      style={{
        "--btn-color": item.buttonColor,
        "--btn-hover-color": item.buttonHoverColor,
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-72 w-full object-cover"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-x-6 bottom-6">
        <div className="treatment-btn flex w-full flex-col gap-1 rounded-2xl px-6 py-4 text-white shadow-lg shadow-black/10">
          <span className="font-koho text-lg font-semibold uppercase tracking-wide">
            {item.title}
          </span>
          <button
            type="button"
            onClick={() => onSelect?.(item)}
            className="flex items-center gap-2 rounded-3xl bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-slate-100"
          >
            LEARN MORE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </FadeInSection>
);

export default function Treatment({ onNavigate }) {
  const treatments = useMemo(() => TREATMENTS, []);

  const handleSelectTreatment = (item) => {
    if (typeof onNavigate === "function") {
      onNavigate("treatment-detail", { treatment: item });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />
      <main className="font-opensans">
        {/* Hero */}
        <section
          className="relative flex min-h-[43vh] items-start justify-start bg-cover bg-center bg-no-repeat pb-6 text-left"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(116,196,37,0.55) 0%, rgba(186,232,133,0.35) 50%, rgba(255,255,255,0) 100%)",
            }}
          />

          <div className="relative flex w-full max-w-6xl items-stretch justify-start px-8 py-12 backdrop-blur-[2px]">
            <FadeInSection className="max-w-3xl space-y-6 text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#006705]">
                Regain Hope
              </p>

              <h1 className="font-koho text-[56px] font-bold leading-tight text-slate-900">
                From Hopeless to <span className="text-[#74C425]">Healed</span>
              </h1>

              <p className="font-koho text-3xl text-[#0b2fa1]">
                Through Natural Immunotherapy
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* Treatment Grid */}
        <section className="py-20 bg-[#f5fbef]">
          <div className="mx-auto max-w-6xl px-0">
            <FadeInSection className="space-y-4 text-center">
              <motion.p
                initial={{ opacity: 0, y: 10, letterSpacing: "0em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="font-koho text-4xl font-semibold uppercase text-[#74C425]"
              >
                OUR TREATMENTS
              </motion.p>
              <div className="mx-auto h-1 w-24 rounded-full bg-[#74C425]" />
              <p className="mx-auto max-w-3xl text-lg text-slate-600">
                Every program honors the same science-backed philosophy seen on
                our homepage—carefully curated nutrition, detox, and immune
                modulation to awaken true healing from within.
              </p>
            </FadeInSection>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {treatments.map((item, index) => (
                <TreatmentCard
                  key={item.key ?? item.title}
                  item={item}
                  delay={index * 80}
                  onSelect={handleSelectTreatment}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-[#f5fbef] py-20">
          <div className="mx-auto max-w-6xl px-0">
            <FadeInSection className="space-y-3 text-center">
              <p className="font-koho text-4xl font-semibold uppercase text-slate-900">
                TREATING THE ROOT --
              </p>
              <p className="font-koho text-3xl font-semibold text-[#74C425]">
                A NEW BEGINNING FOR PATIENTS
              </p>
              <div className="mx-auto mt-1 h-[2px] w-32 bg-[#74C425]" />
            </FadeInSection>

            <FadeInSection delay={150}>
              <div className="mt-10 rounded-[96px] about-box p-10 shadow-2xl">
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex justify-center">
                    <img
                      src={happyPatientImg}
                      alt="Happy patient celebrating healing"
                      className="h-full w-full max-w-[400px] rounded-[28px] object-cover shadow-2xl"
                      loading="lazy"
                    />
                  </div>

                  <div className="grid grid-rows-2 gap-2 text-[#ffffff] leading-relaxed font-opensans">
                    {/* Paragraph 1 */}
                    <p>
                      <span className="font-semibold text-[#ffffff]">
                        Natural Immunotherapy
                      </span>{" "}
                      is a revolutionary healing process that awakens the body's
                      own intelligence to fight disease from within. Instead of
                      attacking cells, it restores balance, strengthens
                      immunity, and rebuilds damaged tissues naturally. This
                      powerful approach has shown remarkable success not only in
                      cancer healing but also in restoring the functions of
                      vital organs like the kidney, heart, pancreas, and thymus.
                      It boosts platelet production, strengthens the skeletal
                      system, and revitalizes overall health—helping patients
                      regain strength, hope, and a new beginning toward complete
                      wellness.
                    </p>

                    {/* Paragraph 2 + Image inside */}
                    <div className="flex flex-row items-center justify-between gap-2">
                      <p className="flex-1">
                        For cancer patients,{" "}
                        <span className="font-semibold text-[#ffffff]">
                          Natural Immunotherapy
                        </span>{" "}
                        offers new hope addressing the root cause rather than
                        the symptoms. It helps the immune system identify and
                        eliminate abnormal cells while preserving healthy ones,
                        leading to long-term recovery without harmful side
                        effects. Beyond cancer, this therapy has shown
                        transformative results in rejuvenating major organs and
                        systems.
                      </p>

                      <img
                        src={immuneImg}
                        alt="Honey and immune system support"
                        className="w-full max-w-[180px] rounded-2xl object-cover shadow-xl"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
