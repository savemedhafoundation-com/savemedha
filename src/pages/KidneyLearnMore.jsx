import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowCircleLeft } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getKidneyDetail,
  AKI_SYMPTOM_MEDIA,
  CKD_SYMPTOM_MEDIA,
  PKD_SYMPTOM_MEDIA,
  DIABETIC_NEPHROPATHY_SYMPTOM_MEDIA,
  KIDNEY_STONE_SYMPTOM_MEDIA,
  GLOMERULONEPHRITIS_SYMPTOM_MEDIA,
  HYPERTENSIVE_NEPHROPATHY_SYMPTOM_MEDIA,
  LUPUS_NEPHROPATHY_SYMPTOM_MEDIA,
  INTERSTITIAL_NEPHRITIS_SYMPTOM_MEDIA,
  RENAL_CELL_CARCINOMA_SYMPTOM_MEDIA,
  NEPHROTIC_SYNDROME_SYMPTOM_MEDIA,
  UTI_SYMPTOM_MEDIA,
  KIDNEY_NIT_CAUSES,
} from "../data/kidneyLearnMore";
import { TREATMENTS } from "../data/treatments";
import nitVideo from "../assets/video/Kidney Recovery Animation.mp4";
import NaturalImmunotherapyButton from "../components/NaturalImmunotherapyButton";

import treatmentIcon from "../assets/Photo/Treatment icon.png";

