import AboutSection from '../components/AboutSection';
import CancerTreatmentPage from '../components/CancerTreatmentPage';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import ServicesSection from '../components/ServicesSection';
import VolunteerAndSupportSection
  from '../components/VolunteerAndSupportSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CancerTreatmentPage />
      <VolunteerAndSupportSection />
      <AboutSection />
      <Footer />
    </div>
  );
}