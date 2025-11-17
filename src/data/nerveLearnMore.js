import nerveHero from "../assets/Photo/nervetreatment.png";

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
  heroImage: heroImage ?? nerveHero,
  cureBy: "Natural Immunotherapy",
  intro:
    intro ??
    `Explore how we ease ${name.toLowerCase()} using anti-inflammatory nutrition, nerve-calming protocols, and gentle movement.`,
  descriptionTitle: `What is ${name}?`,
  heroQuote:
    heroQuote ??
    `"${name} affects how nerves communicate, which influences pain, movement, and sensation—small daily habits can calm that chatter."`,
  quickFacts:
    quickFacts ?? [
      "Inflammation, blood sugar, and stress all impact nerve health.",
      "Targeted nutrients and electro-therapy can reduce firing and pain.",
    ],
  bodyParagraphs:
    bodyParagraphs ?? [
      `${name} can trigger burning, tingling, or weakness depending on which nerves are involved. Balancing nutrition, circulation, and the nervous system is key.`,
      "We combine micronutrient therapy, breathwork, contrast therapy, and gentle neuro-mobility to calm signals and aid recovery.",
    ],
  stats:
    stats ??
    `${name} is common in metabolic and autoimmune conditions; restoring nerve health is possible with sustained habits.`,
  symptoms:
    symptoms ?? [
      { label: "Tingling" },
      { label: "Numbness" },
      { label: "Burning pain" },
      { label: "Muscle weakness" },
      { label: "Balance issues" },
      { label: "Sensitivity to touch" },
    ],
  relatedTypes: relatedTypes ?? [],
  storeUrl: storeUrl ?? "https://dantura.com/product/nerve-booster/?v=13b5bfe96f3e",
  ctaUrl: ctaUrl ?? "https://dantura.com/",
});

export const NERVE_DETAILS = {
  "peripheral-neuropathy": createDetail({
    key: "peripheral-neuropathy",
    name: "Peripheral Neuropathy",
    symptoms: [
      { label: "Numbness in feet" },
      { label: "Burning pain" },
      { label: "Nighttime discomfort" },
      { label: "Balance problems" },
      { label: "Muscle weakness" },
      { label: "Cramping" },
    ],
    relatedTypes: ["Diabetic Neuropathy", "Chemo-Induced Neuropathy"],
  }),
  "sciatica-relief": createDetail({
    key: "sciatica-relief",
    name: "Sciatica Relief",
    symptoms: [
      { label: "Shooting leg pain" },
      { label: "Numbness" },
      { label: "Tingling" },
      { label: "Hip or buttock pain" },
      { label: "Weakness in leg" },
      { label: "Stiffness" },
    ],
    relatedTypes: ["Disc Herniation", "Piriformis Syndrome"],
  }),
  "parkinsons-support": createDetail({
    key: "parkinsons-support",
    name: "Parkinson's Support",
    symptoms: [
      { label: "Tremors" },
      { label: "Slowed movement" },
      { label: "Stiffness" },
      { label: "Balance issues" },
      { label: "Sleep changes" },
      { label: "Mood shifts" },
    ],
    relatedTypes: ["Motor Symptoms", "Non-Motor Symptoms"],
  }),
  "multiple-sclerosis-care": createDetail({
    key: "multiple-sclerosis-care",
    name: "Multiple Sclerosis Care",
    symptoms: [
      { label: "Numbness or tingling" },
      { label: "Vision problems" },
      { label: "Weakness" },
      { label: "Spasticity" },
      { label: "Fatigue" },
      { label: "Balance issues" },
    ],
    relatedTypes: ["Relapsing-Remitting", "Progressive"],
  }),
};

export const getNerveDetail = (key, fallbackName = "Nerve Care") => {
  if (!key) return null;
  const normalized = normalizeKey(key);
  if (NERVE_DETAILS[normalized]) return NERVE_DETAILS[normalized];

  return createDetail({
    key: normalized,
    name: fallbackName,
  });
};
