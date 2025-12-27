import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import axios from "axios";

import LicenceLogo from "../assets/Photo/licencelogo (2).png";

const getInitial = (name) => {
  if (!name) return "?";
  const firstChar = name.trim().charAt(0);
  return firstChar ? firstChar.toUpperCase() : "?";
};

export default function TestimonialsSection() {
  const testimonialsRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const scrollTestimonials = useCallback((dir) => {
    const el = testimonialsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchTestimonials = async () => {
      setLoading(true);
      setHasError(false);

      try {
        const response = await axios.get(
          "https://savemedhabackend.vercel.app/api/testimonials/"
        );
        if (!isActive) return;

        const payload = response?.data;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.testimonials)
              ? payload.testimonials
              : [];

        const normalized = list
          .map((item, index) => {
            const name = item?.name || item?.fullName || item?.patientName || "";
            const text =
              item?.text || item?.message || item?.review || item?.description || "";
            const rawRating = Number(item?.rating ?? item?.stars ?? item?.star ?? 0);
            const rating = Number.isFinite(rawRating)
              ? Math.max(0, Math.min(5, Math.round(rawRating)))
              : 0;
            const image =
              item?.image ||
              item?.photo ||
              item?.avatar ||
              item?.imageUrl ||
              item?.profileImage ||
              null;

            if (!name && !text) return null;

            return {
              id: item?._id || item?.id || `${index + 1}`,
              name,
              rating,
              text,
              image,
            };
          })
          .filter(Boolean);

        setTestimonials(normalized);
      } catch (error) {
        if (!isActive) return;
        setHasError(true);
        setTestimonials([]);
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    fetchTestimonials();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="relative inline-block text-4xl font-bold text-slate-900">
          <span className="relative">TESTI</span>
          <div className="absolute bottom-[-10px] left-0 h-1 w-20 bg-[#74C425]" />
          <span className="text-[#74C425]">MONIALS</span>
        </h2>
        <p className="text-gray-600 mt-2 font-bold pt-3">
          Turning Vision into Reality
        </p>
      </div>

      <section
        className="py-10 px-4 sm:px-10 mb-10 border border-gray-200 shadow-[5px_4px_4px_0px_#215C0740] rounded-3xl"
        style={{
          background: "linear-gradient(90deg, #74C425 0%, #3A6212 100%)",
        }}
      >
        <div className="w-full">
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => scrollTestimonials(-1)}
              className="flex absolute left-2 sm:-left-20 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#0d8b1f] text-green-700 items-center justify-center shadow-lg transition hover:bg-[#edfce0] cursor-pointer"
              aria-label="Scroll testimonials left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonials(1)}
              className="flex absolute right-2 sm:-right-20 top-1/2 -translate-y-1/2  z-10 w-12 h-12 rounded-full bg-white border border-[#0d8b1f] text-green-700 items-center justify-center shadow-lg transition hover:bg-[#d3f7b4] cursor-pointer"
              aria-label="Scroll testimonials right"
            >
              <ArrowRight size={18} />
            </button>

            <div
              ref={testimonialsRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 hide-scrollbar"
            >
              {loading ? (
                <div className="snap-start flex-shrink-0 w-[390px] bg-white border border-gray-200 rounded-[2px] rounded-tr-[2px] rounded-tl-[25px] rounded-br-[52px] p-6 relative shadow-[5px_4px_4px_0px_#215C0740]">
                  Loading testimonials...
                </div>
              ) : hasError ? (
                <div className="snap-start flex-shrink-0 w-[390px] bg-white border border-gray-200 rounded-[2px] rounded-tr-[2px] rounded-tl-[25px] rounded-br-[52px] p-6 relative shadow-[5px_4px_4px_0px_#215C0740]">
                  Unable to load testimonials
                </div>
              ) : testimonials.length === 0 ? (
                <div className="snap-start flex-shrink-0 w-[390px] bg-white border border-gray-200 rounded-[2px] rounded-tr-[2px] rounded-tl-[25px] rounded-br-[52px] p-6 relative shadow-[5px_4px_4px_0px_#215C0740]">
                  No testimonials available
                </div>
              ) : (
                testimonials.map((t, idx) => (
                <div
                  key={t.id ?? idx}
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
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <div className="w-full max-w-[780px] -translate-y-4">
          <p className="mb-4 text-center text-lg font-bold text-gray-900">
            CERTIFIED BY
          </p>
          <div className="w-full bg-white border border-gray-200 shadow-[5px_4px_4px_0px_#215C0740] rounded-md px-6 py-6">
            <img
              src={LicenceLogo}
              alt="License logos"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  );
}
