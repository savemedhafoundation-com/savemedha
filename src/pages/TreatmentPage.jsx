import { useMemo, useState } from "react";
import { ChevronRight, HelpCircle, Leaf, Search as SearchIcon, ShieldCheck, Sparkles } from "lucide-react";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StartNaturalImmunotherapyButton from "../components/StartNaturalImmunotherapyButton";
import ImmunotherapyBottle from "../assets/treatmentpageasset/Group9199.png";
import GroupPeople from "../assets/treatmentpageasset/Grouppeople.png";
import GreenCapsules from "../assets/treatmentpageasset/greencapsules.png";
import CancerImage from "../assets/treatmentpageasset/TREATMENT IMAGES/CANCER.png";
import KidneyImage from "../assets/treatmentpageasset/TREATMENT IMAGES/KIDNEY.png";
import LiverImage from "../assets/treatmentpageasset/TREATMENT IMAGES/LIVER.png";
import SkinImage from "../assets/treatmentpageasset/TREATMENT IMAGES/SKIN.png";
import ThyroidImage from "../assets/treatmentpageasset/TREATMENT IMAGES/THYROID.png";
import HeartImage from "../assets/treatmentpageasset/TREATMENT IMAGES/HEART.png";
import { TREATMENT_QUESTIONS_BY_CATEGORY } from "../data/treatmentQuestionsByCategory";

const HERO_BACKGROUND_URL =
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1800&q=80";

const treatmentCards = [
  {
    key: "cancer",
    title: "Cancer Treatment",
    image: CancerImage,
    text: "Natural immune support for complex cancer recovery journeys.",
  },
  {
    key: "kidney",
    title: "Kidney Treatment",
    image: KidneyImage,
    text: "Structured support for kidney function and urinary wellness.",
  },
  {
    key: "nerve",
    title: "Nerve Treatment",
    image: HeartImage,
    text: "Natural care for nerve weakness, stress, and body imbalance.",
  },
  {
    key: "diabetics",
    title: "Diabetics Treatment",
    image: ThyroidImage,
    text: "Metabolic support focused on balance and daily vitality.",
  },
  {
    key: "constipation",
    title: "Constipation Treatment",
    image: LiverImage,
    text: "Digestive support for comfort, detox, and better absorption.",
  },
  {
    key: "skin",
    title: "Skin Treatment",
    image: SkinImage,
    text: "Natural skin wellness support from the inside out.",
  },
];

const stripPrefix = (title = "") => title.replace(/^\d+\.?\s*/, "").trim();

