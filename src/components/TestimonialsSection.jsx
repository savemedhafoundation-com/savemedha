import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import axios from "axios";

import LicenceLogo from "../assets/SMF BY BRATIN/Frame 21.png";

const getInitial = (name) => {
  if (!name) return "?";
  const firstChar = name.trim().charAt(0);
  return firstChar ? firstChar.toUpperCase() : "?";
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  const changeTestimonial = useCallback(
    (direction) => {
      if (!testimonials.length) return;
      setActiveIndex(
        (current) => (current + direction + testimonials.length) % testimonials.length
      );
    },
    [testimonials.length]
  );

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

        setActiveIndex(0);
        setTestimonials(normalized);
      } catch {
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
      <section className="home-section relative overflow-hidden bg-[#F8FDF6] text-center">
        <div className="home-container relative max-w-[760px]">
          <h2 className="text-[24px] font-black tracking-tight text-slate-950 sm:text-[28px]">
            Testimonials
          </h2>
          <p className="home-heading-gap text-[12px] font-black text-slate-900">
            Turning Vision Into Reality
          </p>

          <div className="home-content-gap flex justify-center">
            <Quote size={52} className="text-[#14980f]" fill="currentColor" />
          </div>
          <p className="home-heading-gap mx-auto max-w-[240px] text-[18px] font-medium leading-6 text-slate-800">
            What our customers are saying
          </p>

          <div className="home-content-gap relative mx-auto max-w-[520px]">
            {testimonials.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => changeTestimonial(-1)}
                  className="absolute left-[-18px] top-1/2 z-20 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-500 shadow ring-1 ring-slate-200 transition hover:text-[#14980f] sm:left-[-70px]"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => changeTestimonial(1)}
                  className="absolute right-[-18px] top-1/2 z-20 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-500 shadow ring-1 ring-slate-200 transition hover:text-[#14980f] sm:right-[-70px]"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            <div className="absolute inset-0 translate-x-5 translate-y-4 rounded-[8px] border border-slate-200 bg-white/60 shadow-sm" />
            <div className="absolute inset-0 -translate-x-5 translate-y-2 rounded-[8px] border border-slate-200 bg-white/50 shadow-sm" />

            <article className="relative rounded-[8px] border border-slate-200 bg-white px-6 py-6 text-left shadow-[0_18px_36px_rgba(15,23,42,0.12)]">
              {loading ? (
                <p className="text-sm font-semibold text-slate-500">
                  Loading testimonials...
                </p>
              ) : hasError ? (
                <p className="text-sm font-semibold text-red-600">
                  Unable to load testimonials
                </p>
              ) : !activeTestimonial ? (
                <p className="text-sm font-semibold text-slate-500">
                  No testimonials available
                </p>
              ) : (
                <>
                  <p className="text-[15px] font-black leading-6 text-slate-950">
                    "{activeTestimonial.text}"
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    {activeTestimonial.image ? (
                      <img
                        src={activeTestimonial.image}
                        alt={activeTestimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#e93122] text-base font-black text-white">
                        {getInitial(activeTestimonial.name)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-[12px] font-black text-slate-950">
                        {activeTestimonial.name}
                      </h3>
                      <p className="text-[10px] font-semibold text-slate-500">
                        Patient
                      </p>
                      <div className="mt-1 flex items-center gap-0.5 text-[#f5bf17]">
                        {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill="currentColor"
                            className="text-[#f5bf17]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </article>
          </div>

          {testimonials.length > 1 && (
            <div className="home-content-gap flex justify-center gap-2">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === index
                      ? "w-10 bg-[#14980f]"
                      : "w-5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-section bg-[#F8FDF6]">
        <div className="home-container max-w-[760px] text-center">
          <p className="text-[22px] font-black tracking-tight text-slate-950">
            Certified <span className="text-[#14980f]">By</span>
          </p>
          <div className="home-content-gap mx-auto w-full max-w-[560px] rounded-none bg-[#F8FDF6] px-4 py-2">
            <img
              src={LicenceLogo}
              alt="License logos"
              className="mx-auto h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
