import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import internshipImage from "../assets/Photo/internship.jpg";
import { useEffect, useRef, useState } from "react";

const CLINICAL_RESEARCH_IMG =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1770268797/scientist-woman-doctor-holding-glass-flask-analyzing-liquid-solution_1_gs6jud.png";
const NUTRITION_IMMUNITY_IMG =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1770268796/Mask_group_v8fbar.png";
const DATA_CASE_DOC_IMG =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1770268796/Mask_group_1_mjllb0.png";
const MEDIA_AWARENESS_IMG =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1770268796/Mask_group_2_m4u60u.png";
const WEB_TECH_VOLUNTEER_IMG =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1770268797/Mask_group_3_vrxctr.png";
const CAREERS_HERO_IMG =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_1920/v1770271124/carrer_hero_uhicbz.jpg";

const WHY_CARDS = [
  {
    title: "Purpose-driven work",
    description:
      "Every role supports patient care, community awareness, and responsible education around Natural Immunotherapy.",
  },
  {
    title: "Learning-focused culture",
    description:
      "We encourage careful reading, thoughtful questions, and steady improvement, guided by science and real-world practice.",
  },
  {
    title: "Human-first care",
    description:
      "We treat patients and teammates with respect, privacy, and honesty, especially when situations are difficult.",
  },
  {
    title: "Real-world impact",
    description:
      "Your work helps families access reliable guidance, document outcomes, and build healthier communities over time.",
  },
];

const OPEN_POSITIONS = [
  {
    title: "Clinical Research Associate",
    type: "Full-time",
    location: "On-site",
    image: CLINICAL_RESEARCH_IMG,
  },
  {
    title: "Nutrition & Immunity Counselor",
    type: "Part-time",
    location: "Hybrid",
    image: NUTRITION_IMMUNITY_IMG,
  },
  {
    title: "Data & Case Documentation Executive",
    type: "Full-time",
    location: "On-site",
    image: DATA_CASE_DOC_IMG,
  },
  {
    title: "Media & Awareness Coordinator",
    type: "Part-time",
    location: "Hybrid",
    image: MEDIA_AWARENESS_IMG,
  },
  {
    title: "Web / Tech Volunteer (React / WordPress / AI)",
    type: "Volunteer",
    location: "Remote",
    image: WEB_TECH_VOLUNTEER_IMG,
  },
];
function SectionHeading({ title, subtitle, className = "" }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl font-poppins">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base text-slate-600 sm:text-lg font-sen">
          {subtitle}
        </p>
      ) : null}

      <svg
        className="mt-2 h-3 w-64 text-lime-500"
        viewBox="0 0 256 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 8 C 80 2, 152 2, 250 1"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M2 12 C 62 8, 140 8, 246 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <div
      className={`relative min-h-[10rem] rounded-xl border border-[#efb29d] bg-[#f8bfa9]/80 p-4 font-poppins shadow-[0_10px_20px_rgba(15,23,42,0.08)] lg:min-h-[16rem] lg:rounded-2xl lg:border-lime-300/80 lg:bg-gradient-to-b lg:from-lime-100/80 lg:via-lime-50/70 lg:to-white lg:p-6 lg:shadow-[0_14px_30px_rgba(22,101,52,0.08)] ${className}`}
    >
      <h3 className="pb-2 text-sm font-semibold text-slate-900 lg:pb-5 lg:text-base">
        {title}
      </h3>
      <div className="mt-1 text-[11px] font-semibold leading-relaxed text-slate-700 lg:mt-3 lg:text-sm lg:text-slate-600">
        {children}
      </div>
    </div>
  );
}

