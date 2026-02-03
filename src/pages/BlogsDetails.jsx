import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogContentRenderer from "../components/BlogContentRenderer";
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
import relatedBlogsBanner from "../assets/Photo/Rectangle 745.png";
import insideBlogsBanner2 from "../assets/Photo/insideblogsbanner2.jpeg";
import {Seo} from "../components/Seo";

const fallbackBanner = "https://placehold.co/1200x640";
const placeholderThumb = "https://placehold.co/400x260";
const RELATED_BLOG_BANNERS = [relatedBlogsBanner, insideBlogsBanner2];
const RELATED_BLOG_BANNER_ROTATE_MS = 10000;
const BLOG_AD_IMAGES = [
  "https://res.cloudinary.com/dijpuzbvv/image/upload/v1769683255/WEBSITE_AD_znyf0a.jpg",
  "https://res.cloudinary.com/dijpuzbvv/image/upload/v1769683255/WEBSITE_AD_2_ficitx.jpg",
  "https://res.cloudinary.com/dijpuzbvv/image/upload/v1769683254/5_naq52q.jpg",
  "https://res.cloudinary.com/dijpuzbvv/image/upload/v1769683254/6_tjewb0.jpg"];
const BLOG_AD_ROTATE_MS = 5000;
const ebookReferenceUrl =
  "https://www.amazon.in/dp/B0FF2CTTND?ref=cm_sw_r_ffobk_cp_ud_dp_M6XY2MW9A67XPMMKHCX2_2&ref_=cm_sw_r_ffobk_cp_ud_dp_M6XY2MW9A67XPMMKHCX2_2&social_share=cm_sw_r_ffobk_cp_ud_dp_M6XY2MW9A67XPMMKHCX2_2&bestFormat=true";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://savemedhabackend.vercel.app";
