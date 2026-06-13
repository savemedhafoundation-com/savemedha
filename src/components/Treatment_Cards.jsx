import React, { useState } from "react";
import CancerCareImg from "../assets/homepageimage/Rectangle 122.png";
import KidneyCareImg from "../assets/homepageimage/Rectangle 122 (1).png";
import ImmunityCareImg from "../assets/homepageimage/Rectangle 122 (2).png";
import DiabeticsCareImg from "../assets/homepageimage/Rectangle 122 (3).png";
import ConstipationCareImg from "../assets/homepageimage/Rectangle 122 (4).png";
import SkinCareImg from "../assets/homepageimage/Rectangle 122 (5).png";
const GENITAL_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_200/v1770266154/GENITAL_zngpaj.png";
const HAIR_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_200/v1770266154/HAIR_mfmdca.png";
const INDIGESTION_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_200/v1770266155/INDIGESTION_lblubd.png";
const OTHER_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_200/v1770266159/OTHER_xaekqs.png";
const SPINAL_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_200/v1770266163/SPINAL_g4itqj.png";
const THALASSEMIA_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_200/v1770266163/THALASSEMIA_lkc840.png";
const VITILIGO_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_200/v1770266166/VITILIGO_vkp4hr.png";

const CARD_IMAGE =
  "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80";

const baseImages = {
  cancer: KidneyCareImg,
  kidney: CancerCareImg,
  nerve: ImmunityCareImg,
  diabetics: DiabeticsCareImg,
  constipation: ConstipationCareImg,
  skin: SkinCareImg,
  genital: GENITAL_URL,
  spinal: SPINAL_URL,
  vitiligo: VITILIGO_URL,
  thalassemia: THALASSEMIA_URL,
  hair: HAIR_URL,
  indigestion: INDIGESTION_URL,
  other: OTHER_URL,
};

const TREATMENT_CARDS = [
  {
    id: 1,
    key: "cancer",
    title: "CANCER TREATMENT",
    image: baseImages.cancer,
    text: "A holistic, science-backed approach to support immune response.",
  },
  {
    id: 2,
    key: "kidney",
    title: "KIDNEY TREATMENT",
    image: baseImages.kidney,
    text: "Natural support focused on urinary wellness and kidney function.",
  },
  {
    id: 3,
    key: "nerve",
    title: "NERVE TREATMENT",
    image: baseImages.nerve,
    text: "Nerve and spine wellness through structured natural care.",
  },
  {
    id: 4,
    key: "diabetics",
    title: "DIABETICS TREATMENT",
    image: baseImages.diabetics,
    text: "Support for better metabolic balance and everyday wellness.",
  },
  {
    id: 5,
    key: "constipation",
    title: "CONSTIPATION TREATMENT",
    image: baseImages.constipation,
    text: "Natural digestive care for improved comfort and bowel wellness.",
  },
  {
    id: 6,
    key: "skin",
    title: "SKIN TREATMENT",
    image: baseImages.skin,
    text: "Natural skin wellness support for healthier skin function.",
  },
  {
    id: 7,
    key: "genital",
    title: "GENITAL TREATMENT",
    image: baseImages.genital,
  },
  {
    id: 8,
    key: "spinal",
    title: "SPINAL TREATMENT",
    image: baseImages.spinal,
  },
  {
    id: 9,
    key: "vitiligo",
    title: "VITILIGO TREATMENT",
    image: baseImages.vitiligo,
  },
  {
    id: 10,
    key: "thalassemia",
    title: "THALASSEMIA TREATMENT",
    image: baseImages.thalassemia,
  },
  {
    id: 11,
    key: "diabetics",
    title: "DIABETICS TREATMENT",
    image: baseImages.diabetics,
  },
  { id: 12, key: "skin", title: "SKIN TREATMENT", image: baseImages.skin },
  { id: 13, key: "hair", title: "HAIR TREATMENT", image: baseImages.hair },
  {
    id: 14,
    key: "constipation",
    title: "CONSTIPATION TREATMENT",
    image: baseImages.constipation,
  },
  {
    id: 15,
    key: "indigestion",
    title: "INDIGESTION TREATMENT",
    image: baseImages.indigestion,
  },
  { id: 16, key: "other", title: "OTHER TREATMENT", image: baseImages.other },
];

