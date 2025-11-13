import cancerImg from "../assets/Photo/cancertreatment.png";
import kidneyImg from "../assets/Photo/2.jpg";
import heartImg from "../assets/Photo/hearttreatment.png";
import nerveImg from "../assets/Photo/nervetreatment.png";
import smaImg from "../assets/Photo/Spinalmuscullaratrophy.png";
import otherImg from "../assets/Photo/othertreatment.png";

export const TREATMENTS = [
  {
    key: "cancer",
    title: "Cancer Treatment",
    image: cancerImg,
    buttonColor: "#74C425",
    buttonHoverColor: "#0b2fa1",
    tagline: "Integrative Immuno-Oncology",
    summary:
      "A terrain-based protocol that combines metabolic detox, immune nutrition, oxygen therapy, and mind-body coaching to slow tumour progression while rebuilding strength.",
    highlights: [
      {
        title: "Metabolic Rebalance",
        description:
          "Plant-forward ketogenic cycles, lymph drainage, and oxygen therapies starve abnormal cells and keep energy clean.",
      },
      {
        title: "Immune Modulation",
        description:
          "Curated IV nutrients, botanical mistletoe extracts, and peptides awaken natural killer-cell response.",
      },
      {
        title: "Mind-Body Stability",
        description:
          "Breathwork, trauma release, and deep sleep hygiene coaching calm cortisol and improve resilience.",
      },
    ],
    focusAreas: [
      "Full-body terrain mapping with 45+ bio-markers.",
      "Daily detox and hydration rituals to keep pathways open.",
      "Targeted phytonutrients that complement ongoing oncology care.",
      "Emotional resilience sessions for patients and caregivers.",
    ],
    steps: [
      {
        title: "Terrain Mapping",
        description:
          "Advanced labs and lifestyle interviews reveal inflammatory triggers and nutrient gaps.",
      },
      {
        title: "Protocol Build",
        description:
          "We assemble IVs, botanicals, nutrition, and breath practices in 21-day phases.",
      },
      {
        title: "Ongoing Calibration",
        description:
          "Weekly vitals, HRV, and symptom reviews ensure the plan evolves with your progress.",
      },
    ],
    stats: [
      { value: "45+", label: "custom lab markers tracked" },
      { value: "2-3 months", label: "average core protocol" },
    ],
  },
  {
    key: "kidney",
    title: "Kidney Treatment",
    image: kidneyImg,
    buttonColor: "#74C425",
    buttonHoverColor: "#0b2fa1",
    tagline: "Renal Rejuvenation",
    summary:
      "Gentle detox, mineral balancing, and anti-inflammatory nutrition to improve filtration rates and ease dialysis stress.",
    highlights: [
      {
        title: "Filtration Support",
        description:
          "Herbal diuretics, electrolytes, and structured water habits keep kidneys flushed without strain.",
      },
      {
        title: "Inflammation Control",
        description:
          "Alkaline meals, omega balance, and gut restoration lower the load on renal tissue.",
      },
      {
        title: "Lifestyle Guardrails",
        description:
          "Coaching on rest cycles, stress control, and medication timing sustains long-term function.",
      },
    ],
    focusAreas: [
      "Baseline eGFR, creatinine, and electrolyte analysis.",
      "Customized hydration ladder with mineral broths.",
      "Anti-inflammatory meal design with low-potassium swaps.",
      "Movement therapy to encourage lymphatic drainage.",
    ],
    steps: [
      {
        title: "Intake & Labs",
        description:
          "Review renal panels, lifestyle patterns, and current medications with our clinicians.",
      },
      {
        title: "Reset Phase",
        description:
          "Introduce detox soups, targeted herbs, and circulation work for 30 days.",
      },
      {
        title: "Stabilize",
        description:
          "Monthly reviews fine-tune nutrition and supplement stacks for sustainable kidney relief.",
      },
    ],
    stats: [
      { value: "1200+", label: "renal meals curated" },
      { value: "15%", label: "avg. drop in edema markers" },
    ],
  },
  {
    key: "heart",
    title: "Heart Treatment",
    image: heartImg,
    buttonColor: "#74C425",
    buttonHoverColor: "#0b2fa1",
    tagline: "Cardio Cellular Repair",
    summary:
      "A cardio-metabolic intensive focused on microcirculation, lipid balance, and emotional calm to strengthen the heart.",
    highlights: [
      {
        title: "Endothelium Therapy",
        description:
          "Nitric-oxide boosting foods, sauna sessions, and breath pacing open micro-vessels.",
      },
      {
        title: "Lipid Reset",
        description:
          "Fiber loading, targeted fasting, and adaptogens optimize cholesterol ratios.",
      },
      {
        title: "Stress Mastery",
        description:
          "HRV tracking with meditation, music, and nature prescriptions for calm rhythm.",
      },
    ],
    focusAreas: [
      "Full lipid, hs-CRP, and insulin testing every 6 weeks.",
      "Daily movement accountability and gentle cardio plans.",
      "Anti-inflammatory culinary roadmap with healthy fats.",
      "Community circles for emotional release and support.",
    ],
    steps: [
      {
        title: "Risk Snapshot",
        description:
          "Cardio scans, labs, and lifestyle mapping expose the true drivers of stress on the heart.",
      },
      {
        title: "Core Protocol",
        description:
          "12-week rhythm of nutrition, movement, adaptogens, and clinical monitoring.",
      },
      {
        title: "Integration",
        description:
          "Maintenance playbook with recipes, breath drills, and digital follow-ups.",
      },
    ],
    stats: [
      { value: "12-week", label: "intensive reboot" },
      { value: "92%", label: "clients report improved stamina" },
    ],
  },
  {
    key: "nerve",
    title: "Nerve Treatment",
    image: nerveImg,
    buttonColor: "#74C425",
    buttonHoverColor: "#0b2fa1",
    tagline: "Neuro Regeneration Lab",
    summary:
      "Targeted neuropathy relief with vagus-nerve toning, micronutrient therapy, and neuroplasticity training.",
    highlights: [
      {
        title: "Nerve Nutrition",
        description:
          "Methylated B vitamins, omega balance, and amino acids rebuild myelin integrity.",
      },
      {
        title: "Electrical Recovery",
        description:
          "Frequency micro-current, PEMF, and reflexology calm pain signalling.",
      },
      {
        title: "Neuroplastic Habits",
        description:
          "Cognitive drills and somatic practices retrain the nervous system.",
      },
    ],
    focusAreas: [
      "Root-cause review for diabetic, autoimmune, or injury-based neuropathy.",
      "Daily nerve-calming breathwork and contrast therapy.",
      "Sensory re-education exercises tailored to symptom zones.",
      "Family coaching to support at-home routines.",
    ],
    steps: [
      {
        title: "Assess & Localize",
        description:
          "Advanced nerve conduction review and symptom mapping.",
      },
      {
        title: "Calm & Nourish",
        description:
          "Four-week anti-inflammatory diet plus micronutrient therapy.",
      },
      {
        title: "Train & Strengthen",
        description:
          "Movement, balance, and neuromuscular drills reinforce recovery.",
      },
    ],
    stats: [
      { value: "6-8 weeks", label: "average relief timeline" },
      { value: "3x", label: "guided neuro sessions weekly" },
    ],
  },
  {
    key: "sma",
    title: "Spinal Muscular Atrophy",
    image: smaImg,
    buttonColor: "#74C425",
    buttonHoverColor: "#0b2fa1",
    tagline: "Adaptive SMA Care",
    summary:
      "Coordinated physiotherapy, respiratory care, and nutrition to enhance mobility and slow muscle wasting.",
    highlights: [
      {
        title: "Respiratory Support",
        description:
          "Breath stacking, percussion therapy, and micronutrients keep lungs resilient.",
      },
      {
        title: "Strength & Mobility",
        description:
          "Adaptive physio, aquatic therapy, and lightweight resistance maintain function.",
      },
      {
        title: "Family Coaching",
        description:
          "Caregiver training for transfers, daily routines, and emotional wellbeing.",
      },
    ],
    focusAreas: [
      "Baseline motor-function and respiratory testing every quarter.",
      "High-calorie, anti-inflammatory meal plans with tube-feeding support if needed.",
      "Assistive tech assessments for braces, seating, and mobility devices.",
      "Psychological counselling to keep morale elevated.",
    ],
    steps: [
      {
        title: "Foundation Planning",
        description:
          "Neurologist collaboration plus physio and nutrition onboarding.",
      },
      {
        title: "Active Care",
        description:
          "Daily mobility sessions, respiratory work, and targeted supplements.",
      },
      {
        title: "Family Integration",
        description:
          "Home visit coaching, adaptive device fitting, and periodic reassessment.",
      },
    ],
    stats: [
      { value: "24/7", label: "multidisciplinary helpline" },
      { value: "30%", label: "avg. increase in mobility minutes" },
    ],
  },
  {
    key: "other",
    title: "Other Treatment",
    image: otherImg,
    buttonColor: "#74C425",
    buttonHoverColor: "#0b2fa1",
    tagline: "Custom Integrative Therapies",
    summary:
      "For autoimmune, metabolic, and chronic fatigue cases that require bespoke, cross-disciplinary care.",
    highlights: [
      {
        title: "Root-Cause Labs",
        description:
          "Functional testing for hormones, microbiome, and toxins reveals the full picture.",
      },
      {
        title: "Protocol Design",
        description:
          "We stitch nutrition, herbs, clinical devices, and lifestyle changes into one daily flow.",
      },
      {
        title: "Concierge Follow-Up",
        description:
          "Weekly care navigator calls and unlimited chat keep you supported.",
      },
    ],
    focusAreas: [
      "Comprehensive intake covering sleep, stress, digestion, and exposure history.",
      "Layered detox and remineralization strategy unique to your labs.",
      "Hybrid consultations with visiting specialists when needed.",
      "Digital habit tracking and accountability loops.",
    ],
    steps: [
      {
        title: "Discovery",
        description:
          "Intensive consult plus lab orders to understand your bio-individual needs.",
      },
      {
        title: "Immersive Reset",
        description:
          "30-60 day plan combining therapies, movement, and nervous-system care.",
      },
      {
        title: "Sustain",
        description:
          "Quarterly re-testing and habit optimization to lock in results.",
      },
    ],
    stats: [
      { value: "100%", label: "tailor-made roadmaps" },
      { value: "5+", label: "specialists collaborate per case" },
    ],
  },
];

export const getTreatmentByKey = (key) =>
  TREATMENTS.find((treatment) => treatment.key === key);
