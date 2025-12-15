import React, { useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import Review1 from "../assets/Photo/review1.png";
import LicenceLogo from "../assets/Photo/licenceLogo.png";

const getInitial = (name) => {
  if (!name) return "?";
  const firstChar = name.trim().charAt(0);
  return firstChar ? firstChar.toUpperCase() : "?";
};

export default function TestimonialsSection() {
  const testimonialsRef = useRef(null);

  const scrollTestimonials = useCallback((dir) => {
    const el = testimonialsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  }, []);

  const testimonials = [
    {
      name: "Bidhan Kumar Halder",
      rating: 5,
      text: "I am from Bangladesh, I came here and I am fine now.",
      image: "https://i.pravatar.cc/150?img=63",
    },
    {
      name: "Soumitra Gayen",
      rating: 5,
      text: "I am a rectal cancer patient and I am fine now. Best treatment here.",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Anowarul Hossain",
      rating: 5,
      text: "Save Medha Foundation is a new horizon in medical science. It is a real example of easy access to cure for all complex diseases including cancer, thalassemia, and other terminal diseases for the people of West Bengal, Orissa, Assam, Nepal, India and Bangladesh. May Save Medha move forward quickly, best wishes.",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sadekul SK",
      rating: 5,
      text: "Best and affordable treatment for lower middle class family.",
      image: "https://i.pravatar.cc/150?img=58",
    },
    {
      name: "Ilias Islam Mondal",
      rating: 5,
      text: "I started therapy here and feel healthier and more energetic now.",
      image: Review1,
    },
    {
      name: "Sandip Mudi",
      rating: 5,
      text: "Best and affordable treatment",
      image: "https://i.pravatar.cc/150?img=28",
    },
    {
      name: "Aparna Mandal",
      rating: 5,
      text: "khub sundor byabobher oder .",
      image: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Sohel Rana",
      rating: 5,
      text: "Affordable, compassionate, and focused on natural healing that works.",
      image: "https://i.pravatar.cc/150?img=56",
    },
  ];

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="relative inline-block text-4xl font-bold text-slate-900">
          <span className="relative">TESTI </span>
          <div className="absolute bottom-[-10px] left-0 h-1 w-20 bg-[#74C425]" />
          <span className="text-[#74C425]">MONIALS</span>
        </h2>
        <p className="text-gray-600 mt-2 font-bold pt-3">
          Turning Vision into Reality
        </p>
      </div>

      <section
        className="py-10 px-10 mb-10 border border-gray-200 shadow-[5px_4px_4px_0px_#215C0740] rounded-3xl"
        style={{
          background: "linear-gradient(90deg, #74C425 0%, #3A6212 100%)",
        }}
      >
        <div className="w-full">
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => scrollTestimonials(-1)}
              className="flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#0d8b1f] text-green-700 items-center justify-center shadow-lg transition hover:bg-[#edfce0]"
              aria-label="Scroll testimonials left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonials(1)}
              className="flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#0d8b1f] text-green-700 items-center justify-center shadow-lg transition hover:bg-[#edfce0]"
              aria-label="Scroll testimonials right"
            >
              <ArrowRight size={18} />
            </button>

            <div
              ref={testimonialsRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 hide-scrollbar"
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-shrink-0 w-[390px] bg-white border border-gray-200 rounded-[2px] rounded-tr-[2px] rounded-tl-[25px] rounded-br-[52px] p-6 relative shadow-[5px_4px_4px_0px_#215C0740]"
                >
                  <div className="absolute top-4 left-1 w-4 h-4 rounded-full bg-[#74C425] mt-4 ml-2" />
                  <div className="absolute top-3 left-3 w-12 h-12 rounded-full bg-[#74C425] opacity-70 mt-8 ml-2" />

                  <div className="relative z-10 flex items-start gap-4 mt-8 ml-4">
                    <div className="relative shrink-0">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full ring-4 ring-white shadow-md bg-green-600 text-white font-semibold flex items-center justify-center text-lg">
                          {getInitial(t.name)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900">
                        {t.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[#F7C948] my-2">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill="#F7C948"
                            className="text-[#F7C948]"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <div className="w-full max-w-[780px] bg-white border -translate-y-4 border-gray-200 shadow-[5px_4px_4px_0px_#215C0740] rounded-md px-6 py-6">
          <img
            src={LicenceLogo}
            alt="License logos"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
