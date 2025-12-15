import { useMemo, useState } from "react";

import {
  TREATMENT_CATEGORY_LABELS,
  TREATMENT_QUESTIONS_BY_CATEGORY,
} from "../data/treatmentQuestionsByCategory";

export default function useTreatmentCategoryQuestions(initialCategory = null) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const selectedQuestions = useMemo(() => {
    if (!selectedCategory) return [];
    return TREATMENT_QUESTIONS_BY_CATEGORY[selectedCategory] || [];
  }, [selectedCategory]);

  const selectedLabel = useMemo(() => {
    if (!selectedCategory) return "";
    return TREATMENT_CATEGORY_LABELS[selectedCategory] || selectedCategory;
  }, [selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedQuestions,
    selectedLabel,
  };
}

