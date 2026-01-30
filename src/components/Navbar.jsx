import { useState, useEffect, useLayoutEffect } from "react";
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

const LANGUAGE_SELECT_ARROW_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22%23666%22 viewBox=%220 0 20 20%22%3E%3Cpath d=%22M5.5 7l4.5 4.5L14.5 7%22/%3E%3C/svg%3E";

const NAV_ITEMS = [
  { name: "HOME", key: "home", hasDropdown: false },
  { name: "ABOUT US", key: "about", hasDropdown: false },
  { name: "TREATMENT", key: "treatment", hasDropdown: false },
  { name: "DONATE", key: "donate", hasDropdown: false },
  { name: "EVENTS & PROJECTS", key: "events-projects", hasDropdown: false },
  { name: "BLOGS", key: "blogs", hasDropdown: false },
  { name: "E-BOOK", key: "ebook", hasDropdown: false },
  { name: "CAREERS", key: "careers", hasDropdown: false },
  { name: "CONTACT US", key: "locateus", hasDropdown: false },
];

export default function Navbar({ currentPage = "home", onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const mount = document.getElementById("google_translate_mount");
    const STASH_ID = "google_translate_stash";
    const ELEMENT_ID = "google_translate_element";

    let stash = document.getElementById(STASH_ID);

    if (!stash) {
      stash = document.createElement("div");
      stash.id = STASH_ID;
      stash.setAttribute("aria-hidden", "true");
      stash.className = "notranslate";
      stash.style.position = "absolute";
      stash.style.left = "-9999px";
      stash.style.top = "0";
      stash.style.width = "0";
      stash.style.height = "0";
      stash.style.overflow = "hidden";
      document.body.appendChild(stash);
    }

    let element = document.getElementById(ELEMENT_ID);

    if (!element) {
      element = document.createElement("div");
      element.id = ELEMENT_ID;
      stash.appendChild(element);
    }

    if (mount) {
      mount.appendChild(element);
    }

    const applyComboStyling = () => {
      const combo = element?.querySelector(".goog-te-combo");
      if (!combo) return false;

      combo.style.backgroundImage = `url("${LANGUAGE_SELECT_ARROW_DATA_URI}")`;
      combo.style.backgroundRepeat = "no-repeat";
      combo.style.backgroundPosition = "0.75rem center";
      combo.style.backgroundSize = "1.2rem 1.2rem";
      return true;
    };

    if (!applyComboStyling()) {
      const observer = new MutationObserver(() => {
        if (applyComboStyling()) observer.disconnect();
      });

      observer.observe(element, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        const stash = document.getElementById("google_translate_stash");
        const translateElement = document.getElementById(
          "google_translate_element"
        );
        if (stash && translateElement) stash.appendChild(translateElement);
      };
    }

    return () => {
      const stash = document.getElementById("google_translate_stash");
      const translateElement = document.getElementById("google_translate_element");
      if (stash && translateElement) stash.appendChild(translateElement);
    };
  }, []);

  useLayoutEffect(() => {
    const translateElement = document.getElementById("google_translate_element");
    if (!translateElement) return;

    const targetMount = document.getElementById(
      isLanguageMenuOpen ? "google_translate_mount_mobile" : "google_translate_mount"
    );

    if (targetMount) targetMount.appendChild(translateElement);
  }, [isLanguageMenuOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsSearchOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isLanguageMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsLanguageMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLanguageMenuOpen]);

  const handleNavClick = (event, key) => {
    if (key && typeof onNavigate === "function") {
      event.preventDefault();
      onNavigate(key);
    }
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen((open) => !open);
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const handleSearchClose = () => setIsSearchOpen(false);

  const handleLanguageToggle = () => {
    setIsLanguageMenuOpen((open) => !open);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageClose = () => setIsLanguageMenuOpen(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query && typeof onNavigate === "function") {
      onNavigate("blogs", { query });
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="font-sans w-full sticky top-0 z-50">
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={handleSearchClose}
        >
          <div
            className="mx-auto mt-24 w-[92%] max-w-md rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <label htmlFor="mobile-site-search" className="sr-only">
                Search
              </label>
              <input
                id="mobile-site-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 pr-14 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#74C425]/50"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#74C425] p-2 text-white shadow hover:bg-[#155300] transition"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="6" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </button>
            </form>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleSearchClose}
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden ${
          isLanguageMenuOpen ? "" : "hidden"
        }`}
        onClick={handleLanguageClose}
      >
        <div
          id="mobile-language-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-language-dialog-title"
          className="mx-auto mt-24 w-[92%] max-w-md rounded-2xl bg-white p-4 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-4">
            <h2
              id="mobile-language-dialog-title"
              className="text-base font-semibold text-gray-900"
            >
              Select language
            </h2>
            <button
              type="button"
              onClick={handleLanguageClose}
              className="text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              Close
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <div id="google_translate_mount_mobile" className="google-translate-mount" />
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:py-4 md:py-6 bg-gradient-to-r from-white via-white to-[#b7de4e] ml-0 md:ml-12">
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="focus:outline-none flex-shrink-0"
          >
            <img
              src={savemedhaLogo}
              alt="Save Medha Foundation"
              className="h-12 sm:h-14 md:h-25 w-auto object-contain"
            />
          </button>
        </div>

        <div
          className="flex items-center justify-between px-4 py-3 sm:py-4 md:py-6 text-white shadow-md"
          style={{ backgroundColor: COLORS.NAV_GREEN }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((open) => !open);
                setIsSearchOpen(false);
                setIsLanguageMenuOpen(false);
              }}
              aria-label="Toggle navigation menu"
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center ml-0 md:ml-5"
            >
              <svg
                className={`h-6 w-6 sm:h-7 sm:w-7 md:h-10 md:w-10 transition-transform ${
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
           
          </div>

          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mr-0 md:mr-5">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={isSearchOpen}
              onClick={handleSearchToggle}
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10"
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
              aria-expanded={isLanguageMenuOpen}
              aria-controls="mobile-language-dialog"
              onClick={handleLanguageToggle}
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10"
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
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
            >
              <IoLocationSharp className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-[85vw] max-w-[360px] bg-white shadow-2xl overflow-y-auto animate-slideLeft"
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
                      className={`flex items-center gap-4 px-6 py-5 text-[15px] border-b border-gray-100 transition-all duration-200 ${
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
                      href="https://wa.me/919800808595"
                      aria-label="WhatsApp 9800808595"
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
              <form
                onSubmit={handleSearchSubmit}
                className="relative w-[200px] shadow-md"
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
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
              </form>

              {/* Language */}
              <div id="google_translate_mount" className="google-translate-mount" />

              {/* Location */}
              <button
                onClick={() => onNavigate("locateus")}
                className="h-[42px] text-[15px] font-semibold flex items-center gap-2 px-8 py-2 bg-white border-2 border-[#74C425] rounded shadow-md hover:bg-gray-50 transition"
              >
                <IoLocationSharp className="text-[#e05529]" size={18} />
                <span className="font-semibold text-gray-900">Locate us</span>
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
