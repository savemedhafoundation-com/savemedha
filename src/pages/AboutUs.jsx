import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import HeroBackground from '../assets/Photo/background.jpg';
import DoctorImage from '../assets/Photo/doc.png';
import FssaiLogo from '../assets/Photo/Fssai.png';
import IsoLogo from '../assets/Photo/Logo ISO_9001.png';
import HalalLogo from '../assets/Photo/Halal logo.png';
import AiaoBarLogo from '../assets/Photo/AIAO BAR.jpg';
import CertifiedLogo from '../assets/Photo/certified.png';
import { IoPeopleSharp } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const highlightText = [
  "Medha was a vibrant, spirited 14-year-old girl from Nator, Bangladesh, who had a rare gift, as she lit up every room she entered with her innocent smile and boundless curiosity. A dreamer with an artist's heart, her life was filled with joy, school, friends, and laughter until her world was abruptly changed by a diagnosis of blood cancer. What followed was a painful journey of hospital stays, rigorous chemotherapy, and unimaginable struggle. Despite the physical pain that weighed heavy in her deep, soulful eyes, Medha chose to smile - her light refusing to dim. Support for her battle came from near and far, touching hearts across the world. Renowned figures like Ratan Tata and Sonu Sood, Salman Khan, known for their generosity, extended their aid. But the disease took its toll, and Medha, despite all the love and efforts surrounding her, took her last breath, leaving behind a void that words could never fill.",
  "Through our initial efforts of providing direct financial support to patients' families, we recognized a crucial gap in the treatment process. Many patients were not receiving the comprehensive care needed for recovery, resulting in heartbreaking losses. Realizing the need for change, we decided to break this cycle and explored the treatment method of Natural Immunotherapy, that empowers the body's immune system to fight against cancer without the conventional treatments like chemotherapy, radiation, or surgery. Today, we proudly stand by this innovative and holistic method, with a remarkable 80-95% success rate in helping patients recover and reclaim their lives.",
  "Turning points came on the border, when we were delivering their little angel's dead body to their family. Everyone was crying. But our fight does not stop with cancer. We promised that now we would not let go any Medha anymore. We will fight and we will defeat cancer. We will make a cancer free world. A new battle started. We can not depend on others; now this is our own battle.",
  "We do not want to fight this battle with hired weapons from others. A weapon with a very low success rate in combat that cost us the loss of our little girl today. We do not want to lose any more loved ones. We want to make our own weapons, with which it is possible to eradicate the epidemic called cancer.",
  "On those days we had no idea about cancer. We started to gather knowledge. We started to follow research and progress on cancer treatment. We started to watch the practical cancer patient. We tried to understand their problems, the pain they are suffering. We tried to find what cancer is, how it is entering the body, how it is growing, and how it is traveling through the body. Why did medical science fail to stop that? Why can they not make a cancer free world? In the history of medical science, they have managed to control many epidemics before. Epidemics like the plague have been eradicated. But why are they losing to cancer?",
  "We got an idea from Nobel Prize winners Tasuku Honjo and James Allison, that cancer can be cured 100%. But the treatment cost is too high. We got the concept that, if we can boost our own immune system, then we can solve most physical disorders. Cancer is one of them. But how?",
  "Now we started to learn: what is the immune system? According to medical science, is it correct or is it something different? How can we boost our own immune system? How will it fight against different types of cancer? How will it recover a damaged cancerous organ or a body part? How long will it take? What will be the side effects? How much will it cost? Will that be affordable for everyone? What will be the success rate? When and why will it come back again? Hundreds of questions, but there was no answer. We tried to find the correct answers. Everyone's body was a new textbook. Everyone's problems were a new page. Everyone's health was a new chapter. And finally, we read and understood the book. And we saw success.",
];

