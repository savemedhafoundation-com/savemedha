import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Play, X } from "lucide-react";
import { MdPhoneInTalk } from "react-icons/md";

import DoctorImg from "../assets/Photo/doc.png";
import RedRibbon from "../assets/Photo/redreben.png";
import BackgroundImg from "../assets/Photo/backgroud.png";
import Computerimg from "../assets/Photo/Remote work and video call with colleagues.png";
import BgImgOfVideoSection from "../assets/Photo/bgimgofvideosection.png";
import Rectangle374 from "../assets/Photo/Rectangle 374.png";

const DEFAULT_THUMBNAIL = "https://placehold.co/300x220?text=Video";
const MAX_VIDEOS_TO_FETCH = 18;

const parseJsonSafely = async (response, contextLabel = "response") => {
  const sourceLabel = contextLabel || "response";
  const rawBody = await response.text();
  const trimmedBody = rawBody.trim();

  if (!trimmedBody) {
    throw new Error(`${sourceLabel} returned an empty response.`);
  }

  try {
    return JSON.parse(trimmedBody);
  } catch (error) {
    throw new Error(`${sourceLabel} returned malformed JSON.`);
  }
};

const chunkArray = (input, size) => {
  if (!Array.isArray(input) || size <= 0) return [];

  const chunks = [];

  for (let index = 0; index < input.length; index += size) {
    chunks.push(input.slice(index, index + size));
  }

  return chunks;
};

