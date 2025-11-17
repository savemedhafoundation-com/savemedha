import smaHero from "../assets/Photo/Spinalmuscullaratrophy.png";

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
  heroImage: heroImage ?? smaHero,
  cureBy: "Natural Immunotherapy",
  intro:
    intro ??
    `Adaptive care for ${name.toLowerCase()} with respiratory support, mobility therapy, and nutrition to maintain strength.`,
  descriptionTitle: `What is ${name}?`,
  heroQuote:
    heroQuote ??
    `"${name} affects motor neurons and muscle strength—consistent mobility support and nutrition improve independence."`,
  quickFacts:
    quickFacts ?? [
      "Respiratory care and posture are critical to daily comfort.",
      "Tailored physiotherapy preserves mobility and reduces fatigue.",
    ],
  bodyParagraphs:
    bodyParagraphs ?? [
      `${name} reduces muscle strength and endurance over time. Coordinated respiratory work, nutrition, and therapy help maintain day-to-day function.`,
      "We design mobility blocks, breathing practice, and high-nutrient meals to match your current abilities and goals.",
    ],
  stats:
    stats ??
    `${name} needs multidisciplinary management; consistent routines improve quality of life.`,
  symptoms:
    symptoms ?? [
      { label: "Muscle weakness" },
      { label: "Breathing difficulty" },
      { label: "Fatigue" },
      { label: "Mobility challenges" },
      { label: "Swallowing difficulty" },
      { label: "Posture issues" },
    ],
  relatedTypes: relatedTypes ?? [],
  storeUrl: storeUrl ?? "https://dantura.com/product/heart-booster/?v=13b5bfe96f3e",
  ctaUrl: ctaUrl ?? "https://dantura.com/",
});

export const SMA_DETAILS = {
  "respiratory-strength": createDetail({
    key: "respiratory-strength",
    name: "Respiratory Strength",
    symptoms: [
      { label: "Shortness of breath" },
      { label: "Weak cough" },
      { label: "Breathing discomfort" },
      { label: "Sleep issues" },
      { label: "Fatigue" },
      { label: "Chest tightness" },
    ],
    relatedTypes: ["Breath Stacking", "Postural Support"],
  }),
  "mobility-therapy": createDetail({
    key: "mobility-therapy",
    name: "Mobility Therapy",
    symptoms: [
      { label: "Muscle fatigue" },
      { label: "Balance issues" },
      { label: "Joint stiffness" },
      { label: "Weak grip" },
      { label: "Limited reach" },
      { label: "Gait changes" },
    ],
    relatedTypes: ["Physiotherapy", "Occupational Therapy"],
  }),
  "nutritional-support": createDetail({
    key: "nutritional-support",
    name: "Nutritional Support",
    symptoms: [
      { label: "Weight fluctuations" },
      { label: "Swallowing difficulty" },
      { label: "Low appetite" },
      { label: "Digestive issues" },
      { label: "Fatigue" },
      { label: "Muscle loss" },
    ],
    relatedTypes: ["High-Calorie Plans", "Tube-Feeding Guidance"],
  }),
  "adaptive-physiotherapy": createDetail({
    key: "adaptive-physiotherapy",
    name: "Adaptive Physiotherapy",
    symptoms: [
      { label: "Muscle weakness" },
      { label: "Posture problems" },
      { label: "Mobility challenges" },
      { label: "Balance issues" },
      { label: "Joint stiffness" },
      { label: "Fatigability" },
    ],
    relatedTypes: ["Hydrotherapy", "Assistive Devices"],
  }),
};

export const getSMADetail = (key, fallbackName = "SMA Care") => {
  if (!key) return null;
  const normalized = normalizeKey(key);
  if (SMA_DETAILS[normalized]) return SMA_DETAILS[normalized];

  return createDetail({
    key: normalized,
    name: fallbackName,
  });
};
