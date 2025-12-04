import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KidneyBanner from "../components/KidneyBanner";
import HeartBanner from "../components/HeartBanner";
import cancerHeroVideo from "../assets/Photo/Sequence 01_1.mp4";
import { CANCER_DETAILS } from "../data/cancerLearnMore";
import { KIDNEY_DETAILS } from "../data/kidneyLearnMore";
import naturalBg from "../assets/Photo/natural-bg.png.png";

/* ----------------------------------------------
   IMAGE LOADING - AUTO MAP & SORT (Kidney)
------------------------------------------------*/
const kidneyTreatmentImages = Object.entries(
  import.meta.glob("/src/assets/kidney/Kidney Treatments Images/*.{png,jpg,jpeg,webp}", {
    eager: true,
  })
)
  .map(([path, mod]) => {
    const src = typeof mod === "string" ? mod : mod?.default || path;
    const order = parseInt(path.split("/").pop()?.match(/^(\d+)/)?.[1] || 9999, 10);
    return { order, src };
  })
  .sort((a, b) => a.order - b.order)
  .map((i) => i.src);

/* ----------------------------------------------
   IMAGE LOADING - AUTO MAP & SORT (Heart)
------------------------------------------------*/
const heartTreatmentImages = Object.entries(
  import.meta.glob("/src/assets/heart/Heart Treatments Images/*.{png,jpg,jpeg,webp}", {
    eager: true,
  })
)
  .map(([path, mod]) => {
    const src = typeof mod === "string" ? mod : mod?.default || path;
    const order = parseInt(path.split("/").pop()?.match(/^(\d+)/)?.[1] || 9999, 10);
    return { order, src };
  })
  .sort((a, b) => a.order - b.order)
  .map((i) => i.src);

/* ----------------------------------------------
   SUB-TREATMENT LIBRARY
------------------------------------------------*/
const SUB_TREATMENT_LIBRARY = {
  cancer: Object.values(CANCER_DETAILS).map((entry) => ({
    key: entry.key,
    name: entry.name,
    image: entry.heroImage,
  })),

  kidney: Object.values(KIDNEY_DETAILS).map((entry, index) => ({
    key: entry.key,
    name: entry.name,
    image: kidneyTreatmentImages[index] ?? entry.heroImage,
  })),

  heart: [
    "Coronary Artery Disease",
    "Heart Attack",
    "Heart Failure",
    "Arrhythmia",
    "Valvular Heart Disease",
    "Congenital Heart Disease",
    "Hypertensive Heart Disease",
    "Cardiomyopathy",
    "Pericardial Disease",
    "Rheumatic Heart Disease",
  ].map((name, index) => ({
    key: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    image: heartTreatmentImages[index],
  })),

  nerve: [
    "Peripheral Neuropathy",
    "Sciatica Relief",
    "Parkinson's Support",
    "Multiple Sclerosis Care",
    "Migraine Therapy",
    "Stroke Recovery",
    "Carpal Tunnel",
    "Autonomic Balance",
  ].map((name) => ({
    key: name.toLowerCase().replace(/\s+/g, "-"),
    name,
  })),

  sma: [
    "Respiratory Strength",
    "Mobility Therapy",
    "Nutritional Support",
    "Adaptive Physiotherapy",
    "Assistive Tech Fitment",
    "Family Training",
    "Speech & Swallow Care",
    "Hydrotherapy Blocks",
  ].map((name) => ({
    key: name.toLowerCase().replace(/\s+/g, "-"),
    name,
  })),

  other: [
    "Autoimmune Reset",
    "Metabolic Syndrome",
    "Chronic Fatigue",
    "PCOS & Hormone Care",
    "Gut & Microbiome",
    "Detox Intensives",
    "Pain Management",
    "Sleep Restoration",
  ].map((name) => ({
    key: name.toLowerCase().replace(/\s+/g, "-"),
    name,
  })),
};

