import React, { useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TreatmentBanner from "../components/TreatmentBanner";
import TreatmentCards from "../components/Treatment_Cards";
import Search from "../components/Search";
import recoveryVideo from "../assets/video/Recovery Animation.mp4";
import ImmunotherapyLabel from "../assets/treatmentpageasset/Group9199.png";
import GroupPeople from "../assets/treatmentpageasset/Grouppeople.png";
import Guypointing from "../assets/treatmentpageasset/guypointing.png";
import Faq from "../assets/treatmentpageasset/faq.png";
import frame from "../assets/treatmentpageasset/frame.png";
import GreenCapsules from "../assets/treatmentpageasset/greencapsules.png";
import CTAbanner from "../assets/treatmentpageasset/CTAbanner.png";
import { TREATMENT_QUESTIONS_BY_CATEGORY } from "../data/treatmentQuestionsByCategory";

export default function TreatmentPage({ onNavigate }) {
  const questionLinks = useMemo(() => {
    return Object.entries(TREATMENT_QUESTIONS_BY_CATEGORY).flatMap(
      ([category, questions]) =>
        (questions || []).map((question) => ({
          category,
          id: question.id,
          questionTitle: question.questionTitle,
        }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <main className="flex flex-col">
        <TreatmentBanner
          mediaType="video"
          mediaSrc={recoveryVideo}
          title="How natural immunotherapy method works on your body"
          subtitle="Understand how toxic load, chronic inflammation, and weak immunity can block recovery and how natural immunotherapy can support your body's own defense."
          onCtaClick={() => onNavigate?.("contact")}
        />

        {/* From hopeless to healed */}
        <section className="-mt-10 sm:-mt-14 relative z-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-[#6AB12F] h-[70px] rounded-[5px] shadow-md py-4 sm:py-5 px-6 flex flex-col items-center justify-center gap-4 text-white">
              <h2 className="text-3xl sm:text-3xl font-oldstandard font-extrabold tracking-wide text-center">
                From Hopeless to Healed:
              </h2>

      {/* Buttons */}
      <div className=" absolute flex items-center pt-25 gap-4">
        <button
          type="button"
          onClick={() => onNavigate?.("treatment-questions")}
          className="bg-white text-[#6AB12F] font-semibold text-sm sm:text-base px-6 py-2 rounded-[7px] cursor-pointer shadow-md transition-all duration-100 ease-out transform hover:scale-105 hover:shadow-lg"
        >
          Learn More
        </button>

                <button
                  type="button"
                  className="bg-white text-[#6AB12F] font-semibold text-sm sm:text-base px-6 py-2 rounded-[7px] cursor-pointer shadow-md transition-all duration-100 ease-out transform hover:scale-105 hover:shadow-lg"
                >
                  <a href="https://dantura.com/" target="_blank" rel="noopener noreferrer">
                  Get Therapy
                  </a>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Immunotherapy content */}
        <section className="w-full py-10 px-4">
          <div className="max-w-7xl mx-auto bg-[#F5FFE9] rounded-[30px] p-6 md:p-12 relative overflow-hidden ">
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 relative z-10 items-start">
              <div className="relative flex flex-col items-center mt-10 md:mt-0">
                <div className="relative z-10 mt-16 md:mt-20">
                  <img
                    src={ImmunotherapyLabel}
                    alt="Natural Immunotherapy bottle"
                    className="w-full max-w-[240px] md:max-w-[400px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 -left-[100px] right-[-100px] bg-gradient-to-r from-[#FFFFFF00] via-[#74C42580] to-[#FFFFFF00] -z-10 opacity-100 h-full w-[150%] rounded-l-full"></div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-shippori  uppercase tracking-wide leading-tight py-4">
                    WE TREAT THROUGH <br /> NATURAL IMMUNOTHERAPY:
                  </h2>
                </div>

                <div className="space-y-4 text-black text-xs md:text-sm lg:text-[15px] font-poppins leading-relaxed text-justify font-medium">
                  <p>
                    We use natural immunotherapy as a food-supplement-based approach that supports the body's own ability to heal. The method focuses on identifying and replenishing nutritional deficiencies that may weaken the immune system and contribute to various difficult or chronic health issues scientifically. By restoring balance through targeted natural food supplements, the body is better equipped to defend, repair, and maintain overall well-being. This approach emphasizes supporting innate immunity rather than suppressing symptoms, helping individuals strengthen their health from within.
                  </p>
                  <p>
                    Many individuals facing serious challenges — including cancer, kidney and liver conditions, nerve disorders, and other chronic issues — have shared powerful stories of recovery and renewed energy after following this approach.
                  </p>
                  <p>
                    So, if you are also among of them who're tired of trying one treatment after another and still not feeling the recovery you hoped for, it may be time to choose a different path. Many people come to us after months or even years of medication, therapies, or procedures, looking for something that supports the body more naturally. At Save Medha Foundation, our natural immunotherapy approach focuses on rebuilding strength from within by correcting nutritional imbalances and reinforcing the body's own immune power. This method is designed to help the body restore its balance at the root level, giving you a renewed sense of hope and a healthier direction for your healing journey.
                  </p>
                </div>

                <div className="mt-8 ">
                  <button className="bg-[#7BC043] w-[300px] hover:bg-green-600 transition cursor-pointer text-white font-bold font-opensans py-3 px-8 rounded-[4px] shadow-md uppercase tracking-wider transition-colors text-base md:text-lg  ">
                    <a href="https://dantura.com/" target="_blank" rel="noopener noreferrer">
                      START NATURAL IMMUNOTHERAPY
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blue statement */}
        <section className="w-full ">
          <div className="w-full bg-[#001E8C] rounded-bl-4xl rounded-tr-4xl py-8 px-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 text-white/50 text-5xl font-bold tracking-widest select-none">
              ~~~
            </div>
            <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 text-white/50 text-5xl font-bold tracking-widest select-none">
              ~~~
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-white font-bold text-xl font-oldstandard md:text-2xl lg:text-4xl font-serif leading-relaxed">
                If you're tired of trying treatment after <br className="hidden md:block" />
                treatment without the recovery, <br className="hidden md:block" />
                it's time to choose a different path.
              </h3>
            </div>
          </div>

          <div className="w-full bg-white h-[500px] py-10 flex justify-center">
            <img
              src={GroupPeople}
              alt="Group of happy people pointing"
              className="w-full max-w-4xl h-[470px] object-contain"
            />
          </div>

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
        <section className="relative isolate py-6 overflow-hidden">
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

        {/* Lists of Questions */}
        <section className="relative py-10 px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="  text-white text-center py-4 px-4 bg-[linear-gradient(to_right,#74C425_75%,#defcc0_100%)]">
              <h4 className="text-2xl sm:text-3xl font-semibold font-robotocondensed ">
                Lists of Questions of Your Mind for your complete recovery
              </h4>
            </div>

            <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-10">
              <ol className="flex-1 list-decimal list-inside space-y-2 text-sm sm:text-base text-gray-800 leading-relaxed">
                {questionLinks.map((item) => (
                  <li key={`${item.category}-${item.id}`}>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate?.("treatment-questions", {
                          category: item.category,
                          id: item.id,
                        })
                      }
                      className="text-left cursor-pointer hover:text-green-700 hover:underline underline-offset-2"
                    >
                      {item.questionTitle}
                    </button>
                  </li>
                ))}
              </ol>

              <div className="flex justify-center md:items-center">
                <img
                  src={GreenCapsules}
                  alt="Green capsules"
                  className="w-44 sm:w-52 md:w-64 drop-shadow-lg"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pb-8 px-6">
              <button
                type="button"
                onClick={() =>
                  onNavigate?.("treatment-questions", { category: "cancer" })
                }
                className="bg-[#7BC043] w-[300px] hover:bg-green-600 transition cursor-pointer text-white font-bold font-opensans py-3 px-8 rounded-[4px] shadow-md uppercase tracking-wider transition-colors text-base md:text-lg  "
              >
                CLICK HERE TO KNOW MORE
              </button>
              <button
                type="button"
                className="bg-[#7BC043] w-[300px] h-[80px] flex items-center justify-center hover:bg-green-600 transition cursor-pointer text-white font-bold font-opensans rounded-[4px] shadow-md uppercase tracking-wider text-base md:text-lg"

              >
                <a href="https://dantura.com/" target="_blank" rel="noopener noreferrer">
                      START NATURAL IMMUNOTHERAPY
                </a>
              </button>
            </div>
          </div>
        </section>

        {/* Yellow marquee banner */}
        <section className="bg-yellow-400 py-3 text-center justify-items-center sm:text-lg font-semibold text-blue-900 uppercase">
          <marquee
            behavior="scroll"
            direction="left"
            scrollAmount="15"
          >
            We don’t fight the body, we empower it. Natural Immunotherapy helps the body defeat cancer from within. KNOW MORE.
          </marquee>
        </section>

        <section
          className=" mt-10 h-[690px] py-35 px-4"
          style={{
            backgroundImage: `url(${CTAbanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-6xl mx-auto  flex justify-start">
            <div className="absolute w-full sm:w-[420px] md:w-[575px]">
              <Search onNavigate={onNavigate} />
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