const kidneyHeroModules = import.meta.glob(
  "/src/assets/kidney/Kidney Treatments Images/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const kidneyHeroImagesByNumber = Object.entries(kidneyHeroModules).reduce(
  (acc, [path, mod]) => {
    const src = typeof mod === "string" ? mod : mod?.default || path;
    if (!src) return acc;

    const file = path.split("/").pop() || "";
    const match = file.match(/^(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (Number.isFinite(num)) {
        acc[num] = src;
      }
    }

    return acc;
  },
  {}
);

const kidneyHeroImagesSorted = Object.keys(kidneyHeroImagesByNumber)
  .map((num) => parseInt(num, 10))
  .filter(Number.isFinite)
  .sort((a, b) => a - b)
  .map((num) => kidneyHeroImagesByNumber[num]);

const KIDNEY_KEY_ORDER = [
  "chronic-kidney-disease",
  "acute-kidney-injury",
  "glomerulonephritis",
  "polycystic-kidney-disease",
  "kidney-stones",
  "diabetic-nephropathy",
  "hypertensive-nephropathy",
  "lupus-nephritis",
  "interstitial-nephritis",
  "renal-cell-carcinoma",
  "nephrotic-syndrome",
  "urinary-tract-infections",
  "minimal-change-disease",
  "alport-syndrome",
];

export default function KidneyLearnMore({ kidneyKey, onNavigate, fallbackTitle }) {
  const detail = getKidneyDetail(kidneyKey, fallbackTitle);
  const kidneyTreatment =
    TREATMENTS.find((t) => t.key === "kidney") || {
      key: "kidney",
      title: "Kidney Treatment",
    };
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const handleBack = () =>
    onNavigate?.("treatment-detail", { treatment: kidneyTreatment });
  const normalizedKey = detail?.key?.toLowerCase();
  const currentIndex = KIDNEY_KEY_ORDER.indexOf(normalizedKey);
  const heroImageFromFolder =
    currentIndex >= 0 ? kidneyHeroImagesByNumber[currentIndex + 1] : null;
  const heroImageSrc =
    heroImageFromFolder ??
    detail?.heroImage ??
    kidneyHeroImagesSorted[0] ??
    "";
  const prevKey = currentIndex > 0 ? KIDNEY_KEY_ORDER[currentIndex - 1] : null;
  const nextKey =
    currentIndex >= 0 && currentIndex < KIDNEY_KEY_ORDER.length - 1
      ? KIDNEY_KEY_ORDER[currentIndex + 1]
      : null;
  const handleNavigateTo = (targetKey) => {
    if (!targetKey) return;
    onNavigate?.("kidney-detail", { kidneyKey: targetKey });
  };
  const ctaHref = detail?.ctaUrl || detail?.storeUrl || "https://dantura.com/";
  const nitCauses = normalizedKey ? KIDNEY_NIT_CAUSES[normalizedKey] : null;
  const faqs =
    nitCauses && nitCauses.items?.length
      ? [
          {
            q: nitCauses.title,
            a: nitCauses.items.join(" · "),
          },
          {
            q: "How does Natural Immunotherapy support recovery?",
            a: "It aims to calm chronic inflammation, support mitochondrial energy, balance the gut–kidney axis, and reduce daily toxin and pressure load alongside your clinician’s plan.",
          },
          {
            q: "Which daily habits protect my kidneys during care?",
            a: "Steady hydration, blood-pressure-friendly nutrition, restorative sleep, movement as tolerated, and avoiding smoking or toxin exposure help reduce immune stress.",
          },
        ]
      : [];
  

  const symptomTheme = {
    bubbleBg: "#fff5f3",
    bubbleText: "#8a2b25",
    label: "#8a2b25",
  };

  const fallbackSymptomMediaByKey = {
    "acute-kidney-injury": AKI_SYMPTOM_MEDIA,
    "chronic-kidney-disease": CKD_SYMPTOM_MEDIA,
    "polycystic-kidney-disease": PKD_SYMPTOM_MEDIA,
    "diabetic-nephropathy": DIABETIC_NEPHROPATHY_SYMPTOM_MEDIA,
    "kidney-stones": KIDNEY_STONE_SYMPTOM_MEDIA,
    glomerulonephritis: GLOMERULONEPHRITIS_SYMPTOM_MEDIA,
    "hypertensive-nephropathy": HYPERTENSIVE_NEPHROPATHY_SYMPTOM_MEDIA,
    "lupus-nephritis": LUPUS_NEPHROPATHY_SYMPTOM_MEDIA,
    "interstitial-nephritis": INTERSTITIAL_NEPHRITIS_SYMPTOM_MEDIA,
    "renal-cell-carcinoma": RENAL_CELL_CARCINOMA_SYMPTOM_MEDIA,
    "nephrotic-syndrome": NEPHROTIC_SYNDROME_SYMPTOM_MEDIA,
    "urinary-tract-infections": UTI_SYMPTOM_MEDIA,
  };

  if (!detail) return null;

  return (
    <div className="min-h-screen bg-white text-[#40120b]">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <div className="w-full px-15 bg-[#7c2f22] py-2 flex flex-row items-center">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-3 self-start rounded-full border border-white bg-[#ffffff] px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#7c2f22] transition cursor-pointer"
        >
          <span>
            <FaArrowCircleLeft size={20} />
          </span>{" "}
          Back
        </button>
      </div>

      <div
        className="w-full py-3"
        style={{ backgroundColor: "#f7d0cc", color: "#7c2f22" }}
      >
        <div className="mx-auto px-16">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold uppercase tracking-[0.20em] text-[#050505]">
              TREATMENT
            </p>
            <IoIosArrowForward className="text-lg" />
            <p
              className="text-base font-semibold uppercase tracking-[0.20em]"
              style={{ color: "#7c2f22" }}
            >
              {detail.name}
            </p>
            <IoIosArrowForward className="text-lg" />
            <p className="text-base font-semibold uppercase tracking-[0.20em]">
              Learn More
            </p>
          </div>
        </div>
      </div>

      <section className="bg-[#7c2f22] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-4 lg:flex-row lg:items-start">
          <div className="w-full lg:max-w-[460px]">
            <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_35px_70px_rgba(0,0,0,0.35)]">
              <div className="relative h-[420px] bg-gradient-to-br from-[#ffe6c9] to-[#ffd6a8]">
                <img
                  src={heroImageSrc}
                  alt={detail.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="space-y-4 px-10 py-10 text-[#7a2300]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-[#be7964]">
                  Can be cured by
                </p>
                <p className="font-serif text-2xl font-semibold italic">{detail.cureBy}</p>
                <p className="text-base leading-relaxed text-[#5b1e13]">{detail.intro}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h2 className="font-serif text-4xl font-semibold leading-tight text-white md:text-[46px]">
              {detail.descriptionTitle}
            </h2>

            {detail.heroQuote && (
              <blockquote className="rounded-3xl border-l-4 border-[#f9c3bd] bg-white/10 px-6 py-4 text-xl italic leading-relaxed text-[#fee7df]">
                {detail.heroQuote}
              </blockquote>
            )}

            {detail.quickFacts?.length > 0 && (
              <ul className="list-disc space-y-3 pl-6 text-lg text-white/90">
                {detail.quickFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            )}

            <div className="space-y-5 text-lg leading-6 text-white/90">
              {detail.bodyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {detail.stats && (
              <p className="text-lg font-semibold text-[#ffe1d6]">{detail.stats}</p>
            )}

            <NaturalImmunotherapyButton href={ctaHref} className="mt-2 " />
          </div>
        </div>
      </section>

      <div className="h-6 w-full bg-gradient-to-r from-[#f7d0cc] via-[#fde5df] to-[#f7d0cc]" />

      <section className="py-16  bg-gradient-to-b from-white via-[#fde5e7] to-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-koho text-3xl font-bold mb-10">SYMPTOMS</h2>

          <div
            className={`grid grid-cols-2 gap-10 ${
              detail.symptoms?.length > 6 ? "md:grid-cols-4" : "md:grid-cols-3"
            }`}
          >
            {detail.symptoms.map((sym, index) => {
              const fallbackMedia =
                fallbackSymptomMediaByKey[detail.key]?.[index] ?? null;
              const mediaSrc = sym.img ?? fallbackMedia;
              const isVideo =
                typeof mediaSrc === "string" &&
                mediaSrc.toLowerCase().includes(".mp4");

              return (
                <div key={sym.label} className="group text-center">
                  {mediaSrc ? (
                    isVideo ? (
                      <video
                        src={mediaSrc}
                        title={sym.label}
                        className="symptom-pop mx-auto h-50 w-50 rounded-full object-cover   transition-transform duration-300 group-hover:scale-110 "
                        style={{ animationDelay: `${index * 0.1}s` }}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={mediaSrc}
                        alt={sym.label}
                        className="symptom-pop mx-auto h-50 w-50 rounded-full object-cover  transition-transform duration-300 group-hover:scale-110 border-4 border-[#f7d0cc]"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                    )
                  ) : (
                    <div
                      className="symptom-pop mx-auto flex h-32 w-32 items-center justify-center rounded-full text-base font-semibold transition-transform duration-300 group-hover:scale-110"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        backgroundColor: symptomTheme.bubbleBg,
                        color: symptomTheme.bubbleText,
                      }}
                    >
                      {sym.label}
                    </div>
                  )}
                  <p
                    className="mt-4 text-xl font-semibold transition-colors group-hover:opacity-80"
                    style={{ color: symptomTheme.label }}
                  >
                    {sym.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      0{nitCauses && (
        <section className="bg-gradient-to-b from-white via-[#fde5e7] to-white py-16 text-[#5b1e13]">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 text-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.35em] text-[#b65b52]">
                Natural Immunotherapy Insight
              </p>
              <h3 className="font-serif text-3xl font-semibold leading-tight text-[#000000] md:text-4xl">
                {nitCauses.title.replace("Natural Immunotherapy", "")}
                <span className="text-[#5b1e13]">Natural Immunotherapy?</span>
              </h3>
              <div className="mx-auto h-[1px] w-24 bg-[#b65b52]" />
            </div>

            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[42px] bg-[#9f4f44] px-8 py-10 text-left text-white shadow-[0_30px_70px_rgba(88,15,6,0.25)]">
              <div className="absolute inset-y-0 -left-8 w-16 rounded-bl-[42px] rounded-tl-[42px] bg-[#fbd9d3]" aria-hidden />
              <ol className="relative space-y-3 pl-6 text-lg leading-8">
                {nitCauses.items.map((item, index) => (
                  <li key={item} className="text-white/95">
                    <span className="font-semibold">{index + 1}. </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-[#3b0f0a]">
                How <span className="text-[#b65b52]">NIT</span> Works?
              </h4>
              <div className="mx-auto h-[1px] w-16 bg-[#b65b52]" />
            </div>

            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
              <div className="relative w-full overflow-hidden rounded-[28px] bg-black shadow-[0_30px_65px_rgba(88,15,6,0.22)]">
                <video
                  className="h-full w-full object-cover"
                  src={nitVideo}
                  
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={heroImageSrc}
                />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.18em] text-[#6e2a1f]">
                Click here to know more
              </span>

              <a
                href={detail.ctaUrl ?? "https://dantura.com/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[64px] items-center justify-center rounded-full bg-[#9f4f44] px-8 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_25px_50px_rgba(88,15,6,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(88,15,6,0.3)]"
              >
                Start your healthy journey with Natural Immunotherapy today!
              </a>
              
            </div>

            <div className="mt-8 w-full max-w-5xl mx-auto flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleNavigateTo(prevKey)}
                disabled={!prevKey}
                className="inline-flex items-center gap-2 rounded-full border border-[#5b1e13] px-6 py-2 text-[15px] font-semibold text-[#5b1e13] bg-white tracking-wide transition cursor-pointer hover:bg-[#5b1e13] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#5b1e13]"
              >
                <IoIosArrowBack size={20} />
                Prev.
              </button>

              

              <button
                type="button"
                onClick={() => handleNavigateTo(nextKey)}
                disabled={!nextKey}
                className="inline-flex items-center gap-2 rounded-full border border-[#5b1e13] px-6 py-2 text-[15px] font-semibold text-[#5b1e13] tracking-wide transition disabled:opacity-40 cursor-pointer bg-white hover:bg-[#5b1e13] hover:text-white disabled:hover:bg-white disabled:hover:text-[#5b1e13]"
              >
                Next
                <IoIosArrowForward size={20} />
              </button>
            </div>

            <div className="w-full pt-2">
              <div className="mx-auto flex justify-center">
                <img
                  src={treatmentIcon}
                  alt="Treatment icon"
                  className="h-[220px] w-[220px] object-contain"
                />
              </div>
            </div>

            {faqs.length > 0 && (
              <div className="mx-auto w-full max-w-4xl space-y-6 rounded-[32px] bg-[#f5c7c2] p-6 shadow-[0_25px_60px_rgba(88,15,6,0.15)]">
                <div className="text-center space-y-2">
                  <h5 className="font-serif text-2xl font-semibold text-[#3b0f0a]">
                    Frequently Asked Questions
                  </h5>
                  <div className="mx-auto h-[1px] w-24 bg-[#b65b52]" />
                </div>
                <div className="space-y-3">
                  {faqs.map((item, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={item.q}
                        className="overflow-hidden rounded-2xl border border-[#f5c7c2] bg-white"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left text-[#5b1e13] transition hover:bg-[#5b1e13] hover:text-[#ffffff]"
                        >
                          <span className="font-semibold">{item.q}</span>
                          <span className="text-xl font-bold text-[#b65b52]">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-sm leading-relaxed text-[#6b3228]">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      

      
        <div className="h-20 w-screen rounded-[10px] bg-gradient-to-b from-white via-[#fde5e7] to-[#f4c0c1]" />
       <Footer onNavigate={onNavigate} />
    </div>
  );
}
