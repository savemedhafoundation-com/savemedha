import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Download,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Footer from "../components/Footer";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import { fetchEbooks } from "../service/api";
import {
  getEbookSlug,
  normalizeEbook,
  normalizeEbookResponse,
} from "../utils/ebook";
import { fallbackEbooks } from "../data/ebookFallback";
import heroFallbackCover from "../assets/Photo/BOOK1 1.png";
import downloadButtonImage from "../assets/Photo/downloads.png";
import amazonButtonImage from "../assets/Photo/amazon.png";
import contentCoverOne from "../assets/Photo/bookcover1.png";
import contentTocImage from "../assets/Photo/Table of contents layout in green.png";
import contentCoverThree from "../assets/Photo/bookcover3.png";
import contentSpreadImage from "../assets/Photo/bookb.png";

const HERO_BACKDROP_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_1920/v1770977116/WHITEBOARD_cd4z4f.jpg";

const PAGE_SIZE = 6;
const HERO_FALLBACK_COVER = heroFallbackCover;
const PUBLICATION_FALLBACK_COVERS = [
  HERO_FALLBACK_COVER,
  contentCoverOne,
  contentTocImage,
  contentCoverThree,
];

const HIGHLIGHTS = [
  "Real-world clinical experience built into every chapter.",
  "Science-backed insights without confusing medical jargon.",
  "Nutrition guidance that connects habits with healing.",
  "Clear myths vs facts with step-by-step learning.",
  "Written for individuals, caregivers, and families.",
  "Download and share with no cost or barriers.",
];

const FAQ_ITEMS = [
  {
    question: "Who are these e-books intended for?",
    answer:
      "They are written for patients, caregivers, students, and readers who want clear guidance around natural care and nutrition.",
  },
  {
    question: "Is the information evidence-based?",
    answer:
      "The content is based on established nutrition science, clinical experience, and Save Medha Foundation research work.",
  },
  {
    question: "Can I apply the recommendations directly?",
    answer:
      "Use the books as educational guidance and consult a qualified medical professional for personal treatment decisions.",
  },
  {
    question: "Why are these e-books free?",
    answer:
      "The foundation shares these resources to make awareness and practical health education easier to access.",
  },
  {
    question: "Are these e-books regularly updated?",
    answer:
      "Resources are reviewed as new foundation material, clinical learning, and reader needs evolve.",
  },
];

const CONTENT_PREVIEW_IMAGES = [
  { src: contentCoverOne, alt: "E-book cover preview" },
  { src: contentTocImage, alt: "Table of contents preview" },
  { src: contentCoverThree, alt: "E-book page preview" },
];

