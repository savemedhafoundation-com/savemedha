import React, { useState } from "react";
import BodyMap from "./BodyMap";
import OrganModal from "./OrganModal";
import HeroBanner from "./HomePageBanner";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PatientStories from "./PatientStories";
import CancerTreatmentPage from "./CancerTreatmentPage";
import { FaMale, FaFemale } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import FemaleBodyMap from "../components/FemaleBodyMap";
import { treatmentCategories } from "../data/organs";

//   {
//     id: "cancer",
//     label: "Cancer",
//     items: [
//       "Blood Cancer",
//       "Bone Cancer",
//       "Brain Cancer",
//       "Breast Cancer",
//       "Cervix Cancer",
//       "Colon Cancer",
//       "Eye Cancer",
//       "Gall Bladder",
//       "Kidney Cancer",
//       "Liver Cancer",
//       "Lungs Cancer",
//       "Oral Cancer",
//       "Pancreas",
//       "Prostate Cancer",
//       "Skin Cancer",
//       "Stomach Cancer",
//       "Throat Cancer",
//       "Thyroid Cancer",
//       "Tongue Cancer",
//     ],
//   },
//   {
//     id: "thalassemia",
//     label: "Thalassemia",
//     items: ["Thalassemia Major", "Thalassemia Minor"],
//   },
//   { id: "stone", label: "Stone", items: ["Kidney Stone", "Gall Stone"] },
//   { id: "general", label: "General", items: ["Diabetes", "Hypertension"] },
//   { id: "tumor", label: "Tumor", items: ["Benign Tumor", "Malignant Tumor"] },
//   {
//     id: "infertility",
//     label: "Infertility",
//     items: ["Male Infertility", "Female Infertility"],
//   },
//   { id: "nerve", label: "Nerve", items: ["Neural Disorders", "Spine Care"] },
// ];

// Combined Page
export default function HomePage({ onNavigate }) {
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [sex, selectedSex] = useState("male");
  const [openCategory, setOpenCategory] = useState("thalassemia");

  const toggleCategory = (id) => {
    setOpenCategory((prev) => (prev === id ? "" : id));
  };

  return (
    <>
      <div className="-mx-4 sm:-mx-6 lg:-mx-20">
        <HeroBanner showShadows={false} />
      </div>
      <AboutSection onNavigate={onNavigate} />
      <ServicesSection onNavigate={onNavigate} />
      <section className="py-16">
	        <div className="w-full px-4 sm:px-6">
	          <div className="text-center mb-10">
	            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
	              EXPLORE <span className="text-[#74C425]">THE BODY MAP</span>
	            </h2>
	            <p className="text-gray-600 mt-3">
	              Click on an organ to learn how Natural Immunotherapy supports it.
	            </p>
	            <p className="text-gray-900 mt-1 font-semibold">
	              Click to Explore More:
	            </p>
	          </div>
	        </div>

	        <div className="sm:-mx-6 md:-mx-20">
	          <div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-stretch sm:items-start relative overflow-visible">
            {/* Treatment Categories */}
            <div className="hidden md:block w-full lg:max-w-[10px] xl:max-w-[280px] absolute top-40 left-40 z-30">
              <div className="bg-[#fcfcfc] p-2 rounded-sm">
                <div className="bg-[#f1f6e6] px-4 py-1 rounded-sm">
                  <h3 className="text-xl font-semibold text-[#30590d] uppercase tracking-wide">
                    Treatment Categories:
                  </h3>
                </div>
                <div className="mt-1 space-y-">
                  {treatmentCategories.map((category) => {
                    const isOpen = openCategory === category.id;
                    return (
                      <div
                        key={category.id}
                        className="bg-white rounded-sm"
                      >
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#1f310d]"
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.label}
                          {isOpen ? (
                            <FiChevronUp className="text-[#1f310d]" />
                          ) : (
                            <FiChevronDown className="text-[#1f310d]" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 py-3 max-h-[150px] overflow-y-auto">
                            <div className="space-y-2">
                              {category.items.map((item) => (
                                <p
                                  key={item}
                                  className="text-sm text-[#5ca110] font-medium"
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Body Map */}
            <div className="flex-1 relative flex justify-center items-center">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-10 z-20">
                {/* Male Selector */}
                <div
                 
                  onClick={() => selectedSex("male")}
                >
                  <FaMale
                    size={50}
                    className={`transition-colors duration-300 
        ${
          sex === "male"
            ? "text-[#ffff] "
            : "text-[#9AFF34]"
        }
      `}
                  />
                  <span
                    className={`mt-1 font-semibold transition-colors duration-300
        ${
          sex === "male"
            ? "text-[#1f310d]"
            : "text-[#1f310d]"
        }
      `}
                  >
                    Male
                  </span>
                </div>

                {/* Female Selector */}
                <div
                  onClick={() => selectedSex("female")}
                >
                  <FaFemale
                    size={50}
                    className={`transition-colors duration-300 
        ${
          sex === "female"
            ? "text-[#ffff]"
            : "text-[#9AFF34] group-hover:text-[#74C425]"
        }
      `}
                  />
                  <span
                    className={`mt-1 font-semibold transition-colors duration-300
        ${
          sex === "female"
            ? "text-[#1f310d]"
            : "text-[#1f310d]/60 group-hover:text-[#1f310d]"
        }
      `}
                  >
                    Female
                  </span>
                </div>
              </div>

              <div className="w-full flex justify-center items-center">
                {sex === "male" ? (
                  <BodyMap onOrganSelect={setSelectedOrgan} />
                ) : (
                  <FemaleBodyMap onOrganSelect={setSelectedOrgan} />
                )}
              </div>
            </div>




          </div>
        </div>
      </section>
      <div className="mt-16">
        <PatientStories />
      </div>
      <div className="mt-6 sm:mt-16">
        <CancerTreatmentPage onNavigate={onNavigate} />
      </div>
      <OrganModal
        organ={selectedOrgan}
        onClose={() => setSelectedOrgan(null)}
      />
    </>
  );
}
