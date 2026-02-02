import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import kidsImage from "../assets/Photo/kid.png";
import donationImage from "../assets/Photo/event/EVENT BOX/1.png";
import handsImage from "../assets/Photo/event/EVENT BOX/2.png";
import teamworkImage from "../assets/Photo/Rectangle 265.png";
import charityImage from "../assets/Photo/Jar.png";
import helpImage from "../assets/Photo/event/EVENT BOX/4.png";

const mosaicRows = [
  {
    large: kidsImage,
    top: donationImage,
    bottom: handsImage,
  },
  {
    large: charityImage,
    top: helpImage,
    bottom: teamworkImage,
    flip: true,
  },
  {
    large: kidsImage,
    top: donationImage,
    bottom: handsImage,
  },
  {
    large: charityImage,
    top: helpImage,
    bottom: teamworkImage,
    flip: true,
  },
  {
    large: kidsImage,
    top: donationImage,
    bottom: handsImage,
  },
];

const MosaicRow = ({ large, top, bottom, flip = false }) => {
  return (
    <div className="grid gap-3 grid-cols-3 grid-rows-2 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[200px] lg:auto-rows-[220px]">
      {/* Big image (left or right depending on flip) */}
      <div
        className={`row-span-2 col-span-2 overflow-hidden rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] md:border-[5px] border-white shadow-lg ${
          flip ? "order-2" : "order-1"
        }`}
      >
        <img src={large} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Small image (top) */}
      <div
        className={`overflow-hidden rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] md:border-[5px] border-white shadow-lg ${
          flip ? "order-2" : "order-2"
        }`}
      >
        <img src={top} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Small image (bottom) */}
      <div
        className={`overflow-hidden rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] md:border-[5px] border-white shadow-lg ${
          flip ? "order-1" : "order-3"
        }`}
      >
        <img src={bottom} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default function OngoingEvents({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="events-projects" onNavigate={onNavigate} />

      <main className="w-full">
        <section className="bg-white pb-14">
          <div className="h-16 sm:h-20 md:h-24 w-full bg-gradient-to-r from-[#a8d86e] to-[#b8e17a]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10">
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between mb-6 sm:mb-8">
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                  Ongoing{" "}
                  <span className="text-[#7fc14b] italic font-bold">Events</span>
                </h1>
                <p className="max-w-xl text-sm sm:text-base text-slate-600">
                  Delivering real solutions that transform lives and strengthen
                  communities.
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#7fc14b] text-white hover:bg-[#6fb03d] transition-colors shadow-md"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#7fc14b] text-white hover:bg-[#6fb03d] transition-colors shadow-md"
                  aria-label="Next"
                >
                  <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
              {mosaicRows.map((row, index) => (
                <MosaicRow key={`mosaic-${index}`} {...row} />
              ))}
            </div>

            <div className="mt-10 sm:mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate?.("events-projects")}
                className="inline-flex items-center gap-2 rounded-full bg-[#e86b2a] px-6 sm:px-8 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:bg-[#d96023] hover:shadow-xl"
              >
                SEE MORE
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}