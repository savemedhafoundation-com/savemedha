import React, { useEffect, useState } from "react";
import axios from "axios";
import SmfLogoWhite from "../assets/Photo/smf logo white.02.png";
import SavemedhaLogo from "../assets/Photo/SavemedhaLogo.png";
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
    { name: "HOME", key: "home" },
    { name: "ABOUT US", key: "about" },
    { name: "TREATMENT", key: "treatment" },
    { name: "DONATE", href: "#" },
    { name: "EVENTS & PROJECTS", href: "#" },
  ];

  const navLinks2 = [
    { name: "BLOGS", key: "blogs" },
    { name: "E-BOOK", href: "#" },
    { name: "CAREERS", href: "#" },
    { name: "CONTACT", key: "locateus" },
  ];
  const mobileLinks = [...navLinks1, ...navLinks2];

  const handleLinkClick = (event, link) => {
    if (link.key && typeof onNavigate === "function") {
      event.preventDefault();
      onNavigate(link.key);
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

  return (
    <footer className="bg-[#2d332e] text-white">
      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="px-6 py-10 space-y-8">
          <div className="flex justify-center">
            <img
              src={SavemedhaLogo}
              alt="Save Medha Foundation logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          <p className="text-center text-gray-100 italic text-lg leading-relaxed">
            “Transforming cancer care through Natural Immunotherapy — where
            healing begins with your own immune power.”
          </p>

          <div className="grid grid-cols-2 ml-25  gap-y-4 text-sm font-semibold tracking-wide">
            {mobileLinks.map((link, idx) => (
              <a
                key={`${link.name}-${idx}-mobile`}
                href={link.href ?? "#"}
                onClick={(event) => handleLinkClick(event, link)}
                className="flex items-center gap-2 text-white hover:text-[#9bd853] transition-colors"
              >
                <ChevronsRight className="w-3.5 h-3.5 text-white/80" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="bg-white text-gray-800 rounded-3xl shadow-xl p-6 -mx-6 sm:mx-0 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold italic text-gray-900">
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

	            <form
	              className="space-y-3"
	              onSubmit={handleNewsletterSubmit}
	            >
	              <label htmlFor="newsletter-email-mobile" className="sr-only">
	                Email address
	              </label>
	              <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-[#6dcf27] bg-white">
	                <AtSign className="w-5 h-5 text-gray-500" />
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
	                className="w-full rounded-lg text-white font-bold text-base py-3 shadow-lg hover:shadow-xl transition-all duration-200"
	                style={{
	                  background:
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

          <div className="space-y-3">
            <div className="text-center text-sm tracking-[0.2em] uppercase text-white/90">
              Follow us:
            </div>
            <div className="flex items-center justify-center gap-6 text-white">
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
                href="https://wa.me/9800808595"
                aria-label="WhatsApp"
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
            </div>
          </div>

          <div className="text-center text-white text-base space-y-2">
            <div>Terms &amp; Conditions Apply</div>
          </div>
        </div>

        <div className="bg-black py-4 px-6 text-center text-white text-sm mt-6">
          Copyright &copy;2025 Save Medha Foundation
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
                    src={SmfLogoWhite}
                    alt="Save Medha Foundation logo"
                    className="w-full max-h-28 object-contain"
                  />
                </div>

                <p className="text-gray-200 italic text-lg leading-relaxed">
                  &ldquo;Transforming cancer care through Natural Immunotherapy
                  &mdash; where healing begins with your own immune power.&rdquo;
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 text-lg font-semibold self-center">
                <div className="space-y-4">{navLinks1.map(renderNavLink)}</div>
                <div className="space-y-4">{navLinks2.map(renderNavLink)}</div>
              </div>

              <div className="w-full">
                <div className="bg-white text-gray-800 rounded-[28px] shadow-2xl p-6 sm:p-8 space-y-5 w-full sm:max-w-[520px] lg:max-w-[440px] xl:max-w-[460px] mx-auto lg:ml-auto">
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
              Terms &amp; Conditions Apply
            </div>
          </div>
        </div>

        <div className="bg-black py-4 px-6 sm:px-10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white text-base">
              Copyright &copy;2025 Save Medha Foundation
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
          href="https://wa.me/9800808595"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 hover:scale-105 transition-transform duration-200"
        >
          <ImWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
