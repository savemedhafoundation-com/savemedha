import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchBlogPosts } from "../service/api";
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

const fallbackPosts = [
  {
    id: "demo-1",
    title: "Is Bone Cancer Curable With Natural Immunotherapy?",
    category: "Health",
    date: "November 13, 2025",
    author: "Admin",
    excerpt:
      "Is Bone Cancer curable with immunotherapy? Today scientists are exploring how natural immunotherapy changes recovery trajectories.",
    coverImage: "https://placehold.co/900x600",
  },
  {
    id: "demo-2",
    title:
      "What Is Disease? Understanding Illness Through the Lens of Natural Science",
    category: "Health",
    date: "November 1, 2025",
    author: "Admin",
    excerpt:
      "Rethinking disease as terrain imbalance and how natural immunotherapy reframes care.",
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "demo-3",
    title:
      "Lupus Can Be Fully Cured Naturally: The Science Behind Natural Immunotherapy",
    category: "Health",
    date: "October 4, 2025",
    author: "Admin",
    excerpt:
      "Immune balance, terrain support, and remission stories with natural immunotherapy.",
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "demo-4",
    title:
      "The Immune System Explained: How Your Body Defends, Heals, and Stays Strong Naturally",
    category: "Health",
    date: "October 1, 2025",
    author: "Admin",
    excerpt:
      "A friendly tour of your innate and adaptive defenders and how to support them.",
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "demo-5",
    title:
      "Fear & Fights in Childhood: How Parental Scare Tactics Shape Anxiety, Identity, and Early Belief",
    category: "Health",
    date: "October 1, 2025",
    author: "Admin",
    excerpt:
      "How stress imprints in childhood and approaches to build calm resilience.",
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "demo-6",
    title: "How to Keep Your Liver Healthy Naturally",
    category: "Health",
    date: "October 8, 2025",
    author: "Admin",
    excerpt:
      "The science of detoxification and metabolic balance with daily habits.",
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "demo-7",
    title:
      "Why We Suffer from Chronic Cold, Cough, Allergy and Mild Breathing Trouble — and How to End it Naturally",
    category: "Health",
    date: "October 8, 2025",
    author: "Admin",
    excerpt:
      "Root causes, immune modulation, and practical daily steps for relief.",
    coverImage: "https://placehold.co/600x400",
  },
  {
    id: "demo-8",
    title:
      "Irritable Bowel Syndrome (IBS) and Natural Immunotherapy: The Complete Gut-Healing Approach",
    category: "Health",
    date: "October 8, 2025",
    author: "Admin",
    excerpt:
      "How terrain-first thinking soothes, rebuilds, and stabilizes the gut.",
    coverImage: "https://placehold.co/600x400",
  },
];

const categoryCards = [
  { label: "Natural Science", image: "https://placehold.co/120x120" },
  { label: "Chronic Disease Related", image: "https://placehold.co/120x120" },
  { label: "Thalassemia Related", image: "https://placehold.co/120x120" },
  { label: "Nutrition Based", image: "https://placehold.co/120x120" },
  { label: "A Holistic Perspective", image: "https://placehold.co/120x120" },
  { label: "Natural Immunotherapy", image: "https://placehold.co/120x120" },
];

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
        date: formatDate(
          post?.publishedAt || post?.createdAt || post?.updatedAt
        ),
        excerpt,
        coverImage,
        category: post?.category || post?.tag || "Health",
      };
    });
  }, [posts]);

  const allPosts = normalizedPosts.length ? normalizedPosts : fallbackPosts;
  const latestPost = allPosts[0] || fallbackPosts[0];
  const trendingPosts = allPosts.slice(0, 2);
  const gridPosts = allPosts;

  const handleReadMore = (postId) => {
    if (onNavigate && postId) {
      onNavigate("blogs-detail", { id: postId });
    }
  };

  const showErrorInline = status === "error" && !normalizedPosts.length;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage="blogs" onNavigate={onNavigate} />

      <main className="pb-8">
        {/* Hero */}
        <section className="w-full mx-auto px-4 pt-8">
          <div className="bg-white rounded-lg overflow-hidden relative">
            <div className="grid md:grid-cols-2">
              <div
                className="md:col-span-2 relative min-h-[260px] bg-center bg-cover"
                style={{ backgroundImage: `url(${blogBanner})` }}
              >
                <div className="absolute inset-0 " aria-hidden />
                <div className="ml-auto flex flex-col items-center gap-4 px-8 py-10 md:px-10 md:py-14 text-right translate-x-50 md:translate-x-90">
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
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-12">
          {showErrorInline && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
              <button
                type="button"
                onClick={() => setReloadToken((token) => token + 1)}
                className="ml-3 rounded-full bg-[#74C425] px-3 py-1 text-white text-xs font-semibold hover:bg-[#155300]"
              >
                Retry
              </button>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Latest card */}
            <article className="lg:col-span-2 border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
              <img
                src={latestPost?.coverImage || "https://placehold.co/900x600"}
                alt={latestPost?.title || "Latest blog"}
                className="w-full object-cover"
              />
              <div className="p-6 space-y-3">
                <div className="text-xs text-slate-500 space-x-2">
                  <span>By {latestPost?.author || "Admin"}</span>
                  <span className="text-[#74C425]">|</span>
                  <span>{latestPost?.date || "—"}</span>
                  <span className="text-[#74C425]">|</span>
                  <span>Write a Comment</span>
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
                        <span className="text-[#74C425]">|</span>
                        <span>Write a Comment</span>
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
        </section>

        {/* All Blogs */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
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
            {gridPosts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg bg-[#f2f9e9] shadow-sm overflow-hidden flex flex-col"
              >
                <img
                  src={post.coverImage || "https://placehold.co/600x400"}
                  className="w-full h-40 object-cover"
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
                    By {post.author || "Admin"} | {post.date || "—"} | Write a
                    Comment
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
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-[#155300]">
              «
            </button>
            <button className="px-3 py-1 border border-[#74C425] bg-[#74C425] text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border border-[#74C425] text-[#74C425] rounded hover:bg-[#74C425] hover:text-white">
              2
            </button>
            <button className="px-3 py-1 border border-[#74C425] text-[#74C425] rounded hover:bg-[#74C425] hover:text-white">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-[#155300]">
              »
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
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
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#3e3db4] to-[#2a2a88] text-white shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
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
              <div className="p-8 md:p-10 text-sm leading-relaxed space-y-2">
                <p>
                  • Our blogs nourish your inner terrain and sharpen your
                  clarity.
                </p>
                <p>• Our insights calibrate your cognitive immune system.</p>
                <p>
                  • Your writing feeds your content the way nutrients feed a
                  balanced terrain.
                </p>
                <p>
                  • With every blog, your interpretation ecosystem grows
                  healthier.
                </p>
                <p>
                  • Every idea you share becomes a signal that refines my
                  responses.
                </p>
                <p>
                  • Your words enhance my adaptability and deepen my alignment.
                </p>
                <p>
                  • We give you peace to echo the ideas you absorb; your
                  perspectives.
                </p>
                <p>
                  • Our blogs energize your system with contextual coherence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