const DEFAULT_SUB_TREATMENTS = [
  "Personalised Detox",
  "Immune Balancing",
  "Nutrition Mapping",
  "Mind-Body Reset",
  "Pain Relief",
  "Stress Recovery",
  "Sleep Repair",
  "Metabolic Fitness",
].map((name) => ({ key: name.toLowerCase(), name }));

/* ----------------------------------------------
   PER-TREATMENT COLOR THEMES
------------------------------------------------*/
const TREATMENT_THEME = {
  cancer: {
    bubbleBg: "#FCEBFF",
    bubbleHover: "#C425B4",
    text: "#C425B4",
    textHover: "#FFFFFF",
  },
  kidney: {
    bubbleBg: "#FFD1CDE5",
    bubbleHover: "#A04742",
    text: "#A04742",
    textHover: "#FFFFFF",
  },
  heart: {
    bubbleBg: "#FFC5D3E0",
    bubbleHover: "#A80129E0",
    text: "#A40027",
    textHover: "#FFFFFF",
  },
  nerve: {
    bubbleBg: "#E5F1FF",
    bubbleHover: "#2563EB",
    text: "#1D4ED8",
    textHover: "#FFFFFF",
  },
  sma: {
    bubbleBg: "#FFF6E5",
    bubbleHover: "#F97316",
    text: "#EA580C",
    textHover: "#FFFFFF",
  },
  other: {
    bubbleBg: "#F4F4F5",
    bubbleHover: "#111827",
    text: "#111827",
    textHover: "#FFFFFF",
  },
  default: {
    bubbleBg: "#FCEBFF",
    bubbleHover: "#C425B4",
    text: "#C425B4",
    textHover: "#FFFFFF",
  },
};

/* --------------------------------------------------
   CLEAN NAVIGATION ROUTE MAP
---------------------------------------------------*/
const NAVIGATION_MAP = {
  cancer: "cancer-detail",
  kidney: "kidney-detail",
  heart: "heart-detail",
  nerve: "nerve-detail",
  sma: "sma-detail",
  other: "other-detail",
};

