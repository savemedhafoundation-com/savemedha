import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import savemedhaLogo from "../assets/Photo/SavemedhaLogo.png";

// Custom colors (used via inline style only where Tailwind doesn't support)
const COLORS = {
  NAV_GREEN: "#66b300",
  HOME_BLUE: "#003399",
  ACTION_ORANGE: "#ff6633",
  LIGHT_BG_START: "#e6ffe6",
  LIGHT_BG_END: "#f0fff0",
};

const NAV_ITEMS = [
  { name: "HOME", isActive: true, hasDropdown: false },
  { name: "ABOUT US", isActive: false, hasDropdown: false },
  { name: "TREATMENT", isActive: false, hasDropdown: true },
  { name: "DONATE", isActive: false, hasDropdown: true },
  { name: "EVENTS & PROJECTS", isActive: false, hasDropdown: true },
  { name: "BLOGS", isActive: false, hasDropdown: false },
  { name: "E-BOOK", isActive: false, hasDropdown: false },
  { name: "CAREERS", isActive: false, hasDropdown: false },
  { name: "CONTACT US", isActive: false, hasDropdown: false },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Logo = () => (
    <div className="flex items-center">
      <img
        src={savemedhaLogo}
        alt="Save Medha Foundation Logo"
        className="h-16 w-auto object-contain"
      />
    </div>
  );

  const LocationButton = () => (
    <div className="flex items-center space-x-1 p-2 bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm">Location</span>
    </div>
  );

  const AppointmentButton = () => (
    <button
      className="px-4 py-2 text-sm text-white font-bold rounded-lg shadow-lg"
      style={{ backgroundColor: COLORS.ACTION_ORANGE }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#e05c2a")}
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = COLORS.ACTION_ORANGE)
      }
    >
      Book An Appointment
    </button>
  );

  return (
    <header className="font-sans">
      {/* Top Light Green Gradient Bar */}
      <div
        className="px-4 sm:px-10 py-2"
        style={{
          background: `linear-gradient(to right, ${COLORS.LIGHT_BG_START}, ${COLORS.LIGHT_BG_END})`,
        }}
      >
        {/* Logo + Controls in a single row */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-2">
          <Logo />
          <div className="flex flex-col sm:flex-row items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0 w-full sm:w-auto">
            {/* Search */}
            <form className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="search"
                className="w-full px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            </form>

            {/* Language */}
            <select className="p-2 border border-gray-300 rounded-lg bg-white text-sm appearance-none">
              <option>Select Language</option>
              <option> English</option>
              <option> Bangla</option>
              <option> Hindi</option>
              <option> Urdu</option>
            </select>

            {/* Date */}
            <div className="flex items-center space-x-1 text-sm text-gray-800">
              <FaCalendarAlt className="text-[#003399] text-lg" />
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date("2025-10-22T12:23:00+05:30"))}
              </span>
            </div>

            {/* Location and Appointment Buttons */}
            <div className="flex space-x-2">
              <LocationButton />
              <AppointmentButton />
            </div>
          </div>

          {/* Utility Bar: Phone & Email */}
          <div className="flex items-center space-x-4 mt-2 sm:mt-0 text-sm text-gray-700">
            <div className="flex items-center space-x-1">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502.95l-1.498 4.493A1 1 0 018.28 17H7m-1 7v-7m0 7V8m0 7a7 7 0 007-7V8a7 7 0 00-7-7z"
                />
              </svg>
              <span>9800808595</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-8 h-0.5 bg-[#0078ff] mb-1"></div>
                <MdOutlineMailOutline size={40} color="#0078ff" />
              </div>
              <span className="text-gray-800">
                savemedhafoundation@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className="text-white h-16 md:h-14 px-4 sm:px-10 flex items-center relative"
        style={{ backgroundColor: COLORS.NAV_GREEN }}
      >
        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden pr-4 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        {/* Nav Links */}
        <nav
          className={`md:flex w-full transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "block absolute top-full left-0 z-50 bg-[#559900] shadow-xl"
              : "hidden md:flex"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase().replace(/ /g, "-")}`}
              className={`flex items-center space-x-1 py-4 text-sm font-bold transition duration-150 ease-in-out uppercase ${
                isMenuOpen ? "px-4 w-full border-b border-white/10" : "px-5"
              } ${item.isActive ? "bg-[#003399]" : "hover:bg-black/10"}`}
            >
              <span>{item.name}</span>
              {item.hasDropdown && <span className="text-xs">▼</span>}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
