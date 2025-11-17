import kidneyHero from "../assets/Photo/kidney.png";
import kidneyCare from "../assets/Photo/3.jpg";

const normalizeKey = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const createDetail = ({
  key,
  name,
  heroImage,
  areaDescription,
  intro,
  heroQuote,
  quickFacts,
  bodyParagraphs,
  stats,
  symptoms,
  relatedTypes,
}) => ({
  key,
  name,
  heroImage: heroImage ?? kidneyHero,
  cureBy: "Natural Immunotherapy",
  intro:
    intro ??
    `Discover how tailored kidney care can gently improve filtration, reduce inflammation, and protect long-term renal health.`,
  descriptionTitle: `What is ${name}?`,
  heroQuote:
    heroQuote ??
    `"${name} impacts how your kidneys filter waste, balance minerals, and regulate blood pressure—small daily habits create meaningful protection."`,
  quickFacts:
    quickFacts ??
    [
      "Hydration quality, electrolytes, and blood pressure have an outsized effect on kidney resilience.",
      "Calming inflammation and easing toxin load help filtration units recover and slow progression.",
    ],
  bodyParagraphs:
    bodyParagraphs ??
    [
      `${name} affects the kidneys' ability to filter waste and balance essential minerals. Over time, this can lead to fatigue, fluid retention, and blood pressure swings.`,
      "Our natural immunotherapy plan pairs gentle detox, mineral balancing, guided hydration, and stress reduction to protect each nephron while working alongside your primary nephrologist.",
    ],
  stats:
    stats ??
    `${name} cases are rising globally, but early lifestyle tuning can meaningfully slow decline and improve quality of life.`,
  symptoms:
    symptoms ??
    [
      { label: "Fatigue" },
      { label: "Swelling" },
      { label: "Changes in urination" },
      { label: "Nausea" },
      { label: "Back pain" },
      { label: "Itchy skin" },
    ],
  relatedTypes: relatedTypes ?? [],
});