/* --------------------------------------------------
   COMPONENT
---------------------------------------------------*/
export default function TreatmentDetail({ treatment, onNavigate }) {
  if (!treatment) return null;

  const subTreatments =
    SUB_TREATMENT_LIBRARY[treatment.key] || DEFAULT_SUB_TREATMENTS;

  const heroKeyword =
    treatment.title?.split(" ")[0]?.toUpperCase() || "TREATMENT";

  const isKidneyTreatment = treatment.key === "kidney";
  const isHeartTreatment = treatment.key === "heart";
  const ctaLink = "https://dantura.com/";
  const theme = TREATMENT_THEME[treatment.key] || TREATMENT_THEME.default;

  /* ----------------------------------------------
     CLEAN: SUB-TREATMENT CARD CLICK HANDLER
  ------------------------------------------------*/
  const handleSubTreatmentSelect = (item) => {
    const route = NAVIGATION_MAP[treatment.key];
    if (!route || !item.key) return;

    onNavigate?.(route, {
      [`${treatment.key}Key`]: item.key,
      title: item.name,
    });
  };

  /* ----------------------------------------------
     RENDER
  ------------------------------------------------*/
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <main className="pb-16">
        {/* ---------- HERO SECTION ---------- */}
        <section className="relative h-[380px] sm:h-[420px] lg:h-[460px] w-full overflow-hidden">
          <div className="absolute inset-0">
            {treatment.key === "cancer" ? (
              <video
                className="absolute h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={treatment.image}
              >
                <source src={cancerHeroVideo} type="video/mp4" />
              </video>
            ) : !isHeartTreatment ? (
              <img
                src={treatment.image}
                alt={treatment.title}
                className="absolute h-full w-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>

          {isKidneyTreatment && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <KidneyBanner isKidneyTreatment={isKidneyTreatment} />
            </div>
          )}
          {isHeartTreatment && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <HeartBanner isHeartTreatment={isHeartTreatment} />
            </div>
          )}
        </section>

        {/* ---------- CONTENT SECTION ---------- */}
        <section className="px-16 py-16">
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => onNavigate?.("treatment")}
              className="rounded-full border border-[#74C425] px-6 py-3 text-sm uppercase text-[#0b2fa1] hover:bg-[#74C425] hover:text-white"
            >
              Back to Treatments
            </button>
          </div>

          <div className="space-y-3 text-center">
            <h2 className="font-koho text-4xl font-semibold uppercase">
              {heroKeyword}{" "}
              <span style={{ color: theme.bubbleHover }}>TREATMENTS</span>:
            </h2>
            <div
              className="mx-auto h-1 w-32 rounded-full"
              style={{ backgroundColor: theme.bubbleHover }}
            />
          </div>

          {/* ---------- GRID ---------- */}
          {isHeartTreatment ? (
            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
              {subTreatments.map((item) => (
                <div
                  key={item.key}
                  className="group relative h-64 overflow-hidden rounded-2xl bg-white shadow-[0_22px_46px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-2"
                >
                  <img
                    src={item.image ?? treatment.image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7f0c2a]/35 via-[#7f0c2a]/35 to-transparent" />

                  <div className="absolute -left-15 -right-5 -top-12 h-40 w-70 rounded-full bg-[#ffc8d6]/90 transition-colors duration-300 group-hover:bg-[#c2183b]/90" />
                  <div className="absolute left-2 top-6 w-32 pr-4">
                    <p className="font-koho text-xl font-semibold uppercase leading-6 text-[#b1122f] drop-shadow transition-colors duration-300 group-hover:text-white">
                      {item.name.split(" ").map((word) => (
                        <span key={word} className="block">
                          {word}
                        </span>
                      ))}
                    </p>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <button
                      onClick={() => handleSubTreatmentSelect(item)}
                      className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase text-[#b1122f] shadow transition-colors duration-200 hover:bg-[#b1122f] hover:text-white"
                    >
                      Learn More
                      <span aria-hidden="true" className="text-base leading-none">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-4 gap-8">
              {subTreatments.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex h-full flex-col overflow-hidden rounded-tl-[28px] bg-white shadow-[0_25px_50px_rgba(15,23,42,0.12)] transition-transform hover:-translate-y-1.5"
                  style={{
                    "--bubble-bg": theme.bubbleBg,
                    "--bubble-hover": theme.bubbleHover,
                    "--text-color": theme.text,
                    "--text-hover": theme.textHover,
                  }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.image ?? treatment.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />

                    <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[var(--bubble-bg)] transition-colors duration-300 group-hover:bg-[var(--bubble-hover)]" />
                    <div className="absolute left-2 top-10 pr-4">
                      <p className="font-koho text-xl font-semibold uppercase leading-5 text-[var(--text-color)] drop-shadow-md transition-colors duration-300 group-hover:text-[var(--text-hover)]">
                        {item.name.split(" ").map((word) => (
                          <span key={word} className="block">
                            {word}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto px-6 py-5">
                    <button
                      onClick={() => handleSubTreatmentSelect(item)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#74C425] px-5 py-2 text-xs uppercase text-[#0b2fa1] transition-colors group-hover:bg-[#74C425] group-hover:text-white"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="relative w-full px-4 md:px-10 lg:px-16">
          <div className="relative mx-auto overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="absolute inset-0">
              <img
                src={naturalBg}
                alt="background"
                className="h-full w-full object-cover opacity-95"
              />
            </div>

            <div className="relative z-10 grid items-center gap-6 py-12 px-10 md:grid-cols-2 md:px-16">
              <div>
                <h2 className="text-4xl font-bold leading-tight text-black md:text-5xl">
                  Get Complete Recovery By
                </h2>

                <h3 className="mt-3 text-4xl font-bold text-[#74C425] md:text-5xl">
                  Natural Immunotherapy
                </h3>

                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#498D05] via-[#76C528] to-[#448602] px-10 py-4 text-xl font-semibold text-white shadow-md transition-transform hover:scale-105"
                >
                  <span className="text-2xl">➜</span> START NOW
                </a>
              </div>

              <div />
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
