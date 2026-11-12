import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import Footer from "../components/Footer";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import { fetchEbooks } from "../service/api";
import { normalizeEbook, normalizeEbookResponse } from "../utils/ebook";
import fallbackCover from "../assets/Photo/BOOK1 1.png";
import openBookHero from "../assets/ebook/open-book-hero-clean.webp";
import openBookBanner from "../assets/ebook/open-book-banner.webp";
import beyondAyurvedaCover from "../assets/ebook/beyond-ayurveda-cover.webp";
import autoimmuneCover from "../assets/ebook/autoimmune-diseases-cover.webp";
import cancerNeverAgainCover from "../assets/ebook/cancer-never-again-cover.webp";
import "../styles/ebook.css";

// Use portrait artwork for these catalog banners. New artwork retains its API image.
const PUBLICATION_COVERS = {
  "https://res.cloudinary.com/dttk2mf1y/image/upload/v1789038256/savemedha/ebooks/banners/vo5v3tywaiqcn2dpohee.jpg": beyondAyurvedaCover,
  "https://res.cloudinary.com/dttk2mf1y/image/upload/v1788171929/savemedha/ebooks/banners/qgd8knaqydox9kzlqvjb.jpg": autoimmuneCover,
  "https://res.cloudinary.com/dttk2mf1y/image/upload/v1787996437/savemedha/ebooks/banners/etvxy80epl2fsqulu77o.jpg": cancerNeverAgainCover,
};

function preparePublication(book, index) {
  const publication = normalizeEbook(book, index);
  return {
    ...publication,
    cover: PUBLICATION_COVERS[publication.cover] || publication.cover,
    downloadLink: book?.pdfDownloadUrl || publication.downloadLink,
  };
}

const HIGHLIGHTS = [
  "Real-world clinical experience built into every chapter.",
  "Science-backed insights without confusing medical jargon.",
  "Nutrition guidance that connects habits with healing.",
  "Clear myths vs facts with step-by-step learning.",
  "Written for individuals, caregivers, and families.",
  "Download and share with no cost or barriers.",
];

const BENEFITS_DESCRIPTION =
  "Understand natural immunotherapy and nutrition science in simple, actionable terms without confusing medical jargon.";

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

