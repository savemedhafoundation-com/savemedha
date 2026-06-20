import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Blocks,
  Brain,
  Mail,
  Network,
  Phone,
  Sprout,
} from "lucide-react";
import { Seo } from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogPageSkeleton from "../components/BlogPageSkeleton";
import blogBanner from "../assets/Photo/blog image.png";

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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://savemedhabackend.vercel.app";
const BLOGS_API_URL = `${API_BASE_URL}/api/blogs`;
const SITE_BASE_URL =
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");
const POSTS_PER_PAGE = 6;
const BLOGS_CACHE_KEY = "blogs_cache_v1";

const getShareUrl = (slug) => {
  if (!slug || !SITE_BASE_URL) return "";
  return `${SITE_BASE_URL.replace(/\/$/, "")}/blogs/${encodeURIComponent(slug)}`;
};

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

const getReadTime = (excerpt = "") => {
  const words = excerpt.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 120))} min read`;
};

const categoryFilters = [
  "View all",
  "Natural Science",
  "Chronic Disease",
  "Nutrition",
  "Holistic",
];

const insightTiles = [
  {
    title: "Cognitive Calibration",
    text: "Our insights sharpen practical awareness around prevention, nutrition, and long-term wellness.",
    icon: Brain,
  },
  {
    title: "Interpretative Ecosystem",
    text: "Articles connect science, community experience, and holistic care in a calm reading flow.",
    icon: Network,
  },
  {
    title: "Inner Terrain Nourishment",
    text: "Readable guidance helps patients and families think clearly about supportive health choices.",
    icon: Sprout,
  },
  {
    title: "Conceptual Coherence",
    text: "Each post keeps complex health topics grounded, accessible, and easy to revisit.",
    icon: Blocks,
  },
];

function CategoryPill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full bg-[#e7f6df] px-3 py-1 text-[11px] font-semibold text-[#189500] ${className}`}
    >
      {children || "Natural Science"}
    </span>
  );
}

function ReadButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-950 px-3 text-xs font-semibold text-slate-950 transition hover:border-[#189500] hover:bg-[#189500] hover:text-white ${className}`}
    >
      Read article
      <ArrowRight size={14} />
    </button>
  );
}

function BlogPreviewCard({ post, onRead }) {
  return (
    <article className="group flex min-h-[300px] flex-col overflow-hidden bg-white">
      <div className="overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
        <img
          src={post.coverImage || blogBanner}
          alt={post.title}
          className="aspect-[1.55] w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col pt-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500">
          <span className="font-semibold text-[#189500]">
            {post.category || "Natural Science"}
          </span>
          <span>{post.date || "Recent"}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-slate-950">
          {post.title}
        </h3>
        <ReadButton onClick={() => onRead(post.slug)} className="mt-5" />
      </div>
    </article>
  );
}

function TrendingItem({ post, onRead }) {
  return (
    <button
      type="button"
      onClick={() => onRead(post.slug)}
      className="block w-full border-b border-slate-200 py-4 text-left last:border-b-0"
    >
      <span className="text-[11px] font-semibold text-[#189500]">
        {post.category || "Science"}
      </span>
      <h4 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-slate-950">
        {post.title}
      </h4>
      <p className="mt-1 text-[11px] text-slate-500">{post.date || "Recent"}</p>
    </button>
  );
}

