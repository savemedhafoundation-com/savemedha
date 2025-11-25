import kidneyHero from "../assets/Photo/kidney.png";
import kidneyCare from "../assets/Photo/3.jpg";
const akiSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of AKI/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const ckdSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of CKD/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const pkdSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of PKD/Symptoms of PKD/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const diabeticNephropathySymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Diabetic Nephropathy/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const kidneyStoneSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Kidney Stones/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const glomeruloSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Glomerulonephritis/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const sortMediaEntries = (pathA, pathB) =>
  pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" });

export const AKI_SYMPTOM_MEDIA = Object.entries(akiSymptomImageModules)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const CKD_SYMPTOM_MEDIA = Object.entries(ckdSymptomImageModules)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const PKD_SYMPTOM_MEDIA = Object.entries(pkdSymptomImageModules)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const DIABETIC_NEPHROPATHY_SYMPTOM_MEDIA = Object.entries(
  diabeticNephropathySymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const KIDNEY_STONE_SYMPTOM_MEDIA = Object.entries(
  kidneyStoneSymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const GLOMERULONEPHRITIS_SYMPTOM_MEDIA = Object.entries(
  glomeruloSymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

const AKI_SYMPTOM_LABELS = [
  "Shortness of breath",
  "Swelling in legs, ankles, or around the eyes",
  "Confusion or mental fatigue",
  "Decreased urine output",
  "Nausea and chest pain in severe cases",
  "Irregular heartbeat",
];

const buildAkiSymptoms = () =>
  AKI_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: AKI_SYMPTOM_MEDIA[index] ?? null,
  }));

const CKD_SYMPTOM_LABELS = [
  "Weakness",
  "Swelling in ankles, feet, or hands",
  "Nausea",
  "Loss of appetite",
  "Frequent urination, especially at night",
  "High blood pressure",
];

const buildCkdSymptoms = () =>
  CKD_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: CKD_SYMPTOM_MEDIA[index] ?? null,
  }));

const GLOMERULONEPHRITIS_SYMPTOM_LABELS = [
  "Blood in the urine",
  "Foamy urine due to excess protein",
  "Swelling in the face, hands, feet, or abdomen",
  "High blood pressure",
  "Fatigue and weakness",
  "Headaches due to high BP",
];

const buildGlomerulonephritisSymptoms = () =>
  GLOMERULONEPHRITIS_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: GLOMERULONEPHRITIS_SYMPTOM_MEDIA[index] ?? null,
  }));

const PKD_SYMPTOM_LABELS = [
  "Blood in the urine",
  "Back or side pain due to enlarged kidneys or cyst rupture",
  "Frequent urinary tract infections (UTIs)",
  "High blood pressure",
  "Fatigue and weakness",
  "Kidney stones",
  "Swollen abdomen due to enlarged kidneys",
  "Fullness or heaviness in the abdomen",
];

const buildPkdSymptoms = () =>
  PKD_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: PKD_SYMPTOM_MEDIA[index] ?? null,
  }));

const KIDNEY_STONE_SYMPTOM_LABELS = [
  "Blood in the urine (pink, red, or brown discoloration)",
  "Severe pain in the back, sides, or lower abdomen",
  "Frequent and painful urination",
  "Nausea or vomiting",
  "Inability to urinate in extreme cases if stones block the urinary tract",
  "Cloudy or foul-smelling urine",
];

const buildKidneyStoneSymptoms = () =>
  KIDNEY_STONE_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: KIDNEY_STONE_SYMPTOM_MEDIA[index] ?? null,
  }));

const DIABETIC_NEPHROPATHY_SYMPTOM_LABELS = [
  "Protein in the urine (proteinuria, causing foamy urine)",
  "Muscle cramps",
  "Swelling in the legs, ankles, feet, or face due to fluid retention",
  "High blood pressure that becomes harder to control",
  "Fatigue and weakness",
  "Nausea, vomiting, or loss of appetite in advanced stages",
  "Frequent urination, especially at night",
  "Itching or dry skin",
];

