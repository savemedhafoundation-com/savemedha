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
    <div className="grid grid-cols-[2fr,1fr] grid-rows-[140px_140px] gap-4 sm:grid-rows-[160px_160px]  md:grid-rows-[200px_200px] lg:grid-rows-[230px_230px]">
      {/* Big image (left or right depending on flip) */}
      <div
        className={`row-span-2 overflow-hidden rounded-3xl border-[5px] border-white shadow-lg ${
          flip ? "col-start-2" : "col-start-1"
        }`}
      >
        <img src={large} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Small image (top) */}
      <div
        className={`overflow-hidden rounded-3xl border-[5px] border-white shadow-lg ${
          flip ? "col-start-1" : "col-start-2"
        }`}
      >
        <img src={top} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Small image (bottom) */}
      <div
        className={`overflow-hidden rounded-3xl border-[5px] border-white shadow-lg ${
          flip ? "col-start-1" : "col-start-2"
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
          <div className="h-24 w-full bg-gradient-to-r from-[#a8d86e] to-[#b8e17a]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                  Ongoing{" "}
                  <span className="text-[#7fc14b] italic font-bold">Events</span>
                </h1>
                <p className="max-w-xl text-base text-slate-600">
                  Delivering real solutions that transform lives and strengthen
                  communities.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7fc14b] text-white hover:bg-[#6fb03d] transition-colors shadow-md"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7fc14b] text-white hover:bg-[#6fb03d] transition-colors shadow-md"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {mosaicRows.map((row, index) => (
                <MosaicRow key={`mosaic-${index}`} {...row} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => onNavigate?.("events-projects")}
                className="inline-flex items-center gap-2 rounded-full bg-[#e86b2a] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#d96023] hover:shadow-xl"
              >
                SEE MORE
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
