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
  bone: "https://dantura.com/product/bone-marrow-booster/?v=13b5bfe96f3e",
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
  ...import.meta.glob("../assets/symptoms of cervix cancer/**/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of Colon Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of Eye Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of GallBladder Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of Pancreatic Cancer/**/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of Kidney Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of  Liver Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of Lungs Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of Oral Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/symptoms of breast cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/Symptoms of Prostate Cancer/*.{png,jpg,jpeg,webp}", {
    eager: true,
    import: "default",
  }),
};

const symptomImageEntries = Object.entries(symptomImageModules);
const fallbackSymptomImages = symptomImageEntries.map(([, value]) => value);

const recoveryImageModules = import.meta.glob(
  "../assets/Patient's Gallery/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const buildRecoveryImages = (folderName) =>
  Object.entries(recoveryImageModules)
    .filter(([path]) => (folderName ? path.includes(folderName) : true))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([, value]) => value);

const ORAL_RECOVERY_IMAGES = buildRecoveryImages("Patient's Recovery Gallery");

const SYMPTOM_IMAGE_ALIASES = {
  "nausea-or-vomiting": {
    label: "nausea-and-vomiting",
    folder: "symptoms -brain cancer",
  },
  "abnormal-vaginal-bleeding": { label: "1", folder: "symptoms of cervix cancer" },
  "unusual-vaginal-discharge": { label: "2", folder: "symptoms of cervix cancer" },
  "pelvic-pain": { label: "3", folder: "symptoms of cervix cancer" },
  "urinary-symptoms": { label: "4", folder: "symptoms of cervix cancer" },
  "unexplained-weight-loss": { label: "5", folder: "symptoms of cervix cancer" },
  "heavy-prolonged-menstrual-bleeding": { label: "6", folder: "symptoms of cervix cancer" },
  "leg-swelling": { label: "7", folder: "symptoms of cervix cancer" },
  "pain-during-intercourse": { label: "8", folder: "symptoms of cervix cancer" },
  "presence-of-a-lump-in-the-breast-or-underarm": {
    label: "1",
    folder: "symptoms of breast cancer",
  },
  "changes-in-breast-size-or-shape": { label: "2", folder: "symptoms of breast cancer" },
  "skin-texture-changes-like-dimpling-or-puckering": {
    label: "3",
    folder: "symptoms of breast cancer",
  },
  "nipple-changes-such-as-inversion-or-discharge": {
    label: "4",
    folder: "symptoms of breast cancer",
  },
  "redness-swelling-or-thickening-of-the-breast-skin": {
    label: "5",
    folder: "symptoms of breast cancer",
  },
  "skin-dimpling-orange-peel-texture": {
    label: "6",
    folder: "symptoms of breast cancer",
  },
  "rectal-bleeding-or-blood-in-the-stool": {
    label: "1",
    folder: "Symptoms of Colon Cancer",
  },
  "abdominal-discomfort": { label: "2", folder: "Symptoms of Colon Cancer" },
  "jaundice-if-cancer-spreads-to-liver": { label: "3", folder: "Symptoms of Colon Cancer" },
  "unexplained-weight-loss-fatigue": {
    label: "4",
    folder: "Symptoms of Colon Cancer",
    matchFull: true,
  },
  "unexplained-weight-loss-and-fatigue": {
    label: "4",
    folder: "Symptoms of Colon Cancer",
    matchFull: true,
  },
  "constipation-diarrhea": { label: "5", folder: "Symptoms of Colon Cancer" },
  "iron-deficiency-anemia": { label: "6", folder: "Symptoms of Colon Cancer" },
  "abdominal-mass-or-lump": { label: "7", folder: "Symptoms of Colon Cancer" },
  "vomiting-due-to-blocked-intestine": {
    label: "8",
    folder: "Symptoms of Colon Cancer",
  },
  "vision-changes": { label: "1", folder: "Symptoms of Eye Cancer" },
  "eye-redness-or-irritation": { label: "2", folder: "Symptoms of Eye Cancer" },
  "bulging-eye": { label: "3", folder: "Symptoms of Eye Cancer" },
  "changes-in-the-pupil": { label: "4", folder: "Symptoms of Eye Cancer" },
  "abdominal-pain": { label: "1", folder: "Symptoms of GallBladder Cancer" },
  jaundice: { label: "2", folder: "Symptoms of GallBladder Cancer" },
  "unintentional-weight-loss": { label: "3", folder: "Symptoms of GallBladder Cancer" },
  "fever-and-fatigue": { label: "4", folder: "Symptoms of GallBladder Cancer" },
  "nausea-and-vomiting": { label: "5", folder: "Symptoms of GallBladder Cancer" },
  "bloating-and-abdominal-distension": {
    label: "6",
    folder: "Symptoms of GallBladder Cancer",
  },
  "loss-of-appetite": { label: "7", folder: "Symptoms of GallBladder Cancer" },
  "dark-urine-and-pale-gray-stools": {
    label: "8",
    folder: "Symptoms of GallBladder Cancer",
  },
  "abdominal-pain": { label: "1", folder: "Symptoms of Pancreatic Cancer" },
  jaundice: { label: "2", folder: "Symptoms of Pancreatic Cancer" },
  "digestive-problems": { label: "3", folder: "Symptoms of Pancreatic Cancer" },
  "loss-of-appetite": { label: "4", folder: "Symptoms of Pancreatic Cancer" },
  "new-onset-diabetes": { label: "5", folder: "Symptoms of Pancreatic Cancer" },
  fatigue: { label: "6", folder: "Symptoms of Pancreatic Cancer" },
  "blood-clots": { label: "7", folder: "Symptoms of Pancreatic Cancer" },
  "persistent-nausea-or-vomiting": {
    label: "8",
    folder: "Symptoms of Pancreatic Cancer",
  },
  "blood-in-the-urine-hematuria": {
    label: "1",
    folder: "Symptoms of Kidney Cancer",
  },
  "pain-in-the-side-or-lower-back": {
    label: "2",
    folder: "Symptoms of Kidney Cancer",
  },
  "high-blood-pressure-hypertension": {
    label: "3",
    folder: "Symptoms of Kidney Cancer",
  },
  "anemia-low-hemoglobin": {
    label: "4",
    folder: "Symptoms of Kidney Cancer",
  },
  "swelling-in-legs-or-ankles-edema": {
    label: "5",
    folder: "Symptoms of Kidney Cancer",
  },
  "night-sweats": { label: "6", folder: "Symptoms of Kidney Cancer" },
  "intermittent-fever": { label: "7", folder: "Symptoms of Kidney Cancer" },
  "shortness-of-breath": { label: "8", folder: "Symptoms of Kidney Cancer" },
  "losing-weight-without-trying": { label: "1", folder: "Symptoms of  Liver Cancer" },
  "enlarged-liver-or-spleen-hepatomegaly-splenomegaly": {
    label: "2",
    folder: "Symptoms of  Liver Cancer",
  },
  "upper-abdominal-pain": { label: "3", folder: "Symptoms of  Liver Cancer" },
  "general-weakness-and-fatigue": { label: "4", folder: "Symptoms of  Liver Cancer" },
  "jaundice-yellowing-of-skin-and-eyes": {
    label: "5",
    folder: "Symptoms of  Liver Cancer",
  },
  "itchy-skin": { label: "6", folder: "Symptoms of  Liver Cancer" },
  "abdominal-swelling-ascites": { label: "7", folder: "Symptoms of  Liver Cancer" },
  "right-shoulder-pain": { label: "8", folder: "Symptoms of  Liver Cancer" },
  pain: { label: "1", folder: "Symptoms of Oral Cancer" },
  "difficulty-swallowing": { label: "2", folder: "Symptoms of Oral Cancer" },
  swelling: { label: "3", folder: "Symptoms of Oral Cancer" },
  "unexplained-bleeding": { label: "4", folder: "Symptoms of Oral Cancer" },
  "persistent-or-changing-cough": {
    label: "1",
    folder: "Symptoms of Lungs Cancer",
  },
  "coughing-up-blood-hemoptysis": {
    label: "2",
    folder: "Symptoms of Lungs Cancer",
  },
  "shortness-of-breath-dyspnea": {
    label: "3",
    folder: "Symptoms of Lungs Cancer",
  },
  "persistent-chest-pain": {
    label: "4",
    folder: "Symptoms of Lungs Cancer",
  },
  "recurrent-respiratory-infections": {
    label: "5",
    folder: "Symptoms of Lungs Cancer",
  },
  "hoarseness-and-voice-changes": {
    label: "6",
    folder: "Symptoms of Lungs Cancer",
  },
  "weight-loss-and-fatigue": {
    label: "7",
    folder: "Symptoms of Lungs Cancer",
  },
  "physical-signs-finger-clubbing": {
    label: "8",
    folder: "Symptoms of Lungs Cancer",
  },
  "urinary-problems": { label: "1", folder: "Symptoms of Prostate Cancer" },
  "blood-in-urine-or-semen": {
    label: "2",
    folder: "Symptoms of Prostate Cancer",
  },
  "discomfort-in-the-pelvic-area": {
    label: "3",
    folder: "Symptoms of Prostate Cancer",
  },
  "needing-to-pee-more-frequently": {
    label: "4",
    folder: "Symptoms of Prostate Cancer",
  },
};

