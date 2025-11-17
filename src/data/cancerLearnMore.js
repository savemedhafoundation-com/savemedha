import bloodImg from "../assets/Photo/blood.png";
import boneImg from "../assets/Photo/bone.png";
import brainImg from "../assets/Photo/brain.png";
import breastImg from "../assets/Photo/breast.png";
import cervixImg from "../assets/Photo/cervix.png";
import colonImg from "../assets/Photo/colon.png";
import eyeImg from "../assets/Photo/eye.png";
import gallBladderImg from "../assets/Photo/gall bladder.png";
import kidneyImg from "../assets/Photo/kidney.png";
import liverImg from "../assets/Photo/liver.png";
import lungsImg from "../assets/Photo/lungs.png";
import oralImg from "../assets/Photo/oral.png";
import pancreasImg from "../assets/Photo/pancreas.png";
import prostateImg from "../assets/Photo/prostate.png";
import skinImg from "../assets/Photo/skin.png";
import stomachImg from "../assets/Photo/stomach.png";
import throatImg from "../assets/Photo/throat.png";
import thyroidImg from "../assets/Photo/thyroid.png";
import tongueImg from "../assets/Photo/tongue.png";
import cancerImg from "../assets/Photo/cancertreatment.png";
import boneSymptom3 from "../assets/bone cancer/Ellipse 15.png";
import boneSymptom8 from "../assets/bone cancer/Ellipse 15-1.png";
import boneSymptom7 from "../assets/bone cancer/icon2.png";
import boneSymptom4 from "../assets/bone cancer/Ellipse 16-1.png";
import boneSymptom5 from "../assets/bone cancer/Fatigue.png";
import boneSymptom2 from "../assets/bone cancer/Numbness.png";
import boneSymptom1 from "../assets/bone cancer/1.png";
import boneSymptom6 from "../assets/bone cancer/Weight loss.png";

const STORE_URLS = {
  blood: "https://dantura.com/product/platelet-booster/?v=13b5bfe96f3e",
  brain: "https://dantura.com/product/nerve-booster/?v=13b5bfe96f3e",
  breast: "https://dantura.com/product/tumor-breaker/?v=13b5bfe96f3e",
  cervix: "https://dantura.com/product/detox-booster/?v=13b5bfe96f3e",
  colon: "https://dantura.com/product/detox-booster/?v=13b5bfe96f3e",
  eye: "https://dantura.com/product/tumor-breaker/?v=13b5bfe96f3e",
  "gall-bladder": "https://dantura.com/product/spleen-booster/?v=13b5bfe96f3e",
  "kidney-cancer": "https://dantura.com/product/kidney-booster/?v=13b5bfe96f3e",
  "liver-cancer": "https://dantura.com/product/liver-booster/?v=13b5bfe96f3e",
  lungs: "https://dantura.com/product/heart-booster/?v=13b5bfe96f3e",
  oral: "https://dantura.com/product/tumor-breaker/?v=13b5bfe96f3e",
  pancreas: "https://dantura.com/product/pancrease-booster/?v=13b5bfe96f3e",
  prostate: "https://dantura.com/product/tumor-breaker/?v=13b5bfe96f3e",
  skin: "https://dantura.com/product/hair-root-booster/?v=13b5bfe96f3e",
  stomach: "https://dantura.com/product/detox-booster/?v=13b5bfe96f3e",
  throat: "https://dantura.com/product/thymus-booster/?v=13b5bfe96f3e",
  thyroid: "https://dantura.com/product/thyroid-booster/?v=13b5bfe96f3e",
  tongue: "https://dantura.com/product/detox-booster/?v=13b5bfe96f3e",
  default: "https://dantura.com/product/tumor-breaker/?v=13b5bfe96f3e",
};

