import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchEbooks } from "../service/api";
import {
  getEbookSlug,
  normalizeEbook,
  normalizeEbookResponse,
} from "../utils/ebook";
import { fallbackEbooks } from "../data/ebookFallback";
import heroFallbackCover from "../assets/Photo/BOOK1 1.png";
import heroBackdrop from "../assets/Photo/WHITEBOARD.png";
import greenElement from "../assets/Photo/ELEMENT (1).png";
import demoEbookCover from "../assets/Photo/3.jpg";
import demoKindleCover from "../assets/Photo/5.jpg";
import downloadButtonImage from "../assets/Photo/downloads.png";
import amazonButtonImage from "../assets/Photo/amazon.png";
import faqBookImage from "../assets/Photo/bookb.png";
import contentCoverOne from "../assets/Photo/bookcover1.png";
import contentTocLayout from "../assets/Photo/Table of contents layout in green.png";
import contentCoverThree from "../assets/Photo/bookcover3.png";
import contentCoverTwo from "../assets/Photo/Rectangle 711.png";

const PAGE_SIZE = 9;
const HERO_FALLBACK_COVER = heroFallbackCover;
const HIGHLIGHTS = [
  "Real-world clinical experience built into every chapter.",
  "Science-backed insights without confusing medical jargon.",
  "Nutrition guidance that connects habits with healing.",
  "Clear myths vs facts with step-by-step learning.",
  "Written for individuals, caregivers, and families.",
  "Download and share with no cost or barriers.",
];
const FAQ_ITEMS = [
  "Who are these e-books intended for?",
  "Is the information evidence-based or opinion based?",
  "Can I apply the recommendations directly to my health condition?",
  "Why are these e-books offered for free?",
  "Are these e-books regularly updated?",
];

