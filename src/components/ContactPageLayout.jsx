import React, { useState } from "react";
import { ArrowUpRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import { MdMyLocation } from "react-icons/md";

export default function ContactPageLayout({
  locations,
  clinicNames,
  nearestLocation,
  userLocation,
  detecting,
  detectLocation,
  openMap,
  cardRefs,
  phone,
  onPhoneChange,
  otp,
  onOtpChange,
  step,
  sendOtp,
  verifyOtp,
  supportImage,
}) {
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert("Thank you. Your message has been received.");
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_310px]">
            <div>
              <h2 className="font-poppins text-3xl font-black text-slate-950 sm:text-4xl">Our Care Centers</h2>
              <p className="mt-4 max-w-[650px] font-sen text-base font-medium leading-7 text-slate-600 sm:text-lg">
                Find a clinic near you for in-person consultations and specialized treatments. Our facilities are equipped to provide the best care.
              </p>
              <button
                type="button"
                onClick={detectLocation}
                disabled={detecting}
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-[#55d525] to-[#159d0d] px-6 font-poppins text-sm font-bold text-white shadow-[0_10px_22px_rgba(30,171,20,0.2)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
              >
                <MdMyLocation className={detecting ? "animate-pulse" : ""} size={18} />
                {detecting ? "Finding your location..." : "Find nearest centre"}
              </button>
              {userLocation && nearestLocation ? (
                <p className="mt-3 text-sm font-bold text-[#168f00]">Your nearest center is highlighted below.</p>
              ) : null}
            </div>

            <div className="rounded-2xl bg-[#f7fff4] p-5 ring-1 ring-[#dcedd7]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">WhatsApp Us</p>
              <a href="https://wa.me/919800808595" target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-[#22bd19] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#199a13]">
                Chat with our care team
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location, index) => {
              const isNearest = nearestLocation === location;
              const isFeatured = selectedClinicIndex === index || isNearest;

              return (
                <article
                  key={`${location.city}-${location.address}`}
                  ref={(element) => (cardRefs.current[index] = element)}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedClinicIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedClinicIndex(index);
                    }
                  }}
                  className={`flex min-h-[270px] cursor-pointer flex-col rounded-2xl border p-6 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#45c922]/25 ${
                    isFeatured
                      ? "border-[#29b818] bg-gradient-to-br from-[#48cf20] to-[#16a30d] text-white shadow-[0_18px_35px_rgba(31,168,21,0.2)]"
                      : "border-slate-200 bg-white text-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl ${isFeatured ? "bg-white text-[#159d0d]" : "bg-slate-100 text-slate-500"}`}>
                      <Building2 size={19} />
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black ${isFeatured ? "bg-white/95 text-[#159d0d]" : "bg-[#effbea] text-[#168f00]"}`}>
                      <MapPin className="mr-1 inline" size={11} />
                      {location.city.charAt(0) + location.city.slice(1).toLowerCase()}
                    </span>
                  </div>

                  <h3 className="mt-5 font-poppins text-lg font-black">{clinicNames[index]}</h3>
                  <p className={`mt-3 text-sm font-medium leading-5 ${isFeatured ? "text-white/90" : "text-slate-600"}`}>
                    {location.address}
                  </p>

                  <div className={`mt-auto flex items-end justify-between gap-4 border-t pt-4 ${isFeatured ? "border-white/25" : "border-slate-200"}`}>
                    <a href={`tel:${location.phone.replace(/\s+/g, "")}`}>
                      <span className={`block text-[10px] font-bold uppercase tracking-wide ${isFeatured ? "text-white/70" : "text-slate-400"}`}>Call to book</span>
                      <strong className="mt-1 block text-xs">{location.phone}</strong>
                    </a>
                    <button type="button" onClick={() => openMap(location.mapLink)} aria-label={`Open ${clinicNames[index]} in Google Maps`} className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${isFeatured ? "bg-white text-[#159d0d] hover:scale-105" : "bg-slate-100 text-slate-500 hover:bg-[#eaf9e5] hover:text-[#159d0d]"}`}>
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </article>
              );
            })}

          </div>
        </div>
      </section>

      <section id="message-form" className="border-t border-slate-200 bg-white scroll-mt-24">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="font-poppins text-3xl font-black text-slate-950 sm:text-4xl">Send us a message</h2>
            <p className="mx-auto mt-3 max-w-[520px] text-base leading-7 text-slate-500">Fill out the form below and our dedicated team will get back to you within 24 hours.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1000px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] lg:grid-cols-[1.55fr_0.85fr]">
            <form onSubmit={handleSubmit} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-9 lg:p-12">
              <label className="text-sm font-bold text-slate-800">
                First name
                <input name="firstName" required placeholder="John" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-4 font-normal outline-none transition focus:border-[#42bd22] focus:ring-2 focus:ring-[#42bd22]/15" />
              </label>
              <label className="text-sm font-bold text-slate-800">
                Last name
                <input name="lastName" required placeholder="Doe" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-4 font-normal outline-none transition focus:border-[#42bd22] focus:ring-2 focus:ring-[#42bd22]/15" />
              </label>
              <label className="text-sm font-bold text-slate-800 sm:col-span-2">
                Email address
                <input name="email" type="email" required placeholder="john@example.com" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-4 font-normal outline-none transition focus:border-[#42bd22] focus:ring-2 focus:ring-[#42bd22]/15" />
              </label>
              <div className="sm:col-span-2">
                <label htmlFor="contact-phone" className="text-sm font-bold text-slate-800">Phone number</label>
                <div className="mt-2 flex gap-3">
                  <input id="contact-phone" name="phone" type="tel" value={phone} onChange={onPhoneChange} maxLength={10} required placeholder="10-digit mobile number" className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 px-4 outline-none transition focus:border-[#42bd22] focus:ring-2 focus:ring-[#42bd22]/15" />
                  {step === 1 ? <button type="button" onClick={sendOtp} className="rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:border-[#42bd22] hover:text-[#168f00]">Verify</button> : null}
                </div>
                {step === 2 ? (
                  <div className="mt-3 flex gap-3">
                    <input value={otp} onChange={onOtpChange} placeholder="Enter OTP" className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 px-4 outline-none focus:border-[#42bd22]" />
                    <button type="button" onClick={verifyOtp} className="rounded-lg bg-[#159d0d] px-4 text-sm font-bold text-white">Confirm OTP</button>
                  </div>
                ) : null}
                {step === 3 ? <p className="mt-2 text-sm font-bold text-[#168f00]">Phone verified successfully</p> : null}
                <div id="recaptcha-container" />
              </div>
              <label className="text-sm font-bold text-slate-800 sm:col-span-2">
                Message
                <textarea name="message" required rows={5} placeholder="How can we help you?" className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#42bd22] focus:ring-2 focus:ring-[#42bd22]/15" />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex min-h-12 items-center gap-3 rounded-xl bg-gradient-to-b from-[#55d525] to-[#159d0d] px-7 font-poppins text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5">
                  Send message <ArrowUpRight size={17} />
                </button>
              </div>
            </form>

            <aside className="border-t border-slate-200 bg-[#fbfcfb] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
              <h3 className="font-poppins text-xl font-black text-slate-950">Contact Information</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">Our team is available Monday through Sunday, 9am to 6pm IST to assist you.</p>
              <img src={supportImage} alt="Save Medha support team" className="mx-auto mt-5 h-44 w-full object-contain" />
              <div className="mt-6 space-y-5">
                <a href="mailto:info@savemedha.com" className="flex gap-3 text-sm text-slate-600"><Mail className="mt-0.5 shrink-0 text-slate-900" size={17} /><span><strong className="block text-slate-950">General Enquiries</strong>info@savemedha.com</span></a>
                <a href="tel:+919800808595" className="flex gap-3 text-sm text-slate-600"><Phone className="mt-0.5 shrink-0 text-slate-900" size={17} /><span><strong className="block text-slate-950">Phone Support</strong>+91 9800808595</span></a>
                <div className="flex gap-3 text-sm text-slate-600"><MapPin className="mt-0.5 shrink-0 text-slate-900" size={17} /><span><strong className="block text-slate-950">Headquarters</strong>Save Medha Foundation<br />Kolkata, West Bengal, India</span></div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
