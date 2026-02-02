import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import TreatmentCards from "../components/Treatment_Cards";
import QuestionSection from "../components/QuestionSection";
import useTreatmentCategoryQuestions from "../hooks/useTreatmentCategoryQuestions";


export default function Treatmentquestion({ onNavigate }) {
  const location = useLocation();
  const initialCategory = location.state?.category || null;
  const highlightQuestionId = location.state?.id || null;
  const {
    selectedCategory,
    setSelectedCategory,
    selectedQuestions,
    selectedLabel,
  } = useTreatmentCategoryQuestions(initialCategory);

const questionSectionRef = useRef(null);

  useEffect(() => {
  if (selectedLabel && questionSectionRef.current) {
  const yOffset = -110; // header height
  const y =
    questionSectionRef.current.getBoundingClientRect().top +
    window.pageYOffset +
    yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
  }
}, [selectedLabel]);

const scrollToQuestionSection = () => {
  if (!questionSectionRef.current) return;

  const yOffset = -110; // header height
  const y =
    questionSectionRef.current.getBoundingClientRect().top +
    window.pageYOffset +
    yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};


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

      <main className="mx-auto max-w-8xl px-4 py-12 space-y-10">
        <TreatmentCards 
          onNavigate={onNavigate}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            scrollToQuestionSection(); 
            }}

          selectedCategory={selectedCategory}
        />

        <section
        ref={questionSectionRef} 
        className="relative py-10 px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="text-white text-center py-4 px-4 bg-[linear-gradient(to_right,#74C425_75%,#defcc0_100%)]">
              <h4 className="text-2xl sm:text-3xl font-semibold font-robotocondensed">
                {selectedLabel
                  ? `${selectedLabel} Questions for Your Recovery`
                  : "Select a Treatment Category to See Questions"}
              </h4>
            </div>
            <div className="p-6 md:p-10">
              <QuestionSection
                categoryKey={selectedCategory}
                categoryLabel={selectedLabel}
                questions={selectedQuestions}
                highlightQuestionId={highlightQuestionId}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