const fightAgainstCancerText = [
  "Natural Immune Therapy, also known as immunotherapy, harnesses the body's own immune system to fight diseases such as cancer, autoimmune disorders, allergies and all types of physical disorders. Unlike traditional treatments like chemotherapy or radiation therapy, which can have significant side effects, natural immune therapy aims to activate and boost the body's own immune response in a more targeted manner. We are a part of this nature, and nature has the power to reorganize any types of physical disorders.",
  "We know that our body is built with 77 different minerals and 13 different vitamins. Any deficiencies of these essential elements can disturb our body function. Can effect on organs or systems. Foreign bodies or toxic elements can create more problems on any part on the organs and can disturb the body structure or systems. Natural Immune Therapy identify the foreign bodies and toxic elements and through out from the body naturally.",
  "One approach to natural immune therapy is through the use of natural foods and food supplements, which are naturally engineered to recognize and attack specific targets on cancer cells, pathogens or any types of cell disorders. Which generates much more stem cells and immune cells. These antibodies can either mark the target for destruction by immune cells or directly inhibit their function naturally, thereby halting disease progression.",
];

const missionSections = [
  {
    title: 'OUR MISSION',
    content:
      "At Save Medha Foundation, we envision a world where cancer is both treatable and preventable through the power of natural immunotherapy. Our goal is to lead global efforts in integrating advanced research with compassionate care, giving every individual the opportunity to overcome cancer with dignity and hope. We are committed to transforming cancer care by harnessing the body's natural defenses, offering innovative therapies that enhance overall well-being while targeting the disease. Through scientific excellence and patient advocacy, we strive to make natural immunotherapy a beacon of hope, guiding individuals toward a future free from cancer.",
  },
  {
    title: 'OUR VISION',
    content:
      "At Save Medha Foundation, we envision a world where cancer and other life-threatening diseases are both treatable and preventable through the power of natural immunotherapy. By combining cutting-edge research with compassionate care, we aim to make holistic, innovative treatments accessible to everyone, regardless of location. Our goal is to lead global efforts in transforming healthcare, empowering individuals to overcome diseases with dignity, hope, and resilience.",
  },
];

const certificationBadges = [
  {
    id: 'fssai',
    name: 'FSSAI Approved',
    src: FssaiLogo,
    alt: 'FSSAI approval logo',
  },
  {
    id: 'iso9001',
    name: 'ISO 9001 Certified',
    src: IsoLogo,
    alt: 'ISO 9001 certification badge',
  },
  {
    id: 'quality-certified',
    name: 'Quality Certified',
    src: CertifiedLogo,
    alt: 'Quality control certified badge',
  },
  {
    id: 'aiao-bar',
    name: 'AIAO-BAR Accredited',
    src: AiaoBarLogo,
    alt: 'AIAO-BAR accreditation badge',
  },
  {
    id: 'halal',
    name: '100% Halal Certified',
    src: HalalLogo,
    alt: 'Halal certification badge',
  },
];

const skylineHeights = [28, 52, 36, 64, 44, 58, 32, 48, 40, 54];
const CITIES_API_URL = 'https://savemedhabackend.vercel.app/api/cities';