export default function EbookPage({ onNavigate }) {
  const [page, setPage] = useState(1);
  const [ebooks, setEbooks] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadEbooks = async () => {
      setStatus("loading");
      setError("");
      try {
        const response = await fetchEbooks();
        if (!isMounted) return;
        const rawItems = normalizeEbookResponse(response);
        setEbooks(rawItems.map(normalizeEbook));
        setStatus("success");
      } catch (err) {
        console.error("Failed to load ebooks:", err);
        if (!isMounted) return;
        const fallbackItems = fallbackEbooks.map(normalizeEbook);
        setEbooks(fallbackItems);
        setStatus("success");
      }
    };

    loadEbooks();

    return () => {
      isMounted = false;
    };
  }, [reloadToken]);

  const totalPages = Math.max(1, Math.ceil(ebooks.length / PAGE_SIZE));

  useEffect(() => {
    setPage((current) => Math.min(Math.max(current, 1), totalPages));
  }, [totalPages]);

  const visibleEbooks = useMemo(() => {
    const end = page * PAGE_SIZE;
    return ebooks.slice(0, end);
  }, [page, ebooks]);

  const heroBook = ebooks[0] || {};
  const heroCover = HERO_FALLBACK_COVER;
  const heroDownloadName = getEbookSlug(heroBook) || "ebook";
  const heroDownloadLink = heroBook.downloadLink;
  const heroDownloadDisabled = !heroDownloadLink;
  const showLoadingInline = status === "loading";
  const showErrorInline = status === "error";
  const showEmptyInline = status === "success" && ebooks.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main className="bg-white ebook-main">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f2ffe0] via-white to-[#eefed4]">
          <div
            className="absolute -top-16 -left-16 h-44 w-44 rounded-full bg-[#74C425]/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#74C425]/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rounded-full bg-[#a8f066]/40 blur-2xl"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]  ">
              <div>
                <span className="inline-flex items-center rounded-full bg-[#74C425]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#3c7d13]">
                  100% Free Downloads
                </span>
                <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
                  <span className="block">E-Books</span>
                  <span className="block text-[#74C425]">
                    & Research Publications
                  </span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">
                  Educational resources from Save Medha Foundation grounded in
                  Natural Immunotherapy, nutrition science, and real clinical
                  experience.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full flex-1 rounded-full border border-[#cbe9a2] bg-white/90 px-5 py-3 text-sm text-slate-800 shadow-sm focus:border-[#74C425] focus:outline-none focus:ring-2 focus:ring-[#74C425]/30 sm:w-auto"
                  />
                  <a
                    href={heroDownloadLink || undefined}
                    download={
                      heroDownloadDisabled ? undefined : `${heroDownloadName}.pdf`
                    }
                    aria-disabled={heroDownloadDisabled}
                    tabIndex={heroDownloadDisabled ? -1 : undefined}
                    className={`inline-flex items-center justify-center rounded-full bg-[#74C425] px-6 py-3 text-sm font-semibold font-poppins text-white shadow-md transition hover:bg-[#4b8f1c] ${
                      heroDownloadDisabled ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    Download Free E-Book
                  </a>
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  We only send the download link. No spam.
                </p>
              </div>
              <div
                  className="pointer-events-none absolute inset-0 left-240 translate-y-30 flex justify-center"
                  aria-hidden="true"
                >
                  <img
                    src={heroBackdrop}
                    alt=""
                    className="h-80 w-full max-w-[1060px]  opacity-95"
                    loading="lazy"
                  />
                </div>

              <div className="relative flex justify-center lg:justify-end">
                
                <div
                  className="absolute -top-6 right-8 hidden h-24 w-24 rounded-full border border-[#74C425]/30 sm:block"
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <div
                    className="absolute -bottom-5 -right-5 h-24 w-24 rounded-3xl bg-[#74C425]/20"
                    aria-hidden="true"
                  />
                  <img
                    src={heroCover}
                    alt={heroBook.title || "E-book cover"}
                    className="relative z-10 w-60 sm:w-72 lg:w-80"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[#74C425]">
          <div className="absolute inset-0 overflow-hidden " aria-hidden="true">
            <div className="absolute -left-16 bottom-10  h-44 w-44 rounded-full bg-[#9be55b]/70 blur-3xl" />
            <div className="absolute right-0 top-8 h-56 w-56 rounded-full bg-[#5aa81f]/60 blur-3xl " />
            <img
              src={greenElement}
              alt=""
              className="absolute bottom-6 right-8 hidden w-90 scale-160 -translate-x-15 -translate-y-10 opacity-85 sm:block"
              loading="lazy"
            />
            <img
              src={greenElement}
              alt=""
              className="absolute bottom-6 left-8 hidden w-90 scale-160 translate-x-10 -translate-y-80 opacity-85 sm:block"
              loading="lazy"
            />
          </div>
          
          <div className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
            <div className="relative -mt-10 -mb-16  bg-[#DCFFB9] px-6 py-8 text-center  -translate-y-30">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                <span className="block">What Will You Get From</span>
                <span className="block text-[#2F5905]">Our E-Book?</span>
              </h2>
              <p className="mt-3 text-sm text-slate-700 sm:text-base">
                Understand Natural Immunotherapy and nutrition science in
                simple, actionable terms.
              </p>
              <div className="mt-6 grid gap-4 text-left sm:grid-cols-1">
                {HIGHLIGHTS.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex gap-5 "
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#74C425] text-white">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 0 1 0 1.414l-7.424 7.425a1 1 0 0 1-1.414 0L3.296 9.713a1 1 0 1 1 1.414-1.414l3.162 3.161 6.717-6.717a1 1 0 0 1 1.414 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              <a
                href="#ebook-library"
                className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#74C425] shadow-md transition hover:scale-105"
                aria-label="Scroll to ebook library"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section id="ebook-library" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-6xl">
                E-Books
              </h2>
              <p className="mt-2 text-lg sm:text-6xl font-bold font-poppins text-[#74C425]">
                & Research Publications
              </p>
              
            </div>

            {showErrorInline && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
                <button
                  type="button"
                  onClick={() => setReloadToken((token) => token + 1)}
                  className="ml-3 rounded-full bg-[#74C425] px-3 py-1 text-xs font-semibold text-white hover:bg-[#155300]"
                >
                  Retry
                </button>
              </div>
            )}

            {showLoadingInline && (
              <div className="mt-8 text-sm font-semibold text-slate-600">
                Loading e-books...
              </div>
            )}

            {showEmptyInline && (
              <div className="mt-8 text-sm text-slate-600">
                No e-books available right now.
              </div>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleEbooks.map((book) => (
                <div
                  key={book.id}
                  className="group w-[400px] h-[720px]  border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="p-5">
                    <div className="aspect-[3/4] overflow-hidden  ">
                      <img
                        src={book.cover || HERO_FALLBACK_COVER}
                        alt={book.title}
                        className="h-full w-full  object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-semibold font-poppins text-slate-900">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-xs font-roboto-regular text-slate-500">
                        By {book.author}
                      </p>
                      <p className="mt-3 text-sm text-slate-700 line-clamp-3">
                        {book.desc}
                      </p>

                      {(book.pages || book.readTime) && (
                        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                          {book.pages && (
                            <span className="rounded-full bg-slate-100 px-3 py-1">
                              {book.pages}
                            </span>
                          )}
                          {book.readTime && (
                            <span className="rounded-full bg-slate-100 px-3 py-1">
                              {book.readTime}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-4 grid gap-2">
                        <Link
                          to={book.readLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-[#6bc12f] px-4 py-2 text-sm font-semibold font-poppins text-white shadow-sm transition hover:bg-[#4b8f1c]"
                        >
                          Read Online
                        </Link>
                        <a
                          href={book.downloadLink || undefined}
                          download={
                            book.downloadLink
                              ? `${book.slug || book.id}.pdf`
                              : undefined
                          }
                          aria-disabled={!book.downloadLink}
                          tabIndex={book.downloadLink ? undefined : -1}
                          className={`inline-flex items-center justify-center border border-[#6bc12f] px-4 py-2 text-sm font-semibold font-poppins text-[#3c7d13] transition hover:bg-[#f0ffe0] ${
                            book.downloadLink ? "" : "cursor-not-allowed opacity-60"
                          }`}
                        >
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {page < totalPages && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#9be55b] to-[#5aa81f] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:from-[#8adf49] hover:to-[#4b9619]"
                >
                  Load More
                </button>
              </div>
            )}

           
            <div className="mt-12   bg-white px-6 py-10 text-center shadow-sm sm:px-10">
              <div className="mx-auto max-w-3xl">
                <h3 className="text-2xl font-bold text-slate-900">
                  Can I trust your E-Book?
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  Developed by Save Medha Foundation, these resources are based
                  on established nutrition science, Natural Immunotherapy
                  principles, and documented clinical experience.
                </p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className=" border border-[#cbe9a2] bg-[linear-gradient(180deg,_#F2FFE4_0%,_#F3F5F2_51.92%,_#C8DAB6_100%)] p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold font-poppins uppercase tracking-[0.2em] text-[#2f5905]">
                    <span className="block">Get Free</span>
                    <span className="block">Download</span>
                  </p>
                  <div className="mt-4 overflow-hidden  border border-white bg-white shadow">
                    <img
                      src={demoEbookCover}
                      alt="Demo free ebook cover"
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center justify-center font-poppins"
                    aria-label="Download"
                  >
                    <img
                      src={downloadButtonImage}
                      alt="Download"
                      className="h-[55px] w-[55px] translate-y-28"
                      loading="lazy"
                    />
                  </button>
                </div>

                <div className="border border-[#e1e1e1] bg-[linear-gradient(180deg,_#F2FFE4_0%,_#F3F5F2_51.92%,_#C8DAB6_100%)] p-6 text-center shadow-sm">
                  <p className="text-xs font-semibold font-poppins uppercase tracking-[0.2em] text-slate-700">
                    <span className="block">BUY ON </span>
                    <span className="block">AMAZON KINDLE</span>
                  </p>
                  <div className="mt-4 overflow-hidden bg-white shadow">
                    <img
                      src={demoKindleCover}
                      alt="Demo Kindle cover"
                      className="h-50 w-full object-cover "
                      loading="lazy"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-4 py-5 inline-flex items-center justify-center font-poppins"
                    aria-label="Amazon Store"
                  >
                    <img
                      src={amazonButtonImage}
                      alt="Amazon Store"
                      className="h-[55px] w-[55px] translate-y-18"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 max-w-3xl text-sm text-slate-500">
              <p>
                These e-books are provided for educational purposes only. They
                are not a replacement for emergency medical care. The content
                reflects research and clinical experience from Natural
                Immunotherapy practice under Save Medha Foundation.
              </p>
            </div>

            <section
              className="relative mt-12 overflow-hidden bg-no-repeat bg-center bg-cover px-6 py-10 shadow-sm sm:px-10"
              style={{
                backgroundImage: `url(${faqBookImage})`,
              }}
            >
              <div className="absolute inset-0 bg-white/200" aria-hidden="true" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#74C425]">
                    Frequently Asked Questions
                  </h3>
                  <div className="mt-6 space-y-4 text-sm text-slate-700">
                    {FAQ_ITEMS.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3"
                      >
                        <span className="font-medium">
                          {index + 1}. {item}
                        </span>
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#74C425]/10 text-[#74C425]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block" />
              </div>
            </section>
          </div>
        </section>
        <section className="mt-12">
          <div className="overflow-hidden   bg-[linear-gradient(180deg,_#74C425_0%,_#5DAC0E_55%,_#3D6C0D_100%)] px-6 py-10  sm:px-10">
            <h3 className="text-center text-2xl font-semibold uppercase tracking-[0.25em] text-white sm:text-4xl sm:tracking-[0.35em]">
              Our Content
            </h3>
            <div className="mt-8  p-6">
              <div className="grid items-center gap-6 md:grid-cols-3">
                <img
                  src={contentCoverOne}
                  alt="E-book preview"
                  className="mx-auto h-56 w-auto object-contain shadow-lg translate-x-35"
                  loading="lazy"
                />
                <img
                  src={contentTocLayout}
                  alt="E-book preview"
                  className="mx-auto h-56 w-auto object-contain shadow-lg"
                  loading="lazy"
                />
                <img
                  src={contentCoverThree}
                  alt="E-book preview"
                  className="mx-auto h-56 w-auto object-contain shadow-lg -translate-x-34"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-4xl text-left">
              <div className="h-2 w-full rounded-full bg-white/30">
                <div className="h-full w-1/3 rounded-full bg-[#bffb7a]" />
              </div>
              <p className="mt-2 text-xs text-white/80">Pages 1 of 25</p>
            </div>
          </div>
          <div>
            <img
              src={contentCoverTwo}
              alt="cover"
              className="mx-auto  h-auto w-auto object-contain shadow-lg  scale-b-150"
              loading="lazy"
            />

            
          </div>
        </section>

      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