const symptomImageModules = {
  ...import.meta.glob("../assets/cancer type img/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/symptoms -brain cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
};

const symptomImageEntries = Object.entries(symptomImageModules);
const fallbackSymptomImages = symptomImageEntries.map(([, value]) => value);

const normalizeKey = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getSymptomImage = (label, fallbackIndex = 0) => {
  const normalizedLabel = normalizeKey(label);
  if (!normalizedLabel) return null;

  const entry = symptomImageEntries.find(([path]) => {
    const fileName = path.split("/").pop()?.split(".")[0] ?? "";
    const normalizedFile = normalizeKey(fileName);

    return (
      normalizedFile === normalizedLabel ||
      normalizedFile.includes(normalizedLabel) ||
      normalizedLabel.includes(normalizedFile)
    );
  });

  if (entry) return entry[1];

  const fallback =
    fallbackSymptomImages[fallbackIndex % fallbackSymptomImages.length];
  return fallback ?? null;
};

const DEFAULT_SYMPTOMS = [
  { label: "Persistent fatigue" },
  { label: "Unexplained weight loss" },
  { label: "Recurring pain" },
  { label: "Frequent infections" },
  { label: "Sleep disturbance" },
  { label: "Mood changes" },
];

const buildGenericParagraphs = (name, areaDescription) => [
  `${name} develops when abnormal cells inside ${
    areaDescription || "the affected area"
  } mutate, divide, and refuse to die when they should. Over time they crowd out healthy tissue and disrupt how your body keeps you energized.`,
  "Our natural immunotherapy roadmap focuses on detox, immune-balancing nutrition, oxygen therapy, and emotional resilience so you can move through conventional care with less stress and more control.",
];

const buildStoreUrl = (key) => {
  const normalized = normalizeKey(key);
  return STORE_URLS[normalized] || STORE_URLS.default;
};

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
  bulletIntro,
  bulletHighlights,
  storeUrl,
  ctaUrl,
}) => {
  const resolvedStore = storeUrl ?? buildStoreUrl(key);

  return {
    key,
    name,
    heroImage: heroImage ?? cancerImg,
    cureBy: "Natural Immunotherapy",
    intro:
      intro ??
      `Learn how we decode ${name.toLowerCase()} and build gentle, daily actions that help your body fight back.`,
    descriptionTitle: `What is ${name}?`,
    heroQuote:
      heroQuote ??
      `"${name} starts inside ${areaDescription || "specific tissues"} and impacts how healthy cells grow, repair, and protect you."`,
    quickFacts:
      quickFacts ??
      [
        "Early-stage cases respond faster when lifestyle stressors are removed.",
        "Chronic inflammation fuels tumour growth, so calming the immune system is critical.",
      ],
    storeUrl: resolvedStore,
    ctaUrl: ctaUrl ?? resolvedStore,
    bodyParagraphs:
      bodyParagraphs ?? buildGenericParagraphs(name, areaDescription),
    stats:
      stats ??
      `Around the world, ${name.toLowerCase()} diagnoses continue to rise, but early personalized care dramatically improves outcomes.`,
    symptoms: symptoms ?? DEFAULT_SYMPTOMS,
    relatedTypes: relatedTypes ?? [],
    bulletIntro,
    bulletHighlights,
  };
};