const formatISODuration = (isoDuration) => {
  if (!isoDuration || typeof isoDuration !== "string") return null;
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (!totalSeconds) return "0:00";

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return `${m}:${String(s).padStart(2, "0")}`;
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return "";
  const publishedDate = new Date(dateString);
  if (Number.isNaN(publishedDate.getTime())) return "";

  const secondsElapsed = Math.floor(
    (Date.now() - publishedDate.getTime()) / 1000
  );
  if (secondsElapsed < 60) return "just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsElapsed / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

const formatViewCount = (value) => {
  if (value == null) return "";
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return "";

  if (numericValue >= 1000000) {
    const formatted = numericValue / 1000000;
    return `${formatted >= 10 ? Math.round(formatted) : formatted.toFixed(1)}M`;
  }

  if (numericValue >= 1000) {
    const formatted = numericValue / 1000;
    return `${formatted >= 10 ? Math.round(formatted) : formatted.toFixed(1)}K`;
  }

  return numericValue.toLocaleString();
};

const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;

const extractYoutubeId = (video) => {
  if (!video) return null;

  if (video.id && YOUTUBE_ID_PATTERN.test(video.id)) {
    return video.id;
  }

  if (typeof video.videoUrl === "string") {
    try {
      const url = new URL(video.videoUrl);
      const hostname = url.hostname.toLowerCase();

      if (hostname.includes("youtu.be")) {
        const potentialId = url.pathname.split("/").filter(Boolean)[0];
        if (potentialId && YOUTUBE_ID_PATTERN.test(potentialId)) {
          return potentialId;
        }
      }

      if (hostname.includes("youtube.com")) {
        if (url.pathname === "/watch") {
          const v = url.searchParams.get("v");
          if (v && YOUTUBE_ID_PATTERN.test(v)) return v;
        }

        const parts = url.pathname.split("/").filter(Boolean);
        const candidate = parts[1];

        if (
          parts[0] &&
          ["embed", "shorts", "live"].includes(parts[0]) &&
          candidate &&
          YOUTUBE_ID_PATTERN.test(candidate)
        ) {
          return candidate;
        }
      }
    } catch (error) {
      // Ignore malformed URLs
    }
  }

  return null;
};

export default function CancerTreatmentPage() {
  // Refs for each scrollable section
  const healthVideosRef = useRef(null);

  // Scroll handlers
  const initialHealthVideos = useMemo(
    () => [
      {
        id: "placeholder-1",
        title: "PATIENT FEEDBACK",
        duration: "2:22",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://youtu.be/6JbRVZuDZo4",
      },
      {
        id: "placeholder-2",
        title: "What is Natural Immunotherapy? The Future of Healing",
        duration: "3:18",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-3",
        title: "Hope Beyond Blood - Natural Immunotherapy for Thalassemia",
        duration: "4:21",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-4",
        title: "How Toxins Turn a Healthy Cell into a Cancer Cell",
        duration: "1:45",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-5",
        title:
          "Rebuilding Immunity: Lifestyle Guidance from Save Medha Experts",
        duration: "5:12",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-6",
        title: "Understanding Detox Therapy for Cancer Prevention",
        duration: "7:08",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-7",
        title: "Kidney Revival Success Story: Natural Healing Journey",
        duration: "6:29",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-8",
        title: "Daily Nutrition Tips for a Cancer-Free Lifestyle",
        duration: "3:57",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-9",
        title: "Live Q&A: Natural Immunotherapy Myths Debunked",
        duration: "9:44",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
    ],
    []
  );

  const fallbackVideoIds = useMemo(
    () =>
      initialHealthVideos
        .map((video) => extractYoutubeId(video))
        .filter(Boolean),
    [initialHealthVideos]
  );

  const [healthVideos, setHealthVideos] = useState(initialHealthVideos);
  console.log("healthvideos",healthVideos);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(
    initialHealthVideos[0]?.id || null
  );

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const envChannelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
    const envChannelHandle = import.meta.env.VITE_YOUTUBE_CHANNEL_HANDLE;
    const fallbackHandle = envChannelHandle || "@savemedhafoundation7959";

    if (!apiKey) {
      setVideoError("Add VITE_YOUTUBE_API_KEY to load live videos.");
      setHealthVideos(initialHealthVideos);
      return;
    }

    const controller = new AbortController();

    const loadVideos = async () => {
      setLoadingVideos(true);
      setVideoError(null);

      try {
        let channelId = envChannelId;
        let channelResolutionError = "";

        const deriveChannelIdFromFallback = async () => {
          for (const fallbackVideoId of fallbackVideoIds) {
            if (!fallbackVideoId) continue;

            try {
              const videoParams = new URLSearchParams({
                key: apiKey,
                id: fallbackVideoId,
                part: "snippet",
              });

              const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?${videoParams.toString()}`,
                { signal: controller.signal }
              );

              if (!response.ok) {
                continue;
              }

              const data = await parseJsonSafely(
                response,
                "YouTube video lookup"
              );
              const candidate = data.items?.[0]?.snippet?.channelId || "";

              if (candidate) {
                return candidate;
              }
            } catch (lookupError) {
              if (lookupError.name === "AbortError") {
                throw lookupError;
              }
            }
          }

          return null;
        };

        if (!channelId) {
          const query = fallbackHandle.startsWith("@")
            ? fallbackHandle.slice(1)
            : fallbackHandle;

          const channelParams = new URLSearchParams({
            key: apiKey,
            part: "snippet",
            q: query,
            type: "channel",
            maxResults: "1",
          });

          try {
            const channelResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/search?${channelParams.toString()}`,
              { signal: controller.signal }
            );

            if (channelResponse.ok) {
              const channelData = await parseJsonSafely(
                channelResponse,
                "YouTube channel lookup"
              );
              channelId =
                channelData.items?.[0]?.id?.channelId ||
                channelData.items?.[0]?.snippet?.channelId ||
                "";

              if (!channelId) {
                channelResolutionError = "channel search returned no results";
              }
            } else {
              const statusText = channelResponse.statusText
                ? channelResponse.statusText.trim()
                : "";
              channelResolutionError = statusText
                ? `${channelResponse.status} ${statusText}`
                : `status ${channelResponse.status}`;
            }
          } catch (lookupError) {
            if (lookupError.name === "AbortError") return;
            channelResolutionError =
              lookupError.message || "channel lookup request failed";
          }
        }

        if (!channelId && fallbackVideoIds.length) {
          try {
            channelId = await deriveChannelIdFromFallback();
          } catch (fallbackError) {
            if (fallbackError.name === "AbortError") return;
            if (!channelResolutionError) {
              channelResolutionError =
                fallbackError.message || "fallback channel resolution failed";
            }
          }
        }

        if (!channelId) {
          const message = channelResolutionError
            ? `Unable to locate channel on YouTube (${channelResolutionError}).`
            : "Unable to locate channel on YouTube.";
          throw new Error(message);
        }

        const fetchChannelVideos = async (resolvedChannelId) => {
          let allItems = [];
          let pageToken;

          do {
            const searchParams = new URLSearchParams({
              key: apiKey,
              channelId: resolvedChannelId,
              part: "snippet",
              order: "date",
              maxResults: "50",
              type: "video",
            });

            if (pageToken) {
              searchParams.set("pageToken", pageToken);
            }

            const response = await fetch(
              `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`,
              { signal: controller.signal }
            );

            if (!response.ok) {
              throw new Error("Unable to load videos from YouTube.");
            }

            const data = await parseJsonSafely(
              response,
              "YouTube channel videos"
            );
            const items = data.items || [];

            allItems = allItems.concat(items);
            pageToken = data.nextPageToken;

            if (!pageToken || allItems.length >= MAX_VIDEOS_TO_FETCH) {
              break;
            }
          } while (true);

          return allItems.slice(0, MAX_VIDEOS_TO_FETCH);
        };

        const fetchVideoDetails = async (ids) => {
          const chunks = chunkArray(ids, 50);
          if (!chunks.length) return [];

          const detailResponses = await Promise.all(
            chunks.map(async (chunk) => {
              const detailsParams = new URLSearchParams({
                key: apiKey,
                id: chunk.join(","),
                part: "contentDetails,statistics",
              });

              const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?${detailsParams.toString()}`,
                { signal: controller.signal }
              );

              if (!response.ok) {
                throw new Error("Unable to load video details.");
              }

              const data = await parseJsonSafely(
                response,
                "YouTube video details"
              );
              return data.items || [];
            })
          );

          return detailResponses.reduce((acc, items) => acc.concat(items), []);
        };

        const videoItems = await fetchChannelVideos(channelId);

        if (!videoItems.length) {
          setHealthVideos([]);
          return;
        }

        const videoIds = videoItems
          .map((item) => item.id?.videoId)
          .filter(Boolean);

        if (!videoIds.length) {
          setHealthVideos([]);
          return;
        }

        const details = await fetchVideoDetails(videoIds);
        const detailsMap = new Map(details.map((item) => [item.id, item]));

        const formattedVideos = videoItems
          .map((item) => {
            const videoId = item.id?.videoId;
            if (!videoId) return null;

            const snippet = item.snippet || {};
            const detail = detailsMap.get(videoId);

            const durationLabel =
              formatISODuration(detail?.contentDetails?.duration) || "";
            const rawViews = detail?.statistics?.viewCount
              ? Number(detail.statistics.viewCount)
              : null;

            const thumbnail =
              snippet.thumbnails?.medium?.url ||
              snippet.thumbnails?.high?.url ||
              snippet.thumbnails?.default?.url ||
              DEFAULT_THUMBNAIL;

            return {
              id: videoId,
              title: snippet.title || "Untitled video",
              duration: durationLabel,
              viewCount: rawViews,
              viewCountLabel:
                rawViews != null
                  ? `${formatViewCount(rawViews)} views`
                  : undefined,
              publishedAt: snippet.publishedAt || null,
              publishedAtLabel: snippet.publishedAt ? undefined : "",
              thumbnail,
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            };
          })
          .filter(Boolean);

        setHealthVideos(formattedVideos);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error(error);
        setVideoError(error.message || "Unable to load videos right now.");
        setHealthVideos(initialHealthVideos);
      } finally {
        setLoadingVideos(false);
      }
    };

    loadVideos();

    return () => controller.abort();
  }, [initialHealthVideos, fallbackVideoIds]);

  useEffect(() => {
    if (!healthVideos.length) return;

    const hasActive = healthVideos.some(
      (video) => video.id === activeVideoId
    );

    if (!hasActive) {
      setActiveVideoId(healthVideos[0].id);
    }
  }, [activeVideoId, healthVideos]);

  const selectedVideoId = useMemo(
    () => extractYoutubeId(selectedVideo),
    [selectedVideo]
  );

  const embedSrc = useMemo(() => {
    if (!selectedVideoId) return null;

    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      playsinline: "1",
      modestbranding: "1",
    });

    return `https://www.youtube.com/embed/${selectedVideoId}?${params.toString()}`;
  }, [selectedVideoId]);

  const closeVideoModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  useEffect(() => {
    if (!selectedVideo) return undefined;
    if (typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedVideo]);

  useEffect(() => {
    if (!selectedVideo) return undefined;
    if (typeof window === "undefined") return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeVideoModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeVideoModal, selectedVideo]);

  const scrollVideos = useCallback(
    (dir) => {
      const el = healthVideosRef.current;
      if (!el || !healthVideos.length) return;

      const currentIndex = Math.max(
        healthVideos.findIndex((video) => video.id === activeVideoId),
        0
      );
      const nextIndex = Math.min(
        Math.max(currentIndex + dir, 0),
        healthVideos.length - 1
      );

      const targetVideo = healthVideos[nextIndex];
      if (targetVideo) {
        setActiveVideoId(targetVideo.id);

        const targetNode = el.querySelector(
          `[data-video-id="${targetVideo.id}"]`
        );
        if (targetNode) {
          targetNode.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
          return;
        }
      }

      el.scrollBy({ left: dir * 320, behavior: "smooth" });
    },
    [activeVideoId, healthVideos]
  );

  const handleVideoSelect = useCallback((video) => {
    if (!video) return;
    setActiveVideoId(video.id);
    setSelectedVideo(video);
  }, []);

  const activeVideoIndex = Math.max(
    healthVideos.findIndex((video) => video.id === activeVideoId),
    0
  );
  const videoSliderPercent =
    healthVideos.length > 1
      ? (activeVideoIndex / (healthVideos.length - 1)) * 100
      : healthVideos.length === 1
        ? 100
        : 0;

  return (
    // <div className="min-h-screen bg-gradient-to-b from-green-50 to-white10">
    <div className="min-h-screen bg-[#ffffff]">
      {/* ===================== HEALTHCARE VIDEOS ===================== */}
      {/* <section className="w-full py-16">
        <div className="mx-auto max-w-8xl">
          <div className="relative w-full rounded-3xl border border-gray-200 bg-[#ffffffd8] py-14 text-center shadow-md">
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-4">
                <img
                  src={Computerimg}
                  alt="Healthcare icon"
                  className="h-16 w-16 sm:h-20 sm:w-20"
                />
                <div className="text-left">
                  <h2 className="relative inline-block text-3xl font-bold text-slate-900 sm:text-4xl">
                    <span className="relative">Browse our latest Videos on</span>
                    <div className="absolute bottom-[-10px] left-0 h-1 w-20 bg-[#74C425]" />
                  </h2>
                  <p className="mt-2 text-2xl font-bold text-[#74C425] sm:text-3xl">
                    Healthcare & Wellness
                  </p>
                </div>
              </div>
              {videoError && (
                <p className="mt-4 text-sm text-red-600">{videoError}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollVideos(-1)}
              className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#0d8b1f] bg-white text-[#0d8b1f] shadow-lg transition hover:bg-[#edfce0]"
              aria-label="Scroll videos left"
            >
              <ArrowLeft size={26} />
            </button>
            <button
              type="button"
              onClick={() => scrollVideos(1)}
              className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#0d8b1f] bg-white text-[#0d8b1f] shadow-lg transition hover:bg-[#edfce0]"
              aria-label="Scroll videos right"
            >
              <ArrowRight size={26} />
            </button>

            <div
              ref={healthVideosRef}
              className="relative mx-auto flex max-w-7xl justify-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-6 sm:px-10 hide-scrollbar"
            >
              {loadingVideos ? (
                <div className="flex w-full items-center justify-center py-12 text-sm text-gray-600">
                  Loading latest videos...
                </div>
              ) : healthVideos.length ? (
                healthVideos.map((video) => {
                  const viewsText =
                    video.viewCount != null
                      ? `${formatViewCount(video.viewCount)} views`
                      : video.viewCountLabel || "";
                  const timeText = video.publishedAt
                    ? formatRelativeTime(video.publishedAt)
                    : video.publishedAtLabel || "";
                  const metaText = [viewsText, timeText]
                    .filter(Boolean)
                    .join(" | ");
                  const isActive = video.id === activeVideoId;

                  return (
                    <button
                      key={video.id}
                      type="button"
                      data-video-id={video.id}
                      onClick={() => handleVideoSelect(video)}
                      className="group flex w-[250px] flex-shrink-0 snap-center flex-col text-left focus:outline-none"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-[26px] bg-gray-200 shadow-[0_18px_26px_rgba(17,50,24,0.25)]">
                        <img
                          src={video.thumbnail || DEFAULT_THUMBNAIL}
                          alt={video.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2231A] shadow-lg">
                            <Play className="ml-1 text-white" size={28} />
                          </div>
                        </div>
                        {video.duration && (
                          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                            {video.duration}
                          </span>
                        )}
                      </div>
                      <div
                        className={`mt-3 min-h-[88px] rounded-[18px] px-4 py-3 text-center text-sm font-semibold transition ${
                          isActive
                            ? "bg-[#1345c3] text-white"
                            : "bg-[#e0f7d4] text-[#0d8b1f]"
                        }`}
                      >
                        <p className="line-clamp-2">{video.title}</p>
                        {metaText && (
                          <p
                            className={`mt-1 text-xs ${
                              isActive ? "text-white/80" : "text-[#0d8b1f]/80"
                            }`}
                          >
                            {metaText}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="flex w-full items-center justify-center py-12 text-sm text-gray-600">
                  No videos available right now. Please check back soon.
                </div>
              )}
            </div>

            <div className="mx-auto mt-4 w-72" aria-hidden="true">
              <div className="h-1 rounded-full bg-gray-200">
                <div
                  className="h-1 rounded-full bg-[#74C425] transition-all"
                  style={{ width: `${videoSliderPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="http://www.youtube.com/@savemedhafoundation7959"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#74C425] px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#0f36a1]"
              >
                WATCH NOW
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                  <Play fill="red" className="text-red-200" size={20} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* ===================== HEALTHCARE VIDEOS ===================== */}
<section className="w-full py-16">
        <div className="mx-auto max-w-10xl px-4">
          <div className="relative rounded-3xl overflow-hidden  border border-gray-200 shadow-[5px_4px_4px_0px_#215C0740] bg-[#FBFFF9]">
            
            {/* Top Header */}
            <div className="relative text-center pt-12 pb-2 px-8">
              
              <div className="inline-flex items-center gap-6 mb-0">
                <div className="relative">
                  <img
                    src={Computerimg}
                    alt="Healthcare icon"
                    className="w-40 h-42 drop-shadow-lg"
                  />
                  <div className="absolute bottom-12 -right-5 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <Play className="text-white ml-0.5" size={20} />
                  </div>
                </div>
                <div className="text-left">
                  <h2 className="text-4xl md:text-4xl font-bold text-slate-900 mb-2 tracking-wide [word-spacing:6px]">
                    BROWSE OUR LATEST VIDEOS ON
                  </h2>
                  <p className="text-4xl md:text-4xl font-bold text-[#74C425] mt-2 text-center relative">
                    HEALTHCARE & WELLNESS
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-1 w-49 bg-[#74C425]" />
                  </p>
                </div>
              </div>
            </div>

           
            {/* Video Grid - 5 columns, fixed card design like screenshot */}
            <div className="relative overflow-hidden  pt-50 pb-16 px-2">
	              <div
	                className="absolute inset-0  bg-cover bg-center bg-no-repeat opacity-30 "
	                style={{
	                  backgroundImage: `url(${BgImgOfVideoSection})`,
	                  backgroundSize: "contain", 
	                }}
	                
	                aria-hidden="true"
	              />

	             

              

              <div className="relative">
        {/* bg-gradient-to-b from-[#74C425] to-[#346700] */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {healthVideos.slice(0, 20).map((video, index) => (
            <button
              key={video.id}
              onClick={() => handleVideoSelect(video)}
              className="group flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
            >
              {/* Video Thumbnail */}
              <div className="relative w-full mb-0">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={video.thumbnail || DEFAULT_THUMBNAIL}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center rounded-2xl">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="text-white ml-1" size={32} />
                    </div>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {video.duration}
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Meta */}
              <div className="space-y-2 bg-gradient-to-br from-[#D6FFBB] to-[#FFFFFF] rounded-3xl p-4">
                <h3 className="font-bold text-sm leading-tight line-clamp-2 text-gray-800 group-hover:text-[#74C425] transition-colors">
                 
                </h3>
               
                <span className="inline-block px-6 py-2 bg-[#74C425] text-white text-xs font-bold rounded-full hover:bg-[#1118A6] transition-colors">
                  WATCH NOW
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Watch More Button */}
        <div className="text-center mt-12">
          <a
            href="https://youtube.com/@savemedhafoundation7959?si=y8vz2XCG11RgDmwg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-12 py-5 bg-[#74C425] hover:bg-[#1118A6] text-white text-xl font-bold rounded-full shadow-2xl transition-all transform hover:scale-105"
          >
            WATCH MORE
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Play className="text-red-600" size={28} fill="red" />
            </div>
          </a>
        </div>
      </div>
      </div>
    </div>
  </div>
            
 <div className="w-[1730px] mt-20 py-16 pl-4 sm:pl-[30px] relative">

  {/* GREEN CURVED BACK SHAPE */}
  <div
    className="absolute left-[10px] top-1/2 mt-4 -translate-y-1/2 h-[400px] w-[400px] bg-gradient-to-b from-[#74C425] to-[#385E12] z-0"
    style={{
      borderRadius: "50% 50% 0% 100% / 46% 43% 57% 54%",
    }}
  />

  {/* MAIN WHITE PILL CARD */}
  <div className="relative z-10 flex items-center justify-between bg-white rounded-[30px] shadow-[5px_4px_4px_0px_#215C0740] overflow-hidden h-[260px] px-14">

    {/* LEFT CONTENT */}
    <div className="flex items-center  gap-8">
      {/* DOCTOR IMAGE */}
      <div className="h-[230px] w-[230px] rounded-full bg-[#e9f5dd] flex items-center justify-center overflow-hidden">
        <img
          src={DoctorImg}
          alt="Subhankar Sarkar"
          className="h-[210px] w-[210px] rounded-full object-cover grayscale"
        />
      </div>

      {/* TEXT + CTA */}
      <div className="flex flex-col   mb-8 ml-8 gap-4">
        <h3 className="text-[30px] font-bold text-black uppercase leading-tight">
          "OUR GOAL" – CANCER FREE WORLD <br /> 
        </h3>

        <p className="text-[22px] text-gray-700 font-medium">
          Subhankar Sarkar
        </p>

                    <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#74C425] w-[188px] h-[45px] text-[15px] font-semibold text-white shadow hover:bg-[#5ea01d] transition">
                      <MdPhoneInTalk size={16} />
                      CONTACT US
                    </button>
      </div>
    </div>

    {/* CENTER RIBBON */}
    <img
      src={RedRibbon}
      alt="Cancer Ribbon"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px]"
    />

    {/* RIGHT IMAGE — ONLY PLACE BACKGROUND IMAGE HERE */}
    <div className="relative h-full w-[600px] transform translate-x-24 overflow-hidden">
  {/* Image */}
  <img
    src={BackgroundImg}
    alt="Hope"
    className="h-full w-full object-cover"
  />

  {/* White → Transparent Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
</div>


  </div>
</div>


        </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeVideoModal}
              className="absolute top-4 right-4 text-white hover:text-green-300 transition-colors bg-black/60 rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
            >
              <span className="sr-only">Close video</span>
              <X size={28} />
            </button>
            {embedSrc ? (
              <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black aspect-video">
                <iframe
                  src={embedSrc}
                  title={selectedVideo.title || "YouTube video"}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
                <p className="text-gray-800 font-medium mb-4">
                  Unable to play this video here. You can watch it directly on
                  YouTube.
                </p>
                {selectedVideo.videoUrl && (
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-[#1118A6] transition-colors"
                    onClick={closeVideoModal}
                  >
                    Open in YouTube
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
