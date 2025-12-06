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
  "cerebral-palsy": createDetail({
    key: "cerebral-palsy",
    name: "Cerebral Palsy",
    descriptionTitle: "What is Cerebral Palsy?",
    heroQuote:
      '"Cerebral Palsy affects movement, muscle tone, and posture due to early brain development changes—early support can unlock better function."',
    bodyParagraphs: [
      "Cerebral Palsy (CP) is a group of neurological disorders that affect movement, muscle tone, and posture due to abnormal brain development or damage before, during, or shortly after birth. It is the most common childhood motor disability, affecting 2 to 3 per 1,000 live births worldwide.",
      "CP can cause mild to severe motor impairments, leading to difficulty with walking, coordination, speech, and daily activities. Although CP is a lifelong condition, early intervention and therapy can improve function and independence.",
    ],
    stats:
      "Globally, Cerebral Palsy (CP) affects approximately 0.1–0.2% of the population, with a prevalence of 2 to 3 cases per 1,000 live births.",
    symptoms: [
      { label: "Delayed motor development" },
      { label: "Muscle stiffness or floppiness" },
      { label: "Uncontrollable movements" },
      { label: "Poor coordination & balance" },
      { label: "Speech & swallowing difficulties" },
      { label: "Seizures or vision/hearing issues" },
    ],
    relatedTypes: ["Spastic", "Dyskinetic", "Ataxic", "Mixed"],
  }),
  "brain-aneurysm": createDetail({
    key: "brain-aneurysm",
    name: "Brain Aneurysm",
    descriptionTitle: "What is a Brain Aneurysm?",
    heroQuote:
      '"A brain aneurysm is a weak, bulging spot in a vessel—when it ruptures, rapid care is critical; when detected early, protection is possible."',
    bodyParagraphs: [
      'A Brain Aneurysm is a weak, bulging area in a blood vessel in the brain. If an aneurysm ruptures, it can cause a life-threatening brain bleed (hemorrhagic stroke). Many aneurysms remain silent and undetected, but if they grow or rupture, they can lead to severe complications, including death.',
      "Brain aneurysms affect around 3–5% of the global population, but only a small percentage rupture, leading to subarachnoid hemorrhage (SAH), a medical emergency.",
    ],
    stats:
      "Brain aneurysms affect ~3–5% of people worldwide; only a small percentage rupture, causing subarachnoid hemorrhage (SAH).",
    symptoms: [
      { label: "Headache or pressure" },
      { label: "Pain above or behind the eye" },
      { label: "Difficulty speaking" },
      { label: "Sudden, severe headache" },
      { label: "Nausea & vomiting" },
    ],
    relatedTypes: ["Unruptured", "Ruptured", "Multiple aneurysms"],
  }),
  "brain-tumor": createDetail({
    key: "brain-tumor",
    name: "Brain Tumor",
    descriptionTitle: "What is a Brain Tumor?",
    heroQuote:
      '"A brain tumor is an abnormal growth in or around the brain—early detection and care protect memory, speech, movement, and vital brain functions."',
    bodyParagraphs: [
      "A brain tumor is an abnormal growth of cells in or around the brain. These tumors can be benign (non-cancerous) or malignant (cancerous) and may affect brain function based on their size, location, and growth rate. They can develop due to genetic mutations, radiation exposure, or unknown causes.",
      "Without treatment, a brain tumor can impact memory, speech, movement, and other vital brain functions. Early detection is crucial as some tumors grow rapidly and lead to severe complications.",
    ],
    stats:
      "Brain tumors occur at a global prevalence of roughly 5–10 cases per 100,000 people annually.",
    symptoms: [
      { label: "Frequent headaches" },
      { label: "Nausea or vomiting" },
      { label: "Seizures or convulsions" },
      { label: "Blurred or double vision" },
      { label: "Difficulty speaking or understanding" },
      { label: "Memory loss or confusion" },
      { label: "Weakness or numbness" },
      { label: "Loss of balance and coordination" },
    ],
    relatedTypes: ["Benign", "Malignant", "Primary", "Metastatic"],
  }),
  "amyotrophic-lateral-sclerosis": createDetail({
    key: "amyotrophic-lateral-sclerosis",
    name: "Amyotrophic Lateral Sclerosis",
    descriptionTitle: "What is Amyotrophic Lateral Sclerosis?",
    heroQuote:
      '"ALS progressively affects the motor neurons that control movement, speech, and breathing—early support aims to slow decline and preserve function."',
    bodyParagraphs: [
      "Amyotrophic Lateral Sclerosis (ALS), also known as Lou Gehrig’s disease, is a progressive neurodegenerative disorder that affects nerve cells in the brain and spinal cord. ALS leads to the gradual loss of muscle control, mobility, speech, and breathing ability.",
      "As ALS progresses, motor neurons responsible for voluntary movements deteriorate, causing muscle weakness, paralysis, and difficulty swallowing or breathing. Early intervention can help manage symptoms and slow disease progression.",
    ],
    stats:
      "Globally, ALS affects over 200,000 people, with most cases diagnosed between 40 and 70 years old.",
    symptoms: [
      { label: "Muscle twitching" },
      { label: "Difficulty speaking & swallowing" },
      { label: "Loss of coordination & balance" },
      { label: "Muscle cramps & stiffness" },
      { label: "Weight loss & fatigue" },
      { label: "Breathing difficulties" },
      { label: "Paralysis in later stages" },
    ],
    relatedTypes: ["Sporadic ALS", "Familial ALS"],
  }),
  "alzheimers-disease-dementia": createDetail({
    key: "alzheimers-disease-dementia",
    name: "Alzheimer’s Disease & Dementia",
    descriptionTitle: "What is Alzheimer’s Disease & Dementia?",
    heroQuote:
      '"Alzheimer’s and dementia progressively affect memory, thinking, and behavior—early support focuses on preserving daily function and slowing decline."',
    bodyParagraphs: [
      "Alzheimer’s disease and dementia are progressive brain disorders that affect memory, thinking, and behavior. Dementia is a general term for cognitive decline, while Alzheimer’s disease is the most common type, accounting for 60–80% of dementia cases.",
      "These conditions worsen over time, impacting daily activities, decision-making, and communication. While aging is a major risk factor, dementia is not a normal part of growing older.",
    ],
    stats:
      "Globally, over 55 million people are living with dementia, with cases expected to rise due to an aging population.",
    symptoms: [
      { label: "Memory loss" },
      { label: "Confusion & disorientation" },
      { label: "Personality & mood changes" },
      { label: "Communication problems" },
      { label: "Loss of motor skills" },
      { label: "Poor judgment" },
      { label: "Difficulty with problem-solving" },
    ],
    relatedTypes: ["Alzheimer’s", "Vascular", "Lewy Body", "Frontotemporal"],
  }),
  "guillain-barre-syndrome": createDetail({
    key: "guillain-barre-syndrome",
    name: "Guillain-Barré Syndrome (GBS)",
    descriptionTitle: "What is Guillain-Barré Syndrome?",
    heroQuote:
      '"GBS is a rare autoimmune disorder where the immune system attacks peripheral nerves—early care helps prevent severe weakness or paralysis."',
    bodyParagraphs: [
      "Guillain-Barré Syndrome (GBS) is a rare but serious autoimmune disorder where the body’s immune system mistakenly attacks the peripheral nerves. This leads to muscle weakness, numbness, and, in severe cases, paralysis. GBS often develops after a viral or bacterial infection and can progress rapidly over days or weeks. While most people recover with treatment, early intervention is crucial to prevent complications.",
      "Globally, GBS affects 1–2 people per 100,000 annually, with higher risks after infections like influenza, COVID-19, or Campylobacter jejuni.",
    ],
    stats:
      "GBS affects about 1–2 people per 100,000 annually, with higher risk after certain infections.",
    symptoms: [
      { label: "Tingling & numbness" },
      { label: "Muscle weakness" },
      { label: "Severe pain" },
      { label: "Loss of reflexes" },
      { label: "Facial paralysis" },
      { label: "Breathing difficulties" },
    ],
    relatedTypes: ["Acute inflammatory demyelinating polyneuropathy", "Miller Fisher variant"],
  }),
  "multiple-sclerosis": createDetail({
    key: "multiple-sclerosis",
    name: "Multiple Sclerosis (MS)",
    descriptionTitle: "What is Multiple Sclerosis?",
    heroQuote:
      '"MS is a chronic autoimmune condition where immune cells attack myelin, disrupting brain–body communication—early care can slow progression and protect function."',
    bodyParagraphs: [
      "Multiple Sclerosis (MS) is a chronic autoimmune disorder that affects the central nervous system (CNS), including the brain and spinal cord. It occurs when the immune system mistakenly attacks the protective myelin sheath covering nerve fibers, leading to inflammation, nerve damage, and communication disruptions between the brain and body.",
      "MS symptoms vary from person to person and can worsen over time. While there is no cure, early treatment can slow progression and manage symptoms effectively.",
    ],
    stats:
      "Over 2.8 million people are affected by MS worldwide, with most cases diagnosed between ages 20 and 40.",
    symptoms: [
      { label: "Fatigue" },
      { label: "Vision problems" },
      { label: "Muscle weakness & spasms" },
      { label: "Numbness & tingling" },
      { label: "Balance & coordination issues" },
      { label: "Memory problems" },
      { label: "Bladder & bowel dysfunction" },
    ],
    relatedTypes: ["Relapsing-Remitting", "Primary Progressive", "Secondary Progressive"],
  }),
};

