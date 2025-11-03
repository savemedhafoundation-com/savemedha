import React, { useMemo } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TREATMENT_CARDS = [
  {
    id: "cancer",
    title: "Cancer Treatment",
    description:
      "Personalised natural immunotherapy protocols that focus on restoring the immune system and targeting the root cause of disease.",
    accent: "from-emerald-400/70 to-emerald-600/80",
  },
  {
    id: "kidney",
    title: "Kidney Treatment",
    description:
      "Support kidney regeneration through toxin removal, nutritional balance, and immune modulation tailored to each patient.",
    accent: "from-blue-400/70 to-indigo-600/80",
  },
  {
    id: "heart",
    title: "Heart Treatment",
    description:
      "Strengthen cardiovascular health with detoxification, lifestyle coaching, and restorative natural therapies.",
    accent: "from-rose-400/70 to-rose-600/80",
  },
  {
    id: "nerve",
    title: "Nerve Treatment",
    description:
      "Protect and revive neural pathways using anti-inflammatory nutrition, biofeedback, and targeted regeneration support.",
    accent: "from-purple-400/70 to-purple-600/80",
  },
  {
    id: "spinal",
    title: "Spinal Muscular Atrophy",
    description:
      "Gentle, consistent care plans crafted to preserve mobility, manage pain, and nurture overall strength and resilience.",
    accent: "from-amber-400/70 to-orange-500/80",
  },
  {
    id: "other",
    title: "Other Treatments",
    description:
      "Comprehensive integrative programs for autoimmune, metabolic, and chronic conditions needing whole-body recovery.",
    accent: "from-cyan-400/70 to-sky-500/80",
  },
];

const SUPPORT_PILLARS = [
  {
    id: "root-cause",
    title: "Root-Cause Focus",
    copy: "We treat the origin of illness, rebuilding immunity while protecting healthy cells.",
  },
  {
    id: "personalised",
    title: "Personalised Roadmaps",
    copy: "Care plans are adjusted at every milestone so patients progress safely and confidently.",
  },
  {
    id: "whole-team",
    title: "Whole-Team Guidance",
    copy: "Doctors, nutritionists, and counsellors partner with the family for every decision.",
  },
];

const CTA_LINKS = [
  {
    id: "ebook",
    title: "Download the Patient Guide",
    description: "Understand how natural immunotherapy works step-by-step.",
  },
  {
    id: "visit",
    title: "Plan a Clinic Visit",
    description: "Schedule a discovery session or request a virtual consultation.",
  },
  {
    id: "stories",
    title: "Read Patient Stories",
    description: "Explore healing journeys from across our treatment programs.",
  },
];

const PlaceholderBadge = ({ text }) => (
  <span className="inline-flex items-center rounded-full border border-white/60 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
    {text}
  </span>
);

