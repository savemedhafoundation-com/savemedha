import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import cancerHeroVideo from "../assets/Photo/Sequence 01_1.mp4";
import { CANCER_DETAILS } from "../data/cancerLearnMore";

const SUB_TREATMENT_LIBRARY = {
  cancer: Object.values(CANCER_DETAILS).map((entry) => ({
    key: entry.key,
    name: entry.name,
    image: entry.heroImage,
  })),
  kidney: [
    { key: "chronic-kidney-disease", name: "Chronic Kidney Disease" },
    { key: "dialysis-support", name: "Dialysis Support" },
    { key: "kidney-stone-care", name: "Kidney Stone Care" },
    { key: "renal-hypertension", name: "Renal Hypertension" },
    { key: "transplant-recovery", name: "Transplant Recovery" },
    { key: "urinary-tract-health", name: "Urinary Tract Health" },
    { key: "proteinuria-control", name: "Proteinuria Control" },
    { key: "glomerulonephritis-relief", name: "Glomerulonephritis Relief" },
  ],
  heart: [
    { key: "hypertension-control", name: "Hypertension Control" },
    { key: "cholesterol-reset", name: "Cholesterol Reset" },
    { key: "arrhythmia-care", name: "Arrhythmia Care" },
    { key: "heart-failure-support", name: "Heart Failure Support" },
    { key: "post-bypass-rehab", name: "Post-Bypass Rehab" },
    { key: "valve-disorder-care", name: "Valve Disorder Care" },
    { key: "cardiac-fitness", name: "Cardiac Fitness" },
    { key: "stress-cardiology", name: "Stress Cardiology" },
  ],
  nerve: [
    { key: "peripheral-neuropathy", name: "Peripheral Neuropathy" },
    { key: "sciatica-relief", name: "Sciatica Relief" },
    { key: "parkinsons-support", name: "Parkinson's Support" },
    { key: "multiple-sclerosis-care", name: "Multiple Sclerosis Care" },
    { key: "migraine-therapy", name: "Migraine Therapy" },
    { key: "stroke-recovery", name: "Stroke Recovery" },
    { key: "carpal-tunnel", name: "Carpal Tunnel" },
    { key: "autonomic-balance", name: "Autonomic Balance" },
  ],
  sma: [
    { key: "respiratory-strength", name: "Respiratory Strength" },
    { key: "mobility-therapy", name: "Mobility Therapy" },
    { key: "nutritional-support", name: "Nutritional Support" },
    { key: "adaptive-physiotherapy", name: "Adaptive Physiotherapy" },
    { key: "assistive-tech-fitment", name: "Assistive Tech Fitment" },
    { key: "family-training", name: "Family Training" },
    { key: "speech-swallow-care", name: "Speech & Swallow Care" },
    { key: "hydrotherapy-blocks", name: "Hydrotherapy Blocks" },
  ],
  other: [
    { key: "autoimmune-reset", name: "Autoimmune Reset" },
    { key: "metabolic-syndrome", name: "Metabolic Syndrome" },
    { key: "chronic-fatigue", name: "Chronic Fatigue" },
    { key: "pcos-hormone-care", name: "PCOS & Hormone Care" },
    { key: "gut-microbiome", name: "Gut & Microbiome" },
    { key: "detox-intensives", name: "Detox Intensives" },
    { key: "pain-management", name: "Pain Management" },
    { key: "sleep-restoration", name: "Sleep Restoration" },
  ],
};

const DEFAULT_SUB_TREATMENTS = [
  { name: "Personalised Detox" },
  { name: "Immune Balancing" },
  { name: "Nutrition Mapping" },
  { name: "Mind-Body Reset" },
  { name: "Pain Relief" },
  { name: "Stress Recovery" },
  { name: "Sleep Repair" },
  { name: "Metabolic Fitness" },
];

