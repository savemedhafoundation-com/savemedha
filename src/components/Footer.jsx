import React, { useEffect, useState } from "react";
import axios from "axios";
const SMF_LOGO_WHITE_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770272640/smf_logo_white.02_eabqf7.png";
const SEND_ICON_URL =
  "https://res.cloudinary.com/savemedha/image/upload/v1770272637/send_demitw.png";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  AtSign,
  ChevronsRight,
  Mail,
  Menu,
  CalendarDays,
  MessageCircle,
  Languages,
  MapPin,
} from "lucide-react";
import { ImWhatsapp } from "react-icons/im";
import { CgArrowLongUpL } from "react-icons/cg";
import { FaPinterestP } from "react-icons/fa";

const Footer = ({ onNavigate }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterStatus(null);

    const email = newsletterEmail.trim();
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    if (!isValidEmail) {
      setNewsletterStatus("Subscription failed. Please try again.");
      return;
    }

    try {
      setIsSubmittingNewsletter(true);
      await axios.post("https://savemedhabackend.vercel.app/api/newsletter", {
        email,
      });
      setNewsletterEmail("");
      setNewsletterStatus("Subscribed successfully.");
    } catch {
      setNewsletterStatus("Subscription failed. Please try again.");
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const navLinks1 = [
    { name: "HOME", key: "home", href: "/" },
    { name: "ABOUT US", key: "about", href: "/about-us" },
    { name: "TREATMENT", key: "treatment", href: "/treatment" },
    { name: "DONATE", key: "donate", href: "/donate" },
    { name: "EVENTS & PROJECTS", key: "events-projects", href: "/events-projects" },
  ];

  const navLinks2 = [
    { name: "BLOGS", key: "blogs", href: "/blogs" },
    { name: "E-BOOK", key: "ebook", href: "/ebook" },
    { name: "CAREERS", key: "careers", href: "/careers" },
    { name: "CONTACT", key: "locateus", href: "/contact-us" },
  ];

  const handleLinkClick = (event, link) => {
    if (link.key && typeof onNavigate === "function") {
      event.preventDefault();
      onNavigate(link.key);
    }
  };

  const handleTermsClick = (event) => {
    if (typeof onNavigate === "function") {
      event.preventDefault();
      onNavigate("terms-conditions-apply");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setShowTopButton(scrolled > 0.6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLink = (link, idx) => (
    <a
      key={`${link.name}-${idx}`}
      href={link.href ?? "#"}
      onClick={(event) => handleLinkClick(event, link)}
      className="group flex items-center gap-3 text-white text-lg tracking-wide hover:text-[#74c425] transition-colors"
    >
      <ChevronsRight className="w-4 h-4 text-gray-200 group-hover:text-[#74c425] transition-colors" />
      <span className="group-hover:text-[#74c425] transition-colors">
        {link.name}
      </span>
    </a>
  );

  const renderMobileLink = (link, idx) => (
    <a
      key={`${link.name}-${idx}-mobile`}
      href={link.href ?? "#"}
      onClick={(event) => handleLinkClick(event, link)}
      className="group flex items-center gap-3 text-white/95 text-base font-semibold tracking-wide hover:text-[#9bd853] transition-colors"
    >
      <ChevronsRight className="w-4 h-4 text-white/70 group-hover:text-[#9bd853] transition-colors" />
      <span>{link.name}</span>
    </a>
  );

  return (
    <footer className="bg-[#181414] text-white">
      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="px-6 pt-12 pb-10">
          <div className="flex justify-center">
            <img
              src={SMF_LOGO_WHITE_URL}
              alt="Save Medha Foundation logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          <p className="mt-6 text-center text-gray-100 italic text-lg leading-relaxed">
            “Transforming cancer care through Natural Immunotherapy — where
            healing begins with your own immune power.”
          </p>

          <div className="mt-10 bg-white text-gray-800 rounded-3xl shadow-xl p-6 space-y-4 relative z-0 overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900">
                  Subscribe to our Newsletter!
                </h3>
                <p className="text-sm text-gray-600">
                  Subscribe to our newsletter and stay updated.
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-[#f15f42] rounded-2xl shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>

            <img
              src={SEND_ICON_URL}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-16 w-24 opacity-70 select-none -z-10 !mt-0"
              loading="lazy"
            />

	            <form
	              className="space-y-3"
	              onSubmit={handleNewsletterSubmit}
	            >
	              <label htmlFor="newsletter-email-mobile" className="sr-only">
	                Email address
	              </label>
	              <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#6dcf27] bg-white">
	                <AtSign className="w-8 h-8 text-gray-500" />
	                <input
	                  id="newsletter-email-mobile"
	                  type="email"
	                  placeholder="Your email"
	                  value={newsletterEmail}
	                  onChange={(event) => setNewsletterEmail(event.target.value)}
	                  className="flex-1 text-sm text-gray-800 placeholder:text-gray-500 bg-transparent outline-none"
	                />
	              </div>
	              <button
	                type="submit"
	                disabled={isSubmittingNewsletter}
	                className="w-full sm:w-fit sm:px-10 rounded-full text-white font-bold text-base py-3 shadow-lg hover:shadow-xl transition-all duration-200"
	                style={{
	                  background:
	                    "linear-gradient(269.96deg, #498D05 0.03%, #76C528 50%, #448602 99.97%)",
	                }}
	              >
	                SUBSCRIBE
	              </button>
	              {newsletterStatus && (
	                <div
	                  aria-live="polite"
	                  className={`text-sm ${
	                    newsletterStatus.toLowerCase().includes("success")
	                      ? "text-green-700"
	                      : "text-red-600"
	                  }`}
	                >
	                  {newsletterStatus}
	                </div>
	              )}
	            </form>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6">
            <div className="space-y-4">{navLinks1.map(renderMobileLink)}</div>
            <div className="space-y-4">{navLinks2.map(renderMobileLink)}</div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-7 text-white">
            <a
              href="https://www.facebook.com/savemedhafoundation"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9bd853] transition-colors"
            >
              <Facebook className="w-7 h-7" />
            </a>
            <a
              href="https://www.instagram.com/savemedhafoundation/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9bd853] transition-colors"
            >
              <Instagram className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/company/save-medha-foundation/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9bd853] transition-colors"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            <a
              href="https://wa.me/919800808595"
              aria-label="WhatsApp 9800808595"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9bd853] transition-colors"
            >
              <ImWhatsapp className="w-7 h-7" />
            </a>
            <a
              href="https://www.youtube.com/@savemedhafoundation7959"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9bd853] transition-colors"
            >
              <Youtube className="w-7 h-7" />
            </a>
            <a
              href="https://pin.it/1tneqIjW6"
              aria-label="Pinterest"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9bd853] transition-colors"
            >
              <FaPinterestP className="w-7 h-7" />
            </a>
          </div>

          <div className="mt-10 text-center text-white/90 text-xl font-medium">
            <a
              href="/terms-conditions-apply"
              onClick={handleTermsClick}
              className="hover:text-[#9bd853] transition-colors"
            >
              Terms &amp; Conditions Apply
            </a>
          </div>
        </div>

        <div className="bg-black py-4 px-6 text-center text-white text-sm mt-6">
          Copyright &copy;2026 Save Medha Foundation
        </div>
      </div>

      {/* Desktop / laptop layout */}
      <div className="hidden lg:block">
        <div className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
          <div className="max-w-8xl mx-auto">
            <div className="grid gap-12 lg:gap-16 xl:grid-cols-[1.05fr_0.9fr_1.1fr]">
              <div className="flex flex-col gap-10">
                <div className="max-w-[260px] w-full ">
                  <img
                    src={SMF_LOGO_WHITE_URL}
                    alt="Save Medha Foundation logo"
                    className="w-full max-h-28 object-contain"
                  />
                </div>

                <p className="text-gray-200 italic text-lg leading-relaxed">
                  &ldquo;Transforming cancer care through Natural Immunotherapy;
                   where healing begins with your own immune power.&rdquo;
                </p>

                <div className="flex items-center gap-5 text-white">
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
                  <a
                    href="https://pin.it/1tneqIjW6"
                    aria-label="Pinterest"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#74c425] transition-colors"
                  >
                    <FaPinterestP className="w-7 h-7" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 text-lg font-semibold self-center">
                <div className="space-y-4">{navLinks1.map(renderNavLink)}</div>
                <div className="space-y-4">{navLinks2.map(renderNavLink)}</div>
              </div>

              <div className="w-full">
                <div className="bg-white text-gray-800 rounded-[28px] shadow-2xl p-6 sm:p-8 space-y-5 w-full sm:max-w-[520px] lg:max-w-[440px] xl:max-w-[460px] mx-auto lg:ml-auto relative z-0 overflow-hidden">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900">
                      Subscribe to
                      <br className="hidden sm:block" />
                      our Newsletter!
                    </h3>
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-[#f15f42] rounded-2xl shadow-lg">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <p className="text-base text-gray-600">
                    Subscribe to our newsletter and stay updated.
                  </p>
                  <img
                    src={SEND_ICON_URL}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute right-8 top-20 w-32 opacity-60 select-none -z-10"
                    loading="lazy"
                  />
	                  <form
	                    className="space-y-4"
	                    onSubmit={handleNewsletterSubmit}
	                  >
	                    <label htmlFor="newsletter-email" className="sr-only">
	                      Email address
	                    </label>
	                    <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#6dcf27] bg-white">
	                      <AtSign className="w-5 h-5 text-gray-500" />
	                      <input
	                        id="newsletter-email"
	                        type="email"
	                        placeholder="Your email"
	                        value={newsletterEmail}
	                        onChange={(event) =>
	                          setNewsletterEmail(event.target.value)
	                        }
	                        className="flex-1 text-lg text-gray-800 placeholder:text-gray-500 bg-transparent outline-none"
	                      />
	                    </div>
	                    <button
	                      type="submit"
	                      disabled={isSubmittingNewsletter}
	                      className="w-full rounded-xl text-white font-extrabold text-xl py-3 shadow-lg hover:shadow-xl transition-all duration-200"
	                      style={{
	                        background: "#FFFFFF",
	                        backgroundImage:
	                          "linear-gradient(269.96deg, #498D05 0.03%, #76C528 50%, #448602 99.97%)",
	                      }}
	                    >
	                      SUBSCRIBE
	                    </button>
	                    {newsletterStatus && (
	                      <div aria-live="polite">{newsletterStatus}</div>
	                    )}
	                  </form>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center text-gray-300 text-sm tracking-wide">
              <a
                href="/terms-conditions-apply"
                onClick={handleTermsClick}
                className="hover:text-[#74c425] transition-colors"
              >
                Terms &amp; Conditions Apply
              </a>
            </div>
          </div>
        </div>

        <div className="bg-black py-4 px-6 sm:px-10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white text-base">
              Copyright &copy;2026 Save Medha Foundation
            </p>
          </div>
        </div>
      </div>

      {/* Fixed action buttons */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
        {showTopButton && (
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-[#25D366] border border-[#25D366] shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-transform duration-200"
          >
            <CgArrowLongUpL className="w-6 h-6 md:w-6 md:h-6" />
          </button>
        )}
        <a
          href="https://wa.me/919800808595"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp: 9800808595"
          className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:scale-105 transition-transform duration-200"
        >
          <ImWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
