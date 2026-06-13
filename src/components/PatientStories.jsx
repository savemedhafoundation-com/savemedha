import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  X,
} from 'lucide-react';

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

const toFallbackThumbnailUrl = (input = "") => {
  const videoId = extractVideoId(input);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "https://img.youtube.com/vi/default/hqdefault.jpg";
};

const PatientStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentVideoUrl =
    openIndex !== null ? toEmbedUrl(stories[openIndex]?.youtubeUrl) : null;
  const visibleStories =
    stories.length > 0
      ? [-1, 0, 1].map((offset) => {
          const index = (activeIndex + offset + stories.length) % stories.length;
          return { ...stories[index], displaySlot: offset, sourceIndex: index };
        })
      : [];

  const changeActiveStory = (direction) => {
    if (!stories.length) return;
    setActiveIndex((current) => (
      current + direction + stories.length
    ) % stories.length);
  };

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
        setActiveIndex(0);
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

  return (
    <>
      <section
        id="patient-stories"
        className="home-section relative w-full overflow-hidden bg-[#F8FDF6] text-center"
      >
        <div className="home-container relative max-w-[1470px]">
          <h2 className="text-[24px] font-black tracking-tight text-slate-950 sm:text-[28px]">
            Patient&apos;s <span className="text-[#14980f]">Success Story</span>
          </h2>

          {isLoading && (
            <p className="home-content-gap text-sm font-semibold text-slate-500">
              Loading patient stories...
            </p>
          )}
          {hasError && (
            <p className="home-content-gap text-sm font-semibold text-red-600">
              Unable to load patient stories
            </p>
          )}
          {!isLoading && !hasError && stories.length === 0 && (
            <p className="home-content-gap text-sm font-semibold text-slate-500">
              No patient stories available
            </p>
          )}

          {!isLoading && !hasError && stories.length > 0 && (
            <>
              <div className="relative mx-auto mt-13 max-w-[1180px] px-12 sm:px-16">
                {stories.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous patient story"
                      className="absolute left-0 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#14980f] shadow-[0_12px_28px_rgba(15,23,42,0.16)] ring-1 ring-slate-200 transition hover:bg-[#14980f] hover:text-white"
                      onClick={() => changeActiveStory(-1)}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next patient story"
                      className="absolute right-0 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[#14980f] shadow-[0_12px_28px_rgba(15,23,42,0.16)] ring-1 ring-slate-200 transition hover:bg-[#14980f] hover:text-white"
                      onClick={() => changeActiveStory(1)}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <div className="home-card-grid grid grid-cols-1 items-center justify-items-center sm:grid-cols-3">
                {visibleStories.map((story) => {
                  const isActive = story.displaySlot === 0;
                  return (
                    <button
                      key={`${story.id}-${story.displaySlot}`}
                      type="button"
                      className={`group relative aspect-video overflow-hidden rounded-[8px] border bg-slate-900 text-left shadow-[0_18px_34px_rgba(15,23,42,0.16)] transition-all duration-300 ${
                        isActive
                          ? "z-20 w-full max-w-[540px] scale-105 border-[#14980f] ring-4 ring-[#14980f]/18 sm:scale-125"
                          : "w-full max-w-[450px] border-white/70 opacity-75 hover:opacity-100"
                      }`}
                      onClick={() => {
                        if (isActive) {
                          setOpenIndex(story.sourceIndex);
                        } else {
                          setActiveIndex(story.sourceIndex);
                        }
                      }}
                    >
                      <img
                        src={toThumbnailUrl(story.youtubeUrl)}
                        alt={story.title || "Patient success story"}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src = toFallbackThumbnailUrl(
                            story.youtubeUrl
                          );
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/15 to-transparent" />
                      <h3 className="absolute bottom-3 left-3 right-3 text-[13px] font-black leading-4 text-white line-clamp-2">
                        {story.title || "Patient success story"}
                      </h3>
                    </button>
                  );
                })}
                </div>
              </div>

              <a
                href="https://youtube.com/@savemedhafoundation7959"
                target="_blank"
                rel="noreferrer"
                className="home-content-gap inline-flex items-center gap-2 rounded-full bg-[#14980f] px-6 py-2.5 text-[13px] font-black text-white shadow-[0_14px_28px_rgba(20,152,15,0.26)] transition hover:bg-[#0f7d0b]"
              >
                Watch More
                <PlayCircle size={17} fill="currentColor" />
              </a>
            </>
          )}
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
