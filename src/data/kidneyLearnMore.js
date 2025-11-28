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

const hypertensiveSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Hypertensive Nephropathy/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const lupusNephritisSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Lupus Nephritis/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const interstitialNephritisSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Interstitial Nephritis/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const renalCellCarcinomaSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Renal Cell Carcinoma/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const nephroticSyndromeSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Nephrotic Syndrome/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const utiSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of UTIs/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const mcdSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of MCD/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const alportSymptomImageModules = import.meta.glob(
  "../assets/kidney/Symptoms of Alport Syndrome/*.{png,jpg,jpeg,webp}",
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

export const HYPERTENSIVE_NEPHROPATHY_SYMPTOM_MEDIA = Object.entries(
  hypertensiveSymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const LUPUS_NEPHROPATHY_SYMPTOM_MEDIA = Object.entries(
  lupusNephritisSymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const INTERSTITIAL_NEPHRITIS_SYMPTOM_MEDIA = Object.entries(
  interstitialNephritisSymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const RENAL_CELL_CARCINOMA_SYMPTOM_MEDIA = Object.entries(
  renalCellCarcinomaSymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const NEPHROTIC_SYNDROME_SYMPTOM_MEDIA = Object.entries(
  nephroticSyndromeSymptomImageModules
)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const UTI_SYMPTOM_MEDIA = Object.entries(utiSymptomImageModules)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const MCD_SYMPTOM_MEDIA = Object.entries(mcdSymptomImageModules)
  .sort(([pathA], [pathB]) => sortMediaEntries(pathA, pathB))
  .map(([, value]) => value);

export const ALPORT_SYMPTOM_MEDIA = Object.entries(alportSymptomImageModules)
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

const HYPERTENSIVE_SYMPTOM_LABELS = [
  "Protein in the urine, leading to foamy urine (proteinuria)",
  "Swelling in the legs, ankles, feet, or face from fluid retention",
  "High blood pressure that becomes harder to control",
  "Headaches, dizziness, or visual disturbances",
  "Nausea, vomiting, or loss of appetite in advanced stages",
  "Unexplained weight gain due to fluid buildup",
  "Fatigue and weakness",
  "Chest pain or shortness of breath",
];

const buildHypertensiveNephropathySymptoms = () =>
  HYPERTENSIVE_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: HYPERTENSIVE_NEPHROPATHY_SYMPTOM_MEDIA[index] ?? null,
  }));

const LUPUS_NEPHROPATHY_SYMPTOM_LABELS = [
  "Foamy urine due to excess protein (proteinuria)",
  "Swelling in the legs, ankles, feet, or face due to fluid retention",
  "High blood pressure",
  "Joint pain and stiffness",
  "Nausea, vomiting, or loss of appetite in advanced stages",
  "Breathing issues",
  "Shortness of breath from fluid around the lungs",
  "Confusion or difficulty concentrating in severe cases",
];

const buildLupusNephritisSymptoms = () =>
  LUPUS_NEPHROPATHY_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: LUPUS_NEPHROPATHY_SYMPTOM_MEDIA[index] ?? null,
  }));

const INTERSTITIAL_NEPHRITIS_SYMPTOM_LABELS = [
  "Decreased urine output or difficulty urinating",
  "Swelling in the legs, ankles, feet, or face due to fluid retention",
  "Fever or rash, especially when triggered by an allergic reaction",
  "Fatigue and weakness",
  "Nausea, vomiting, or loss of appetite in advanced stages",
  "Confusion or mental fatigue from toxin buildup in severe cases",
];

const buildInterstitialNephritisSymptoms = () =>
  INTERSTITIAL_NEPHRITIS_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: INTERSTITIAL_NEPHRITIS_SYMPTOM_MEDIA[index] ?? null,
  }));

const RENAL_CELL_CARCINOMA_SYMPTOM_LABELS = [
  "Blood in the urine (hematuria)",
  "Persistent pain in the side or lower back",
  "Fever",
  "Fatigue and weakness",
  "Unexplained weight loss",
  "Lump or mass in the abdomen or side",
  "High blood pressure",
  "Cough or difficulty breathing",
];

