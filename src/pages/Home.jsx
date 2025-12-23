import Footer from "../components/Footer";
import HomePage from "../components/HeroSection";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/TestimonialsSection";
import VolunteerAndSupportSection from "../components/VolunteerAndSupportSection";

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="home" onNavigate={onNavigate} />
      <main className="w-full px-4 sm:px-6 md:px-20">
        <HomePage onNavigate={onNavigate} />
        <VolunteerAndSupportSection onNavigate={onNavigate} />
        <div className="mt-16">
          <TestimonialsSection />
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