const Counter = ({ compact = false }) => {
  const [count, setCount] = useState(0);
  const [cityCount, setCityCount] = useState(0);
  const [maxMembers, setMaxMembers] = useState(null);
  const [maxCities, setMaxCities] = useState(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(CITIES_API_URL)
      .then((response) => {
        if (!isMounted) return;
        const members = Number(response?.data?.members);
        const cities = Number(response?.data?.cities);

        if (!Number.isFinite(members) || !Number.isFinite(cities)) {
          setCanAnimate(false);
          return;
        }

        setMaxMembers(members);
        setMaxCities(cities);
        setCanAnimate(true);
      })
      .catch(() => {
        if (!isMounted) return;
        setCanAnimate(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (canAnimate && isVisible && typeof maxMembers === 'number' && count < maxMembers) {
      const interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 25);
      return () => clearInterval(interval);
    }
  }, [canAnimate, isVisible, count, maxMembers]);

  useEffect(() => {
    if (canAnimate && isVisible && typeof maxCities === 'number' && cityCount < maxCities) {
      const interval = setInterval(() => {
        setCityCount((prev) => prev + 1);
      }, 1400);
      return () => clearInterval(interval);
    }
  }, [canAnimate, isVisible, cityCount, maxCities]);

  const containerClasses = compact
    ? 'flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#f4faf3] via-white to-[#f2f9ed] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#e1eddb] sm:flex-row sm:gap-8 sm:p-10'
    : 'flex flex-col items-center justify-between gap-10 rounded-[28px] bg-gradient-to-br from-[#f5fbf4] via-white to-[#f0f8ec] p-8 shadow-inner md:flex-row md:gap-14';

  const labelClass = compact
    ? 'text-xs font-semibold uppercase tracking-[0.35em] text-gray-600 sm:text-sm'
    : 'text-sm font-semibold uppercase tracking-[0.35em] text-gray-600';

  const numberClass = compact
    ? 'text-4xl font-black text-[#6ab12f] sm:text-5xl'
    : 'text-5xl md:text-6xl font-black text-[#6ab12f] drop-shadow-sm';

  const subLabelClass = compact
    ? 'mt-1 text-sm font-semibold text-gray-600 sm:mt-2 sm:text-lg'
    : 'text-lg font-semibold text-gray-600';

  const skylineClass = compact
    ? 'mt-3 flex items-end justify-center gap-1 text-[#6ab12f]'
    : 'mt-6 flex items-end justify-center gap-1 text-[#6ab12f]';

  const peopleRowClass = compact
    ? 'mt-4 flex items-center justify-center gap-2 text-[#6ab12f]'
    : 'mt-8 flex items-center justify-center gap-2 text-[#6ab12f]';

  const iconSize = compact ? 32 : 40;
  const skylineBarWidth = compact ? 'w-2 sm:w-3' : 'w-4';

  return (
    <div
      ref={countRef}
      className={containerClasses}
    >
      <div className="text-center space-y-3">
        <p className={labelClass}>
          Present In
        </p>
        <div className="flex flex-col items-center justify-center">
          <span className={numberClass}>
            {cityCount}+
          </span>
          <span className={subLabelClass}>Cities</span>
        </div>
        <div className={skylineClass}>
          {skylineHeights.map((height, idx) => (
            <span
              key={idx}
              className={`${skylineBarWidth} rounded-t-md bg-gradient-to-t from-[#6ab12f] via-[#5f9f29] to-[#eaf6e2]`}
              style={{ height }}
            />
          ))}
        </div>
      </div>

      {!compact && (
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#dbe7d5] to-transparent hidden md:block" />
      )}

      <div className="text-center space-y-3 max-w-[220px]">
        <p className={labelClass}>
          We Are
        </p>
        <div className="flex flex-col items-center justify-center">
          <span className={numberClass}>
            {count}+
          </span>
          <span className={subLabelClass}>Members</span>
        </div>
        <div className={peopleRowClass}>
          <IoPeopleSharp size={iconSize} />
          <IoPeopleSharp size={iconSize} className="opacity-80" />
          <IoPeopleSharp size={iconSize} className="opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default function AboutUs({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobileMenuOpen(window.matchMedia('(max-width: 767px)').matches);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderDesktopTabletLayout = () => (
    <>
      <section className="relative h-[360px] md:h-[460px] lg:h-[520px] flex items-center justify-center overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeroBackground})`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2910]/85 via-[#1b3c1a]/70 to-[#0b2910]/85" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#6ab12f]/25 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#f08a1d]/25 blur-3xl" />

        <div className="relative max-w-5xl text-center space-y-5 px-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#dff4d5]">
            Save Medha Foundation
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-[0.08em] drop-shadow-xl">
            ABOUT US
          </h1>
          <p className="mx-auto max-w-3xl text-base md:text-lg text-[#eaf6e2]">
            A foundation born from courage, compassion, and the promise to rewrite every story.
          </p>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#f08a1d] via-[#f6c04c] to-[#6ab12f]" />
        </div>
      </section>

      <section className="relative -mt-16 px-4 md:px-10 lg:px-20 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 rounded-[38px] bg-white shadow-[0_25px_90px_rgba(0,0,0,0.08)] border border-[#e8f0e3] px-6 py-10 md:px-12 md:py-12">
            <div className="absolute -left-10 -top-12 h-24 w-24 rounded-full bg-gradient-to-br from-[#f7e1c7] via-white to-white rotate-12 shadow-xl opacity-80" aria-hidden="true" />
            <div className="absolute -right-12 -bottom-12 h-28 w-28 rounded-full bg-gradient-to-tl from-[#f4d091] via-white to-white -rotate-6 shadow-xl opacity-80" aria-hidden="true" />
            <div className="absolute right-6 -top-10 flex items-center gap-4 text-[#f08a1d] opacity-70 rotate-[-35deg]" aria-hidden="true">
              <span className="h-16 w-16 rounded-full border-2 border-[#6ab12f]" />
              <span className="h-16 w-16 -ml-10 rounded-full border-2 border-[#e95f2a]" />
            </div>

            <div className="text-center mb-8 space-y-3">
              <p className="text-lg md:text-xl font-semibold uppercase tracking-wide font-shippori">
                <span className="text-gray-900 inline-block border-b-2 border-[#74C425] pb-0.5">
                  A Death
                </span>{' '}
                <span className="text-[#6ab12f]">That Inspired To Change The World:</span>
              </p>
              <p className="text-2xl md:text-3xl font-black text-[#E7581F] font-kalam">
                Save Medha Foundation
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base font-poppins leading-relaxed text-gray-700">
              {highlightText.map((paragraph, idx) => (
                <p key={idx} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 md:px-10 lg:px-20 pb-16 lg:pb-20">
        <div className="absolute top-6 left-50 sm:left-10 flex items-center gap-4 opacity-70 rotate-[35deg]" aria-hidden="true">
          <span className="h-16 w-16 rounded-full border-2 border-[#6ab12f]" />
          <span className="h-16 w-16 -ml-10 rounded-full border-2 border-[#e95f2a]" />
        </div>
        <div className="absolute -right-10 bottom-6 h-24 w-24 rounded-full border-4 border-[#f08a1d] opacity-30" aria-hidden="true" />

        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide font-shippori">
              <span className="text-gray-900 ">WE FIGHT</span>{' '}
              <span className="text-[#6ab12f]">AGAINST CANCER</span>
            </h2>
            <p className="text-lg md:text-2xl font-semibold text-[#f08a1d] italic">
              " Our goals are to fight for a cancer free world, empower lives, and save futures. "
            </p>
          </div>

          <div className="relative rounded-[32px] bg-white shadow-[0_25px_90px_rgba(0,0,0,0.07)] border border-[#e8f0e3] p-8 md:p-12">
            <div className="absolute -left-8 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#dff0d6] to-white shadow-md" aria-hidden="true" />
            <div className="absolute right-6 bottom-4 h-10 w-10 rounded-full border-2 border-[#f08a1d] opacity-60" aria-hidden="true" />
            <div className="space-y-5 text-base md:text-m leading-relaxed text-gray-700">
              {fightAgainstCancerText.map((paragraph, idx) => (
                <p key={idx} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {missionSections.map((section) => (
              <div
                key={section.title}
                className="relative rounded-[28px] bg-white border border-[#e7f1e1] shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-8 space-y-4"
              >
                <div className="absolute -top-4 right-6 h-10 w-10 rounded-full bg-gradient-to-br from-[#f5d9a5] to-white shadow-md" aria-hidden="true" />
                <h3 className="text-2xl font-black text-center text-[#6ab12f] tracking-wide">
                  {section.title}
                </h3>
                <p className="text-base md:text-m leading-relaxed text-gray-700 text-justify">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 md:px-10 lg:px-20 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.25em] text-[#f08a1d]">
              OVERVIEW
            </h3>
            <p className="text-gray-600">Our impact grows with every city, member, and trusted certification.</p>
          </div>

          <div className="relative rounded-[46px] bg-white border border-dashed border-[#dfe8da] shadow-[0_22px_80px_rgba(0,0,0,0.07)] overflow-hidden">
            <div className="absolute -left-12 top-6 h-28 w-28 rounded-full bg-[#f5f1e5] blur-xl" aria-hidden="true" />
            <div className="absolute -right-10 bottom-6 h-28 w-28 rounded-full bg-[#e7f4de] blur-xl" aria-hidden="true" />

            <div className="px-6 py-10 md:px-12">
              <Counter />
            </div>

            <div className="border-t border-dashed border-[#dfe8da] bg-[#f7faf6] px-6 py-10 md:px-12">
              <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
                {certificationBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[#d0e6c9] bg-white text-center shadow-sm"
                  >
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      className="h-14 w-14 object-contain"
                    />
                    <span className="mt-2 px-2 text-[10px] font-semibold leading-tight text-gray-600">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 md:px-10 lg:px-20 pb-20">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center rounded-[32px] bg-white shadow-[0_22px_80px_rgba(0,0,0,0.07)] border border-[#e8f0e3] p-8 md:p-12">
          <div className="relative">
            <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full border-2 border-[#6ab12f] opacity-30" aria-hidden="true" />
            <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-3xl bg-[#6ab12f] opacity-10 rotate-6" aria-hidden="true" />
            <img
              src={DoctorImage}
              alt="Save Medha Foundation care"
              className="relative rounded-3xl shadow-2xl border-4 border-white object-cover w-full"
            />
          </div>

          <div className="space-y-6 text-gray-700">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Carrying Medha&apos;s Light Forward
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
                className="bg-[#6ab12f] hover:bg-[#5a9c27] text-white font-semibold px-6 py-3 rounded-md transition-colors cursor-pointer shadow-sm"
              >
                Back To Home
              </button>
              <button
                type="button"
                className="border-2 border-[#6ab12f] text-[#6ab12f] hover:bg-[#0c3b1c] hover:border-[#0c3b1c] hover:text-white font-semibold px-6 py-3 rounded-md transition-colors cursor-pointer shadow-sm"
                onClick={() => onNavigate && onNavigate("donate")}
              >
                Support The Mission
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderMobileLayout = () => (
    <>
      <section className="relative h-[260px] w-full overflow-hidden rounded-b-[32px] bg-gradient-to-b from-[#e7f2db] via-[#d7ecc7] to-[#c8e6b8] shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
        <div className="absolute inset-0">
          <img
            src={HeroBackground}
            alt="Save Medha Foundation background"
            className="h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55" />
        </div>

        <div className="relative flex h-full flex-col justify-end px-4 pb-8 text-white">
          <div className="max-w-[22rem]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d9f3cb]">
              Save Medha Foundation
            </span>
            <h1 className="mt-1 text-3xl font-black leading-tight">About Us</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#eef8e9]">
              A foundation born from courage, compassion, and the promise to rewrite every story.
            </p>
            <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#f08a1d] via-[#f6c04c] to-[#6ab12f]" />
          </div>
        </div>
      </section>

      <section className="px-4 pt-8 pb-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[32rem] text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide font-shippori">
              <span className="text-gray-900 inline-block border-b-2 border-[#74C425] pb-0.5">
                A Death
              </span>{' '}
              <span className="text-[#6ab12f]">That Inspired To Change The World:</span>
            </p>
            <p className="text-2xl font-black text-[#E7581F] font-kalam">
              Save Medha Foundation
            </p>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-[26px] border border-[#e8f0e3] bg-white shadow-md">
            <div className="absolute -left-8 -top-8 h-20 w-20 rounded-full bg-[#f7ecdb] blur-2xl" aria-hidden="true" />
            <div className="absolute -right-10 bottom-4 h-24 w-24 rounded-full bg-[#e8f5de] blur-2xl" aria-hidden="true" />
            <div className="relative space-y-4 p-4 text-sm leading-relaxed text-gray-700 font-poppins sm:p-6">
              {highlightText.map((paragraph, idx) => (
                <p key={idx} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="relative mx-auto max-w-[1200px]">
          <div className="absolute -right-2 top-2 h-24 w-24 rounded-full border-4 border-[#f08a1d] opacity-25" aria-hidden="true" />
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-black text-center tracking-wide font-shippori">
              <span className="text-gray-900 inline-block border-b-2 border-[#74C425]">WE FIGHT</span>{' '}
              <span className="text-[#6ab12f]">AGAINST CANCER</span>
            </h2>
            <p className="mx-auto max-w-[26rem] text-sm font-semibold text-[#E7581F] font-poppins italic leading-relaxed">
              " Our goals are to fight for a cancer free world, empower lives, and save futures. "
            </p>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-[26px] border border-[#e8f0e3] bg-white shadow-md">
            <div className="absolute -left-8 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#dff0d6] to-white shadow-sm" aria-hidden="true" />
            <div className="absolute -right-6 bottom-4 h-10 w-10 rounded-full border-2 border-[#f08a1d] opacity-60" aria-hidden="true" />
            <div className="relative space-y-4 p-4 text-sm font-semibold leading-relaxed text-gray-700 font-poppins sm:p-6">
              {fightAgainstCancerText.map((paragraph, idx) => (
                <p key={idx} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10">
        <div className="mx-auto max-w-[1200px] space-y-7">
          {missionSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-lg font-black text-center tracking-[0.18em] font-shippori text-gray-900">
                {section.title}
              </h3>
              <div className="relative overflow-hidden rounded-[26px] border border-[#e8f0e3] bg-white shadow-md">
                <div className="absolute -top-3 right-5 h-9 w-9 rounded-full bg-gradient-to-br from-[#f5d9a5] to-white shadow-sm" aria-hidden="true" />
                <p className="relative p-4 text-sm leading-relaxed font-semibold font-poppins text-gray-700 text-justify sm:p-6">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-[1200px] space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-[#E7581F]">
              OVERVIEW
            </h3>
            <p className="text-sm text-gray-600">
              Our impact grows with every city, member, and trusted certification.
            </p>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#dfe8da] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.07)]">
            <div className="px-3 py-4">
              <Counter compact />
            </div>

            <div className="border-t border-[#dfe8da] bg-[#f7faf6] px-3 py-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {certificationBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#d0e6c9] bg-white text-center shadow-sm"
                  >
                    <img
                      src={badge.src}
                      alt={badge.alt}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="mt-2 px-2 text-[11px] font-semibold leading-tight text-gray-600">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-[800px] overflow-hidden rounded-[24px] border border-[#e8f0e3] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.07)]">
          <div className="p-4 sm:p-6 space-y-5">
            <div className="mx-auto w-full max-w-[260px]">
              <div className="relative rounded-full bg-[#e7f4de] p-3 shadow-inner">
                <div className="absolute -left-3 -top-3 h-12 w-12 rounded-full border-2 border-[#6ab12f] opacity-25" aria-hidden="true" />
                <div className="absolute -right-5 -bottom-5 h-14 w-14 rounded-3xl bg-[#6ab12f] opacity-10 rotate-6" aria-hidden="true" />
                <img
                  src={DoctorImage}
                  alt="Save Medha Foundation care"
                  className="relative aspect-square w-full rounded-full border-4 border-white object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="space-y-3 font-poppins text-gray-700 text-sm leading-relaxed">
              <h1 className="text-xl font-black text-gray-900">
                Carrying Medha&apos;s Light Forward
              </h1>
              <p className="text-justify font-semibold">
                Every patient who walks through our doors carries a story, a dream, and the same unwavering hope that Medha held onto.
                Our team blends compassion with pioneering science, empowering the immune system to lead the healing journey. From counseling
                and diagnostics to holistic natural therapies, we support families with the care and dignity they deserve.
              </p>
              <p className="text-justify font-semibold">
                Save Medha Foundation is more than an organization - it is a promise that no family will have to face cancer alone.
                Together, we are building a future where love, science, and community rewrite what it means to survive and thrive.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('home')}
                className="flex-1 min-w-[140px] bg-[#6ab12f] hover:bg-[#5a9c27] text-sm font-poppins text-white font-semibold px-4 py-2.5 rounded-md transition-colors cursor-pointer shadow-sm"
              >
                Back To Home
              </button>
              <button
                type="button"
                className="flex-1 min-w-[140px] border-2 text-sm font-poppins border-[#6ab12f] text-[#6ab12f] hover:bg-[#0c3b1c] hover:border-[#0c3b1c] hover:text-white font-semibold px-4 py-2.5 rounded-md transition-colors cursor-pointer shadow-sm"
                onClick={() => onNavigate && onNavigate("donate")}
              >
                Support The Mission
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f5faf6] text-gray-900">
      <Navbar currentPage="about" onNavigate={onNavigate} />
      <main className="w-full">
        {isMobileMenuOpen ? renderMobileLayout() : renderDesktopTabletLayout()}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
