import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { IoLogoAmazon } from "react-icons/io5";
import { fetchBlogPosts } from "../service/api";

const fallbackBanner = "https://placehold.co/1200x640";
const placeholderThumb = "https://placehold.co/400x260";
const BLOGS_API_URL = "https://savemedhabackend.vercel.app/api/blogs";

const extractArray = (candidate, seen = new Set()) => {
  if (!candidate || seen.has(candidate)) return [];
  if (Array.isArray(candidate)) return candidate;
  if (typeof candidate === "object") {
    seen.add(candidate);
    const keys = ["items", "docs", "results", "data"];
    for (const key of keys) {
      if (!(key in candidate)) continue;
      const arr = extractArray(candidate[key], seen);
      if (arr.length) return arr;
    }
  }
  return [];
};

const normalizeResponse = (payload) => extractArray(payload);

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export default function BlogsDetails({ onNavigate }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [related, setRelated] = useState([]);
  const [commentStatus, setCommentStatus] = useState("idle"); // idle | submitting | error
  const [commentError, setCommentError] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`${BLOGS_API_URL}/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        if (!cancelled) {
          setBlog(data || null);
          setStatus("success");
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    const loadRelated = async () => {
      try {
        const response = await fetchBlogPosts();
        const normalized = normalizeResponse(response);
        if (!cancelled) {
          setRelated(normalized);
        }
      } catch {
        if (!cancelled) {
          setRelated([]);
        }
      }
    };

    load();
    loadRelated();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const meta = useMemo(() => {
    const title =
      blog?.title ||
      "Why Natural Immunotherapy is the Future of Healing";
    const banner =
      blog?.imageUrl ||
      blog?.coverImage ||
      blog?.image ||
      blog?.heroImage ||
      blog?.thumbnail ||
      fallbackBanner;
    const category = blog?.category || blog?.tag || "Health";
    const date = formatDate(blog?.publishedAt || blog?.createdAt || blog?.updatedAt) || "";
    const author =
      blog?.writtenBy ||
      blog?.author?.name ||
      blog?.author ||
      "Admin";
    return { title, banner, category, date, author };
  }, [blog]);

  const trendingPosts = useMemo(() => {
    if (!related?.length) return [];
    return related
      .filter((item) => {
        const itemId = item?.id || item?._id;
        return itemId && itemId !== id;
      })
      .slice(0, 5)
      .map((item, index) => ({
        id: item.id || item._id || `related-${index}`,
        title: item.title || "Untitled",
        author:
          item.writtenBy ||
          item.author?.name ||
          item.authorName ||
          item.author ||
          "Admin",
        date: formatDate(item.publishedAt || item.createdAt) || "",
        image:
          item.imageUrl ||
          item.coverImage?.url ||
          item.coverImage ||
          item.image ||
          item.heroImage ||
          placeholderThumb,
      }));
  }, [related, id]);

  const categoryCards = useMemo(() => {
    const categories = Array.from(
      new Set(
        (related || [])
          .map((item) => item?.category || item?.tag || null)
          .filter(Boolean)
      )
    );
    return (categories.length ? categories : ["Health", "Wellness", "Research", "Nutrition", "Holistic"])
      .slice(0, 5)
      .map((label) => ({ label }));
  }, [related]);

  const rawContent = blog?.content || blog?.description || blog?.excerpt || "";
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phoneNumber = String(formData.get("phoneNumber") || "").trim();
    const comment = String(formData.get("comment") || "").trim();
    const blogId = blog?._id || id;

    if (!name || !phoneNumber || !comment || !blogId) {
      setCommentStatus("error");
      setCommentError("Comment, name, and phone number are required.");
      return;
    }

    try {
      setCommentStatus("submitting");
      setCommentError("");

      const submit = (payload) =>
        fetch(`${BLOGS_API_URL}/${blogId}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

      let response = await submit({ name, phoneNumber, comment });
      if (!response.ok) {
        response = await submit({ name, phoneNumber, comment });
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        setCommentStatus("error");
        setCommentError(
          errorText || "Unable to submit comment. Please try again."
        );
        return;
      }

      const refreshed = await fetch(`${BLOGS_API_URL}/${blogId}`);
      if (refreshed.ok) {
        const data = await refreshed.json();
        setBlog(data || null);
      }
      form.reset();
      setCommentStatus("idle");
    } catch {
      setCommentStatus("error");
      setCommentError("Unable to submit comment. Please try again.");
    }
  };

  useEffect(() => {
    const container = contentRef.current;
    if (!container || typeof window === "undefined") return;

    const isExternalHref = (href) => {
      const trimmed = href?.trim();
      if (!trimmed || trimmed.startsWith("#")) return false;

      const lowerHref = trimmed.toLowerCase();
      if (
        lowerHref.startsWith("mailto:") ||
        lowerHref.startsWith("tel:") ||
        lowerHref.startsWith("sms:") ||
        lowerHref.startsWith("javascript:")
      ) {
        return false;
      }

      try {
        const url = new URL(trimmed, window.location.origin);
        return url.origin !== window.location.origin;
      } catch {
        return false;
      }
    };

    container.querySelectorAll("a[href]").forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href || !isExternalHref(href)) return;

      anchor.setAttribute("target", "_blank");
      const existingRel = anchor.getAttribute("rel") || "";
      const relTokens = new Set(existingRel.split(/\s+/).filter(Boolean));
      relTokens.add("noopener");
      relTokens.add("noreferrer");
      anchor.setAttribute("rel", Array.from(relTokens).join(" "));
    });
  }, [rawContent]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-slate-700">
        Loading blog...
      </div>
    );
  }

  if (status === "error" || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-2xl text-red-600">Blog not found</p>
        <button
          onClick={() => onNavigate?.("blogs")}
          className="rounded-full bg-[#74C425] px-5 py-2 text-white font-semibold hover:bg-[#155300]"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="blogs" onNavigate={onNavigate} />

      <main className="pb-16">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <button
            type="button"
            onClick={() => onNavigate?.("blogs")}
            className="inline-flex items-center gap-2 rounded-full border border-[#74C425] px-4 py-2 text-[#74C425] font-semibold hover:bg-[#74C425] hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Hero + Sidebar */}
        <section className="max-w-6xl mx-auto px-4 pt-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="overflow-hidden rounded-xl shadow border text-[#74C425] border-gray-200 bg-white">
                <img
                  src={meta.banner}
                  alt={meta.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center rounded-full bg-[#74C425] px-3 py-1 text-white font-semibold">
                  {meta.category}
                </span>
                <span>By {meta.author}</span>
                <span>•</span>
                <span>{meta.date}</span>
                <span>•</span>
                <span>Write a Comment</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold  leading-tight">
                {meta.title}
              </h1>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#74C425] text-white p-6 shadow">
                <h3 className="text-xl font-bold mb-2">Request a call back from us!</h3>
                <p className="text-sm text-white/90 mb-4">
                  Fill in the form below to request a call back to get further assistance from us.
                </p>
                <form className="space-y-5 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <div className="relative">
                    <input
                      type="text"
                      id="callback-name"
                      className="peer w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-transparent focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition"
                      placeholder="Your Name"
                    />
                    <label
                      htmlFor="callback-name"
                      className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1e3a8a] transition-all"
                    >
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="callback-mobile"
                      className="peer w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-transparent focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition"
                      placeholder="Your Mobile No."
                    />
                    <label
                      htmlFor="callback-mobile"
                      className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1e3a8a] transition-all"
                    >
                      Your Mobile No.
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      id="callback-description"
                      rows="3"
                      className="peer w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-transparent focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition resize-none"
                      placeholder="Describe your issue"
                    />
                    <label
                      htmlFor="callback-description"
                      className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1e3a8a] transition-all"
                    >
                      Description
                    </label>
                  </div>

                  <button
                    type="button"
                    className="w-full bg-[#1e3a8a] hover:bg-[#14275d] text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg"
                  >
                    Submit
                  </button>
                </form>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-4xl">📘</div>
                  <p className="text-[15px] font-bold text-slate-900 tracking-wide">
                    Know More:
                  </p>
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-[#f5a623] px-4 py-3 text-white font-semibold text-sm shadow hover:bg-[#e1951c] transition-all duration-300 hover:shadow-lg"
                  >
                    <IoLogoAmazon size={26} className="text-white" />
                    Ebook Reference
                  </button>
                </div>

                
                  
                
              </div>
            </div>
              </div>

             
          
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 pt-8 space-y-6">
          <article
            ref={contentRef}
            className="prose prose-slate md:prose-lg mx-auto text-slate-800 font-shippori break-words prose-headings:font-semibold prose-headings:text-slate-900 prose-headings:leading-tight prose-headings:tracking-tight prose-p:my-5 prose-p:leading-[1.8] prose-li:my-2 prose-li:leading-[1.8] prose-ul:pl-6 prose-ol:pl-6 prose-li:marker:text-[#74C425] prose-strong:font-semibold prose-strong:text-slate-900 prose-[b]:font-semibold prose-[b]:text-slate-900 prose-em:font-semibold prose-em:italic prose-[i]:font-semibold prose-[i]:italic prose-a:text-[#1e3a8a] prose-a:font-medium prose-a:underline prose-a:decoration-[#74C425] prose-a:decoration-2 prose-a:underline-offset-4 prose-a:hover:text-[#155300] prose-a:hover:decoration-[#155300] prose-a:focus-visible:outline-none prose-a:focus-visible:ring-2 prose-a:focus-visible:ring-[#74C425]/40 prose-a:focus-visible:ring-offset-2 prose-a:rounded-sm prose-blockquote:border-l-[#74C425] prose-blockquote:text-slate-600 prose-blockquote:font-medium prose-img:rounded-xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{
              __html: rawContent,
            }}
          />
        </section>

        {Array.isArray(blog?.blogImage) &&
          blog.blogImage.some((item) => item?.imageUrl) && (
            <section className="max-w-5xl mx-auto px-4 pt-10 space-y-5">
              <h2 className="text-2xl font-bold text-slate-900">
                Related Visual References
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blog.blogImage
                  .filter((item) => item?.imageUrl)
                  .map((item, index) => (
                    <div
                      key={item.imageUrl ? `${item.imageUrl}-${index}` : index}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <img
                        src={item.imageUrl}
                        alt={`Blog reference ${index + 1}`}
                        loading="lazy"
                        className="h-56 w-full object-cover sm:h-64"
                      />
                    </div>
                  ))}
              </div>
            </section>
          )}

        {Array.isArray(blog?.faqs) && blog.faqs.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 pt-10 space-y-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {blog.faqs.map((faq, index) => (
                <details
                  key={faq.question ? `${faq.question}-${index}` : index}
                  className="group rounded-xl border border-slate-200 bg-white p-4"
                >
                  <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-start justify-between gap-3">
                    <span>{faq.question}</span>
                    <span className="text-[#74C425] text-xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Trending Slider */}
        <section className="mt-12 px-4">
          <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-[#e8ffd8] to-white p-6 shadow-inner relative">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Trending Blogs</h3>
            <div className="relative">
              <button
                type="button"
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#74C425] text-[#74C425] shadow"
                aria-label="Previous"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex gap-4 overflow-x-auto scroll-smooth pb-2 hide-scrollbar">
                {(trendingPosts.length ? trendingPosts : related).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="min-w-[240px] rounded-xl bg-white border border-gray-200 shadow-sm p-3 flex gap-3"
                  >
                    <img
                      src={
                        item.image ||
                        item.coverImage?.url ||
                        item.coverImage ||
                        item.heroImage ||
                        placeholderThumb
                      }
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-500">
                        By {item.author || item.authorName || "Admin"} •{" "}
                        {formatDate(item.date || item.publishedAt || item.createdAt)}
                      </p>
                      <h4 className="text-sm font-semibold text-[#74C425] line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#74C425] text-[#74C425] shadow"
                aria-label="Next"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-6xl mx-auto px-4 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">All Category</h3>
            <span className="h-[2px] w-10 bg-slate-900 inline-block" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryCards.map((cat) => (
              <div
                key={cat.label}
                className="rounded-2xl bg-[#f0f6ff] text-center p-4 shadow border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#74C425] text-white flex items-center justify-center text-2xl mb-3">
                  📘
                </div>
                <p className="font-semibold text-slate-900">{cat.label}</p>
                <button className="mt-2 text-sm font-semibold text-[#74C425] hover:text-[#155300]">
                  Know More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Comments */}
        <section className="max-w-6xl mx-auto px-4 pt-12 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#e8ffd8] text-[#74C425] flex items-center justify-center">
              <Quote size={22} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Comments</h3>
          </div>

          <form
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-3"
            onSubmit={handleCommentSubmit}
          >
            <div className="space-y-1">
              <label
                htmlFor="comment-name"
                className="text-sm font-semibold text-slate-700"
              >
                Name
              </label>
              <input
                id="comment-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#74C425]"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="comment-phone"
                className="text-sm font-semibold text-slate-700"
              >
                Phone Number
              </label>
              <input
                id="comment-phone"
                name="phoneNumber"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Your phone number"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#74C425]"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="comment-message"
                className="text-sm font-semibold text-slate-700"
              >
                Message
              </label>
              <textarea
                id="comment-message"
                name="comment"
                rows={4}
                required
                placeholder="Write your comment"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#74C425]"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={commentStatus === "submitting"}
                className="rounded-full bg-[#74C425] text-white font-semibold px-5 py-2 hover:bg-[#155300] transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {commentStatus === "submitting" ? "Submitting..." : "Submit Comment"}
              </button>
            </div>
            {commentError && (
              <p className="text-sm text-red-600">{commentError}</p>
            )}
          </form>

          <div className="space-y-4">
            {Array.isArray(blog?.comments) && blog.comments.length > 0 ? (
              blog.comments.map((comment, index) => {
                const displayName = comment?.name || "Anonymous";
                const initials = displayName
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase())
                  .join("");
                const body = comment?.comment || comment?.message || "";
                const dateLabel = comment?.createdAt
                  ? formatDate(comment.createdAt)
                  : "";

                return (
                  <div
                    key={comment?._id || comment?.createdAt || index}
                    className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-[#e8ffd8] text-[#155300] font-semibold flex items-center justify-center">
                        {initials || "A"}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-slate-900">
                            {displayName}
                          </p>
                          {dateLabel && (
                            <span className="text-xs text-slate-500">
                              {dateLabel}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                          {body || "No message provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-600">No comments yet.</p>
            )}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
