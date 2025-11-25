import { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { EllipsisVertical } from "lucide-react";
import savemedhaLogo from "../assets/Photo/SavemedhaLogo.png";
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
    <header className="font-sans w-full">
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
                    className="text-gray-700 fill-current"
                    size={18}
                  />
                  <span className="font-semibold text-gray-900">
                    9800808595
                  </span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[15px]">
                <a
                  href="mailto:savemedhafoundation@gmail.com"
                  className="flex items-center gap-2 text-[15px] pl-2"
                >
                  <MdAttachEmail
                    className="text-blue-600 fill-current"
                    size={18}
                  />
                  <span className="font-semibold text-[#0728CF] truncate max-w-none">
                    savemedhafoundation@gmail.com
                  </span>
                </a>
              </div>
            </div>

            {/* === Row 2: Search, Language, Date, Location, Appointment === */}
            <div className="flex flex-wrap justify-end items-center gap-4">
              {/* Search */}
              <div className="relative w-[170px] shadow-md">
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
                    className="h-4 w-5"
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

              <select className="px-3 py-2 border-2 border-[#74C425] rounded bg-transparent text-[15px] font-semibold text-gray-700 cursor-pointer shadow-md focus:outline-none ">
                <option
                  className="bg-[#ffffff] text-black font-semibold"
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
          <nav className="hidden lg:flex items-center">
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

          {/* Mobile menu trigger */}
          <div className="lg:hidden relative">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="p-2 text-white hover:text-gray-200 transition"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <EllipsisVertical className="w-6 h-6" />
            </button>

            {isMobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white text-gray-900 shadow-xl ring-1 ring-black/5 overflow-hidden z-50">
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
                      className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                        isActive
                          ? "bg-[#003399] text-white"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