const BLOGS_API_URL = `${API_BASE_URL}/api/blogs`;
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


  useEffect(()=>{
    Seo({title:blog?.title, description:blog?.title, path:`/blogs/${blog?.slug}`})
  },[blog])

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`${BLOGS_API_URL}/slug/${slug}`);
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

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrollTop / total : 0;
      setShowResourceAds(progress >= 0.6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
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

  const shareUrl = useMemo(() => {
    const baseUrl = SITE_BASE_URL.replace(/\/$/, "");
    if (!baseUrl) return "";
    const shareId = blog?._id || blog?.id;
    if (shareId) {
      return `${baseUrl}/blogs/share/${encodeURIComponent(shareId)}`;
    }
    if (!slug) return "";
    return `${baseUrl}/blogs/${encodeURIComponent(slug)}`;
  }, [blog?._id, blog?.id, slug]);
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

  const rawContent = blog?.content || blog?.description || blog?.excerpt || "";

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
      <div className="min-h-screen flex items-center justify-center blog-main">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12" role="status" aria-live="polite">
            <div className="absolute inset-0 rounded-full border-4 border-[#74C425]/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#74C425] animate-spin" />
            <span className="sr-only">Loading</span>
          </div>
          <p className="text-sm font-medium text-slate-600">Loading blog…</p>
        </div>
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
      <Navbar currentPage="blogs" onNavigate={onNavigate} />

      <main className="pb-16 blog-main">
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
        <section ref={heroRef} className="max-w-6xl mx-auto px-4 pt-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="h-125  overflow-hidden rounded-xl shadow border text-[#74C425] border-gray-200 bg-white">
                <img
                  src={meta.banner}
                  alt={meta.title}
                  className="w-full h-full object-fill"
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
                <button
                  type="button"
                  onClick={handleScrollToComments}
                  className="text-slate-600 border-2 border-[#74C425] px-3 py-1 rounded-full hover:text-[#74C425] transition-colors"
                >
                  Write a Comment
                </button>
                <button
                  type="button"
                  onClick={handleToggleLike}
                  aria-pressed={liked}
                  disabled={likeStatus === "loading"}
                  aria-busy={likeStatus === "loading"}
                  className={`inline-flex items-center gap-2 border-2 border-[#74C425] px-3 py-1 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
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
                    className="inline-flex items-center gap-2 border-2 border-[#74C425] px-3 py-1 rounded-full text-[#74C425] transition-colors hover:bg-[#74C425] hover:text-white"
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
              <h1 className="text-3xl md:text-4xl font-bold text-[#74C425] leading-tight">
                {meta.title}
              </h1>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#74C425] text-white p-6 shadow">
                <h3 className="text-xl font-bold mb-2">
                  Request a call back from us!
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Fill in the form below to request a call back to get further
                  assistance from us.
                </p>
                <form className="space-y-5 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">

  {/* Name */}
  <div className="w-full">
    <input
      type="text"
      id="callback-name"
      placeholder="Your Name"
      required
      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800
                 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition"
    />
  </div>

  {/* Mobile */}
  <div className="w-full">
    <input
      type="text"
      id="callback-mobile"
      placeholder="Your Mobile No."
      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800
                 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition"
    />
  </div>

  {/* Description */}
  <div className="w-full">
    <textarea
      id="callback-description"
      rows={3}
      placeholder="Describe your issue"
      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800
                 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/40 outline-none transition resize-none"
    />
  </div>

  {/* Button */}
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
                 
                    <a
                      href={ebookReferenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#f5a623] px-10 py-3 text-white font-semibold font-poppins text-sm shadow hover:bg-[#e1951c] transition-all translate-x-17 duration-300 hover:shadow-lg"
                    >
                    <IoLogoAmazon size={26} className="text-white" />
                    Ebook Reference
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 pt-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article
              ref={contentRef}
              className="prose prose-slate md:prose-lg text-slate-800 font-sen break-words prose-headings:font-poppins prose-headings:font-semibold prose-headings:text-slate-900 prose-headings:leading-tight prose-headings:tracking-tight prose-p:font-sen prose-p:my-5 prose-p:leading-[1.8] prose-li:font-sen prose-li:my-2 prose-li:leading-[1.8] prose-ul:pl-6 prose-ol:pl-6 prose-li:marker:text-[#74C425] prose-strong:font-semibold prose-strong:text-slate-900 prose-[b]:font-semibold prose-[b]:text-slate-900 prose-em:font-semibold prose-em:italic prose-[i]:font-semibold prose-[i]:italic prose-a:text-[#1e3a8a] prose-a:font-medium prose-a:underline prose-a:decoration-[#74C425] prose-a:decoration-2 prose-a:underline-offset-4 prose-a:hover:text-[#155300] prose-a:hover:decoration-[#155300] prose-a:focus-visible:outline-none prose-a:focus-visible:ring-2 prose-a:focus-visible:ring-[#74C425]/40 prose-a:focus-visible:ring-offset-2 prose-a:rounded-sm prose-blockquote:border-l-[#74C425] prose-blockquote:text-slate-600 prose-blockquote:font-medium prose-blockquote:font-sen prose-img:rounded-xl prose-img:shadow-sm"
            >
              <BlogContentRenderer
                description={rawContent}
                blogImage={blog?.blogImage}
              />
              <div ref={contentEndRef} />
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[10px] bg-gradient-to-b from-[#f59e0b] to-[#fde68a] p-6 shadow-lg border border-[#fbbf24]/40">
                <h4 className="text-2xl font-extrabold text-white drop-shadow-sm">
                  On this blog:
                </h4>
                <div className="mt-4 space-y-3">
                  {["Introduction", "Description", "Conclusion", "Comments"].map(
                    (label) => {
                      const isActive = activeSideSection === label;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => handleSideSectionClick(label)}
                          className={`w-full rounded-2xl px-4 py-3 text-left font-semibold font-sen shadow-md ring-1 ring-black/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                            isActive
                              ? "bg-gradient-to-r from-[#92400e] to-[#a16207] text-white shadow-lg"
                              : "bg-white/95 text-slate-900 hover:bg-white hover:shadow-lg"
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
                <div className="rounded-[10px] bg-gradient-to-b from-[#7c4a0a] to-[#5a3608] p-6 shadow-lg border border-white/10">
                  <h4 className="text-3xl font-extrabold text-white">Resources</h4>
                  <div className="mt-4 space-y-3">
                    <a
                      href={ebookReferenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-4 rounded-2xl bg-white/95 px-4 py-3 text-slate-900 font-semibold font-sen shadow-md ring-1 ring-black/5 transition hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <span>Get E-Book reference</span>
                      <span className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#a16207] text-white text-xl leading-none shadow-sm">
                        +
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={handleScrollToRelated}
                      className="w-full flex items-center justify-between gap-4 rounded-2xl bg-white/95 px-4 py-3 text-slate-900 font-semibold font-sen shadow-md ring-1 ring-black/5 transition hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <span>Get similar links</span>
                      <span className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#a16207] text-white text-xl leading-none shadow-sm">
                        +
                      </span>
                    </button>
                  </div>
                </div>
              )}
              {showResourceAds && (
                <div className="rounded-[10px] bg-white p-3">
                  <div className="relative w-full bg-white h-[520px] min-h-[520px] min-w-[620px]">
                    {BLOG_AD_IMAGES.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt="Blog advertisement"
                        className={`absolute inset-0 h-full -translate-x-33 w-full object-contain transition-opacity duration-700 ${
                          index === adImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

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
        <section ref={relatedSectionRef} className="mt-12 px-4">
          <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-[#e8ffd8] to-white p-6 shadow-inner relative">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Related Blogs
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => handleTrendingScroll(-1)}
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#74C425] text-[#74C425] shadow cursor-pointer"
                aria-label="Previous"
              >
                <ArrowLeft size={18} />
              </button>
              <div
                ref={trendingScrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
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
                        className="min-w-[240px] rounded-xl bg-white border border-gray-200 shadow-sm p-3 flex gap-3 text-left transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#74C425]/40 cursor-pointer"
                        aria-label={
                          item?.title ? `Open blog: ${item.title}` : "Open blog"
                        }
                      >
                        <img
                          src={imageSrc}
                          alt={item?.title || "Blog thumbnail"}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-xs text-slate-500">
                            By {authorName}
                            {dateLabel ? ` • ${dateLabel}` : ""}
                          </p>
                          <h4 className="text-sm font-semibold text-[#74C425] line-clamp-2">
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
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#74C425] text-[#74C425] shadow cursor-pointer"
                aria-label="Next"
              >
                <ArrowRight size={18} />
              </button>
            </div>
           </div>
           
         </section>

        <section className="w-full mx-auto px-4 pt-6">
          <img
            src={RELATED_BLOG_BANNERS[relatedBannerIndex]}
            alt="Related blogs banner"
            className="w-full rounded-3xl "
            loading="lazy"
          />
        </section>

        {/* Categories */}
        <section className="max-w-6xl mx-auto px-4 pt-10">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              All Category
            </h3>
            <span className="h-[2px] w-10 bg-slate-900 inline-block" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryCards.map((cat) => (
              <div
                key={cat.label}
                className="rounded-2xl bg-[#3B40AA] text-center p-4 shadow border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#74C425] text-white flex items-center justify-center text-2xl mb-3">
                  📘
                </div>
                <p className="font-semibold font-poppins text-white">
                  {cat.label}
                </p>
                <button className="mt-2 text-sm font-semibold text-[#74C425] hover:text-[#155300]">
                  Know More
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Comments */}
        <section
          ref={commentsRef}
          id="comments"
          className="max-w-6xl mx-auto px-4 pt-12 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#e8ffd8] text-[#74C425] flex items-center justify-center">
              <Quote size={22} />
            </div>
            <h3 className="text-2xl font-bold font-poppins text-slate-900">
              Comments
            </h3>
          </div>

          <form
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-3"
            onSubmit={handleCommentSubmit}
          >
            <div className="space-y-1">
              <label
                htmlFor="comment-name"
                className="text-sm font-semibold font-sen text-slate-700"
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#74C425] "
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="comment-phone"
                className="text-sm font-semibold font-sen text-slate-700"
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
                className="text-sm font-semibold font-sen text-slate-700"
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
