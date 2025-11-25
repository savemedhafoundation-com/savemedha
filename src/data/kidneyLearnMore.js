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
  }),
  "acute-kidney-injury": createDetail({
    key: "acute-kidney-injury",
    name: "Acute Kidney Injury (AKI)",
    areaDescription: "sudden decline in kidney function",
    quickFacts: [
      "AKI can develop over hours to days from illness, dehydration, or toxins.",
      "Prompt treatment often restores function; monitoring fluids is critical.",
    ],
    symptoms: [
      { label: "Reduced urine output" },
      { label: "Swelling" },
      { label: "Nausea" },
      { label: "Confusion" },
      { label: "Fatigue" },
      { label: "Shortness of breath" },
    ],
  }),
  glomerulonephritis: createDetail({
    key: "glomerulonephritis",
    name: "Glomerulonephritis",
    areaDescription: "the glomeruli—tiny filters inside each kidney",
    quickFacts: [
      "Immune dysregulation can inflame glomeruli; calming the immune system is key.",
      "Sodium and protein tuning plus rest help reduce swelling and pressure.",
    ],
    symptoms: [
      { label: "Foamy urine" },
      { label: "Pink or cola-colored urine" },
      { label: "Facial swelling" },
      { label: "High blood pressure" },
      { label: "Fatigue" },
      { label: "Shortness of breath" },
    ],
  }),
  "polycystic-kidney-disease": createDetail({
    key: "polycystic-kidney-disease",
    name: "Polycystic Kidney Disease (PKD)",
    areaDescription: "kidneys developing multiple fluid-filled cysts",
    quickFacts: [
      "Inherited condition that enlarges kidneys and raises blood pressure risk.",
      "Hydration and blood pressure control slow cyst growth and protect tissue.",
    ],
    symptoms: [
      { label: "Flank or back pain" },
      { label: "Fullness in abdomen" },
      { label: "High blood pressure" },
      { label: "Frequent urination" },
      { label: "Kidney stones" },
      { label: "Blood in urine" },
    ],
  }),
  "kidney-stones": createDetail({
    key: "kidney-stones",
    name: "Kidney Stones (Nephrolithiasis)",
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
  }),
  "diabetic-nephropathy": createDetail({
    key: "diabetic-nephropathy",
    name: "Diabetic Nephropathy",
    areaDescription: "kidney filters damaged by high blood sugar",
    quickFacts: [
      "Long-term high glucose harms glomeruli; tight sugar and pressure control slow damage.",
      "Protein in urine can be an early warning; routine labs catch changes sooner.",
    ],
    symptoms: [
      { label: "Foamy urine" },
      { label: "Swelling in legs/ankles" },
      { label: "High blood pressure" },
      { label: "Fatigue" },
      { label: "Nausea" },
      { label: "Sleep issues" },
    ],
  }),
  "hypertensive-nephropathy": createDetail({
    key: "hypertensive-nephropathy",
    name: "Hypertensive Nephropathy",
    areaDescription: "kidney vessels stressed by high blood pressure",
    quickFacts: [
      "Chronic high pressure scars kidney vessels and reduces filtration.",
      "Salt moderation, movement, and stress relief lower strain on nephrons.",
    ],
    symptoms: [
      { label: "High blood pressure" },
      { label: "Headaches" },
      { label: "Swelling" },
      { label: "Fatigue" },
      { label: "Foamy urine" },
      { label: "Shortness of breath" },
    ],
  }),
  "lupus-nephritis": createDetail({
    key: "lupus-nephritis",
    name: "Lupus Nephritis",
    areaDescription: "autoimmune inflammation of kidney filters",
    quickFacts: [
      "Lupus can inflame glomeruli; immune calming and kidney protection go together.",
      "Sun safety, medication adherence, and nutrition help reduce flares.",
    ],
    symptoms: [
      { label: "Foamy urine" },
      { label: "Swelling in legs/face" },
      { label: "High blood pressure" },
      { label: "Joint pain" },
      { label: "Fatigue" },
      { label: "Rashes" },
    ],
  }),
  "interstitial-nephritis": createDetail({
    key: "interstitial-nephritis",
    name: "Interstitial Nephritis",
    areaDescription: "inflammation of the kidney tubules and surrounding tissue",
    quickFacts: [
      "Often triggered by medications, infections, or autoimmune reactions.",
      "Stopping the trigger and hydrating can reverse damage in many cases.",
    ],
    symptoms: [
      { label: "Frequent urination" },
      { label: "Blood in urine" },
      { label: "Nausea" },
      { label: "Fever" },
      { label: "Rash" },
      { label: "Fatigue" },
    ],
  }),
  "renal-cell-carcinoma": createDetail({
    key: "renal-cell-carcinoma",
    name: "Renal Cell Carcinoma (Kidney Cancer)",
    heroImage: kidneyCare,
    areaDescription: "malignant growths in kidney tissue",
    quickFacts: [
      "Smoking, obesity, and some inherited conditions raise risk.",
      "Early detection improves options; blood in urine is a common warning sign.",
    ],
    symptoms: [
      { label: "Blood in urine" },
      { label: "Flank pain" },
      { label: "Unintended weight loss" },
      { label: "Fatigue" },
      { label: "Fever" },
      { label: "Lump in side" },
    ],
  }),
  "nephrotic-syndrome": createDetail({
    key: "nephrotic-syndrome",
    name: "Nephrotic Syndrome",
    areaDescription: "protein leakage through damaged glomeruli",
    quickFacts: [
      "Heavy proteinuria drives swelling; sodium and protein balance help.",
      "Managing cholesterol and pressure protects vessels and filters.",
    ],
    symptoms: [
      { label: "Foamy urine" },
      { label: "Swelling in legs/ankles" },
      { label: "Weight gain from fluid" },
      { label: "Fatigue" },
      { label: "Loss of appetite" },
      { label: "High cholesterol" },
    ],
  }),
  "urinary-tract-infections": createDetail({
    key: "urinary-tract-infections",
    name: "Urinary Tract Infections (UTIs)",
    areaDescription: "kidneys, ureters, bladder, and urethra",
    quickFacts: [
      "Recurring infections benefit from hydration habits, pH balance, and microbiome care.",
      "Preventive strategies reduce antibiotic cycles and protect kidney tissue.",
    ],
    symptoms: [
      { label: "Burning urination" },
      { label: "Frequent urge to urinate" },
      { label: "Cloudy urine" },
      { label: "Pelvic discomfort" },
      { label: "Low-grade fever" },
      { label: "Back pain" },
    ],
  }),
  "minimal-change-disease": createDetail({
    key: "minimal-change-disease",
    name: "Minimal Change Disease",
    areaDescription: "podocyte injury causing heavy protein leakage",
    quickFacts: [
      "Common cause of nephrotic syndrome in children; often steroid-responsive.",
      "Monitoring protein loss and swelling guides treatment and recovery.",
    ],
    symptoms: [
      { label: "Swelling" },
      { label: "Foamy urine" },
      { label: "Weight gain from fluid" },
      { label: "Fatigue" },
      { label: "Loss of appetite" },
      { label: "High cholesterol" },
    ],
  }),
  "alport-syndrome": createDetail({
    key: "alport-syndrome",
    name: "Alport Syndrome",
    areaDescription: "inherited condition affecting kidney filters, hearing, and vision",
    quickFacts: [
      "Genetic collagen changes weaken glomeruli and can impact ears and eyes.",
      "Early monitoring and blood pressure control help slow kidney decline.",
    ],
    symptoms: [
      { label: "Blood in urine" },
      { label: "Hearing loss" },
      { label: "Swelling" },
      { label: "High blood pressure" },
      { label: "Foamy urine" },
      { label: "Vision changes" },
    ],
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
