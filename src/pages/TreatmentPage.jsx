import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TreatmentBanner from "../components/TreatmentBanner";
import recoveryVideo from "../assets/video/Recovery Animation.mp4";
import ImmunotherapyLabel from "../assets/treatment page  asset/Group 9199.png";

const faqs = [
  {
    id: 1,
    question: "My hemoglobin is stuck – what is blocking my recovery?",
    answer:
      "This is placeholder answer text. Replace with your real explanation about why hemoglobin may remain low, covering nutrition, bone marrow, inflammation, and effects of previous therapies.",
    perspective:
      "From the NI perspective, focus on rebuilding innate immunity, improving absorption, and reducing toxin load rather than just chasing numbers in reports.",
  },
  {
    id: 2,
    question: "Doctors gave up… can stage 4 cancer still be reversed?",
    answer:
      "This is placeholder answer text. Replace with your real explanation about possibilities, limitations, and importance of holistic care, symptom management, and quality of life.",
    perspective:
      "From the NI perspective, the goal is to work with the body's intelligence, stabilize vital parameters, and aim for best possible recovery instead of surrendering to labels.",
  },
  {
    id: 3,
    question:
      "I tried surgery, stents, medicines… why is my kidney still swollen?",
    answer:
      "This is placeholder answer text. Replace with your real explanation about chronic inflammation, tissue damage, and how supportive therapies may help.",
    perspective:
      "From the NI perspective, focus on reducing systemic toxicity, supporting filtration, hydration, and micro-circulation, rather than only suppressing symptoms.",
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">
          {item.id}. {item.question}
        </span>
        <span className="ml-4 text-xl text-green-600">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 px-4 sm:px-6 py-4 space-y-3 text-sm sm:text-base">
          <div>
            <p className="font-semibold text-red-600 mb-1">Answer:</p>
            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md">
            <p className="font-semibold text-green-700 mb-1">
              NI Perspective:
            </p>
            <p className="text-gray-700 leading-relaxed">
              {item.perspective}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const TREATMENT_CARDS = Array.from({ length: 8 }).map((_, idx) => ({
  id: idx + 1,
  title: "CANCER TREATMENT",
  cta: "SEARCH",
  image:
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80",
}));

function VitaminBadge({ label, color }) {
  return (
    <span
      className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg flex items-center justify-center text-white text-lg font-bold"
      style={{ background: color }}
    >
      {label}
    </span>
  );
}

export default function TreatmentPage({ onNavigate }) {
  const [openId, setOpenId] = useState(1);

  


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <main className="flex-1 ">
        <TreatmentBanner
          mediaType="video"
          mediaSrc={recoveryVideo}
          title="How natural immunotherapy method works on your body"
          subtitle="Understand how toxic load, chronic inflammation, and weak immunity can block recovery — and how natural immunotherapy can support your body's own defense."
          onCtaClick={() => onNavigate?.("contact")}
          
          
        />

        {/* From hopeless to healed */}
        <section className="-mt-12 sm:-mt-16 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-[#5cb624] text-white shadow-2xl py-4 sm:py-5 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left">
                From Hopeless to Healed
              </h2>
              <button
                type="button"
                onClick={() => onNavigate?.("contact")}
                className="bg-white text-[#5cb624] hover:bg-[#1a347f] font-semibold text-sm px-5 py-2 rounded-full shadow-sm transition"
              >
                Learn More
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.("treatment")}
                className="bg-white text-[#5cb624] hover:bg-[#1a347f] font-semibold text-sm px-5 py-2 rounded-full shadow-sm transition"
              >
                Get Therapy
              </button>
            </div>
          </div>
        </section>

        {/* Immunotherapy content */}
        <section className="mt-14">
          <div className="w-full max-w-8xl mx-auto bg-white rounded-[28px] shadow-lg overflow-hidden">
            <div className="w-full bg-gradient-to-r from-[#C7F29B] to-[#E3FFD1] px-6 sm:px-10 py-5 md:py-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2E8A00] uppercase tracking-wide text-center md:text-right leading-snug">
                WE TREAT THROUGH <br className="md:hidden" /> NATURAL IMMUNOTHERAPY:
              </h2>
            </div>

            <div className="bg-[#F5FFE9] px-6 sm:px-10 py-10 md:py-12 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
              {/* Bottle */}
              <div className="bg-[#F5FFE9] mb-10 md:mb-0 flex flex-col items-center md:items-start justify-center">
                <img
                  src={ImmunotherapyLabel}
                  alt="Natural Immunotherapy bottle"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain drop-shadow-xl"
                />
                <div className="mt-4 flex flex-wrap gap-4 transform translate-x-[160px]">
                  <span className="px-3 py-1 rounded-full bg-[#5cb624]/10 text-[#5cb624] text-xs font-semibold">
                    Detox
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#2196f3]/10 text-[#0b74c9] text-xs font-semibold">
                    Repair
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ff9800]/10 text-[#d97706] text-xs font-semibold">
                    Recover
                  </span>
                </div>
              </div>

              {/* TEXT AREA */}
              <div className="space-y-4 md:pr-8">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  We use natural immunotherapy as a food-supplement–based approach that supports the
                  body’s own ability to heal. The method focuses on identifying and replenishing
                  nutritional deficiencies that may weaken the immune system and contribute to
                  various difficult or chronic health issues scientifically.
                </p>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  By restoring balance through targeted natural food supplements, the body is better
                  equipped to defend, repair, and maintain overall well-being. This approach
                  emphasizes supporting innate immunity rather than suppressing symptoms, helping
                  individuals strengthen their health from within.
                </p>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Many individuals facing serious challenges — including cancer, kidney and liver
                  conditions, nerve disorders, and other chronic issues — have shared powerful
                  stories of recovery and renewed energy after following this approach.
                </p>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  If you&apos;re tired of trying one treatment after another and still not feeling
                  the recovery you hoped for, it may be time to choose a different path. Natural
                  immunotherapy helps restore the body’s balance at the root level—giving you
                  renewed strength and hope for your healing journey.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Blue statement */}
        <section className="mt-12 sm:mt-16">
          <div className="bg-[#1f3e96] text-white">
            <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 text-center">
              <p className="text-lg sm:text-xl font-semibold leading-relaxed">
                If you&apos;re tired of trying treatment after treatment without the recovery,
                it&apos;s time to choose a different path.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions banner */}
        <section className="bg-gradient-to-r from-[#ffb167] via-[#f07836] to-[#ffb167]">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-6 text-center text-white">
            <p className="text-lg sm:text-xl font-semibold leading-relaxed">
              Get All Solutions to Your Chronic Health Issues,
              <br className="hidden sm:block" />
              We Know You&apos;ve been suffering since so long.
            </p>
          </div>
        </section>

        {/* Treatment cards */}
        <section className="bg-gradient-to-b from-[#e8f5e9] via-white to-[#e8f5e9] py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-6">
            <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900">
              Explore Treatment Paths
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {TREATMENT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div
                    className="h-28 sm:h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url('${card.image}')` }}
                  />
                  <div className="p-3 text-center space-y-2 flex-1 flex flex-col">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">
                      {card.title}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate?.("cancer-detail")}
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-[#5cb624] text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-full shadow hover:bg-[#4b9c1f]"
                    >
                      {card.cta} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Q&A intro */}
        <section className="relative py-12 sm:py-16 overflow-hidden">
          <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-[#e8f5e9] to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="relative w-full max-w-xs mx-auto">
                  <div className="absolute -left-8 -top-8 h-20 w-20 bg-[#5cb624]/10 rounded-full" />
                  <div className="absolute -right-6 -bottom-6 h-16 w-16 bg-[#1f3e96]/10 rounded-full" />
                  <div className="relative bg-white rounded-[32px] shadow-xl overflow-hidden">
                    <div className="bg-[#e8f5e9] h-12" />
                    <div className="p-6 flex flex-col items-center space-y-4">
                      <div className="bg-[#5cb624]/10 rounded-full px-4 py-2 text-[#5cb624] font-semibold">
                        Q / A
                      </div>
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#f5f5f5] to-[#e5e7eb] flex items-center justify-center text-5xl">
                        🧑‍⚕️
                      </div>
                      <p className="text-center text-sm text-gray-700">
                        Your questions deserve detailed, practical answers from our care team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                  Here Are All Answers to Your Often Questions
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Every patient and family carries dozens of doubts. Instead of leaving them
                  unanswered, we address them clearly so you can make decisions with
                  confidence and clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Questions list */}
        <section className="mt-4">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              List of Questions on Your Mind for Your Complete Recovery
            </h4>
            <ul className="text-sm sm:text-base text-gray-700 leading-relaxed grid sm:grid-cols-2 gap-x-8 gap-y-2 list-decimal list-inside">
              {Array.from({ length: 16 }).map((_, idx) => (
                <li key={idx}>Sample question {idx + 1} (replace with real questions).</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Detailed FAQ */}
        <section className="mt-8 mb-16">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-5">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900">Detailed Answers</h4>
            {faqs.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() =>
                  setOpenId((prev) => (prev === item.id ? null : item.id))
                }
              />
            ))}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
