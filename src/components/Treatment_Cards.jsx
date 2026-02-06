import React, { useState } from "react";
const CANCER_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266153/CANCER_xmjtjj.png";
const CONSTIPATION_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266153/Constipation_dmizbj.png";
const DIABETICS_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266154/DIABETICS_bbhnpl.png";
const GENITAL_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266154/GENITAL_zngpaj.png";
const HAIR_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266154/HAIR_mfmdca.png";
const HEART_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266154/HEART_dgtoqd.png";
const INDIGESTION_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266155/INDIGESTION_lblubd.png";
const KIDNEY_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266157/KIDNEY_t9qnrc.png";
const LIVER_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266158/LIVER_i6hqhz.png";
const NERVE_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266159/NERVE_vvturs.png";
const OTHER_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266159/OTHER_xaekqs.png";
const SKIN_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266162/SKIN_yvww0a.png";
const SPINAL_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266163/SPINAL_g4itqj.png";
const THALASSEMIA_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266163/THALASSEMIA_lkc840.png";
const THYROID_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266166/THYROID_lqqtpt.png";
const VITILIGO_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770266166/VITILIGO_vkp4hr.png";

const CARD_IMAGE =
  "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=600&q=80";

const baseImages = {
  cancer: CANCER_URL,
  kidney: KIDNEY_URL,
  liver: LIVER_URL,
  heart: HEART_URL,
  nerve: NERVE_URL,
  thyroid: THYROID_URL,
  genital: GENITAL_URL,
  spinal: SPINAL_URL,
  vitiligo: VITILIGO_URL,
  thalassemia: THALASSEMIA_URL,
  diabetics: DIABETICS_URL,
  skin: SKIN_URL,
  hair: HAIR_URL,
  constipation: CONSTIPATION_URL,
  indigestion: INDIGESTION_URL,
  other: OTHER_URL,
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
  const [isExpandedOnMobile, setIsExpandedOnMobile] = useState(false);

  return (
    <div className="relative max-w-screen-2xl mx-auto px-2 sm:px-6">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-[35px] font-robotocondensed font-bold text-[#1b3610] tracking-tight uppercase">
          OUR <span className="text-[#74C425]">SERVICES</span>
        </h3>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-8 lg:grid-rows-2">
        {TREATMENT_CARDS.map((card, index) => {
		          const isSelected = selectedCategory === card.key;
		          const titleParts = String(card.title || "").trim().split(/\s+/);
		          const titleSuffix = titleParts.length ? titleParts.pop() : "";
		          const titleMain = titleParts.join(" ");
              const isHiddenOnMobile = !isExpandedOnMobile && index >= 6;
		
		          return (
		            <div
		              key={card.id}
		              className={`bg-white rounded-2xl shadow-[0_6px_12px_rgba(0,0,0,0.08)] overflow-hidden border flex flex-col transition-colors ${
		                isSelected
		                  ? "border-[#5cb624] ring-2 ring-[#5cb624]/30"
		                  : "border-[#e6e6e6]"
		              } ${isHiddenOnMobile ? "hidden sm:flex" : ""}`}
		            >
				              <div
				                className="h-28 bg-cover bg-center bg-no-repeat sm:h-16 lg:h-28"
				                style={{ backgroundImage: `url('${card.image || CARD_IMAGE}')` }}
				              />
			              <div
			                className={`relative -mt-6 flex flex-1 flex-col items-center justify-center gap-2 rounded-[30px] px-3 pb-4 pt-7 text-center sm:mt-0 sm:gap-2 sm:rounded-none sm:px-4 sm:py-3 ${
			                  isSelected ? "bg-[#1118A5]" : "bg-[#74C425]"
			                }`}
			              >
			                <p className="text-[12px] sm:text-[11px] font-bold text-white leading-[1.1] uppercase tracking-wide">
			                  <span>{titleMain}</span>
			                  {titleSuffix ? <span className="block">{titleSuffix}</span> : null}
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
		                  className={`inline-flex items-center justify-center cursor-pointer rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wide shadow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:px-4 sm:py-1 sm:text-[10px] ${
		                    isSelected
		                      ? "bg-white text-[#1118A5] hover:bg-white/90"
		                      : "bg-[#d8f4b8] text-[#1b3610] hover:bg-white"
		                  }`}
		                  aria-pressed={isSelected}
		                >
		                  LEARN MORE
		                </button>
		              </div>
		            </div>
		          );
		        })}
      </div>

      {!isExpandedOnMobile && (
        <div className="mt-6 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setIsExpandedOnMobile(true)}
            className="inline-flex items-center justify-center rounded-md bg-[#1118A6] px-8 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#0d128f]"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
}
