import { useState } from 'react';

import { FaCalendarAlt } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { IoLocationSharp } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';

import savemedhaLogo from '../assets/Photo/SavemedhaLogo.png';

// Custom colors matching the design
const COLORS = {
  NAV_GREEN: "#66b300",
  HOME_BLUE: "#003399",
  ACTION_ORANGE: "#ff6633",
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

  return (
    <header className="font-sans w-full">
      {/* Top Section with White Background */}
      <div
  className="px-4 sm:px-8 lg:px-12 py-3"
  style={{
    background: 'linear-gradient(to right, #ffffff, #e6ffe6)',
  }}
>
        <div className="flex gap-6">
          {/* Logo - Spans both rows */}
          <div className="flex-shrink-0">
            <img
              src={savemedhaLogo}
              alt="Save Medha Foundation Logo"
              className="h-24 w-auto object-contain"
            />
          </div>

          {/* Right side content with 2 rows */}
          <div className="flex-1 flex flex-col">
            {/* Row 1: Phone and Email (Right Aligned) */}
            <div className="flex items-center justify-end gap-6 mb-3 border-b border-gray-200 pb-3">
              {/* Phone */}
              <div className="flex items-center gap-2 text-sm">
                <FiPhone className="text-gray-700" size={16} />
                <span className="font-semibold text-gray-900">9800808595</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-sm">
                <MdOutlineMailOutline className="text-blue-600" size={20} />
                <span className="font-medium text-blue-600">
                  savemedhafoundation@gmail.com
                </span>
              </div>
            </div>

            {/* Row 2: Controls on Right */}
            <div className="flex flex-wrap items-center justify-end gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="search"
                  className="w-48 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Search"
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

              {/* Language Dropdown */}
              <select className="px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Select Language</option>
                <option>English</option>
                <option>Bangla</option>
                <option>Hindi</option>
                <option>Urdu</option>
              </select>

              {/* Date with Calendar Icon */}
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900">
                <FaCalendarAlt className="text-blue-600" size={18} />
                <span className="whitespace-nowrap">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date())}
                </span>
              </div>

              {/* Location Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <IoLocationSharp className="text-red-600" size={18} />
                <span className="text-sm font-semibold text-gray-900">
                  Location
                </span>
              </button>

              {/* Book Appointment Button */}
              <button
                className="px-5 py-2 text-sm text-white font-bold rounded transition-colors whitespace-nowrap"
                style={{ backgroundColor: COLORS.ACTION_ORANGE }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#e05529")}
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

      {/* Main Navigation Bar - Green with Blue HOME */}
      <div
        className="text-white px-4 sm:px-8 lg:px-12 relative"
        style={{ backgroundColor: COLORS.NAV_GREEN }}
      >
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden py-4 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={`#${item.name.toLowerCase().replace(/ /g, "-")}`}
              className={`flex items-center gap-1 px-5 py-4 text-sm font-bold uppercase transition-colors ${
                item.isActive
                  ? "text-white"
                  : "text-white hover:bg-black hover:bg-opacity-10"
              }`}
              style={
                item.isActive ? { backgroundColor: COLORS.HOME_BLUE } : {}
              }
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
          ))}
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 w-full z-50 shadow-xl" style={{ backgroundColor: COLORS.NAV_GREEN }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase().replace(/ /g, "-")}`}
                className={`flex items-center justify-between px-4 py-4 text-sm font-bold uppercase border-b border-white border-opacity-10 ${
                  item.isActive ? "bg-blue-900" : "hover:bg-black hover:bg-opacity-10"
                }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <svg
                    className="w-3 h-3"
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
            ))}
          </nav>
        )}
      </div>
    </header>
  );
} 