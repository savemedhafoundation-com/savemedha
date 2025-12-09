import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import HomePage from '../components/HeroSection';
import Navbar from '../components/Navbar';
import VolunteerAndSupportSection from '../components/VolunteerAndSupportSection';

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="home" onNavigate={onNavigate} />
      <main className="w-full px-20">
        <HomePage />
        {/* <VolunteerAndSupportSection /> */}
        <AboutSection onNavigate={onNavigate} />
       
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
