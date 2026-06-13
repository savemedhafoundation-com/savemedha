import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBackgroundOne from "../assets/Photo/event/1.png";
import heroBackgroundTwo from "../assets/Photo/event/2.png";
import heroBackgroundThree from "../assets/Photo/event/3.png";
import eventBoxOne from "../assets/Photo/event/EVENT BOX/1.png";
import eventBoxTwo from "../assets/Photo/event/EVENT BOX/2.png";
import eventBoxThree from "../assets/Photo/event/EVENT BOX/3.png";
import eventBoxFour from "../assets/Photo/event/EVENT BOX/4.png";
import kidsImage from "../assets/Photo/kid.png";
import upcomingEventImage from "../assets/Photo/6.jpg";
import contactIcon from "../assets/Photo/young_woman_in_headset_using_laptop_and_taking_notes-removebg-preview.png";

const heroBackgrounds = [heroBackgroundOne, heroBackgroundTwo, heroBackgroundThree];
const heroFeatureImages = [eventBoxOne, eventBoxTwo, eventBoxThree, eventBoxFour];

const EventCard = ({ image, label, active = false, onClick }) => (
  <article
    className={`mx-auto flex w-full max-w-[255px] flex-col overflow-hidden rounded-[10px] border bg-white p-3 shadow-[0_16px_34px_rgba(25,61,31,0.14)] transition hover:-translate-y-1 ${
      active ? "border-[#159b17] ring-4 ring-[#159b17]" : "border-[#dfe6df]"
    }`}
  >
    <div className="overflow-hidden rounded-[7px]">
      <img src={image} alt={label} className="h-[255px] w-full object-cover" loading="lazy" />
    </div>
    <button
      type="button"
      onClick={onClick}
      className={`mt-3 min-h-[62px] rounded-[6px] px-4 text-sm font-black uppercase transition ${
        active ? "bg-[#159b17] text-white hover:bg-[#0f7c12]" : "bg-[#f4f5f4] text-[#1d241f] hover:bg-[#e8f8e5] hover:text-[#159b17]"
      }`}
    >
      {label}
    </button>
  </article>
);

export default function EventsProjects({ onNavigate }) {
  const eventsRef = useRef(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const intervalId = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroBackgrounds.length);
      setFeatureIndex((current) => (current + 1) % heroFeatureImages.length);
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleScrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-[#1e2520]">
      <Seo
        title="Events & Projects"
        description="Discover Save Medha Foundation's community events and projects creating meaningful impact."
        path="/events-projects"
      />
      <Navbar currentPage="events-projects" onNavigate={onNavigate} />

      <main className="w-full overflow-hidden">
        <section className="relative min-h-[640px] overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            {heroBackgrounds.map((image, index) => (
              <img
                key={image}
                src={image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  index === heroIndex ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
            ))}
            <div className="absolute inset-0 bg-[#0f1719]/78" />
            <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#159b17] via-[#159b17]/58 to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_430px]">
            <div className="max-w-xl">
              <h1 className="font-poppins text-4xl font-black leading-tight sm:text-5xl">
                Creating <em className="text-[#43d22f]">Change</em>
                <span className="block">
                  Where It <em className="text-[#43d22f]">Matters Most</em>
                </span>
              </h1>

              <div className="my-8 hidden h-14 max-w-[470px] items-center sm:flex" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white" />
                <span className="h-px flex-1 bg-white" />
                <span className="h-px w-16 -translate-y-5 rotate-[-45deg] bg-white" />
                <span className="h-2 w-2 -translate-x-1 -translate-y-10 rounded-full bg-white" />
              </div>

              <p className="font-poppins text-2xl font-bold leading-snug">
                Empowering communities through sustainable action and meaningful partnerships.
              </p>
              <p className="mt-5 max-w-md text-[15px] font-semibold leading-[1.72] text-white/88">
                We work at the grassroots level to address real challenges faced by vulnerable communities. Through sustainable projects, strong partnerships, and community-led solutions, we create measurable impact that improves lives and builds a better future.
              </p>

              <button
                type="button"
                onClick={handleScrollToEvents}
                className="mt-8 inline-flex items-center gap-3 rounded-[8px] bg-[#35bd22] px-7 py-4 text-base font-black text-white shadow-[0_16px_36px_rgba(53,189,34,0.28)] transition hover:bg-[#159b17]"
              >
                View Achievement
                <ArrowRight size={19} />
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-[380px]">
              <div className="absolute -left-5 -top-5 h-16 w-16 rounded-full bg-[#9af389]/50" />
              <div className="absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-white/50 blur-[1px]" />
              <div className="relative rounded-tl-[26px] rounded-tr-[70px] rounded-bl-[70px] rounded-br-[26px] border-[5px] border-[#81dd58] bg-white/10 p-2 shadow-[0_24px_54px_rgba(0,0,0,0.28)]">
                <div className="relative h-[300px] overflow-hidden rounded-tl-[18px] rounded-tr-[58px] rounded-bl-[58px] rounded-br-[18px] sm:h-[350px]">
                  {heroFeatureImages.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt="Save Medha Foundation community work"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                        index === featureIndex ? "opacity-100" : "opacity-0"
                      }`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={eventsRef} id="events" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-poppins text-3xl font-black text-[#1d241f]">
              <em className="text-[#159b17]">Events</em> For You
            </h2>
            <p className="mt-5 text-base font-semibold text-[#707970]">
              An Evening Dedicated to Hope and Impact
            </p>

            <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-start">
              <EventCard
                image={kidsImage}
                label="Ongoing Events"
                active
                onClick={() => onNavigate?.("ongoing-events")}
              />
              <EventCard image={upcomingEventImage} label="Upcoming Events" />
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-[#65d23b] to-[#14980f] px-4 pb-20 pt-24 text-center text-white sm:px-6 lg:px-8">
          <div className="absolute -top-16 left-1/2 flex h-36 w-36 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_rgba(20,152,15,0.2)]">
            <img src={contactIcon} alt="" className="h-24 w-24 object-contain" loading="lazy" />
          </div>

          <div className="mx-auto max-w-3xl">
            <p className="text-lg font-medium text-white/90">Get In Touch</p>
            <h2 className="mt-3 font-poppins text-3xl font-black sm:text-4xl">
              we&apos;d Love To Hear From You
            </h2>
            <p className="mt-4 text-base font-semibold leading-relaxed text-white/90">
              We&apos;re here to listen, support, and collaborate.
              <span className="block">Whether it&apos;s a simple question or a big idea - don&apos;t hesitate to reach out.</span>
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.("locateus")}
              className="mt-8 inline-flex items-center gap-3 rounded-[8px] bg-white px-8 py-4 text-sm font-black text-[#1d241f] shadow-[0_16px_32px_rgba(0,0,0,0.12)] transition hover:bg-[#effbeb] hover:text-[#159b17]"
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
