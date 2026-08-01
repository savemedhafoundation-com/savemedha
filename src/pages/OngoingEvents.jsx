import { useState } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/Photo/6.jpg";
import workshopImage from "../assets/Photo/internship.jpg";
import donationImage from "../assets/Photo/event/EVENT BOX/1.png";
import careImage from "../assets/Photo/event/1.png";
import supportImage from "../assets/Photo/event/2.png";
import childrenImage from "../assets/Photo/kid.png";
import doctorImage from "../assets/Photo/event/3.png";

const ongoingEvents = [
  {
    image: workshopImage,
    tag: "Awareness",
    date: "2026-08-04",
    title: "Holistic Health & Immunity Building Workshop",
    location: "Dunlop Outreach Centre, Kolkata",
    featured: true,
  },
  {
    image: donationImage,
    tag: "Nutrition",
    date: "2026-08-11",
    title: "Natural Diet & Detoxification Summit Series",
    location: "Jayanagar Community Hub, Bengaluru",
  },
  {
    image: careImage,
    tag: "Wellness",
    date: "2026-08-16",
    title: "Mind-Body Connection & Recovery Conference",
    location: "New Town Wellness Hall, Kolkata",
  },
  {
    image: supportImage,
    tag: "Recovery",
    date: "2026-08-22",
    title: "Restore & Revive Health Camp",
    location: "Salt Lake Support Centre, Kolkata",
  },
  {
    image: heroImage,
    tag: "Family Care",
    date: "2026-08-27",
    title: "Immunity Support Family Counselling Day",
    location: "Rajarhat Health Studio, Kolkata",
  },
  {
    image: childrenImage,
    tag: "Community",
    date: "2026-08-30",
    title: "Children's Wellness & Care Outreach",
    location: "Belghoria Service Campus, Kolkata",
  },
];

const upcomingEvents = [
  {
    image: doctorImage,
    tag: "Research",
    date: "2026-09-12",
    title: "Global Advances in Natural Immunotherapy",
    location: "SMF Knowledge Forum, Kolkata",
    featured: true,
  },
  {
    image: heroImage,
    tag: "Recovery",
    date: "2026-09-26",
    title: "Chronic Illness Reversal & Recovery",
    location: "Bengaluru Healing Circle, Bengaluru",
  },
  {
    image: donationImage,
    tag: "Nutrition",
    date: "2026-10-03",
    title: "Food, Immunity & Community Care Drive",
    location: "Howrah Community Hall, Kolkata",
  },
  {
    image: workshopImage,
    tag: "Learning",
    date: "2026-10-17",
    title: "Youth Health Leadership Learning Lab",
    location: "Park Street Learning Studio, Kolkata",
  },
];

