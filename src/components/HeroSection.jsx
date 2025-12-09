import React, { useState } from "react";
import Earth from "../assets/Photo/earth.png";
import People from "../assets/Photo/people.png";
import imageCancerCare from "../assets/Photo/5.jpg";
import imageHeartHealth from "../assets/Photo/3.jpg";
import imageKidneyRevival from "../assets/Photo/2.jpg";
import imageOtherHealth from "../assets/Photo/6.jpg";
import BodyMap from "./BodyMap";
import OrganModal from "./OrganModal";
import FemaleBodyMap from "./FemaleBodyMap";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

// ✅ Small decorative 3x3 dot grid
const DotPattern = () => (
  <div
    style={{
      display: "flex",
      gap: "4px",
      paddingLeft: "0px",
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
    <div className="flex flex-row w-full bg-[#ffffff] overflow-hidden">
      {/* LEFT TEXT PANEL */}
      <div className="relative w-[700px] pt-16 text-left flex flex-col justify-start">
        <div className="absolute top-4 left-2 opacity-60">
          <DotPattern />
        </div>

        <div className="max-w-[603px]">
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
            <span className="text-blue-600 font-bold text-[20px]">
              CANCER FREE WORLD
            </span>
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

      {/* RIGHT IMAGE PANEL */}
      <div className="relative flex flex-1 items-center justify-center gap-2 pl-8 pb-8 left-24">
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
      // highlight: true,
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
    <section className="py-16 bg-[#ffffff]">
      <div className="w-full">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold relative inline-block">
            <span className="relative">OUR </span>

            <div className="absolute bottom-[-10px] left-0 w-20 h-1 bg-[#74C425]"></div>
            <span className="text-[#74C425]">SERVICES</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="min-h-[400px] group relative overflow-hidden border border-gray-200 bg-white shadow-[5px_4px_4px_0px_#215C0740] hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 object-cover transform group-hover:scale-100  transition-transform duration-500"
                />

                {/* Description - appears only on hover */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none">
                  <div className="absolute top-4 bottom-0 left-3 right-3 origin-bottom scale-y-0 group-hover:scale-y-100  bg-[#A51111]/60 backdrop-blur-sm transition-transform duration-500 ease-out" />
                  <div className="absolute top-4 bottom-0 left-3 right-3 flex items-center justify-center px-6 py-4   shadow-md">
                    <p className="text-sm text-white text-center">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title - always visible */}
              <div className="p-4 text-center hover:text-red-600 transition-colors duration-300">
                <h3 className={`font-bold text-lg`}>{service.title}</h3>
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
  const [sex, selectedSex] = useState("male");
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  console.log("selected organ", selectedOrgan);
  return (
    <>
      <HeroBanner />
      <ServicesSection />
      <section className="py-16">
        <div className="w-full px-0 sm:px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore the Body Map
            </h2>
            <p className="text-gray-600 mt-3">
              Hover to see focus and click an organ to learn how Natural
              Immunotherapy supports it.
            </p>
          </div>

          <div className="w-full flex justify-center items-center relative">
            {/* SEX SELECTOR — placed INSIDE the body map container */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-10 z-20">
              <p
                className="p-5 bg-[#3D6613] rounded-md cursor-pointer flex flex-col justify-center items-center"
                onClick={() => selectedSex("male")}
              >
                <FaMale size={50} style={{ color: "#9AFF34" }} />
                <span>Male</span>
              </p>

              <p
                className="p-5 bg-[#3D6613] rounded-md cursor-pointer flex flex-col justify-center items-center"
                onClick={() => selectedSex("female")}
              >
                <FaFemale size={50} style={{ color: "#9AFF34" }} />
                <span>Female</span>
              </p>
            </div>

            {/* BODY MAP */}
            <div className="w-full flex justify-center items-center">
              {sex === "male" ? (
                <BodyMap onOrganSelect={setSelectedOrgan} />
              ) : (
                <FemaleBodyMap onOrganSelect={setSelectedOrgan} />
              )}
            </div>
          </div>
        </div>
      </section>
      <OrganModal
        organ={selectedOrgan}
        onClose={() => setSelectedOrgan(null)}
      />
    </>
  );
}
