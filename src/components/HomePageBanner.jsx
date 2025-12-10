import React, { useState } from "react";
import People from "../assets/homepageassets/homepagebannner.png";

const DotPattern = () => (
  <div
    style={{
      display: "flex",
      gap: "4px",
      paddingLeft: "0px",
      top: "12px",
    }}
  >
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        {[...Array(6)].map((_, j) => (
          <div
            key={j}
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              backgroundColor: "#74C425",
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

const HeroBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-row w-full  min-h-[620px] h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${People})` }}
    >
      <div className="absolute inset-0 " />
      {/* LEFT TEXT PANEL */}
      <div className="relative z-10 w-full pt-16 text-left flex flex-col justify-start">
        <div className="absolute top-4 left-25 opacity-60">
          <DotPattern />
        </div>

        <div className="w-full px-25">
          <div className="inline-block bg-[#74C425] px-[25px] py-[5px] text-white rounded-sm mb-6 font-bold-200px italic uppercase tracking-wide text-[18px] ">
            Natural Immunotherapy
          </div>

          <h1 className="font-serif font-extrabold text-black leading-tight text-[57px]">
            Empowering lives,
          </h1>
          <h2 className="font-serif font-extrabold text-[#74C425] leading-tight text-[55px] mb-4">
            Saving futures
          </h2>

          <p className="font-sans text-[20px] font-semibold mb-6">
            Fighting to make a{" "}
            <span className="text-blue-600 font-bold text-[20px]">CANCER FREE WORLD</span>
          </p>

          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-[#74C425] hover:bg-[#1118A6] cursor-pointer text-white px-10 py-3 font-medium OpenSans text-xl tracking-wide rounded-sm transition-transform duration-500 ${
              isHovered ? "shadow-lg" : "shadow-md"
            }`}
          >
            DISCOVER
          </button>
        </div>

        
      </div>
      <div className="flex-1" />
    </div>
  );
};
export default HeroBanner;
