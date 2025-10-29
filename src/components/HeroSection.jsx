import React, { useState } from "react";
import Earth from "../assets/Photo/earth.png";
import People from "../assets/Photo/people.png";
import imageCancerCare from "../assets/Photo/5.jpg";
import imageHeartHealth from "../assets/Photo/3.jpg";
import imageKidneyRevival from "../assets/Photo/2.jpg";
import imageOtherHealth from "../assets/Photo/6.jpg";

// ✅ Small decorative 3x3 dot grid
const DotPattern = () => (
  <div
    style={{
      display: "flex",
      gap: "4px",
      paddingLeft: "52px",
      top: "12px",
      // 👈 for debugging
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
    <div className="flex flex-row w-full bg-white overflow-hidden">
      {/* LEFT TEXT PANEL */}
      <div className="relative w-[600px] pt-16 pl-14 text-left flex flex-col justify-start">
        <div className="absolute top-4 left-6 opacity-40">
          <DotPattern />
        </div>

        <div className="max-w-[603px]">
          <div className="inline-block bg-[#74C425] text-white px-1 py-1 rounded-sm mb-6 font-bold uppercase tracking-wide text-[25px]">
            Natural Immunotherapy
          </div>

          <h1 className="font-serif font-extrabold text-black leading-tight text-[3rem]">
            Empowering lives,
          </h1>
          <h2 className="font-serif font-extrabold text-[#74C425] leading-tight text-[2.5rem] mb-4">
            Saving futures
          </h2>

          <p className="font-sans text-[17px] font-semibold mb-6">
            Fighting to make a{" "}
            <span className="text-blue-600 font-bold">CANCER FREE WORLD</span>
          </p>

          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-[#74C425] hover:bg-[#1118A6] cursor-pointer text-white px-10 py-3 font-bold  text-xl tracking-wide rounded-sm transition-transform duration-300 ${
              isHovered ? "scale-105 shadow-lg" : "scale-100 shadow-md"
            }`}
          >
            DISCOVER
          </button>
        </div>

        <div className="absolute bottom-5 right-5 opacity-40">
          <DotPattern />
        </div>
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div className="relative flex flex-1 items-center justify-center gap-8 pl-8 pb-8">
        <img
          src={People}
          alt="People"
          className="object-cover  max-w-[420px]"
        />
        <img
          src={Earth}
          alt="Earth"
          className="object-contain  max-w-[460px] pl-4"
        />
        <div className="absolute bottom-5 right-5 opacity-40">
          <DotPattern />
        </div>
      </div>
    </div>
  );
};



const ServicesSection = () => {
  const services = [
    {
      title: "CANCER CARE",
      description:
        "We focus on managing abnormal cells—classified as high-protein and high-toxin cells—through dietary control and detox therapies. By regulating protein intake and cleansing the body naturally, we help restore balance and combat the growth of these cells effectively.",
      image: imageCancerCare,
      highlight: true,
    },
    {
      title: "HEART HEALTH",
      description:
        "Our heart health services focus on improving cardiovascular wellness through lifestyle changes, stress management, and targeted therapies to support optimal heart function.",
      image: imageHeartHealth,
    },
    {
      title: "KIDNEY REVIVAL",
      description:
        "We provide holistic approaches to support kidney function, including detoxification, dietary adjustments, and natural therapies to promote kidney health and recovery.",
      image: imageKidneyRevival,
    },
    {
      title: "OTHER HEALTH CARE",
      description:
        "Our comprehensive health care services address various conditions with personalized, natural, and integrative approaches to improve overall well-being.",
      image: imageOtherHealth,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold relative inline-block">
           <span  className="relative">OUR </span>  
           
             <div className="absolute bottom-[-10px] left-0 w-20 h-1 bg-[#74C425]"></div>
           <span className="text-[#74C425]">SERVICES</span>
          </h2>
         
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Description - appears only on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#A51111]/60 backdrop-blur-sm text-white px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <p className="text-sm leading-relaxed text-center">
                    {service.description}
                  </p>
                </div>


              </div>

              {/* Title - always visible */}
              <div className="p-4 text-center">
                <h3
                  className={`font-bold text-lg ${
                    service.highlight ? "text-red-600" : "text-black"
                  }`}
                >
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




// ✅ Combined Page
export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ServicesSection />
    </>
  );
}
