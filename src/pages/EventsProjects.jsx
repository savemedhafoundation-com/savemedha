import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBackgroundOne from "../assets/Photo/event/1.png";
import heroBackgroundTwo from "../assets/Photo/event/2.png";
import heroBackgroundThree from "../assets/Photo/event/3.png";
import eventBoxOne from "../assets/Photo/event/EVENT BOX/1.png";
import eventBoxTwo from "../assets/Photo/event/EVENT BOX/2.png";
import eventBoxThree from "../assets/Photo/event/EVENT BOX/3.png";
import eventBoxFour from "../assets/Photo/event/EVENT BOX/4.png";
import ongoingEventImage from "../assets/Photo/5.jpg";
import upcomingEventImage from "../assets/Photo/6.jpg";
import contactIcon from "../assets/Photo/young woman in headset using laptop and taking notes.png";

const EventCard = ({
  image,
  label,
  offset = false,
  imageClassName = "",
  onClick,
}) => (
  <div className={`relative ${offset ? "md:mt-14" : ""}`}>
    {/* <div className="absolute -left-3 -top-3 h-8 w-8 rounded-full border-[6px] border-[#7fc14b] bg-white shadow-sm" /> */}
    <div className="rounded-[28px] border border-[#a9d971] bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <div className="overflow-hidden rounded-[22px] border border-[#d8efbf]">
        <img
          src={image}
          alt={label}
          className={` w-full object-cover  ${imageClassName}`}
          loading="lazy"
        />
      </div>
    </div>
    <div className="mt-4 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="rounded-full bg-[#def1c5] px-6 py-2 text-sm font-semibold text-[#000000] shadow-sm"
      >
        {label}
      </button>
    </div>
  </div>
);

export default function EventsProjects({ onNavigate }) {
  const eventsRef = useRef(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [eventBoxIndex, setEventBoxIndex] = useState(0);
  const heroBackgrounds = [
    heroBackgroundOne,
    heroBackgroundTwo,
    heroBackgroundThree,
  ];
  const eventBoxImages = [
    eventBoxOne,
    eventBoxTwo,
    eventBoxThree,
    eventBoxFour,
  ];

  useEffect(() => {
    if (heroBackgrounds.length < 2 || typeof window === "undefined")
      return undefined;

    const intervalId = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroBackgrounds.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [heroBackgrounds.length]);

  useEffect(() => {
    if (eventBoxImages.length < 2 || typeof window === "undefined")
      return undefined;

    const intervalId = window.setInterval(() => {
      setEventBoxIndex((current) => (current + 1) % eventBoxImages.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [eventBoxImages.length]);

  const handleScrollToEvents = () => {
    if (eventsRef.current) {
      eventsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="events-projects" onNavigate={onNavigate} />

      <main className="w-full">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            {heroBackgrounds.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === heroIndex ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${image})` }}
                aria-hidden="true"
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
          </div>

          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12 lg:flex-row lg:items-center lg:pt-16">
            <div className="space-y-6 text-white lg:max-w-xl">
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Creating <span className="text-[#9ee06c] italic">Change</span>
                <br />
                Where It{" "}
                <span className="text-[#9ee06c] italic">Matters Most</span>
              </h1>

              <div className="relative w-[540px] h-[10px]">
                {/* Start dot */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white" />

                {/* Main horizontal line */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-[540px] bg-white/70" />

                {/* Angled line (ending dot attached) */}
                <span className="absolute left-[540px] top-1/2 h-[2px] w-[180px] bg-white/70 rotate-[320deg] origin-left" />

                {/* End dot */}
                <span className="absolute left-[540px] top-1/2 h-2 w-2 -translate-y-1/2 translate-x-[136px] -translate-y-[120px] rounded-full bg-white" />
              </div>

              <p className="max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
                <span className="block text-base font-semibold text-white sm:text-lg md:text-xl">
                  Empowering communities through sustainable action and
                  meaningful partnerships.
                </span>
                <span className="mt-2 block">
                  We work at the grassroots level to address real challenges
                  faced by vulnerable communities. Through sustainable projects,
                  strong partnerships, and community-led solutions, we create
                  measurable impact that improves lives and builds a better
                  future.
                </span>
              </p>

              <button
                type="button"
                onClick={handleScrollToEvents}
                className="inline-flex items-center gap-3 rounded-full bg-[#e86b2a] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d96023]"
              >
                View Achievement
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="relative flex-1">
              <div className="absolute left-30 -top-6 h-18 w-18 rounded-full bg-white/60" />
              <div className="rounded-[30px] border-4 border-white/70 bg-white/10 p-2 shadow-[0_22px_45px_rgba(0,0,0,0.25)] translate-x-30">
                <div className="relative h-[280px] overflow-hidden translate-x-2  rounded-tl-[20px] rounded-tr-[60px] rounded-bl-[50px] rounded-br-[20px] border border-white/70 sm:h-[300px] lg:h-[360px]">
                  {eventBoxImages.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt="Community rescue"
                      className={`absolute inset-0 h-[280px] w-full object-cover transition-opacity duration-1000 sm:h-[340px] lg:h-[360px] ${
                        index === eventBoxIndex ? "opacity-100" : "opacity-0"
                      }`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-1 left-0 w-full">
            <svg
              viewBox="0 0 1440 120"
              className="h-20 w-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,64 C240,120 480,120 720,70 C960,20 1200,20 1440,70 L1440,120 L0,120 Z"
                fill="#9ad25b"
              />
              <path
                d="M0,88 C240,120 480,120 720,90 C960,60 1200,60 1440,90 L1440,120 L0,120 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        <section
          ref={eventsRef}
          id="events"
          className="relative bg-white py-16"
        >
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-2xl font-bold text-[#78bb2a] sm:text-3xl">
              Events For You
            </h2>
            <div className="mx-auto mt-2 h-[3px] w-24 rounded-full bg-[#78bb2a]" />
            <p className="mt-4 text-sm font-semibold text-slate-700 sm:text-base">
              An Evening Dedicated to Hope and Impact
            </p>
          </div>

          <div className="mx-auto -translate-y-10 w-full max-w-5xl px-6">
            <svg
              width="900"
              height="300"
              viewBox="0 0 900 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-full"
              aria-hidden="true"
            >
              {/* Main rounded path */}
              <path
                d="
                  M 40 200
                  V 120
                  Q 40 100 60 100
                  H 580
                  Q 600 100 600 120
                  V 160
                  Q 600 180 620 180
                  H 840
                "
                stroke="#84CC16"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Start dot */}
              <circle cx="40" cy="200" r="6" fill="#84CC16" />

              {/* End dot */}
              <circle cx="840" cy="180" r="6" fill="#84CC16" />
            </svg>
          </div>

          <div className="relative mx-auto -translate-y-50 translate-x-20 grid max-w-5xl gap-10 px-6 md:grid-cols-2">
            <EventCard
              image={ongoingEventImage}
              label="Ongoing Events"
              onClick={() => onNavigate?.("ongoing-events")}
            />
            <EventCard
              image={upcomingEventImage}
              label="Upcoming Events"
              offset
              imageClassName="h-[260px] sm:h-[360px]"
            />

            

          </div>
        </section>

        <section className="relative bg-[#e45f26] pb-16 pt-20 text-center text-white">
          <div className="absolute -top-10 left-1/2 flex h-24 w-24 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-xl">
            <img
              src={contactIcon}
              alt=""
              className="h-14 w-14 object-contain"
              loading="lazy"
            />
          </div>

          <div className="mx-auto max-w-3xl px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              Get In Touch
            </p>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              we'd Love To Hear From You
            </h3>
            <p className="mt-4 text-sm text-white/90 sm:text-base">
              We are here to listen, support, and collaborate. Whether it is a
              simple question or a big idea, do not hesitate to reach out.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.("locateus")}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#e45f26] shadow-lg transition hover:bg-[#f8f2ee]"
            >
              Contact with us
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
