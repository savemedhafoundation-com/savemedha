import TreatmentCards from './Treatment_Cards';

export default function ServicesSection({ onNavigate }) {
  return (
    <section className="home-section bg-[#F8FDF6]">
      <div className="home-container max-w-[1950px]">
        <TreatmentCards onNavigate={onNavigate} />
      </div>
    </section>
  );
}
