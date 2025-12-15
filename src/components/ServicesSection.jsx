import TreatmentCards from "./Treatment_Cards";
import QuestionSection from "./QuestionSection";
import useTreatmentCategoryQuestions from "../hooks/useTreatmentCategoryQuestions";

export default function ServicesSection({ onNavigate }) {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedQuestions,
    selectedLabel,
  } = useTreatmentCategoryQuestions();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <TreatmentCards
          onNavigate={onNavigate}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <div className="mt-10">
          <QuestionSection
            categoryLabel={selectedLabel}
            questions={selectedQuestions}
          />
        </div>
      </div>
    </section>
  );
}
