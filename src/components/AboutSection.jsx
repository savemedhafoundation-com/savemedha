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
        <div className="relative w-full lg:w-1/2 flex justify-center h-[320px] sm:h-[370px] md:h-[380px] lg:h-[400px]">
          <img
            src={AboutFrame}
            alt="Green circular frame"
            className="absolute inset-0 w-full h-full object-contain  lg:left-4"
          />
          <div className="relative z-10 bg-white overflow-hidden w-[85%] sm:w-[75%] md:w-[65%] lg:w-[80%] h-[85%] sm:h-[80%] md:h-[75%] lg:h-[85%] mt-6 sm:mt-8 lg:mt-6 right-0 sm:right-4 lg:right-9 rounded-tr-[160px] rounded-br-[160px] sm:rounded-tr-[180px] sm:rounded-br-[180px] lg:rounded-tr-[200px] lg:rounded-br-[200px] rounded-tl-[60px]">
            <img
              src={BgOffice}
              alt="Save Medha Foundation office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full ">
          <div className="flex items-baseline gap-2 sm:gap-3 mb-4">
            <p className="text-[#020202] text-2xl sm:text-4xl font-bold tracking-[0.08em] sm:tracking-[0.12em] uppercase">
              About
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold whitespace-nowrap uppercase tracking-[0.08em] sm:tracking-[0.12em]">
              <span className="text-[#74C425]">Our Foundation</span>
            </h2>
          </div>

          <p className="mb-5 text-black font-poppins text-[19px] leading-[1] tracking-normal text-justify sm:text-gray-800 sm:font-sans sm:text-base sm:leading-relaxed sm:text-left">
            <span className="font-semibold">
              Save Medha Foundation is a dedicated NGO committed to fighting
              cancer through Natural Immunotherapy
            </span>
            <span className="font-normal">
              a holistic, science-backed approach that empowers the body’s own
              immune system to combat cancer naturally. We have broken away from
              conventional medical procedures to establish an innovative and
              effective Natural Immunotherapy treatment system for our patients.
            </span>
          </p>

          <p className="mb-8 text-black font-poppins text-[19px] leading-[1] tracking-normal text-justify sm:text-gray-800 sm:font-sans sm:text-base sm:leading-relaxed sm:text-left">
            Remarkably,{" "}
            <span className="font-semibold">
              over 90% of our blood cancer patients have achieved recovery
            </span>{" "}
            <span className="font-normal">
              through our methods. Many of them came to us after exhausting all
              other medical options that left them weaker and without guaranteed
              results. Today, they stand as living examples of hope and healing—
              fully satisfied and rejuvenated through the power of natural
              recovery.
            </span>
          </p>

          <button
            type="button"
            onClick={handleReadMore}
            className="bg-[#74C425] hover:bg-blue-800 text-white px-6 py-3 rounded font-bold transition-colors cursor-pointer"
          >
            READ MORE
          </button>
        </div>
      </div>
    </section>
  );
}