const normalizeKey = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getSymptomImage = (label, fallbackIndex = 0) => {
  const normalizedLabel = normalizeKey(label);
  if (!normalizedLabel) return null;

  const aliasConfig = SYMPTOM_IMAGE_ALIASES[normalizedLabel];
  const searchLabels = aliasConfig
    ? [aliasConfig.label, normalizedLabel].filter(Boolean)
    : [normalizedLabel];

  const findEntry = (preferredFolder) =>
    symptomImageEntries.find(([path]) => {
      if (preferredFolder && !path.includes(preferredFolder)) return false;

      const fileName = path.split("/").pop()?.split(".")[0] ?? "";
      const normalizedFile = normalizeKey(fileName);

      return searchLabels.some((candidate, idx) => {
        if (aliasConfig?.matchFull && idx === 0) {
          return normalizedFile === candidate;
        }
        return (
          normalizedFile === candidate ||
          normalizedFile.includes(candidate) ||
          candidate.includes(normalizedFile)
        );
      });
    });

  const entry =
    findEntry(aliasConfig?.folder) ||
    findEntry();

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
  recoveryImages,
}) => {
  const resolvedStore = storeUrl ?? buildStoreUrl(key);
  const resolvedRecoveryImages = Array.isArray(recoveryImages)
    ? recoveryImages.filter(Boolean)
    : [];

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
    recoveryImages: resolvedRecoveryImages,
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
      "Changes in mental status",
      "Nausea or vomiting",
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
      "Presence of a lump in the breast or underarm",
      "Changes in breast size or shape.",
      "Skin texture changes like dimpling or puckering.",
      "Nipple changes, such as Inversion or discharge.",
      "Redness, swelling, or thickening of the breast skin",
      "Skin dimpling (orange-peel texture)",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: [
      "Invasive Ductal Carcinoma (IDC)",
      "Invasive Lobular Carcinoma (ILC)",
      "Ductal Carcinoma In Situ (DCIS)",
      "Hormone Receptor-Positive Breast Cancer",
      "HER2-Positive Breast Cancer",
      "Triple-Negative Breast Cancer",
      "Paget's Disease of the Nipple",
      "Inflammatory Breast Cancer (IBC)",
    ],
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
      "Abnormal Vaginal Bleeding",
      "Unusual Vaginal Discharge",
      "Pelvic Pain",
      "Urinary Symptoms",
      "Unexplained Weight Loss",
      "Heavy, prolonged menstrual bleeding",
      "Leg swelling",
      "Pain during intercourse",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: ["Squamous Cell", "Adenocarcinoma"],
  }),
  colon: createDetail({
    key: "colon",
    name: "Colon Cancer",
    heroImage: colonImg,
    areaDescription: "the colon and rectum, key parts of the digestive system",
    intro:
      "\"Colon cancer, also known as colorectal cancer, develops in the colon or rectum, which are parts of the digestive system responsible for processing and eliminating waste.\"",
    bodyParagraphs: [
      "It typically starts as a small growth called a polyp, which can become cancerous over time. We focus on gut detox, fiber-rich nutrition, and anti-inflammatory rituals that support the colon's healing capacity.",
      "Colon cancer is one of the most common types of cancer worldwide, but it is also highly preventable with screening and lifestyle changes. Our protocols aim to keep bowels moving, inflammation low, and immunity strong during treatment.",
    ],
    stats: "Global percentage of Colon cancer among all types of cancer = 9% to 10%.",
    symptoms: [
      { label: "Rectal Bleeding or Blood in the Stool" },
      { label: "Abdominal Discomfort" },
      { label: "Jaundice (if cancer spreads to liver)" },
      { label: "Unexplained Weight Loss & Fatigue" },
      { label: "Constipation, Diarrhea" },
      { label: "Iron Deficiency Anemia" },
      { label: "Abdominal Mass or Lump" },
      { label: "Vomiting due to blocked intestine" },
    ].map((sym, index) => ({
      label: sym.label,
      img: sym.img ?? getSymptomImage(sym.label, index),
    })),
    relatedTypes: ["Colon Polyps", "Rectal Cancer", "Hereditary Syndromes"],
  }),
  eye: createDetail({
    key: "eye",
    name: "Eye Cancer",
    heroImage: eyeImg,
    areaDescription:
      "ocular structures such as the eyelids, conjunctiva, iris, retina, or orbit",
    quickFacts: [
      "Vision changes, flashes of light, or spots warrant immediate screening.",
      "Light exposure, toxins, and immune weakness raise risk.",
    ],
    stats: "Global percentage of Eye cancer among all types of cancer = 0.15% to 0.2%.",
    symptoms: [
      
      "Vision Changes",
      "Eye Redness or Irritation",
      "Bulging Eye",
      "Changes in the Pupil",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    bodyParagraphs: [
      "\"Eye cancer, also known as ocular cancer, refers to the development of tumors in the eye or surrounding structures.\"",
      "It can occur in different parts of the eye, including the eyelids, conjunctiva (the thin membrane covering the white part of the eye), iris, retina, or orbit (the bony socket that holds the eye). Common types include melanoma (which can occur in the uvea or conjunctiva), retinoblastoma (a rare cancer affecting the retina, usually in children), and squamous cell carcinoma (typically affecting the conjunctiva).",
    ],
    relatedTypes: ["Retinoblastoma", "Melanoma", "Squamous Cell Carcinoma"],
  }),
  "gall-bladder": createDetail({
    key: "gall-bladder",
    name: "Gall Bladder Cancer",
    heroImage: gallBladderImg,
    areaDescription:
      "the small pear-shaped bile-storing organ tucked beneath the liver on the right side of the abdomen",
    quickFacts: [
      "Gallstones, chronic inflammation, and bile duct issues significantly raise risk.",
      "Supporting bile flow with gentle detox and anti-inflammatory nutrition protects tissue.",
    ],
    stats: "Global percentage of Gallbladder cancer among all types of cancer = 0.7% to 1%.",
    bodyParagraphs: [
      "\"Gallbladder cancer is a relatively rare but serious malignancy that starts in the cells of the gallbladder, a small pear-shaped organ located beneath the liver.\"",
      "Your gallbladder sits just below the liver and stores bile — the digestive fluid your liver produces to break down fats.",
      "Gallbladder cancer often remains silent without symptoms in early stages, and the risk increases when gallstones or chronic gallbladder inflammation are present.",
    ],
    symptoms: [
      "Abdominal pain",
      "Jaundice",
      "Unintentional weight loss",
      "Fever and Fatigue",
      "Nausea and Vomiting",
      "Bloating and Abdominal Distension",
      "Loss of appetite",
      "Dark urine & pale/gray stools",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: [
      "Adenocarcinoma",
      "Squamous Cell",
      "Adenosquamous Carcinoma",
      "Small Cell Carcinoma",
      "Neuroendocrine Tumors (NETs)",
      "Sarcoma",
      "Lymphoma",
    ],
  }),
  "kidney-cancer": createDetail({
    key: "kidney-cancer",
    name: "Kidney Cancer",
    heroImage: kidneyImg,
    areaDescription:
      "the kidneys' filtering units that remove waste from blood and produce urine",
    quickFacts: [
      "\"Kidney cancer is the abnormal growth of cells in your kidney tissue. In time, these cells form a mass called a tumor.\"",
      "Healthy kidneys filter waste and create urine, but genetic or environmental changes can trigger uncontrolled cell growth.",
      "Malignant tumors can travel beyond the kidneys if not detected and treated early.",
    ],
    bodyParagraphs: [
      "\"Kidney cancer is the abnormal growth of cells in your kidney tissue. In time, these cells form a mass called a tumor.\"",
      "Kidneys filter waste products from the blood and produce urine; when normal kidney cells undergo changes that make them multiply uncontrollably, tumors form that may be benign or malignant.",
      "In cases of malignant kidney cancer, the cancerous cells can spread beyond the kidneys to other parts of the body if not detected and treated early.",
    ],
    stats: "Global percentage of Kidney cancer among all types of cancer = 2% to 3%.",
    symptoms: [
      "Blood in the urine (hematuria)",
      "Pain in the side or lower back",
      "High blood pressure (Hypertension)",
      "Anemia (Low hemoglobin)",
      "Swelling in legs or ankles (Edema)",
      "Night sweats",
      "Intermittent fever",
      "Shortness of breath",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: [
      "Renal Cell Carcinoma (RCC)",
      "Urothelial Carcinoma",
      "Wilms Tumor",
      "Renal Sarcoma",
    ],
  }),
  "liver-cancer": createDetail({
    key: "liver-cancer",
    name: "Liver Cancer",
    heroImage: liverImg,
    areaDescription: "the liver's detoxifying tissue and bile ducts",
    quickFacts: [
      "\"Liver cancer, also known as hepatic cancer, refers to the abnormal growth of cells in the liver that form tumors.\"",
      "It can originate in liver cells (primary) or arrive from other organs (metastatic).",
      "Chronic liver diseases like hepatitis B/C, cirrhosis, NAFLD, or toxin exposure raise risk.",
    ],
    bodyParagraphs: [
      "\"Liver cancer, also known as hepatic cancer, refers to the abnormal growth of cells in the liver, leading to the formation of tumors.\"",
      "It can originate as primary liver cancer in hepatocytes or bile duct cells (cholangiocarcinoma) or spread from other organs as metastatic disease.",
      "Chronic liver conditions such as cirrhosis, hepatitis B/C, NAFLD, excessive alcohol use, or aflatoxin exposure heighten risk, and early detection is critical because symptoms often appear late.",
    ],
    stats: "Global percentage of Liver cancer among all types of cancer = 4% to 5%.",
    symptoms: [
      "Losing weight without trying",
      "Enlarged liver or spleen (Hepatomegaly / Splenomegaly)",
      "Upper abdominal pain",
      "General weakness and fatigue",
      "Jaundice (Yellowing of skin and eyes)",
      "Itchy skin",
      "Abdominal swelling (Ascites)",
      "Right shoulder pain",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: ["Primary Liver Cancer", "Secondary (Metastatic) Liver Cancer"],
  }),
  lungs: createDetail({
    key: "lungs",
    name: "Lungs Cancer",
    heroImage: lungsImg,
    areaDescription: "lung tissue and airways",
    quickFacts: [
      "Lung cancer forms in the lining of the air passages and is the leading cause of cancer death worldwide.",
      "Small cell lung cancer accounts for about 15% of cases and tends to grow quickly; non-small cell lung cancer makes up roughly 85% and usually grows and spreads more slowly.",
      "Smoking drives most cases, while air pollution also contributes to risk and outcomes.",
    ],
    bodyParagraphs: [
      "Lung cancer is cancer that forms in tissues of the lung, usually in the cells that line the air passages. It is the leading cause of cancer death in both men and women because it is often detected after it has already spread.",
      "There are two main types: small cell lung cancer (SCLC) and non-small cell lung cancer (NSCLC). Small cell lung cancer is less common, accounting for about 15% of cases, but it tends to grow more quickly and is strongly associated with smoking.",
      "Non-small cell lung cancer is the most common type, making up about 85% of cases. It includes adenocarcinoma, squamous cell carcinoma, and large cell carcinoma, and these cancers generally grow and spread more slowly than small cell lung cancer.",
    ],
    stats: "Global percentage of Lungs cancer among all types of cancer = 11% to 13%.",
    symptoms: [
      "Persistent or Changing Cough",
      "Coughing Up Blood (Hemoptysis)",
      "Shortness of Breath (Dyspnea)",
      "Persistent Chest Pain",
      "Recurrent Respiratory Infections",
      "Hoarseness and Voice Changes",
      "Weight Loss and Fatigue",
      "Physical Signs (Finger Clubbing)",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: ["Small cell lung cancer (SCLC)", "Non-small cell lung cancer (NSCLC)"],
  }),
  oral: createDetail({
    key: "oral",
    name: "Oral Cancer",
    heroImage: oralImg,
    areaDescription: "the lips, tongue, gums, palate, tonsils, and back of the throat",
    quickFacts: [
      "Oral cancer starts in the tissues of the mouth or throat, most often in the squamous cells that line these areas.",
      "It can involve the lips, tongue, gums, floor and roof of the mouth (palate), tonsils, and the back of the throat (pharynx).",
      "Early treatment is critical because these cancers can spread to other parts of the head and neck.",
    ],
    bodyParagraphs: [
      "Oral cancer refers to cancers that develop in the tissues of the mouth or throat. It typically begins in the squamous cells that line these areas—flat cells that look like fish scales when viewed under a microscope.",
      "It includes cancers of the lips, tongue, gums, floor of the mouth, roof of the mouth (palate), tonsils, and the back of the throat (pharynx).",
      "These cancers often start in the lining cells and, if not treated early, can spread to nearby parts of the head and neck region.",
    ],
    stats: "Global percentage of Oral cancer among all types of cancer = 7% to 9%.",
    symptoms: [
      "Pain",
      "Difficulty swallowing",
      "Swelling",
      "Unexplained bleeding",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: [
      "Squamous Cell Carcinoma (SCC)",
      "Oral Melanoma",
      "Salivary Gland Cancer",
      "Lymphoma",
      "Sarcoma",
      "Kaposi’s Sarcoma",
      "Verrucous Carcinoma",
    ],
    recoveryImages: ORAL_RECOVERY_IMAGES,
  }),
  pancreas: createDetail({
    key: "pancreas",
    name: "Pancreas Cancer",
    heroImage: pancreasImg,
    areaDescription: "the pancreas and digestive enzymes",
    descriptionTitle: "What is Pancreatic Cancer ?",
    bodyParagraphs: [
      "Pancreatic cancer develops when abnormal cells in the pancreas grow uncontrollably, forming tumors.",
      "The pancreas is an organ located behind the stomach that plays a crucial role in digestion and hormone regulation.",
      "Pancreatic cancer is often difficult to detect early and tends to spread rapidly to nearby organs and tissues.",
      "The two main types of pancreatic cancer are exocrine tumors, which make up the majority of cases and arise from the cells that produce digestive enzymes (such as pancreatic adenocarcinoma), and endocrine tumors (such as pancreatic neuroendocrine tumors), which are less common but originate from hormone-producing cells in the pancreas.",
    ],
    quickFacts: [
      "Often silent until advanced, making metabolic screening critical.",
      "Blood sugar balance and liver detox support the pancreas.",
    ],
    stats:
      "Global percentage of Pancreatic cancer among all types of cancer = 2.5% to 3%.",
    symptoms: [
      "abdominal pain",
      "Jaundice",
      "Digestive Problems",
      "Loss of Appetite",
      "New-Onset Diabetes:",
      "Fatigue",
      "Blood Clots",
      "Persistent Nausea or Vomiting",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: [
      "Exocrine tumors",
      "Pancreatic adenocarcinoma",
      "Endocrine tumors",
      "Pancreatic neuroendocrine tumors",
    ],
  }),
  prostate: createDetail({
    key: "prostate",
    name: "Prostate Cancer",
    heroImage: prostateImg,
    areaDescription: "the prostate gland",
    descriptionTitle: "What is Prostate Cancer ?",
    bodyParagraphs: [
      "Prostate cancer is a type of cancer that develops in the prostate gland, which is a small walnut-shaped gland located in men just below the bladder.",
      "It develops when cells in the prostate mutate and begin to grow uncontrollably, forming a tumor.",
      "If not detected early and treated, prostate cancer can spread to other parts of the body.",
    ],
    quickFacts: [
      "Most cases grow slowly, but some are aggressive and spread quickly.",
      "Hormone balance, pelvic floor care, and stress reduction matter.",
    ],
    stats: "Global percentage of Prostate cancer among all types of cancer = 7% to 8%.",
    symptoms: [
      "Urinary problems",
      "Blood in urine or semen",
      "Discomfort in the pelvic area",
      "needing to pee more frequently",
    ].map((label, index) => ({
      label,
      img: getSymptomImage(label, index),
    })),
    relatedTypes: [
      "Adenocarcinoma",
      "Small Cell Prostate Cancer",
      "Transitional Cell Carcinoma",
      "Squamous Cell Carcinoma",
      "Neuroendocrine Tumors*",
    ],
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
