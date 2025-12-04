import React from "react";
import SmfLogoWhite from "../assets/Photo/smf logo white.02.png";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  AtSign,
  ChevronsRight,
  Mail,
} from "lucide-react";

const Footer = ({ onNavigate }) => {
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
    { name: "CONTACT", href: "#" },
  ];

  const handleLinkClick = (event, link) => {
    if (link.key && typeof onNavigate === "function") {
      event.preventDefault();
      onNavigate(link.key);
    }
  };

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
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-[#74c425] transition-colors"
                >
                  <Facebook className="w-7 h-7" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-[#74c425] transition-colors"
                >
                  <Instagram className="w-7 h-7" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="hover:text-[#74c425] transition-colors"
                >
                  <Linkedin className="w-7 h-7" />
                </a>
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="hover:text-[#74c425] transition-colors"
                >
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
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
                  onSubmit={(event) => event.preventDefault()}
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
                      className="flex-1 text-lg text-gray-800 placeholder:text-gray-500 bg-transparent outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl text-white font-extrabold text-xl py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{
                      background: "#FFFFFF",
                      backgroundImage:
                        "linear-gradient(269.96deg, #498D05 0.03%, #76C528 50%, #448602 99.97%)",
                    }}
                  >
                    SUBSCRIBE
                  </button>
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
    </footer>
  );
};

export default Footer;