const buildRenalCellCarcinomaSymptoms = () =>
  RENAL_CELL_CARCINOMA_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: RENAL_CELL_CARCINOMA_SYMPTOM_MEDIA[index] ?? null,
  }));

const NEPHROTIC_SYNDROME_SYMPTOM_LABELS = [
  "Severe swelling (edema)",
  "Foamy urine",
  "Weight gain",
  "Fatigue",
  "Loss of appetite",
  "Increased risk of infections",
  "Blood clots",
  "High cholesterol & triglycerides",
];

const buildNephroticSyndromeSymptoms = () =>
  NEPHROTIC_SYNDROME_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: NEPHROTIC_SYNDROME_SYMPTOM_MEDIA[index] ?? null,
  }));

const UTI_SYMPTOM_LABELS = [
  "Burning sensation during urination (dysuria)",
  "Frequent urge to urinate",
  "Cloudy or strong-smelling urine",
  "Blood in the urine (hematuria)",
  "Lower abdominal discomfort or pain",
  "Fever or chills",
];

const buildUtiSymptoms = () =>
  UTI_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: UTI_SYMPTOM_MEDIA[index] ?? null,
  }));

const MCD_SYMPTOM_LABELS = [
  "Severe swelling (edema)",
  "Foamy urine",
  "Weight gain",
  "Fatigue",
  "Loss of appetite",
  "Increased susceptibility to infections",
  "Low blood albumin levels",
  "Possible blood clots in severe cases",
];

const buildMcdSymptoms = () =>
  MCD_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: MCD_SYMPTOM_MEDIA[index] ?? null,
  }));

const ALPORT_SYMPTOM_LABELS = [
  "Blood in the urine (hematuria)",
  "Protein loss in urine (proteinuria)",
  "Progressive kidney failure",
  "Hearing loss",
  "Eye abnormalities",
  "Swelling (edema)",
];

