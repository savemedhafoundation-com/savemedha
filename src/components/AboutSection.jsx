import BgOffice from "../assets/homepageassets/Rectangle 355.png";
import AboutFrame from "../assets/homepageassets/Rectangle 354.png";

export default function AboutSection({ onNavigate }) {
  const handleReadMore = () => {
    if (typeof onNavigate === "function") {
      onNavigate("about");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="w-full mx-auto  px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20">
        <div className="relative w-full lg:w-1/2 flex justify-center h-96 lg:h-[400px] ">
          <img
            src={AboutFrame}
            alt="Green circular frame"
            className="absolute inset-0 w-full h-full object-contain  lg:left-4   "
          />
          <div className="relative z-10 m-6 right-9 bg-white rounded-tr-[200px] rounded-br-[200px] rounded-tl-[70px] overflow-hidden shadow-xl border border-white/50">
            <img
              src={BgOffice}
              alt="Save Medha Foundation office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full ">
          <div className="flex items-baseline gap-3 mb-4">
            <p className="text-[#020202] text-4xl font-bold tracking-[0.12em] uppercase">
              About
            </p>
            <h2 className="text-4xl font-bold">
              <span className="text-[#6bc12f]">Our Foundation</span>
            </h2>
          </div>

          <p className="text-gray-800 leading-relaxed mb-5">
            <span className="font-semibold">
              Save Medha Foundation is a dedicated NGO committed to fighting
              cancer through Natural Immunotherapy
            </span>
            {" - "}a holistic, science-backed approach that empowers the body's
            own immune system to combat cancer naturally. We have broken away
            from conventional medical procedures to establish an innovative and
            effective Natural Immunotherapy treatment system for our patients.
          </p>

          <p className="text-gray-800 leading-relaxed mb-5">
            Remarkably,{" "}
            <span className="font-semibold">
              over 90% of our blood cancer patients have achieved recovery
            </span>{" "}
            through our methods. Many of them came to us after exhausting all
            other medical options that left them weaker and without guaranteed
            results. Today, they stand as living examples of hope and healing -
            fully satisfied and rejuvenated through the power of natural
            recovery.
          </p>

          <p className="text-gray-800 leading-relaxed mb-8">
            At Save Medha Foundation, we believe in redefining cancer care - not
            by suppressing symptoms, but by restoring life through nature's own
            defense system.
          </p>

          <button
            type="button"
            onClick={handleReadMore}
            className="bg-[#6bc12f] hover:bg-blue-800 text-white px-6 py-3 rounded font-bold transition-colors cursor-pointer"
          >
            READ MORE
          </button>
        </div>
      </div>
    </section>
  );
}
