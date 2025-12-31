import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const PATIENT_STORIES_API_URL =
  "https://savemedhabackend.vercel.app/api/patient-success-stories";

const extractVideoId = (input = "") => {
  if (!input) return null;
  const decoded = decodeURIComponent(input.trim());
  const directMatch =
    decoded.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/|embed\/)|youtu\.be\/)([\w-]{11})/
    ) || decoded.match(/^[\w-]{11}$/);

  if (directMatch?.[1]) return directMatch[1];
  try {
    const yt = new URL(decoded);
    if (yt.hostname.includes("youtu.be")) {
      return yt.pathname.replace("/", "").split("?")[0];
    }
    return yt.searchParams.get("v");
  } catch {
    return null;
  }
};

const toEmbedUrl = (input = "") => {
  const videoId = extractVideoId(input);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : null;
};

const toThumbnailUrl = (input = "") => {
  const videoId = extractVideoId(input);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://img.youtube.com/vi/default/hqdefault.jpg";
};

const PatientStories = () => {
  const ringRef = useRef(null);
  const itemRefs = useRef([]);
  const mobileSliderRef = useRef(null);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return true;
    }
    return window.matchMedia("(min-width: 640px)").matches;
  });

  const currentVideoUrl =
    openIndex !== null ? toEmbedUrl(stories[openIndex]?.youtubeUrl) : null;

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mql = window.matchMedia("(min-width: 640px)");

    const update = () => setIsDesktop(mql.matches);
    update();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setHasError(false);

    axios
      .get(PATIENT_STORIES_API_URL)
      .then((response) => {
        if (!isMounted) return;
        const payload = response?.data;
        const list = Array.isArray(payload) ? payload : payload ? [payload] : [];
        const normalized = list
          .map((story, index) => ({
            id: story?._id ?? story?.id ?? `${index}`,
            title: story?.title ?? "",
            youtubeUrl: story?.youtubeUrl ?? "",
            description: story?.description ?? "",
          }))
          .filter((story) => story.youtubeUrl || story.title || story.description);

        setOpenIndex(null);
        setStories(normalized);
      })
      .catch(() => {
        if (!isMounted) return;
        setHasError(true);
        setOpenIndex(null);
        setStories([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const rotateRing = (direction = 1) => {
    if (!isDesktop) return;
    const ringEl = ringRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!ringEl || !items.length) return;
    const angle = 360 / items.length;
    gsap.to(ringEl, {
      rotationY: `+=${direction * angle}`,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    if (!isDesktop) return;

    const ringEl = ringRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!ringEl || !items.length) return;

    const angle = 360 / items.length;
    const radius = 420;
    let xPos = 0;

    gsap.set(ringEl, {
      rotationY: 180,
      cursor: "grab",
      transformStyle: "preserve-3d",
    });

    gsap.set(items, {
      rotateY: (i) => i * -angle,
      transformOrigin: `50% 50% ${radius}px`,
      z: -radius,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
    });

    const intro = gsap.from(items, {
      duration: 1.1,
      y: 140,
      opacity: 0,
      stagger: 0.08,
      ease: "expo.out",
    });

    const handleEnter = (event) => {
      const current = event.currentTarget;
      gsap.to(items, {
        opacity: (i, target) => (target === current ? 1 : 0.55),
        ease: "power3",
      });
    };

    const handleLeave = () => {
      gsap.to(items, { opacity: 1, ease: "power2.inOut" });
    };

    items.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const drag = (event) => {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      if (clientX == null) return;

      gsap.to(ringEl, {
        rotationY: `-=${(Math.round(clientX) - xPos) % 360}`,
      });

      xPos = Math.round(clientX);
    };

    const dragStart = (event) => {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      if (clientX == null) return;
      xPos = Math.round(clientX);
      gsap.set(ringEl, { cursor: "grabbing" });
      window.addEventListener("mousemove", drag);
      window.addEventListener("touchmove", drag);
    };

    const dragEnd = () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
      gsap.set(ringEl, { cursor: "grab" });
    };

    window.addEventListener("mousedown", dragStart);
    window.addEventListener("touchstart", dragStart);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchend", dragEnd);

    return () => {
      intro.kill();
      window.removeEventListener("mousedown", dragStart);
      window.removeEventListener("touchstart", dragStart);
      window.removeEventListener("mouseup", dragEnd);
      window.removeEventListener("touchend", dragEnd);
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("touchmove", drag);
      items.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [stories.length, isDesktop]);

  const scrollMobileStories = (direction) => {
    const slider = mobileSliderRef.current;
    if (!slider) return;
    const delta = Math.max(1, Math.round(slider.clientWidth * 0.9));
    slider.scrollBy({ left: direction * delta, behavior: "smooth" });
  };

  return (
    <>
      <section
        id="patient-stories"
        className="relative w-full bg-[#FBFFF9]  py-16 text-center rounded-3xl  overflow-hidden"
      >
        <div className="mb-15 text-center ">
          <h2 className="relative inline-block text-4xl mb-25  font-bold text-slate-900">
            <span className="relative">PATIENT </span>
            <div className="absolute bottom-[-10px] left-0 h-1 w-20 bg-[#74C425]" />
            <span className="text-[#74C425]">SUCCESS STORY</span>
          </h2>
          <p className=" text-sm -translate-y-20 text-slate-600">
            <span className="hidden sm:inline">
              Drag the carousel to explore stories in 3D, then tap to watch.
            </span>
            <span className="sm:hidden">
              Swipe to browse stories, then tap to watch.
            </span>
          </p>
        </div>

        {/* Mobile slider (no 3D/GSAP) */}
        <div className="relative mx-auto sm:hidden px-4 pb-12">
          {isLoading && <div>Loading patient stories...</div>}
          {hasError && <div>Unable to load patient stories</div>}
          {!isLoading && !hasError && stories.length === 0 && (
            <div>No patient stories available</div>
          )}

          {!isLoading && !hasError && stories.length > 0 ? (
            <>
              {stories.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous story"
                    className="absolute left-2 top-[110px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#215C07] shadow-sm transition hover:bg-[#f2f8ec] cursor-pointer"
                    onClick={() => scrollMobileStories(-1)}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next story"
                    className="absolute right-2 top-[110px] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#215C07] shadow-sm transition hover:bg-[#f2f8ec] cursor-pointer"
                    onClick={() => scrollMobileStories(1)}
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              ) : null}

              <div
                ref={mobileSliderRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 pb-6"
              >
                {stories.map((story, index) => (
                  <div key={story.id} className="shrink-0 snap-center w-[85%] max-w-[360px]">
                    <div
                      className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-[#0f172a]"
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenIndex(index);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenIndex(index);
                        }
                      }}
                    >
                      <img
                        src={toThumbnailUrl(story.youtubeUrl)}
                        alt={story.title}
                        className="h-full w-full object-contain bg-white"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                      <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-left text-white">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                          Featured Story
                        </p>
                        <h3 className="mt-1 text-lg font-semibold leading-tight line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/80 line-clamp-2">
                          {story.description}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-4 w-full rounded-full bg-[#74C425] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#5ea01d]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenIndex(index);
                      }}
                    >
                      Watch Now
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Desktop 3D carousel (GSAP) */}
        <div className="relative mx-auto hidden sm:flex items-center justify-center px-4 pb-20">
          <button
            type="button"
            aria-label="Previous story"
            className="absolute left-2 md:left-10 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#215C07] transition hover:bg-[#f2f8ec] cursor-pointer"
            onClick={() => rotateRing(1)}
          >
            <ArrowLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next story"
            className="absolute right-2 md:right-10 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#215C07] transition hover:bg-[#f2f8ec]  cursor-pointer "
            onClick={() => rotateRing(-1)}
          >
            <ArrowRight size={22} />
          </button>

          <div
            className="relative h-[220px] sm:h-[240px] md:h-[260px] w-full max-w-[540px]"
            style={{ perspective: "1200px" }}
          >
            {isLoading && <div>Loading patient stories...</div>}
            {hasError && <div>Unable to load patient stories</div>}
            {!isLoading && !hasError && stories.length === 0 && (
              <div>No patient stories available</div>
            )}
            <div
              ref={ringRef}
              className="mt-30"
              style={{ transformStyle: "preserve-3d" }}
            >
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="absolute left-1/2 top-1/2 h-[180px] w-[260px] sm:h-[200px] sm:w-[300px] md:h-[280px] md:w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-2xl"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenIndex(index);
                    }
                  }}
                >
                  <div className="relative h-[220px] w-full overflow-visible rounded-2xl bg-[#0f172a] md:right-26 md:bottom-20 md:h-[350px] md:w-[700px]">
                    <img
                      src={toThumbnailUrl(story.youtubeUrl)}
                      alt={story.title}
                      className="h-full w-full object-contain bg-white"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-left text-white">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                        Featured Story
                      </p>
                      <h3 className="mt-1 text-lg font-semibold leading-tight line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/80 line-clamp-2">
                        {story.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="pointer-events-auto absolute left-1/2 bottom-[-48px] sm:bottom-[-56px] md:bottom-[-90px] z-30 inline-flex items-center gap-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#74C425] px-4 py-2 text-sm sm:text-base md:text-[25px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#5ea01d]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenIndex(index);
                      }}
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentVideoUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setOpenIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition"
                onClick={() => setOpenIndex(null)}
              >
                <X size={24} />
              </button>
              <div className="relative w-full aspect-video">
                <iframe
                  key={currentVideoUrl}
                  src={currentVideoUrl}
                  title="Patient Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-none"
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PatientStories;
