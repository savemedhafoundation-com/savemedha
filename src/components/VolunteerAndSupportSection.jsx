import React from "react";
import Icon2 from "../assets/Photo/ICON 2.png";
import CharityJar from "../assets/Photo/CHARITY.jpg";
import Hands from "../assets/Photo/HANDS.png";
import Joined from "../assets/Photo/JOINED.png";
import Donate from "../assets/Photo/DONATE ICON.png";
import Joinus from "../assets/Photo/JOINUS.png";

const VolunteerAndSupportSection = () => {
  const cancerStats = [
    { type: "Blood Cancer", percentage: 96 },
    { type: "Lungs Cancer", percentage: 84 },
    { type: "Breast Cancer", percentage: 80 },
    { type: "Colon Cancer", percentage: 77 },
  ];

  const CircularProgress = ({ percentage }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const angle = (percentage / 100) * 270; // 270 degrees for semi-circle effect
    const strokeDashoffset = circumference - (angle / 360) * circumference;

    return (
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg
          className="transform -rotate-[135deg]"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#7CB342"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      {/* Volunteer Section */}
      <div className="relative bg-gray-50 py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Left background image: JOINED */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[42%]">
          <img src={Hands} alt="Joined" className="w-50% h-full object-cover" />
        </div>
        {/* Right background image: HANDS */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[42%]">
          <img
            src={Joined}
            alt="Hands"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Soft white gradients over images to improve text contrast */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-white to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Headings and copy (moved left as requested) */}
            <div className="relative z-20 flex flex-col items-center lg:col-span-2">
              <div className="text-center mb-6">
                <h1 className="font-black text-gray-900 mb-2 leading-tight uppercase tracking-tight text-[34px] md:text-[44px] lg:text-[56px] xl:text-[64px] 2xl:text-[72px] lg:whitespace-nowrap">
                  BECOME A VOLUNTEER!
                </h1>
                <h2 className="font-extrabold leading-tight text-[30px] md:text-[40px] lg:text-[48px] text-[#7CB342] mb-4">
                  JOIN OUR TEAM
                </h2>
                <p className="text-gray-800 text-base mb-1">
                  We don't fight the body, we empower it.{" "}
                  <span
                    className="italic font-semibold"
                    style={{ color: "#7CB342" }}
                  >
                    Natural Immunotherapy
                  </span>
                </p>
                <p className="text-gray-800 text-base mb-6">
                  that helps the body to defeat cancer from within.
                </p>
                <div className="flex justify-center mb-4">
                  {" "}
                  {/* 👈 changed from justify-center */}
                  <img
                    src={Joinus}
                    alt="JOIN US"
                    className="w-full max-w-[200px] h-auto  mt-2"
                    style={{
                      filter: "drop-shadow(3px 3px 0px rgba(255,255,255,0.8))",
                    }}
                  />
                </div>
                <button className="mt-2 inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-3 rounded transition-all hover:opacity-90 mx-auto bg-[#7CB342] hover:bg-[#1118A6] cursor-pointer">
                  JOIN NOW
                  <span className="inline-block w-0 h-0 border-l-8 border-l-white border-y-8 border-y-transparent" />
                </button>
              </div>
            </div>

            {/* Right Side now acts as spacer (images are absolutely positioned) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Support Our Cause Section */}
      <div className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Title and Statistics */}
            <div>
              {/* Green Line Accent */}
              <div
                className="w-12 h-1 mb-4"
                style={{ backgroundColor: "#7CB342" }}
              ></div>

              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-3 leading-tight">
                SUPPORT OUR CAUSE
              </h2>
              <p
                className="text-lg font-bold tracking-widest mb-8"
                style={{ color: "#7CB342" }}
              >
                WE FIGHT AGAINST CANCER
              </p>

              {/* Cancer Statistics Bar with icon outside on the right */}
              <div className="flex items-center gap-6 mb-6">
                {/* Percentage bar */}
                <div className="bg-black rounded-lg p-5 md:p-6 inline-block flex-1">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {cancerStats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-white"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#1f2937] flex items-center justify-center ring-2 ring-[#7CB342]">
                          <span className="font-bold text-lg">
                            {stat.percentage}%
                          </span>
                        </div>
                        <p className="text-xs mt-2 text-center text-gray-200 leading-tight">
                          {stat.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Icon outside the bar */}
                <div className="hidden sm:flex items-center justify-center pt-15 w-30 h-30 rounded-full bg-white ">
                  <img
                    src={Icon2}
                    alt="Healthcare icon"
                    className="w-30 h-30 object-contain"
                  />
                </div>
              </div>

              {/* Description Text */}
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Fighting cancer the natural way — through{" "}
                <span
                  className="italic font-semibold"
                  style={{ color: "#7CB342" }}
                >
                  Natural Immunotherapy
                </span>{" "}
                that rebuilds your body's defense and restores lasting health.
              </p>

              {/* Optional small spacer under text */}
              <div className="h-2" />
            </div>

            {/* Right Side - Charity Jar and Donate */}
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="rounded-lg overflow-hidden shadow">
                <img
                  src={CharityJar}
                  alt="Charity jar with coins"
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="w-36 h-36 rounded-full flex items-center justify-center shadow-xl bg-[#7CB342]">
                  <img
                    src={Donate}
                    alt="Donate icon"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <button className="bg-[#74C425] hover:bg-[#1118A6] text-white font-bold text-xl px-8 py-3 rounded shadow cursor-pointer ">
                  DONATE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAndSupportSection;
