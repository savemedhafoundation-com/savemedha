import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

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
} from "../data/kidneyLearnMore";
import { TREATMENTS } from "../data/treatments";

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
  "glomeru-lonephritis",
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

      <header className="bg-[#7c2f22] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-3 self-start rounded-full border border-white bg-[#ffffff] px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#7c2f22] transition cursor-pointer"
          >
             <span><FaArrowCircleLeft size={20}/></span> 
            Back
          </button>
        </div>

        <div className="w-full bg-gradient-to-r from-[#f7d0cc] via-[#fde5df] to-[#f7d0cc]">
          <div className="mx-auto flex h-12 w-full max-w-6xl flex-wrap items-center gap-3 px-6 text-xs font-semibold uppercase tracking-[0.6em] text-black">
            <span className="text-black/80">Treatment</span>
            <IoIosArrowForward className="text-base" />
            <span className="text-black">{detail.name}</span>
          </div>
        </div>
      </header>

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

            <div className="space-y-5 text-lg leading-9 text-white/90">
              {detail.bodyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {detail.stats && (
              <p className="text-lg font-semibold text-[#ffe1d6]">{detail.stats}</p>
            )}

            <a
              href="https://dantura.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-white px-10 text-lg font-semibold tracking-wide text-[#7a2300] shadow-[0_18px_35px_rgba(33,8,2,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_45px_rgba(33,8,2,0.35)]"
            >
              Start Natural Immunotherapy
            </a>
          </div>
        </div>
      </section>

      <div className="h-6 w-full bg-gradient-to-r from-[#f7d0cc] via-[#fde5df] to-[#f7d0cc]" />

      <section className="py-16 bg-white">
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
                        className="symptom-pop mx-auto h-50 w-50 rounded-full object-cover  transition-transform duration-300 group-hover:scale-110 "
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

      <div className="mt-8 flex flex-col gap-7 px-6">
        
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 text-[#7a2300]">
          <button
            type="button"
            onClick={() => handleNavigateTo(prevKey)}
            disabled={!prevKey}
            className={`group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.5em] ${
              prevKey ? "" : "opacity-40"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-current bg-white text-lg transition group-hover:bg-[#7a2300] group-hover:text-white">
              <IoIosArrowBack />
            </span>
            Prev.
          </button>

          <button
            type="button"
            onClick={() => handleNavigateTo(nextKey)}
            disabled={!nextKey}
            className={`group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.5em] ${
              nextKey ? "" : "opacity-40"
            }`}
          >
            Next
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-current bg-white text-lg transition group-hover:bg-[#7a2300] group-hover:text-white">
              <IoIosArrowForward />
            </span>
          </button>
        </div>
      </div>
        <div className="h-20 w-screen rounded-[10px] bg-gradient-to-b from-white via-[#fde5e7] to-[#f4c0c1]" />
       <Footer onNavigate={onNavigate} />
    </div>
  );
}


