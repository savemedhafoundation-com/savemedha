import { memo, useCallback } from "react";
import { HeartPulse, Leaf, ShieldCheck } from "lucide-react";
import FoundationImage from "../assets/SMF BY BRATIN/Group 9660.png";

const featureItems = [
  {
    icon: Leaf,
    title: "Ethical Medical Awareness",
    text: "Promoting transparency and ethical communication in oncology-related care.",
  },
  {
    icon: ShieldCheck,
    title: "Community Health Education",
    text: "Creating awareness about Natural Immunotherapy and preventive wellness.",
  },
  {
    icon: HeartPulse,
    title: "Evidence-based Patient Support",
    text: "Helping patients understand the next step with humane, structured guidance.",
  },
];

function AboutSection({ onNavigate }) {
  const handleReadMore = useCallback(() => {
    if (typeof onNavigate === "function") {
      onNavigate("about");
    }
  }, [onNavigate]);

  return (
    <section className="home-section bg-[#F8FDF6]">
      <div className="home-container max-w-[1710px]">
        <div className="home-card-grid mx-auto grid max-w-[1180px] items-center md:grid-cols-[400px_1fr]">
          <div className="relative mx-auto h-[292px] w-full max-w-[292px]">
            <img
              src={FoundationImage}
              alt="Hands holding a heart"
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="md:pb-8">
            <h2 className="text-[22px] font-black leading-[1.12] text-[#050505] sm:text-[24px]">
              About Save Medha
              <span className="block">Foundation</span>
            </h2>

            <p className="mt-4 max-w-[675px] text-[13px] font-medium leading-[1.7] text-[#2c3135] sm:text-[14px]">
              <span className="font-semibold">
                Save Medha Foundation is a dedicated NGO committed to fighting
                cancer through Natural Immunotherapy
              </span>{" "}
              a holistic, science-backed approach that empowers the body's own
              immune system to combat cancer naturally. We have broken away from
              conventional medical procedures to establish an innovative and
              effective Natural Immunotherapy treatment system for our patients.
            </p>

            <p className="mt-3 max-w-[675px] text-[13px] font-medium leading-[1.7] text-[#2c3135] sm:text-[14px]">
              Remarkably,{" "}
              <span className="font-semibold">
                over 90% of our blood cancer patients have achieved recovery
              </span>{" "}
              through our methods. Today, they stand as living examples of hope
              and healing through the power of natural recovery.
            </p>

            <button
              type="button"
              onClick={handleReadMore}
              className="mt-4 rounded-[6px] bg-[#159b17] px-6 py-2.5 text-[11px] font-black text-white shadow-[0_10px_22px_rgba(21,155,23,0.22)] transition hover:bg-[#0f7c12] cursor-pointer"
            >
              Read More
            </button>
          </div>
        </div>

        <div className="home-content-gap mx-auto grid max-w-[1180px] md:grid-cols-[400px_1fr]">
          <div className="home-card-grid grid md:pl-[54px]">
            {featureItems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dff8df] text-[#159b17]">
                  <Icon size={16} strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[13px] font-black text-[#111827]">{title}</h3>
                  <p className="mt-1 max-w-[520px] text-[13px] font-medium leading-[1.65] text-[#2c3135] sm:text-[14px] md:whitespace-nowrap">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);
