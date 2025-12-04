import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getHeartDetail } from "../data/heartLearnMore";
import { TREATMENTS } from "../data/treatments";
import NaturalImmunotherapyButton from "../components/NaturalImmunotherapyButton";
import treatmentIcon from "../assets/Photo/Treatment icon.png";

// Load all hero images (1.png, 2.png, etc.)
const heartHeroModules = import.meta.glob(
  "/src/assets/heart/Heart Treatments Images/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

// Convert module objects to usable image URLs
const heartHeroImagesByNumber = Object.entries(heartHeroModules).reduce(
  (acc, [path, mod]) => {
    const src = typeof mod === "string" ? mod : mod?.default || path;
    if (!src) return acc;

    const file = path.split("/").pop() || "";
    const match = file.match(/^(\d+)/); // pull numeric prefix (1.png, 2.png...)
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

const heartHeroImagesSorted = Object.keys(heartHeroImagesByNumber)
  .map((num) => parseInt(num, 10))
  .filter(Number.isFinite)
  .sort((a, b) => a - b)
  .map((num) => heartHeroImagesByNumber[num]);

const HEART_KEY_ORDER = [
  "coronary-artery-disease",
  "heart-attack",
  "heart-failure",
  "arrhythmia",
  "valvular-heart-disease",
  "congenital-heart-disease",
  "hypertensive-heart-disease",
  "cardiomyopathy",
  "pericardial-disease",
  "rheumatic-heart-disease",
];

const getHeartTheme = () => ({
  headerBg: "#f9d7de",
  headerText: "#b6002c",
  headerAccent: "#b6002c",
  primaryBg: "#b6002c",
  primaryText: "#ffffff",
  bodyText: "#ffffff",
  quoteText: "#ffefef",
  cureAccent: "#b6002c",
  cardBg: "#ffffff",
  ctaBg: "#b6002c",
  ctaHoverBg: "#8f0524",
  ctaText: "#ffffff",
  symptomBubbleBg: "#ffe0e8",
  symptomBubbleText: "#b6002c",
  symptomLabelColor: "#b6002c",
  gradientTo: "#ffe8ed",
  divider: "#b6002c",
  badgeColors: Array(10).fill("#ffc8d6"),
  badgeShadows: Array(10).fill("rgba(182,0,44,0.25)"),
  badgeTextColors: Array(10).fill("#b6002c"),
  badgeHoverColor: "#b6002c",
  badgeHoverShadow: "rgba(182,0,44,0.35)",
  badgeHoverText: "#ffffff",
  causesPillBg: "#a10125",
  causesPillText: "#ffffff",
});

const HeartTypeBadge = ({
  label,
  baseColor,
  baseShadow,
  hoverColor = "#8f0524",
  hoverShadow = "rgba(143,5,36,0.35)",
  href,
  textColor = "#b6002c",
  hoverTextColor = "#ffffff",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedTextColor = isHovered ? hoverTextColor : textColor;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center justify-center px-14 py-4 text-2xl font-semibold italic transition-all duration-200"
      style={{
        backgroundColor: isHovered ? hoverColor : baseColor,
        color: resolvedTextColor,
        borderTopLeftRadius: "30px",
        borderBottomRightRadius: "18px",
        boxShadow: `0px 8px 18px ${isHovered ? hoverShadow : baseShadow}`,
      }}
    >
      {label}
    </a>
  );
};

const HEART_TREATMENT = TREATMENTS.find((item) => item.key === "heart");

export default function HeartLearnMore({ heartKey, onNavigate, fallbackTitle }) {
  const detail = getHeartDetail(heartKey, fallbackTitle);
  const theme = getHeartTheme();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const heroQuoteText =
    detail.heroQuote ||
    "Coronary Artery Disease (CAD) is a long-term condition where the coronary arteries narrow due to plaque buildup, reducing blood flow to the heart.";

  if (!detail) return null;

  const ctaLink = detail.ctaUrl || "https://dantura.com/";
  const storeLink = detail.storeUrl || "https://dantura.com/";

  const normalizedKey = detail.key?.toLowerCase();
  const currentIndex = HEART_KEY_ORDER.indexOf(normalizedKey);
  const mappedNumber = currentIndex + 1; // match 1.png, 2.png... sequence
  const heroImageSrc =
    (mappedNumber > 0 && heartHeroImagesByNumber[mappedNumber]) ||
    detail.heroImage ||
    heartHeroImagesSorted[0];
  const prevKey = currentIndex > 0 ? HEART_KEY_ORDER[currentIndex - 1] : null;
  const nextKey =
    currentIndex >= 0 && currentIndex < HEART_KEY_ORDER.length - 1
      ? HEART_KEY_ORDER[currentIndex + 1]
      : null;

  const handleNavigateTo = (targetKey) => {
    if (!targetKey) return;
    onNavigate?.("heart-detail", { heartKey: targetKey });
  };

  const symptomCount = detail.symptoms?.length ?? 0;
  const symptomBaseCols = symptomCount <= 4 ? "grid-cols-1" : "grid-cols-2";
  const symptomMdCols =
    symptomCount > 6
      ? "md:grid-cols-4"
      : symptomCount === 4
      ? "md:grid-cols-4"
      : "md:grid-cols-3";

  const heartCauses =
    detail.nitCauses?.items?.length > 0
      ? detail.nitCauses.items
      : detail.quickFacts?.slice(0, 8) || [];

  const faqs =
    detail.faqs && detail.faqs.length
      ? detail.faqs
      : [
          {
            q: `What is the cause of ${detail.name} from the perspective of Natural Immunotherapy?`,
            a: "We look at circulation, mineral balance, nervous system calm, toxin load, and mitochondrial energy as drivers you can improve alongside your cardiologist's plan.",
          },
          {
            q: "How does Natural Immunotherapy support heart recovery?",
            a: "It focuses on calming inflammation, improving microcirculation, guiding nutrition, sleep, and stress routines, and reducing daily toxin exposure.",
          },
          {
            q: "Which daily habits protect the heart?",
            a: "Steady hydration, balanced meals, restorative sleep, gentle movement, and stress regulation all reduce burden on the heart.",
          },
        ];

  const handleBack = () => {
    if (!onNavigate) return;
    if (HEART_TREATMENT) {
      onNavigate("treatment-detail", { treatment: HEART_TREATMENT });
    } else {
      onNavigate("treatment-detail");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <header className="bg-[#b6002c] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#b6002c] transition hover:bg-[#ffe8ed]"
          >
            <FaArrowCircleLeft size={20} />
            Back
          </button>
        </div>

        <div className="w-full bg-gradient-to-r from-[#ffe0e8] via-[#ffd3dd] to-[#ffe0e8]">
          <div className="mx-auto flex h-12 w-full max-w-6xl flex-wrap items-center gap-2 px-6 text-xs font-semibold uppercase tracking-[0.4em] text-black">
            <span>Treatment</span>
            <IoIosArrowForward className="text-base" />
            <span style={{ color: theme.headerAccent }}>{detail.name}</span>
            <IoIosArrowForward className="text-base" />
            <span>Learn More</span>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <section className="w-full bg-[#b6002c] pb-12 pt-6 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          {/* Image + Cure Box */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
              <img
                src={heroImageSrc}
                alt={detail.name}
                className="h-[340px] w-full object-cover"
              />
              <div className="space-y-4 px-8 py-8 text-left text-[#7a0d24]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.55em] text-[#b6002c]">
                  Can be cured by
                </p>
                <p className="font-koho text-2xl font-semibold italic">
                  {detail.cureBy}
                </p>
                {detail.intro && (
                  <p className="text-sm leading-relaxed text-[#4a1a25]">
                    {detail.intro}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-6">
            <h2 className="font-koho text-[34px] font-bold leading-tight text-white">
              {detail.descriptionTitle}
            </h2>

            <div className="mb-2">
              <blockquote className="relative inline-block w-full max-w-xl overflow-hidden rounded-[18px] border-2 border-[#f6b3c6] bg-gradient-to-br from-[#ffe6ef] via-[#ffd3e4] to-[#ffc0d9] px-6 py-5 text-lg font-semibold italic leading-relaxed text-[#9c0f30] shadow-[0_18px_32px_rgba(182,0,44,0.18)] md:px-7 md:py-6">
                <span className="absolute left-5 top-3 text-4xl font-black text-[#e38aa6] opacity-90">
                  &ldquo;
                </span>
                <span className="block pl-6 pr-2 text-justify">{heroQuoteText}</span>
              </blockquote>
            </div>

            <div className="space-y-4 text-[16px] leading-relaxed tracking-wide text-white/90">
              {detail.bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {detail.quickFacts?.length > 0 && (
              <div className="space-y-2 rounded-2xl border border-white/15 bg-white/5 p-4 text-white/90">
                <p className="font-semibold uppercase tracking-[0.12em] text-white">
                  Key facts
                </p>
                <ul className="space-y-1 pl-4 text-[16px]">
                  {detail.quickFacts.map((point) => (
                    <li key={point} className="list-disc">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-[17px] font-semibold text-white/95">{detail.stats}</p>

            <NaturalImmunotherapyButton
              href={ctaLink}
              className="mt-2 shadow-[0_18px_36px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="bg-[#fff5f7] py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="relative mb-10">
            <h2 className="font-koho text-3xl font-bold text-[#1f0a0f]">
              SYMPTOMS
            </h2>
            <div
              className="absolute -bottom-4 left-1/2 h-1 w-32 -translate-x-1/2"
              style={{ backgroundColor: theme.divider }}
            />
          </div>

          <div className={`grid ${symptomBaseCols} gap-10 ${symptomMdCols}`}>
            {detail.symptoms.map((sym) => (
              <div key={sym.label} className="group text-center">
                {sym.img ? (
                  <img
                    src={sym.img}
                    alt={sym.label}
                    className="mx-auto h-50 w-50 rounded-full border-4 border-[#ffd6e2] bg-white object-cover shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-transform group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="mx-auto flex h-32 w-32 items-center justify-center rounded-full text-base font-semibold transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: theme.symptomBubbleBg,
                      color: theme.symptomBubbleText,
                    }}
                  >
                    {sym.label}
                  </div>
                )}
                <p
                  className="mt-4 text-lg font-semibold transition-colors group-hover:opacity-80"
                  style={{ color: theme.symptomLabelColor }}
                >
                  {sym.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Natural Immunotherapy Causes */}
      {heartCauses.length > 0 && (
        <section className="bg-[#fff0f5] py-12 px-6">
          <div className="mx-auto max-w-5xl space-y-10 text-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b6002c]">
                Natural Immunotherapy
              </p>
              <h2 className="text-2xl font-bold md:text-3xl text-[#1f0a0f]">
                What is the cause of {detail.name} from the perspective of
              </h2>
              <h3 className="text-2xl font-extrabold uppercase tracking-wide md:text-3xl text-[#b6002c]">
                Natural Immunotherapy?
              </h3>
              <div className="mx-auto mt-2 h-[2px] w-32 bg-[#b6002c]" />
            </div>

            <div className="mx-auto max-w-4xl space-y-3">
              {heartCauses.map((cause, index) => (
                <div
                  key={`${cause}-${index}`}
                  className="flex items-center gap-3 rounded-full px-5 py-3 text-left shadow-[0_12px_28px_rgba(182,0,44,0.16)]"
                  style={{ backgroundColor: theme.causesPillBg, color: theme.causesPillText }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-base font-bold">
                    {index + 1}
                  </span>
                  <span className="text-[16px] font-semibold md:text-lg">{cause}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center px-4">
              <h3
                className="text-center text-[42px] font-bold leading-[55px] text-black md:text-[48px] md:leading-[65px]"
                style={{ fontFamily: "'Old Standard TT', serif" }}
              >
                HOW <span style={{ color: theme.headerText }}>NIT</span> WORKS?
              </h3>
            </div>

            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 pt-4">
              <div className="relative w-full overflow-hidden rounded-[28px] bg-black shadow-[0_30px_65px_rgba(182,0,44,0.25)]">
                <img
                  src={heroImageSrc}
                  alt={detail.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="text-sm font-medium uppercase tracking-[0.18em] text-[#3f1b3d]">
                Click here to know more
              </span>

              <a
                href={ctaLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[64px] items-center justify-center rounded-full px-8 text-sm font-semibold uppercase tracking-[0.10em] text-white shadow-[0_25px_50px_rgba(182,0,44,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_60px_rgba(182,0,44,0.3)]"
                style={{ backgroundColor: theme.headerText }}
              >
                Start your healthy journey with Natural Immunotherapy today!
              </a>
            </div>

            <div className="mx-auto mt-6 flex w-full max-w-6xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => handleNavigateTo(prevKey)}
                disabled={!prevKey}
                className="inline-flex items-center gap-2 rounded-full border border-[#b6002c] bg-white px-6 py-2 text-[15px] font-semibold text-[#b6002c] tracking-wide transition disabled:opacity-40 hover:bg-[#b6002c] hover:text-white disabled:hover:bg-white disabled:hover:text-[#b6002c]"
              >
                <FaArrowCircleLeft size={20} />
                Prev.
              </button>

              <button
                type="button"
                onClick={() => handleNavigateTo(nextKey)}
                disabled={!nextKey}
                className="inline-flex items-center gap-2 rounded-full border border-[#b6002c] bg-white px-6 py-2 text-[15px] font-semibold text-[#b6002c] tracking-wide transition disabled:opacity-40 hover:bg-[#b6002c] hover:text-white disabled:hover:bg-white disabled:hover:text-[#b6002c]"
              >
                Next
                <FaArrowCircleRight size={20} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section
          className="px-6 pb-16 pt-2"
          style={{ backgroundColor: theme.primaryBg }}
        >
          <div className="w-full pt-2">
            <div className="mx-auto flex justify-center">
              <img
                src={treatmentIcon}
                alt="Treatment illustration"
                className="h-[250px] w-[250px] object-contain"
              />
            </div>
          </div>

          <div className="mb-10 space-y-2 text-center">
            <h5
              className="text-center text-[42px] font-bold leading-[55px] md:text-[48px] md:leading-[65px]"
              style={{ color: "#000000", fontFamily: "'Old Standard TT', serif" }}
            >
              Frequently Asked Questions
            </h5>

            <div
              className="mx-auto h-[2px] w-32"
              style={{ backgroundColor: theme.divider }}
            />
          </div>

          <div className="mx-auto w-full max-w-5xl space-y-6 rounded-[32px] bg-[#ffe0e8] p-6 shadow-[0_25px_60px_rgba(182,0,44,0.15)]">
            {faqs.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border bg-white"
                  style={{ borderColor: theme.divider }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left font-semibold transition ${
                      isOpen ? "bg-[#b6002c] text-white" : "bg-white text-[#3f1b3d]"
                    }`}
                  >
                    {item.q}
                    <span
                      className="text-xl font-bold"
                      style={{ color: isOpen ? "#ffffff" : "#b6002c" }}
                    >
                      {isOpen ? "-" : "+"}
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
