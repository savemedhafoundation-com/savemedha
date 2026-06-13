import { useCallback, useEffect, useRef, useState } from "react";
import { Award, BarChart3, Building2, HeartHandshake, Leaf, Target, Users } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Seo } from "../components/Seo";
import AboutHeroImage from "../assets/aboutus/Rectangle 646.png";
import DoctorImage from "../assets/aboutus/Rectangle 571.png";
import CertificationLogos from "../assets/aboutus/Frame 21.png";

const HERO_BACKGROUND_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_1920/v1770272544/background_oumysq.jpg";

const CITIES_API_URL = "https://savemedhabackend.vercel.app/api/cities";

const storyParagraphs = [
  "Medha was a vibrant, spirited 14-year-old girl from Nator, Bangladesh, who had a rare gift, as she lit up every room she entered with her innocent smile and boundless curiosity. A dreamer with an artist's heart, her life was filled with joy, school, friends, and laughter until her world was abruptly changed by a diagnosis of blood cancer.",
  "What followed was a painful journey of hospital stays, rigorous chemotherapy, and unimaginable struggle. Despite the physical pain that weighed heavy in her deep, soulful eyes, Medha chose to smile - her light refusing to dim. Support for her battle came from near and far, touching hearts across the world.",
  "Through our initial efforts of providing direct financial support to patients' families, we recognized a crucial gap in the treatment process. Many patients were not receiving the comprehensive care needed for recovery, resulting in heartbreaking losses. Realizing the need for change, we explored Natural Immunotherapy, empowering the body's immune system to fight cancer with dignity and hope.",
  "Turning points came on the border, when we were delivering their little angel's body to her family. Everyone was crying. But our fight did not stop with cancer. We promised that we would not let go of any Medha anymore. We will fight and we will defeat cancer. We will make a cancer free world.",
  "We started to gather knowledge, follow research, and observe the practical pain of cancer patients. We tried to understand what cancer is, how it grows, and why medical science so often loses to it. Every patient's body became a new textbook, every problem a new page, and every recovery a new chapter.",
  "Inspired by the immune-system research of Nobel Prize winners Tasuku Honjo and James Allison, we kept asking how the body's own defense system could be strengthened in an affordable, natural, and compassionate way. Hundreds of questions had no easy answer, but our search slowly became a treatment path.",
];

const therapyParagraphs = [
  "Natural Immune Therapy harnesses the body's own immune system to fight diseases such as cancer, autoimmune disorders, allergies, and many physical disorders. Unlike conventional treatments that may carry significant side effects, this approach aims to activate and strengthen the body's own healing response in a more targeted manner.",
  "Our body is built with essential minerals, vitamins, immune cells, and natural systems that work together. Deficiencies, toxic elements, and foreign bodies can disturb organ function. Natural Immune Therapy focuses on identifying those disturbances and supporting the body in removing them naturally.",
  "Through natural foods and food supplements, the therapy supports immune and stem-cell generation so the body can recognize, respond to, and repair cell-level disorders. Our goal is not only treatment, but a healthier foundation for long-term recovery.",
];

const missionCards = [
  {
    title: "Our Mission",
    icon: Target,
    text: "To transform cancer care by harnessing the body's natural defenses, offering compassionate guidance, and making Natural Immunotherapy accessible to patients and families with dignity.",
  },
  {
    title: "Our Vision",
    icon: Leaf,
    text: "To build a future where cancer and life-threatening diseases are treatable and preventable through holistic research, ethical care, and empowered communities.",
  },
];

