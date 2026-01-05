import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ebooks } from "../data/ebooks";
import heroFallbackCover from "../assets/Photo/BOOK1 1.png";

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

const getSlugFromReadLink = (readLink) => {
  if (typeof readLink !== "string") return "";
  const parts = readLink.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
};

export default function EbookPage({ onNavigate }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(ebooks.length / PAGE_SIZE));

  useEffect(() => {
    setPage((current) => Math.min(Math.max(current, 1), totalPages));
  }, [totalPages]);

  const visibleEbooks = useMemo(() => {
    const end = page * PAGE_SIZE;
    return ebooks.slice(0, end);
  }, [page]);

  const heroBook = ebooks[0] || {};
  const heroCover = heroBook.cover || HERO_FALLBACK_COVER;
  const heroDownloadName =
    getSlugFromReadLink(heroBook.readLink) || "ebook";

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main className="bg-white">
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
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
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
                    href={heroBook.downloadLink || "#"}
                    download={`${heroDownloadName}.pdf`}
                    className="inline-flex items-center justify-center rounded-full bg-[#74C425] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#4b8f1c]"
                  >
                    Download Free E-Book
                  </a>
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  We only send the download link. No spam.
                </p>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div
                  className="absolute -top-6 right-8 hidden h-24 w-24 rounded-full border border-[#74C425]/30 sm:block"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div
                    className="absolute -bottom-5 -right-5 h-24 w-24 rounded-3xl bg-[#74C425]/20"
                    aria-hidden="true"
                  />
                  <img
                    src={heroCover}
                    alt={heroBook.title || "E-book cover"}
                    className="relative z-10 w-60 rounded-[28px] border-4 border-white shadow-2xl sm:w-72 lg:w-80"
                    loading="lazy"
                  />
                  <div className="absolute -left-8 top-10 hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#3c7d13] shadow sm:flex">
                    Best Seller
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#74C425]">
          <div
            className="absolute -left-16 bottom-10 h-44 w-44 rounded-full bg-[#9be55b]/70 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-8 h-56 w-56 rounded-full bg-[#5aa81f]/60 blur-3xl"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#dbffbf] px-6 py-8 text-center shadow-2xl ring-1 ring-white/40">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                What Will You Get From Our E-Book?
              </h2>
              <p className="mt-3 text-sm text-slate-700 sm:text-base">
                Understand Natural Immunotherapy and nutrition science in
                simple, actionable terms.
              </p>
              <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
                {HIGHLIGHTS.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex gap-3 rounded-2xl bg-white/80 p-4 shadow-sm"
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
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                E-Books
              </h2>
              <p className="mt-2 text-lg font-semibold text-[#74C425]">
                & Research Publications
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Explore the full collection of research-backed resources.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleEbooks.map((book) => (
                <div
                  key={book.id}
                  className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="p-5">
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-semibold text-slate-900">
                        {book.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        By {book.author}
                      </p>
                      <p className="mt-3 text-sm text-slate-700 line-clamp-3">
                        {book.desc}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {book.pages}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {book.readTime}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2">
                        <Link
                          to={book.readLink}
                          className="inline-flex items-center justify-center rounded-full bg-[#6bc12f] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4b8f1c]"
                        >
                          Read Online
                        </Link>
                        <a
                          href={book.downloadLink}
                          download={`${getSlugFromReadLink(book.readLink) || book.id}.pdf`}
                          className="inline-flex items-center justify-center rounded-full border border-[#6bc12f] px-4 py-2 text-sm font-semibold text-[#3c7d13] transition hover:bg-[#f0ffe0]"
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

            <div className="mt-12 max-w-3xl text-sm text-slate-500">
              <p>
                These e-books are provided for educational purposes only. They
                are not a replacement for emergency medical care. The content
                reflects research and clinical experience from Natural
                Immunotherapy practice under Save Medha Foundation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
