import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  CheckCircle2,
  ChevronDown,
  Download,
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
import ebookPagesMobilePreview from "../assets/ebook/ebook-pages-mobile-preview.png";
import ebookHeroArtwork from "../assets/ebook/ebook-hero-nobadge.png";
import amazonKindleMobilePreview from "../assets/ebook/amazon-kindle-mobile-preview.png";
import freeDownloadMobilePreview from "../assets/ebook/get-free-download-mobile-preview.png";

const PAGE_SIZE = 6;
const HERO_FALLBACK_COVER = heroFallbackCover;
const AMAZON_KINDLE_URL = "https://www.amazon.in/";
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
    question: "Is the information evidence-based or opinion-based?",
    answer:
      "The content is grounded in established nutrition science, clinical experience, and Save Medha Foundation research work.",
  },
  {
    question: "Can I apply the recommendations directly to my health condition?",
    answer:
      "Use the books as educational guidance and consult a qualified medical professional for personal treatment decisions.",
  },
  {
    question: "Why are these e-books offered for free?",
    answer:
      "The foundation shares these resources to make awareness and practical health education easier to access.",
  },
  {
    question: "Are these e-books regularly updated?",
    answer:
      "Resources are reviewed as new foundation material, clinical learning, and reader needs evolve.",
  },
];

const previewFrames = [
  {
    src: contentCoverOne,
    alt: "Principles of Natural Science e-book cover",
    label: "Cover",
  },
  {
    src: contentTocImage,
    alt: "Table of contents preview",
    label: "Table of contents",
  },
  {
    src: contentCoverThree,
    alt: "Inside guide page preview",
    label: "Introduction",
  },
];

