import { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import savemedhaLogo from "../assets/Photo/SavemedhaLogo.png";

const COLORS = {
  NAV_GREEN: "#66b300",
  HOME_BLUE: "#003399",
  ACTION_ORANGE: "#ff6633",
};

const NAV_ITEMS = [
  { name: "HOME", key: "home", hasDropdown: false },
  { name: "ABOUT US", key: "about", hasDropdown: false },
  { name: "TREATMENT", key: null, hasDropdown: true },
  { name: "DONATE", key: null, hasDropdown: true },
  { name: "EVENTS & PROJECTS", key: null, hasDropdown: true },
  { name: "BLOGS", key: null, hasDropdown: false },
  { name: "E-BOOK", key: null, hasDropdown: false },
  { name: "CAREERS", key: null, hasDropdown: false },
  { name: "CONTACT US", key: null, hasDropdown: false },
];

export default function Navbar({ currentPage = "home", onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

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
  };

  return (
    <header className="font-sans w-full">
      {/* ===============================
          TOP SECTION
      =============================== */}
      <div
        className="px-12 py-3"
        style={{
          background: "linear-gradient(to right, #ffffff, #e6ffe6)",
        }}
      >
        <div className="flex flex-row items-start gap-8">
          {/* Logo */}
          <div className="flex-shrink-0 flex justify-start">
            <img
              src={savemedhaLogo}
              alt="Save Medha Foundation Logo"
              className="h-24 w-auto object-contain"
            />
          </div>

          {/* ===============================
              RIGHT CONTENT (STACKED ON SMALL)
          =============================== */}
          <div className="flex-1 flex flex-col gap-3">
            {/* === Row 1: Phone + Email === */}
            <div className="flex flex-wrap justify-end items-center gap-4 border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2 text-sm">
                <FiPhone className="text-gray-700" size={16} />
                <span className="font-semibold text-gray-900">9800808595</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MdOutlineMailOutline className="text-blue-600" size={20} />
                <span className="font-medium text-blue-600 truncate max-w-none">
                  savemedhafoundation@gmail.com
                </span>
              </div>
            </div>

            {/* === Row 2: Search, Language, Date, Location, Appointment === */}
            <div className="flex flex-wrap justify-end items-center gap-4">
              {/* Search */}
              <div className="relative w-[200px]">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
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
              <select className="px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Select Language</option>
                <option>English</option>
                <option>Bangla</option>
                <option>Hindi</option>
                <option>Urdu</option>
              </select>

              {/* Date */}
              <div className="flex items-center gap-2 px-2 text-sm font-medium text-gray-900">
                <FaCalendarAlt className="text-blue-600" size={16} />
                <span className="whitespace-nowrap">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date())}
                </span>
              </div>

              {/* Location */}
              <button className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-300 rounded hover:bg-gray-50 transition">
                <IoLocationSharp className="text-red-600" size={18} />
                <span className="text-sm font-semibold text-gray-900">
                  Location
                </span>
              </button>

              {/* Appointment Button */}
              <button
                className="px-5 py-2 text-sm text-white font-bold rounded whitespace-nowrap transition-colors"
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
                  <span>{item.name}</span>
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
    </header>
  );
}
