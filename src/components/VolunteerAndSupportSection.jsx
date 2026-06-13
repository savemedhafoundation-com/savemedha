import HandHoldingHeart from '../assets/Photo/Hand Holding Heart.png';
import SupportOne from '../assets/SMF BY BRATIN/MedhaClinic 3 1.png';
import SupportTwo from '../assets/SMF BY BRATIN/MedhaClinic 6 1.png';
import SupportThree from '../assets/SMF BY BRATIN/Tracking Progress Through Clinical Monitoring - generate a image on this topic 1.png';
import VolunteerBanner from './VolunteerBanner';

const supportImages = [SupportOne, SupportTwo, SupportThree];

const VolunteerAndSupportSection = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <VolunteerBanner />

      <section className="home-section relative bg-[#F8FDF6]">
        <div className="home-container max-w-[1800px] text-center">
          <h2 className="text-2xl font-black text-[#111827]">
            Support Our Cause
          </h2>

          <div className="home-content-gap home-card-grid mx-auto grid max-w-[1800px] grid-cols-3">
            {supportImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Support cause ${index + 1}`}
                className="h-[168px] w-full rounded-xl bg-white object-contain shadow-[0_10px_24px_rgba(15,23,42,0.12)] sm:h-[320px]"
                loading="lazy"
              />
            ))}
          </div>

          <p className="home-content-gap mx-auto max-w-3xl text-base font-semibold leading-7 text-[#111827]">
            We don't fight the body, we empower it.
            <span className="block text-[#2D7D20]">
              Natural Immunotherapy helps the body defeat cancer from within.
            </span>
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate?.("donate", { scrollTo: "donate-form" })}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#74C425] px-7 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(116,196,37,0.24)] transition hover:bg-[#2D7D20]"
            >
              <img
                src={HandHoldingHeart}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 shrink-0 object-contain"
              />
              <span className="whitespace-nowrap">DONATE NOW</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerAndSupportSection;
