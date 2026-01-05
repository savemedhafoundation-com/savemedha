import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchEbooks } from "../service/api";
import { getEbookSlug, normalizeEbook, normalizeEbookResponse } from "../utils/ebook";

export default function EbookRead({ onNavigate }) {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadEbook = async () => {
      const normalizedSlug = typeof slug === "string" ? slug.trim().toLowerCase() : "";
      if (!normalizedSlug) {
        setBook(null);
        setStatus("success");
        return;
      }

      setStatus("loading");
      setError("");
      try {
        const response = await fetchEbooks();
        if (!isMounted) return;
        const rawItems = normalizeEbookResponse(response);
        const normalizedItems = rawItems.map(normalizeEbook);
        const match =
          normalizedItems.find((item) => item.slug === normalizedSlug) ||
          normalizedItems.find((item) => String(item.id) === normalizedSlug);
        setBook(match || null);
        setStatus("success");
      } catch (err) {
        console.error("Failed to load ebook:", err);
        if (!isMounted) return;
        setStatus("error");
        setError("Unable to load this e-book right now.");
      }
    };

    loadEbook();

    return () => {
      isMounted = false;
    };
  }, [slug, reloadToken]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {status === "loading" && (
              <div className="max-w-2xl text-slate-600">Loading e-book...</div>
            )}

            {status === "error" && (
              <div className="max-w-2xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
                <button
                  type="button"
                  onClick={() => setReloadToken((token) => token + 1)}
                  className="ml-3 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  Retry
                </button>
              </div>
            )}

            {status === "success" && !book ? (
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
            ) : status === "success" && book ? (
              <div className="max-w-5xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                      {book.title}
                    </h1>
                    <p className="mt-2 text-slate-600">By {book.author}</p>
                    {(book.pages || book.readTime) && (
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                        {book.pages && <span>{book.pages}</span>}
                        {book.readTime && <span>{book.readTime}</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:min-w-[220px] sm:items-end">
                    <Link
                      to="/ebook"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Back
                    </Link>
                    <a
                      href={book.downloadLink || undefined}
                      download={
                        book.downloadLink
                          ? `${getEbookSlug(book) || book.id}.pdf`
                          : undefined
                      }
                      aria-disabled={!book.downloadLink}
                      tabIndex={book.downloadLink ? undefined : -1}
                      className={`inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 ${
                        book.downloadLink ? "" : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      Download PDF
                    </a>
                    <a
                      href={book.downloadLink || undefined}
                      target={book.downloadLink ? "_blank" : undefined}
                      rel={book.downloadLink ? "noopener noreferrer" : undefined}
                      aria-disabled={!book.downloadLink}
                      tabIndex={book.downloadLink ? undefined : -1}
                      className={`inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 ${
                        book.downloadLink ? "" : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      Open in New Tab
                    </a>
                  </div>
                </div>

                {book.desc && (
                  <p className="mt-6 text-slate-700">{book.desc}</p>
                )}

                {book.downloadLink ? (
                  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <iframe
                      src={book.downloadLink}
                      title={book.title}
                      className="h-[80vh] w-full"
                    />
                  </div>
                ) : (
                  <p className="mt-8 text-sm text-slate-600">
                    Preview is unavailable for this e-book.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
