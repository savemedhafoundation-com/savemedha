import React, { useState, useEffect } from "react";
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
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setDeviceType("mobile");
      else if (window.innerWidth <= 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white overflow-hidden">
      {/* LEFT TEXT PANEL */}
      <div
        className={`relative ${
          isMobile
            ? "w-full   text-center"
            : "lg:w-[45%] xl:w-[603px] py-10 px-18 text-left"
        } flex flex-col justify-top`}
      >
        {!isMobile && (
          <div className="absolute top-1 left-5 opacity-40">
            <DotPattern />
          </div>
        )}

        <div className="max-w-[603px]">
          <div className="inline-block bg-[#74C425] text-white px-1 py-1 rounded-sm mb-6 font-bold uppercase tracking-wide text-[25px]">
            Natural Immunotherapy
          </div>

          <h1 className="font-serif font-extrabold text-black leading-tight text-[2rem] md:text-[2.5rem] lg:text-[3rem]">
            Empowering lives,
          </h1>
          <h2 className="font-serif font-extrabold text-[#74C425] leading-tight text-[3rem] md:text-[2.2rem] lg:text-[2.5rem] mb-4">
            Saving futures
          </h2>

          <p className="font-sans text-[16px] md:text-[17px] font-semibold mb-6">
            Fighting to make a{" "}
            <span className="text-blue-600 font-bold">CANCER FREE WORLD</span>
          </p>

          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`bg-[#74C425] text-white px-10 py-3 font-bold text-xl tracking-wide rounded-sm transition-transform duration-300 ${
              isHovered ? "scale-105 shadow-lg" : "scale-100 shadow-md"
            }`}
          >
            DISCOVER
          </button>
        </div>

        {!isMobile && (
          <div className="absolute bottom-5 right-5 opacity-40">
            <DotPattern />
          </div>
        )}
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div
        className={`relative flex justify-center items-start gap-4 ${
          isMobile ? "w-full h-[100px] p-4" : "flex-2 p-2 h-[400px] "
        }`} // 👈 added for debugging
      >
        <img
          src={People}
          alt="People"
          className="object-cover  w-[45%] h-[70%] md:h-[100%]"
        />
        <img
          src={Earth}
          alt="Earth"
          className="object-contain w-[45%] h-[70%] md:h-[100%]"
        />
        {!isMobile && (
          <div className="absolute bottom-5 right-5 opacity-40">
            <DotPattern />
          </div>
        )}
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
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold relative inline-block">
           <span  className="relative">OUR </span>  
           
             <div className="absolute bottom-[-10px] left-0 w-20 h-1 bg-[#74C425]"></div>
           <span className="text-[#74C425]">SERVICES</span>
          </h2>
         
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-50"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Description - appears only on hover */}
               <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out px-4">
  <p className="text-sm text-white bg-[#A51111]/40 backdrop-blur-sm px-3 py-2 rounded-md shadow-md text-center border border-[#A51111]/50">
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
