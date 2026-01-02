import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
  },
  {
    title: "Nutrition & Immunity Counselor",
    type: "Part-time",
    location: "Hybrid",
  },
  {
    title: "Data & Case Documentation Executive",
    type: "Full-time",
    location: "On-site",
  },
  {
    title: "Media & Awareness Coordinator",
    type: "Part-time",
    location: "Hybrid",
  },
  {
    title: "Web / Tech Volunteer (React / WordPress / AI)",
    type: "Volunteer",
    location: "Remote",
  },
];

function SectionHeading({ title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-3 text-base text-slate-600 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-slate-700">
        {children}
      </div>
    </div>
  );
}

function JobCard({ title, type, location }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
          className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Apply Now
        </Link>
      </div>
    </article>
  );
}

export default function CareersPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="careers" onNavigate={onNavigate} />

      <main>
        {/* 1) HERO SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Careers at Save Medha Foundation
              </h1>
              <p className="mt-3 text-lg text-slate-700">
                Work with purpose. Heal with science. Serve with humanity.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Save Medha Foundation supports patients through Natural
                Immunotherapy and evidence-informed guidance on nutrition,
                detoxification, and immunity. We work with an ethical mindset:
                clear communication, respectful care, and careful documentation.
                Alongside clinical support, we focus on community awareness so
                families can make informed, responsible health decisions.
              </p>
            </div>
          </div>
        </section>

        {/* 2) WHY WORK WITH US (4 CARDS) */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionHeading
              title="Why Work With Us"
              subtitle="A calm, professional environment where patients and teams are treated with dignity."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_CARDS.map((card) => (
                <Card key={card.title} title={card.title}>
                  <p>{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 3) OPEN POSITIONS SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionHeading title="Open Positions" />

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {OPEN_POSITIONS.map((job) => (
                <JobCard
                  key={job.title}
                  title={job.title}
                  type={job.type}
                  location={job.location}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4) INTERNSHIP & FELLOWSHIP SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionHeading title="Internship & Fellowship" />
            <div className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600">
              <p>
                We welcome students and freshers who want practical exposure in
                ethical healthcare work. Opportunities are available across
                medical support, nutrition, public health, tech, and media. You
                will learn through real cases, guided tasks, and field exposure.
                A certificate is provided for sincere participation and
                documented contribution.
              </p>
            </div>
          </div>
        </section>

        {/* 5) HIRING PROCESS SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <SectionHeading title="Hiring Process" />

            <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-base text-slate-700">
              <li>Application review</li>
              <li>Interaction</li>
              <li>Role discussion / task</li>
              <li>Onboarding</li>
            </ol>

            <div className="mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Transparency note</p>
              <p className="mt-2">
                We do not make fake promises. We hire ethically, communicate
                respectfully, and keep expectations clear, so candidates can
                decide with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* 6) APPLY CTA SECTION */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Ready to contribute with care and clarity?
              </h2>
              <p className="mt-3 text-base text-slate-600">
                If our mission feels aligned with your values, we would like to
                hear from you. Share your background and how you want to help.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Apply Now
                </Link>
              </div>

              <div className="mt-6 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Email:</span>{" "}
                  <a
                    href="mailto:info@savemedha.com"
                    className="text-emerald-800 underline underline-offset-2"
                  >
                    info@savemedha.com
                  </a>
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-slate-900">Phone:</span>{" "}
                  <a
                    href="tel:+919800808595"
                    className="text-emerald-800 underline underline-offset-2"
                  >
                    +91 98008 08595
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7) FOOTER NOTE */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <p className="max-w-3xl text-xs leading-relaxed text-slate-500">
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
