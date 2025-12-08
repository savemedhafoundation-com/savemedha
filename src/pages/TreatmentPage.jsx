import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TreatmentBanner from "../components/TreatmentBanner";
import recoveryVideo from "../assets/video/Recovery Animation.mp4";
import ImmunotherapyLabel from "../assets/treatmentpageasset/Group9199.png";
import GroupPeople from "../assets/treatmentpageasset/Grouppeople.png";


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
        <section className="-mt-10 sm:-mt-14 relative z-20">
  <div className="max-w-3xl  mx-auto px-4">
    <div className="bg-[#6AB12F] h-[70px] rounded-[5px] shadow-md py-4 sm:py-5 px-6 flex flex-col items-center justify-center gap-4 text-white">

      {/* Title */}
      <h2 className="text-3xl sm:text-3xl font-oldstandard font-extrabold tracking-wide text-center">
        From Hopeless to Healed:
      </h2>

      {/* Buttons */}
      <div className=" absolute flex items-center pt-25 gap-4">
        <button
          type="button"
          onClick={() => onNavigate?.("contact")}
          className="bg-white text-[#6AB12F] font-semibold text-sm sm:text-base px-6 py-2 rounded-[7px] cursor-pointer shadow-md transition-all duration-100 ease-out transform hover:scale-105 hover:shadow-lg"
        >
          Learn More
        </button>

        <button
          type="button"
          onClick={() => onNavigate?.("treatment")}
          className="bg-white text-[#6AB12F] font-semibold text-sm sm:text-base px-6 py-2 rounded-[7px] cursor-pointer shadow-md transition-all duration-100 ease-out transform hover:scale-105 hover:shadow-lg"
        >
          Get Therapy
        </button>
      </div>

    </div>
  </div>
</section>


        {/* Immunotherapy content */}
        <section className="w-full py-10 px-4">
  <div className="max-w-7xl mx-auto bg-[#F5FFE9] rounded-[30px] p-6 md:p-12 relative overflow-hidden ">

    <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 relative z-10 items-start">

      {/* LEFT COLUMN: Bubbles + Bottle */}
      <div className="relative flex flex-col items-center mt-10 md:mt-0">

        

        {/* Bottle Image */}
        <div className="relative z-10 mt-16 md:mt-20">
          <img
            src={ImmunotherapyLabel}
            alt="Natural Immunotherapy bottle"
            className="w-full max-w-[240px] md:max-w-[400px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* RIGHT COLUMN: Content */}
      <div className="flex flex-col">

        {/* Header Section */}
        <div className="relative mb-6">
          {/* Background Bar */}
          <div className="absolute inset-y-0 -left-[100px] right-[-100px] bg-gradient-to-r from-[#FFFFFF00] via-[#74C42580] to-[#FFFFFF00] -z-10 opacity-100 h-full w-[150%] rounded-l-full"></div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-shippori  uppercase tracking-wide leading-tight py-4">
            WE TREAT THROUGH <br /> NATURAL IMMUNOTHERAPY:
          </h2>
        </div>

        {/* Paragraphs */}
        <div className="space-y-4 text-black text-xs md:text-sm lg:text-[15px] font-poppins leading-relaxed text-justify font-medium">
          <p>
            We use natural immunotherapy as a food-supplement–based approach that supports the body’s own ability to heal. The method focuses on identifying and replenishing nutritional deficiencies that may weaken the immune system and contribute to various difficult or chronic health issues scientifically. By restoring balance through targeted natural food supplements, the body is better equipped to defend, repair, and maintain overall well-being. This approach emphasizes supporting innate immunity rather than suppressing symptoms, helping individuals strengthen their health from within.
          </p>
          <p>
            Many individuals facing serious challenges — including cancer, kidney and liver conditions, nerve disorders, and other chronic issues — have shared powerful stories of recovery and renewed energy after following this approach.
          </p>
          <p>
            So, if you are also among of them who're tired of trying one treatment after another and still not feeling the recovery you hoped for, it may be time to choose a different path. Many people come to us after months or even years of medication, therapies, or procedures, looking for something that supports the body more naturally. At Save Medha Foundation, our natural immunotherapy approach focuses on rebuilding strength from within by correcting nutritional imbalances and reinforcing the body's own immune power. This method is designed to help the body restore its balance at the root level, giving you a renewed sense of hope and a healthier direction for your healing journey.
          </p>
        </div>

        {/* Button */}
        <div className="mt-8 ">
          <button className="bg-[#7BC043] w-[300px] hover:bg-[#6ca83a] cursor-pointer text-white font-bold font-opensans py-3 px-8 rounded-[4px] shadow-md uppercase tracking-wider transition-colors text-base md:text-lg  ">
           <a href="https://dantura.com/" target="_blank" rel="noopener noreferrer">START NATURAL IMMUNOTHERAPY</a> 
          </button>
        </div>

      </div>
    </div>
  </div>
</section>



        {/* Blue statement */}
        <section className="w-full ">

    {/* Blue Banner */}
    <div className="w-full bg-[#001E8C] rounded-bl-4xl rounded-tr-4xl py-8 px-4 relative overflow-hidden">
      {/* Wavy decoration left */}
      <div className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 text-white/50 text-4xl font-bold tracking-widest select-none">
        ~~~
      </div>
      {/* Wavy decoration right */}
      <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 text-white/50 text-4xl font-bold tracking-widest select-none">
        ~~~
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed">
          If you’re tired of trying treatment after <br className="hidden md:block" />
          treatment without the recovery, <br className="hidden md:block" />
          it’s time to choose a different path.”
        </h3>
      </div>
    </div>

    {/* People Image Group */}
    <div className="w-full bg-white h-[500px] py-10 flex justify-center">
      {/* Placeholder for the group image. Ensure you import 'GroupPeople' or replace src with actual path */}
      <img
        src={GroupPeople}
        alt="Group of happy people pointing"
        className="w-full max-w-4xl h-[470px] object-contain"
      />
    </div>

    {/* Orange Gradient Banner */}
    <div className=" w-full bg-gradient-to-r from-[#FFCCBC] via-[#FFAB91] to-[#FFCCBC] py-6 px-4 shadow-inner">
      <div className="max-w-4xl mx-auto text-center">
        <h4 className="text-[#BF360C] text-lg md:text-xl lg:text-2xl font-bold italic">
          Get All Solutions to Your Chronic Health Issues, <br />
          We Know You've been suffering since so long.
        </h4>
      </div>
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