export default function TreatmentDetail({ treatment, onNavigate }) {
  if (!treatment) {
    return null;
  }

  const subTreatments =
    SUB_TREATMENT_LIBRARY[treatment.key] || DEFAULT_SUB_TREATMENTS;
  const heroKeyword =
    treatment.title?.split(" ")[0]?.toUpperCase() || "TREATMENT";
  const handleBack = () => onNavigate?.("treatment");
  const isCancerTreatment = treatment.key === "cancer";
  const isKidneyTreatment = treatment.key === "kidney";
  const isHeartTreatment = treatment.key === "heart";
  const isNerveTreatment = treatment.key === "nerve";
  const isSMATreatment = treatment.key === "sma";
  const isOtherTreatment = treatment.key === "other";
  const handleSubTreatmentSelect = (item) => {
    if (isCancerTreatment && item?.key) {
      onNavigate?.("cancer-detail", {
        cancerKey: item.key,
        title: item.name,
      });
      return;
    }

    if (isKidneyTreatment && item?.key) {
      onNavigate?.("kidney-detail", {
        kidneyKey: item.key,
        title: item.name,
      });
    }

    if (isHeartTreatment && item?.key) {
      onNavigate?.("heart-detail", {
        heartKey: item.key,
        title: item.name,
      });
      return;
    }

    if (isNerveTreatment && item?.key) {
      onNavigate?.("nerve-detail", {
        nerveKey: item.key,
        title: item.name,
      });
      return;
    }

    if (isSMATreatment && item?.key) {
      onNavigate?.("sma-detail", {
        smaKey: item.key,
        title: item.name,
      });
      return;
    }

    if (isOtherTreatment && item?.key) {
      onNavigate?.("other-detail", {
        otherKey: item.key,
        title: item.name,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <main className="pb-16">
        <section className="relative h-[340px] w-full overflow-hidden bg-[#05053c]">
          <div className="absolute inset-0 overflow-hidden">
            {isCancerTreatment ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={treatment.image}
              >
                <source src={cancerHeroVideo} type="video/mp4" />
              </video>
            ) : treatment.image ? (
              <img
                src={treatment.image}
                alt={treatment.title}
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-[#101f67]/80 to-[#0bd3f0]/70" />
          {!isCancerTreatment && (
            <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-4 text-center text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.5em] text-white/70">
                Save Medha Foundation
              </p>
              <h1 className="neon-text text-[120px] font-bold uppercase leading-none">
                {heroKeyword}
              </h1>
              <p className="text-lg font-semibold uppercase tracking-[0.35em] text-white/80">
                {treatment.title}
              </p>
            </div>
          )}
        </section>

        <section className="px-16 py-16">
          <div className="mb-8 flex justify-end">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-full border border-[#74C425] px-6 py-3 text-sm font-semibold uppercase text-[#0b2fa1] transition-colors hover:bg-[#74C425] hover:text-white"
            >
              Back to Treatments
            </button>
          </div>

          <div className="text-center space-y-3">
            <h2 className="font-koho text-4xl font-semibold uppercase text-slate-900">
              {heroKeyword} <span className="text-[#74C425]">TREATMENTS</span>:
            </h2>
            <div className="mx-auto h-1 w-32 rounded-full bg-[#74C425]" />
          </div>

          <div className="mt-12 grid grid-cols-4 gap-8">
            {subTreatments.map((entry, index) => {
              const item = typeof entry === "string" ? { name: entry } : entry;
              const cardImage = item.image ?? treatment.image;

              return (
                <div
                  key={`${item.name}-${index}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-tl-[28px] bg-white shadow-[0_25px_50px_rgba(15,23,42,0.12)] transition-transform hover:-translate-y-1.5"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    {cardImage ? (
                      <img
                        src={cardImage}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-300" />
                    )}
                    <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#74C425]" />
                    <div className="absolute left-6 top-10 pr-4">
                      <p className="font-koho text-xl font-semibold uppercase leading-5 text-white drop-shadow-md">
                        {item.name.split(" ").map((word) => (
                          <span className="block" key={`${item.name}-${word}`}>
                            {word}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end px-6 py-5">
                    <button
                      type="button"
                      onClick={() => handleSubTreatmentSelect(item)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#74C425] bg-white px-5 py-2 text-xs font-semibold uppercase text-[#0b2fa1] transition-colors group-hover:bg-[#74C425] group-hover:text-white"
                    >
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
