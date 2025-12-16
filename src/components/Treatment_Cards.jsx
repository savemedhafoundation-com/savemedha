import React from "react";
import { GiReturnArrow } from "react-icons/gi";
import cancerImg from "../assets/treatmentpageasset/TREATMENT IMAGES/CANCER.png";
import constipationImg from "../assets/treatmentpageasset/TREATMENT IMAGES/Constipation.png";
import diabeticsImg from "../assets/treatmentpageasset/TREATMENT IMAGES/DIABETICS.png";
import genitalImg from "../assets/treatmentpageasset/TREATMENT IMAGES/GENITAL.png";
import hairImg from "../assets/treatmentpageasset/TREATMENT IMAGES/HAIR.png";
import heartImg from "../assets/treatmentpageasset/TREATMENT IMAGES/HEART.png";
import indigestionImg from "../assets/treatmentpageasset/TREATMENT IMAGES/INDIGESTION.png";
import kidneyImg from "../assets/treatmentpageasset/TREATMENT IMAGES/KIDNEY.png";
import liverImg from "../assets/treatmentpageasset/TREATMENT IMAGES/LIVER.png";
import nerveImg from "../assets/treatmentpageasset/TREATMENT IMAGES/NERVE.png";
import otherImg from "../assets/treatmentpageasset/TREATMENT IMAGES/OTHER.png";
import skinImg from "../assets/treatmentpageasset/TREATMENT IMAGES/SKIN.png";
import spinalImg from "../assets/treatmentpageasset/TREATMENT IMAGES/SPINAL.png";
import thalassemiaImg from "../assets/treatmentpageasset/TREATMENT IMAGES/THALASSEMIA.png";
import thyroidImg from "../assets/treatmentpageasset/TREATMENT IMAGES/THYROID.png";
import vitiligoImg from "../assets/treatmentpageasset/TREATMENT IMAGES/VITILIGO.png";

const CARD_IMAGE =
  "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80";

const baseImages = {
  cancer: cancerImg,
  kidney: kidneyImg,
  liver: liverImg,
  heart: heartImg,
  nerve: nerveImg,
  thyroid: thyroidImg,
  genital: genitalImg,
  spinal: spinalImg,
  vitiligo: vitiligoImg,
  thalassemia: thalassemiaImg,
  diabetics: diabeticsImg,
  skin: skinImg,
  hair: hairImg,
  constipation: constipationImg,
  indigestion: indigestionImg,
  other: otherImg,
};

const TREATMENT_CARDS = [
  { id: 1, key: "cancer", title: "CANCER TREATMENT", image: baseImages.cancer },
  { id: 2, key: "kidney", title: "KIDNEY TREATMENT", image: baseImages.kidney },
  { id: 3, key: "liver", title: "LIVER TREATMENT", image: baseImages.liver },
  { id: 4, key: "heart", title: "HEART TREATMENT", image: baseImages.heart },
  { id: 5, key: "nerve", title: "NERVE TREATMENT", image: baseImages.nerve },
  {
    id: 6,
    key: "thyroid",
    title: "THYROID TREATMENT",
    image: baseImages.thyroid,
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
  return (
    <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-[35px] font-robotocondensed font-bold text-[#1b3610] tracking-tight uppercase">
          OUR <span className="text-[#74C425]">SERVICES</span>
        </h3>
      </div>

      <div className="relative mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 lg:grid-rows-2 gap-3 sm:gap-4">
        {TREATMENT_CARDS.map((card) => {
          const isSelected = selectedCategory === card.key;

          return (
            <div
              key={card.id}
              className={`bg-white rounded-2xl shadow-[0_6px_12px_rgba(0,0,0,0.08)] overflow-hidden border flex flex-col transition-colors ${
                isSelected
                  ? "border-[#5cb624] ring-2 ring-[#5cb624]/30"
                  : "border-[#e6e6e6]"
              }`}
            >
              <div
                className="h-16 md:h-16 sm:h-16 lg:h-28 bg-cover bg-center"
                style={{ backgroundImage: `url('${card.image || CARD_IMAGE}')` }}
              />
              <div className="p-2 sm:p-2.5 text-center space-y-2 flex-1 flex flex-col">
                <p className="text-[10px] sm:text-[11px] font-semibold text-[#0f1c08] leading-tight uppercase">
                  {card.title}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (card.key && typeof onSelectCategory === "function") {
                      onSelectCategory(card.key);
                      return;
                    }

                    onNavigate?.("treatment-questions", { category: card.key });
                  }}
                  className={`mt-auto inline-flex items-center justify-center cursor-pointer gap-2 text-white text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded-full shadow transition-colors ${
                    isSelected
                      ? "bg-[#1118A5] hover:bg-[#0d128f]"
                      : "bg-[#5cb624] hover:bg-[#4b9c1f]"
                  }`}
                  aria-pressed={isSelected}
                >
                  LEARN MORE <GiReturnArrow />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