export const CANCER_DETAILS = {
  blood: createDetail({
    key: "blood",
    name: "Blood Cancer",
    heroImage: bloodImg,
    areaDescription: "blood-forming tissues such as the bone marrow and lymphatic system",
    intro:
      "Our integrative oncology team supports you with nutrition, regenerative detox, and coaching so you can stay resilient through blood cancer treatment.",
    heroQuote:
      '"Blood Cancer is a type of cancer that starts in the blood-forming tissues of the body, such as the bone marrow, and affects the production and function of blood cells."',
    quickFacts: [
      "Acute blood cancers grow quickly and can rapidly crowd out healthy blood cells.",
      "Chronic blood cancers develop slowly yet still disturb immunity, oxygen transport, and healing.",
    ],
    bodyParagraphs: [
      "In blood cancer, abnormal or immature blood cells can keep multiplying. They may not be working properly and they may interrupt functioning of other organs. This can stop your blood from doing the things it normally does, like fighting infections or helping to repair your body.",
      "Our natural immunotherapy plan uses detox rituals, immune nutrition, oxygen therapy, and emotional coaching to help you rebuild strength alongside your oncology care team.",
    ],
    bulletIntro: "You might see blood cancers described as:",
    bulletHighlights: [
      "Acute – this means a fast-growing cancer.",
      "Chronic – this means a slower-growing cancer.",
    ],
    stats: "Global percentage of Blood cancer among all types of cancer = 9% to 10%.",
    symptoms: [
      "Fever & chills",
      "Weakness",
      "Loss of appetite",
      "Headaches",
      "Shortness of breath",
      "Weight loss",
      "Frequent infections",
      "Easy bruising",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: ["Leukemia", "Lymphoma", "Myeloma"],
  }),
  bone: createDetail({
    key: "bone",
    name: "Bone Cancer",
    heroImage: boneImg,
    areaDescription: "bone tissue and supportive connective structures",
    quickFacts: [
      "Tumours can weaken the structural integrity of bones, increasing fracture risk.",
      "Pain often intensifies at night or with activity and should be evaluated quickly.",
    ],
    bodyParagraphs: buildGenericParagraphs(
      "Bone Cancer",
      "the long bones, pelvis, or spine"
    ),
    stats:
      "Bone cancers are rare (<1% of cancers) yet need experienced teams to protect mobility and independence.",
    symptoms: [
      { label: "Deep bone pain" },
      { label: "Swelling or mass" },
      { label: "Fractures" },
      { label: "Limited motion" },
      { label: "Fatigue" },
      { label: "Weight loss" },
      { label: "Persistent night pain" },
      { label: "Numbness" },
    ].map((symptom, index) => ({
      ...symptom,
      img: [
        boneSymptom1,
        boneSymptom2,
        boneSymptom3,
        boneSymptom4,
        boneSymptom5,
        boneSymptom6,
        boneSymptom7,
        boneSymptom8,

      ][index % 8],
    })),
    relatedTypes: ["Osteosarcoma", "Chondrosarcoma", "Ewing Sarcoma", "Chordoma"],
  }),
  brain: createDetail({
    key: "brain",
    name: "Brain Cancer",
    heroImage: brainImg,
    areaDescription: "the brain or central nervous system",
    quickFacts: [
      "Symptoms depend on the tumour location and pressure on surrounding tissue.",
      "Swelling and inflammation can be reduced with diet, oxygenation, and rest.",
    ],
    bodyParagraphs: [
      "Brain tumours form when neurons or glial cells mutate and grow uncontrollably, pressing on delicate neural pathways.",
      "We focus on anti-inflammatory nutrition, lymphatic drainage, gentle movement, and mindset tools to keep cognition sharp.",
    ],
    stats: "Primary brain tumours account for roughly 3% of cancers but carry life-altering symptoms.",
    symptoms: [
      "Severe headaches",
      "Vision issues",
      "Speech changes",
      "Personality shifts",
      "Seizures",
      "Balance problems",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: ["Glioma", "Meningioma", "Pituitary Tumors"],
  }),
  breast: createDetail({
    key: "breast",
    name: "Breast Cancer",
    heroImage: breastImg,
    areaDescription: "breast ducts or lobules",
    quickFacts: [
      "Early detection with regular screenings dramatically improves survivorship.",
      "Hormonal balance, stress, and toxins play a role in recurrence risk.",
    ],
    stats: "Breast cancer is the most common cancer in women worldwide.",
    symptoms: [
      { label: "New lump" },
      { label: "Skin dimpling" },
      { label: "Nipple changes" },
      { label: "Swelling" },
      { label: "Pain" },
      { label: "Underarm nodes" },
    ],
    relatedTypes: ["Ductal", "Lobular", "Triple-negative", "Inflammatory"],
  }),
  cervix: createDetail({
    key: "cervix",
    name: "Cervix Cancer",
    heroImage: cervixImg,
    areaDescription: "the cervix and surrounding tissue",
    quickFacts: [
      "Most cases are linked to persistent HPV infection and immune imbalance.",
      "Regular Pap smears help catch abnormal cells before they progress.",
    ],
    stats: "Cervical cancer is preventable and highly treatable when detected early.",
    symptoms: [
      { label: "Abnormal bleeding" },
      { label: "Pelvic pain" },
      { label: "Painful intercourse" },
      { label: "Discharge" },
      { label: "Back pain" },
      { label: "Fatigue" },
    ],
    relatedTypes: ["Squamous Cell", "Adenocarcinoma"],
  }),
  colon: createDetail({
    key: "colon",
    name: "Colon Cancer",
    heroImage: colonImg,
    areaDescription: "the large intestine",
    quickFacts: [
      "Polyps can transform into cancer over time, so colonoscopies matter.",
      "Fiber-rich diets, hydration, and stress relief protect the gut terrain.",
    ],
    stats: "Colon cancer is the third most common cancer globally.",
    symptoms: [
      { label: "Change in bowel habits" },
      { label: "Blood in stool" },
      { label: "Abdominal cramps" },
      { label: "Bloating" },
      { label: "Weakness" },
      { label: "Weight loss" },
    ],
    relatedTypes: ["Colon Polyps", "Rectal Cancer", "Hereditary Syndromes"],
  }),
  eye: createDetail({
    key: "eye",
    name: "Eye Cancer",
    heroImage: eyeImg,
    areaDescription: "ocular structures such as the retina or iris",
    quickFacts: [
      "Vision changes, flashes of light, or spots warrant immediate screening.",
      "Light exposure, toxins, and immune weakness raise risk.",
    ],
    stats: "Ocular melanoma is rare yet can spread quickly when undetected.",
    symptoms: [
      { label: "Blurred vision" },
      { label: "Dark spots" },
      { label: "Loss of peripheral vision" },
      { label: "Eye pain" },
      { label: "Redness" },
      { label: "Floaters" },
    ],
    relatedTypes: ["Retinoblastoma", "Melanoma", "Lymphoma"],
  }),
  "gall-bladder": createDetail({
    key: "gall-bladder",
    name: "Gall Bladder Cancer",
    heroImage: gallBladderImg,
    areaDescription: "the gallbladder and bile ducts",
    quickFacts: [
      "Gallstones and chronic inflammation can trigger abnormal cell changes.",
      "Digestive support, anti-inflammatory foods, and detox keep bile flowing.",
    ],
    stats: "Gall bladder cancer is uncommon but often detected late; vigilance is crucial.",
    symptoms: [
      { label: "Upper belly pain" },
      { label: "Jaundice" },
      { label: "Loss of appetite" },
      { label: "Nausea" },
      { label: "Swollen abdomen" },
      { label: "Fever" },
    ],
    relatedTypes: ["Adenocarcinoma", "Cholangiocarcinoma"],
  }),
  "kidney-cancer": createDetail({
    key: "kidney-cancer",
    name: "Kidney Cancer",
    heroImage: kidneyImg,
    areaDescription: "the kidneys' filtering units",
    quickFacts: [
      "Smoking, obesity, and high blood pressure raise kidney cancer risk.",
      "Supporting detox pathways protects kidney tissue during therapy.",
    ],
    stats: "Kidney cancer accounts for about 2% of adult cancers worldwide.",
    symptoms: [
      { label: "Blood in urine" },
      { label: "Side pain" },
      { label: "Lump in abdomen" },
      { label: "Fatigue" },
      { label: "Fever" },
      { label: "Anemia" },
    ],
    relatedTypes: ["Renal Cell", "Wilms Tumor", "Transitional Cell"],
  }),
  "liver-cancer": createDetail({
    key: "liver-cancer",
    name: "Liver Cancer",
    heroImage: liverImg,
    areaDescription: "the liver's filtering and detox cells",
    quickFacts: [
      "Hepatitis infections, alcohol, and fatty liver disease increase risk.",
      "Liver-friendly meals and herbs aid detox and immunity.",
    ],
    stats: "The liver is one of the most common sites for both primary and metastatic cancer.",
    symptoms: [
      { label: "Upper abdominal pain" },
      { label: "Swollen belly" },
      { label: "Jaundice" },
      { label: "Itchy skin" },
      { label: "Nausea" },
      { label: "Fatigue" },
    ],
    relatedTypes: ["Hepatocellular", "Cholangiocarcinoma"],
  }),
  lungs: createDetail({
    key: "lungs",
    name: "Lungs Cancer",
    heroImage: lungsImg,
    areaDescription: "lung tissue and airways",
    quickFacts: [
      "Smoking remains the biggest risk, but pollution also plays a role.",
      "Breathwork, oxygen therapy, and detox aid lung recovery.",
    ],
    stats: "Lung cancer is responsible for the highest number of cancer deaths worldwide.",
    symptoms: [
      { label: "Chronic cough" },
      { label: "Chest pain" },
      { label: "Hoarseness" },
      { label: "Coughing blood" },
      { label: "Shortness of breath" },
      { label: "Weight loss" },
    ],
    relatedTypes: ["NSCLC", "Small-cell", "Mesothelioma"],
  }),
  oral: createDetail({
    key: "oral",
    name: "Oral Cancer",
    heroImage: oralImg,
    areaDescription: "the mouth, tongue, and inner cheeks",
    quickFacts: [
      "Tobacco, alcohol, and HPV infections elevate risk.",
      "Persistent mouth sores or patches should be evaluated quickly.",
    ],
    stats: "Oral cancers make up about 3% of all malignancies annually.",
    symptoms: [
      { label: "Mouth sore" },
      { label: "White or red patch" },
      { label: "Jaw pain" },
      { label: "Loose teeth" },
      { label: "Difficulty swallowing" },
      { label: "Voice changes" },
    ],
    relatedTypes: ["Tongue", "Gums", "Floor of mouth"],
  }),
  pancreas: createDetail({
    key: "pancreas",
    name: "Pancreas Cancer",
    heroImage: pancreasImg,
    areaDescription: "the pancreas and digestive enzymes",
    quickFacts: [
      "Often silent until advanced, making metabolic screening critical.",
      "Blood sugar balance and liver detox support the pancreas.",
    ],
    stats: "Pancreatic cancer accounts for about 3% of all cancers yet has an outsized mortality rate.",
    symptoms: [
      { label: "Upper abdominal pain" },
      { label: "Back pain" },
      { label: "Jaundice" },
      { label: "Loss of appetite" },
      { label: "Diabetes onset" },
      { label: "Weight loss" },
    ],
    relatedTypes: ["Exocrine", "Neuroendocrine"],
  }),
  prostate: createDetail({
    key: "prostate",
    name: "Prostate Cancer",
    heroImage: prostateImg,
    areaDescription: "the prostate gland",
    quickFacts: [
      "Most cases grow slowly, but some are aggressive and spread quickly.",
      "Hormone balance, pelvic floor care, and stress reduction matter.",
    ],
    stats: "Prostate cancer is the second most common cancer in men globally.",
    symptoms: [
      { label: "Frequent urination" },
      { label: "Weak urine flow" },
      { label: "Blood in semen" },
      { label: "Pelvic discomfort" },
      { label: "Erectile issues" },
      { label: "Bone pain (late)" },
    ],
    relatedTypes: ["Localized", "Advanced", "Castration-resistant"],
  }),
  skin: createDetail({
    key: "skin",
    name: "Skin Cancer",
    heroImage: skinImg,
    areaDescription: "layers of skin exposed to UV light",
    quickFacts: [
      "UV exposure and immune weakness make it easier for skin cells to mutate.",
      "Self-checks for new moles or changes catch issues early.",
    ],
    stats: "Skin cancer is the most frequently diagnosed cancer worldwide.",
    symptoms: [
      { label: "New mole" },
      { label: "Color changes" },
      { label: "Bleeding lesion" },
      { label: "Scaling patch" },
      { label: "Itching" },
      { label: "Non-healing sore" },
    ],
    relatedTypes: ["Basal Cell", "Squamous Cell", "Melanoma"],
  }),
  stomach: createDetail({
    key: "stomach",
    name: "Stomach Cancer",
    heroImage: stomachImg,
    areaDescription: "the stomach lining",
    quickFacts: [
      "Chronic gastritis, H. pylori infection, and salty diets increase risk.",
      "Eating slowly and supporting digestion keeps inflammation low.",
    ],
    stats: "Stomach cancer remains common in Asia and Eastern Europe.",
    symptoms: [
      { label: "Indigestion" },
      { label: "Bloating" },
      { label: "Feeling full quickly" },
      { label: "Vomiting blood" },
      { label: "Heartburn" },
      { label: "Weight loss" },
    ],
    relatedTypes: ["Gastric Adenocarcinoma", "GIST"],
  }),
  throat: createDetail({
    key: "throat",
    name: "Throat Cancer",
    heroImage: throatImg,
    areaDescription: "the pharynx or larynx",
    quickFacts: [
      "Persistent hoarseness or sore throat longer than 2 weeks needs attention.",
      "Stopping tobacco/alcohol and boosting immunity reduces recurrence.",
    ],
    stats: "Throat cancers affect roughly 1 in 60 men worldwide.",
    symptoms: [
      { label: "Hoarseness" },
      { label: "Throat pain" },
      { label: "Ear pain" },
      { label: "Difficulty swallowing" },
      { label: "Lump in neck" },
      { label: "Coughing blood" },
    ],
    relatedTypes: ["Pharyngeal", "Laryngeal", "HPV-related"],
  }),
  thyroid: createDetail({
    key: "thyroid",
    name: "Thyroid Cancer",
    heroImage: thyroidImg,
    areaDescription: "thyroid hormone-producing cells",
    quickFacts: [
      "Most thyroid cancers are highly treatable with excellent survival rates.",
      "Radiation exposure and iodine imbalance can trigger abnormal growth.",
    ],
    stats: "Thyroid cancer is the fastest-growing cancer diagnosis among women.",
    symptoms: [
      { label: "Neck lump" },
      { label: "Voice change" },
      { label: "Swallowing issues" },
      { label: "Throat tightness" },
      { label: "Neck swelling" },
      { label: "Cough" },
    ],
    relatedTypes: ["Papillary", "Follicular", "Medullary", "Anaplastic"],
  }),
  tongue: createDetail({
    key: "tongue",
    name: "Tongue Cancer",
    heroImage: tongueImg,
    areaDescription: "the tongue and floor of the mouth",
    quickFacts: [
      "HPV, tobacco, and alcohol exposure raise risk.",
      "Speech therapy and nutrition support swallowing during care.",
    ],
    stats: "Tongue cancer is a subset of oral cancers but needs specialized rehab plans.",
    symptoms: [
      { label: "Tongue sore" },
      { label: "Burning sensation" },
      { label: "Bleeding" },
      { label: "Earache" },
      { label: "Numbness" },
      { label: "Difficulty chewing" },
    ],
    relatedTypes: ["Anterior tongue", "Base of tongue"],
  }),
};

export const getCancerDetail = (key, fallbackName = "Cancer") => {
  if (!key) return null;
  const normalizedKey = key.toLowerCase();
  if (CANCER_DETAILS[normalizedKey]) {
    return CANCER_DETAILS[normalizedKey];
  }

  return createDetail({
    key: normalizedKey,
    name: fallbackName,
    heroImage: cancerImg,
    areaDescription: "the affected tissues",
  });
};