const buildAlportSymptoms = () =>
  ALPORT_SYMPTOM_LABELS.map((label, index) => ({
    label,
    img: ALPORT_SYMPTOM_MEDIA[index] ?? null,
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
    name: "Glomerulo nephritis",
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
    heroQuote:
      '"Hypertensive Nephropathy, also known as hypertensive kidney disease, is a condition caused by chronic high blood pressure damaging the small blood vessels and tissues of the kidneys."',
    bodyParagraphs: [
      "Hypertensive nephropathy develops when persistently high blood pressure damages the kidney\'s delicate vessels and filtering tissues. This reduces their ability to clear waste, balance fluids, and regulate blood pressure.",
      "It is one of the leading causes of chronic kidney disease (CKD) and end-stage renal disease (ESRD) worldwide. Poorly controlled hypertension, diabetes, obesity, and genetic predisposition all increase the risk and speed of progression.",
      "Monitoring blood pressure closely, taking prescribed medications, and making lifestyle adjustments—such as reducing sodium, exercising regularly, and limiting stress—can slow kidney damage and protect long-term function.",
    ],
    stats:
      "Hypertensive nephropathy ranks among the top global causes of CKD and ESRD, making blood pressure control essential for kidney preservation.",
    quickFacts: [
      "Chronic hypertension scars and stiffens kidney vessels, reducing filtration capacity.",
      "Risk rises when blood pressure is poorly controlled or compounded by diabetes or obesity.",
    ],
    symptoms: buildHypertensiveNephropathySymptoms(),
  }),
  "lupus-nephritis": createDetail({
    key: "lupus-nephritis",
    name: "Lupus Nephritis",
    areaDescription: "autoimmune inflammation of kidney filters",
    heroQuote:
      '"Lupus nephritis is a serious complication of systemic lupus erythematosus (SLE), an autoimmune disease where the body\'s immune system mistakenly attacks its own tissues."',
    quickFacts: [
      "Autoimmune antibodies inflame the glomeruli, leading to protein loss, swelling, and rising blood pressure.",
      "Coordinated nephrology and rheumatology care, medication adherence, and trigger awareness help reduce flares.",
    ],
    bodyParagraphs: [
      "In lupus nephritis, the immune system targets the kidneys, causing inflammation and damage to the glomeruli, the structures responsible for filtering waste from the blood.",
      "Without treatment, this inflammation can progress to kidney dysfunction, chronic kidney disease (CKD), or even kidney failure, making early diagnosis critical.",
      "It typically affects people already living with SLE, and symptoms often surface within the first few years of their initial autoimmune diagnosis.",
    ],
    stats:
      "Lupus nephritis (LN) affects approximately 40-70% of people diagnosed with systemic lupus erythematosus (SLE) globally, with notable regional and demographic differences in prevalence.",
    symptoms: buildLupusNephritisSymptoms(),
  }),
  "interstitial-nephritis": createDetail({
    key: "interstitial-nephritis",
    name: "Interstitial Nephritis",
    areaDescription: "inflammation of the kidney tubules and surrounding tissue",
    heroQuote:
      '"Interstitial Nephritis is a kidney disorder characterized by inflammation of the kidney\'s interstitial tissue, the area surrounding the tubules."',
    bodyParagraphs: [
      "Interstitial Nephritis is a kidney disorder characterized by inflammation of the kidney's interstitial tissue, the area surrounding the tubules.",
      "This inflammation can impair the kidneys' ability to filter waste, regulate fluids, and maintain electrolyte balance, especially when the swelling constricts the neighboring tubules.",
      "It can be classified into two types: Acute Interstitial Nephritis (AIN), which has a sudden onset and is often caused by medications, infections, or autoimmune reactions; and Chronic Interstitial Nephritis (CIN), which develops gradually and may lead to long-term kidney damage.",
      "The condition is frequently triggered by medications, infections, or autoimmune diseases, and without timely care it can progress to chronic kidney disease (CKD) or kidney failure.",
    ],
    quickFacts: [
      "Medications, infections, and autoimmune diseases commonly trigger the inflammatory response.",
      "AIN has a sudden onset, while CIN develops gradually and may cause permanent kidney damage.",
      "Stopping the trigger, supporting hydration, and calming inflammation are key to preventing CKD.",
    ],
    stats:
      "Left unmanaged, interstitial nephritis can progress to chronic kidney disease or kidney failure, making early diagnosis and trigger removal critical.",
    symptoms: buildInterstitialNephritisSymptoms(),
  }),
  "renal-cell-carcinoma": createDetail({
    key: "renal-cell-carcinoma",
    name: "Renal Cell Carcinoma (Kidney Cancer)",
    heroImage: kidneyCare,
    areaDescription: "malignant growths in kidney tissue",
    heroQuote:
      '"It is the most common type of kidney cancer, originating in the lining of the tiny tubules that filter blood and produce urine."',
    bodyParagraphs: [
      "Renal Cell Carcinoma (RCC) begins in the lining of the kidney\'s microscopic tubules that filter blood and make urine, making it the most common kidney cancer seen in adults.",
      "Because it may not produce symptoms at first, RCC is frequently discovered incidentally during imaging tests performed for unrelated reasons.",
      "As tumors grow they can distort kidney tissue, spread to nearby blood vessels, and eventually metastasize to distant organs if left untreated.",
      "The exact cause is not always clear, yet smoking, obesity, high blood pressure, certain genetic syndromes, and a family history of kidney cancer all increase risk.",
    ],
    quickFacts: [
      "Often detected accidentally on imaging because early stages are silent.",
      "Tumors originate in the kidney tubules and may spread through blood and lymph if untreated.",
      "Smoking, obesity, hypertension, and family history are leading contributors to risk.",
    ],
    stats:
      "RCC represents roughly 85% of adult kidney cancers worldwide, underscoring the need for early imaging and risk-factor control.",
    symptoms: buildRenalCellCarcinomaSymptoms(),
  }),
  "nephrotic-syndrome": createDetail({
    key: "nephrotic-syndrome",
    name: "Nephrotic Syndrome",
    areaDescription: "protein leakage through damaged glomeruli",
    heroQuote:
      '"Nephrotic Syndrome is a kidney disorder that causes the body to excrete excessive protein in the urine due to damage to the filtering units (glomeruli)."',
    bodyParagraphs: [
      "This condition causes the kidneys to leak large amounts of protein into the urine, which lowers protein levels in the blood, triggers high cholesterol, and leads to fluid retention (edema).",
      "Rather than a single disease, nephrotic syndrome describes a cluster of symptoms that stem from underlying kidney damage or systemic conditions.",
      "It can affect both children and adults, and long-term monitoring is essential to prevent complications such as infections, blood clots, and chronic kidney disease.",
    ],
    quickFacts: [
      "Excess protein loss in urine leads to swelling, high cholesterol, and low blood protein.",
      "Nephrotic syndrome is a symptom group, not a standalone disease.",
      "Both children and adults may require ongoing care to keep complications in check.",
    ],
    symptoms: buildNephroticSyndromeSymptoms(),
  }),
  "urinary-tract-infections": createDetail({
    key: "urinary-tract-infections",
    name: "Urinary Tract Infections (UTIs)",
    areaDescription: "kidneys, ureters, bladder, and urethra",
    heroQuote:
      '"A Urinary Tract Infection (UTI) is a common infection that can affect any part of the urinary system, including the kidneys, ureters, bladder, or urethra."',
    bodyParagraphs: [
      "Most UTIs involve the lower urinary tract (bladder and urethra), but the infection can ascend to the kidneys (upper tract) and lead to more serious complications if untreated.",
      "They are primarily caused by bacteria, with Escherichia coli (E. coli) being the most common culprit, although viruses and fungi can occasionally be involved.",
      "Because women have shorter urethras, they experience UTIs more frequently, yet men, children, and older adults can also be affected, especially when hydration, hygiene, or immune health are compromised.",
    ],
    quickFacts: [
      "Lower-tract infections are most common, but kidney involvement can cause significant damage.",
      "E. coli from the gut accounts for the majority of UTIs.",
      "Women are at higher risk due to anatomy, though UTIs can affect any age or gender.",
    ],
    stats:
      "UTIs are among the most frequent bacterial infections worldwide, with women experiencing them far more often than men.",
    symptoms: buildUtiSymptoms(),
  }),
  "minimal-change-disease": createDetail({
    key: "minimal-change-disease",
    name: "Minimal Change Disease",
    areaDescription: "podocyte injury causing heavy protein leakage",
    heroQuote:
      '"Minimal Change Disease is a kidney disorder that primarily affects the glomeruli, causing significant protein loss in the urine (proteinuria) despite appearing nearly normal under a regular microscope."',
    quickFacts: [
      "Most common cause of nephrotic syndrome in children, though it can also affect adults.",
      "Likely linked to immune system dysfunction; kidneys can look normal under standard microscopy.",
      "Often responds well to corticosteroid treatment with minimal lasting scarring.",
    ],
    bodyParagraphs: [
      "Minimal Change Disease is a kidney disorder that primarily affects the glomeruli, causing significant protein loss in the urine (proteinuria) despite appearing nearly normal under a regular microscope.",
      "MCD is the most common cause of nephrotic syndrome in children, though it can also affect adults. The exact cause is unknown, but it is believed to involve immune system dysfunction.",
      "Unlike other kidney diseases, MCD does not cause significant scarring or structural damage to the kidneys, and it often responds well to corticosteroid treatment.",
    ],
    symptoms: buildMcdSymptoms(),
  }),
  "alport-syndrome": createDetail({
    key: "alport-syndrome",
    name: "Alport Syndrome",
    areaDescription: "inherited condition affecting kidney filters, hearing, and vision",
    heroQuote:
      '"Alport Syndrome is a rare genetic kidney disorder that affects the glomeruli, leading to progressive kidney disease, hearing loss, and eye abnormalities."',
    quickFacts: [
      "Genetic collagen changes weaken glomeruli and can impact ears and eyes.",
      "Early monitoring and blood pressure control help slow kidney decline.",
    ],
    bodyParagraphs: [
      "Alport Syndrome is a rare genetic kidney disorder that affects the glomeruli, leading to progressive kidney disease, hearing loss, and eye abnormalities.",
      "It is caused by mutations in the COL4A3, COL4A4, or COL4A5 genes, which are responsible for producing type IV collagen, a key structural protein in the kidneys, ears, and eyes.",
      "Alport Syndrome primarily affects males in its X-linked form, as they inherit a single faulty COL4A5 gene from their mother. Females can also develop the condition, but symptoms are usually milder.",
    ],
    symptoms: buildAlportSymptoms(),
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

export const KIDNEY_NIT_CAUSES = {
  "acute-kidney-injury": {
    title:
      "What is the cause of Acute Kidney Injury (AKI) from the perspective of Natural Immunotherapy",
    items: [
      "Sudden Immune Shock to Renal Tissue",
      "Abrupt Loss of Microvascular Stability",
      "Mitochondrial Crisis in Renal Cells",
      "Toxin Overload Triggering Immune Alarm",
      "Breakdown of Local Barriers and Rapid Immune Entry",
      "Systemic Stress Overwhelming Renal Defenses",
    ],
  },
  glomerulonephritis: {
    title:
      "What is the cause of Glomerulonephritis from the perspective of Natural Immunotherapy",
    items: [
      "Immune System Over-Alerting to Perceived Threats",
      "Glomerular Barrier as an “Inflammation Magnet”",
      "Immune Complex Overload or Mis-Clearing",
      "Mitochondrial Stress Inside Glomerular Cells",
      "Environmental & Lifestyle Triggers Amplifying Immune Load",
      "Gut–Immune–Kidney Axis Disruption",
      "Breakdown of Immune Tolerance Mechanisms",
    ],
  },
  "polycystic-kidney-disease": {
    title:
      "What is the cause of Polycystic Kidney Disease (PKD) from the perspective of Natural Immunotherapy",
    items: [
      "Genetic Blueprint Weakness as the Core Vulnerability",
      "Chronic Micro-Inflammation Accelerating Cyst Growth",
      "Immune Overactivation From Ongoing Tissue Stress",
      "Mitochondrial Dysfunction in Renal and Cyst-Lining Cells",
      "Metabolic & Hormonal Stress Amplifying Cystic Signaling",
      "Environmental Toxins as “Stress Amplifiers”",
      "Gut–Kidney–Immune Axis Imbalance",
    ],
  },
  "kidney-stones": {
    title:
      "What is the cause of Kidney Stones from the perspective of Natural Immunotherapy",
    items: [
      "Urinary Environment Becoming an “Inflammatory Terrain”",
      "Immune Activation in the Urinary Tract",
      "Mitochondrial Stress in Kidney Tubular Cells",
      "Toxin Load Overwhelming Renal Detox Pathways",
      "Gut–Kidney Axis Impairment Affecting Mineral Handling",
      "Chronic Dehydration as an Immune Stress Signal",
      "Metabolic and Hormonal Stress Accelerating Crystallization",
    ],
  },
  "diabetic-nephropathy": {
    title:
      "What is the cause of Diabetic Nephropathy from the perspective of Natural Immunotherapy",
    items: [
      "Chronic Glucose Stress Overloading Immune and Cellular Pathways",
      "Inflammation as the Real Accelerator of Kidney Damage",
      "Mitochondrial Exhaustion in High-Energy Kidney Cells",
      "Microvascular Breakdown Triggering Immune Escalation",
      "Insulin Resistance Creating Systemic Immune Irritation",
      "Advanced Glycation End Products (AGEs) as Immune Irritants",
    ],
  },
  "hypertensive-nephropathy": {
    title:
      "What is the cause of Hypertensive Nephropathy from the perspective of Natural Immunotherapy",
    items: [
      "Chronic Vascular Pressure as an Inflammatory Signal",
      "Microvascular Injury Leading to Immune Escalation",
      "Glomerular Barrier Strain → Chronic Repair Mode",
      "Mitochondrial Overload in Renal Cells",
      "Systemic Inflammation Feeding Local Kidney Damage",
      "Renin–Angiotensin System (RAS) Overdrive as an Immune Irritant",
      "Gut–Kidney–Vascular Axis Imbalance",
    ],
  },
  "chronic-kidney-disease": {
    title:
      "What is the cause of Chronic Kidney Disease (CKD) from the perspective of Natural Immunotherapy",
    items: [
      "Chronic Micro-Inflammation as the Primary Driver",
      "Immune Overactivation From Continuous Tissue Stress",
      "Mitochondrial Fatigue in Kidney Cells",
      "Environmental & Dietary Stress Loading the Immune System",
      "Gut–Kidney Axis Imbalance Feeding Systemic Inflammation",
      "The Kidney Shifts from Filtering to Constant Damage Control",
    ],
  },
  "lupus-nephritis": {
    title:
      "What is the cause of Lupus Nephritis from the perspective of Natural Immunotherapy",
    items: [
      "Systemic immune overactivation driving kidney involvement",
      "Immune complex overload becoming a filtration burden",
      "Breakdown of immune tolerance mechanisms",
      "Mitochondrial stress intensifying immune reactivity",
      "Environmental and toxin sensitivity amplifying immune load",
      "Gut–immune–kidney axis disruption",
      "Microvascular instability in the kidneys",
    ],
  },
  "interstitial-nephritis": {
    title:
      "What is the cause of Interstitial Nephritis from the perspective of Natural Immunotherapy",
    items: [
      "Immune irritation triggered by external or internal stressors",
      "Hypersensitive immune response in the renal interstitium",
      "Toxin or drug-induced inflammatory overload",
      "Mitochondrial stress inside tubular cells",
      "Gut–immune–kidney axis fueling chronic irritation",
      "Auto-inflammatory tendency from immune dysregulation",
      "Microvascular instability increasing immune activity",
    ],
  },
  "renal-cell-carcinoma": {
    title:
      "What is the cause of Renal Cell Carcinoma (Kidney Cancer) from the perspective of Natural Immunotherapy",
    items: [
      "Chronic inflammation creating a “pro-mutation environment”",
      "Toxin accumulation overloading renal detox pathways",
      "Mitochondrial breakdown leading to cellular transformation",
      "Immune surveillance fatigue and loss of tumor control",
      "Microvascular and oxygen imbalance supporting tumor growth",
      "Metabolic stress and insulin signaling dysregulation",
      "Gut–immune–kidney axis disruption elevating systemic inflammation",
      "Genetic vulnerability amplified by inflammatory terrain",
    ],
  },
  "nephrotic-syndrome": {
    title:
      "What is the cause of Nephrotic Syndrome from the perspective of Natural Immunotherapy",
    items: [
      "Immune dysregulation targeting the glomerular barrier",
      "Podocyte stress from inflammation and oxidative load",
      "Environmental and toxin sensitivity heightening immune activity",
      "Mitochondrial dysfunction weakening glomerular resilience",
      "Gut–immune–kidney axis imbalance sustaining flare-ups",
      "Loss of immune tolerance leading to over-alert glomeruli",
      "Microvascular instability altering filtration dynamics",
    ],
  },
  "urinary-tract-infections": {
    title:
      "What is the cause of Urinary Tract Infections (UTIs) from the perspective of Natural Immunotherapy",
    items: [
      "Immune defense weakening in the urinary mucosa",
      "Disruption of the microbiome in the urinary and vaginal ecosystem",
      "Chronic low-grade inflammation as a vulnerability factor",
      "Toxin burden irritating the urinary tract",
      "Mitochondrial stress weakening epithelial healing",
      "Gut–bladder axis imbalance reducing local resilience",
      "Hormonal and hydration influences shaping susceptibility",
    ],
  },
  "minimal-change-disease": {
    title:
      "What is the cause of Minimal Change Disease from the perspective of Natural Immunotherapy",
    items: [
      "Immune dysregulation as the central trigger damaging filtration balance",
      "Cytokine-induced podocyte dysfunction weakening the slit diaphragm",
      "Allergic or hypersensitivity patterns amplifying immune response",
      "Environmental toxins and irritants heightening immune reactivity",
      "Mitochondrial fragility in podocytes reducing cellular resilience",
      "Gut–immune–kidney axis imbalance sustaining inflammatory signaling",
      "Stress-hormone effects that skew immune calibration and barrier stability",
    ],
  },
  "alport-syndrome": {
    title:
      "What is the cause of Alport Syndrome from the perspective of Natural Immunotherapy",
    items: [
      "Innate Immune Vulnerability Triggered by Genetic Weakness",
      "Chronic Micro-Inflammation as a Progression Driver",
      "Mitochondrial Stress in Kidney Tissue",
      "Barrier Breakdown → Immune Overcompensation",
      "Environmental Stressors That Worsen the Genetic Vulnerability",
    ],
  },
};



