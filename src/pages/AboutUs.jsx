import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import HeroBackground from '../assets/Photo/background.jpg';
import DoctorImage from '../assets/Photo/doc.png';

const highlightText = [
  "Medha was a vibrant, spirited 14-year-old girl from Nator, Bangladesh, who had a rare gift, as she lit up every room she entered with her innocent smile and boundless curiosity. A dreamer with an artist's heart, her life was filled with joy, school, friends, and laughter until her world was abruptly changed by a diagnosis of blood cancer. What followed was a painful journey of hospital stays, rigorous chemotherapy, and unimaginable struggle. Despite the physical pain that weighed heavy in her deep, soulful eyes, Medha chose to smile - her light refusing to dim. Support for her battle came from near and far, touching hearts across the world. Renowned figures like Ratan Tata and Sonu Sood, Salman Khan, known for their generosity, extended their aid. But the disease took its toll, and Medha, despite all the love and efforts surrounding her, took her last breath, leaving behind a void that words could never fill.",
  "Through our initial efforts of providing direct financial support to patients' families, we recognized a crucial gap in the treatment process. Many patients were not receiving the comprehensive care needed for recovery, resulting in heartbreaking losses. Realizing the need for change, we decided to break this cycle and explored the treatment method of Natural Immunotherapy, that empowers the body's immune system to fight against cancer without the conventional treatments like chemotherapy, radiation, or surgery. Today, we proudly stand by this innovative and holistic method, with a remarkable 80-95% success rate in helping patients recover and reclaim their lives.",
  "Turning points came on the border, when we were delivering their little angel's dead body to their family. Everyone was crying. But our fight does not stop with cancer. We promised that now we would not let go any Medha anymore. We will fight and we will defeat cancer. We will make a cancer free world. A new battle started. We can not depend on others; now this is our own battle.",
  "We do not want to fight this battle with hired weapons from others. A weapon with a very low success rate in combat that cost us the loss of our little girl today. We do not want to lose any more loved ones. We want to make our own weapons, with which it is possible to eradicate the epidemic called cancer.",
  "On those days we had no idea about cancer. We started to gather knowledge. We started to follow research and progress on cancer treatment. We started to watch the practical cancer patient. We tried to understand their problems, the pain they are suffering. We tried to find what cancer is, how it is entering the body, how it is growing, and how it is traveling through the body. Why did medical science fail to stop that? Why can they not make a cancer free world? In the history of medical science, they have managed to control many epidemics before. Epidemics like the plague have been eradicated. But why are they losing to cancer?",
  "We got an idea from Nobel Prize winners Tasuku Honjo and James Allison, that cancer can be cured 100%. But the treatment cost is too high. We got the concept that, if we can boost our own immune system, then we can solve most physical disorders. Cancer is one of them. But how?",
  "Now we started to learn: what is the immune system? According to medical science, is it correct or is it something different? How can we boost our own immune system? How will it fight against different types of cancer? How will it recover a damaged cancerous organ or a body part? How long will it take? What will be the side effects? How much will it cost? Will that be affordable for everyone? What will be the success rate? When and why will it come back again? Hundreds of questions, but there was no answer. We tried to find the correct answers. Everyone's body was a new textbook. Everyone's problems were a new page. Everyone's health was a new chapter. And finally, we read and understood the book. And we saw success.",
];

export default function AboutUs({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="about" onNavigate={onNavigate} />
      <main className="w-full">
        <section className="relative h-[320px] md:h-[380px] lg:h-[420px] flex items-center justify-center text-white overflow-hidden">
          <img
            src={HeroBackground}
            alt="Cancer research abstract background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative text-center space-y-4 px-4">
            <p className="text-sm tracking-[0.3em] uppercase text-gray-200">
              Save Medha Foundation
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
              ABOUT US
            </h1>
            <div className="w-20 h-1 bg-[#74C425] mx-auto" />
          </div>
        </section>

        <section className="relative bg-white">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#f7f7f7] to-transparent rounded-br-[60px]" />
          <div className="absolute top-6 right-8 w-16 h-16 border-4 border-[#74C425] rounded-full opacity-40" />

          <div className="relative max-w-6xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
            <div className="text-center space-y-4 mb-10">
              <p className="text-lg font-semibold text-gray-700 tracking-wider">
                <span className="uppercase text-gray-900">A Death</span>
                <span className="text-gray-700"> That Inspired To Change The World:</span>
              </p>
              <p className="text-3xl md:text-4xl font-bold text-[#74C425]">
                Save Medha Foundation
              </p>
            </div>

            <div className="bg-white shadow-xl rounded-[30px] border border-[#f2f2f2] p-8 md:p-12 space-y-6 leading-relaxed text-gray-700">
              {highlightText.map((paragraph, idx) => (
                <p key={idx} className="text-justify text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5fbf4] py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 grid gap-12 md:grid-cols-2 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#74C425] rounded-full opacity-30" />
              <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-[#74C425] opacity-10 rounded-3xl rotate-6" />
              <img
                src={DoctorImage}
                alt="Save Medha Foundation care"
                className="relative rounded-3xl shadow-2xl border-4 border-white object-cover w-full"
              />
            </div>
            <div className="space-y-6 text-gray-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Carrying Medha's Light Forward
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Every patient who walks through our doors carries a story, a dream, and the same unwavering hope that Medha held onto.
                Our team blends compassion with pioneering science, empowering the immune system to lead the healing journey. From counseling
                and diagnostics to holistic natural therapies, we support families with the care and dignity they deserve.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Save Medha Foundation is more than an organization - it is a promise that no family will have to face cancer alone.
                Together, we are building a future where love, science, and community rewrite what it means to survive and thrive.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('home')}
                  className="bg-[#74C425] hover:bg-[#5a9c1c] text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  Back To Home
                </button>
                <button
                  type="button"
                  className="border-2 border-[#74C425] text-[#74C425] hover:bg-[#74C425] hover:text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  Support The Mission
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
