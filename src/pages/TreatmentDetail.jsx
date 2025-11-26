import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import KidneyBanner from "../components/KidneyBanner";
import cancerHeroVideo from "../assets/Photo/Sequence 01_1.mp4";
import { CANCER_DETAILS } from "../data/cancerLearnMore";
import { KIDNEY_DETAILS } from "../data/kidneyLearnMore";

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

  const heroKeyword = treatment.title?.split(" ")[0]?.toUpperCase() || "TREATMENT";

  const isKidneyTreatment = treatment.key === "kidney";

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
              {heroKeyword} <span className="text-[#74C425]">TREATMENTS</span>:
            </h2>
            <div className="mx-auto h-1 w-32 rounded-full bg-[#74C425]" />
          </div>

          {/* ---------- GRID ---------- */}
          <div className="mt-12 grid grid-cols-4 gap-8">
            {subTreatments.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col h-full rounded-tl-[28px] bg-white shadow-[0_25px_50px_rgba(15,23,42,0.12)] overflow-hidden hover:-translate-y-1.5 transition-transform"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image ?? treatment.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#74C425]" />
                  <div className="absolute left-2 top-10 pr-4">
                    <p className="font-koho text-xl font-semibold uppercase text-white drop-shadow-md leading-5">
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
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
