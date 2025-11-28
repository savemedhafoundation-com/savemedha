import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCancerDetail } from "../data/cancerLearnMore";
import { TREATMENTS } from "../data/treatments";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import NaturalImmunotherapyButton from "../components/NaturalImmunotherapyButton";

// Load all hero images (1.png, 2.png, etc.)
const heroModules = import.meta.glob(
  "/src/assets/heroimgofcancertreatment/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

// Convert module objects → usable image URLs
const heroImagesByNumber = Object.entries(heroModules).reduce((acc, [path, mod]) => {
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
}, {});

const heroImagesSorted =
  Object.keys(heroImagesByNumber)
    .map((num) => parseInt(num, 10))
    .filter(Number.isFinite)
    .sort((a, b) => a - b)
    .map((num) => heroImagesByNumber[num]);

// Order of cancers matched to hero images 1.png, 2.png, etc.
const HERO_KEY_ORDER = [
  "blood",
  "bone",
  "brain",
  "breast",
  "cervix",
  "colon",
  "eye",
  "gall-bladder",
  "kidney-cancer",
  "liver-cancer",
  "lungs",
  "oral",
  "pancreas",
  "prostate",
  "skin",
  "stomach",
  "throat",
  "thyroid",
  "tongue",
];

// Single palette used across all learn-more pages.
const getCancerTheme = () => ({
  headerBg: "#F6D0FC",
  headerText: "#C425B4",
  headerAccent: "#C425B4",
  primaryBg: "#FCEBFF",
  primaryText: "#2f1230",
  bodyText: "#3f1b3d",
  quoteText: "#C425B4",
  cureAccent: "#C425B4",
  cardBg: "#ffffff",
  ctaBg: "#C425B4",
  ctaHoverBg: "#ad1c97",
  ctaText: "#ffffff",
  symptomBubbleBg: "#F6D0FC",
  symptomBubbleText: "#C425B4",
  symptomLabelColor: "#C425B4",
  symptomLabelHover: "#C425B4",
  gradientTo: "#FCEBFF",
  divider: "#C425B4",
  badgeColors: Array(8).fill("#F6D0FC"),
  badgeShadows: Array(8).fill("rgba(196,37,180,0.25)"),
  badgeTextColors: Array(8).fill("#C425B4"),
  badgeHoverColor: "#ad1c97",
  badgeHoverShadow: "rgba(196,37,180,0.35)",
  badgeHoverText: "#ffffff",
});

const CancerTypeBadge = ({
  label,
  baseColor,
  baseShadow,
  hoverColor = "#7A2300",
  hoverShadow = "rgba(122,35,0,0.3)",
  href,
  textColor = "#ffffff",
  hoverTextColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedTextColor = isHovered ? hoverTextColor || textColor : textColor;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center justify-center px-14 py-4 text-2xl font-semibold italic text-white transition-all duration-200"
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

const CANCER_TREATMENT = TREATMENTS.find((item) => item.key === "cancer");

export default function CancerLearnMore({ cancerKey, onNavigate, fallbackTitle }) {
  const detail = getCancerDetail(cancerKey, fallbackTitle);
  const theme = getCancerTheme(detail?.key);
  const recoveryImages = Array.isArray(detail?.recoveryImages)
    ? detail.recoveryImages.filter(Boolean)
    : [];
  const hasRecoveryImages = recoveryImages.length > 0;
  const handleBack = () => {
    if (!onNavigate) return;

    if (CANCER_TREATMENT) {
      onNavigate("treatment-detail", { treatment: CANCER_TREATMENT });
    } else {
      onNavigate("treatment-detail");
    }
  };

  const storeLink = detail?.storeUrl || "https://dantura.com/";
  const ctaLink = "https://dantura.com/";

  if (!detail) return null;

  const symptomCount = detail.symptoms?.length ?? 0;
  const symptomBaseCols = symptomCount <= 4 ? "grid-cols-1" : "grid-cols-2";
  const symptomMdCols =
    symptomCount > 6
      ? "md:grid-cols-4"
      : symptomCount === 4
        ? "md:grid-cols-4"
        : "md:grid-cols-3";

  // Pick hero image based on numeric filename order (1.png → Blood Cancer, 2.png → Bone Cancer, ...)
  const normalizedKey = detail.key?.toLowerCase();
  const mappedNumber = HERO_KEY_ORDER.findIndex((key) => key === normalizedKey) + 1; // +1 to match 1.png, 2.png...
  const heroSrc =
    (mappedNumber && heroImagesByNumber[mappedNumber]) ||
    detail.heroImage ||
    heroImagesSorted[0];

  const currentIndex = HERO_KEY_ORDER.findIndex((key) => key === normalizedKey);
  const prevKey = currentIndex > 0 ? HERO_KEY_ORDER[currentIndex - 1] : null;
  const nextKey = currentIndex >= 0 && currentIndex < HERO_KEY_ORDER.length - 1 ? HERO_KEY_ORDER[currentIndex + 1] : null;

  const handleNavigateTo = (targetKey) => {
    if (!targetKey) return;
    onNavigate?.("cancer-detail", { cancerKey: targetKey });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />
  <div className="w-full px-15 bg-[#C425B4] py-2 flex flex-row items-center">
          <button
            onClick={handleBack}
            className=" inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tr transition-colors"
            style={{
              color: theme.headerText,
              borderColor: theme.headerText,
              backgroundColor: "white",
            }}
          >
            <span><FaArrowCircleLeft size={20}/></span> Back
          </button>
          </div>
      {/* TOP TITLE BAR */}
      <div
        className="w-full py-3"
        style={{ backgroundColor: theme.headerBg, color: theme.headerText }}
      >
        <div className="mx-auto px-16">
        
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold uppercase tracking-[0.20em] text-[#050505]">
              TREATMENT
            </p>
            <IoIosArrowForward className="text-lg" />
            <p
              className="text-base font-semibold uppercase tracking-[0.20em]"
              style={{ color: theme.headerAccent }}
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

      {/* MAIN SECTION */}
      <section
        className="w-full py-10"
        style={{ backgroundColor: theme.primaryBg }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">

          {/* IMAGE + Cure Box */}
          <div className="flex flex-col p-5">
            <div className="shadow-lg">
              <img src={heroSrc} alt={detail.name} className="h-99 w-full object-cover rounded-tl-[18px] rounded-tr-[18px]" />
            </div>

            <div
              className="px-6 py-12 w-full bg-white text-left shadow-lg rounded-bl-[18px] rounded-br-[18px] min-h-[170px]"
              // style={{ backgroundColor: theme.cardBg }}
            >
              <p
                className="text-xs uppercase tracking-[0.35em]"
                style={{ color: theme.cureAccent }}
              >
                CAN BE CURED BY
              </p>
              <h3
                className="font-koho text-xl font-semibold italic mt-1"
                style={{ color: theme.cureAccent }}
              >
                {detail.cureBy}
              </h3>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className="self-start -mt-3 p-5"
            style={{ color: theme.primaryText }}
          >

            <h2 className="font-koho text-[32px] font-bold mb-4">
              {detail.descriptionTitle}
            </h2>

            <blockquote
              className="italic text-lg mb-4 leading-relaxed font-bold"
              style={{ color: theme.quoteText }}
            >
              {detail.heroQuote}
            </blockquote>

            <div
              className="space-y-4 text-[16px] leading-relaxed tracking-wide font-semibold"
              style={{ color: theme.bodyText }}
            >
              {detail.bodyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
              ))}
            </div>

            {detail.bulletHighlights?.length > 0 && (
              <div className="mt-4" style={{ color: theme.bodyText }}>
                {detail.bulletIntro && (
                  <p className="font-semibold">{detail.bulletIntro}</p>
                )}
                <ul className="ml-5 list-decimal space-y-1 text-[16px]">
                  {detail.bulletHighlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-2 mr-2 text-[17px] font-medium">
              {detail.stats}
            </p>

            <NaturalImmunotherapyButton
              href={ctaLink}
              className="mt-6 shadow-md hover:brightness-105"
            />
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="relative mb-10">
            <h2 className="font-koho text-3xl font-bold">SYMPTOMS</h2>
            <div className="absolute -bottom-4 left-1/2 h-1 w-32 -translate-x-1/2 bg-[#C425B4]" />
          </div>

          <div className={`grid ${symptomBaseCols} gap-10 ${symptomMdCols}`}>
            {detail.symptoms.map((sym) => {
              const isVideo =
                typeof sym.img === "string" &&
                sym.img.toLowerCase().includes(".mp4");

              return (
                <div key={sym.label} className="group text-center">
                  {sym.img ? (
                    isVideo ? (
                      <video
                        src={sym.img}
                        title={sym.label}
                        className="mx-auto h-50 w-50 rounded-full object-cover transition-transform group-hover:scale-110 border-4  border-[#FCEBFF]"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={sym.img}
                        alt={sym.label}
                        className="mx-auto h-50 w-50 rounded-full object-cover transition-transform group-hover:scale-110 border-4 border-[#eebaf7]"
                      />
                    )
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
                    className="mt-4 text-xl font-semibold transition-colors group-hover:opacity-80"
                    style={{ color: theme.symptomLabelColor }}
                  >
                    {sym.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RELATED TYPES */}
      <section
        className="py-16 px-10 "
      >
        <div className="px-6 text-center">
          <h2 className="text-3xl font-bold">TYPES OF CANCER</h2>
          <div
            className="mx-auto mt-2 mb-8 h-1 w-30 bg-[#74C425]"
            style={{ backgroundColor: theme.divider }}
          />

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavigateTo(prevKey)}
              disabled={!prevKey}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition-colors disabled:opacity-40"
              style={{
                color: theme.headerText,
                borderColor: theme.headerText,
                backgroundColor: "white",
                opacity: prevKey ? 1 : 0.5,
              }}
            >
               <span><FaArrowCircleLeft size={20}/></span> Prev
            </button>

            <button
              type="button"
              onClick={() => handleNavigateTo(nextKey)}
              disabled={!nextKey}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition-colors disabled:opacity-40"
              style={{
                color: theme.headerText,
                borderColor: theme.headerText,
                backgroundColor: "white",
                opacity: nextKey ? 1 : 0.5,
              }}
            >
              Next <FaArrowCircleRight size={20}/>
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-10">
            {detail.relatedTypes.map((t, index) => {
              const bgColors = theme.badgeColors ?? ["#74C425", "#74C425", "#74C425"];
              const shadowColors =
                theme.badgeShadows ?? [
                  "rgba(122,35,0,0.3)",
                  "rgba(116,196,37,0.3)",
                  "rgba(116,196,37,0.3)",
                ];
              const textColors =
                theme.badgeTextColors ?? ["#ffffff", "#ffffff", "#ffffff"];

              return (
                <CancerTypeBadge
                  key={t}
                  label={t}
                  baseColor={bgColors[index] ?? "#74C425"}
                  baseShadow={shadowColors[index] ?? "rgba(116,196,37,0.3)"}
                  hoverColor={theme.badgeHoverColor}
                  hoverShadow={theme.badgeHoverShadow}
                  textColor={textColors[index] ?? "#ffffff"}
                  hoverTextColor={theme.badgeHoverText}
                  href={storeLink}
                />
              );
            })}
          </div>
        </div>
      </section>

      {hasRecoveryImages && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold">PATIENT&apos;S RECOVERY GALLERY</h2>
            <div
              className="mx-auto mt-2 mb-10 h-[2px] w-32"
              style={{ backgroundColor: theme.divider }}
            />

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {recoveryImages.map((imgSrc, idx) => (
                <div
                  key={`${imgSrc}-${idx}`}
                  className="overflow-hidden rounded-4xl h-fullshadow-md shadow-slate-200 transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: theme.cardBg }}
                >
                  <img
                    src={imgSrc}
                    alt={`${detail.name} recovery ${idx + 1}`}
                    className="h-60 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
