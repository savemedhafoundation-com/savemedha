import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOtherDetail } from "../data/otherLearnMore";

const OTHER_KEY_ORDER = [
  "autoimmune-reset",
  "metabolic-syndrome",
  "chronic-fatigue",
  "pcos-hormone-care",
];

const byPrefixAndName = {
  far: {
    "globe-pointer": faGlobe,
  },
};

// Kidney Page Color Scheme
const themePrimary = "#3c6513"; // Main Green
const themeHighlight = "#BFFF80";
const themeBlue = "#0b2fa1";
const symptomBg = "#f1ffe7";

const TreatmentBadge = ({
  label,
  baseColor,
  baseShadow,
  hoverColor = "#7A2300",
  hoverShadow = "rgba(122,35,0,0.3)",
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center justify-center px-14 py-4 text-2xl font-semibold italic text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0b2fa1] focus-visible:ring-offset-white"
      style={{
        backgroundColor: isHovered ? hoverColor : baseColor,
        borderTopLeftRadius: "30px",
        borderBottomRightRadius: "18px",
        boxShadow: `0px 8px 18px ${isHovered ? hoverShadow : baseShadow}`,
      }}
    >
      {label}
    </a>
  );
};

export default function OtherLearnMore({ otherKey, onNavigate, fallbackTitle }) {
  const detail = getOtherDetail(otherKey, fallbackTitle);
  const handleBack = () => onNavigate?.("treatment-detail");
  const storeLink = detail?.storeUrl || "https://dantura.com/";
  const normalizedKey = detail?.key?.toLowerCase();
  const currentIndex = OTHER_KEY_ORDER.indexOf(normalizedKey);
  const prevKey = currentIndex > 0 ? OTHER_KEY_ORDER[currentIndex - 1] : null;
  const nextKey =
    currentIndex >= 0 && currentIndex < OTHER_KEY_ORDER.length - 1
      ? OTHER_KEY_ORDER[currentIndex + 1]
      : null;
  const handleNavigateTo = (targetKey) => {
    if (!targetKey) return;
    onNavigate?.("other-detail", { otherKey: targetKey });
  };

  if (!detail) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      {/* TOP BAR */}
      <div className="w-full" style={{ backgroundColor: themePrimary }}>
        <div className="mx-auto max-w-6xl px-6 text-white py-4">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
          >
            <span aria-hidden="true">&larr;</span>
            Back
          </button>

          <div className="flex items-center gap-4">
            <p className="text-base font-semibold uppercase tracking-[0.35em]">
              TREATMENT
            </p>
            <IoIosArrowForward className="text-lg" />
            <p className="text-base font-semibold uppercase tracking-[0.2em]" style={{ color: themeHighlight }}>
              {detail.name}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN BLUE SECTION */}
      <section className="w-full py-2" style={{ backgroundColor: themePrimary }}>
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
          
          <div className="flex flex-col">
            <div className="bg-[#0b2fa1]">
              <img
                src={detail.heroImage}
                alt={detail.name}
                className="h-99 w-full object-cover"
              />
            </div>

            <div className="bg-white px-4 py-8 w-full">
              <p className="text-xs uppercase tracking-[0.35em]" style={{ color: themeBlue }}>
                CAN BE CURED BY
              </p>
              <h3
                className="font-koho text-xl font-semibold italic mt-1"
                style={{ color: themeBlue }}
              >
                {detail.cureBy}
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">{detail.intro}</p>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="text-white self-start -mt-6">
            <h2 className="font-koho text-[32px] font-bold">{detail.descriptionTitle}</h2>
            <blockquote className="italic text-[#d8f7a8] text-lg mb-2 leading-relaxed">
              {detail.heroQuote}
            </blockquote>

            {detail.quickFacts?.length > 0 && (
              <ul className="mb-4 list-disc space-y-1 pl-5 text-white/90">
                {detail.quickFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            )}

            <div className="space-y-4 text-[16px] leading-relaxed tracking-wide">
              {detail.bodyParagraphs.map((p, i) => (
                <p key={i} className="text-white/90">
                  {p}
                </p>
              ))}
            </div>

            <p className="mt-4 mr-2 text-[17px] font-medium text-white">{detail.stats}</p>

            <a
              href={storeLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFD54F] px-8 py-3 text-lg font-semibold text-[#0b2fa1] shadow-md transition hover:bg-[#f7c533]"
            >
              <FontAwesomeIcon icon={byPrefixAndName.far["globe-pointer"]} />
              Start Natural Immunotherapy
            </a>
          </div>

        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-koho text-3xl font-bold mb-10">SYMPTOMS</h2>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {detail.symptoms.map((sym) => (
              <div key={sym.label} className="group text-center">
                {sym.img ? (
                  <img
                    src={sym.img}
                    alt={sym.label}
                    className="mx-auto h-50 w-50 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="mx-auto flex h-32 w-32 items-center justify-center rounded-full text-base font-semibold transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: symptomBg, color: themeBlue }}
                  >
                    {sym.label}
                  </div>
                )}
                <p className="mt-4 text-xl font-semibold text-slate-700 transition-colors duration-200 group-hover:text-[#0b2fa1]">
                  {sym.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARE TYPES */}
      <section className="py-16 bg-gradient-to-b from-white to-[#f1ffe7]">
        <div className="px-6 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-wide">TYPES OF CUSTOM CARE</h2>
          <div className="mx-auto mt-2 mb-8 h-[2px] w-32 bg-[#74C425]" />

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavigateTo(prevKey)}
              disabled={!prevKey}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition-colors disabled:opacity-40"
              style={{
                color: themeBlue,
                borderColor: themeBlue,
                backgroundColor: "white",
                opacity: prevKey ? 1 : 0.5,
              }}
            >
              &larr; Prev
            </button>

            <button
              type="button"
              onClick={() => handleNavigateTo(nextKey)}
              disabled={!nextKey}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition-colors disabled:opacity-40"
              style={{
                color: themeBlue,
                borderColor: themeBlue,
                backgroundColor: "white",
                opacity: nextKey ? 1 : 0.5,
              }}
            >
              Next &rarr;
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-15">
            {detail.relatedTypes.map((t, index) => (
              <TreatmentBadge
                key={t}
                label={t}
                href={storeLink}
                baseColor={["#74C425", "#74C425", "#74C425"][index] ?? "#74C425"}
                baseShadow={["rgba(116,196,37,0.3)", "rgba(116,196,37,0.3)", "rgba(116,196,37,0.3)"][index]}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
