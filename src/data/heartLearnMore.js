import heartHero from "../assets/Photo/hearttreatment.png";

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
  intro,
  heroQuote,
  quickFacts,
  bodyParagraphs,
  stats,
  symptoms,
  relatedTypes,
  storeUrl,
  ctaUrl,
}) => ({
  key,
  name,
  heroImage: heroImage ?? heartHero,
  cureBy: "Natural Immunotherapy",
  intro:
    intro ??
    `Learn how we support ${name.toLowerCase()} with anti-inflammatory nutrition, circulation support, and stress balance.`,
  descriptionTitle: `What is ${name}?`,
  heroQuote:
    heroQuote ??
    `"${name} impacts how effectively your heart pumps, nourishes vital organs, and responds to stress—targeted habits keep it resilient."`,
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
    symptoms ?? [
      { label: "Chest discomfort" },
      { label: "Shortness of breath" },
      { label: "Fatigue" },
      { label: "Swollen legs" },
      { label: "Irregular heartbeat" },
      { label: "Dizziness" },
    ],
  relatedTypes: relatedTypes ?? [],
  storeUrl: storeUrl ?? "https://dantura.com/product/heart-booster/?v=13b5bfe96f3e",
  ctaUrl: ctaUrl ?? "https://dantura.com/",
});

export const HEART_DETAILS = {
  "hypertension-control": createDetail({
    key: "hypertension-control",
    name: "Hypertension Control",
    quickFacts: [
      "Sodium sensitivity and stress are major drivers of pressure spikes.",
      "Mineral-rich hydration and breathwork calm the nervous system.",
    ],
    symptoms: [
      { label: "Headaches" },
      { label: "Dizziness" },
      { label: "Blurred vision" },
      { label: "Nosebleeds" },
      { label: "Shortness of breath" },
      { label: "Anxiety" },
    ],
    relatedTypes: ["Resistant Hypertension", "Renal Hypertension"],
  }),
  "cholesterol-reset": createDetail({
    key: "cholesterol-reset",
    name: "Cholesterol Reset",
    symptoms: [
      { label: "Family history" },
      { label: "Chest discomfort" },
      { label: "Fatigue on exertion" },
      { label: "Shortness of breath" },
      { label: "Leg cramps" },
      { label: "Brain fog" },
    ],
    relatedTypes: ["Hyperlipidemia", "Metabolic Syndrome"],
  }),
  "arrhythmia-care": createDetail({
    key: "arrhythmia-care",
    name: "Arrhythmia Care",
    symptoms: [
      { label: "Palpitations" },
      { label: "Fluttering sensations" },
      { label: "Lightheadedness" },
      { label: "Shortness of breath" },
      { label: "Fatigue" },
      { label: "Chest pressure" },
    ],
    relatedTypes: ["AFib", "Tachycardia", "PVCs"],
  }),
  "heart-failure-support": createDetail({
    key: "heart-failure-support",
    name: "Heart Failure Support",
    symptoms: [
      { label: "Breathlessness" },
      { label: "Swollen ankles" },
      { label: "Rapid weight gain" },
      { label: "Fatigue" },
      { label: "Persistent cough" },
      { label: "Nighttime urination" },
    ],
    relatedTypes: ["HFrEF", "HFpEF"],
  }),
};

export const getHeartDetail = (key, fallbackName = "Heart Care") => {
  if (!key) return null;
  const normalized = normalizeKey(key);
  if (HEART_DETAILS[normalized]) return HEART_DETAILS[normalized];

  return createDetail({
    key: normalized,
    name: fallbackName,
  });
};