/* --------------------------------------------------
   NATURAL IMMUNOTHERAPY CAUSE LIBRARY (Nerve)
---------------------------------------------------*/
export const NERVE_NIT_CAUSES = {
  "peripheral-neuropathy": {
    title:
      "What is the cause of Peripheral Neuropathy from the perspective of Natural Immunotherapy",
    items: [
      "Chronic inflammation fraying myelin and nerve endings",
      "Blood sugar swings and insulin resistance glycate nerve tissue",
      "Microcirculation slowdown starving nerves of oxygen and nutrients",
      "Micronutrient depletion (B vitamins, magnesium, omega-3s) slowing nerve repair",
      "Gut-immune-nerve axis imbalance driving immune irritation",
      "Toxin load from alcohol, medications, or metals stressing peripheral nerves",
      "Mitochondrial energy deficits making nerve signals unstable",
    ],
  },
  "sciatica-relief": {
    title:
      "What is the cause of Sciatica from the perspective of Natural Immunotherapy",
    items: [
      "Disc bulge or piriformis tension compressing the sciatic nerve root",
      "Pelvic and glute weakness creating mechanical instability around the nerve",
      "Fascial stiffness and dehydration reducing nerve glide through the hip",
      "Inflammation around the lumbar spine sensitizing pain pathways",
      "Prolonged sitting and posture habits congesting blood and lymph flow",
      "Micronutrient gaps (magnesium, collagen amino acids) slowing tissue repair",
      "Stress hormones increasing muscle guarding and perceived pain",
    ],
  },
  "parkinsons-support": {
    title:
      "What is the cause of Parkinson's from the perspective of Natural Immunotherapy",
    items: [
      "Dopaminergic neuron oxidative stress and mitochondrial exhaustion",
      "Neuroinflammation with overactive microglia damaging signaling cells",
      "Gut-brain axis disruption and constipation allowing toxin recirculation",
      "Environmental toxin load overwhelming detox and antioxidant defenses",
      "Low glutathione, CoQ10, and omega-3 reserves reducing cellular resilience",
      "Sleep and circadian disruption limiting nightly neural recovery",
      "Chronic stress and blood sugar swings destabilizing dopamine signaling",
    ],
  },
  "multiple-sclerosis-care": {
    title:
      "What is the cause of Multiple Sclerosis from the perspective of Natural Immunotherapy",
    items: [
      "Immune misdirection attacking myelin along the central nervous system",
      "Leaky gut and chronic infections priming autoimmunity and flares",
      "Vitamin D, omega-3, and antioxidant deficits reducing immune regulation",
      "Viral triggers reactivating inflammatory cascades around nerves",
      "Poor lymphatic and glymphatic drainage leaving inflammatory debris",
      "Mitochondrial weakness reducing remyelination energy for nerve repair",
      "Stress and circadian disruption amplifying inflammatory signaling",
    ],
  },
  "cerebral-palsy": {
    title:
      "What is the cause of Cerebral Palsy from the perspective of Natural Immunotherapy",
    items: [
      "Chronic prenatal immune imbalance affecting early neural development",
      "Maternal immune overactivation creating inflammatory stress on the fetus",
      "Under-nourished cellular immunity limiting protection during development",
      "Persistent inflammatory load disrupting brain maturation",
      "Impaired detoxification responses allowing oxidative stress to accumulate",
      "Reduced regenerative signaling constraining neural repair and plasticity",
    ],
  },
  "brain-aneurysm": {
    title:
      "What is the cause of Brain Aneurysm from the perspective of Natural Immunotherapy",
    items: [
      "Chronic vascular inflammation weakening arterial walls",
      "Loss of immune-guided collagen repair around vessels",
      "Accumulation of oxidative immune stress in vascular tissue",
      "Immune dysregulation from long-term toxin exposure",
      "Failure of vascular immune surveillance to clear micro-injury",
      "Immune fatigue from chronic infections reducing vessel resilience",
      "Autonomic-immune imbalance elevating blood pressure surges",
    ],
  },
  "brain-tumor": {
    title:
      "What is the cause of Brain Tumor from the perspective of Natural Immunotherapy",
    items: [
      "Immune misrecognition in neural tissue allowing abnormal growth",
      "Chronic neuro-inflammatory overload stressing brain cells",
      "Weak microglial surveillance reducing abnormal cell clearance",
      "Blood–brain barrier stress and leakage exposing brain tissue to toxins",
      "Mitochondrial disruption in brain cells impairing repair signals",
      "Detox pathway congestion in brain tissue raising oxidative stress",
    ],
  },
  "amyotrophic-lateral-sclerosis": {
    title:
      "What is the cause of Amyotrophic Lateral Sclerosis from the perspective of Natural Immunotherapy",
    items: [
      "Immune system exhaustion around motor neurons",
      "Chronic inflammatory load stressing neural tissue",
      "Toxic cellular accumulation harming motor neurons",
      "Mitochondrial immune dysfunction reducing repair capacity",
      "Immune-barrier disruption in the nervous system",
      "Stress-induced autoimmunity accelerating neuron damage",
      "Gut-immune-brain imbalance fueling inflammation",
      "Failure of immune repair mechanisms to restore motor neurons",
    ],
  },
  "alzheimers-disease-dementia": {
    title:
      "What is the cause of Alzheimer’s Disease & Dementia from the perspective of Natural Immunotherapy",
    items: [
      "Collapse of the brain’s glymphatic cleaning cycle (nighttime waste removal failure)",
      "Synaptic signal weakening from neurotransmitter rhythm disruption",
      "Microglial over-activation (immune cells that never rest)",
      "Distortion of the brain’s bioelectric field (neural coherence loss)",
      "Chronic cerebral hypoperfusion (low brain blood flow terrain)",
      "Metabolic drift in neuronal energy use (glucose–ketone mismatch)",
      "Breakdown of brain–gut signaling pathways",
      "Failure of the brain’s structural matrix (neuro-scaffold weakening)",
      "Accumulated emotional and stress imprint on neural terrain",
    ],
  },
  "guillain-barre-syndrome": {
    title:
      "What is the cause of Guillain-Barré Syndrome (GBS) from the perspective of Natural Immunotherapy",
    items: [
      "Immune confusion after infection targeting peripheral nerves",
      "Excessive inflammatory load damaging nerve insulation",
      "Gut–immune axis disruption increasing immune misfires",
      "Impaired detoxification pathways leaving inflammatory byproducts",
      "Weak regulatory immune cells failing to calm responses",
      "Stress-driven immune fatigue lowering resilience",
      "Post-infection molecular mimicry causing nerve attack",
      "Nutrient imbalance affecting nerve protection",
      "Hidden chronic infections sustaining immune activation",
    ],
  },
  "multiple-sclerosis": {
    title:
      "What is the cause of Multiple Sclerosis (MS) from the perspective of Natural Immunotherapy",
    items: [
      "Immune system misdirection due to chronic inflammation",
      "Toxic load overwhelming natural detox pathways",
      "Gut–immune axis breakdown leading to “leaky gut”",
      "Persistent latent infections stressing immunity",
      "Mitochondrial weakness in nerve cells reducing repair",
      "Emotional or physical stress exhausting immunoregulation",
      "Nutrient deficiencies affecting immune balance",
    ],
  },
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
