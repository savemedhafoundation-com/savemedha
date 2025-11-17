import otherHero from "../assets/Photo/othertreatment.png";

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
  heroImage: heroImage ?? otherHero,
  cureBy: "Natural Immunotherapy",
  intro:
    intro ??
    `Personalized care for ${name.toLowerCase()} using detox, nutrition mapping, and immune balancing.`,
  descriptionTitle: `What is ${name}?`,
  heroQuote:
    heroQuote ??
    `"${name} often needs root-cause detective work—nutrition, detox, and stress balance work together to restore health."`,
  quickFacts:
    quickFacts ?? [
      "Functional testing and lifestyle mapping reveal the true drivers of symptoms.",
      "Layered detox, remineralization, and stress care create sustainable change.",
    ],
  bodyParagraphs:
    bodyParagraphs ?? [
      `${name} can show up differently for everyone. We look at sleep, stress, digestion, and toxin load to build a unique roadmap.`,
      "Nutrition, botanicals, nervous-system work, and accountability combine to restore energy and reduce flare-ups.",
    ],
  stats:
    stats ??
    `${name} improves most with consistent daily habits—small steps compound over time.`,
  symptoms:
    symptoms ?? [
      { label: "Fatigue" },
      { label: "Brain fog" },
      { label: "Digestive upset" },
      { label: "Sleep issues" },
      { label: "Pain flares" },
      { label: "Mood changes" },
    ],
  relatedTypes: relatedTypes ?? [],
  storeUrl: storeUrl ?? "https://dantura.com/product/tumor-breaker/?v=13b5bfe96f3e",
  ctaUrl: ctaUrl ?? "https://dantura.com/",
});

export const OTHER_DETAILS = {
  "autoimmune-reset": createDetail({
    key: "autoimmune-reset",
    name: "Autoimmune Reset",
    symptoms: [
      { label: "Joint pain" },
      { label: "Brain fog" },
      { label: "Fatigue" },
      { label: "Digestive issues" },
      { label: "Skin flares" },
      { label: "Sleep disruption" },
    ],
    relatedTypes: ["Inflammation Control", "Gut Repair"],
  }),
  "metabolic-syndrome": createDetail({
    key: "metabolic-syndrome",
    name: "Metabolic Syndrome",
    symptoms: [
      { label: "Abdominal weight gain" },
      { label: "Blood sugar swings" },
      { label: "High blood pressure" },
      { label: "High triglycerides" },
      { label: "Low energy" },
      { label: "Food cravings" },
    ],
    relatedTypes: ["Insulin Resistance", "Cardio-Metabolic Care"],
  }),
  "chronic-fatigue": createDetail({
    key: "chronic-fatigue",
    name: "Chronic Fatigue",
    symptoms: [
      { label: "Persistent tiredness" },
      { label: "Unrefreshing sleep" },
      { label: "Brain fog" },
      { label: "Muscle pain" },
      { label: "Headaches" },
      { label: "Light sensitivity" },
    ],
    relatedTypes: ["Post-Viral", "Adrenal Support"],
  }),
  "pcos-hormone-care": createDetail({
    key: "pcos-hormone-care",
    name: "PCOS & Hormone Care",
    symptoms: [
      { label: "Irregular cycles" },
      { label: "Acne or hair changes" },
      { label: "Weight changes" },
      { label: "Mood swings" },
      { label: "Cravings" },
      { label: "Sleep disruption" },
    ],
    relatedTypes: ["Insulin Balance", "Cycle Support"],
  }),
};

export const getOtherDetail = (key, fallbackName = "Custom Care") => {
  if (!key) return null;
  const normalized = normalizeKey(key);
  if (OTHER_DETAILS[normalized]) return OTHER_DETAILS[normalized];

  return createDetail({
    key: normalized,
    name: fallbackName,
  });
};
