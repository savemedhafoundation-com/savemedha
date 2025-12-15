const createQuestion = ({
  id,
  questionHeading,
  questionTitle,
  answerText = "",
  nitText = "",
  ctaText = "START NATURAL IMMUNOTHERAPY",
}) => ({
  id,
  questionHeading,
  questionTitle,
  answerHeading: "Answer:",
  answerText,
  nitHeading: "NIT Perspective:",
  nitText,
  ctaText,
});

export const TREATMENT_CATEGORY_LABELS = {
  cancer: "Cancer",
  kidney: "Kidney",
  liver: "Liver",
  heart: "Heart",
  nerve: "Nerve",
  thyroid: "Thyroid",
  genital: "Genital",
  spinal: "Spinal",
  vitiligo: "Vitiligo",
  thalassemia: "Thalassemia",
  diabetics: "Diabetics",
  skin: "Skin",
  hair: "Hair",
  constipation: "Constipation",
  indigestion: "Indigestion",
  other: "Other",
};

export const TREATMENT_QUESTIONS_BY_CATEGORY = {
  cancer: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: 'Doctors Gave Up… Can Stage 4 Cancer Still Be Reversed?',
      answerText:
        "Many people reach stage 4 when conventional options are exhausted. But even then, the body can still respond when internal healing mechanisms are supported. While reversal may not be guaranteed, improving immunity, nutrition, detoxification and inflammation control can significantly enhance quality of life and sometimes surprising recovery happens.",
      nitText:
        "NIT focuses on re-activating the body’s natural healing potential. By improving immune response, reducing inflammation, repairing damaged tissues and restoring metabolic balance, many patients experience reduced symptoms, better strength, improved appetite and a renewed sense of recovery even when doctors lose hope.",
    }),
  ],
  kidney: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle:
        "I Tried Surgery, Stents, Medicines... Why Is My Kidney Still Swollen?",
    }),
    createQuestion({
      id: 2,
      questionHeading: "Question 2:",
      questionTitle: "I Took Antibiotics... Why Do My UTIs Keep Coming Back?",
    }),
  ],
  liver: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "My Reports Keep Getting Worse... Why Is My Liver Not Healing?",
    }),
  ],
  heart: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle:
        "Months of Treatment but My Chest Still Feels Heavy... What's the Real Problem?",
    }),
    createQuestion({
      id: 2,
      questionHeading: "Question 2:",
      questionTitle: "I Tried Every Exercise... Why Is My Heart Still Weak?",
    }),
    createQuestion({
      id: 3,
      questionHeading: "Question 3:",
      questionTitle:
        "Nothing Is Lowering My Cholesterol... What Is My Body Trying to Tell Me?",
    }),
  ],
  nerve: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "Why Do I Get Irritated or Sad for No Reason at All?",
    }),
    createQuestion({
      id: 2,
      questionHeading: "Question 2:",
      questionTitle:
        "Months of Therapy and Medicines... Why Is My Mind Still Not Calm?",
    }),
  ],
  thyroid: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle:
        "I Tried Every Medicine... Why Are My Thyroid Symptoms Still Not Improving?",
    }),
  ],
  genital: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "Why Do I Get Pregnant But Miscarry Every Time?",
    }),
    createQuestion({
      id: 2,
      questionHeading: "Question 2:",
      questionTitle: "Why Do I Get Severe Cramps Out of Nowhere Every Day?",
    }),
  ],
  spinal: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle:
        "Why Do My Bones Break So Easily Even With the Smallest Impact?",
    }),
    createQuestion({
      id: 2,
      questionHeading: "Question 2:",
      questionTitle:
        "Doctors Say Nothing Is Wrong... Then Why Does My Body Hurt So Much?",
    }),
    createQuestion({
      id: 3,
      questionHeading: "Question 3:",
      questionTitle:
        "Why Does My Back Hurt Even After Medicines, Exercises, and Therapy?",
    }),
  ],
  vitiligo: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "Why Is My Vitiligo Spreading Even With Treatment?",
    }),
  ],
  thalassemia: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "My Hemoglobin Is Stuck - What Is Blocking My Recovery?",
      answerText:
        "When hemoglobin remains low even after months of treatment, it often means the body is not absorbing nutrients properly or immunity is suppressed. Persistent inflammation, weak digestion and chronic metabolic stress might also block long-term recovery.",
      nitText:
        "NIT aims at identifying the underlying imbalance including poor blood building, immune stress & poor nutrient absorption which may be silently affecting hemoglobin production. Instead of treating just the numbers, NIT works to strengthen immunity, improve nutrient absorption, restore digestion, detoxify inflammation and prepare the body to naturally rebuild healthy hemoglobin levels.",
    }),
  ],
  diabetics: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "If Tablets Aren't Lowering My Blood Sugar, Then What Will?",
    }),
  ],
  skin: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "If Reports Show Nothing, Then What Is Causing My Skin to Peel?",
    }),
  ],
  hair: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "Why Is My Hair Falling Even After Treatment?",
    }),
  ],
  constipation: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "I Eat Less, Exercise More... So Why Won't My Belly Shrink?",
    }),
  ],
  indigestion: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle:
        "Why Does My Acidity Come Back Again and Again Even After Treatment?",
    }),
  ],
  other: [
    createQuestion({
      id: 1,
      questionHeading: "Question 1:",
      questionTitle: "Why Does My Cough Get Worse at Night Even With Medicines?",
    }),
    createQuestion({
      id: 2,
      questionHeading: "Question 2:",
      questionTitle: "I Have Tried Everything for My Eyes... Why Is Nothing Working?",
    }),
    createQuestion({
      id: 3,
      questionHeading: "Question 3:",
      questionTitle:
        "I Still Can't Hear Clearly... Even With Hearing Aids, What's Wrong?",
    }),
    createQuestion({
      id: 4,
      questionHeading: "Question 4:",
      questionTitle: "Nothing Stops My Sinus Attacks... Not Even Medicines... What Should I Do?",
    }),
  ],
};
