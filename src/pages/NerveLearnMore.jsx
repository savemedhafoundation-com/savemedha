import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowCircleLeft, FaMinus, FaPlus, FaPlay } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NaturalImmunotherapyButton from "../components/NaturalImmunotherapyButton";
import { TREATMENTS } from "../data/treatments";
import { getNerveDetail, NERVE_NIT_CAUSES } from "../data/nerveLearnMore";
import nitVideo from "../assets/video/Heart Recovery Animation.mp4";
import treatmentIcon from "../assets/Photo/Treatment icon.png";

const NERVE_KEY_ORDER = [
  "peripheral-neuropathy",
  "sciatica-relief",
  "parkinsons-support",
  "multiple-sclerosis-care",
];

const getNerveTheme = () => ({
  headerBg: "#e5efff",
  headerText: "#0a3b9f",
  headerAccent: "#0a3b9f",
  primaryBg: "#f1f6ff",
  primaryText: "#122b63",
  bodyText: "#1f3d78",
  quoteText: "#0a3b9f",
  cureAccent: "#0a3b9f",
});

const NERVE_TREATMENT = TREATMENTS.find((item) => item.key === "nerve");

export default function NerveLearnMore({ nerveKey, onNavigate, fallbackTitle }) {
  const detail = getNerveDetail(nerveKey, fallbackTitle);
  const theme = getNerveTheme(detail?.key);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const handleBack = () => {
    if (!onNavigate) return;
    if (NERVE_TREATMENT) {
      onNavigate("treatment-detail", { treatment: NERVE_TREATMENT });
    } else {
      onNavigate("treatment-detail");
    }
  };
  const ctaLink = detail?.ctaUrl || "https://dantura.com/";
  const normalizedKey = detail?.key?.toLowerCase();
  const currentIndex = NERVE_KEY_ORDER.indexOf(normalizedKey);
  const prevKey = currentIndex > 0 ? NERVE_KEY_ORDER[currentIndex - 1] : null;
  const nextKey =
    currentIndex >= 0 && currentIndex < NERVE_KEY_ORDER.length - 1
      ? NERVE_KEY_ORDER[currentIndex + 1]
      : null;

  const nitCauses = normalizedKey ? NERVE_NIT_CAUSES[normalizedKey] : null;
  const heroSrc = detail?.heroImage;
  const faqs =
    nitCauses && nitCauses.items?.length
      ? [
          {
            q: nitCauses.title,
            a: nitCauses.items.join(" | "),
          },
          {
            q: `What is ${detail?.name}?`,
            a: detail?.bodyParagraphs?.join(" ") ?? "",
          },
          {
            q: "How does Natural Immunotherapy support nerve recovery?",
            a: "It works to calm nerve inflammation, stabilize blood sugar, improve circulation, and replenish micronutrients that keep nerve signals steady.",
          },
          {
            q: "Which habits protect my nerves during care?",
            a: "Balanced blood sugar, anti-inflammatory meals, restorative sleep, gentle movement, breathwork, and avoiding alcohol or toxins reduce nerve stress.",
          },
        ]
      : [];

  const handleNavigateTo = (targetKey) => {
    if (!targetKey) return;
    onNavigate?.("nerve-detail", { nerveKey: targetKey });
  };

  if (!detail) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <div className="w-full px-15 bg-[#242BB0] py-2 flex flex-row items-center">
        <button
          onClick={handleBack}
          className=" inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tr transition-colors cursor-pointer"
          style={{
            color: theme.headerText,
            borderColor: theme.headerText,
            backgroundColor: "white",
          }}
        >
          <span>
            <FaArrowCircleLeft size={20} />
          </span>{" "}
          Back
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
              <img
                src={heroSrc}
                alt={detail.name}
                className="h-99 w-full object-cover rounded-tl-[18px] rounded-tr-[18px]"
              />
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
            className="self-start -mt-3 p-5 "
            style={{ color: theme.primaryText }}
          >
            <h2 className="font-koho text-[32px] font-bold mb-4 ">
              {detail.descriptionTitle}
            </h2>

            <blockquote
              className="italic text-lg mb-4   leading-relaxed font-bold"
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

            <p className="mt-2 mr-2 text-[17px] font-medium">{detail.stats}</p>

            <NaturalImmunotherapyButton
              href={ctaLink}
              className="mt-6 shadow-md hover:brightness-105"
            />
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-[0.18em] text-[#0a3b9f]">
            Symptoms
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-28 bg-[#0a3b9f]" />

          <div
            className={`mt-10 grid grid-cols-2 gap-8 ${
              detail.symptoms?.length > 6 ? "md:grid-cols-4" : "md:grid-cols-3"
            }`}
          >
            {detail.symptoms.map((sym) => (
              <div key={sym.label} className="space-y-3 text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-[#0a3b9f] bg-[#e9f1ff] text-center text-sm font-semibold text-[#0a3b9f] shadow-[0_12px_25px_rgba(10,59,159,0.18)]">
                  {sym.img ? (
                    <img
                      src={sym.img}
                      alt={sym.label}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="px-3">{sym.label}</span>
                  )}
                </div>
                <p className="text-base font-semibold text-slate-800">{sym.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NIT CAUSES */}
      {nitCauses?.items?.length > 0 && (
        <section className="bg-gradient-to-b from-[#f6f9ff] via-white to-white pb-12 pt-4">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0a3b9f]">
              Natural Immunotherapy
            </p>
            <h3 className="mt-1 text-xl font-bold uppercase tracking-[0.12em] text-[#0a3b9f]">
              What is the cause of {detail.name} from the perspective of
            </h3>
            <h4 className="text-2xl font-extrabold uppercase tracking-[0.12em] text-[#001c66]">
              Natural Immunotherapy?
            </h4>

            <div className="mx-auto mt-8 max-w-4xl space-y-3">
              {nitCauses.items.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg bg-[#0d2fa5] px-4 py-3 text-left text-sm font-semibold leading-relaxed text-white shadow-[0_18px_40px_rgba(13,47,165,0.25)]"
                >
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0d2fa5]">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW NIT WORKS */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-2xl font-bold uppercase tracking-[0.14em] text-[#0a3b9f]">
            How NIT Works?
          </h3>
          <div className="mx-auto mt-2 h-[2px] w-24 bg-[#0a3b9f]" />

          <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-[22px] shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
            <video
              className="h-full w-full object-cover"
              src={nitVideo}
              autoPlay
              muted
              loop
              playsInline
              poster={detail.heroImage}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#0a3b9f] shadow-lg">
                <FaPlay />
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-[#0a3b9f]">
            Click here to know more
          </p>
          <div className="mt-4 flex justify-center">
            <a
              href={ctaLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[60px] items-center justify-center rounded-full bg-[#0a3b9f] px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_40px_rgba(10,59,159,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(10,59,159,0.38)]"
            >
              Start your healthy journey with Natural Immunotherapy today!
            </a>
          </div>

          <div className="mt-8 w-full max-w-5xl mx-auto flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => handleNavigateTo(prevKey)}
              disabled={!prevKey}
              className="inline-flex items-center gap-2 rounded-full border border-[#242BB0] px-6 py-2 text-[15px] font-semibold text-[#242BB0] bg-white tracking-wide transition cursor-pointer hover:bg-[#242BB0] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#242BB0]"
            >
              <IoIosArrowBack size={20} />
              Prev.
            </button>

            <button
              type="button"
              onClick={() => handleNavigateTo(nextKey)}
              disabled={!nextKey}
              className="inline-flex items-center gap-2 rounded-full border border-[#242BB0] px-6 py-2 text-[15px] font-semibold text-[#242BB0] tracking-wide transition disabled:opacity-40 cursor-pointer bg-white hover:bg-[#242BB0] hover:text-white disabled:hover:bg-white disabled:hover:text-[#242BB0]"
            >
              Next
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </section>
      

      {/* FAQ */}
      {faqs.length > 0 && (
        <section
          className="pt-6 pb-16 px-6"
          style={{ backgroundColor: "#f4f7ff" }}
        >
          <div className="w-full pt-2">
            <div className="mx-auto flex justify-center">
              <img
                src={treatmentIcon}
                alt="Treatment icon"
                className="h-[220px] w-[220px] object-contain"
              />
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
              style={{ backgroundColor: theme.headerText }}
            />
          </div>

          <div className="mx-auto w-full max-w-5xl space-y-6 rounded-[32px] bg-[#242BB0] p-6 shadow-[0_25px_60px_rgba(10,59,159,0.12)]">
            {faqs.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border bg-white"
                  style={{ borderColor: "#dce5ff" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition font-semibold ${
                      isOpen
                        ? "bg-white text-[#0a3b9f]"
                        : "text-[#1f3d78] bg-white"
                    }`}
                  >
                    {item.q}
                    <span
                      className="text-xl font-bold"
                      style={{ color: isOpen ? "#ffffff" : theme.headerText }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-sm" style={{ color: theme.bodyText }}>
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