function EventCard({ image, tag, date, title, location, featured = false }) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-[22px] border border-[#e5ebdf] bg-white shadow-[0_18px_42px_rgba(15,53,21,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(15,53,21,0.12)]">
        <div className="overflow-hidden border-b-[4px] border-[#33c51d]">
          <img
            src={image}
            alt={title}
            className="aspect-[1.18/1] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        <div className="px-1 pb-1 pt-4">
          <div className="flex flex-wrap items-center gap-3 px-5">
            <span className="rounded-full bg-[#eaf9df] px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#34a11a]">
              {tag}
            </span>
            <span className="text-[12px] font-semibold tracking-[0.02em] text-[#7b877a]">
              {date}
            </span>
          </div>

          <h3
            className={`px-5 pt-4 font-poppins text-[31px] font-bold leading-[1.18] tracking-[-0.035em] sm:text-[32px] ${
              featured ? "text-[#22b215]" : "text-[#181f18]"
            }`}
            style={{ fontSize: "clamp(1.65rem, 1.15rem + 1vw, 2rem)" }}
          >
            {title}
          </h3>

          <div className="flex items-start gap-2 px-5 pb-5 pt-4 text-[#697568]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.03em]">
              {location}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function EventsSection({
  id,
  accentTitle,
  title,
  description,
  events,
  visibleCount,
  onLoadMore,
}) {
  return (
    <section id={id} className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <p className="font-poppins text-[32px] font-semibold italic tracking-[-0.04em] text-[#20b015] sm:text-[42px]">
              {accentTitle}
            </p>
            <h2 className="mt-1 font-poppins text-[38px] font-bold leading-[1.02] tracking-[-0.05em] text-[#171d17] sm:text-[54px]">
              {title}
            </h2>
            <div className="mt-6 h-[4px] w-20 rounded-full bg-[#27b619]" />
          </div>

          <p className="max-w-[360px] pt-2 text-[18px] font-medium leading-[1.85] text-[#7c857c] sm:text-[20px]">
            {description}
          </p>
        </div>

        <div className="mt-14 grid gap-x-7 gap-y-12 md:grid-cols-2">
          {events.slice(0, visibleCount).map((event) => (
            <EventCard key={`${id}-${event.title}`} {...event} />
          ))}
        </div>

        {visibleCount < events.length ? (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={onLoadMore}
              className="inline-flex items-center gap-3 rounded-full border border-[#d9dfd4] bg-white px-7 py-3 text-[15px] font-semibold text-[#1b221b] shadow-[0_10px_24px_rgba(16,41,21,0.08)] transition hover:-translate-y-0.5 hover:border-[#c8d9c0] hover:shadow-[0_14px_30px_rgba(16,41,21,0.10)]"
            >
              Load More Events
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function OngoingEvents({ onNavigate }) {
  const [visibleOngoingCount, setVisibleOngoingCount] = useState(4);
  const [visibleUpcomingCount, setVisibleUpcomingCount] = useState(2);

  const handleScrollToOngoing = () => {
    const ongoingSection = document.getElementById("ongoing-events-section");
    ongoingSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-[#182018]">
      <Seo
        title="Ongoing & Upcoming Events"
        description="Explore Save Medha Foundation's ongoing and upcoming wellness, awareness, and recovery events."
        path="/ongoing-events"
      />
      <Navbar currentPage="events-projects" onNavigate={onNavigate} />

      <main className="overflow-hidden bg-white">
        <section className="relative isolate overflow-hidden bg-[#06410f]">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 82% 45%, rgba(66, 205, 38, 0.36) 0%, rgba(66, 205, 38, 0) 28%), linear-gradient(90deg, rgba(3, 51, 12, 0.98) 0%, rgba(5, 78, 16, 0.96) 62%, rgba(6, 112, 20, 0.98) 100%)",
            }}
          />
          <div className="absolute inset-y-0 left-[52%] hidden w-px bg-white/8 lg:block" aria-hidden="true" />

          <div className="relative mx-auto grid max-w-[1040px] gap-14 px-5 py-16 text-white sm:px-6 sm:py-20 lg:grid-cols-[1fr_450px] lg:items-center lg:px-8">
            <div className="max-w-[460px]">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/88 backdrop-blur-sm">
                Events &amp; Projects / Ongoing Events
              </div>

              <h1 className="mt-7 font-poppins text-[64px] font-bold leading-[0.94] tracking-[-0.06em] text-white sm:text-[88px]">
                Events
              </h1>

              <p className="mt-6 max-w-[320px] text-[20px] font-medium leading-[1.65] text-white/82 sm:text-[22px]">
                Stay Updated with Our Latest Events and Activities
              </p>

              <button
                type="button"
                onClick={handleScrollToOngoing}
                className="mt-9 inline-flex items-center rounded-full bg-gradient-to-r from-[#4ada2e] to-[#20b114] px-7 py-3.5 font-poppins text-[17px] font-semibold text-white shadow-[0_18px_40px_rgba(50,205,50,0.25)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_48px_rgba(50,205,50,0.34)]"
              >
                View events
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute -left-7 top-4 h-32 w-32 rounded-full bg-[#43d629]/18 blur-2xl" aria-hidden="true" />
              <div className="absolute -right-8 bottom-2 h-36 w-36 rounded-full bg-[#9bf763]/18 blur-3xl" aria-hidden="true" />

              <div className="relative rounded-[26px] border border-white/14 bg-white/6 p-3 shadow-[0_28px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                <img
                  src={heroImage}
                  alt="Save Medha Foundation event gathering"
                  className="aspect-[1.16/0.92] w-full rounded-[20px] object-cover"
                />
              </div>

              <div className="absolute -left-4 top-10 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#1e7e15] shadow-lg">
                Live Workshop
              </div>
              <div className="absolute -right-5 bottom-7 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#1e7e15] shadow-lg">
                Community Campus
              </div>
            </div>
          </div>
        </section>

        <EventsSection
          id="ongoing-events-section"
          accentTitle="Ongoing Events"
          title="For You"
          description="Join our current initiatives focused on holistic healing and spreading health awareness across communities."
          events={ongoingEvents}
          visibleCount={visibleOngoingCount}
          onLoadMore={() =>
            setVisibleOngoingCount((count) => Math.min(count + 2, ongoingEvents.length))
          }
        />

        <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-[#d8dfd7]" />
        </div>

        <EventsSection
          id="upcoming-events-section"
          accentTitle="Upcoming Events"
          title="For You"
          description="Discover what's next. Register early for our upcoming immunotherapy and natural healing events."
          events={upcomingEvents}
          visibleCount={visibleUpcomingCount}
          onLoadMore={() =>
            setVisibleUpcomingCount((count) => Math.min(count + 2, upcomingEvents.length))
          }
        />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