const useImpactCounts = () => {
  const [counts, setCounts] = useState({ cities: 10, members: 550 });

  useEffect(() => {
    let isMounted = true;

    fetch(CITIES_API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load impact data");
        return response.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const cities = Number(data?.cities);
        const members = Number(data?.members);

        setCounts({
          cities: Number.isFinite(cities) && cities > 0 ? cities : 10,
          members: Number.isFinite(members) && members > 0 ? members : 550,
        });
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  return counts;
};

const ImpactOverview = () => {
  const { cities, members } = useImpactCounts();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: "Registered Cities", value: `${cities}+`, icon: Building2 },
    { label: "Members", value: `${members}+`, icon: Users },
    { label: "Patients", value: "20k+", icon: HeartHandshake },
    { label: "Recovery Rate", value: "85%", icon: Award },
  ];

  return (
    <section ref={sectionRef} className="bg-[#03450e] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6 border-b border-white/35 pb-7">
          <div>
            <h2 className="font-poppins text-2xl font-black sm:text-3xl">Impact Overview</h2>
            <p className="mt-3 inline-block bg-[#2fbf23] px-3 py-1 text-sm font-semibold text-white">
              The scale of our expanding community.
            </p>
          </div>
          <BarChart3 className="hidden text-white sm:block" size={28} />
        </div>

        <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;

            return (
            <div
              key={stat.label}
              className={`transition duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <StatIcon className="mb-4 text-[#95e55d]" size={22} />
              <div className="font-poppins text-4xl font-black leading-none sm:text-5xl">{stat.value}</div>
              <p className="mt-3 text-sm font-semibold text-[#bfeeb2]">{stat.label}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default function AboutUs({ onNavigate }) {
  const navigateTo = useCallback(
    (page) => {
      if (typeof onNavigate === "function") onNavigate(page);
    },
    [onNavigate]
  );

  return (
    <div className="min-h-screen bg-white text-[#1e2520]">
      <Seo
        title="About Us"
        description="Learn about Save Medha Foundation, a Kolkata-based NGO treating cancer through Natural Immunotherapy."
        path="/about-us"
      />
      <Navbar currentPage="about" onNavigate={onNavigate} />

      <main className="w-full overflow-hidden">
        <section className="relative bg-[#063f12] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <img
            src={HERO_BACKGROUND_URL}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#063f12] via-[#064816]/95 to-[#063f12]/80" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="font-poppins text-xs font-bold uppercase tracking-[0.45em] text-[#d9f9d2]">
                Save Medha Foundation
              </p>
              <h1 className="mt-4 font-poppins text-5xl font-black uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
                About Us
              </h1>
              <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-[#ecf8e9]">
                A foundation born from courage, compassion, and the promise to rewrite every story.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[420px]">
              <span className="absolute -bottom-4 -left-4 z-0 h-[74%] w-[82%] rounded-bl-[42px] rounded-tr-[42px] bg-white" />
              <img
                src={AboutHeroImage}
                alt="Hands holding a heart, representing Save Medha Foundation care"
                className="relative z-10 w-full object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.28)]"
              />
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-16 pt-0 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="relative -mt-10 bg-[#35bd22] px-6 py-8 text-center text-white shadow-[0_24px_60px_rgba(47,160,35,0.25)] sm:px-12 sm:py-10">
              <span className="absolute -bottom-7 -left-7 h-20 w-20 rounded-full bg-white/70 shadow-[0_12px_35px_rgba(0,0,0,0.15)]" />
              <span className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-white/45" />
              <h2 className="relative mx-auto max-w-3xl font-poppins text-3xl font-black leading-tight sm:text-5xl">
                A death story that changed the world.
              </h2>
              <p className="relative mt-4 font-poppins text-xs font-bold uppercase tracking-[0.35em]">
                Save Medha Foundation
              </p>
            </div>

            <article className="border border-[#d9ded9] bg-white px-5 py-8 shadow-sm sm:px-12 sm:py-12">
              <div className="mx-auto max-w-3xl space-y-5 text-[15px] font-semibold leading-[1.82] text-[#202820]">
                {storyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="bg-[#f7faf7] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="font-poppins text-2xl font-black sm:text-3xl">
                We fight <span className="text-[#159b17]">against cancer.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold text-[#7b817b]">
                Our goals are to fight for a cancer free world, empower lives, and save futures.
              </p>
            </div>

            <div className="mx-auto mt-9 max-w-4xl bg-[#29a51f] px-5 py-8 text-white shadow-[0_20px_55px_rgba(34,142,28,0.18)] sm:px-9">
              <div className="space-y-5 text-[14px] font-semibold leading-[1.78]">
                {therapyParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2">
              {missionCards.map((card) => {
                const CardIcon = card.icon;

                return (
                <div key={card.title} className="bg-[#258e22] p-7 text-white shadow-[0_18px_45px_rgba(22,110,29,0.15)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#179315]">
                    <CardIcon size={23} />
                  </span>
                  <h3 className="mt-5 font-poppins text-2xl font-black">{card.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-[1.75] text-[#efffed]">{card.text}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        <ImpactOverview />

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl items-center justify-center">
            <img
              src={CertificationLogos}
              alt="Save Medha Foundation certification logos"
              className="w-full max-w-4xl object-contain"
              loading="lazy"
            />
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[680px] items-center gap-9 md:grid-cols-[210px_1fr] md:gap-10">
            <div className="relative mx-auto w-full max-w-[210px]">
              <span className="absolute -right-4 -top-5 z-20 h-10 w-10 rounded-full border border-white/75 bg-white/35 shadow-[inset_8px_8px_16px_rgba(255,255,255,0.88),inset_-8px_-8px_18px_rgba(58,139,45,0.16),-8px_12px_24px_rgba(30,60,24,0.16)] backdrop-blur-md before:absolute before:left-2 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-white/90 before:blur-[1px]" />
              <span className="absolute -bottom-4 -left-6 z-20 h-14 w-14 rounded-full border border-white/80 bg-white/40 shadow-[inset_10px_10px_20px_rgba(255,255,255,0.9),inset_-10px_-10px_24px_rgba(54,150,42,0.14),10px_-8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md before:absolute before:left-3 before:top-3 before:h-4 before:w-4 before:rounded-full before:bg-white/95 before:blur-[1px]" />
              <img
                src={DoctorImage}
                alt="Save Medha Foundation team member"
                className="relative z-10 w-full object-contain"
                loading="lazy"
              />
            </div>

            <div>
              <h2 className="max-w-[390px] font-poppins text-[30px] font-black leading-[1.22] text-black">
                Carrying Medha&apos;s Light Forward
              </h2>
              <p className="mt-4 max-w-[425px] text-[14px] font-semibold leading-[1.55] text-black">
                Every patient who walks through our doors carries a story, a dream, and the same unwavering hope that Medha held
                onto. Our team blends compassion with pioneering science, empowering the immune system to lead the healing journey.
                From counseling and diagnostics to holistic natural therapies, we support families with the care and dignity they deserve.
              </p>
              <p className="mt-5 max-w-[420px] text-[14px] font-semibold leading-[1.55] text-black">
                Save Medha Foundation is more than an organization - it is a promise that no family will have to face cancer alone.
                Together, we are building a future where love, science, and community rewrite what it means to survive and thrive.
              </p>
              <div className="mt-7 flex flex-wrap gap-5">
                <button
                  type="button"
                  onClick={() => navigateTo("home")}
                  className="rounded-[9px] bg-[#35ad1f] px-5 py-2.5 text-[15px] font-black leading-none text-white transition hover:bg-[#219113]"
                >
                  Back to home
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("donate")}
                  className="rounded-[9px] border border-[#58b94c] px-6 py-2.5 text-[15px] font-black leading-none text-black transition hover:bg-[#35ad1f] hover:text-white"
                >
                  Support the mission
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
