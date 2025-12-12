export const getDefaultQuestions = () => {
  const titles = [
    "My Hemoglobin Is Stuck - What Is Blocking My Recovery?",
    "Doctors Gave Up... Can Stage 4 Cancer Still Be Reversed?",
    "I Tried Surgery, Stents, Medicines... Why Is My Kidney Still Swollen?",
    "Why Do My Bones Break So Easily Even With the Smallest Impact?",
    "Why Do I Get Pregnant But Miscarry Every Time?",
    "Why Does My Cough Get Worse at Night Even With Medicines?",
    "Why Do I Get Irritated or Sad for No Reason at All?",
    "Doctors Say Nothing Is Wrong... Then Why Does My Body Hurt So Much?",
    "My Reports Keep Getting Worse... Why Is My Liver Not Healing?",
    "I Have Tried Everything for My Eyes... Why Is Nothing Working?",
    "I Still Can't Hear Clearly... Even With Hearing Aids, What's Wrong?",
    "Why Do I Get Mouth Ulcers Again and Again Without Any Cure?",
    "Why Do I Get Severe Cramps Out of Nowhere Every Day?",
    "I Eat Less, Exercise More... So Why Won't My Belly Shrink?",
    "Why Does My Acidity Come Back Again and Again Even After Treatment?",
    "Months of Treatment but My Chest Still Feels Heavy... What's the Real Problem?",
    "I Tried Every Exercise... Why Is My Heart Still Weak?",
    "If Tablets Aren't Lowering My Blood Sugar, Then What Will?",
    "Nothing Is Lowering My Cholesterol... What Is My Body Trying to Tell Me?",
    "I Tried Every Medicine... Why Are My Thyroid Symptoms Still Not Improving?",
    "Why Does My Back Hurt Even After Medicines, Exercises, and Therapy?",
    "Months of Therapy and Medicines... Why Is My Mind Still Not Calm?",
    "Nothing Stops My Sinus Attacks... Not Even Medicines... What Should I Do?",
    "I Took Antibiotics... Why Do My UTIs Keep Coming Back?",
    "If Reports Show Nothing, Then What Is Causing My Skin to Peel?",
  ]

  return titles.map((title, index) => ({
    id: index + 1,
    questionHeading: `Question ${index + 1}`,
    questionTitle: title,
  }))
}

const Questions = ({ data = getDefaultQuestions() }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {data.map((item) => {
        const hasAnswer = Boolean(item.answerHeading || item.answerText)
        const hasNit = Boolean(item.nitHeading || item.nitText)
        const showDetails = hasAnswer || hasNit

        return (
          <article
            key={item.id || item.questionTitle}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-md"
          >
            <p className="text-lg font-semibold text-gray-800">
              {item.questionHeading}
            </p>
            <h3 className="mt-1 text-xl font-bold text-indigo-900">
              {item.questionTitle}
            </h3>

            {showDetails ? (
              <div className="mt-4 space-y-4">
                {hasAnswer ? (
                  <div>
                    <p className="text-base font-semibold text-amber-600">
                      {item.answerHeading}
                    </p>
                    <p className="mt-1 leading-relaxed text-gray-700">
                      {item.answerText}
                    </p>
                  </div>
                ) : null}

                {hasNit ? (
                  <div>
                    <p className="text-base font-semibold text-green-700">
                      {item.nitHeading}
                    </p>
                    <p className="mt-1 leading-relaxed text-gray-700">
                      {item.nitText}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}

            {item.ctaText ? (
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                {item.ctaText}
              </button>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}

export default Questions