const buildDiabeticNephropathySymptoms = () =>
  DIABETIC_NEPHROPATHY_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: DIABETIC_NEPHROPATHY_SYMPTOM_MEDIA[index] ?? null,
  }));

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
  intro: intro ?? "",
  descriptionTitle: `What is ${name}?`,
  heroQuote:
    heroQuote ??
    `"${name} impacts how your kidneys filter waste, balance minerals, and regulate blood pressureâsmall daily habits create meaningful protection."`,
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
    heroQuote:
      '" Chronic Kidney Disease is a long-lasting condition where kidneys slowly lose their ability to filter blood effectively."',
    quickFacts: [
      "Often progresses silentlyâfatigue and swelling are common early signs.",
      "Blood pressure, blood sugar, and protein intake directly influence CKD speed.",
    ],
    bodyParagraphs: [
      "CKD usually develops due to factors that damage the kidneys over time, like high blood pressure or diabetes, which strain these organs.",
      "Chronic Kidney Disease (CKD) progresses in stages, and without treatment, it can lead to serious complications. Since the kidneys regulate blood pressure, produce essential hormones, and filter waste, CKD can cause widespread health issues.",
    ],
    stats:
      "The global prevalence of Chronic Kidney Disease (CKD) is estimated to be around 10-15%.",
    symptoms: buildCkdSymptoms(),
  }),
  "acute-kidney-injury": createDetail({
    key: "acute-kidney-injury",
    name: "Acute Kidney Injury (AKI)",
    areaDescription: "sudden decline in kidney function",
    heroQuote:
      '" Acute Kidney Injury is a sudden loss of kidney function, unlike CKD, which develops gradually."',
    quickFacts: [
      "AKI can develop over hours to days from illness, dehydration, or toxins.",
      "Prompt treatment often restores function; monitoring fluids is critical.",
    ],
    bodyParagraphs: [
      "It often results from an injury, severe infection, dehydration, or a reaction to certain medications, which disrupts kidney function.",
      "AKI can be temporary if treated quickly, but severe cases can cause lasting damage.",
      "When kidneys fail suddenly, waste and fluid build up quickly, leading to severe health complications.",
    ],
    stats:
      "The global prevalence of Acute Kidney Injury (AKI) is estimated to be around 20-30%.",
    symptoms: buildAkiSymptoms(),
  }),
  glomerulonephritis: createDetail({
    key: "glomerulonephritis",
    name: "Glomerulonephritis",
    areaDescription: "the glomerulitiny filters inside each kidney",
    heroQuote:
      '" Glomerulonephritis is a condition characterized by inflammation of the glomeruli, the tiny filters in your kidneys responsible for removing waste and excess fluid from the blood."',
    bodyParagraphs: [
      "This condition can impair the kidneys' ability to filter properly, leading to various health complications.",
      "Glomerulonephritis can occur suddenly (acute) or develop gradually over time (chronic). It is often caused by infections, autoimmune disorders, or diseases that affect blood vessels, such as diabetes or high blood pressure.",
      "In severe cases, untreated glomerulonephritis can lead to kidney failure, requiring dialysis or a kidney transplant.",
    ],
    stats:
      "The global prevalence of glomerulonephritis is significant, contributing to about 10-15% of chronic kidney disease cases worldwide.",
    quickFacts: [
      "Immune dysregulation can inflame glomeruli; calming the immune system is key.",
      "Sodium and protein tuning plus rest help reduce swelling and pressure.",
    ],
    symptoms: buildGlomerulonephritisSymptoms(),
  }),
  "polycystic-kidney-disease": createDetail({
    key: "polycystic-kidney-disease",
    name: "Polycystic Kidney Disease (PKD)",
    areaDescription: "kidneys developing multiple fluid-filled cysts",
    heroQuote:
      '" Polycystic Kidney Disease (PKD) is a genetic disorder characterized by the growth of fluid-filled cysts in the kidneys."',
    quickFacts: [
      "Inherited condition that enlarges kidneys and raises blood pressure risk.",
      "Hydration and blood pressure control slow cyst growth and protect tissue.",
    ],
    bodyParagraphs: [
      "These cysts enlarge the kidneys and reduce their function over time, leading to chronic kidney disease or kidney failure in severe cases.",
      "PKD is primarily caused by inherited genetic mutations. It can be categorized into two types: Autosomal Dominant PKD (ADPKD), which is more common and appears later in life, and Autosomal Recessive PKD (ARPKD), a rarer form that often develops in infancy or childhood.",
    ],
    stats:
      "PKD affects millions of people globally and is one of the leading causes of kidney failure.",
    symptoms: buildPkdSymptoms(),
  }),
  "kidney-stones": createDetail({
    key: "kidney-stones",
    name: "Kidney Stones (Nephrolit hiasis)",
    areaDescription: "mineral crystals forming in the kidneys or urinary tract",
    heroQuote:
      '" Kidney Stones (Nephrolithiasis) is a condition in which hard mineral and salt deposits form in the kidneys."',
    quickFacts: [
      "Hydration patterns and mineral balance are the biggest levers to prevent recurrence.",
      "Specific dietary shifts (oxalate, sodium, calcium) depend on stone type.",
    ],
    bodyParagraphs: [
      "These stones can vary in size and may develop due to factors like dehydration, dietary habits, or an imbalance in urine composition.",
      "Kidney stones may remain in the kidney or travel through the urinary tract. Small stones might pass naturally, but larger stones can cause severe pain and may require medical intervention.",
    ],
    stats:
      "This condition is common worldwide, with a prevalence of 10-15% in adults, and it tends to recur if preventative measures are not taken.",
    symptoms: buildKidneyStoneSymptoms(),
  }),
  "diabetic-nephropathy": createDetail({
    key: "diabetic-nephropathy",
    name: "Diabetic Nephropathy",
    areaDescription: "kidney filters damaged by high blood sugar",
    heroQuote:
      '" Diabetic Nephropathy, also known as diabetic kidney disease, is a type of chronic kidney disease that develops as a complication of diabetes (both type 1 and type 2)."',
    quickFacts: [
      "Long-term high glucose harms glomeruli; tight sugar and pressure control slow damage.",
      "Protein in urine can be an early warning; routine labs catch changes sooner.",
    ],
    bodyParagraphs: [
      "It occurs when prolonged high blood sugar levels damage the small blood vessels in the kidneys, impairing their ability to filter waste and excess fluid from the blood.",
      "Diabetic nephropathy is one of the leading causes of kidney failure globally. While its progression can be slow, early detection and management are crucial to prevent severe complications.",
    ],
    stats:
      "Diabetic nephropathy remains a top driver of kidney failure worldwide—early blood sugar and pressure control are essential to slow progression.",
    symptoms: buildDiabeticNephropathySymptoms(),
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