function JobCard({ title, type, location, image, index }) {
  const isRightCard = index % 2 === 1;
  const mobileAlignment = isRightCard ? "flex-row-reverse text-right" : "";
  const mobileMetaAlignment = isRightCard ? "justify-end" : "justify-start";
  const mobileButtonAlignment = isRightCard ? "justify-end" : "justify-start";

  return (
    <>
      <article className="border-b border-slate-200/90 pb-6 last:border-b-0 lg:hidden">
        <div className={`flex items-start gap-3 ${mobileAlignment}`}>
          <div className="shrink-0 pt-1">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 rotate-45 rounded-2xl bg-lime-300/80" />
              <div className="absolute inset-[5px] rotate-45 overflow-hidden rounded-xl bg-white shadow-md">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full -rotate-45 scale-125 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1 font-poppins">
            <h3 className="text-[13px] font-semibold leading-snug text-slate-900">
              {title}
            </h3>

            <dl className="mt-2 space-y-1 text-[11px] leading-snug text-slate-700">
              <div className={`flex items-center gap-2 ${mobileMetaAlignment}`}>
                <dt className="text-slate-500">Job type</dt>
                <dd className="font-medium text-slate-800">{type}</dd>
              </div>
              <div className={`flex items-center gap-2 ${mobileMetaAlignment}`}>
                <dt className="text-slate-500">Location</dt>
                <dd className="font-medium text-slate-800">{location}</dd>
              </div>
            </dl>

            <div className={`mt-3 flex ${mobileButtonAlignment}`}>
              <Link
                to="/apply"
                className="inline-flex min-w-[96px] items-center justify-center rounded-lg bg-lime-500 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-lime-600"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </article>

      <div
        className={`
          hidden rounded-3xl border border-lime-200/80 bg-white p-6
          shadow-[0_18px_40px_rgba(34,197,94,0.12)]
          transition-transform
          max-w-xl
          mb-10
          font-poppins
          lg:block
          ${isRightCard ? "lg:translate-y-24 lg:translate-x-24" : ""}
        `}
      >
        <div
          className={`flex flex-col gap-6 lg:items-center ${
            isRightCard ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* Content */}
          <div className={` relative ${isRightCard ? "lg:text-right" : ""}`}>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

            <dl className="mt-4 grid gap-2 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Job type</dt>
                <dd className="font-medium text-slate-800">{type}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Location</dt>
                <dd className="font-medium text-slate-800">{location}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                to="/apply"
                className="inline-flex min-w-[160px] items-center justify-center
                rounded-2xl bg-lime-500 px-6 py-2 text-sm font-semibold font-poppins
                text-white shadow-sm hover:bg-lime-600"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Image */}
          <div
            className={`absolute flex justify-center ${
              isRightCard ? "-left-10" : "inset-x-2"
            }`}
          >
            <div className="relative h-44 w-44 sm:h-40 sm:w-40">
              <div className="absolute inset-0 rotate-45 rounded-[1.6rem] bg-lime-200" />
              <div className="absolute inset-y-1 rotate-45 overflow-hidden rounded-[1.4rem] bg-white shadow-md">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full -rotate-60 object-cover scale-128"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const externalAssetPromises = new Map();

const loadExternalAsset = ({ id, tagName, sourceKey, url, parent, rel }) => {
  if (externalAssetPromises.has(id)) {
    return externalAssetPromises.get(id);
  }

  const promise = new Promise((resolve, reject) => {
    const existing = document.getElementById(id);

    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve(existing);
        return;
      }

      existing.addEventListener("load", () => resolve(existing), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const element = document.createElement(tagName);
    element.id = id;
    if (rel) element.rel = rel;
    element[sourceKey] = url;
    if (tagName === "script") element.async = true;

    element.addEventListener(
      "load",
      () => {
        element.dataset.loaded = "true";
        resolve(element);
      },
      { once: true }
    );
    element.addEventListener(
      "error",
      (error) => {
        externalAssetPromises.delete(id);
        reject(error);
      },
      { once: true }
    );

    parent.appendChild(element);
  });

  externalAssetPromises.set(id, promise);
  return promise;
};

const loadScript = (src, id) =>
  loadExternalAsset({
    id,
    tagName: "script",
    sourceKey: "src",
    url: src,
    parent: document.body,
  });

const loadLink = (href, id) =>
  loadExternalAsset({
    id,
    tagName: "link",
    sourceKey: "href",
    url: href,
    parent: document.head,
    rel: "stylesheet",
  });

const getCarouselMode = () => {
  if (typeof window === "undefined") return "default";
  return window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches
    ? "tablet"
    : "default";
};

// the flipster slide for the careers page
const CoverflowCarousel = () => {
  const flipsterRef = useRef(null);
  const [carouselMode, setCarouselMode] = useState(getCarouselMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const syncMode = () => setCarouselMode(mediaQuery.matches ? "tablet" : "default");

    syncMode();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMode);
      return () => mediaQuery.removeEventListener("change", syncMode);
    }

    mediaQuery.addListener(syncMode);
    return () => mediaQuery.removeListener(syncMode);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const getFlipsterOptions = () => ({
      style: carouselMode === "tablet" ? "coverflow" : "flat",
      spacing: carouselMode === "tablet" ? -0.45 : -0.9,
      nav: false,
      buttons: true,
      loop: true,
      start: 0,
      touch: true,
      scrollwheel: false,
    });

    const init = async () => {
      try {
        await Promise.all([
          loadLink(
            "https://cdn.jsdelivr.net/npm/jquery.flipster@1.1.5/dist/jquery.flipster.min.css",
            "flipster-css"
          ),
          loadScript("https://code.jquery.com/jquery-3.6.0.min.js", "jquery-js"),
        ]);
        await loadScript(
          "https://cdn.jsdelivr.net/npm/jquery.flipster@1.1.5/dist/jquery.flipster.min.js",
          "flipster-js"
        );
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => requestAnimationFrame(resolve));

        if (cancelled) return;
        if (!flipsterRef.current || !window.$ || !window.$.fn.flipster) return;
        if (flipsterRef.current.dataset.flipsterInitialized === "true") return;

        flipsterRef.current.dataset.flipsterInitialized = "true";
        window.$(flipsterRef.current).flipster({
          ...getFlipsterOptions(),
        });
      } catch {
        // Flipster failed to load - carousel won't initialise but page still works
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [carouselMode]);

  const slideStyle =
    carouselMode === "tablet"
      ? {
          width: "clamp(200px, 30vw, 240px)",
          height: "clamp(300px, 44vw, 360px)",
          fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
        }
      : {
          width: "clamp(170px, 62vw, 260px)",
          height: "clamp(250px, 90vw, 420px)",
          fontSize: "clamp(0.9rem, 4vw, 1.375rem)",
        };

  return (
    <div
      key={carouselMode}
      className="flipster overflow-hidden px-1 py-4 sm:px-10 sm:py-10 lg:p-20"
      ref={flipsterRef}
    >
      <ul>
        <li>
          <div className="slide bg-teal-500" style={slideStyle}>
            Application Preview
          </div>
        </li>
        <li>
          <div className="slide bg-teal-300" style={slideStyle}>
            Interaction
          </div>
        </li>
        <li>
          <div className="slide bg-teal-100" style={slideStyle}>
            Role discussion / task
          </div>
        </li>
        <li>
          <div className="slide bg-teal-50" style={slideStyle}>
            Onboarding
          </div>
        </li>
      </ul>
    </div>
  );
};

export default function CareersPage({ onNavigate }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <Seo title="Careers" description="Join Save Medha Foundation's mission to fight cancer. Explore internship and career opportunities in natural health and research." path="/careers" />
      <Navbar currentPage="careers" onNavigate={onNavigate} />

      <main>
        {/* 1) HERO SECTION */}
        <div className="pointer-events-none absolute -right-10 bottom-[120rem] h-201 w-[38rem] rotate-12 rounded-[4rem] bg-lime-100/20" />
        <div className="pointer-events-none absolute -left-42 bottom-[-3rem] h-620 w-[48rem] rotate-62 rounded-[4rem] bg-lime-100/20" />
        <section className="bg-white relative mb-22">
          <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-22 h-72 w-72 rotate-45 rounded-[3rem] bg-lime-100/30" />
          <div className="pointer-events-none absolute -bottom-24 left-42 h-72 w-72 rotate-45 rounded-[3rem] bg-lime-100/20" />
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="max-w-xl">
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl font-poppins">
                  Careers at{" "}
                  <span className="font-bold text-[#74C425]">Save</span>{" "}
                  <span className="block font-semibold italic text-[#74C425]">
                    Medha Foundation
                  </span>
                </h1>
                <p className="mt-4 text-lg text-slate-700 sm:text-xl font-sen">
                  Work with purpose. Heal with science.
                  <br />
                  Serve with humanity.
                </p>
                <p className="mt-5 text-base leading-relaxed text-slate-600 font-sen">
                  Save Medha Foundation supports patients through Natural
                  Immunotherapy and evidence-informed guidance on nutrition,
                  detoxification, and immunity. We work with an ethical mindset:
                  clear communication, respectful care, and careful
                  documentation. Alongside clinical support, we focus on
                  community awareness so families can make informed, responsible
                  health decisions.
                </p>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative lg:hidden">
                  <div className="absolute right-2 top-8 z-10 h-10 w-10 rounded-full bg-lime-300/80" />
                  <div className="absolute -left-8 bottom-24 z-10 h-9 w-9 rounded-full bg-[#74C425]/50" />
                  <div className="absolute right-20 -bottom-8 z-10 h-10 w-10 rounded-full bg-lime-500" />
                  <div className="relative h-72 w-72">
                    <div className="absolute inset-8 rotate-45 rounded-[2.2rem] border-[14px] border-lime-500" />
                    <div className="absolute inset-12 rotate-45 overflow-hidden rounded-[1.8rem] bg-white shadow-lg">
                      <img
                        src={CAREERS_HERO_IMG}
                        alt="Careers at Save Medha Foundation"
                        className="h-full w-full -rotate-45 scale-[1.35] object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative hidden lg:block">
                  <div className="absolute -right-0 top-10 h-19 w-19 z-11 rounded-full bg-lime-300/80" />
                  <div className="absolute -left-23 bottom-30 z-11 h-18 w-18 rounded-full bg-[#74C425]/50" />
                  <div className="absolute right-41 -bottom-32 z-11 h-18 w-18 rounded-full bg-lime-500" />
                  <div className="relative h-72 w-72 sm:h-96 sm:w-96">
                    <div className="absolute h-99 w-93 right-0 left-1 top-9 rotate-45 rounded-[2.5rem] border-[28px] border-lime-500" />
                    <div className="absolute right-0 top-8 rotate-45  overflow-hidden rounded-[2.2rem] bg-white shadow-lg ">
                      <img
                        src={CAREERS_HERO_IMG}
                        alt="Careers at Save Medha Foundation"
                        className="h-full w-full -rotate-45 object-cover scale-135"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2) WHY WORK WITH US (4 CARDS) */}
        <section className="relative overflow-hidden">
          {/* <div className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-lime-200/60 blur-3xl" /> */}

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center lg:text-left">
              <h2 className="text-3xl font-semibold text-black font-poppins">
                Why work with us
              </h2>
              <svg
                className="mx-auto mt-2 h-3 w-64 text-lime-500 lg:mx-0"
                viewBox="0 0 256 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18 8 C 80 2, 152 2, 250 1"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M2 12 C 62 8, 140 8, 246 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mx-auto mt-3 max-w-lg text-sm font-semibold text-slate-700 sm:text-base lg:mx-0 lg:text-lg font-sen">
                A calm, professional environment where patients and teams are
                treated with dignity.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-4">
              {WHY_CARDS.map((card) => (
                <Card key={card.title} title={card.title}>
                  <p>{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3) OPEN POSITIONS SECTION */}
        <section className="relative overflow-hidden bg-transparent">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionHeading
              title="Open Positions"
              className="mx-auto text-center lg:mx-0 lg:text-left"
            />

            <div className="mt-6 space-y-5 lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0">
              {OPEN_POSITIONS.map((job, index) => (
                <JobCard
                  key={job.title}
                  title={job.title}
                  type={job.type}
                  location={job.location}
                  image={job.image}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4) INTERNSHIP & FELLOWSHIP SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="order-2 relative flex justify-center lg:order-1 lg:justify-start">
                <div className="relative">
                  <div className="absolute z-10 -bottom-6 left-12 h-24 w-24 rounded-full bg-lime-400/70" />
                  <div className="absolute -left-6 top-8 h-8 w-8 rounded-full bg-lime-500" />
                  <div className="relative h-72 w-72 sm:h-96 sm:w-96">
                    <div className="absolute inset-0 rounded-full border-[16px] border-lime-500" />
                    <div className="absolute inset-3 -translate-x-2 overflow-hidden rounded-full bg-white shadow-lg">
                      <img
                        src={internshipImage}
                        alt="Internship and fellowship"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 text-left lg:order-2 lg:text-left">
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl font-poppins">
                  Internship &amp; Fellowship
                </h2>
                <svg
                  className="mt-2 h-3 w-56 text-lime-500"
                  viewBox="0 0 256 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M18 8 C 80 2, 152 2, 250 1"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 12 C 62 8, 140 8, 246 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base font-sen">
                  We welcome students and freshers who want practical exposure
                  in ethical healthcare work. Opportunities are available across
                  medical support, nutrition, public health, tech, and media.
                  You will learn through real cases, guided tasks, and field
                  exposure. A certificate is provided for sincere participation
                  and documented contribution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5) HIRING PROCESS SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <SectionHeading title="Hiring Process" />
            </div>

            {/* <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-base text-slate-700">
              <li>Application review</li>
              <li>Interaction</li>
              <li>Role discussion / task</li>
              <li>Onboarding</li>
            </ol> */}

            <div className=" relative mx-auto max-w-7xl px-4 py-5">
              <div className="absolute z-10 bottom-121 left-36 h-14 w-14 rounded-full bg-lime-400" />
              <CoverflowCarousel />
            </div>

            <div className="mt-6 max-w-4xl rounded-full bg-[#74C425] font-semibold text-lg px-8 py-5 text-center text-sm font-medium text-[#0B2A1F] shadow-md font-sen">
              <p className="">
                We do not make fake promises. We hire ethically, communicate
                respectfully, and keep expectations clear, so candidates can
                decide with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* 6) APPLY CTA SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f8faf7] via-[#eef6ea] to-[#e6f4f1] shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-10">
          <div className="pointer-events-none absolute -left-20 top-18 h-96 w-96 rounded-full bg-[#5CA415]/8" />
          <div className="pointer-events-none absolute -right-25 -top-0 h-96 w-96 rounded-full bg-[#5CA415]/8" />
          <div className="pointer-events-none absolute left-150 top-18 h-26 w-26 rounded-full bg-[#5CA415]" />
            <div className="pointer-events-none absolute left-190 top-60 h-26 w-26 rounded-full bg-[#5CA415]" />
             <div className="pointer-events-none absolute left-210 top-50 h-26 w-26 rounded-full bg-[#5CA415]" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white/70 px-6 py-10 text-center shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-10">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl font-poppins">
                Ready to contribute with care and clarity?
              </h2>
              <p className="mt-3 text-base text-slate-700 font-sen">
                If our mission feels aligned with your values, we would like to
                hear from you. Share your background and how you want to help.
              </p>

              <div className="mt-6 flex flex-col items-center gap-3">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-[#74C425] px-8 py-2 text-sm font-semibold font-poppins text-white shadow-sm transition hover:bg-[#64ac1d]"
                >
                  Apply Now
                </Link>
              </div>

              <div className="mt-6 space-y-1 text-sm text-slate-700 font-sen">
                <p>
                  <span className="font-semibold text-slate-900">Email :</span>{" "}
                  <a
                    href="mailto:info@savemedha.com"
                    className="font-medium text-slate-900 underline underline-offset-4"
                  >
                    info@savemedha.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Phone :</span>{" "}
                  <a
                    href="tel:+919800808595"
                    className="font-medium text-slate-900 underline underline-offset-4"
                  >
                    +91 98008 08595
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7) FOOTER NOTE */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="mx-auto max-w-4xl text-center text-sx font-semibold leading-relaxed text-slate-600 font-sen">
              Save Medha Foundation is an equal opportunity organization. We aim
              for respectful hiring, fair evaluation, and a mission-aligned work
              culture where people are treated with dignity.
            </p>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

