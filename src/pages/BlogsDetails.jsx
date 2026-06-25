import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogContentRenderer from "../components/BlogContentRenderer";
import BlogYoutubeEmbed from "../components/BlogYoutubeEmbed";
import SkeletonBox from "../components/SkeletonBox";
import { ArrowLeft, ArrowRight, Heart, Quote, Share2 } from "lucide-react";
import { IoLogoAmazon } from "react-icons/io5";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaLink,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { fetchBlogPosts } from "../service/api";
const RELATED_BLOGS_BANNER_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_1200/v1770272630/Rectangle_745_e4t1nx.png";
import insideBlogsBanner2 from "../assets/Photo/insideblogsbanner2.jpeg";
import { Seo } from "../components/Seo";
import { Schema } from "../components/Schema";
import { CircularTestimonials } from "../components/ui/circular-testimonials";
import CategoryImageOne from "../assets/Photo/Rectangle 822.png";
import CategoryImageTwo from "../assets/Photo/Rectangle 823.png";
import CategoryImageThree from "../assets/Photo/Rectangle 825.png";

const fallbackBanner = "https://placehold.co/1200x640";
const placeholderThumb = "https://placehold.co/400x260";
const RELATED_BLOG_BANNERS = [RELATED_BLOGS_BANNER_URL, insideBlogsBanner2];
const RELATED_BLOG_BANNER_ROTATE_MS = 5000;
const BLOG_AD_IMAGES = [
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1769683255/WEBSITE_AD_2_ficitx.jpg",
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1769683255/WEBSITE_AD_znyf0a.jpg",
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1769683254/6_tjewb0.jpg",
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_600/v1769683254/5_naq52q.jpg"];
const BLOG_AD_FALLBACK = RELATED_BLOGS_BANNER_URL;
const BLOG_AD_ROTATE_MS = 5000;
const RESOURCE_ADS_TOGGLE_MS = 10000;
const CATEGORY_ANIMATION_IMAGES = [
  CategoryImageOne,
  CategoryImageTwo,
  CategoryImageThree,
];
const YOUTUBE_PLACEHOLDER = "Youtubevideo";
const DEFAULT_EBOOK_REFERENCE_URL =
  "https://www.amazon.in/dp/B0FF2CTTND?ref=cm_sw_r_ffobk_cp_ud_dp_M6XY2MW9A67XPMMKHCX2_2&ref_=cm_sw_r_ffobk_cp_ud_dp_M6XY2MW9A67XPMMKHCX2_2&social_share=cm_sw_r_ffobk_cp_ud_dp_M6XY2MW9A67XPMMKHCX2_2&bestFormat=true";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://savemedhabackend.vercel.app";
const BLOGS_API_URL = `${API_BASE_URL}/api/blogs`;
const BLOG_DETAILS_CACHE_PREFIX = "blog_details_cache_v1_";
const SITE_BASE_URL =
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");

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
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [related, setRelated] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeStatus, setLikeStatus] = useState("idle"); // idle | loading | error
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("idle"); // idle | copied | error
  const [commentStatus, setCommentStatus] = useState("idle"); // idle | submitting | error
  const [commentError, setCommentError] = useState("");
  const [activeSideSection, setActiveSideSection] = useState("Description");
  const [relatedBannerIndex, setRelatedBannerIndex] = useState(0);
  const [showResourceAds, setShowResourceAds] = useState(false);
  const [adImageIndex, setAdImageIndex] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const contentEndRef = useRef(null);
  const relatedSectionRef = useRef(null);
  const commentsRef = useRef(null);
  const shareMenuRef = useRef(null);
  const trendingScrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const cacheKey = `${BLOG_DETAILS_CACHE_PREFIX}${slug || ""}`;
      try {
        const cachedRaw = window.localStorage.getItem(cacheKey);
        if (cachedRaw) {
          const cachedBlog = JSON.parse(cachedRaw);
          if (!cancelled && cachedBlog && typeof cachedBlog === "object") {
            setBlog(cachedBlog);
            setStatus("success");
          }
        }
      } catch {
        // Ignore cache read errors and continue with network request.
      }

      try {
        const res = await fetch(`${BLOGS_API_URL}/slug/${slug}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        if (!cancelled) {
          setBlog(data || null);
          try {
            window.localStorage.setItem(cacheKey, JSON.stringify(data || null));
          } catch {
            // Ignore cache write failures.
          }
          setStatus("success");
        }
      } catch {
        if (!cancelled) {
          setStatus((prev) => (prev === "success" ? "success" : "error"));
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
  }, [slug]);

  useEffect(() => {
    if (RELATED_BLOG_BANNERS.length < 2 || typeof window === "undefined") {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setRelatedBannerIndex(
        (current) => (current + 1) % RELATED_BLOG_BANNERS.length
      );
    }, RELATED_BLOG_BANNER_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const intervalId = window.setInterval(() => {
      setShowResourceAds((current) => !current);
    }, RESOURCE_ADS_TOGGLE_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!showResourceAds || BLOG_AD_IMAGES.length < 2 || typeof window === "undefined") {
      setAdImageIndex(0);
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setAdImageIndex((current) => (current + 1) % BLOG_AD_IMAGES.length);
    }, BLOG_AD_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [showResourceAds]);

  const meta = useMemo(() => {
    const title =
      blog?.title || "Why Natural Immunotherapy is the Future of Healing";
    const banner =
      blog?.imageUrl ||
      blog?.coverImage ||
      blog?.image ||
      blog?.heroImage ||
      blog?.thumbnail ||
      fallbackBanner;
    const category = blog?.category || blog?.tag || "Health";
    const date =
      formatDate(blog?.publishedAt || blog?.createdAt || blog?.updatedAt) || "";
    const author =
      blog?.writtenBy || blog?.author?.name || blog?.author || "Admin";
    return { title, banner, category, date, author };
  }, [blog]);

  const ebookReferenceUrl = useMemo(() => {
    return (
      blog?.ebookReferenceUrl ||
      blog?.ebook?.referenceUrl ||
      blog?.ebookUrl ||
      DEFAULT_EBOOK_REFERENCE_URL
    );
  }, [blog]);

  const shareUrl = useMemo(() => {
    const baseUrl = SITE_BASE_URL.replace(/\/$/, "");
    if (!baseUrl) return "";
    if (!slug) return "";
    return `${baseUrl}/blogs/${encodeURIComponent(slug)}`;
  }, [slug]);
  const shareTitle = meta.title || "Blog";
  const shareLinks = useMemo(() => {
    if (!shareUrl) return [];
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(`${shareTitle} - ${meta.author}`);

    return [
      {
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodeURIComponent(
          `${shareTitle} ${shareUrl}`
        )}`,
        Icon: FaWhatsapp,
      },
      {
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        Icon: FaFacebookF,
      },
      {
        label: "X (Twitter)",
        href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        Icon: FaTwitter,
      },
      {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        Icon: FaLinkedinIn,
      },
      {
        label: "Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
          `${shareTitle}\n${shareUrl}`
        )}`,
        Icon: MdEmail,
      },
    ];
  }, [shareUrl, shareTitle, meta.author]);

  const trendingPosts = useMemo(() => {
    if (!related?.length) return [];
    return related
      .filter((item) => {
        const itemSlug = item?.slug;
        return itemSlug && itemSlug !== slug;
      })
      .slice(0, 5)
      .map((item, index) => ({
        id: item.id || item._id || `related-${index}`,
        slug: item.slug || "",
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
  }, [related, slug]);

  const categoryCards = useMemo(() => {
    const categories = Array.from(
      new Set(
        (related || [])
          .map((item) => item?.category || item?.tag || null)
          .filter(Boolean)
      )
    );
    return (
      categories.length
        ? categories
        : ["Health", "Wellness", "Research", "Nutrition", "Holistic"]
    )
      .slice(0, 5)
      .map((label) => ({ label }));
  }, [related]);

  const categoryTestimonials = useMemo(
    () =>
      categoryCards.map((cat, index) => ({
        name: cat.label,
        designation: "By Subhankar Sarkar",
        quote:
          "Explore Save Medha Foundation insights, awareness articles, and practical guidance around natural care, recovery support, and immune wellness.",
        src: CATEGORY_ANIMATION_IMAGES[index % CATEGORY_ANIMATION_IMAGES.length],
      })),
    [categoryCards]
  );

  const rawContent = blog?.content || blog?.description || blog?.excerpt || "";
  const contentParts = useMemo(() => {
    if (!rawContent) return [""];
    return String(rawContent).split(YOUTUBE_PLACEHOLDER);
  }, [rawContent]);

  const handleOpenBlog = (blogSlug) => {
    if (!blogSlug) return;
    if (onNavigate) {
      onNavigate("blogs-detail", { slug: blogSlug });
      return;
    }
    navigate(`/blogs/${blogSlug}`);
  };

  const handleTrendingScroll = (direction) => {
    const el = trendingScrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(240, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  const handleScrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollToConclusion = () => {
    contentEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScrollToRelated = () => {
    relatedSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSideSectionClick = (sectionKey) => {
    setActiveSideSection(sectionKey);

    switch (sectionKey) {
      case "Introduction":
        handleScrollToHero();
        break;
      case "Description":
        handleScrollToContent();
        break;
      case "Conclusion":
        handleScrollToConclusion();
        break;
      case "Comments":
        handleScrollToComments();
        break;
      default:
        break;
    }
  };
  const handleToggleLike = async () => {
    if (likeStatus === "loading" || liked) return;
    const blogId = blog?._id || blog?.id;
    if (!blogId) return;

    const previousCount = likeCount;
    setLiked(true);
    setLikeCount(previousCount + 1);
    setLikeStatus("loading");

    try {
      const response = await fetch(`${BLOGS_API_URL}/${blogId}/like`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Like failed");
      const data = await response.json();
      if (data && typeof data === "object") {
        setBlog(data);
        if (typeof data.likesCount === "number") {
          setLikeCount(data.likesCount);
        }
      }
      setLikeStatus("idle");
    } catch {
      setLiked(false);
      setLikeCount(previousCount);
      setLikeStatus("idle");
    }
  };
  const handleToggleShare = () => {
    setIsShareOpen((prev) => !prev);
  };
  const handleCopyShareLink = async () => {
    if (!shareUrl) return;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }
  };
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phoneNumber = String(formData.get("phoneNumber") || "").trim();
    const comment = String(formData.get("comment") || "").trim();
    const blogId = blog?._id || blog?.id;

    if (!name || !phoneNumber || !comment || !blogId) {
      setCommentStatus("error");
      setCommentError("Comment, name, and phone number are required.");
      return;
    }

    try {
      setCommentStatus("submitting");
      setCommentError("");

      const response = await fetch(`${BLOGS_API_URL}/${blogId}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phoneNumber, comment }),
        });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        let message = errorText;
        try {
          const parsed = errorText ? JSON.parse(errorText) : null;
          message =
            parsed?.message || parsed?.error || parsed?.details || message;
        } catch {
          // Keep raw text when it's not JSON.
        }
        setCommentStatus("error");
        setCommentError(
          message || "Unable to submit comment. Please try again."
        );
        return;
      }

      // Backend returns the updated blog payload; use it directly to avoid an
      // extra fetch (the `/api/blogs/:id` read can be slow/unreliable).
      const updatedBlog = await response.json().catch(() => null);
      if (updatedBlog && typeof updatedBlog === "object") {
        setBlog(updatedBlog);
      } else if (slug) {
        // Fallback: re-fetch by slug to refresh comments.
        const refreshed = await fetch(`${BLOGS_API_URL}/slug/${slug}`);
        if (refreshed.ok) {
          const data = await refreshed.json();
          setBlog(data || null);
        }
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

  useEffect(() => {
    setLikeCount(blog?.likesCount ?? 0);
  }, [blog?.likesCount]);

  useEffect(() => {
    setLiked(false);
    setLikeStatus("idle");
  }, [blog?._id]);

  useEffect(() => {
    if (!isShareOpen) return;

    const handleOutsideClick = (event) => {
      if (!shareMenuRef.current) return;
      if (!shareMenuRef.current.contains(event.target)) {
        setIsShareOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsShareOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isShareOpen]);

  useEffect(() => {
    if (shareStatus === "idle") return;
    const timeout = setTimeout(() => setShareStatus("idle"), 2000);
    return () => clearTimeout(timeout);
  }, [shareStatus]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar currentPage="blogs" onNavigate={onNavigate} />
        <main className="pb-16 blog-main">
          <div className="max-w-6xl mx-auto px-4 pt-8 space-y-6">
            <SkeletonBox className="h-10 w-28 rounded-full" />
            <div className="space-y-3">
              <SkeletonBox className="h-8 w-3/4" />
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-11/12" />
              <SkeletonBox className="h-4 w-10/12" />
            </div>
          </div>
        </main>
      </div>
    );
  }
  if (status === "error" || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 blog-main">
        <p className="text-2xl text-red-600 font-poppins">Blog not found</p>
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
      <Seo title={blog?.title} description={blog?.excerpt || blog?.description || blog?.title} path={"/blogs/" + (blog?.slug || slug)} />
      <Schema type="article" article={{ title: blog?.title, description: blog?.excerpt || blog?.description || blog?.title, url: "https://savemedha.com/blogs/" + (blog?.slug || slug), image: blog?.coverImage || blog?.image, datePublished: blog?.createdAt, dateModified: blog?.updatedAt }} />
      <Navbar currentPage="blogs" onNavigate={onNavigate} />

      <main className="pb-16 blog-main bg-white">
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <button
            type="button"
            onClick={() => onNavigate?.("blogs")}
            className="inline-flex items-center gap-2 rounded-md border border-[#74C425] px-3 py-1.5 text-xs font-bold text-[#168f00] hover:bg-[#74C425] hover:text-white transition"
          >
            <ArrowLeft size={15} />
            Back
          </button>
        </div>

        {/* Hero + Sidebar */}
        <section ref={heroRef} className="max-w-5xl mx-auto px-4 pt-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="space-y-4">
              <div className="h-52 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm sm:h-72 lg:h-[335px]">
                <img
                  src={meta.banner}
                  alt={meta.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(event) => {
                    if (event.currentTarget.src !== fallbackBanner) {
                      event.currentTarget.src = fallbackBanner;
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
                <span className="inline-flex items-center rounded-full bg-[#74C425] px-3 py-1 text-white">
                  {meta.category}
                </span>
                <span>By {meta.author}</span>
                <span>•</span>
                <span>{meta.date}</span>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleScrollToComments}
                  className="rounded-full border border-[#74C425] px-3 py-1 text-[#168f00] hover:bg-[#74C425] hover:text-white transition-colors"
                >
                  Write a Comment
                </button>
                <button
                  type="button"
                  onClick={handleToggleLike}
                  aria-pressed={liked}
                  disabled={likeStatus === "loading"}
                  aria-busy={likeStatus === "loading"}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-[#74C425] px-3 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                    liked
                      ? "bg-[#74C425] text-white"
                      : "text-[#74C425] hover:bg-[#74C425] hover:text-white"
                  }`}
                  aria-label="Like this blog"
                >
                  <Heart size={14} className={liked ? "fill-current" : ""} />
                  <span>{liked ? "Liked" : "Like"}</span>
                  <span
                    className={`text-[11px] ${
                      liked ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {/* {likeCount} */}
                  </span>
                </button>
                <div className="relative" ref={shareMenuRef}>
                  <button
                    type="button"
                    onClick={handleToggleShare}
                    aria-expanded={isShareOpen}
                    aria-controls="blog-share-menu"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#74C425] px-3 py-1 text-[#74C425] transition-colors hover:bg-[#74C425] hover:text-white"
                    aria-label="Share this blog"
                  >
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                  {isShareOpen && (
                    <div
                      id="blog-share-menu"
                      className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700 shadow-lg"
                    >
                      {shareLinks.map(({ label, href, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsShareOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-[#f0ffe0]"
                        >
                          <Icon className="h-4 w-4 text-[#74C425]" />
                          <span>{label}</span>
                        </a>
                      ))}
                      <button
                        type="button"
                        onClick={handleCopyShareLink}
                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-[#f0ffe0]"
                      >
                        <FaLink className="h-4 w-4 text-[#74C425]" />
                        <span>
                          {shareStatus === "copied"
                            ? "Link copied"
                            : shareStatus === "error"
                            ? "Copy failed"
                            : "Copy link"}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <h1 className="max-w-3xl text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                {meta.title}
              </h1>
            </div>

            <div className="space-y-4">
              <div className="rounded-md bg-slate-100 p-4 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-black leading-snug text-slate-950">
                  Request a call back from us!
                </h3>
                <p className="mb-4 mt-1 text-[11px] leading-relaxed text-slate-600">
                  Fill in the form below to request a call back to get further
                  assistance from us.
                </p>
                <form className="space-y-3">

  <div className="w-full">
    <input
      type="text"
      id="callback-name"
      placeholder="Name"
      required
      className="h-9 w-full rounded-sm border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none transition focus:border-[#74C425]"
    />
  </div>

  <div className="w-full">
    <input
      type="text"
      id="callback-mobile"
      placeholder="Mobile no."
      className="h-9 w-full rounded-sm border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none transition focus:border-[#74C425]"
    />
  </div>

  <div className="w-full">
    <textarea
      id="callback-description"
      rows={3}
      placeholder="Describe your issue"
      className="w-full resize-none rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-[#74C425]"
    />
  </div>

  <button
    type="button"
    className="h-9 rounded-md bg-[#74C425] px-5 text-xs font-black text-white transition hover:bg-[#155300]"
  >
    Submit
  </button>

</form>

              </div>

              <a
                href={ebookReferenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#f28b16] px-5 py-3 text-xs font-black text-white shadow-sm transition hover:bg-[#d9790f]"
              >
                <IoLogoAmazon size={20} className="text-white" />
                Ebook Reference
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 pt-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_245px]">
            <article
              ref={contentRef}
              className="prose prose-sm prose-slate w-full min-w-0 max-w-none text-slate-800 font-sen break-words [overflow-wrap:anywhere] prose-headings:font-poppins prose-headings:font-black prose-headings:text-slate-950 prose-headings:leading-tight prose-p:font-sen prose-p:my-4 prose-p:leading-[1.78] prose-li:font-sen prose-li:my-1.5 prose-li:leading-[1.7] prose-ul:pl-5 prose-ol:pl-5 prose-li:marker:text-[#74C425] prose-strong:font-black prose-strong:text-slate-950 prose-a:text-[#168f00] prose-a:font-bold prose-a:underline prose-a:decoration-[#74C425] prose-a:underline-offset-4 prose-blockquote:border-l-[#74C425] prose-blockquote:text-slate-600 prose-img:w-full prose-img:max-w-full prose-img:h-auto prose-img:rounded-md prose-img:shadow-sm"
            >
              {contentParts.map((part, index) => (
                <Fragment key={`content-part-${index}`}>
                  {part && (
                    <BlogContentRenderer
                      description={part}
                      blogImage={blog?.blogImage}
                    />
                  )}
                  {index < contentParts.length - 1 && (
                    <BlogYoutubeEmbed youtubeLink={blog?.youtubeLink} />
                  )}
                </Fragment>
              ))}
              <div ref={contentEndRef} />
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="text-base font-black text-slate-950">
                  On this blog:
                </h4>
                <div className="mt-3 space-y-2">
                  {["Introduction", "Description", "Conclusion", "Comments"].map(
                    (label) => {
                      const isActive = activeSideSection === label;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => handleSideSectionClick(label)}
                          className={`w-full rounded-sm border px-3 py-2 text-left text-xs font-bold font-sen transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C425]/50 ${
                            isActive
                              ? "border-[#74C425] bg-[#e8ffd8] text-[#155300]"
                              : "border-slate-200 bg-white text-slate-700 hover:border-[#74C425]"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {!showResourceAds && (
                <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                  <h4 className="text-base font-black text-slate-950">Resources</h4>
                  <div className="mt-3 space-y-2">
                    <a
                      href={ebookReferenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between gap-3 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-[#74C425] hover:text-[#155300] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C425]/40"
                    >
                      <span>Get E-Book reference</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#74C425] text-sm leading-none text-white">
                        +
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={handleScrollToRelated}
                      className="flex w-full items-center justify-between gap-3 rounded-sm border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-[#74C425] hover:text-[#155300] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74C425]/40"
                    >
                      <span>Get similar links</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#74C425] text-sm leading-none text-white">
                        +
                      </span>
                    </button>
                  </div>
                </div>
              )}
              {showResourceAds && (
                <div className="rounded-md bg-white p-2 shadow-sm ring-1 ring-slate-200">
                  <div className="relative h-[360px] w-full overflow-hidden rounded-md bg-white">
                    {BLOG_AD_IMAGES.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt="Blog advertisement"
                        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
                          index === adImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                        onError={(event) => {
                          if (event.currentTarget.src !== BLOG_AD_FALLBACK) {
                            event.currentTarget.src = BLOG_AD_FALLBACK;
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

        {Array.isArray(blog?.faqs) && blog.faqs.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 pt-12 space-y-5">
            <h2 className="text-2xl font-black text-slate-950">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {blog.faqs.map((faq, index) => (
                <details
                  key={faq.question ? `${faq.question}-${index}` : index}
                  className="group rounded-md border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-black text-slate-900">
                    <span>{faq.question}</span>
                    <span className="text-[#74C425] text-xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 text-sm leading-relaxed text-slate-700">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Trending Slider */}
        <section ref={relatedSectionRef} className="mt-12 px-4">
          <div className="relative mx-auto max-w-5xl">
            <h3 className="mb-5 text-xl font-black text-slate-950">
              Related Blogs
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => handleTrendingScroll(-1)}
                className="absolute -left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#74C425] bg-white text-[#74C425] shadow"
                aria-label="Previous"
              >
                <ArrowLeft size={18} />
              </button>
              <div
                ref={trendingScrollRef}
                className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2"
              >
                {(trendingPosts.length ? trendingPosts : related).map(
                  (item, index) => {
                    const blogSlug = item?.slug;
                    const imageSrc =
                      item?.image ||
                      item?.imageUrl ||
                      item?.coverImage?.url ||
                      item?.coverImage ||
                      item?.heroImage ||
                      item?.thumbnail ||
                      placeholderThumb;
                    const authorName =
                      item?.author ||
                      item?.authorName ||
                      item?.writtenBy ||
                      item?.author?.name ||
                      "Admin";
                    const dateLabel = formatDate(
                      item?.date || item?.publishedAt || item?.createdAt
                    );

                    return (
                      <button
                        key={blogSlug || item?._id || index}
                        type="button"
                        onClick={() => handleOpenBlog(blogSlug)}
                        className="min-w-[230px] max-w-[250px] cursor-pointer rounded-md border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#74C425]/40"
                        aria-label={
                          item?.title ? `Open blog: ${item.title}` : "Open blog"
                        }
                      >
                        <img
                          src={imageSrc}
                          alt={item?.title || "Blog thumbnail"}
                          className="aspect-[1.5] w-full rounded-md object-cover"
                          loading="lazy"
                          onError={(event) => {
                            if (event.currentTarget.src !== placeholderThumb) {
                              event.currentTarget.src = placeholderThumb;
                            }
                          }}
                        />
                        <div className="mt-3 flex flex-col gap-1">
                          <p className="text-[10px] font-semibold text-slate-500">
                            By {authorName}
                            {dateLabel ? ` • ${dateLabel}` : ""}
                          </p>
                          <h4 className="line-clamp-2 text-sm font-black leading-snug text-slate-950">
                            {item?.title || "Untitled"}
                          </h4>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
              <button
                type="button"
                onClick={() => handleTrendingScroll(1)}
                className="absolute -right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#74C425] bg-white text-[#74C425] shadow"
                aria-label="Next"
              >
                <ArrowRight size={18} />
              </button>
            </div>
           </div>
           
         </section>

        <section className="mx-auto max-w-5xl px-4 pt-8">
          <img
            src={RELATED_BLOG_BANNERS[relatedBannerIndex]}
            alt="Related blogs banner"
            className="w-full rounded-md shadow-sm"
            loading="lazy"
            onError={(event) => {
              if (event.currentTarget.src !== BLOG_AD_FALLBACK) {
                event.currentTarget.src = BLOG_AD_FALLBACK;
              }
            }}
          />
        </section>

        {/* Categories */}
        <section className="max-w-5xl mx-auto px-4 pt-12">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-black text-slate-950 md:text-2xl">
              All Category
            </h3>
            <span className="h-[2px] w-10 bg-slate-900 inline-block" />
          </div>
          <div className="flex justify-center rounded-md border border-slate-200 bg-white px-6 py-8 shadow-sm">
            <CircularTestimonials
              testimonials={categoryTestimonials}
              autoplay={true}
              colors={{
                name: "#020617",
                designation: "#168f00",
                testimony: "#334155",
                arrowBackground: "#74C425",
                arrowForeground: "#ffffff",
                arrowHoverBackground: "#155300",
              }}
              fontSizes={{
                name: "22px",
                designation: "12px",
                quote: "12px",
              }}
            />
          </div>
          <div className="hidden">
            {categoryCards.map((cat) => (
              <div
                key={cat.label}
                className="rounded-md border border-slate-200 bg-white p-5 text-left shadow-sm"
              >
                <div className="mb-4 overflow-hidden rounded-md bg-[#e8ffd8]">
                  <img
                    src={meta.banner}
                    alt={cat.label}
                    className="aspect-[1.6] w-full object-cover"
                    loading="lazy"
                  />
                  {/*
                  📘
                </div>
                  */}
                </div>
                <p className="font-poppins text-xl font-black text-slate-950">
                  {cat.label}
                </p>
                <p className="mt-2 line-clamp-4 text-sm leading-7 text-slate-600">
                  Explore Save Medha Foundation insights, awareness articles, and practical
                  guidance around natural care and recovery support.
                </p>
                <button className="mt-4 rounded-full bg-[#74C425] px-3 py-1.5 text-xs font-black text-white hover:bg-[#155300]">
                  Know More
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={commentsRef}
          id="comments"
          className="max-w-5xl mx-auto px-4 pt-12 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8ffd8] text-[#74C425]">
              <Quote size={22} />
            </div>
            <h3 className="font-poppins text-2xl font-black text-slate-950">
              Comments
            </h3>
          </div>

          <form
            className="max-w-3xl space-y-3 rounded-md border border-slate-200 bg-white p-5 shadow-sm"
            onSubmit={handleCommentSubmit}
          >
            <div className="space-y-1">
              <label
                htmlFor="comment-name"
                className="font-sen text-xs font-bold text-slate-700"
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
                className="h-10 w-full rounded-sm border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#74C425]"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="comment-phone"
                className="font-sen text-xs font-bold text-slate-700"
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
                className="h-10 w-full rounded-sm border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#74C425]"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="comment-message"
                className="font-sen text-xs font-bold text-slate-700"
              >
                Message
              </label>
              <textarea
                id="comment-message"
                name="comment"
                rows={4}
                required
                placeholder="Write your comment"
                className="w-full rounded-sm border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-[#74C425]"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={commentStatus === "submitting"}
                className="rounded-md bg-[#74C425] px-5 py-2 text-xs font-black text-white transition hover:bg-[#155300] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {commentStatus === "submitting"
                  ? "Submitting..."
                  : "Submit Comment"}
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




