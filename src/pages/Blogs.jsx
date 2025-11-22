import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { fetchBlogPosts } from "../service/api";

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

const placeholderCards = Array.from({ length: 6 });

export default function Blogs({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      setStatus("loading");
      setErrorMessage("");
      try {
        const response = await fetchBlogPosts();
        if (!isMounted) return;
        setPosts(normalizeResponse(response));
        setStatus("success");
      } catch (error) {
        if (!isMounted) return;
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load blogs right now.";
        setErrorMessage(message);
        setStatus("error");
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, [reloadToken]);

  const normalizedPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return posts.map((post, index) => {
      const author =
        post?.author?.name ||
        post?.authorName ||
        post?.byline ||
        post?.author ||
        "Save Medha Editorial";

      const coverImage =
        post?.coverImage?.url ||
        post?.coverImage ||
        post?.heroImage?.url ||
        post?.image?.url ||
        post?.image ||
        null;

      const excerpt =
        post?.excerpt ||
        post?.summary ||
        post?.description ||
        post?.content ||
        post?.body ||
        "";

      return {
        id: post?.id || post?._id || post?.slug || `blog-${index}`,
        title: post?.title || post?.heading || "Untitled Story",
        author,
        date: formatDate(post?.publishedAt || post?.createdAt || post?.updatedAt),
        excerpt,
        coverImage,
      };
    });
  }, [posts]);

  const hasContent = normalizedPosts.length > 0;

  const renderBody = () => {
    if (status === "loading") {
      return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderCards.map((_, idx) => (
            <div
              key={`placeholder-${idx}`}
              className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="mb-4 h-40 w-full rounded-xl bg-slate-200" />
              <div className="mb-2 h-5 w-3/4 rounded bg-slate-200" />
              <div className="mb-6 h-4 w-1/3 rounded bg-slate-200" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-11/12 rounded bg-slate-200" />
                <div className="h-4 w-10/12 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg font-semibold text-red-600">{errorMessage}</p>
          <button
            type="button"
            onClick={() => setReloadToken((token) => token + 1)}
            className="mt-4 rounded-full bg-[#74C425] px-6 py-3 font-semibold text-white shadow hover:bg-[#5aa210]"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!hasContent) {
      return (
        <div className="text-center text-lg text-slate-600">
          No blog posts available yet. Please check back soon!
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-5">
        {normalizedPosts.map((post) => (
          <>
          <BlogCard key={post.id} {...post} onNavigate={onNavigate} />
          </>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="blogs" onNavigate={onNavigate} />

      <main className="space-y-16 pb-16 pt-6 px-20">
        <section className="bg-gradient-to-r from-[#0b2fa1] via-[#1d4ed8] to-[#74C425] text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                Insights & Stories
              </p>
              <h1 className="font-koho text-4xl font-bold leading-tight sm:text-5xl">
                Blog Library
              </h1>
              <p className="text-base text-white/80 sm:text-lg">
                Field updates, patient journeys, and research-backed guidance from the Save
                Medha medical team—curated to keep you inspired.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 text-white backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                Status
              </p>
              <p className="text-3xl font-bold">
                {status === "loading"
                  ? "Loading..."
                  : `${normalizedPosts.length.toString().padStart(2, "0")} Posts`}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4">
          <header className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#74C425]">
              Latest Articles
            </p>
            <h2 className="font-koho text-3xl font-bold text-slate-900">
              Learn, heal, and stay inspired
            </h2>
            <p className="text-base text-slate-600">
              We translate complex science into everyday language so you can take confident steps
              on your healing journey.
            </p>
          </header>

          {renderBody()}
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
