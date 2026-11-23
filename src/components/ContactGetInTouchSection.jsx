import React from "react";
import { Mail, Phone } from "lucide-react";

const buildMapSrc = ({ lat, lng, zoom }) =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    `${lat},${lng}`
  )}&z=${encodeURIComponent(String(zoom))}&output=embed`;

export default function ContactGetInTouchSection({
  phone = "+91 9800808595",
  email = "info@savemedha.com",
  mapLat = 22.6564,
  mapLng = 88.3772,
  mapZoom = 13,
  mapLabel = "Dunlop, Kolkata, West Bengal",
}) {
  return (
    <section className="border-b border-slate-200 bg-[#fbfbfb]">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20">
        <div className="max-w-[470px]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#effbea] px-3 py-1.5 text-xs font-bold text-[#168f00]">
            <span className="h-2 w-2 rounded-full bg-[#45bd20]" />
            We are here to help
          </span>

          <h1 className="mt-5 font-poppins text-4xl font-black leading-[1.12] text-slate-950 sm:text-5xl">
            Get in touch with our team
          </h1>
          <p className="mt-5 max-w-[420px] font-sen text-base font-semibold leading-7 text-slate-600">
            Have questions about our treatments or need support? Reach out to us through any of the channels below, and we&apos;ll get back to you promptly.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <a href={`mailto:${email}`} className="group flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-800 transition group-hover:bg-[#eaf9e5] group-hover:text-[#168f00]">
                <Mail size={17} />
              </span>
              <span className="min-w-0">
                <strong className="block text-sm text-slate-950">Email</strong>
                <span className="block truncate text-xs text-slate-500">{email}</span>
              </span>
            </a>
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="group flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-800 transition group-hover:bg-[#eaf9e5] group-hover:text-[#168f00]">
                <Phone size={17} />
              </span>
              <span>
                <strong className="block text-sm text-slate-950">Call Us</strong>
                <span className="block text-xs text-slate-500">{phone}</span>
              </span>
            </a>
          </div>

          <a href="#message-form" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-b from-[#54d522] to-[#159d0d] px-8 font-poppins text-base font-bold text-white shadow-[0_10px_24px_rgba(34,171,24,0.2)] transition hover:-translate-y-0.5 hover:shadow-lg">
            Get an appointment
          </a>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_16px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200">
          <div className="absolute left-4 top-4 z-10 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 shadow-md">
            {mapLabel}
          </div>
          <iframe
            title="Save Medha Foundation location map"
            src={buildMapSrc({ lat: mapLat, lng: mapLng, zoom: mapZoom })}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[330px] w-full border-0 sm:h-[390px]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