export const KIDNEY_DETAILS = {
  "chronic-kidney-disease": createDetail({
    key: "chronic-kidney-disease",
    name: "Chronic Kidney Disease (CKD)",
    areaDescription: "the kidneys' filtration units (nephrons)",
    quickFacts: [
      "Often progresses silently—fatigue and swelling are common early signs.",
      "Blood pressure, blood sugar, and protein intake directly influence CKD speed.",
    ],
    stats:
      "Worldwide CKD affects an estimated 10% of adults; slowing decline early improves outcomes dramatically.",
    symptoms: [
      { label: "Swelling in legs/ankles" },
      { label: "Foamy urine" },
      { label: "Fatigue" },
      { label: "Muscle cramps" },
      { label: "High blood pressure" },
      { label: "Sleep issues" },
    ],
    relatedTypes: ["Stages 1-5 CKD", "Diabetic Kidney Disease", "Hypertensive CKD"],
  }),
  "dialysis-support": createDetail({
    key: "dialysis-support",
    name: "Dialysis Support",
    heroImage: kidneyCare,
    areaDescription: "blood filtration through hemodialysis or peritoneal dialysis",
    quickFacts: [
      "Nutrient timing and fluid balance reduce cramping and fatigue during sessions.",
      "Targeted electrolytes and gentle movement improve recovery between treatments.",
    ],
    bodyParagraphs: [
      "Dialysis steps in when kidneys cannot adequately filter waste and fluid. Comfort and stability depend on careful nutrition, hydration discipline, and symptom relief.",
      "We align meals, minerals, and rest cycles with your dialysis schedule to lower nausea, cramping, and energy crashes.",
    ],
    stats:
      "Dialysis patients often feel best with individualized nutrition and recovery plans; small tweaks reduce symptom flares.",
    symptoms: [
      { label: "Excess thirst" },
      { label: "Muscle cramps" },
      { label: "Low energy post-session" },
      { label: "Nausea" },
      { label: "Blood pressure swings" },
      { label: "Sleep disruption" },
    ],
    relatedTypes: ["Hemodialysis", "Peritoneal Dialysis"],
  }),
  "kidney-stone-care": createDetail({
    key: "kidney-stone-care",
    name: "Kidney Stone Care",
    areaDescription: "mineral crystals forming in the kidneys or urinary tract",
    quickFacts: [
      "Hydration patterns and mineral balance are the biggest levers to prevent recurrence.",
      "Specific dietary shifts (oxalate, sodium, calcium) depend on stone type.",
    ],
    stats:
      "Roughly 1 in 11 people experience stones; recurrence risk is high without tailored prevention.",
    symptoms: [
      { label: "Sharp flank pain" },
      { label: "Painful urination" },
      { label: "Blood in urine" },
      { label: "Nausea" },
      { label: "Urgent urination" },
      { label: "Groin discomfort" },
    ],
    relatedTypes: ["Calcium Oxalate", "Uric Acid", "Struvite", "Cystine"],
  }),
  "renal-hypertension": createDetail({
    key: "renal-hypertension",
    name: "Renal Hypertension",
    areaDescription: "renal arteries and filtration units affected by high blood pressure",
    quickFacts: [
      "Sodium sensitivity, stress, and vessel stiffness drive pressure spikes.",
      "Mineral-rich hydration, breathwork, and gentle cardio lower strain on kidneys.",
    ],
    stats:
      "Renal-driven hypertension worsens kidney decline; calming pressure protects filtration tissue.",
    symptoms: [
      { label: "Headaches" },
      { label: "Shortness of breath" },
      { label: "Nosebleeds" },
      { label: "Blurred vision" },
      { label: "Chest discomfort" },
      { label: "Swelling" },
    ],
    relatedTypes: ["Renovascular Hypertension", "Secondary Hypertension"],
  }),
  "transplant-recovery": createDetail({
    key: "transplant-recovery",
    name: "Transplant Recovery",
    areaDescription: "the transplanted kidney and immune regulation",
    quickFacts: [
      "Medication timing, hydration, and infection prevention are critical early on.",
      "Gut and liver support help metabolize immunosuppressants.",
    ],
    bodyParagraphs: [
      "After transplant, protecting the new kidney requires meticulous hydration, nutrition, and immune balance while monitoring for rejection or infection.",
      "We coordinate gentle detox, microbiome support, and stress management to keep the new organ safe alongside your transplant team.",
    ],
    stats:
      "The first year sets the tone for transplant longevity; supportive care reduces complications.",
    symptoms: [
      { label: "Swelling" },
      { label: "Fever or chills" },
      { label: "Pain near transplant site" },
      { label: "Reduced urine output" },
      { label: "High blood pressure" },
      { label: "Digestive upset" },
    ],
    relatedTypes: ["Immediate Recovery", "Long-Term Care"],
  }),
  "urinary-tract-health": createDetail({
    key: "urinary-tract-health",
    name: "Urinary Tract Health",
    areaDescription: "kidneys, ureters, bladder, and urethra",
    quickFacts: [
      "Recurring infections benefit from hydration habits, pH balance, and microbiome care.",
      "Preventive strategies reduce antibiotic cycles and protect kidney tissue.",
    ],
    stats:
      "UTIs are among the most common infections; prevention plans reduce recurrence and discomfort.",
    symptoms: [
      { label: "Burning urination" },
      { label: "Frequent urge to urinate" },
      { label: "Cloudy urine" },
      { label: "Pelvic discomfort" },
      { label: "Low-grade fever" },
      { label: "Back pain" },
    ],
    relatedTypes: ["Recurrent UTI", "Interstitial Cystitis", "Pyelonephritis"],
  }),
  "proteinuria-control": createDetail({
    key: "proteinuria-control",
    name: "Proteinuria Control",
    areaDescription: "protein leakage through damaged glomeruli",
    quickFacts: [
      "Blood pressure, blood sugar, and sodium control reduce protein leakage.",
      "Anti-inflammatory nutrition and rest protect the glomerular filter.",
    ],
    stats:
      "Proteinuria signals strain on the kidneys; early action slows progression to chronic disease.",
    symptoms: [
      { label: "Foamy urine" },
      { label: "Swelling" },
      { label: "Weight gain from fluid" },
      { label: "Fatigue" },
      { label: "Shortness of breath" },
      { label: "Nighttime urination" },
    ],
    relatedTypes: ["Microalbuminuria", "Macroalbuminuria"],
  }),
  "glomerulonephritis-relief": createDetail({
    key: "glomerulonephritis-relief",
    name: "Glomerulonephritis Relief",
    areaDescription: "the glomeruli—tiny filters inside each kidney",
    quickFacts: [
      "Immune dysregulation can inflame glomeruli; calming the immune system is key.",
      "Sodium and protein tuning plus rest help reduce swelling and pressure.",
    ],
    stats:
      "Both acute and chronic glomerulonephritis need careful monitoring; supportive care eases symptoms.",
    symptoms: [
      { label: "Foamy urine" },
      { label: "Pink or cola-colored urine" },
      { label: "Facial swelling" },
      { label: "High blood pressure" },
      { label: "Fatigue" },
      { label: "Shortness of breath" },
    ],
    relatedTypes: ["Acute GN", "Chronic GN", "IgA Nephropathy"],
  }),
};

export const getKidneyDetail = (key, fallbackName = "Kidney Care") => {
  if (!key) return null;

  const normalizedKey = normalizeKey(key);
  if (KIDNEY_DETAILS[normalizedKey]) {
    return KIDNEY_DETAILS[normalizedKey];
  }

  return createDetail({
    key: normalizedKey,
    name: fallbackName,
    heroImage: kidneyHero,
    areaDescription: "the kidneys and urinary system",
  });
};
