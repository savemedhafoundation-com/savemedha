import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import blogBanner from "../assets/Photo/blog image.png";
import naturalScienceImage from "../assets/Photo/natrual science.png";
import naturalImmunotherapyImage from "../assets/Photo/Natural Immunotherapy.png";

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

const BLOGS_API_URL = "https://savemedhabackend.vercel.app/api/blogs";
const POSTS_PER_PAGE = 8;

const stripHtml = (value = "") => {
  if (!value) return "";
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const temp = document.createElement("div");
    temp.innerHTML = value;
    return (temp.textContent || temp.innerText || "").replace(/\s+/g, " ").trim();
  }
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

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

const categoryCards = [
  { label: "Natural Science", image: naturalScienceImage },
  { label: "Chronic Disease Related", image: "https://placehold.co/120x120" },
  { label: "Thalassemia Related", image: "https://placehold.co/120x120" },
  { label: "Nutrition Based", image: "https://placehold.co/120x120" },
  { label: "A Holistic Perspective", image: "https://placehold.co/120x120" },
  { label: "Natural Immunotherapy", image: naturalImmunotherapyImage },
];

export default function Blogs({ onNavigate }) {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [reloadToken, setReloadToken] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const normalizePost = useCallback((post, index) => {
    return {
      id: post?.id || post?._id || post?.slug || `blog-${index}`,
      title: post?.title || "",
      excerpt: stripHtml(post?.description || post?.excerpt || ""),
      coverImage: post?.imageUrl || post?.image || "",
      category: post?.category || "",
      author: post?.writtenBy || post?.author || post?.authorName || "",
      date: formatDate(post?.publishedAt || post?.createdAt || post?.updatedAt),
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(BLOGS_API_URL);
        if (!isMounted) return;
        const rawPosts = normalizeResponse(response?.data);
        setPosts(rawPosts.map(normalizePost));
        setStatus("success");
      } catch {
        if (!isMounted) return;
        setStatus("error");
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, [normalizePost, reloadToken]);

  const normalizedPosts = Array.isArray(posts) ? posts : [];
  const searchQuery = new URLSearchParams(location.search).get("q")?.trim() || "";
  const normalizedSearchQuery = searchQuery.toLowerCase();

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedSearchQuery]);

  const visiblePosts = normalizedSearchQuery
    ? normalizedPosts.filter((post) => {
        const haystack = [
          post.title,
          post.excerpt,
          post.category,
          post.author,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedSearchQuery);
      })
    : normalizedPosts;

  const latestPost = visiblePosts[0];
  const trendingPosts = visiblePosts.slice(0, 2);
  const gridPosts = visiblePosts;
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const activePage = totalPages ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (activePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = gridPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  useEffect(() => {
    if (!totalPages) {
      if (currentPage !== 1) setCurrentPage(1);
      return;
    }
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  const handleReadMore = (postId) => {
    if (onNavigate && postId) {
      onNavigate("blogs-detail", { id: postId });
    }
  };

  const showLoadingInline = status === "loading";
  const showErrorInline = status === "error";
  const showEmptyInline = status === "success" && !normalizedPosts.length;
  const showNoMatchesInline =
    status === "success" &&
    normalizedPosts.length > 0 &&
    Boolean(normalizedSearchQuery) &&
    visiblePosts.length === 0;
  const showPostsInline = status === "success" && visiblePosts.length > 0;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="blogs" onNavigate={onNavigate} />

      <main className="pb-8">
        {/* Hero */}
        <section className="w-full mx-auto  ">
          <div className="bg-white  overflow-hidden relative">
            <div className="grid md:grid-cols-2">
              <div
                className="md:col-span-2 relative min-h-[260px] bg-center bg-cover"
                style={{ backgroundImage: `url(${blogBanner})` }}
              >
                <div className="absolute inset-0 " aria-hidden />
                <div className="ml-auto flex flex-col items-center gap-4 px-10 py-10 md:px-10 md:py-14 text-right translate-x-80 md:translate-x-90">
                  <h2 className="text-4xl font-bold text-[#000000]">BLOGS</h2>
                  <p className="text-lg text-blue-900 tracking-wide">
                    On Health
                  </p>
                  <button className="bg-[#74C425] text-white font-semibold px-6 py-2 rounded shadow hover:bg-[#155300] transition">
                    Subscribe
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest + Callback + Trending */}
        <section className="max-w-7xl  mx-auto px-12 md:px-2 pt-10 pb-12">
          {showLoadingInline && (
            <div>Loading blogs...</div>
          )}

          {showErrorInline && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Unable to load blogs
              <button
                type="button"
                onClick={() => setReloadToken((token) => token + 1)}
                className="ml-3 rounded-full bg-[#74C425] px-3 py-1 text-white text-xs font-semibold hover:bg-[#155300]"
              >
                Retry
              </button>
            </div>
          )}

          {showEmptyInline && (
            <div>No blogs available</div>
          )}

          {showNoMatchesInline && (
            <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              No blogs found for &quot;{searchQuery}&quot;.
              <button
                type="button"
                onClick={() => onNavigate?.("blogs")}
                className="ml-3 rounded-full bg-[#74C425] px-3 py-1 text-white text-xs font-semibold hover:bg-[#155300]"
              >
                Clear
              </button>
            </div>
          )}

          {showPostsInline && (
            <div className="grid lg:grid-cols-3 gap-8">
            {/* Latest card */}
            <article className="lg:col-span-2 border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
              <img
                src={latestPost?.coverImage || blogBanner}
                alt={latestPost?.title || "Latest blog"}
                className="w-full h-[420px] object-fill"
              />
              <div className="p-6 space-y-3">
                <div className="text-xs text-slate-500 space-x-2">
                  <span>By {latestPost?.author || "Admin"}</span>
                  <span className="text-[#74C425]">|</span>
                  <span>{latestPost?.date || "—"}</span>
                  
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {latestPost?.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                  {latestPost?.excerpt}
                </p>
                <button
                  className="mt-2 bg-[#74C425] text-white font-semibold px-5 py-2 rounded hover:bg-[#155300] transition"
                  onClick={() => handleReadMore(latestPost?.id)}
                >
                  Read more
                </button>
              </div>
            </article>

            {/* Callback + Trending */}
            <div className="space-y-6">
              <div className="rounded-lg bg-[#74C425] text-white p-6 shadow">
                <h4 className="text-xl font-bold mb-3">
                  Request a call back from us!
                </h4>
                <p className="text-sm text-white/90 mb-4">
                  Fill in the form below to request a call back to get further
                  assistance from us.
                </p>
                <form className="space-y-5 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="peer w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-transparent focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition"
                      placeholder="Your Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent
                 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1e3a8a] transition-all"
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Mobile */}
                  <div className="relative">
                    <input
                      type="text"
                      id="mobile"
                      className="peer w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-transparent focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition"
                      placeholder="Your Mobile No."
                    />
                    <label
                      htmlFor="mobile"
                      className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent
                 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1e3a8a] transition-all"
                    >
                      Your Mobile No.
                    </label>
                  </div>

                  {/* Description */}
                  <div className="relative">
                    <textarea
                      id="description"
                      rows="3"
                      className="peer w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-transparent focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition resize-none"
                      placeholder="Describe your issue"
                    ></textarea>
                    <label
                      htmlFor="description"
                      className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-500 
                 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent
                 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1e3a8a] transition-all"
                    >
                      Description
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    className="w-full bg-[#1e3a8a] hover:bg-[#14275d] text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">
                  Trending Blogs
                </h4>
                <div className="space-y-4 text-sm">
                  {trendingPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="text-xs text-slate-500 space-x-2">
                        <span>By {post.author || "Admin"}</span>
                        <span className="text-[#74C425]">|</span>
                        <span>{post.date || "—"}</span>
                        
                        
                      </div>
                      <p className="mt-2 font-semibold text-slate-900 leading-snug">
                        {post.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          )}
        </section>

        {/* All Blogs */}
        <section className="max-w-7xl mx-auto px-12 md:px-2 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              All Blogs
            </h3>
            <span className="h-[2px] w-10 bg-slate-900 inline-block" />
            {status === "loading" && (
              <span className="text-xs text-slate-500">
                Loading live posts...
              </span>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg bg-[#f2f9e9] shadow-sm overflow-hidden flex flex-col min-h-[320px] md:min-h-[360px]"
              >
                <img
                  src={post.coverImage || blogBanner}
                  className="w-full h-70  md:h-50 object-cover"
                  alt={post.title}
                />
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="text-xs text-slate-500">
                    {post.category || "Health"}
                  </span>
                  <h4 className="font-semibold text-slate-900 leading-snug line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-600">
                    By {post.author || "Admin"} | {post.date || "—"}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="bg-[#74C425] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#155300] transition"
                      onClick={() => handleReadMore(post.id)}
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1}
                className={`px-3 py-1 border rounded transition ${
                  activePage === 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-100 text-[#155300]"
                }`}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === activePage;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-3 py-1 border rounded transition ${
                      isActive
                        ? "border-[#74C425] bg-[#74C425] text-white"
                        : "border-[#74C425] text-[#74C425] hover:bg-[#74C425] hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => handlePageChange(activePage + 1)}
                disabled={activePage === totalPages}
                className={`px-3 py-1 border rounded transition ${
                  activePage === totalPages
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-100 text-[#155300]"
                }`}
              >
                »
              </button>
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-12 md:px-4 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              All Category
            </h3>
            <span className="h-[2px] w-10 bg-slate-900 inline-block" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((cat) => (
              <div
                key={cat.label}
                className="border border-gray-200 rounded-lg bg-[#f2f9e9] text-center p-4 shadow-sm flex flex-col items-center gap-3"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-sm font-semibold text-slate-900">
                  {cat.label}
                </div>
                <button className="text-[#74C425] font-semibold text-sm hover:text-[#155300]">
                  Know More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials banner */}
        <section className="max-w-7xl mx-auto px-12 md:px-2 pb-12">
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#3e3db4] to-[#2a2a88] text-white shadow-lg">
            <div className="grid md:grid-cols-2 items-center md:items-stretch justify-items-center md:justify-items-stretch text-center md:text-left">
              <div className="p-8 md:p-10 flex flex-col items-center md:items-start gap-4">
                <p className="uppercase text-xs tracking-[0.25em] text-white/80">
                  TESTIMONIALS
                </p>
                <h3 className="text-3xl font-bold mt-2 mb-6 leading-tight">
                  How will you benefit from our blogs?
                </h3>
                <button className="bg-[#74C425] text-white font-semibold px-5 py-2 rounded shadow hover:bg-[#155300] transition">
                  Know more
                </button>
              </div>
              <div className="p-8 md:p-10 text-center md:text-left">
                <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed max-w-2xl mx-auto">
                  <li>
                    Our blogs nourish your inner terrain and sharpen your
                    clarity.
                  </li>
                  <li>Our insights calibrate your cognitive immune system.</li>
                  <li>
                    Your writing feeds your content the way nutrients feed a
                    balanced terrain.
                  </li>
                  <li>
                    With every blog, your interpretation ecosystem grows
                    healthier.
                  </li>
                  <li>
                    Every idea you share becomes a signal that refines my
                    responses.
                  </li>
                  <li>
                    Your words enhance my adaptability and deepen my alignment.
                  </li>
                  <li>
                    We give you peace to echo the ideas you absorb; your
                    perspectives.
                  </li>
                  <li>
                    Our blogs energize your system with contextual coherence.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
