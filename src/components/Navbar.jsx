import { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { ImWhatsapp } from "react-icons/im";

import savemedhaLogo from "../assets/Photo/SavemedhaLogo.png";
import SmfLogoWhite from "../assets/Photo/smf logo white.02.png";
import { MdPhoneInTalk } from "react-icons/md";
import { MdAttachEmail } from "react-icons/md";

const COLORS = {
  NAV_GREEN: "#66b300",
  HOME_BLUE: "#003399",
  ACTION_ORANGE: "#ff6633",
};

const NAV_ITEMS = [
  { name: "HOME", key: "home", hasDropdown: false },
  { name: "ABOUT US", key: "about", hasDropdown: false },
  { name: "TREATMENT", key: "treatment", hasDropdown: true },
  { name: "DONATE", key: "donate", hasDropdown: false },
  { name: "EVENTS & PROJECTS", key: null, hasDropdown: true },
  { name: "BLOGS", key: "blogs", hasDropdown: false },
  { name: "E-BOOK", key: null, hasDropdown: false },
  { name: "CAREERS", key: null, hasDropdown: false },
  { name: "CONTACT US", key: "contact", hasDropdown: false },
];

export default function Navbar({ currentPage = "home", onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event, key) => {
    if (key && typeof onNavigate === "function") {
      event.preventDefault();
      onNavigate(key);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="font-sans w-full sticky top-0 z-50">
      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-6 bg-gradient-to-r from-white via-white to-[#b7de4e] ml-12">
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="focus:outline-none flex-shrink-0"
          >
            <img
              src={savemedhaLogo}
              alt="Save Medha Foundation"
              className="h-25 w-auto object-contain"
            />
          </button>
          <button
            className="shrink-0 rounded-2xl bg-[#e55e27] px-4 py-6 mr-5 text-white text-[25px] font-bold shadow-md"
            onClick={() => onNavigate?.("contact")}
          >
            Book An Appointment
          </button>
        </div>

        <div
          className="flex items-center justify-between px-4 py-6  text-white shadow-md"
          style={{ backgroundColor: COLORS.NAV_GREEN }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              className="h-20 w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center ml-5"
            >
              <svg
                className={`h-10 w-10 transition-transform ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-10 h-10" />
              <span className="text-[20px] font-semibold uppercase">
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date())}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 mr-5 ">
            <button
              type="button"
              aria-label="Search"
              className="h-20 w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="6" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Select language"
              className="h-20 w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="m5 8 6 6" />
                <path d="m4 14 6-6 2-3" />
                <path d="M2 5h12" />
                <path d="M7 2h1" />
                <path d="m22 22-5-10-5 10" />
                <path d="M14 18h6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Locate us"
              onClick={() => onNavigate?.("locateus")}
              className="h-20 w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
            >
              <IoLocationSharp className="w-10 h-10" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-150 bg-white shadow-2xl overflow-y-auto animate-slideLeft"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="bg-[#66b300] text-white px-5 py-4 font-semibold text-lg flex items-center gap-2 justify-between">
                
                <button
                  type="button"
                  aria-label="Close menu"
                  className="text-white/90 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col ">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.key && item.key === currentPage;

                  const hrefValue = item.key
                    ? "#"
                    : `#${item.name.toLowerCase().replace(/ /g, "-")}`;

                  const clickHandler = item.key
                    ? (event) => handleNavClick(event, item.key)
                    : () => setIsMobileMenuOpen(false);

                  return (
                    <a
                      key={item.name}
                      href={hrefValue}
                      onClick={clickHandler}
                      className={`flex items-center gap-6 px-10 py-10 text-[15px] border-b border-gray-100 transition-all duration-200 ${
                        isActive
                          ? "bg-gray-100 font-semibold text-gray-900"
                          : "text-gray-700 hover:bg-[#d7f3b3]"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}

                <div className="px-12  py-20 mt-4 bg-[#427402] text-white rounded-t-2xl">
                  <div className="max-w-[260px] w-full mb-6">
                    <img
                      src={SmfLogoWhite}
                      alt="Save Medha Foundation logo"
                      className="w-full max-h-28 object-contain"
                    />
                  </div>

                  <p className="text-gray-200 italic text-lg leading-relaxed mb-6">
                    &ldquo;Transforming cancer care through Natural Immunotherapy
                    &mdash; where healing begins with your own immune power.&rdquo;
                  </p>

                  <div className="flex items-center gap-6 text-white">
                    <a
                      href="https://www.facebook.com/savemedhafoundation"
                      aria-label="Facebook"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#74c425] transition-colors"
                    >
                      <Facebook className="w-7 h-7" />
                    </a>

                    <a
                      href="https://www.instagram.com/savemedhafoundation/"
                      aria-label="Instagram"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#74c425] transition-colors"
                    >
                      <Instagram className="w-7 h-7" />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/save-medha-foundation/"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#74c425] transition-colors"
                    >
                      <Linkedin className="w-7 h-7" />
                    </a>

                    <a
                      href="https://wa.me/9800808595"
                      aria-label="WhatsApp"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#74c425] transition-colors"
                    >
                      <ImWhatsapp className="w-7 h-7" />
                    </a>

                    <a
                      href="https://www.youtube.com/@savemedhafoundation7959"
                      aria-label="YouTube"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#74c425] transition-colors"
                    >
                      <Youtube className="w-7 h-7" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop / laptop layout */}
      <div className="hidden lg:block">
      {/* ===============================
          TOP SECTION
      =============================== */}
      <div
        className="px-12 py-3"
        style={{
          // background: "linear-gradient(to right, #ffffff, #e6ffe6)",
          background:
            "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 27.88%, #B7DE4E 100%)",
        }}
      >
        <div className="flex flex-row items-start gap-8">
          {/* Logo */}
          <div className="flex-shrink-0 flex justify-start">
            <button
              type="button"
              onClick={() => onNavigate?.("home")}
              className="focus:outline-none"
            >
              <img
                src={savemedhaLogo}
                alt="Save Medha Foundation Logo"
                className="h-17 w-auto object-contain"
              />
            </button>
          </div>

          {/* ===============================
              RIGHT CONTENT (STACKED ON SMALL)
          =============================== */}
          <div className="flex-1 flex flex-col gap-3">
            {/* === Row 1: Phone + Email === */}
            <div className="flex flex-wrap justify-end items-center gap-4 pb-2 divide-x divide-gray-600">
              {/* Date */}
              <div className="flex items-center gap-2 px-2 text-[15px] font-semibold text-gray-900">
                <FaCalendarAlt className="text-gray-700" size={18} />
                <span className="whitespace-nowrap">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date())}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[15px] pr-2">
                <a
                  href="tel:+919800808595"
                  className="flex items-center gap-2 text-[15px] pr-2"
                >
                  <MdPhoneInTalk
                    className="text-gray-700 fill-current hover:text-blue-700"
                    size={18}
                  />
                  <span className="font-semibold text-gray-900 hover:text-blue-700">
                    9800808595
                  </span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[15px]">
                <a
                  href="mailto:info@savemedha.com"
                  className="flex items-center gap-2 text-[15px] pl-2"
                >
                  <MdAttachEmail
                    className="text-black-600 hover:text-blue-700 fill-current"
                    size={18}
                  />
                  <span className="font-semibold text-[#000000] hover:text-blue-700 truncate max-w-none">
                    info@savemedha.com
                  </span>
                </a>
              </div>
            </div>

            {/* === Row 2: Search, Language, Date, Location, Appointment === */}
            <div className="flex flex-wrap justify-end items-center gap-4">
              {/* Search */}
              <div className="relative w-[200px] shadow-md">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-2 py-2 text-[15px] bg-white font-semibold text-gray-700 border-2 border-[#74C425] rounded focus:outline-none "
                />
                {/* focus:ring-2       focus:ring-green-500 */}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Language */}
              {/* <select className="px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md">
                <option>Select Language</option>
                <option>English</option>
                <option>Bangla</option>
                <option>Hindi</option>
                <option>Urdu</option>
              </select> */}
              {/* <select
  className="px-3 py-2 border-2 border-[#74C425] rounded bg-white text-[15px] font-semibold text-gray-700 cursor-pointer shadow-md focus:outline-none"
> */}
              {/* focus:outline-none focus:ring-2 focus:ring-green-500 */}
              {/* <option value="">Select Language</option>
  <option value="eng">English</option>
  <option value="bn">Bangla</option>
  <option value="hi">Hindi</option>
  <option value="ur">Urdu</option>
</select> */}

              <select className="px-4 py-2 border-2 border-[#74C425] rounded bg-transparent text-[15px] font-semibold text-gray-700 cursor-pointer shadow-md focus:outline-none ">
                <option
                  className="bg-[#ffffff]  text-black font-semibold"
                  value=""
                >
                  Select Language
                </option>
                <option
                  className="bg-[#ebf6cd] text-black font-semibold"
                  value="eng"
                >
                  English
                </option>
                <option
                  className="bg-[#d5eb98] text-black font-semibold"
                  value="bn"
                >
                  Bangla
                </option>
                <option
                  className="bg-[#c8e676] text-black font-semibold"
                  value="hi"
                >
                  Hindi
                </option>
                <option
                  className="bg-[#badf55] text-black font-semibold "
                  value="ur"
                >
                  Urdu
                </option>
              </select>

              {/* Location */}
              <button
                onClick={() => onNavigate("locateus")}
                className="text-[15px] font-semibold flex items-center gap-2 px-3 py-2 bg-white border-2 border-[#74C425] rounded shadow-md hover:bg-gray-50 transition"
              >
                <IoLocationSharp className="text-[#e05529]" size={18} />
                <span className="text-sm font-semibold text-gray-900">
                  Locate us
                </span>
              </button>

              {/* Appointment Button */}
              <button
                className="px-5 py-2 text-sm text-white font-bold font-koho rounded whitespace-nowrap transition-colors border-2 border-[
#fffefb] px-4 py-2 rounded shadow-md"
                style={{ backgroundColor: COLORS.ACTION_ORANGE }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e05529")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = COLORS.ACTION_ORANGE)
                }
              >
                Book An Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================
          NAVIGATION BAR
      =============================== */}
      <div
        className={`text-white px-12 sticky top-0 z-50 ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{ backgroundColor: COLORS.NAV_GREEN }}
      >
        <div className="flex items-center justify-between">
          {/* Navigation */}
          <nav className="flex items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = item.key && item.key === currentPage;
              const hrefValue = item.key
                ? "#"
                : `#${item.name.toLowerCase().replace(/ /g, "-")}`;
              const clickHandler = item.key
                ? (event) => handleNavClick(event, item.key)
                : undefined;

              return (
                <a
                  key={item.name}
                  href={hrefValue}
                  onClick={clickHandler}
                  className={`flex items-center gap-1 px-5 py-4 text-sm font-bold uppercase transition ${
                    isActive
                      ? "text-white"
                      : "text-white hover:bg-[#013970] hover:bg-opacity-10"
                  }`}
                  style={isActive ? { backgroundColor: COLORS.HOME_BLUE } : {}}
                >
                  <span className="text-[12px] font-semibold">{item.name}</span>
                  {item.hasDropdown && (
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      </div>
    </header>
  );
}
