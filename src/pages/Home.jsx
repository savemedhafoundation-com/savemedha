import AboutSection from '../components/AboutSection';
import CancerTreatmentPage from '../components/CancerTreatmentPage';
import Footer from '../components/Footer';
import HomePage from '../components/HeroSection'; 
import Navbar from '../components/Navbar';
import VolunteerAndSupportSection from '../components/VolunteerAndSupportSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="w-full px-20 space-y-16">
        <HomePage />
        <CancerTreatmentPage />
        <VolunteerAndSupportSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
