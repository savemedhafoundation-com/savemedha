import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ebooks } from "../data/ebooks";

const getEbookSlug = (book) => {
  const link = typeof book?.readLink === "string" ? book.readLink : "";
  const parts = link.split("/").filter(Boolean);
  const slug = parts.length ? parts[parts.length - 1] : "";
  return slug;
};

export default function EbookRead({ onNavigate }) {
  const { slug } = useParams();

  const book = useMemo(() => {
    const normalizedSlug = typeof slug === "string" ? slug.trim() : "";
    if (!normalizedSlug) return null;

    return (
      ebooks.find((item) => getEbookSlug(item) === normalizedSlug) || null
    );
  }, [slug]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {!book ? (
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  E-Book Not Found
                </h1>
                <p className="mt-3 text-slate-600">
                  The requested e-book is not available.
                </p>
                <div className="mt-6">
                  <Link
                    to="/ebook"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    Back to E-Books
                  </Link>
                </div>
              </div>
            ) : (
              <div className="max-w-5xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                      {book.title}
                    </h1>
                    <p className="mt-2 text-slate-600">By {book.author}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>{book.pages}</span>
                      <span>{book.readTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:min-w-[220px] sm:items-end">
                    <Link
                      to="/ebook"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Back
                    </Link>
                    <a
                      href={book.downloadLink}
                      download={`${getEbookSlug(book) || book.id}.pdf`}
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      Download PDF
                    </a>
                    <a
                      href={book.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Open in New Tab
                    </a>
                  </div>
                </div>

                <p className="mt-6 text-slate-700">{book.desc}</p>

                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <iframe
                    src={book.downloadLink}
                    title={book.title}
                    className="h-[80vh] w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
