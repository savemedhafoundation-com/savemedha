import React, { useState } from "react";
import BodyMap from "./BodyMap";
import OrganModal from "./OrganModal";
import HeroBanner from "./HomePageBanner";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PatientStories from "./PatientStories";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import FemaleBodyMap from "../components/FemaleBodyMap";

// ✅ Combined Page
export default function HomePage({ onNavigate }) {
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [sex, selectedSex] = useState("male");
  console.log("selected organ", selectedOrgan);
  return (
    <>
      <div className="-mx-20">
        <HeroBanner />
      </div>
      <AboutSection onNavigate={onNavigate} />
      <ServicesSection onNavigate={onNavigate} />
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
      <div className="mt-16">
        <PatientStories />
      </div>
      <OrganModal organ={selectedOrgan} onClose={() => setSelectedOrgan(null)} />
    </>
  );
}