function TreatmentQuery({ onNavigate, questionLinks }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return questionLinks.filter((item) => item.questionTitle.toLowerCase().includes(term));
  }, [query, questionLinks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const target = matches[0];
    if (!target) return;
    onNavigate?.("treatment-questions", { category: target.category, id: target.id });
  };

  return (
    <div className="grid gap-7 md:grid-cols-[1fr_300px] md:items-center">
      <form onSubmit={handleSubmit} className="bg-[#f1f1f1] p-7 shadow-sm">
        <h3 className="font-poppins text-2xl font-black leading-tight text-[#1d241f]">
          Ask us your health
          <span className="block">related queries</span>
        </h3>

        <div className="relative mt-6">
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSubmitted(false);
            }}
            placeholder="Type your condition here..."
            aria-label="Search treatment questions"
            className="h-12 w-full rounded-[4px] border border-[#d8ddd8] bg-white pl-4 pr-11 text-sm font-semibold text-[#1d241f] outline-none transition focus:border-[#159b17]"
          />
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b938b]" size={18} />
        </div>

        {matches.length ? (
          <div className="mt-4 max-h-40 overflow-auto rounded-[4px] bg-white p-3">
            {matches.slice(0, 4).map((item) => (
              <button
                key={`${item.category}-${item.id}`}
                type="button"
                onClick={() => onNavigate?.("treatment-questions", { category: item.category, id: item.id })}
                className="block w-full rounded-[4px] px-2 py-2 text-left text-xs font-bold text-[#2f3a31] hover:bg-[#e6f8e3] hover:text-[#159b17]"
              >
                {item.questionTitle}
              </button>
            ))}
          </div>
        ) : null}

        {submitted && !matches.length ? (
          <p className="mt-3 text-sm font-semibold text-[#b13f18]">No matching questions found. Try another keyword.</p>
        ) : null}

        <button
          type="submit"
          className="mt-5 rounded-[5px] bg-[#35bd22] px-5 py-2.5 text-sm font-black text-white shadow-[0_10px_22px_rgba(53,189,34,0.22)] transition hover:bg-[#159b17]"
        >
          Submit Query
        </button>
      </form>

      <div className="flex min-h-[250px] items-center justify-center bg-white p-7 shadow-[0_16px_45px_rgba(25,61,31,0.12)]">
        <div className="relative">
          <div className="absolute -left-7 -top-5 text-[#ff8bc1]">
            <HelpCircle size={24} />
          </div>
          <div className="absolute right-0 top-0 text-[#9e5cff]">
            <Sparkles size={22} />
          </div>
          <img src={GreenCapsules} alt="Natural immunotherapy green capsules" className="w-48 object-contain" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default function TreatmentPage({ onNavigate }) {
  const questionLinks = useMemo(() => {
    const seen = new Set();

    return Object.entries(TREATMENT_QUESTIONS_BY_CATEGORY)
      .flatMap(([category, questions]) =>
        (questions || []).map((question) => ({
          category,
          id: question.id,
          questionTitle: stripPrefix(question.questionTitle),
        }))
      )
      .filter((item) => {
        const key = item.questionTitle.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, []);

  const featuredQuestions = questionLinks.slice(0, 10);

  return (
    <div className="min-h-screen bg-white text-[#1e2520]">
      <Seo
        title="Natural Immunotherapy Treatment"
        description="Discover Save Medha Foundation's holistic Natural Immunotherapy approach to treating cancer and chronic diseases."
        path="/treatment"
      />
      <Navbar currentPage="treatment" onNavigate={onNavigate} />

      <main className="w-full overflow-hidden">
        <section className="relative flex min-h-[500px] items-center justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
          <img
            src={HERO_BACKGROUND_URL}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#073d12]/90 via-[#058312]/78 to-[#159b17]/70" />
          <div className="absolute right-[18%] top-16 h-24 w-24 rounded-full bg-[#4bd62f]/60 blur-[2px]" />
          <div className="absolute bottom-12 right-[8%] h-32 w-32 rounded-full bg-[#35bd22]/60 blur-[2px]" />

          <div className="relative mx-auto max-w-4xl">
            <h1 className="font-poppins text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              From Hopeless
              <span className="block">to Healed:</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold text-[#e8fae4] sm:text-base">
              Restoring hope through natural healing and compassionate care.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate?.("treatment-questions")}
                className="rounded-full bg-[#159b17] px-7 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition hover:bg-[#0f7c12]"
              >
                Learn More
              </button>
              <StartNaturalImmunotherapyButton
                className="rounded-full px-7 py-3 text-sm"
                px=""
                py=""
                children="Get Therapy"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[380px_1fr]">
            <div className="relative mx-auto w-full max-w-[360px]">
              <span className="absolute -left-4 bottom-20 h-20 w-20 rounded-full bg-[#e4f8de]" />
              <img
                src={ImmunotherapyBottle}
                alt="Natural immunotherapy food supplement bottle"
                className="relative w-full object-contain drop-shadow-[0_20px_35px_rgba(32,74,38,0.18)]"
                loading="lazy"
              />
            </div>

            <div>
              <p className="inline-flex items-center rounded-full bg-[#e9fbe7] px-4 py-1.5 text-xs font-black text-[#159b17]">
                <Leaf size={14} className="mr-2" />
                Our Approach
              </p>
              <h2 className="mt-4 font-poppins text-3xl font-black uppercase leading-tight text-[#1d241f] sm:text-4xl">
                We treat through
                <span className="block text-[#159b17]">Natural Immunotherapy</span>
              </h2>
              <div className="mt-5 space-y-4 text-[14px] font-semibold leading-[1.75] text-[#3f473f]">
                <p>
                  We use natural immunotherapy as a food-supplement-based approach that supports the body's own ability to heal. The method focuses on identifying and replenishing nutritional deficiencies that may weaken immunity and contribute to difficult or chronic health issues.
                </p>
                <p>
                  By restoring balance through targeted natural food supplements, the body is better equipped to defend, repair, and maintain overall well-being. This approach emphasizes supporting innate immunity rather than suppressing symptoms.
                </p>
                <p>
                  Many patients facing serious challenges, including cancer, kidney and liver conditions, nerve disorders, and chronic issues, have shared powerful stories of recovery and renewed energy.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate?.("treatment-questions")}
                  className="rounded-[6px] bg-[#35bd22] px-6 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(53,189,34,0.2)] transition hover:bg-[#159b17]"
                >
                  Read More
                </button>
                <StartNaturalImmunotherapyButton className="rounded-[6px] px-6 py-3 text-sm" px="" py="" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#003a51] px-4 py-12 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="font-serif text-5xl font-black leading-none text-white/85">"</div>
            <h2 className="font-poppins text-2xl font-black leading-tight sm:text-4xl">
              If you&apos;re tired of trying treatment after
              <span className="block">treatment without the recovery,</span>
              <span className="block">
                it&apos;s time to choose a <em className="text-[#41d8ff]">different path.</em>
              </span>
            </h2>
          </div>
        </section>

        <section className="bg-white text-center">
          <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
            <p className="font-poppins text-6xl font-black tracking-tight text-[#e5e5e5] sm:text-8xl">
              It&apos;s all about
              <span className="block text-4xl sm:text-5xl">You</span>
            </p>
            <img
              src={GroupPeople}
              alt="People pointing toward the visitor"
              className="mx-auto -mt-12 w-full max-w-4xl object-contain sm:-mt-16"
              loading="lazy"
            />
          </div>
          <div className="bg-[#003a51] px-4 py-7 text-white">
            <h3 className="font-poppins text-xl font-black sm:text-3xl">
              Get All Solutions to Your Chronic Health Issues,
              <span className="block text-[#25d4ff]">We Know You&apos;ve been suffering since so long:</span>
            </h3>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-poppins text-2xl font-black text-[#1d241f] sm:text-3xl">
              Explore <span className="text-[#159b17]">Treatment Paths</span>
            </h2>

            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {treatmentCards.map((card, index) => {
                const isPrimary = index === 0;

                return (
                  <article
                    key={card.key}
                    className={`group overflow-hidden rounded-[8px] border bg-white text-left shadow-[0_12px_30px_rgba(18,49,24,0.12)] transition hover:-translate-y-1 ${
                      isPrimary ? "border-[#159b17]" : "border-[#e5e8e5]"
                    }`}
                  >
                    <div className="h-40 overflow-hidden bg-[#eef7ed]">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className={isPrimary ? "bg-[#159b17] p-5 text-white" : "p-5 text-[#1d241f]"}>
                      <h3 className="font-poppins text-sm font-black uppercase">{card.title}</h3>
                      <p className={`mt-2 min-h-[48px] text-xs font-semibold leading-relaxed ${isPrimary ? "text-white/90" : "text-[#5a625b]"}`}>
                        {card.text}
                      </p>
                      <button
                        type="button"
                        onClick={() => onNavigate?.("treatment-questions", { category: card.key })}
                        className={`mt-4 rounded-[5px] px-4 py-2 text-[11px] font-black transition ${
                          isPrimary ? "bg-white text-[#159b17] hover:bg-[#edfbea]" : "bg-[#159b17] text-white hover:bg-[#0f7c12]"
                        }`}
                      >
                        Learn More
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => onNavigate?.("treatment-questions")}
              className="mt-9 rounded-full bg-[#35bd22] px-8 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(53,189,34,0.2)] transition hover:bg-[#159b17]"
            >
              See All
            </button>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-poppins text-2xl font-black leading-tight text-[#1d241f] sm:text-3xl">
              Here are all answers to your
              <span className="block">often questions:</span>
            </h2>
            <p className="mx-auto mt-5 inline-flex items-center rounded-full bg-[#dffbda] px-8 py-3 text-sm font-black text-[#159b17]">
              Questions on your mind for complete recovery
            </p>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {featuredQuestions.map((item, index) => (
                <button
                  key={`${item.category}-${item.id}`}
                  type="button"
                  onClick={() => onNavigate?.("treatment-questions", { category: item.category, id: item.id })}
                  className="group flex min-h-[54px] items-center justify-between gap-4 rounded-[6px] border border-[#e5e8e5] bg-white px-5 py-3 text-left shadow-sm transition hover:border-[#159b17] hover:bg-[#f6fff4]"
                >
                  <span className="text-sm font-black text-[#1d241f]">
                    {index + 1}. {item.questionTitle}
                  </span>
                  <ChevronRight size={17} className="shrink-0 text-[#159b17] opacity-0 transition group-hover:opacity-100" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate?.("treatment-questions")}
              className="mt-8 inline-flex items-center rounded-full border border-[#bcc7bd] bg-white px-7 py-3 text-sm font-black text-[#1d241f] transition hover:border-[#159b17] hover:text-[#159b17]"
            >
              View All Answers
              <ChevronRight size={17} className="ml-2" />
            </button>
          </div>
        </section>

        <section className="bg-[#dffbdd] px-4 py-6 text-center sm:px-6 lg:px-8">
          <p className="font-poppins text-sm font-black text-[#1d241f]">
            How natural immunotherapy method works on your body.{" "}
            <button
              type="button"
              onClick={() => onNavigate?.("treatment-questions")}
              className="underline decoration-[#159b17] decoration-2 underline-offset-4 hover:text-[#159b17]"
            >
              Know more
            </button>
          </p>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <TreatmentQuery onNavigate={onNavigate} questionLinks={questionLinks} />
          </div>
        </section>

        <section className="bg-[#f7faf7] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {[
              ["Natural", "Food-supplement based care that supports inner repair."],
              ["Targeted", "Question-led treatment paths for the root imbalance."],
              ["Accountable", "Patient guidance built around education and recovery."],
            ].map(([title, text]) => (
              <div key={title} className="bg-white p-6 shadow-sm">
                <ShieldCheck className="text-[#159b17]" size={24} />
                <h3 className="mt-4 font-poppins text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[#59615a]">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