export default function EbookPage({ onNavigate }) {
  const [page, setPage] = useState(1);
  const [ebooks, setEbooks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadEbooks = async () => {
      setStatus("loading");
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
  const heroCover = heroBook.cover || HERO_FALLBACK_COVER;
  const heroDownloadName = getEbookSlug(heroBook) || "ebook";
  const heroDownloadLink = heroBook.downloadLink;
  const heroDownloadDisabled = !heroDownloadLink;
  const showLoadingInline = status === "loading";
  const showEmptyInline = status === "success" && ebooks.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="E-Books"
        description="Download free e-books on Natural Immunotherapy, holistic health, and cancer recovery from Save Medha Foundation."
        path="/ebook"
      />
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main className="ebook-main bg-white">
        <section
          className="relative min-h-[430px] overflow-hidden bg-slate-950"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(5, 12, 9, 0.92) 0%, rgba(5, 12, 9, 0.78) 47%, rgba(5, 12, 9, 0.42) 100%), url(${HERO_BACKDROP_URL})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:py-20">
            <div className="max-w-xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-[#baf27b] ring-1 ring-white/20">
                <BookOpen size={14} />
                Free health resources
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                <span className="block text-[#74C425]">E-Books</span>
                <span className="block">& Research Publications</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/82 sm:text-base">
                Educational resources from Save Medha Foundation, grounded in
                Natural Immunotherapy, nutrition science, and real clinical
                experience.
              </p>

              <div className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="ebook-email">
                  Email address
                </label>
                <input
                  id="ebook-email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 min-w-0 flex-1 rounded-md border border-white/20 bg-white/12 px-4 text-sm text-white outline-none placeholder:text-white/70 focus:border-[#74C425]"
                />
                <a
                  href={heroDownloadLink || "#"}
                  download={
                    heroDownloadDisabled ? undefined : `${heroDownloadName}.pdf`
                  }
                  onClick={(event) => {
                    if (heroDownloadDisabled) event.preventDefault();
                  }}
                  aria-disabled={heroDownloadDisabled}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#74C425] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#155300] ${
                    heroDownloadDisabled ? "cursor-not-allowed opacity-65" : ""
                  }`}
                >
                  <Download size={16} />
                  Download your E-book
                </a>
              </div>
            </div>

            <div className="relative hidden min-h-[300px] justify-center lg:flex">
              <img
                src={heroCover}
                alt={heroBook.title || "E-book cover"}
                className="absolute right-28 top-8 h-56 w-auto rotate-[-8deg] object-contain opacity-55"
                loading="lazy"
              />
              <img
                src={heroCover}
                alt=""
                className="absolute right-8 top-2 h-72 w-auto rotate-[8deg] object-contain opacity-80"
                loading="lazy"
                aria-hidden="true"
              />
              <img
                src={heroCover}
                alt=""
                className="relative z-10 h-80 w-auto object-contain drop-shadow-2xl"
                loading="lazy"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                What Will You Get From Our E-Book?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Understand Natural Immunotherapy and nutrition science in
                simple, actionable terms.
              </p>
            </div>

            <div className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item}
                  className="flex min-h-16 items-start gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 flex-none text-[#16a000]"
                  />
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="#ebook-library"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#16a000] shadow-sm transition hover:border-[#74C425] hover:bg-[#f2ffe8]"
                aria-label="Scroll to publications"
              >
                <ArrowDown size={17} />
              </a>
            </div>
          </div>
        </section>

        <section id="ebook-library" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
                <span className="text-[#16a000]">E-Books</span> & Research
                Publications
              </h2>
            </div>

            {showLoadingInline && (
              <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[360px] animate-pulse rounded-md border border-slate-200 bg-slate-50"
                  />
                ))}
              </div>
            )}

            {showEmptyInline && (
              <div className="mx-auto mt-9 max-w-xl rounded-md border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm text-slate-600">
                No e-books available right now.
                <button
                  type="button"
                  onClick={() => setReloadToken((token) => token + 1)}
                  className="ml-3 rounded-md bg-[#74C425] px-3 py-1.5 text-xs font-black text-white"
                >
                  Retry
                </button>
              </div>
            )}

            {!showLoadingInline && visibleEbooks.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleEbooks.map((book, index) => {
                  const cover =
                    book.cover ||
                    PUBLICATION_FALLBACK_COVERS[
                      index % PUBLICATION_FALLBACK_COVERS.length
                    ];
                  const canRead = Boolean(book.readLink);
                  const canDownload = Boolean(book.downloadLink);

                  return (
                    <article
                      key={book.id}
                      className="group flex min-h-[390px] flex-col rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex h-44 items-center justify-center rounded-t-md bg-slate-100 p-5">
                        <img
                          src={cover}
                          alt={book.title}
                          className="max-h-full max-w-full object-contain drop-shadow-md transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="line-clamp-2 text-base font-black leading-snug text-slate-950">
                          {book.title}
                        </h3>
                        <p className="mt-1 text-xs font-bold text-slate-500">
                          By {book.author}
                        </p>
                        <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                          {book.desc ||
                            "A Save Medha Foundation resource for practical health learning and awareness."}
                        </p>

                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                          {canRead ? (
                            <Link
                              to={book.readLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-9 items-center justify-center rounded-md bg-[#74C425] px-3 text-xs font-black text-white transition hover:bg-[#155300]"
                            >
                              Read Online
                            </Link>
                          ) : (
                            <span className="inline-flex h-9 items-center justify-center rounded-md bg-slate-100 px-3 text-xs font-black text-slate-400">
                              Read Online
                            </span>
                          )}
                          <a
                            href={book.downloadLink || "#"}
                            download={
                              canDownload ? `${book.slug || book.id}.pdf` : undefined
                            }
                            onClick={(event) => {
                              if (!canDownload) event.preventDefault();
                            }}
                            aria-disabled={!canDownload}
                            className={`inline-flex h-9 items-center justify-center rounded-md border border-[#74C425] px-3 text-xs font-black text-[#168f00] transition hover:bg-[#f1ffe8] ${
                              canDownload ? "" : "cursor-not-allowed opacity-55"
                            }`}
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {page < totalPages && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className="inline-flex h-11 items-center justify-center rounded-md bg-[#74C425] px-6 text-sm font-black text-white shadow-sm transition hover:bg-[#155300]"
                >
                  Load more publications
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#075d1d] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[280px_minmax(0,1fr)]">
            <div className="flex justify-center">
              <img
                src={HERO_FALLBACK_COVER}
                alt="Featured e-book"
                className="h-72 w-auto object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-[#c7ff96] ring-1 ring-white/15">
                <ShieldCheck size={14} />
                Foundation reviewed
              </div>
              <h2 className="mt-4 text-2xl font-black sm:text-3xl">
                Can I trust your E-Book?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85">
                Yes. Our e-books are developed by Save Medha Foundation using
                established nutrition science, Natural Immunotherapy principles,
                and documented clinical experience. Every resource is written to
                be useful, transparent, and practical for everyday readers.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85">
                The goal is to explain complex health ideas in clear language
                while encouraging responsible care, accountability, and public
                awareness.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            <div className="rounded-md border border-slate-200 bg-white p-6 text-center shadow-sm">
              <h3 className="text-base font-black text-slate-950">
                Get Free Download
              </h3>
              <div className="mt-5 flex h-36 items-center justify-center rounded-md bg-slate-100 p-4">
                <img
                  src={contentSpreadImage}
                  alt="E-book pages"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <a
                href={heroDownloadLink || "#"}
                download={
                  heroDownloadDisabled ? undefined : `${heroDownloadName}.pdf`
                }
                onClick={(event) => {
                  if (heroDownloadDisabled) event.preventDefault();
                }}
                aria-disabled={heroDownloadDisabled}
                className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#74C425] text-white transition hover:bg-[#155300]"
              >
                <img
                  src={downloadButtonImage}
                  alt="Download"
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-6 text-center shadow-sm">
              <h3 className="text-base font-black text-slate-950">
                Buy On Amazon Kindle
              </h3>
              <div className="mt-5 flex h-36 items-center justify-center rounded-md bg-slate-100 p-4">
                <img
                  src={contentSpreadImage}
                  alt="E-book pages"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-xs font-black text-slate-900 transition hover:border-[#74C425]"
              >
                <ShoppingBag size={14} />
                <img
                  src={amazonButtonImage}
                  alt="Amazon"
                  className="h-5 w-auto object-contain"
                  loading="lazy"
                />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Frequently Asked Questions
              </h2>
              <div className="mt-7 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
                {FAQ_ITEMS.map((item, index) => (
                  <details key={item.question} className="group p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-black text-slate-800">
                      <span>
                        {index + 1}. {item.question}
                      </span>
                      <ChevronDown
                        size={17}
                        className="flex-none text-[#16a000] transition group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
            <div className="mx-auto w-full max-w-[220px] rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <img
                src={contentCoverOne}
                alt="Principles of Natural Science book"
                className="w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-black text-slate-950">
              Inside The Guide
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              A look inside our comprehensive health resources.
            </p>

            <div className="mt-10 grid items-center gap-6 sm:grid-cols-3">
              {CONTENT_PREVIEW_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  className={`rounded-md bg-slate-100 p-4 shadow-sm ring-1 ring-slate-200 ${
                    index === 1 ? "sm:scale-105" : "opacity-80"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="mx-auto h-64 w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 h-1.5 max-w-md rounded-full bg-slate-200">
              <div className="h-full w-1/3 rounded-full bg-[#74C425]" />
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Pages 1 of 25
            </p>
          </div>
        </section>

        <section className="bg-white">
          <img
            src={contentSpreadImage}
            alt="Open e-book pages"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
