import React from "react";
import { Mail, Phone } from "lucide-react";

const STRIPES_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(244, 63, 94, 0.08) 0px, rgba(244, 63, 94, 0.08) 22px, rgba(244, 63, 94, 0.02) 22px, rgba(244, 63, 94, 0.02) 92px)",
};

const buildMapSrc = ({ lat, lng, zoom }) =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    `${lat},${lng}`
  )}&z=${encodeURIComponent(String(zoom))}&output=embed`;

export default function ContactGetInTouchSection({
  title = "Get in Touch",
  subtitle = "We're here to answer your questions and provide the care you need.",
  phone = "+91 9800808595",
  email = "info@savemedha.com",
  showStripes = false,
  mapLat = 22.6564,
  mapLng = 88.3772,
  mapZoom = 13,
  mapLabel = "Dunlop, Kolkata, West Bengal",
}) {
  return (
    <section className="relative bg-[#fbf5fc]">
      {showStripes ? (
        <div
          className="absolute inset-0"
          style={STRIPES_STYLE}
          aria-hidden="true"
        />
      ) : null}
      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 md:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#74C425]/15 text-[#74C425] shadow-sm">
                  <Phone className="h-8 w-8" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">Call Us</p>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="mt-1 inline-block text-xl text-slate-600 hover:text-slate-900"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#74C425]/15 text-[#74C425] shadow-sm">
                  <Mail className="h-8 w-8" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 inline-block text-xl text-slate-600 hover:text-slate-900"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/10">
            <div className="absolute left-4 top-4 z-10 rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg">
              {mapLabel}
            </div>
            <iframe
              title="Location map"
              src={buildMapSrc({ lat: mapLat, lng: mapLng, zoom: mapZoom })}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 sm:h-[420px] lg:h-[460px]"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
