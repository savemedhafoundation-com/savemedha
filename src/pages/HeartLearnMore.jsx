import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHeartDetail } from "../data/heartLearnMore";

const HEART_KEY_ORDER = [
  "hypertension-control",
  "cholesterol-reset",
  "arrhythmia-care",
  "heart-failure-support",
];

const byPrefixAndName = {
  far: {
    "globe-pointer": faGlobe,
  },
};

const TreatmentBadge = ({
  label,
  baseColor,
  baseShadow,
  hoverColor = "#b6002c",
  hoverShadow = "rgba(182,0,44,0.25)",
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
      className="inline-flex items-center justify-center px-14 py-4 text-2xl font-semibold italic text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b6002c] focus-visible:ring-offset-white"
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

export default function HeartLearnMore({ heartKey, onNavigate, fallbackTitle }) {
  const detail = getHeartDetail(heartKey, fallbackTitle);
  const handleBack = () => onNavigate?.("treatment-detail");
  const storeLink = detail?.storeUrl || "https://dantura.com/";
  const ctaLink = "https://dantura.com/";
  const normalizedKey = detail?.key?.toLowerCase();
  const currentIndex = HEART_KEY_ORDER.indexOf(normalizedKey);
  const prevKey = currentIndex > 0 ? HEART_KEY_ORDER[currentIndex - 1] : null;
  const nextKey =
    currentIndex >= 0 && currentIndex < HEART_KEY_ORDER.length - 1
      ? HEART_KEY_ORDER[currentIndex + 1]
      : null;
  const handleNavigateTo = (targetKey) => {
    if (!targetKey) return;
    onNavigate?.("heart-detail", { heartKey: targetKey });
  };
  if (!detail) return null;

  const themeColor = "#b6002c";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      {/* ======= TOP TITLE AREA ======= */}
      <div className="w-full" style={{ backgroundColor: themeColor }}>
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
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-[#BFFF80]">
              {detail.name}
            </p>
          </div>
        </div>
      </div>

      {/* ===================== MAIN CONTENT ===================== */}
      <section className="w-full py-2" style={{ backgroundColor: themeColor }}>
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
          {/* LEFT SIDE (Image + Cure Box) */}
          <div className="flex flex-col">
            <div>
              <img
                src={detail.heroImage}
                alt={detail.name}
                className="h-99 w-full object-cover"
              />
            </div>

            <div className="bg-white px-4 py-8 w-full">
              <p className="text-xs uppercase tracking-[0.35em]" style={{ color: themeColor }}>
                CAN BE CURED BY
              </p>
              <h3
                className="font-koho text-xl font-semibold italic mt-1"
                style={{ color: themeColor }}
              >
                {detail.cureBy}
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">{detail.intro}</p>
            </div>
          </div>

          {/* RIGHT SIDE (Content Text) */}
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
              href={ctaLink}
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

      {/* ===================== SYMPTOMS ===================== */}
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
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#f1ffe7] text-base font-semibold text-[#0b2fa1] transition-transform duration-300 group-hover:scale-110">
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

      {/* ===================== TYPES ===================== */}
      <section className="py-16 bg-gradient-to-b from-white to-[#f1ffe7]">
        <div className="px-6 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-wide">TYPES OF HEART CARE</h2>
          <div className="mx-auto mt-2 mb-8 h-[2px] w-32 bg-[#74C425]" />

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavigateTo(prevKey)}
              disabled={!prevKey}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition-colors disabled:opacity-40"
              style={{
                color: themeColor,
                borderColor: themeColor,
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
                color: themeColor,
                borderColor: themeColor,
                backgroundColor: "white",
                opacity: nextKey ? 1 : 0.5,
              }}
            >
              Next &rarr;
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-15">
            {detail.relatedTypes.map((t, index) => {
              const bgColors = ["#74C425", "#74C425", "#74C425"];
              const shadowColors = [
                "rgba(116,196,37,0.3)",
                "rgba(182,0,44,0.3)",
                "rgba(116,196,37,0.3)",
              ];

              return (
                <TreatmentBadge
                  key={t}
                  label={t}
                  href={storeLink}
                  baseColor={bgColors[index] ?? "#74C425"}
                  baseShadow={shadowColors[index] ?? "rgba(116,196,37,0.3)"}
                />
              );
            })}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