export default function Treatment({ onNavigate }) {
  const treatmentCards = useMemo(() => TREATMENT_CARDS, []);
  const supportPillars = useMemo(() => SUPPORT_PILLARS, []);
  const ctaLinks = useMemo(() => CTA_LINKS, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/40 to-white text-slate-900">
      <Navbar currentPage="treatment" onNavigate={onNavigate} />
      <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500/15 via-white to-sky-400/20">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-400/30 blur-3xl" aria-hidden="true" />
        <div className="absolute right-10 top-10 hidden h-64 w-64 rounded-full bg-sky-400/20 blur-2xl lg:block" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-24 lg:px-8">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
              From Hopeless to <span className="text-slate-900">Healed</span>
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Through Natural Immunotherapy and Holistic Patient Care
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              We help families rediscover hope by pairing evidence-based natural therapies with compassionate guidance. Every journey begins with a personalised plan that nurtures immunity, restores balance, and revitalises daily life.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Book an Appointment
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-emerald-500/60 px-6 py-3 text-sm font-semibold text-emerald-600 transition hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
                Talk to a Specialist
              </button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 text-xs uppercase tracking-[0.28em] text-slate-500">
              <span>Personalised Care</span>
              <span className="hidden sm:inline">•</span>
              <span>24/7 Patient Support</span>
              <span className="hidden sm:inline">•</span>
              <span>Holistic Recovery</span>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="relative mx-auto max-w-md rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-emerald-400/40 via-emerald-500/30 to-sky-400/40 p-6 shadow-xl shadow-emerald-500/20 backdrop-blur">
              <PlaceholderBadge text="Image placeholder" />
              <div className="mt-6 aspect-[4/3] w-full rounded-[1.75rem] border border-white/40 bg-gradient-to-br from-white/40 via-white/30 to-emerald-300/30" />
              <div className="pointer-events-none absolute -right-16 bottom-12 hidden h-32 w-32 rounded-full border border-white/50 bg-white/20 blur-2xl lg:block" />
              <div className="pointer-events-none absolute -left-12 top-16 hidden h-24 w-24 rounded-[2rem] border border-white/60 bg-white/30 blur-xl sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Treatments grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Our Treatments</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            A Spectrum of Care Tailored for Transformative Healing
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Every program is built by clinicians, therapists, and nutrition experts working together. Explore the pillars of our natural immunotherapy approach.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-emerald-500" />
        </header>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {treatmentCards.map((card) => (
            <article
              key={card.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100/60 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-lg"
            >
              <div className={`relative overflow-hidden bg-gradient-to-br ${card.accent}`}>
                <div className="aspect-[4/3]" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
                  Image Placeholder
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
                  Natural Healing
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 px-6 py-8">
                <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{card.description}</p>

                <button
                  type="button"
                  className="mt-auto inline-flex items-center self-start rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Support pillars */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white">
        <div className="absolute -right-20 top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="absolute -left-12 bottom-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-8">
          <div className="order-2 space-y-6 text-white/90 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Treating the Root</p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              A New Beginning for Patients and Their Families
            </h2>
            <p className="text-base leading-relaxed">
              Natural immunotherapy awakens the body’s intelligence to restore balance from within. Instead of fighting symptoms, we rebuild immunity, detoxify, and support vital organs so healing becomes sustainable.
            </p>
            <p className="text-base leading-relaxed">
              Our multidisciplinary team tracks progress closely—adjusting nutrition, detox plans, movement therapy, and counselling—so every patient regains confidence, strength, and long-term resilience.
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {supportPillars.map((pillar) => (
                <li
                  key={pillar.id}
                  className="rounded-2xl border border-white/20 bg-white/5 p-4 shadow-sm backdrop-blur transition hover:bg-white/10"
                >
                  <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{pillar.copy}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md rounded-[2.5rem] border border-white/40 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <PlaceholderBadge text="Image placeholder" />
              <div className="mt-6 aspect-[3/4] w-full rounded-[2rem] border border-white/40 bg-gradient-to-b from-white/30 via-white/20 to-emerald-400/20" />
              <div className="absolute -bottom-10 left-12 hidden h-28 w-28 rounded-full border border-white/40 bg-white/20 blur-2xl md:block" aria-hidden="true" />
              <div className="absolute -top-12 right-10 hidden h-24 w-24 rounded-[2.5rem] border border-white/60 bg-white/30 blur-xl sm:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Resources & CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Support Beyond Treatment</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Resources for Every Stage of Healing</h2>
            <p className="mt-4 text-base text-slate-600">
              We walk beside patients and caregivers from the first consultation through sustained recovery. Access education, planning tools, and community support designed to make every decision feel clear and confident.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ctaLinks.map((link) => (
                <div key={link.id} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:border-emerald-400/60 hover:shadow-md">
                  <h3 className="text-base font-semibold text-slate-900">{link.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{link.description}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center rounded-full text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  >
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-100 p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900">Need help mapping your next steps?</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Our care coordinators can review medical history, answer questions, and match you with the right specialist within 24 hours.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Connect With Us
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
