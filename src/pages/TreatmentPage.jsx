import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TreatmentBanner from "../components/TreatmentBanner";
import TreatmentCards from "../components/Treatment_Cards";
import recoveryVideo from "../assets/video/Recovery Animation.mp4";
import ImmunotherapyLabel from "../assets/treatmentpageasset/Group9199.png";
import GroupPeople from "../assets/treatmentpageasset/Grouppeople.png";
import Guypointing from "../assets/treatmentpageasset/guypointing.png";
import Faq from "../assets/treatmentpageasset/faq.png";
import frame from "../assets/treatmentpageasset/frame.png";


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

      <main className="flex flex-col">
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
      <div className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 text-white/50 text-5xl font-bold tracking-widest select-none">
        ~~~
      </div>
      {/* Wavy decoration right */}
      <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 text-white/50 text-5xl font-bold tracking-widest select-none">
        ~~~
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-white font-bold text-xl font-oldstandard md:text-2xl lg:text-4xl font-serif leading-relaxed">
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
    <div className=" w-full bg-gradient-to-r from-[#fda489] via-[#E7581F] to-[#fda489] py-6 px-4 shadow-inner">
      <div className="max-w-4xl mx-auto text-center">
        <h4 className="text-white text-lg md:text-xl font-roboto lg:text-2xl font-semibold italic [text-shadow:_0px_3px_2px_#636262]">
          Get All Solutions to Your Chronic Health Issues, <br />
          We Know You've been suffering since so long.
        </h4>
      </div>
    </div>

  </section>

        {/* Treatment cards */}
        <section className="relative isolate py-5 overflow-hidden">
          <div
            className="absolute inset-0 -z-10 h-[750px]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%)",
              background:
                "linear-gradient(180deg, #e9f7d9 0%, #f7fff0 20%, #74C425 75%, #6cc62a 100%)",
            }}
          />
          <div className="relative">
            <TreatmentCards onNavigate={onNavigate} />
          </div>

          <div className="relative mt-10 sm:mt-14 flex flex-col items-center ">
            <div className="w-full max-w-5xl flex pr-30 items-end justify-between gap-4 sm:gap-6">
              <img
                src={Faq}
                alt="FAQ icon"
                className="h-100 w-75  object-contain drop-shadow-lg"
              />
              <img
                src={Guypointing}
                alt="Person pointing towards questions"
                className="h-100 w-70 object-contain drop-shadow-xl"
              />
              <img
                src={frame}
                alt="Questionnaire illustration"
                className="w-55 object-contain drop-shadow-lg "
              />
            </div>

            <div className="text-center w-[500px]">
              <p className="text-xl sm:text-lg lg:text-3xl font-oldstandard font-semibold uppercase tracking-wide text-[#1b3610]">
                Here are all answers to your often questions:
              </p>
              <div className="mt-2 mx-auto h-0.5 w-50 bg-[#6ab12f]" />
            </div>
          </div>
        </section>

        {/* Questions list */}
        <section className="">
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
