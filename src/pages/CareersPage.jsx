import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Seo } from "../components/Seo";
import internshipImage from "../assets/Photo/internship.jpg";

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
      "Support patient care, community awareness, and responsible health communication with empathy and discipline.",
    featured: true,
  },
  {
    title: "Learning-focused culture",
    description:
      "Grow through guided reading, documented workflows, research support, and practical field exposure.",
  },
  {
    title: "Human-first care",
    description:
      "We work with honesty, privacy, respectful communication, and steady teamwork in sensitive situations.",
  },
  {
    title: "Real-world impact",
    description:
      "Your contribution helps families access clearer information and better long-term wellness support.",
  },
];

const OPEN_POSITIONS = [
  {
    title: "Clinical Research Associate",
    meta: "Full-time / On-site",
    image: CLINICAL_RESEARCH_IMG,
    imagePosition: "50% 24%",
    imageScale: 1.04,
  },
  {
    title: "Nutrition & Immunity Counselor",
    meta: "Part-time / Hybrid",
    image: NUTRITION_IMMUNITY_IMG,
    imagePosition: "50% 18%",
    imageScale: 1.02,
  },
  {
    title: "Data & Case Documentation Executive",
    meta: "Full-time / On-site",
    image: DATA_CASE_DOC_IMG,
    imagePosition: "50% 36%",
    imageScale: 1.06,
  },
  {
    title: "Media & Awareness Coordinator",
    meta: "Part-time / Hybrid",
    image: MEDIA_AWARENESS_IMG,
    imagePosition: "50% 28%",
    imageScale: 1.05,
  },
  {
    title: "Web / Tech Volunteer (React / WordPress / AI)",
    meta: "Volunteer / Remote",
    image: WEB_TECH_VOLUNTEER_IMG,
    imagePosition: "50% 28%",
    imageScale: 1.05,
  },
];

const WHY_CHOOSE_POINTS = [
  {
    title: "Growth & Learning Opportunities",
    description:
      "Develop through guided responsibilities, documented processes, and day-to-day collaboration.",
  },
  {
    title: "Supportive Work Culture",
    description:
      "We value clarity, professionalism, and respect across clinical, outreach, and support teams.",
  },
  {
    title: "Career Advancement",
    description:
      "Strong contributors earn deeper ownership, broader exposure, and mission-aligned growth.",
  },
  {
    title: "Team-driven Environment",
    description:
      "You work alongside people committed to patient dignity, ethical care, and measurable impact.",
  },
];

const RIBBON_ITEMS = [
  "Website Development",
  "UI/UX Design",
  "React Development",
  "Graphics Design",
];

const HIRING_STEPS = [
  {
    label: "Step 01",
    title: "Application review",
    description:
      "We review your background, interests, and alignment with the role and the foundation's mission.",
  },
  {
    label: "Step 02",
    title: "Interaction",
    description:
      "Shortlisted candidates join a focused conversation so we can understand communication, intent, and values.",
  },
  {
    label: "Step 03",
    title: "Role discussion / task",
    description:
      "Depending on the role, we may include a practical task or case-based discussion to evaluate working style.",
  },
  {
    label: "Step 04",
    title: "Onboarding",
    description:
      "Selected candidates are guided through role expectations, workflows, and the standards we work with.",
  },
];

function SectionDivider() {
  return (
    <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
      <div className="h-px w-full bg-[#dfe4db]" />
    </div>
  );
}

function WhyCard({ title, description, featured = false }) {
  return (
    <article
      className={`relative min-h-[176px] rounded-[18px] p-5 shadow-[0_16px_32px_rgba(17,46,26,0.06)] transition hover:-translate-y-1 ${
        featured
          ? "bg-[#40bf25] text-white"
          : "border border-[#ebefea] bg-[#f5f7f4] text-[#1a211a]"
      }`}
    >
      <h3 className="max-w-[190px] font-poppins text-[18px] font-semibold leading-[1.15] tracking-[-0.03em]">
        {title}
      </h3>
      <p
        className={`mt-4 max-w-[210px] text-[12px] font-medium leading-[1.65] ${
          featured ? "text-white/82" : "text-[#667165]"
        }`}
      >
        {description}
      </p>
      <span
        className={`absolute bottom-4 right-4 h-7 w-7 rounded-full ${
          featured ? "bg-white" : "bg-[#3bbb20]"
        }`}
        aria-hidden="true"
      />
    </article>
  );
}

