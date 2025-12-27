import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ebooks } from "../data/ebooks";

const PAGE_SIZE = 9;

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

  const paginatedEbooks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ebooks.slice(start, start + PAGE_SIZE);
  }, [page]);

  const rangeLabel = useMemo(() => {
    if (!ebooks.length) return "";
    const start = (page - 1) * PAGE_SIZE;
    const startNumber = Math.min(start + 1, ebooks.length);
    const endNumber = Math.min(start + PAGE_SIZE, ebooks.length);
    return `Showing ${startNumber}-${endNumber} of ${ebooks.length}`;
  }, [page]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage="ebook" onNavigate={onNavigate} />

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                E-Books & Research Publications
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Educational resources by Save Medha Foundation based on Natural
                Immunotherapy, nutrition science, and real clinical experience.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedEbooks.map((book) => (
                <div
                  key={book.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-t-2xl bg-slate-100">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      By {book.author}
                    </p>

                    <p className="mt-3 text-sm text-slate-700 line-clamp-3">
                      {book.desc}
                    </p>

                    <div className="mt-3 flex gap-4 text-xs text-slate-500">
                      <span>{book.pages}</span>
                      <span>{book.readTime}</span>
                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                      <Link
                        to={book.readLink}
                        className="inline-flex items-center justify-center rounded-xl bg-[#6bc12f] px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                      >
                        Read Online
                      </Link>
                      <a
                        href={book.downloadLink}
                        download={`${getSlugFromReadLink(book.readLink) || book.id}.pdf`}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === page;

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => setPage(pageNumber)}
                        className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                          isActive
                            ? "bg-[#6bc12f] text-white"
                            : "border border-slate-200 text-slate-800 hover:bg-slate-50"
                        }`}
                        aria-label={`Go to page ${pageNumber}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    Next
                  </button>
                </div>

                {rangeLabel ? (
                  <p className="text-sm text-slate-500">{rangeLabel}</p>
                ) : null}
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
