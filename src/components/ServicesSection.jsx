import React from "react";
import ServiceImg from "../assets/treatment page  asset/Group 9199.png";

const services = [
  "Cancer Treatment",
  "Kidney Treatment",
  "Liver Treatment",
  "Heart Treatment",
  "Nerve Treatment",
  "Thyroid Treatment",
  "Genital Treatment",
  "Spinal Treatment",
  "Vitiligo Treatment",
  "Thalassemia Treatment",
  "Diabetics Treatment",
  "Skin Treatment",
  "Hair Treatment",
  "Other Treatment",
];

export default function ServicesSection({ onNavigate }) {
  const handleLearnMore = () => {
    if (typeof onNavigate === "function") {
      onNavigate("treatment");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            <span className="text-black">OUR </span>
            <span className="text-[#6bc12f]">SERVICES</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {services.map((title) => (
            <div key={title} className="w-full max-w-[220px]">
              <div className="overflow-hidden rounded-lg shadow-md border border-gray-100">
                <img
                  src={ServiceImg}
                  alt={title}
                  className="w-full h-[140px] object-cover"
                />
              </div>
              <div className="bg-[#6bc12f] text-white text-center px-4 py-4 rounded-b-2xl rounded-t-2xl -mt-4 shadow-md">
                <p className="font-semibold uppercase leading-tight text-sm">
                  {title}
                </p>
                <button
                  type="button"
                  onClick={handleLearnMore}
                  className="mt-3 inline-block bg-white text-[#6bc12f] font-semibold text-xs px-4 py-2 rounded-full shadow hover:shadow-md transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
