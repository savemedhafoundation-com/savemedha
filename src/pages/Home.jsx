import AboutSection from '../components/AboutSection';
import CancerTreatmentPage from '../components/CancerTreatmentPage';
import Footer from '../components/Footer';
import HomePage from '../components/HeroSection';
import Navbar from '../components/Navbar';
import VolunteerAndSupportSection from '../components/VolunteerAndSupportSection';
import Treatment from './Treatment';

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="home" onNavigate={onNavigate} />
      <main className="w-full px-20 space-y-16">
        <HomePage />
        <CancerTreatmentPage />
        <VolunteerAndSupportSection />
        <AboutSection onNavigate={onNavigate} />
       
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