function DiamondImage({
  image,
  alt,
  objectPosition = "center",
  imageScale = 1,
  className = "",
}) {
  return (
    <div className={`relative h-28 w-28 shrink-0 sm:h-32 sm:w-32 ${className}`}>
      <div className="absolute inset-0 rotate-45 rounded-[1.75rem] bg-[#37c31d]" />
      <div className="absolute inset-[5px] rotate-45 overflow-hidden rounded-[1.55rem] bg-white shadow-lg">
        <div
          className="absolute left-1/2 top-1/2 h-[142%] w-[142%]"
          style={{
            transform: `translate(-50%, -50%) rotate(-45deg) scale(${imageScale})`,
            transformOrigin: "center",
          }}
        >
          <img
            src={image}
            alt={alt}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function JobCard({
  title,
  meta,
  image,
  imagePosition,
  imageScale,
  reverse = false,
}) {
  return (
    <article
      className={`relative overflow-visible rounded-[22px] border border-[#d7e8ce] bg-white px-5 py-5 shadow-[0_18px_40px_rgba(17,46,26,0.08)] ${
        reverse ? "lg:ml-10" : "lg:mr-10"
      }`}
    >
      <div
        className={`flex flex-col gap-5 sm:items-center ${
          reverse ? "sm:flex-row-reverse" : "sm:flex-row"
        }`}
      >
        <div className={`min-w-0 flex-1 ${reverse ? "sm:text-right" : ""}`}>
          <h3 className="font-poppins text-[21px] font-semibold leading-[1.12] tracking-[-0.04em] text-[#151b15]">
            {title}
          </h3>
          <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#7e897d]">
            {meta}
          </p>
          <Link
            to="/apply"
            className="mt-5 inline-flex min-w-[112px] items-center justify-center rounded-[10px] bg-[#41bd28] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2fa51b]"
          >
            Apply Now
          </Link>
        </div>

        <DiamondImage
          image={image}
          alt={title}
          objectPosition={imagePosition}
          imageScale={imageScale}
        />
      </div>
    </article>
  );
}

function Ribbon() {
  return (
    <div className="bg-[#0d5a14] px-4 py-3 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.08em] sm:text-[13px]">
        {RIBBON_ITEMS.map((item, index) => (
          <div key={item} className="flex items-center gap-5">
            <span>{item}</span>
            {index < RIBBON_ITEMS.length - 1 ? (
              <span className="text-white/55">&bull;</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HIRING_STEPS.length);
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="mx-auto mt-12 flex max-w-[720px] flex-col items-center gap-8">
      <div className="relative h-[280px] w-[240px] sm:h-[320px] sm:w-[280px]">
        {HIRING_STEPS.map((step, index) => {
          const distance = (index - activeIndex + HIRING_STEPS.length) % HIRING_STEPS.length;
          const layerStyles = [
            {
              transform: "translate3d(0, 0, 0) scale(1)",
              opacity: 1,
              zIndex: 40,
            },
            {
              transform: "translate3d(18px, 0, 0) scale(0.94)",
              opacity: 0.7,
              zIndex: 30,
            },
            {
              transform: "translate3d(34px, 0, 0) scale(0.88)",
              opacity: 0.48,
              zIndex: 20,
            },
            {
              transform: "translate3d(48px, 0, 0) scale(0.82)",
              opacity: 0,
              zIndex: 10,
            },
          ][distance];
          const isActive = distance === 0;

          return (
            <div
              key={step.title}
              className={`career-process-card absolute inset-0 rounded-[32px] px-8 text-center transition-[transform,opacity,box-shadow,background-color,color] duration-700 ease-out ${
                isActive
                  ? "career-process-card-active bg-[#39bd1f] text-white shadow-[0_30px_60px_rgba(31,128,18,0.22)]"
                  : "bg-[#dff4cf] text-[#24561d]"
              }`}
              style={layerStyles}
              aria-hidden={!isActive}
            >
              <div
                className={`flex h-full flex-col items-center justify-center ${
                  isActive ? "career-process-card-content-active" : ""
                }`}
              >
                <p
                  className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "text-white/70" : "text-[#2d6f25]/72"
                  }`}
                >
                  {step.label}
                </p>
                <h3 className="mt-4 font-poppins text-[34px] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[42px]">
                  {step.title}
                </h3>
                <span
                  className={`mt-8 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-md ${
                    isActive ? "bg-white text-[#16920a]" : "bg-white/80 text-[#2d6f25]"
                  }`}
                >
                  <ChevronRight className="h-6 w-6" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {HIRING_STEPS.map((step, index) => (
          <button
            key={step.label}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${step.title}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-10 bg-[#37bd1d]" : "w-2.5 bg-[#c6d3c1]"
            }`}
          />
        ))}
      </div>

      <p className="max-w-[520px] text-center text-[15px] font-medium leading-[1.9] text-[#6d786d] sm:text-[16px]">
        {HIRING_STEPS[activeIndex].description}
      </p>
    </div>
  );
}

export default function CareersPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white text-[#151b15]">
      <Seo
        title="Careers"
        description="Join Save Medha Foundation's mission-driven team. Explore careers, internships, and ethical healthcare opportunities."
        path="/careers"
      />
      <Navbar currentPage="careers" onNavigate={onNavigate} />

      <main className="bg-white">
        <section className="py-14 sm:py-18">
          <div className="mx-auto grid max-w-[1040px] gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_360px] lg:items-center lg:px-8">
            <div className="max-w-[520px]">
              <h1 className="font-poppins text-[42px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#171d17] sm:text-[56px]">
                Careers at{" "}
                <span className="text-[#2cb51a]">Save Medha Foundation</span>
              </h1>
              <p className="mt-6 font-poppins text-[27px] font-medium leading-[1.22] tracking-[-0.03em] text-[#1b211b] sm:text-[33px]">
                Work with purpose. Heal with science. Serve with humanity.
              </p>
              <p className="mt-6 max-w-[470px] text-[15px] font-medium leading-[1.9] text-[#5f6a5f] sm:text-[16px]">
                Save Medha Foundation supports patients through Natural Immunotherapy
                and evidence-informed guidance on nutrition, detoxification, and
                immunity. We work with an ethical mindset: clear communication,
                respectful care, and careful documentation. Alongside clinical
                support, we focus on community awareness so families can make
                informed, responsible health decisions.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[330px]">
              <div className="absolute -right-2 top-3 h-10 w-10 rounded-full bg-[#8de259]" />
              <div className="absolute -left-3 bottom-8 h-10 w-10 rounded-full bg-[#31b61c]" />
              <div className="relative h-[310px] sm:h-[340px]">
                <div className="absolute inset-[16px] rotate-45 rounded-[2.5rem] border-[10px] border-[#37c31d]" />
                <div className="absolute inset-[36px] rotate-45 overflow-hidden rounded-[2rem] bg-white shadow-[0_26px_50px_rgba(17,46,26,0.15)]">
                  <img
                    src={CAREERS_HERO_IMG}
                    alt="Careers at Save Medha Foundation"
                    className="h-full w-full -rotate-45 scale-[1.38] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
            <h2 className="font-poppins text-[34px] font-semibold tracking-[-0.05em] text-[#171d17] sm:text-[42px]">
              Why work with us
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] font-medium leading-[1.8] text-[#6d786d] sm:text-[18px]">
              A calm, professional environment where patients and teams are treated
              with dignity.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {WHY_CARDS.map((card) => (
                <WhyCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <h2 className="font-poppins text-[36px] font-semibold leading-[1.04] tracking-[-0.05em] text-[#171d17] sm:text-[48px]">
                  Open Positions for your{" "}
                  <span className="italic text-[#2db319]">Career</span>
                </h2>
              </div>
              <p className="max-w-[340px] text-[16px] font-medium leading-[1.9] text-[#6d786d] sm:text-[18px]">
                Join our team and work with passionate professionals committed to
                creating meaningful change.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {OPEN_POSITIONS.map((job, index) => (
                <JobCard key={job.title} {...job} reverse={index % 2 === 1} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f5f3] py-16 sm:py-18">
          <div className="mx-auto grid max-w-[1040px] gap-10 px-5 sm:px-6 lg:grid-cols-[280px_1fr] lg:items-center lg:px-8">
            <div className="relative mx-auto h-[210px] w-[210px]">
              <div className="absolute inset-0 rounded-full border-[7px] border-[#35bc20]" />
              <div className="absolute inset-[14px] overflow-hidden rounded-full bg-white shadow-[0_20px_40px_rgba(17,46,26,0.10)]">
                <img
                  src={internshipImage}
                  alt="Internship and fellowship"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-3 right-0 h-12 w-12 rounded-full bg-[#31bc17]" />
            </div>

            <div className="max-w-[560px]">
              <h2 className="font-poppins text-[34px] font-semibold tracking-[-0.05em] text-[#171d17] sm:text-[44px]">
                Internship &amp; Fellowship
              </h2>
              <p className="mt-5 text-[15px] font-medium leading-[1.95] text-[#5f6a5f] sm:text-[17px]">
                We welcome students and freshers who want practical exposure in
                ethical healthcare work. Opportunities are available across medical
                support, nutrition, public health, tech, and media. You will learn
                through real cases, guided tasks, and field exposure. A certificate
                is provided for sincere participation and documented contribution.
              </p>
            </div>
          </div>
        </section>

        <Ribbon />

        <section
          className="relative overflow-hidden py-16 text-white sm:py-20"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(4, 53, 11, 0.96) 0%, rgba(6, 74, 18, 0.92) 55%, rgba(4, 53, 11, 0.96) 100%), url("${CAREERS_HERO_IMG}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto grid max-w-[1040px] gap-10 px-5 sm:px-6 lg:grid-cols-[310px_1fr] lg:items-start lg:px-8">
            <div>
              <h2 className="font-poppins text-[36px] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[48px]">
                Why Choose us for your{" "}
                <span className="italic text-[#7eea59]">Career</span>
              </h2>

              <div className="mt-8 overflow-hidden rounded-[18px] border border-white/10 bg-white/6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                <img
                  src={internshipImage}
                  alt="Team learning together"
                  className="h-[190px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {WHY_CHOOSE_POINTS.map((point) => (
                <article
                  key={point.title}
                  className="rounded-[18px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8cf15c]" />
                    <div>
                      <h3 className="font-poppins text-[18px] font-semibold tracking-[-0.03em] text-white">
                        {point.title}
                      </h3>
                      <p className="mt-3 text-[13px] font-medium leading-[1.8] text-white/78">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Ribbon />

        <section className="py-16 sm:py-20">
          <SectionDivider />
          <div className="mx-auto max-w-[1040px] px-5 pt-16 text-center sm:px-6 lg:px-8 sm:pt-20">
            <h2 className="font-poppins text-[38px] font-semibold tracking-[-0.05em] text-[#171d17] sm:text-[52px]">
              Hiring Process
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[15px] font-medium leading-[1.9] text-[#6d786d] sm:text-[17px]">
              Our hiring process is designed to identify passionate individuals who
              are ready to grow, contribute, and succeed with our team.
            </p>

            <ProcessDeck />
          </div>

          <div className="mt-10 bg-[#c9f7b9] px-5 py-4 text-center text-[13px] font-semibold text-[#174714] sm:text-[14px]">
            We do not make fake promises. We hire ethically, communicate
            respectfully, and keep expectations clear, so candidates can decide
            with confidence.
          </div>
        </section>

        <section className="border-t border-[#e4e8e2] py-16 sm:py-20">
          <div className="mx-auto max-w-[820px] px-5 text-center sm:px-6">
            <h2 className="font-poppins text-[34px] font-semibold leading-[1.08] tracking-[-0.05em] text-[#171d17] sm:text-[46px]">
              Ready to contribute with care and clarity?
            </h2>
            <p className="mx-auto mt-4 max-w-[620px] text-[15px] font-medium leading-[1.9] text-[#6d786d] sm:text-[17px]">
              If our mission feels aligned with your values, we would like to hear
              from you. Share your background and how you want to help.
            </p>

            <Link
              to="/apply"
              className="mt-8 inline-flex items-center justify-center rounded-[10px] bg-[#3dbc22] px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-[#2ea01b]"
            >
              Apply Now
            </Link>

            <div className="mt-8 space-y-2 text-[15px] font-medium text-[#4e5a4d]">
              <p>
                Email:{" "}
                <a href="mailto:info@savemedha.com" className="font-semibold text-[#163916]">
                  info@savemedha.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+919800808595" className="font-semibold text-[#163916]">
                  +91 98008 08595
                </a>
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-[720px] text-[13px] font-medium leading-[1.85] text-[#6d786d] sm:text-[14px]">
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
