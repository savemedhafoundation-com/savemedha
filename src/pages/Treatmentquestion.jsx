import Header from "../components/Navbar";
import Footer from "../components/Footer";

export const QUESTIONS = [
  {
    id: 1,
    questionHeading: "Question 1:",
    questionTitle: "1. \"My Hemoglobin Is Stuck - What Is Blocking My Recovery?\"",
    answerHeading: "Answer:",
    answerText: `My struggle with stable hemoglobin, fatigue, breathlessness, weakness and poor recovery might reflect something deeper than medicines alone. When hemoglobin remains low even after months of treatment, it often means the body is not absorbing nutrients properly or immunity is suppressed. Persistent inflammation, weak digestion and chronic metabolic stress might also block long-term recovery.`,
    nitHeading: "NIT Perspective:",
    nitText: `NIT aims at identifying the underlying imbalance including poor blood building, immune stress & poor nutrient absorption which may be silently affecting hemoglobin production. Instead of treating just the numbers, NIT works to strengthen immunity, improve nutrient absorption, restore digestion, detoxify inflammation and prepare the body to naturally rebuild healthy hemoglobin levels.`,
    ctaText: "START NATURAL IMMUNOTHERAPY",
  },
  {
    id: 2,
    questionHeading: "Question 2:",
    questionTitle: "2.\"Doctors Gave Up… Can Stage 4 Cancer Still Be Reversed?\"",
    answerHeading: "Answer:",
    answerText: `Many people reach stage 4 when conventional options are exhausted. But even then, the body can still respond when internal healing mechanisms are supported. While reversal may not be guaranteed, improving immunity, nutrition, detoxification and inflammation control can significantly enhance quality of life and sometimes surprising recovery happens.`,
    nitHeading: "NIT Perspective:",
    nitText: `NIT focuses on re-activating the body’s natural healing potential. By improving immune response, reducing inflammation, repairing damaged tissues and restoring metabolic balance, many patients experience reduced symptoms, better strength, improved appetite and a renewed sense of recovery even when doctors lose hope.`,
    ctaText: "START NATURAL IMMUNOTHERAPY",
  },
];

export default function Treatmentquestion({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="treatment" onNavigate={onNavigate} />

      {/* TOP ORANGE STRIP */}
      <section
        className="mt-10 bg-gradient-to-r from-[#E7581F] via-orange-600 to-white-20 py-4 text-center shadow"
      >
        <p className="text-2xl font-semibold font-roboto text-white text-shadow-lg">
          Lists of Questions of Your Mind for your complete recovery!
        </p>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="mb-20">
            {/* QUESTION NUMBER */}
            <h2 className="text-3xl font-poppins text-gray-900 mb-4">
              {q.questionHeading}
            </h2>

            {/* BLUE TITLE BAR */}
            <div className="bg-gradient-to-r from-[#1118A5] via-blue-800 to-white-50 w-full text-white px-6 py-3 rounded">
              <p className="text-2xl font-weight-400 font-roboto">{q.questionTitle}</p>
            </div>

            {/* ANSWER SECTION */}
            <h3 className="text-3xl  font-poppins text-orange-600 mt-6 mb-2">
              {q.answerHeading}
            </h3>
            <p className="text-gray-700 w-[700px] font-poppins leading-7 mb-6 whitespace-pre-line">
              {q.answerText}
            </p>

            {/* NIT PERSPECTIVE */}
            <h3 className="text-2xl  text-[#62B70D] mt-4 mb-2">
              {q.nitHeading}
            </h3>
            <p className="text-gray-700 w-[700px] font-poppins leading-7 whitespace-pre-line mb-6">
              {q.nitText}
            </p>

            {/* CTA BUTTON */}
            <button className=" w-[200px] bg-[#6AB12F] hover:bg-green-600 text-white font-semibold px-6 py-2 rounded  shadow">
              <a href="https://dantura.com/" target="_blank" rel="noopener noreferrer">
                   {q.ctaText}
               </a>
            </button>
          </div>
        ))}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
