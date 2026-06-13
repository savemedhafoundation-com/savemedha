import React, { Suspense, lazy, useState } from "react";
import BodyMap from "./BodyMap";
import HeroBanner from "./HomePageBanner";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import RenderOnView from "./RenderOnView";
import { FaMale, FaFemale } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import FemaleBodyMap from "../components/FemaleBodyMap";
import { treatmentCategories } from "../data/organs";

const PatientStories = lazy(() => import("./PatientStories"));
const CancerTreatmentPage = lazy(() => import("./CancerTreatmentPage"));

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
      <div className="-mx-4 sm:-mx-20 lg:-mx-20">
        <HeroBanner showShadows={false} />
      </div>
      <AboutSection onNavigate={onNavigate} />
      <ServicesSection onNavigate={onNavigate} />
      <RenderOnView
        rootMargin="250px 0px"
        fallback={<div className="min-h-[680px]" aria-hidden="true" />}
      >
      <section className="home-section home-bodymap-section relative -mx-4 overflow-hidden bg-[#052107] text-white sm:-mx-6 md:-mx-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(61,255,48,0.25),transparent_31%),radial-gradient(circle_at_18%_12%,rgba(99,255,64,0.16),transparent_26%),linear-gradient(180deg,rgba(3,28,8,0.96),rgba(0,31,10,1))]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(109,255,66,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(109,255,66,0.14)_1px,transparent_1px)] [background-size:44px_44px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-28 bg-[radial-gradient(circle,rgba(126,255,72,0.25)_1px,transparent_2px)] [background-size:48px_24px] opacity-55" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-[28px] font-black leading-tight tracking-tight text-white sm:text-[34px]">
              Explore the <span className="text-[#7cff4b]">body map</span>
            </h2>
            <p className="home-heading-gap mx-auto max-w-[650px] text-[13px] font-medium leading-5 text-white/85 sm:text-[15px]">
              Select an organ from the categories, or use the body map itself to learn about personalized Natural Immunotherapy intervention.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[13px] font-semibold">
              <span>Gender Selection :</span>
              <div className="flex rounded-full bg-white p-1 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
                <button
                  type="button"
                  onClick={() => selectedSex("male")}
                  className={`grid h-7 w-9 place-items-center rounded-full transition-all duration-300 ${
                    sex === "male"
                      ? "bg-[#139b08] text-white"
                      : "text-[#124318] hover:bg-[#e9f9e8]"
                  }`}
                  aria-label="Show male body map"
                >
                  <FaMale size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => selectedSex("female")}
                  className={`grid h-7 w-9 place-items-center rounded-full transition-all duration-300 ${
                    sex === "female"
                      ? "bg-[#139b08] text-white"
                      : "text-[#124318] hover:bg-[#e9f9e8]"
                  }`}
                  aria-label="Show female body map"
                >
                  <FaFemale size={15} />
                </button>
              </div>
              <span className="text-white/90">Click to view your map</span>
            </div>
          </div>

          <div className="home-content-gap home-card-grid relative grid min-h-[660px] grid-cols-1 items-end lg:grid-cols-[235px_minmax(430px,1fr)_300px]">
            {/* Treatment Categories */}
            <div className="z-30 hidden self-center lg:block">
              <div className="rounded-[8px] border border-[#74d861]/35 bg-white p-3 shadow-[0_22px_55px_rgba(0,0,0,0.32)]">
                <h3 className="rounded-[5px] bg-[#0f8f08] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                  Treatment Categories
                </h3>
                <div className="mt-2 space-y-1">
                  {treatmentCategories.map((category) => {
                    const isOpen = openCategory === category.id;
                    return (
                      <div
                        key={category.id}
                        className="overflow-hidden rounded-[5px] border border-[#cdebc8] bg-[#f9fff8]"
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[10px] font-black uppercase tracking-wide text-[#123e1f]"
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
                          <div className="max-h-[235px] overflow-y-auto px-3 py-2">
                            <div className="space-y-1">
                              {category.items.map((item) => (
                                <p
                                  key={item}
                                  className="text-[10px] font-semibold leading-4 text-[#304235]"
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
              <button
                type="button"
                onClick={() => onNavigate?.("treatment")}
                className="mt-8 rounded-[5px] bg-[#14980f] px-5 py-2 text-[11px] font-black text-white shadow-[0_14px_28px_rgba(20,152,15,0.3)] transition hover:bg-[#0f7d0b]"
              >
                Watch Now
              </button>
            </div>

            {/* Body Map */}
            <div className="relative z-20 flex w-full items-end justify-center lg:col-start-2">
              <div className="absolute left-2 top-[10%] hidden items-center gap-3 lg:flex">
                <div className="h-[86px] w-[86px] overflow-hidden rounded-full border border-[#8eff78]/50 bg-white/8 p-2 shadow-[0_0_32px_rgba(109,255,66,0.25)]">
                  <img src="/4.png" alt="" className="h-full w-full object-contain" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.12em] text-white">Lungs</span>
              </div>
              <div className="absolute right-0 top-[3%] hidden items-center gap-3 lg:flex">
                <div className="h-[92px] w-[92px] overflow-hidden rounded-full border border-[#8eff78]/50 bg-white/8 p-2 shadow-[0_0_32px_rgba(109,255,66,0.25)]">
                  <img src="/Brain.png" alt="" className="h-full w-full object-contain" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.12em] text-white">Brain Cancer</span>
              </div>
              <div className="w-full max-w-[610px]">
                {sex === "male" ? (
                  <BodyMap onOrganSelect={setSelectedOrgan} />
                ) : (
                  <FemaleBodyMap onOrganSelect={setSelectedOrgan} />
                )}
              </div>
            </div>

            <div className="z-30 self-end pb-10 lg:pb-16">
              {selectedOrgan ? (
                <div className="mx-auto max-w-[340px] rounded-[8px] border border-[#5be24a]/20 bg-[#073a12]/88 p-4 shadow-[0_22px_55px_rgba(0,0,0,0.35)] backdrop-blur-md">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[13px] font-black uppercase tracking-wide text-white">
                      {selectedOrgan.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedOrgan(null)}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/12 text-sm font-black text-white transition hover:bg-white/22"
                      aria-label="Close organ details"
                    >
                      x
                    </button>
                  </div>
                  <p className="mt-2 rounded-[5px] bg-white px-3 py-2 text-[10px] font-semibold leading-4 text-[#22352a]">
                    {selectedOrgan.function}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-[10px] leading-4 text-white/82">
                    <p>
                      <span className="block font-black text-[#7cff4b]">
                        Care Path
                      </span>
                      {selectedOrgan.nit_reason}
                    </p>
                    <p>
                      <span className="block font-black text-[#7cff4b]">
                        Support
                      </span>
                      {selectedOrgan.nit_support}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mx-auto hidden max-w-[300px] rounded-[8px] border border-white/10 bg-white/8 p-4 text-center text-[11px] font-semibold text-white/70 backdrop-blur-md lg:block">
                  Click an organ image to view details.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </RenderOnView>
      <RenderOnView
        rootMargin="350px 0px"
        fallback={<div className="min-h-[300px]" aria-hidden="true" />}
      >
        <div>
          <Suspense fallback={<div className="min-h-[300px]" aria-hidden="true" />}>
            <PatientStories />
          </Suspense>
        </div>
      </RenderOnView>
      <RenderOnView
        rootMargin="450px 0px"
        fallback={<div className="min-h-[320px]" aria-hidden="true" />}
      >
        <div>
          <Suspense fallback={<div className="min-h-[320px]" aria-hidden="true" />}>
            <CancerTreatmentPage onNavigate={onNavigate} />
          </Suspense>
        </div>
      </RenderOnView>
    </>
  );
}
