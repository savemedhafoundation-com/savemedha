import React from "react";
import VolunteerBanner from "./VolunteerBanner";
import SupportCauseImg from "../assets/Photo/BANNER (26).png";
import HandHoldingHeart from "../assets/Photo/Hand Holding Heart.png";

const VolunteerAndSupportSection = () => {
  return (
    <div className="w-full ">
      {/* Volunteer Section (unchanged) */}
      <VolunteerBanner />

      {/* Support Our Cause – Static Image */}
      <section className="relative py-16 ">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-40px] bottom-[-150px] mt-4 -translate-x-[120px] -translate-y-1/2 h-[260px] w-[260px] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px] bg-gradient-to-b from-[#74C425] to-[#385E12] z-0"
          style={{
            borderRadius: "50% 50% 0% 100% / 46% 43% 57% 54%",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="relative">
            <img
              src={SupportCauseImg}
              alt="Support Our Cause"
              className="w-full h-auto rounded-2xl "
            />

            <div className="absolute inset-x-0 bottom-1 sm:left-20 h-[80px] flex justify-center">
              <button
                type="button"
                className="cursor-pointer bg-[#74C425] hover:bg-[#1118A6] text-white font-bold text-[18px] sm:text-[25px] px-5 sm:px-10 py-3 sm:py-4 rounded-[5px] shadow-xl transition-all inline-flex items-center justify-center gap-2 sm:gap-3 max-w-[calc(100vw-2rem)] sm:max-w-none"
              >
                <img
                  src={HandHoldingHeart}
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 shrink-0 object-contain object-center"
                />
                <span>DONATE NOW</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerAndSupportSection;
