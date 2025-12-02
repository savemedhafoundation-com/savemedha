import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHeartDetail, HEART_NIT_CAUSES } from "../data/heartLearnMore";
import NaturalImmunotherapyButton from "../components/NaturalImmunotherapyButton";
import nitVideo from "../assets/video/Heart Recovery Animation.mp4";

const HEART_KEY_ORDER = [
  "hypertension-control",
  "cholesterol-reset",
  "arrhythmia-care",
  "heart-failure-support",
];

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
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
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
  const nitCauses = normalizedKey ? HEART_NIT_CAUSES[normalizedKey] : null;
  const faqs =
    nitCauses && nitCauses.items?.length
      ? [
          {
            q: nitCauses.title,
            a: nitCauses.items.join(" | "),
          },
          {
            q: "How does Natural Immunotherapy support heart recovery?",
            a: "It aims to calm vascular inflammation, support mitochondrial energy, balance the gut-heart axis, and lower daily stress load alongside your cardiologist's plan.",
          },
          {
            q: "Which daily habits protect my heart during care?",
            a: "Steady hydration with minerals, anti-inflammatory meals, restorative sleep, gentle movement, breathwork, and avoiding smoking or toxin exposure help lower strain on the heart.",
          },
        ]
      : [];

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

            <NaturalImmunotherapyButton href={ctaLink} className="mt-6" />
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
      {/* NATURAL IMMUNOTHERAPY CAUSES */}
      {nitCauses?.items?.length > 0 && (
        <section
          className="py-12 px-6"
          style={{ backgroundColor: "#fff5f8" }}
        >
          <div className="mx-auto max-w-5xl space-y-8 text-center">
            <div className="space-y-2">
              <p
                className="text-xs font-semibold uppercase tracking-[0.35em]"
                style={{ color: themeColor }}
              >
                Natural Immunotherapy
              </p>
              <h2
                className="text-2xl font-bold md:text-3xl"
                style={{ color: "#2a1a1f" }}
              >
                What is the cause of {detail.name} from the perspective of
              </h2>
              <h3
                className="text-2xl font-extrabold uppercase tracking-wide md:text-3xl"
                style={{ color: themeColor }}
              >
                Natural Immunotherapy?
              </h3>
              <div
                className="mx-auto mt-2 h-[2px] w-32"
                style={{ backgroundColor: themeColor }}
              />
            </div>

            <div className="mx-auto max-w-3xl">
              <p className="text-lg font-semibold uppercase tracking-wide text-[#6b2b39]">
                {nitCauses.title}
              </p>
              <ul className="mt-6 space-y-3 text-left text-lg leading-relaxed text-[#3d1f27]">
                {nitCauses.items.map((item, idx) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg bg-white/90 p-4 shadow-sm"
                    style={{
                      borderLeft: `4px solid ${themeColor}`,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                    }}
                  >
                    <span
                      className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{
                        backgroundColor: themeColor,
                        minWidth: "1.5rem",
                      }}
                    >
                      {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

          {/* HOW NIT WORKS? */}
          <div className="mt-12 flex justify-center px-4">
            <h3
              className="text-center text-[42px] font-bold leading-[58px] text-[#1c0f13] md:text-[48px] md:leading-[65px]"
              style={{ fontFamily: "'Old Standard TT', serif" }}
            >
              HOW <span style={{ color: themeColor }}>NIT</span> WORKS?
            </h3>
          </div>

          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 pt-6">
            <div className="relative w-full overflow-hidden rounded-[28px] bg-black shadow-[0_30px_65px_rgba(182,0,44,0.25)]">
              <video
                className="h-full w-full object-cover"
                src={nitVideo}
                autoPlay
                muted
                loop
                playsInline
                poster={detail.heroImage}
              />
            </div>

            <span
              className="text-sm font-medium uppercase tracking-[0.18em]"
              style={{ color: "#4a2833" }}
            >
              Click here to know more
            </span>

            <a
              href={detail.ctaUrl ?? ctaLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[64px] items-center justify-center rounded-full px-8 text-sm font-semibold uppercase tracking-[0.10em] text-white shadow-[0_25px_50px_rgba(182,0,44,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(182,0,44,0.3)]"
              style={{ backgroundColor: themeColor }}
            >
              Start your healthy journey with Natural Immunotherapy today!
            </a>
          </div>
        </div>
      </section>
    )}

      {faqs.length > 0 && (
        <section
          className="pt-6 pb-16 px-6"
          style={{ backgroundColor: "#fff5f8" }}
        >
          <div className="w-full pt-4">
            <div className="mx-auto flex justify-center">
              <div className="h-[210px] w-[210px] rounded-full bg-white shadow-[0_18px_40px_rgba(182,0,44,0.18)] flex items-center justify-center text-center text-base font-semibold text-[#5c2732] px-6">
                Natural Immunotherapy FAQs
              </div>
            </div>
          </div>

          <div className="text-center space-y-2 mb-10 mt-6">
            <h5
              className="text-center text-[42px] font-bold leading-[58px] md:text-[48px] md:leading-[65px]"
              style={{ color: "#000000", fontFamily: "'Old Standard TT', serif" }}
            >
              Frequently Asked Questions
            </h5>

            <div
              className="mx-auto h-[2px] w-32"
              style={{ backgroundColor: themeColor }}
            />
          </div>

          <div className="mx-auto w-full max-w-5xl space-y-6 rounded-[32px] bg-white p-6 shadow-[0_25px_60px_rgba(182,0,44,0.12)]">
            {faqs.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border bg-white"
                  style={{ borderColor: "#f2d3da" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition font-semibold ${
                      isOpen
                        ? "bg-[#b6002c] text-white"
                        : "text-[#3f1b3d] bg-white"
                    }`}
                  >
                    {item.q}
                    <span
                      className="text-xl font-bold"
                      style={{ color: isOpen ? "#ffffff" : themeColor }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-[#3f1b3d]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}


      <Footer onNavigate={onNavigate} />
    </div>
  );
}
