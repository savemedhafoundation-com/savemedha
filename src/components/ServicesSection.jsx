import React from "react";
import TreatmentCards from "./Treatment_Cards";

export default function ServicesSection({ onNavigate }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <TreatmentCards onNavigate={onNavigate} />
      </div>
    </section>
  );
}
