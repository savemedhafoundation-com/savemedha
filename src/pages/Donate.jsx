import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import donateHero from "../assets/Photo/DONATE ICON.png";
import bloodBanner from "../assets/Photo/3 IMAGES COMBINED.jpg";

const DONATE_URL = "https://dantura.com/";
const BLOOD_BANK_URL = "https://www.google.com/search?q=nearest+blood+bank";
const BE_DONOR_URL = "https://www.google.com/search?q=become+a+blood+donor";
const FIND_DONOR_URL = "https://www.google.com/search?q=find+blood+donor+near+me";

export default function Donate({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9fb] to-white text-slate-900">
      <Navbar currentPage="donate" onNavigate={onNavigate} />

      <main className="flex flex-col items-center px-4 py-12">
        {/* Top Illustration + Heading */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-8 text-center">
          <div className="flex justify-center mb-8">
            <img
              src={donateHero}
              alt="Donate illustration"
              className="w-full max-w-xl object-contain"
              loading="lazy"
            />
          </div>

          <h1 className="font-koho text-4xl font-bold text-[#3c6513]">
            Donate For a Good Cause <span className="text-red-500">♥</span>
          </h1>
          <p className="mt-3 text-lg italic text-slate-700">
            "Every contribution counts, every life matters."
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#1a73e8] px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#1558ad]"
            >
              Donate Now
              <span className="text-[10px] font-semibold uppercase tracking-wide">
                Secured by Razorpay
              </span>
            </a>
          </div>

          <p className="mt-6 text-base leading-7 text-slate-700 text-left">
            Join us in donating for a good cause! Your contribution can make a world of
            difference in someone's life. Every donation, no matter how small, helps support
            critical medical treatments, emergency responses, and community health initiatives.
            Together, let's make a positive impact and spread hope and healing to those in need.
            Donate now and be a part of something truly meaningful.
          </p>
        </div>

       

        {/* CTA buttons */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 w-full max-w-4xl">
          <a
            href={BLOOD_BANK_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-md bg-[#3a8b9c] px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#2f6f7b]"
          >
            Find Blood bank
          </a>
          <a
            href={BE_DONOR_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-md bg-[#3a8b9c] px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#2f6f7b]"
          >
            Be a Blood Donor
          </a>
          <a
            href={FIND_DONOR_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-md bg-[#3a8b9c] px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#2f6f7b]"
          >
            Find Blood Donor
          </a>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