function PublicationHeading({ id, title, description }) {
  return (
    <div className="ebook-publication-heading ebook-container">
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function BookCard({ book, showActions = false }) {
  const canDownload = Boolean(book.downloadLink);
  const canRead = Boolean(book.readLink && book.viewLink);

  return (
    <article
      className={`ebook-cover${showActions ? " ebook-cover-featured" : ""}`}
      aria-label={book.title}
    >
      <img
        src={book.cover || fallbackCover}
        alt={book.title}
        width="400"
        height="630"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          if (!event.currentTarget.src.endsWith(fallbackCover)) {
            event.currentTarget.src = fallbackCover;
          }
        }}
      />
      <div className="ebook-cover-actions">
        {canRead ? (
          <Link
            to={book.readLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ebook-button ebook-button-green"
            aria-label={`Read ${book.title} online`}
          >
            Read Online
          </Link>
        ) : (
          <button className="ebook-button ebook-button-green" disabled>
            Read Online
          </button>
        )}
        <a
          href={book.downloadLink || undefined}
          download={canDownload ? `${book.slug || book.id}.pdf` : undefined}
          target={canDownload ? "_blank" : undefined}
          rel={canDownload ? "noopener noreferrer" : undefined}
          aria-label={`Download ${book.title} PDF`}
          aria-disabled={!canDownload}
          tabIndex={canDownload ? undefined : -1}
          className="ebook-button ebook-button-outline"
        >
          Download PDF
        </a>
      </div>
    </article>
  );
}

function BookShelf({ books, row }) {
  const shelfRef = useRef(null);
  // Repeat covers to create the continuous, staggered shelves in the design.
  const shelfBooks = Array.from(
    { length: Math.max(9, books.length % 2 ? books.length : books.length + 1) },
    (_, index) => books[(index + row) % books.length],
  );

  useEffect(() => {
    const shelf = shelfRef.current;
    if (shelf) {
      shelf.scrollLeft = (shelf.scrollWidth - shelf.clientWidth) / 2;
    }
  }, [books, row]);

  return (
    <div
      ref={shelfRef}
      className="ebook-shelf"
      role="region"
      aria-label={`Publication shelf ${row + 1}, scroll to browse books`}
      tabIndex={0}
    >
      <div className="ebook-shelf-track">
        {shelfBooks.map((book, index) => (
          <BookCard
            key={`${book.id}-${index}`}
            book={book}
            showActions={index === 4 + row}
          />
        ))}
      </div>
    </div>
  );
}

export default function EbookPage({ onNavigate }) {
  const [ebooks, setEbooks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [reloadToken, setReloadToken] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadEbooks = async () => {
      setStatus("loading");
      try {
        const response = await fetchEbooks();
        if (!isMounted) return;
        setEbooks(
          normalizeEbookResponse(response)
            .map(preparePublication)
            .sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0)),
        );
        setStatus("success");
      } catch (error) {
        console.error("Failed to load ebooks:", error);
        if (!isMounted) return;
        setEbooks([]);
        setStatus("error");
      }
    };

    loadEbooks();
    return () => {
      isMounted = false;
    };
  }, [reloadToken]);

  const featuredBook = ebooks.find((book) => book.downloadLink);
  const amazonKindleUrl = `https://www.amazon.in/s?${new URLSearchParams({
    i: "digital-text",
    k: "Subhankar Sarkar",
  }).toString()}`;

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="E-Books"
        description="Download free e-books on Natural Immunotherapy, holistic health, and cancer recovery from Save Medha Foundation."
        path="/ebook"
      />
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main className="ebook-main ebook-redesign">
        <section className="ebook-hero" aria-labelledby="ebook-hero-title">
          <div className="ebook-hero-heading ebook-container">
            <h1 id="ebook-hero-title">
              Unlock New
              <br />
              Perspectives Through
              <br />
              Knowledge.
            </h1>
            <p>
              Educational resources from Save Medha Foundation, grounded in
              Natural Immunotherapy, nutrition science, and real clinical
              experience.
            </p>
          </div>
          <img
            src={openBookHero}
            alt="An open green book held in two hands"
            width="1800"
            height="539"
            className="ebook-hero-art"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </section>

        <section
          className="ebook-latest"
          aria-labelledby="ebook-latest-title"
          aria-busy={status === "loading"}
        >
          <PublicationHeading
            id="ebook-latest-title"
            title={<>Discover Our Latest<br />Publications</>}
            description="Explore e-books and research publications featuring fresh insights into science, health, and wellness."
          />
          {status === "loading" ? (
            <div className="ebook-latest-covers ebook-container" role="status">
              <span className="sr-only">Loading publications...</span>
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="ebook-cover ebook-cover-skeleton" />
              ))}
            </div>
          ) : ebooks.length ? (
            <div className="ebook-latest-covers ebook-container">
              {ebooks.slice(0, 4).map((book, index) => (
                <BookCard key={book.id} book={book} showActions={index === 0} />
              ))}
            </div>
          ) : (
            <div className="ebook-empty ebook-container" role="status">
              <p>
                {status === "error"
                  ? "Unable to load publications right now. Please try again."
                  : "No e-books available right now."}
              </p>
              <button
                type="button"
                className="ebook-button ebook-button-outline"
                onClick={() => setReloadToken((token) => token + 1)}
              >
                Retry
              </button>
            </div>
          )}
        </section>

        <section
          id="ebook-library"
          className="ebook-library"
          aria-labelledby="ebook-library-title"
        >
          <PublicationHeading
            id="ebook-library-title"
            title={<>E-Books &amp; Research<br />Publications</>}
            description="Curated reading material designed to make complex healing concepts easier to understand and revisit."
          />
          {ebooks.length > 0 ? (
            <div className="ebook-shelves">
              <BookShelf books={ebooks} row={0} />
              <BookShelf books={ebooks} row={1} />
            </div>
          ) : status === "loading" ? (
            <div className="ebook-latest-covers ebook-container" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="ebook-cover ebook-cover-skeleton" />
              ))}
            </div>
          ) : (
            <p className="ebook-library-empty ebook-container">
              {status === "error"
                ? "Please retry above to browse our publications."
                : "New publications will appear here when they are available."}
            </p>
          )}
        </section>

        <section className="ebook-benefits ebook-container" aria-labelledby="ebook-benefits-title">
          <div className="ebook-centered-heading">
            <h2 id="ebook-benefits-title">What Will You Get From Our<br />E-Book?</h2>
            <p>{BENEFITS_DESCRIPTION}</p>
          </div>
          <div className="ebook-benefits-grid">
            {HIGHLIGHTS.map((highlight) => (
              <div className="ebook-benefit" key={highlight}>
                <span className="ebook-grid-cross" aria-hidden="true" />
                <p>{highlight}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ebook-download ebook-container" aria-labelledby="ebook-download-title">
          <div className="ebook-download-art">
            <img
              src={openBookBanner}
              alt="Hands turning the pages of an open book"
              width="800"
              height="787"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="ebook-download-content">
            <div className="ebook-download-panel">
              <h2 id="ebook-download-title">What Will You Get<br />From Our E-Book?</h2>
              <p>{BENEFITS_DESCRIPTION}</p>
            </div>
            <div className="ebook-download-actions">
              <a
                href={featuredBook?.downloadLink || "#ebook-library"}
                download={featuredBook ? `${featuredBook.slug}.pdf` : undefined}
                target={featuredBook ? "_blank" : undefined}
                rel={featuredBook ? "noopener noreferrer" : undefined}
                className="ebook-button ebook-button-outline"
              >
                Get Free Download
              </a>
              <a
                href={amazonKindleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ebook-button ebook-button-green"
              >
                Buy On Amazon Kindle
              </a>
            </div>
          </div>
        </section>

        <section className="ebook-faq ebook-container" aria-labelledby="ebook-faq-title">
          <div className="ebook-centered-heading">
            <h2 id="ebook-faq-title">Frequently Asked<br />Questions</h2>
          </div>
          <div className="ebook-faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div className="ebook-faq-item" key={item.question}>
                  <h3>
                    <button
                      type="button"
                      id={`ebook-faq-question-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`ebook-faq-answer-${index}`}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{index + 1}. {item.question}</span>
                      {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                    </button>
                  </h3>
                  <div
                    id={`ebook-faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`ebook-faq-question-${index}`}
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