export default function TreatmentCards({
  onNavigate,
  onSelectCategory,
  selectedCategory,
}) {
  const [isExpandedOnMobile, setIsExpandedOnMobile] = useState(false);
  const [localSelectedCategory, setLocalSelectedCategory] = useState("cancer");
  const activeCategory = selectedCategory ?? localSelectedCategory;

  const handleSelect = (card) => {
    setLocalSelectedCategory(card.key);

    if (card.key && typeof onSelectCategory === "function") {
      onSelectCategory(card.key);
    }
  };

  return (
    <div className="relative mx-auto max-w-[1600px] bg-[#F8FDF6] py-0">
      <div className="text-center">
        <h3 className="text-[24px] font-black tracking-tight text-black sm:text-[30px]">
          Our Core Focus Areas
        </h3>
        <p className="mt-3 mx-auto max-w-[560px] text-[14px] font-medium leading-5 text-[#6b6b6b] sm:text-[17px]">
          Comprehensive approaches to wellness, bridging natural methods with clinical accountability.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-12 px-4 sm:grid-cols-2 lg:mx-auto lg:max-w-[980px] lg:grid-cols-3 lg:px-0">
        {TREATMENT_CARDS.slice(0, 6).map((card, index) => {
          const isSelected = activeCategory === card.key;
          const isHiddenOnMobile = !isExpandedOnMobile && index >= 6;
		
          return (
            <article
              key={card.id}
              className={`group flex min-h-[390px] flex-col overflow-hidden rounded-[14px] border bg-white shadow-[0_12px_28px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(17,70,39,0.16)] ${
                isSelected
                  ? "border-[#129808] ring-2 ring-[#129808]"
                  : "border-[#d1d5db]"
              } ${isHiddenOnMobile ? "hidden sm:flex" : ""}`}
            >
                  <div className="h-[230px] overflow-hidden bg-[#F8FDF6]">
                    <img
                      src={card.image || CARD_IMAGE}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
              <div
                className={`relative flex flex-1 flex-col items-start justify-between gap-3 px-6 py-5 text-left transition-colors ${
                  isSelected ? "bg-[#109306]" : "bg-white"
                }`}
              >
                      <div>
                <h4 className={`text-[14px] font-black uppercase leading-[1.15] tracking-wide ${
                        isSelected ? "text-white" : "text-[#102a1a]"
                      }`}>
                  {card.title}
                </h4>
                      <p className={`mt-2 text-[9px] font-semibold leading-[1.45] sm:text-[10px] ${
                        isSelected ? "text-white/90" : "text-[#334155]"
                      }`}>
                        {card.text}
                      </p>
                      </div>
		
                <button
                  type="button"
                  onClick={() => handleSelect(card)}
                  className={`inline-flex cursor-pointer items-center justify-center rounded-[7px] px-4 py-2 text-[10px] font-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14980f]/40 ${
                    isSelected
                      ? "bg-white text-[#109306] hover:bg-white/90"
                      : "bg-[#109306] text-white hover:bg-[#0c7f04]"
                  }`}
                  aria-pressed={isSelected}
                >
                  Learn More
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setIsExpandedOnMobile(true);
              onNavigate?.("treatment");
            }}
            className="inline-flex items-center justify-center rounded-[13px] bg-[#109306] px-10 py-3 text-[16px] font-black text-white shadow-[0_10px_22px_rgba(16,147,6,0.2)] transition hover:bg-[#0c7f04]"
          >
            See All
          </button>
      </div>
    </div>
  );
}
