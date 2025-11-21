import BgOffice from '../assets/Photo/background.jpg';

export default function AboutSection({ onNavigate }) {
  const handleReadMore = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('about');
    }
  };

  return (
    <section
      className="py-16 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgOffice})` }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center">
          <div className="w-1/2 mb-0">
            <div className="about-box">
              <h2 className="text-3xl font-bold text-white mb-6">ABOUT OUR FOUNDATION</h2>
              <p className="text-white mb-6">
                Save Medha Foundation is a dedicated NGO committed to fighting cancer through Natural Immunotherapy - a holistic, science-backed approach that empowers the body's own immune system to combat cancer naturally. We have broken away from conventional medical procedures to establish an innovative and effective Natural Immunotherapy treatment system for our patients.
              </p>
              <p className="text-white mb-6">
                Remarkably, over 90% of our blood cancer patients have achieved recovery through our methods. Many of them came to us after exhausting all other medical options that left them weaker and without guaranteed results. Today, they stand as living examples of hope and healing - fully satisfied and rejuvenated through the power of natural recovery.
              </p>
              <p className="text-white mb-6">
                At Save Medha Foundation, we believe in redefining cancer care - not by suppressing symptoms, but by restoring life through nature's own defense system.
              </p>
              <button
                type="button"
                onClick={handleReadMore}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded font-bold transition-colors cursor-pointer"
              >
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