export default function Blogs({ onNavigate }) {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [reloadToken, setReloadToken] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("View all");

  const normalizePost = useCallback((post, index) => {
    return {
      id: post?.id || post?._id || post?.slug || `blog-${index}`,
      slug: post?.slug || post?._id || post?.id || "",
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
        const cachedRaw = window.localStorage.getItem(BLOGS_CACHE_KEY);
        if (cachedRaw) {
          const cachedPosts = JSON.parse(cachedRaw);
          if (Array.isArray(cachedPosts) && cachedPosts.length) {
            setPosts(cachedPosts);
            setStatus("success");
          }
        }
      } catch {
        // Cache is a convenience only; failed reads should not block the page.
      }

      try {
        const response = await axios.get(BLOGS_API_URL);
        if (!isMounted) return;
        const rawPosts = normalizeResponse(response?.data);
        const normalized = rawPosts.map(normalizePost);
        setPosts(normalized);
        try {
          window.localStorage.setItem(BLOGS_CACHE_KEY, JSON.stringify(normalized));
        } catch {
          // Ignore cache write failures.
        }
        setStatus("success");
      } catch {
        if (!isMounted) return;
        setStatus((prev) => (prev === "success" ? "success" : "error"));
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
  }, [normalizedSearchQuery, activeCategory]);

  const visiblePosts = normalizedPosts.filter((post) => {
    const searchableText = [post.title, post.excerpt, post.category, post.author]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesSearch =
      !normalizedSearchQuery || searchableText.includes(normalizedSearchQuery);
    const matchesCategory =
      activeCategory === "View all" ||
      post.category?.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const latestPost = visiblePosts[0];
  const trendingPosts = visiblePosts.slice(1, 4);
  const totalPages = Math.ceil(visiblePosts.length / POSTS_PER_PAGE);
  const activePage = totalPages ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (activePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = visiblePosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

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

  const handleReadMore = (postSlug) => {
    if (onNavigate && postSlug) {
      onNavigate("blogs-detail", { slug: postSlug });
    }
  };

  const handleShare = (post) => {
    const shareUrl = getShareUrl(post?.slug);
    if (!shareUrl) return;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${post?.title || "Save Medha Blog"} ${shareUrl}`
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const showErrorInline = status === "error";
  const showEmptyInline = status === "success" && !normalizedPosts.length;
  const showNoMatchesInline =
    status === "success" &&
    normalizedPosts.length > 0 &&
    (Boolean(normalizedSearchQuery) || activeCategory !== "View all") &&
    visiblePosts.length === 0;
  const showPostsInline = status === "success" && visiblePosts.length > 0;

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Seo
        title="Blogs"
        description="Read expert articles on Natural Immunotherapy, cancer care, and holistic health from Save Medha Foundation."
        path="/blogs"
      />
      <Navbar currentPage="blogs" onNavigate={onNavigate} />

      <main>
        <section className="border-y border-slate-100 bg-[#fafafa]">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center sm:py-20 lg:py-24">
            <CategoryPill>Latest Publications</CategoryPill>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              <span className="text-[#189500]">Medical Science</span> &{" "}
              <span className="text-[#189500]">Holistic</span> Insights.
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
              Discover breakthrough perspectives on natural immunotherapy,
              healing, and building a resilient biological terrain.
            </p>
            <form
              className="mt-9 flex w-full max-w-md items-center rounded-md border border-slate-300 bg-white p-1.5 shadow-sm"
              onSubmit={(event) => event.preventDefault()}
            >
              <Mail size={17} className="ml-2 shrink-0 text-slate-500" />
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                className="rounded bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#189500]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
          {showErrorInline && (
            <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Unable to load blogs.
              <button
                type="button"
                onClick={() => setReloadToken((token) => token + 1)}
                className="ml-3 rounded bg-[#189500] px-3 py-1 text-xs font-semibold text-white"
              >
                Retry
              </button>
            </div>
          )}

          {showEmptyInline && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              No blogs available.
            </div>
          )}

          {showNoMatchesInline && (
            <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              No blogs found
              {searchQuery ? ` for "${searchQuery}"` : ""}.
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("View all");
                  onNavigate?.("blogs");
                }}
                className="ml-3 rounded bg-[#189500] px-3 py-1 text-xs font-semibold text-white"
              >
                Clear
              </button>
            </div>
          )}

          {showPostsInline && (
            <div className="grid gap-9 lg:grid-cols-[minmax(0,1.45fr)_minmax(295px,0.75fr)]">
              <article>
                <div className="overflow-hidden rounded-lg bg-slate-100">
                  <img
                    src={latestPost?.coverImage || blogBanner}
                    alt={latestPost?.title || "Latest blog"}
                    className="aspect-[1.85] w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <CategoryPill className="px-2.5 py-1 text-[10px]">
                    {latestPost?.category || "Immunotherapy"}
                  </CategoryPill>
                  <span>{latestPost?.date || "Recent"}</span>
                  <span>{getReadTime(latestPost?.excerpt)}</span>
                </div>
                <h2 className="mt-3 max-w-2xl text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
                  {latestPost?.title}
                </h2>
                <p className="mt-4 max-w-2xl line-clamp-4 text-sm leading-relaxed text-slate-600">
                  {latestPost?.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ReadButton onClick={() => handleReadMore(latestPost?.slug)} />
                  <button
                    type="button"
                    onClick={() => handleShare(latestPost)}
                    className="inline-flex h-9 items-center rounded-md px-3 text-xs font-semibold text-[#189500] transition hover:bg-[#e7f6df]"
                  >
                    Share
                  </button>
                </div>
              </article>

              <aside className="space-y-7">
                <div className="rounded-md border border-slate-200 bg-slate-100 p-5">
                  <h3 className="text-base font-bold text-slate-950">
                    Request Consultation
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Enter your details and our medical team will contact you shortly.
                  </p>
                  <label className="mt-4 block text-xs font-semibold text-slate-700">
                    Phone number
                  </label>
                  <div className="mt-2 flex items-center rounded border border-slate-300 bg-white px-3">
                    <Phone size={15} className="text-slate-500" />
                    <input
                      type="tel"
                      className="min-w-0 flex-1 px-2 py-2 text-sm outline-none"
                      placeholder="Your mobile no."
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#189500]"
                  >
                    Submit Request
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-950">
                    Trending Now
                  </h3>
                  <div className="mt-2">
                    {(trendingPosts.length ? trendingPosts : visiblePosts.slice(0, 3)).map(
                      (post) => (
                        <TrendingItem
                          key={post.id}
                          post={post}
                          onRead={handleReadMore}
                        />
                      )
                    )}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-7 flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-extrabold text-slate-950">All Blogs</h2>
            <div className="flex flex-wrap items-center gap-2">
              {categoryFilters.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-[#189500] text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {status === "loading" ? (
            <BlogPageSkeleton count={POSTS_PER_PAGE} showImage={false} />
          ) : (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <BlogPreviewCard
                  key={post.id}
                  post={post}
                  onRead={handleReadMore}
                />
              ))}
            </div>
          )}

          {status !== "loading" && totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-transparent text-slate-500 transition hover:border-slate-200 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous page"
              >
                <ArrowLeft size={16} />
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
                    className={`h-9 min-w-9 rounded px-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
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
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-transparent text-slate-500 transition hover:border-slate-200 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Next page"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-slate-950">
              Why read our insights?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Our literature is designed not just to inform, but to fundamentally
              upgrade how you perceive health, disease, and the body's natural
              healing capacity.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {insightTiles.map(({ title, text, icon: Icon }) => (
              <div key={title}>
                <div className="flex h-12 w-12 items-center justify-center rounded border border-[#bfe6b3] bg-white text-[#189500]">
                  <Icon size={23} />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
