import React from "react";
import VolunteerBanner from "./VolunteerBanner";
import SupportCauseImg from "../assets/Photo/BANNER (26).png";
import HandHoldingHeart from "../assets/Photo/Hand Holding Heart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const VolunteerAndSupportSection = ({ onNavigate }) => {
  return (
    <div className="w-full ">
      {/* Volunteer Section (unchanged) */}
      <VolunteerBanner />

      {/* Support Our Cause – Static Image */}
      <section className="relative py-25 sm:py-16 ">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-40px] bottom-[-150px] mt-4 -translate-x-[25px] sm:-translate-x-[220px]  -translate-y-75 sm:-translate-y-40 h-[100px] w-[100px] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px] bg-gradient-to-b from-[#74C425] to-[#385E12] z-0"
          style={{
            borderRadius: "50% 50% 0% 100% / 46% 43% 57% 54%",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-6">
          <div className="relative">
            <img
              src={SupportCauseImg}
              alt="Support Our Cause"
              className="w-full h-auto rounded-2xl "
            />

            <div className="mt-4 flex justify-center px-4 sm:px-0 sm:absolute sm:inset-x-0 sm:bottom-0 sm:left-20 sm:h-[100px] sm:mt-0">
              <button
                type="button"
                onClick={() =>
                  onNavigate?.("donate", { scrollTo: "donate-form" })
                }
                className="cursor-pointer bg-[#74C425] hover:bg-[#1118A6] text-white font-bold
             text-[12px] sm:text-[25px]
             w-[120px] sm:w-auto  -translate-y-6 sm:-translate-y-1
             px-15 sm:px-10 py-1.5 sm:py-4
             sm:rounded-[5px] transition-all
             inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 mx-auto text-center"
              >
                <FontAwesomeIcon
                  icon={faHandHoldingHeart}
                  aria-hidden="true"
                  className="h-6 w-6 sm:!hidden"
                />
                <img
                  src={HandHoldingHeart}
                  alt=""
                  aria-hidden="true"
                  className="hidden sm:block h-6 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 shrink-0 object-contain"
                />
                <span className="whitespace-nowrap">DONATE NOW</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerAndSupportSection;