const trimCopy = (value = "", max = 118) => {
  const normalized = String(value).replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max).trimEnd()}...`;
};

function SectionHeading({ accent, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {accent ? (
        <p className="text-sm font-black text-[#27b412]">{accent}</p>
      ) : null}
      <h2 className="mt-2 font-poppins text-[28px] font-black leading-tight text-[#1c261a] sm:text-[34px]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-[#6d746a] sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function HighlightCard({ text }) {
  return (
    <div className="flex min-h-[108px] items-start gap-3 rounded-[18px] border border-[#eceeea] bg-white px-4 py-4 shadow-[0_12px_26px_rgba(15,23,42,0.05)]">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaffdf] text-[#23a50f]">
        <CheckCircle2 size={18} strokeWidth={2.5} />
      </span>
      <p className="text-[13px] font-semibold leading-5 text-[#3d433c] sm:text-[14px]">
        {text}
      </p>
    </div>
  );
}

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
      } catch (error) {
        console.error("Failed to load ebooks:", error);
        if (!isMounted) return;
        setEbooks(fallbackEbooks.map(normalizeEbook));
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
  const heroDownloadName = getEbookSlug(heroBook) || "ebook";
  const heroDownloadLink = heroBook.downloadLink;
  const heroDownloadDisabled = !heroDownloadLink;
  const showLoadingInline = status === "loading";
  const showEmptyInline = status === "success" && ebooks.length === 0;

  return (
    <div className="min-h-screen bg-white text-[#1c261a]">
      <Seo
        title="E-Books"
        description="Download free e-books on Natural Immunotherapy, holistic health, and cancer recovery from Save Medha Foundation."
        path="/ebook"
      />
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main className="ebook-main bg-white">
        <section className="bg-white pb-10 pt-4 lg:pb-12">
          <div className="w-full">
            <div className="relative min-h-[420px] overflow-hidden rounded-none border border-[#d6ead0] bg-[#091108] text-white shadow-[0_28px_80px_rgba(12,20,12,0.18)] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[720px]">
              <img
                src={ebookHeroArtwork}
                alt={
                  heroBook.title
                    ? `${heroBook.title} hero artwork`
                    : "E-Books hero artwork"
                }
                className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-[center_0%] translate-y-4 transform-gpu sm:translate-y-6 lg:translate-y-10 lg:scale-[1.12]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,14,5,0.88)_0%,rgba(4,14,5,0.76)_28%,rgba(4,14,5,0.44)_55%,rgba(4,14,5,0.22)_76%,rgba(4,14,5,0.14)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_54%,rgba(255,255,255,0.12),transparent_16%),radial-gradient(circle_at_18%_90%,rgba(67,211,37,0.14),transparent_24%)]" />
              <div className="relative z-10 flex min-h-[420px] items-end px-6 py-6 sm:min-h-[520px] sm:px-10 sm:py-10 md:min-h-[560px] md:items-start md:px-12 md:pt-16 lg:min-h-[720px] lg:px-12 lg:pt-20 lg:pb-0">
                <div className="max-w-[540px] rounded-[28px] bg-black/28 p-5 backdrop-blur-[3px] sm:p-6 md:ml-[18%] lg:ml-[22%] xl:ml-[24%] lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
                  <div className="mb-4 inline-flex items-center rounded-full bg-white/96 px-4 py-1.5 text-[10px] font-black text-[#159b17] shadow-[0_10px_22px_rgba(0,0,0,0.18)] sm:mb-5 sm:px-5 sm:py-2 sm:text-[12px]">
                    100 % free download
                  </div>
                  <h1 className="font-poppins text-[44px] font-black leading-[0.94] drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] sm:text-[62px] lg:text-[74px]">
                    <span className="block text-[#26cf10]">E-Books</span>
                    <span className="block text-[#26cf10]">
                      &amp; Research
                    </span>
                    <span className="block text-white">Publications</span>
                  </h1>

                  <p className="mt-5 max-w-[500px] text-sm font-medium leading-6 text-white/82 drop-shadow-[0_3px_10px_rgba(0,0,0,0.32)] sm:text-[16px] sm:leading-7">
                    Educational resources from Save Medha Foundation, grounded
                    in Natural Immunotherapy, nutrition science, and real
                    clinical experience.
                  </p>

                  <div className="mt-8 flex max-w-[520px] flex-col gap-3 sm:flex-row">
                    <label htmlFor="ebook-email" className="sr-only">
                      Email address
                    </label>
                    <div className="flex h-12 flex-1 items-center rounded-full bg-white/95 px-5 text-slate-700 shadow-[0_18px_45px_rgba(0,0,0,0.18)] sm:h-14">
                      <input
                        id="ebook-email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-full w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500"
                      />
                    </div>
                    <a
                      href={heroDownloadLink || "#"}
                      download={
                        heroDownloadDisabled
                          ? undefined
                          : `${heroDownloadName}.pdf`
                      }
                      onClick={(event) => {
                        if (heroDownloadDisabled) event.preventDefault();
                      }}
                      aria-disabled={heroDownloadDisabled}
                      className={`inline-flex h-12 items-center justify-center rounded-full bg-[#2ecf13] px-7 text-sm font-black text-white shadow-[0_18px_45px_rgba(34,195,42,0.35)] transition hover:bg-[#1dac0b] sm:h-14 ${
                        heroDownloadDisabled
                          ? "cursor-not-allowed opacity-65"
                          : ""
                      }`}
                    >
                      Download your E-book
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              title="What Will You Get From Our E-Book?"
              description="Understand natural immunotherapy and nutrition science in simple, actionable terms without confusing medical jargon."
            />

            <div className="mx-auto mt-10 grid max-w-[930px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HIGHLIGHTS.map((item) => (
                <HighlightCard key={item} text={item} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="#ebook-library"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e7ebe5] bg-white text-[#27b412] shadow-sm transition hover:border-[#30c616] hover:bg-[#f4fff0]"
                aria-label="Scroll to ebook library"
              >
                <ArrowDown size={16} />
              </a>
            </div>
          </div>
        </section>

        <section id="ebook-library" className="bg-[#fafbf9] px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              accent="E-Books & Research"
              title="E-Books & Research Publications"
              description="Curated reading material designed to make complex healing concepts easier to understand and revisit."
            />

            {showLoadingInline ? (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`ebook-card-skeleton-${index}`}
                    className="min-h-[360px] animate-pulse rounded-[22px] border border-[#eceeea] bg-white p-4 shadow-sm"
                  >
                    <div className="h-40 rounded-[18px] bg-slate-100" />
                    <div className="mt-5 h-5 w-3/4 rounded-full bg-slate-100" />
                    <div className="mt-3 h-4 w-full rounded-full bg-slate-100" />
                    <div className="mt-2 h-4 w-11/12 rounded-full bg-slate-100" />
                    <div className="mt-6 flex gap-2">
                      <div className="h-9 w-24 rounded-full bg-slate-100" />
                      <div className="h-9 w-28 rounded-full bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {showEmptyInline ? (
              <div className="mx-auto mt-10 max-w-xl rounded-[22px] border border-[#eceeea] bg-white px-6 py-5 text-center text-sm font-semibold text-[#61695f] shadow-sm">
                No e-books available right now.
                <button
                  type="button"
                  onClick={() => setReloadToken((token) => token + 1)}
                  className="ml-3 rounded-full bg-[#2bc412] px-4 py-2 text-xs font-black text-white"
                >
                  Retry
                </button>
              </div>
            ) : null}

            {!showLoadingInline && visibleEbooks.length > 0 ? (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleEbooks.map((book, index) => {
                  const cover =
                    book.cover ||
                    PUBLICATION_FALLBACK_COVERS[
                      index % PUBLICATION_FALLBACK_COVERS.length
                    ];
                  const canRead = Boolean(book.readLink && book.viewLink);
                  const canDownload = Boolean(book.downloadLink);

                  return (
                    <article
                      key={book.id}
                      className="group flex min-h-[370px] flex-col rounded-[22px] border border-[#eceeea] bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]"
                    >
                      <div className="flex h-[158px] items-center justify-center rounded-[18px] bg-[#f1f3ef] p-4">
                        <img
                          src={cover}
                          alt={book.title}
                          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                        <h3 className="line-clamp-2 font-poppins text-[16px] font-black leading-5 text-[#1f281d]">
                          {book.title}
                        </h3>
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#96a191]">
                          {book.pages || book.category || "Free Guide"}
                        </p>
                        <p className="mt-3 text-[13px] font-medium leading-5 text-[#667062]">
                          {trimCopy(
                            book.desc ||
                              "A Save Medha Foundation resource for practical health learning and awareness."
                          )}
                        </p>

                        <div className="mt-auto flex flex-wrap gap-2 pt-5">
                          {canRead ? (
                            <Link
                              to={book.readLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-9 items-center justify-center rounded-full bg-[#2dc913] px-4 text-[11px] font-black text-white transition hover:bg-[#22a80c]"
                            >
                              Read Online
                            </Link>
                          ) : (
                            <span className="inline-flex h-9 items-center justify-center rounded-full bg-slate-100 px-4 text-[11px] font-black text-slate-400">
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
                            className={`inline-flex h-9 items-center justify-center rounded-full border border-[#d8ddd4] bg-white px-4 text-[11px] font-black text-[#4b5348] transition hover:border-[#30c616] hover:text-[#1f281d] ${
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
            ) : null}

            {page < totalPages ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#2dc913] px-7 text-sm font-black text-white shadow-[0_14px_36px_rgba(34,195,42,0.26)] transition hover:bg-[#22a80c]"
                >
                  Load more publications
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-[linear-gradient(90deg,#055107_0%,#0d7b0a_50%,#3bc314_100%)] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="mx-auto">
              <img
                src={HERO_FALLBACK_COVER}
                alt="Featured e-book"
                className="w-[180px] rotate-[-10deg] object-contain drop-shadow-[0_24px_55px_rgba(0,0,0,0.35)]"
                loading="lazy"
              />
            </div>

            <div className="max-w-2xl">
              <h2 className="font-poppins text-[28px] font-black leading-tight sm:text-[34px]">
                Can I trust your E-Book?
              </h2>
              <p className="mt-4 text-sm font-medium leading-7 text-white/88 sm:text-[15px]">
                Yes, our e-books are thoughtfully developed by Save Medha
                Foundation. They are based on established nutrition science,
                Natural Immunotherapy principles, and documented clinical
                experience from our foundation&apos;s practical work.
              </p>
              <p className="mt-4 text-sm font-medium leading-7 text-white/88 sm:text-[15px]">
                The goal is to explain complex health ideas in clear language
                while encouraging responsible, informed, and accountable
                decision-making through reliable public-benefit education.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f4f2] px-3 py-8 sm:bg-white sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-7 md:grid-cols-2">
            <div className="mx-auto w-full max-w-[372px] rounded-[26px] border border-[#d7ddd5] bg-white px-4 pb-8 pt-7 text-center shadow-[0_14px_32px_rgba(0,0,0,0.14)] sm:max-w-none sm:rounded-[24px] sm:border-[#eceeea] sm:p-6 sm:shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
              <h3 className="font-poppins text-[18px] font-black text-[#1f281d] sm:text-[22px]">
                Get Free Download
              </h3>
              <div className="mx-auto mt-7 max-w-[292px] overflow-hidden rounded-[24px] bg-white p-0 shadow-[0_14px_32px_rgba(15,23,42,0.12)] sm:mt-5 sm:max-w-none sm:rounded-[18px] sm:bg-[#f4f6f2] sm:p-4 sm:shadow-none">
                <img
                  src={freeDownloadMobilePreview}
                  alt="Open e-book preview"
                  className="h-[146px] w-full object-cover sm:hidden"
                  loading="lazy"
                />
                <img
                  src={contentSpreadImage}
                  alt="Open e-book preview"
                  className="hidden h-[150px] w-full object-cover sm:block"
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
                className={`mt-5 hidden h-10 w-10 items-center justify-center rounded-full bg-[#2fc915] text-white transition hover:bg-[#22a80c] sm:inline-flex ${
                  heroDownloadDisabled ? "cursor-not-allowed opacity-65" : ""
                }`}
              >
                <img
                  src={downloadButtonImage}
                  alt="Download"
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                />
              </a>
              <a
                href={heroDownloadLink || "#"}
                download={
                  heroDownloadDisabled ? undefined : `${heroDownloadName}.pdf`
                }
                onClick={(event) => {
                  if (heroDownloadDisabled) event.preventDefault();
                }}
                aria-disabled={heroDownloadDisabled}
                className={`mt-12 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2fc915] text-white shadow-[0_12px_24px_rgba(47,201,21,0.3)] transition hover:bg-[#22a80c] sm:hidden ${
                  heroDownloadDisabled ? "cursor-not-allowed opacity-65" : ""
                }`}
              >
                <ArrowDown size={18} strokeWidth={3} />
              </a>
            </div>

            <div className="mx-auto w-full max-w-[336px] rounded-[18px] border border-[#d7ddd5] bg-white px-5 py-5 text-center shadow-[0_6px_18px_rgba(15,23,42,0.08)] sm:max-w-none sm:rounded-[24px] sm:border-[#eceeea] sm:p-6 sm:shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
              <h3 className="font-poppins text-[17px] font-black text-[#1f281d] sm:text-[22px]">
                Buy On Amazon Kindle
              </h3>
              <div className="mt-4 overflow-hidden rounded-[16px] border border-[#e8ebe5] bg-[#f7f8f5] p-0 sm:mt-5 sm:rounded-[18px] sm:border-0 sm:bg-[#f4f6f2] sm:p-4">
                <img
                  src={amazonKindleMobilePreview}
                  alt="Kindle preview"
                  className="h-[132px] w-full object-cover sm:hidden"
                  loading="lazy"
                />
                <img
                  src={contentSpreadImage}
                  alt="Kindle preview"
                  className="hidden h-[150px] w-full object-cover sm:block"
                  loading="lazy"
                />
              </div>
              <a
                href={AMAZON_KINDLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 hidden h-10 items-center justify-center gap-2 rounded-full border border-[#dbded8] bg-white px-4 text-sm font-black text-[#1f281d] transition hover:border-[#2ecf13] hover:text-[#0e7c08] sm:inline-flex"
              >
                <ShoppingBag size={14} />
                <img
                  src={amazonButtonImage}
                  alt="Amazon"
                  className="h-5 w-auto object-contain"
                  loading="lazy"
                />
              </a>
              <a
                href={AMAZON_KINDLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-[#1f281d] bg-white px-5 text-[16px] font-semibold text-[#1f281d] transition hover:border-[#2ecf13] hover:text-[#0e7c08] sm:hidden"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-[4px] bg-black text-[13px] font-black leading-none text-white">
                  a
                </span>
                Amazon
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#fafbf9] px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_250px]">
            <div>
              <SectionHeading
                title="Frequently Asked Questions"
                description=""
              />

              <div className="mt-8 space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-[16px] border border-[#eceeea] bg-white px-4 py-3 shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[13px] font-black text-[#384236] sm:text-[14px]">
                      <span>
                        {index + 1}. {item.question}
                      </span>
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-[#28b312] transition group-open:rotate-180"
                      />
                    </summary>
                    <p className="pt-3 text-sm font-medium leading-6 text-[#667062]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[220px] rounded-[22px] bg-[#e7ffd8] p-5 shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
              <div className="rounded-[18px] bg-white p-4">
                <img
                  src={contentCoverOne}
                  alt="Principles of Natural Science book"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading
              title="Frequently Asked Questions"
              description="A look inside our comprehensive guides."
            />

            <div className="mt-10 grid items-center gap-5 sm:grid-cols-3">
              {previewFrames.map((frame, index) => (
                <div
                  key={frame.src}
                  className={`rounded-[20px] bg-[#f4f6f2] p-4 shadow-[0_14px_35px_rgba(15,23,42,0.04)] ${
                    index === 1 ? "sm:scale-[1.03]" : ""
                  }`}
                >
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    className="mx-auto h-64 w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 h-1.5 max-w-sm rounded-full bg-[#e3e8df]">
              <div className="h-full w-1/3 rounded-full bg-[#2bc412]" />
            </div>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8f978b]">
              Pages 1 of 25
            </p>
          </div>
        </section>

        <section className="bg-white px-4 pb-0 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-t-[26px]">
            <img
              src={ebookPagesMobilePreview}
              alt="Open e-book pages"
              className="h-auto w-full object-cover sm:hidden"
              loading="lazy"
            />
            <img
              src={contentSpreadImage}
              alt="Open e-book pages"
              className="hidden h-auto w-full object-cover sm:block"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
