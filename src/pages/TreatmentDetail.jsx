import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KidneyBanner from "../components/KidneyBanner";
import NerveBanner from "../components/NerveBanner";
import cancerHeroVideo from "../assets/Photo/Sequence 01_1.mp4";
import ComingSoonVideo from "../assets/video/BANNER (1).mp4";
import { CANCER_DETAILS } from "../data/cancerLearnMore";
import { KIDNEY_DETAILS } from "../data/kidneyLearnMore";
import NaturalImmunotherapyButton from "../components/NaturalImmunotherapyButton";
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

const nerveTreatmentImages = Object.entries(
  import.meta.glob("/src/assets/nerve/nerve image/*.{png,jpg,jpeg,webp}", {
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
    "Hypertension Control",
    "Cholesterol Reset",
    "Arrhythmia Care",
    "Heart Failure Support",
    "Post-Bypass Rehab",
    "Valve Disorder Care",
    "Cardiac Fitness",
    "Stress Cardiology",
  ].map((name) => ({
    key: name.toLowerCase().replace(/\s+/g, "-"),
    name,
  })),

  nerve: [
    "Alzheimer’s Disease & Dementia",
    "Amyotrophic Lateral Sclerosis",
    "Brain Tumor",
    "Brain Aneurysm",
    "Cerebral Palsy",
    "Epilepsy (Seizure Disorders)",
    "Guillain-Barré Syndrome (GBS)",
    "Multiple Sclerosis (MS)",
    "Migraine & Chronic Headaches",
    "Myasthenia Gravis",
    "Neuropathy",
    "Parkinson’s Disease",
    "Stroke",
    "Spinal Cord Disorders",
    "Trigeminal Neuralgia",
  ].map((name, index) => ({
    key: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    image: nerveTreatmentImages[index],
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
};

const DEFAULT_SUB_TREATMENTS = [
  
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
    bubbleBg: "#FFE8E8",
    bubbleHover: "#E11D48",
    text: "#B91C1C",
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
};

/* --------------------------------------------------
   COMPONENT
---------------------------------------------------*/
export default function TreatmentDetail({ treatment, onNavigate }) {
  if (!treatment) return null;

  const subTreatments =
    SUB_TREATMENT_LIBRARY[treatment.key] || DEFAULT_SUB_TREATMENTS;

  const heroKeyword = treatment.title?.split(" ")[0]?.toUpperCase() || "TREATMENT";

  const isKidneyTreatment = treatment.key === "kidney";
  const isNerveTreatment = treatment.key === "nerve";
  const ctaLink = "https://dantura.com/";
  const theme =
    TREATMENT_THEME[treatment.key] || TREATMENT_THEME.default;

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
        <section className="relative h-[340px] w-full overflow-hidden">
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
            ) : treatment.key === "defult" ? (
              <video
                className="absolute h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={treatment.image}
              >
                <source src={ComingSoonVideo} type="video/mp4" />
              </video>
            ) : (
              <img
                src={treatment.image}
                alt={treatment.title}
                className="absolute h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </div>

          {isKidneyTreatment && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <KidneyBanner isKidneyTreatment={isKidneyTreatment} />
            </div>
          )}

          {isNerveTreatment && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <NerveBanner isNerveTreatment={isNerveTreatment} />
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

          <div className="text-center space-y-3">
            <h2 className="font-koho text-4xl font-semibold uppercase">
              {heroKeyword}{" "}
              <span style={{ color: theme. bubbleHover }}>TREATMENTS</span>:
            </h2>
            <div
              className="mx-auto h-1 w-32 rounded-full"
              style={{ backgroundColor: theme.bubbleHover }}
            />
          </div>

          {/* ---------- GRID ---------- */}
          <div className="mt-12 grid grid-cols-4 gap-8">
            {subTreatments.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col h-full rounded-tl-[28px] bg-white shadow-[0_25px_50px_rgba(15,23,42,0.12)] overflow-hidden hover:-translate-y-1.5 transition-transform"
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
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute -left-16 -top-16 h-60 w-60 rounded-full bg-[var(--bubble-bg)] transition-colors duration-300 group-hover:bg-[var(--bubble-hover)]" />







                  
                  <div className="absolute left-2 top-10 pr-4">
                    <p className="font-koho text-xl font-semibold uppercase text-[var(--text-color)] drop-shadow-md leading-5 transition-colors duration-300 group-hover:text-[var(--text-hover)]">
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
                    className="inline-flex items-center gap-2 rounded-full border border-[#74C425] px-5 py-2 text-xs uppercase text-[#0b2fa1] group-hover:bg-[#74C425] group-hover:text-white"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
       <section className="relative w-full px-4 md:px-10 lg:px-16">
  <div className="relative mx-auto  rounded-3xl overflow-hidden shadow-lg bg-white">
    {/* Background Shapes */}
    <div className="absolute inset-0">
      <img
        src={naturalBg}
        alt="background"
        className="w-full h-full object-cover opacity-95"
      />
    </div>

    {/* Content */}
    <div className="relative z-10 grid md:grid-cols-2 gap-6 py-12 px-10 md:px-16 items-center">
      
      {/* Left Text */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          Get Complete Recovery By
        </h2>

        <h3 className="text-4xl md:text-5xl font-bold text-[#74C425] mt-3">
          Natural Immunotherapy
        </h3>

        <a
          href={ctaLink}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-[#498D05] via-[#76C528] to-[#448602] text-white text-xl font-semibold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-md"
        >
          <span className="text-2xl">➜</span> START NOW
        </a>
      </div>

      {/* Right Decorative Graphics */}
      
    </div>
  </div>
</section>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
