import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import { ImWhatsapp } from "react-icons/im";
import { CgArrowLongUpL } from "react-icons/cg";
import { FaPinterestP } from "react-icons/fa";

import HeartIllustration from "../assets/SMF BY BRATIN/344812776_11424076 1.png";

const SMF_LOGO_WHITE_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_300/v1770272640/smf_logo_white.02_eabqf7.png";

const companyLinks = [
  { name: "Home", key: "home", href: "/" },
  { name: "About Us", key: "about", href: "/about-us" },
  { name: "Treatment", key: "treatment", href: "/treatment" },
  { name: "Careers", key: "careers", href: "/careers" },
];

const resourceLinks = [
  { name: "Blogs", key: "blogs", href: "/blogs" },
  { name: "E-Books", key: "ebook", href: "/ebook" },
  { name: "Events & Projects", key: "events-projects", href: "/events-projects" },
  { name: "Student Social Work", key: "student-social-work", href: "/student-social-work" },
  { name: "Donate", key: "donate", href: "/donate" },
  { name: "Contact", key: "locateus", href: "/contact-us" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/savemedhafoundation",
    icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@savemedhafoundation7959",
    icon: Youtube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/savemedhafoundation/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/save-medha-foundation/",
    icon: Linkedin,
  },
];

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
      setNewsletterStatus("Please enter a valid email.");
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

  const renderFooterLink = (link) => (
    <a
      key={link.name}
      href={link.href}
      onClick={(event) => handleLinkClick(event, link)}
      className="block text-[13px] font-medium leading-7 text-white/82 transition hover:text-[#7cff4b]"
    >
      - {link.name}
    </a>
  );

  return (
    <footer className="relative mt-24 bg-[#003f19] text-white">
      <div className="relative mx-auto max-w-[980px] px-5 pt-1">
        <div className="relative mx-auto -mt-16 max-w-[780px] rounded-[18px] bg-[#30bd16] px-6 pb-10 pt-10 shadow-[0_22px_45px_rgba(0,0,0,0.22)] sm:px-10 sm:pb-12 sm:pt-12 lg:px-14">
          <img
            src={HeartIllustration}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-24 w-[210px] select-none sm:-left-6 sm:-top-28 sm:w-[250px]"
            loading="lazy"
          />

          <div className="ml-auto max-w-[520px] text-left">
            <h2 className="text-[22px] font-black leading-tight text-white sm:text-[26px]">
              Subscribe to our newsletter
              <br />
              to get updates.
            </h2>
            <p className="mt-4 text-[13px] font-semibold text-white/85">
              Stay updated with us.
            </p>

            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleNewsletterSubmit}
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex min-h-[42px] flex-1 items-center gap-2 rounded-full bg-white px-4 text-slate-700">
                <AtSign className="h-4 w-4 text-slate-500" />
                <input
                  id="footer-newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  className="w-full bg-transparent text-[13px] font-semibold outline-none placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingNewsletter}
                className="min-h-[42px] rounded-full bg-white px-7 text-[12px] font-black text-[#14980f] transition hover:bg-[#e9ffe4] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmittingNewsletter ? "Subscribing" : "Subscribe"}
              </button>
            </form>

            <p className="mt-5 text-[10px] font-medium leading-4 text-white/78">
              You will be able to unsubscribe at any time.
              <br />
              Read our privacy policy here.
            </p>
            {newsletterStatus && (
              <p
                aria-live="polite"
                className={`mt-3 text-[12px] font-black ${
                  newsletterStatus.toLowerCase().includes("success")
                    ? "text-white"
                    : "text-red-100"
                }`}
              >
                {newsletterStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[980px] gap-10 px-5 pb-12 pt-12 sm:grid-cols-[1.1fr_0.7fr_0.8fr] sm:pt-14">
        <div>
          <img
            src={SMF_LOGO_WHITE_URL}
            alt="Save Medha Foundation logo"
            className="h-16 w-auto object-contain"
          />
          <p className="mt-5 max-w-[300px] text-[13px] font-semibold leading-5 text-white/86">
            "Transforming cancer care through Natural Immunotherapy - where
            healing begins with your own immune power."
          </p>
          <div className="mt-8 flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="text-white transition hover:text-[#7cff4b]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href="https://wa.me/919800808595"
              aria-label="WhatsApp"
              target="_blank"
              rel="noreferrer"
              className="text-white transition hover:text-[#7cff4b]"
            >
              <ImWhatsapp className="h-4 w-4" />
            </a>
            <a
              href="https://pin.it/1tneqIjW6"
              aria-label="Pinterest"
              target="_blank"
              rel="noreferrer"
              className="text-white transition hover:text-[#7cff4b]"
            >
              <FaPinterestP className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[16px] font-black text-white">Company</h3>
          {companyLinks.map(renderFooterLink)}
        </div>

        <div>
          <h3 className="mb-4 text-[16px] font-black text-white">Resources</h3>
          {resourceLinks.map(renderFooterLink)}
        </div>
      </div>

      <div className="border-t border-white/8 px-5 py-5 text-center">
        <a
          href="/terms-conditions-apply"
          onClick={handleTermsClick}
          className="text-[12px] font-medium text-white/80 transition hover:text-[#7cff4b]"
        >
          Terms &amp; Conditions Apply
        </a>
      </div>

      <div className="bg-[#19a812] px-5 py-4 text-center">
        <p className="text-[12px] font-semibold text-white">
          © 2026 Save Medha Foundation. All rights reserved.
        </p>
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        {showTopButton && (
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#25D366] bg-white text-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform duration-200 hover:scale-105 md:h-12 md:w-12"
          >
            <CgArrowLongUpL className="h-6 w-6" />
          </button>
        )}
        <a
          href="https://wa.me/919800808595"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp: 9800808595"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-200 hover:scale-105 md:h-14 md:w-14"
        >
          <ImWhatsapp className="h-6 w-6 md:h-7 md:w-7" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
