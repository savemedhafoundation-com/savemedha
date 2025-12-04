import heartHero from "../assets/Photo/hearttreatment.png";

const STORE_URL = "https://dantura.com/product/heart-booster/?v=13b5bfe96f3e";
const CTA_URL = "https://dantura.com/";

const symptomImageModules = import.meta.glob(
  "../assets/heart/Heart Treatments Images/Heart Symtoms/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

const symptomImageEntries = Object.entries(symptomImageModules).sort((a, b) =>
  a[0].localeCompare(b[0])
);

const normalizeKey = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const humanizeKey = (value = "") =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Heart Care";

const collapseSpaces = (value = "") => value.replace(/\s+/g, " ").trim();

const resolveSymptomImage = (folder, index) => {
  const targetFolder = `/${folder.toLowerCase()}/`;
  const normalizedTarget = `/${collapseSpaces(folder.toLowerCase())}/`;
  return (
    symptomImageEntries.find(([path]) => {
      const normalizedPath = path.toLowerCase();
      const normalizedPathSpaces = collapseSpaces(normalizedPath);
      const matchesFolder =
        normalizedPath.includes(targetFolder) ||
        normalizedPathSpaces.includes(normalizedTarget);
      if (!matchesFolder) return false;

      const fileName = path.split("/").pop() || "";
      return fileName.startsWith(`${index}.`);
    })?.[1] || null
  );
};

const buildSymptoms = (folder, labels) =>
  labels.map((label, idx) => ({
    label,
    img: resolveSymptomImage(folder, idx + 1),
  }));

const defaultHeroQuote = (name) =>
  `${name} impacts how effectively your heart pumps, nourishes vital organs, and responds to stress - targeted habits keep it resilient.`;

const defaultIntro = (name) =>
  `Learn how we support ${name.toLowerCase()} with anti-inflammatory nutrition, circulation support, and stress balance.`;

const createDetail = ({
  key,
  name,
  heroImage,
  intro,
  heroQuote,
  quickFacts,
  bodyParagraphs,
  stats,
  symptoms,
  relatedTypes,
  nitCauses,
  storeUrl,
  ctaUrl,
}) => ({
  key,
  name,
  heroImage: heroImage ?? heartHero,
  cureBy: "Natural Immunotherapy",
  intro: intro ?? defaultIntro(name),
  descriptionTitle: `What is ${name}?`,
  heroQuote: heroQuote ?? defaultHeroQuote(name),
  quickFacts:
    quickFacts ?? [
      "Circulation and inflammation control are key levers for heart recovery.",
      "Stress hormones and sleep patterns directly shape heart rhythm and blood pressure.",
    ],
  bodyParagraphs:
    bodyParagraphs ?? [
      `${name} can weaken your heart's ability to move blood efficiently. Symptoms often improve when nutrition, movement, and stress are tuned together.`,
      "We combine mineral balancing, breathwork, gentle cardio, and detox to ease workload on the heart alongside your cardiologist's plan.",
    ],
  stats:
    stats ??
    `${name} is common worldwide, but early lifestyle shifts can reduce events and improve quality of life.`,
  symptoms:
    symptoms ??
    [
      { label: "Chest discomfort" },
      { label: "Shortness of breath" },
      { label: "Fatigue" },
      { label: "Swollen legs" },
      { label: "Irregular heartbeat" },
      { label: "Dizziness" },
    ],
  relatedTypes: relatedTypes ?? [],
  nitCauses,
  storeUrl: storeUrl ?? STORE_URL,
  ctaUrl: ctaUrl ?? CTA_URL,
});

export const HEART_DETAILS = {
  "coronary-artery-disease": createDetail({
    key: "coronary-artery-disease",
    name: "Coronary Artery Disease (CAD)",
    heroQuote:
      "Coronary Artery Disease (CAD) is a long-term condition where the coronary arteries narrow due to plaque buildup, reducing blood flow to the heart.",
    quickFacts: [
      "Plaque buildup narrows coronary arteries and limits oxygen delivery.",
      "High cholesterol, high blood pressure, smoking, and diabetes damage vessels over time.",
      "Without care, CAD can lead to heart attacks or heart failure.",
      "It remains a leading cause of death worldwide.",
    ],
    bodyParagraphs: [
      "Coronary Artery Disease develops when cholesterol-rich plaque gradually stiffens and narrows the coronary arteries, reducing oxygen supply to heart muscle. Risk factors such as high cholesterol, high blood pressure, smoking, and diabetes accelerate vessel damage.",
      "If untreated, CAD can trigger heart attacks or heart failure, limiting the heart's ability to pump oxygen-rich blood to the body. Managing lipids, pressure, and lifestyle is essential to protect overall health.",
    ],
    stats:
      "CAD is a leading global cause of death, but early intervention improves outcomes and quality of life.",
    symptoms: buildSymptoms("Symptoms of Coronary Artery Disease", [
      "Chest pain or discomfort",
      "Shortness of breath",
      "Fatigue on exertion",
      "Dizziness or lightheadedness",
      "Heart palpitations or irregular heartbeat",
      "Irregular heartbeat",
    ]),
    nitCauses: {
      title:
        "What is the cause of Coronary Artery Disease (CAD) from the perspective of Natural Immunotherapy?",
      items: [
        "Breakdown of endothelial flow sensing",
        "Immune fatigue from chronic circulating irritants",
        "Arterial wall stiffness from mineral-collagen imbalance",
        "Mitochondrial weakness in vascular smooth muscle cells",
        "Lipoprotein miscommunication rather than \"bad cholesterol\"",
        "Autonomic nervous system overdrive",
        "Glycocalyx erosion (loss of the artery's \"velvet coat\")",
        "Microvascular stagnation surrounding the heart",
      ],
    },
  }),

  "heart-attack": createDetail({
    key: "heart-attack",
    name: "Heart Attack",
    heroQuote:
      "A heart attack (myocardial infarction) occurs when blood flow to the heart is blocked, depriving it of oxygen and causing damage to the heart muscle.",
    quickFacts: [
      "Most heart attacks stem from plaque rupture and blockage in coronary arteries (CAD).",
      "High blood pressure, smoking, diabetes, and high cholesterol raise the risk.",
      "Emergency care is critical to limit heart muscle damage and improve survival.",
    ],
    bodyParagraphs: [
      "A heart attack happens when blood flow to the heart suddenly stops, starving muscle of oxygen and causing injury. It usually follows coronary artery disease where plaque buildup ruptures and forms a clot. High blood pressure, smoking, diabetes, and high cholesterol accelerate that risk.",
      "A heart attack is a medical emergency that demands immediate care. Fast intervention restores blood flow, limits heart damage, and improves survival; without treatment it can lead to severe complications or death.",
    ],
    stats:
      "Rapid treatment lowers heart muscle loss and long-term complications; rehab and lifestyle care reduce recurrence.",
    symptoms: buildSymptoms("Symptoms of  Heart Attack", [
      "Chest pain or discomfort",
      "Pain spreading to the arms, neck, jaw, or back",
      "Shortness of breath",
      "Nausea or vomiting",
      "Cold sweat and dizziness",
    ]),
    nitCauses: {
      title:
        "What is the cause of Heart Attack from the perspective of Natural Immunotherapy?",
      items: [
        "Sudden failure of the heart's bioelectrical conductance grid",
        "Acute coronary micro-spasm triggered by autonomic shock",
        "Collapse of mitochondrial firing in heart muscle cells",
        "Acute hemodynamic turbulence in the coronary flow stream",
        "Breakdown of the heart's microvascular backup network",
        "Inflammatory flashpoint called cytokine snap",
        "Sudden loss of vagal-heart harmony",
        "Energetic breakdown of the pericardial field",
        "Rapid blood chemistry drift (acid-oxidative surge)",
      ],
    },
  }),

  "heart-failure": createDetail({
    key: "heart-failure",
    name: "Heart Failure",
    quickFacts: [
      "Heart failure is a weakened pump - either stiff (HFpEF) or dilated (HFrEF).",
      "Fluid balance, movement, and micronutrients help reduce congestion.",
    ],
    bodyParagraphs: [
      "Heart failure means the heart cannot pump or fill efficiently. Fluid backs up, causing swelling, breathlessness, and fatigue.",
      "Low-sodium, mineral-rich nutrition, daily walking, breath pacing, and sleep care reduce fluid overload and ease cardiac workload.",
    ],
    stats: "With guided routines, many people reduce symptoms and avoid repeat hospital stays.",
    symptoms: buildSymptoms("Symptoms of heart failure", [
      "Shortness of breath",
      "Swollen ankles or legs",
      "Rapid weight gain",
      "Persistent fatigue",
      "Nighttime coughing or breathlessness",
    ]),
    nitCauses: {
      title:
        "What is the cause of Heart Failure from the perspective of Natural Immunotherapy?",
      items: [
        "Microcirculatory congestion increases pressure and stiffness.",
        "Mitochondrial output in heart muscle drops, limiting pump power.",
        "Chronic inflammation scars and stiffens cardiac tissue.",
        "Electrolyte imbalances disrupt coordinated contractions.",
        "Poor sleep and stress hormones elevate blood pressure and fluid retention.",
      ],
    },
  }),

  arrhythmia: createDetail({
    key: "arrhythmia",
    name: "Arrhythmia",
    quickFacts: [
      "Arrhythmias arise from disrupted electrical signals in the heart.",
      "Electrolyte balance, vagal tone, and calm breathing support steady rhythm.",
    ],
    bodyParagraphs: [
      "Arrhythmias happen when the heart's electrical system misfires, causing palpitations, fluttering, or pauses.",
      "Magnesium-rich hydration, HRV-focused breathing, and stress reduction can calm irritated pathways alongside medical guidance.",
    ],
    stats: "Many arrhythmias improve with combined medical care, sleep quality, and mineral balance.",
    symptoms: buildSymptoms("Symptoms of Arrhythmia", [
      "Heart palpitations",
      "Fluttering sensations",
      "Lightheadedness",
      "Shortness of breath",
      "Chest pressure",
    ]),
    nitCauses: {
      title:
        "What is the cause of Arrhythmia from the perspective of Natural Immunotherapy?",
      items: [
        "Electrolyte instability alters cardiac ion channels.",
        "Vagal tone is disrupted by chronic stress and poor sleep.",
        "Inflammation around conduction tissue slows or misroutes signals.",
        "Mitochondrial fatigue reduces electrical stability.",
        "Environmental stimulants and toxins irritate rhythm pathways.",
      ],
    },
  }),

  "valvular-heart-disease": createDetail({
    key: "valvular-heart-disease",
    name: "Valvular Heart Disease",
    quickFacts: [
      "Valve narrowing (stenosis) or leakage (regurgitation) strains the heart.",
      "Circulation support and anti-inflammatory habits reduce progression risk.",
    ],
    bodyParagraphs: [
      "Damaged or stiff valves force the heart to work harder to move blood, causing breathlessness, fatigue, or swelling.",
      "Gentle cardio, anti-inflammatory foods, mineral support, and sleep care help circulation while medical teams manage valve health.",
    ],
    stats: "Monitoring and lifestyle care slow symptom progression and protect heart function.",
    symptoms: buildSymptoms("Symptoms of Valvular Heart Disease", [
      "Chest discomfort",
      "Shortness of breath",
      "Dizziness or fainting",
      "Swelling in ankles or feet",
      "Heart murmur or palpitations",
    ]),
    nitCauses: {
      title:
        "What is the cause of Valvular Heart Disease from the perspective of Natural Immunotherapy?",
      items: [
        "Calcium deposition and inflammation stiffen valve leaflets.",
        "Past infections or rheumatic injury scar valve tissue.",
        "Blood pressure and flow turbulence accelerate wear.",
        "Nutrient deficits slow valve repair and collagen integrity.",
        "Chronic toxin exposure weakens connective tissue resilience.",
      ],
    },
  }),

  "congenital-heart-disease": createDetail({
    key: "congenital-heart-disease",
    name: "Congenital Heart Disease",
    quickFacts: [
      "Structural heart differences present at birth affect flow and oxygenation.",
      "Nutrition, gentle activity, and calm breathing complement clinical care.",
    ],
    bodyParagraphs: [
      "Congenital heart differences change how blood moves through chambers and vessels, sometimes requiring surgery or ongoing monitoring.",
      "Supportive routines - nutrient-dense meals, gradual activity, and stress regulation - aid growth, energy, and recovery.",
    ],
    stats: "With modern care and daily support, many live full, active lives.",
    symptoms: buildSymptoms("Symptoms of Congenital Heart Disease", [
      "Rapid breathing or shortness of breath",
      "Poor weight gain or fatigue",
      "Cyanosis (bluish tint)",
      "Swelling in legs or abdomen",
      "Heart murmur",
    ]),
    nitCauses: {
      title:
        "What is the cause of Congenital Heart Disease from the perspective of Natural Immunotherapy?",
      items: [
        "Early developmental stressors alter heart structure and flow.",
        "Micronutrient gaps in pregnancy impact vessel and valve formation.",
        "Maternal inflammation or toxin exposure influences cardiac tissue.",
        "Genetic variants affect collagen and conduction pathways.",
        "Gut-immune imbalances shape lifelong inflammatory tone.",
      ],
    },
  }),

  "hypertensive-heart-disease": createDetail({
    key: "hypertensive-heart-disease",
    name: "Hypertensive Heart Disease",
    quickFacts: [
      "Persistent high blood pressure thickens and stiffens heart muscle.",
      "Mineral balance, stress control, and movement ease pressure load.",
    ],
    bodyParagraphs: [
      "Chronic high pressure forces the heart to thicken, stiffen, and eventually weaken, raising risks of arrhythmia and failure.",
      "Lower-sodium, potassium-rich meals, daily walking, breath pacing, and restorative sleep help reduce pressure and workload.",
    ],
    stats: "Better pressure control slows heart thickening and protects vessels.",
    symptoms: buildSymptoms("Symptoms of Hypertensive Heart Disease", [
      "Headaches or pressure",
      "Shortness of breath",
      "Chest discomfort",
      "Dizziness",
      "Fatigue or weakness",
    ]),
    nitCauses: {
      title:
        "What is the cause of Hypertensive Heart Disease from the perspective of Natural Immunotherapy?",
      items: [
        "Vascular stiffness from mineral imbalance and chronic stress.",
        "Endothelial irritation from toxins and poor sleep.",
        "Sympathetic overdrive elevates heart rate and pressure.",
        "Kidney-sodium handling disruption increases volume load.",
        "Inflammation and insulin resistance thicken vessel walls.",
      ],
    },
  }),

  cardiomyopathy: createDetail({
    key: "cardiomyopathy",
    name: "Cardiomyopathy",
    quickFacts: [
      "Cardiomyopathy alters heart muscle structure - dilated, hypertrophic, or restrictive.",
      "Metabolic support, mineral balance, and gentle conditioning aid function.",
    ],
    bodyParagraphs: [
      "Cardiomyopathy changes the heart's muscle, affecting how it fills or pumps. Causes include genetics, infections, toxins, or pressure load.",
      "Targeted nutrition, mitochondrial support, careful exercise, and stress regulation complement clinical therapies to protect heart muscle.",
    ],
    stats: "Consistent lifestyle plus medical care improves exercise tolerance and quality of life.",
    symptoms: buildSymptoms("Symptoms of Cardiomyopathy", [
      "Shortness of breath",
      "Leg or ankle swelling",
      "Chest discomfort",
      "Fatigue",
      "Dizziness or fainting",
    ]),
    nitCauses: {
      title:
        "What is the cause of Cardiomyopathy from the perspective of Natural Immunotherapy?",
      items: [
        "Mitochondrial energy drops weaken cardiac muscle.",
        "Inflammation or infections scar heart tissue.",
        "Genetic variants alter muscle fiber structure.",
        "Toxin or alcohol exposure injures myocardium.",
        "Electrolyte and nutrient deficits impair contraction.",
      ],
    },
  }),

  "pericardial-disease": createDetail({
    key: "pericardial-disease",
    name: "Pericardial Disease",
    quickFacts: [
      "Inflammation or fluid around the heart can cause pain and restrict filling.",
      "Anti-inflammatory habits and fluid balance support healing.",
    ],
    bodyParagraphs: [
      "Pericardial disease involves inflammation or fluid in the sac around the heart, causing sharp chest pain or pressure.",
      "Hydration, anti-inflammatory meals, calm breathing, and guided movement support recovery alongside medical treatment.",
    ],
    stats: "Most cases resolve with care; monitoring prevents constriction or recurrence.",
    symptoms: buildSymptoms("Symptoms of Pericardial Disease", [
      "Sharp chest pain",
      "Pain that worsens when lying down",
      "Shortness of breath",
      "Low-grade fever or fatigue",
      "Heart palpitations",
    ]),
    nitCauses: {
      title:
        "What is the cause of Pericardial Disease from the perspective of Natural Immunotherapy?",
      items: [
        "Viral or autoimmune inflammation irritates the pericardium.",
        "Fluid buildup increases pressure on heart chambers.",
        "Toxin and metabolic stress slow resolution of inflammation.",
        "Nutrient gaps limit tissue repair and collagen integrity.",
        "Stress and poor sleep prolong inflammatory signals.",
      ],
    },
  }),

  "rheumatic-heart-disease": createDetail({
    key: "rheumatic-heart-disease",
    name: "Rheumatic Heart Disease",
    quickFacts: [
      "Past rheumatic fever can scar valves, affecting flow and rhythm.",
      "Anti-inflammatory routines and infection prevention protect valves.",
    ],
    bodyParagraphs: [
      "Rheumatic heart disease stems from immune injury after strep infection, leaving valves scarred or narrowed.",
      "Dental hygiene, infection prevention, anti-inflammatory foods, and calm breathing help protect valves with medical care.",
    ],
    stats: "Consistent follow-up and lifestyle care slow valve damage and improve stamina.",
    symptoms: buildSymptoms("Symptoms of Rheumatic Heart Disease", [
      "Shortness of breath",
      "Chest discomfort",
      "Fatigue",
      "Swollen ankles",
      "Heart palpitations",
    ]),
    nitCauses: {
      title:
        "What is the cause of Rheumatic Heart Disease from the perspective of Natural Immunotherapy?",
      items: [
        "Autoimmune flare after strep damages valve tissue.",
        "Chronic inflammation stiffens and scars valve leaflets.",
        "Microcirculation and collagen repair are nutrient-limited.",
        "Recurrent infections sustain immune activation.",
        "Stress and poor sleep weaken immune balance and healing.",
      ],
    },
  }),
};

export const getHeartDetail = (key, fallbackName) => {
  if (!key) return null;
  const normalized = normalizeKey(key);
  if (HEART_DETAILS[normalized]) return HEART_DETAILS[normalized];

  return createDetail({
    key: normalized,
    name: fallbackName || humanizeKey(normalized),
  });
};
