import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import careersHero from "../assets/Photo/carrer_hero.jpg";
import jobClinical from "../assets/Photo/3.jpg";
import jobNutrition from "../assets/Photo/3.jpg";
import jobData from "../assets/Photo/3.jpg";
import jobMedia from "../assets/Photo/5.jpg";
import jobTech from "../assets/Photo/6.jpg";
import internshipImage from "../assets/Photo/internship.jpg";
import { useEffect, useRef } from "react";

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
    image: jobClinical,
  },
  {
    title: "Nutrition & Immunity Counselor",
    type: "Part-time",
    location: "Hybrid",
    image: jobNutrition,
  },
  {
    title: "Data & Case Documentation Executive",
    type: "Full-time",
    location: "On-site",
    image: jobData,
  },
  {
    title: "Media & Awareness Coordinator",
    type: "Part-time",
    location: "Hybrid",
    image: jobMedia,
  },
  {
    title: "Web / Tech Volunteer (React / WordPress / AI)",
    type: "Volunteer",
    location: "Remote",
    image: jobTech,
  },
];
function SectionHeading({ title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-base text-slate-600 sm:text-lg">{subtitle}</p>
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
      className={`rounded-2xl border min-h-[16rem] border-lime-300/80 bg-gradient-to-b from-lime-100/80 via-lime-50/70 to-white p-6 shadow-[0_14px_30px_rgba(22,101,52,0.08)] ${className}`}
    >
      <h3 className="text-base font-semibold text-slate-900 pb-5">{title}</h3>
      <div className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
        {children}
      </div>
      {/* fade overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-21 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}

function JobCard({ title, type, location, image, index }) {
  const isRightCard = index % 2 === 1;

  return (
    <div
      className={`
        rounded-3xl border border-lime-200/80 bg-white p-6
        shadow-[0_18px_40px_rgba(34,197,94,0.12)]
        transition-transform
        max-w-xl
        mb-10
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
              rounded-2xl bg-lime-500 px-6 py-2 text-sm font-semibold
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
                className="h-full w-full -rotate-45 object-cover scale-128"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// the flipster slide for the careers page
const CoverflowCarousel = () => {
  const flipsterRef = useRef(null);

  useEffect(() => {
    if (!window.$ || !window.$.fn.flipster) {
      return;
    }

    window.$(flipsterRef.current).flipster({
      style: "flat",
      spacing: -0.9,
      nav: false,
      buttons: true,
      loop: true,
      start: 0,
    });
  }, []);

  return (
    <div className="flipster p-20" ref={flipsterRef}>
      <ul>
        <li>
          <div className="slide bg-teal-500">Application Preview</div>
        </li>
        <li>
          <div className="slide bg-teal-300">Interaction</div>
        </li>
        <li>
          <div className="slide bg-teal-100">Role discussion / task</div>
        </li>
        <li>
          <div className="slide bg-teal-50">Onboarding</div>
        </li>
      </ul>
    </div>
  );
};

export default function CareersPage({ onNavigate }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
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
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
                  Careers at{" "}
                  <span className="font-bold text-[#74C425]">Save</span>{" "}
                  <span className="block font-semibold italic text-[#74C425]">
                    Medha Foundation
                  </span>
                </h1>
                <p className="mt-4 text-lg text-slate-700 sm:text-xl">
                  Work with purpose. Heal with science.
                  <br />
                  Serve with humanity.
                </p>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
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
                <div className="relative">
                  <div className="absolute -right-0 top-10 h-19 w-19 z-11 rounded-full bg-lime-300/80" />
                  <div className="absolute -left-23 bottom-30 z-11 h-18 w-18 rounded-full bg-[#74C425]/50" />
                  <div className="absolute right-41 -bottom-32 z-11 h-18 w-18 rounded-full bg-lime-500" />
                  <div className="relative h-72 w-72 sm:h-96 sm:w-96">
                    <div className="absolute h-99 w-93 right-0 left-1 top-9 rotate-45 rounded-[2.5rem] border-[28px] border-lime-500" />
                    <div className="absolute right-0 top-8 rotate-45  overflow-hidden rounded-[2.2rem] bg-white shadow-lg ">
                      <img
                        src={careersHero}
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
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-black">
                Why work with us
              </h2>
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
              <p className="mt-3 text-base font-semibold text-slate-700 max-w-lg sm:text-lg">
                A calm, professional environment where patients and teams are
                treated with dignity.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            <SectionHeading title="Open Positions" />

            <div className="mt-8 grid gap-10 lg:grid-cols-2">
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
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute z-10 -bottom-6 left-12 h-24 w-24 rounded-full bg-lime-400/70" />
                  <div className="absolute -left-6 top-8 h-8 w-8 rounded-full bg-lime-500" />
                  <div className="relative h-109 w-115 sm:h-96 sm:w-96">
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
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Internship &amp; Fellowship
                </h2>
                <svg
                  className="mx-auto mt-2 h-3 w-56 text-lime-500 lg:mx-0"
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
                <p className="mt-5 text-base leading-relaxed text-slate-600">
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
          <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
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

            <div className="mt-6 max-w-4xl rounded-full bg-[#74C425] font-semibold text-lg px-8 py-5 text-center text-sm font-medium text-[#0B2A1F] shadow-md">
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
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Ready to contribute with care and clarity?
              </h2>
              <p className="mt-3 text-base text-slate-700">
                If our mission feels aligned with your values, we would like to
                hear from you. Share your background and how you want to help.
              </p>

              <div className="mt-6 flex flex-col items-center gap-3">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-[#74C425] px-8 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#64ac1d]"
                >
                  Apply Now
                </Link>
              </div>

              <div className="mt-6 space-y-1 text-sm text-slate-700">
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
            <p className="mx-auto max-w-4xl text-center text-sx font-semibold leading-relaxed text-slate-600">
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
