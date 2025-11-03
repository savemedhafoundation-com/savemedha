import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Play,
  Star,
  X,
} from "lucide-react";
import { MdAddCall } from "react-icons/md";

import DoctorImg from "../assets/Photo/doc.png";
import Leaf from "../assets/Photo/leaf.png";
import Computerimg from "../assets/Photo/Remote work and video call with colleagues.png";
import Triangle from "../assets/Photo/triangle.png";
import Virus from "../assets/Photo/virus.png";
import Review1 from "../assets/Photo/review1.png";

const DEFAULT_THUMBNAIL = "https://placehold.co/300x220?text=Video";
const MAX_VIDEOS_TO_FETCH = 15;

const chunkArray = (input, size) => {
  if (!Array.isArray(input) || size <= 0) return [];

  const chunks = [];

  for (let index = 0; index < input.length; index += size) {
    chunks.push(input.slice(index, index + size));
  }

  return chunks;
};

const DotPattern = () => (
  <div className="grid grid-cols-8 gap-[6px]">
    {Array.from({ length: 48 }).map((_, idx) => (
      <span
        key={idx}
        className="h-[2px] w-[3px] rounded-full bg-[#74C425]"
      />
    ))}
  </div>
);

const getInitial = (name) => {
  if (!name) return "?";
  const firstChar = name.trim().charAt(0);
  return firstChar ? firstChar.toUpperCase() : "?";
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

  const secondsElapsed = Math.floor((Date.now() - publishedDate.getTime()) / 1000);
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
  const testimonialsRef = useRef(null);
  const patientStoriesRef = useRef(null);
  const healthVideosRef = useRef(null);

  // Scroll handlers
  const scrollTestimonials = (dir) => {
    const el = testimonialsRef.current;
    if (!el) return;

    const scrollAmount = 320 * dir;
    const tolerance = 10;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    if (maxScrollLeft <= 0) return;

    const atStart = el.scrollLeft <= tolerance;
    const atEnd = el.scrollLeft >= maxScrollLeft - tolerance;

    if (dir > 0 && atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (dir < 0 && atStart) {
      el.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      return;
    }

    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollStories = (dir) => {
    const el = patientStoriesRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const scrollVideos = (dir) => {
    const el = healthVideosRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

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
        title: "Rebuilding Immunity: Lifestyle Guidance from Save Medha Experts",
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

  const patientStories = useMemo(
    () =>
      initialHealthVideos.slice(0, 6).map((video) => ({
        ...video,
        thumbnail: video.thumbnail || DEFAULT_THUMBNAIL,
        duration: video.duration || "",
      })),
    [initialHealthVideos]
  );

  const [activeStoryId, setActiveStoryId] = useState(
    () => patientStories[0]?.id ?? null
  );

  useEffect(() => {
    if (!patientStories.length) return;
    const activeExists = patientStories.some(
      (story) => story.id === activeStoryId
    );
    if (!activeExists) {
      setActiveStoryId(patientStories[0].id);
    }
  }, [patientStories, activeStoryId]);

  const fallbackVideoIds = useMemo(
    () =>
      initialHealthVideos
        .map((video) => extractYoutubeId(video))
        .filter(Boolean),
    [initialHealthVideos]
  );

  const [healthVideos, setHealthVideos] = useState(initialHealthVideos);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

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

              const data = await response.json();
              const candidate =
                data.items?.[0]?.snippet?.channelId ||
                "";

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
              const channelData = await channelResponse.json();
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

            const data = await response.json();
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

              const data = await response.json();
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
                rawViews != null ? `${formatViewCount(rawViews)} views` : undefined,
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
  const testimonials = [
    {
      name: "Bidhan Kumar Halder",
      rating: 5,
      text: "I am from Bangladesh, I came here and I am fine now.",
      image: "https://i.pravatar.cc/150?img=63",
    },
    {
      name: "Soumitra Gayen",
      rating: 5,
      text: "I am a rectal cancer patient and I am fine now. Best treatment here.",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Anowarul Hossain",
      rating: 5,
      text: "Save Medha Foundation is a new horizon in medical science. It is a real example of easy access to cure for all complex diseases including cancer, thalassemia, and other terminal diseases for the people of West Bengal, Orissa, Assam, Nepal, India and Bangladesh. May Save Medha move forward quickly, best wishes.",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sadekul SK",
      rating: 5,
      text: "Best and affordable treatment for lower middle class family.",
      image: "https://i.pravatar.cc/150?img=58",
    },
    {
      name: "Ilias Islam Mondal",
      rating: 5,
      text: "I started therapy here and feel healthier and more energetic now.",
      image: Review1,
    },
    {
      name: "Sandip Mudi",
      rating: 5,
      text: "Best and affordable treatment",
      image: "https://i.pravatar.cc/150?img=28",
    },
    {
      name: "Aparna Mandal",
      rating: 5,
      text: "khub sundor byabobher oder .",
      image: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Sohel Rana",
      rating: 5,
      text: "Affordable, compassionate, and focused on natural healing that works.",
      image: "https://i.pravatar.cc/150?img=56",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white10">
      {/* Header */}
      <header className="bg-transparent">
        <div className="w-full py-6">
          <div className="flex flex-row items-center justify-between gap-12 rounded-2xl border border-gray-200 bg-white px-12 py-10 shadow-md">
            {/* Left: Logo */}
            <div className="flex items-center gap-4">
              <div className="w-40 h-40 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
                  <img
                    src={Leaf}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <img src={Virus} alt="Cancer cells" className="h-40" />
            </div>

            {/* Center */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                "OUR GOAL" - CANCER FREE WORLD
              </h1>
              <p className="text-gray-600 mt-1">Subhankar Sarkar</p>
              <button className="mt-2 bg-[#74C425] hover:bg-[#1118A6] text-white px-6 py-4 rounded-lg flex items-center gap-2 mx-auto transition-colors font-sans cursor-pointer">
                <MdAddCall />
                CONTACT US
              </button>
            </div>

            {/* Right: Doctor */}
            <div className="relative w-[360px] h-[240px] bg-white rounded-2xl overflow-hidden">
              <div className="absolute left-0 top-0 w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <img
                    src={DoctorImg}
                    alt="Doctor"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
              <div className="absolute top-1 left-40">
                <DotPattern />
              </div>
              <div className="absolute bottom-8 left-32 w-16 h-16">
                <img src={Triangle} alt="Triangle" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== PATIENT STORIES ===================== */}
      <section className="w-full py-12 relative">
        <h2 className="text-4xl font-bold text-center mb-8">
          PATIENT <span className="text-green-500">SUCCESS STORY</span>
        </h2>

        {/* Scroll buttons */}
        <button
          onClick={() => scrollStories(-1)}
          className="flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => scrollStories(1)}
          className="flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
        >
          <ArrowRight size={18} />
        </button>

        {/* Horizontal Scroll */}
        <div
          ref={patientStoriesRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        >
          {patientStories.map((story) => {
            const isActiveStory = story.id === activeStoryId;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => {
                  setActiveStoryId(story.id);
                setSelectedVideo(story);
              }}
              className="flex-shrink-0 w-[250px] snap-start flex flex-col text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg"
            >
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
                <img
                  src={story.thumbnail || DEFAULT_THUMBNAIL}
                  alt={story.title || "Patient success story"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/45">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Play fill="white" className="text-white ml-1" size={28} />
                  </div>
                </div>
                {story.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {story.duration}
                  </div>
                )}
              </div>
              <div
                className={`mt-2 ${
                  isActiveStory ? "bg-blue-700" : "bg-green-500"
                } text-white text-center py-3 rounded font-semibold text-sm px-3 min-h-[64px] flex items-center justify-center`}
                title={story.title}
              >
                {story.title}
              </div>
            </button>
            );
          })}
        </div>
      </section>

      {/* ===================== HEALTHCARE VIDEOS ===================== */}
      <section className="w-full py-12 relative">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src={Computerimg} alt="Healthcare icon" className="w-20 h-20" />
            <h2 className="text-3xl font-bold">
              Browse our latest Videos on
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-green-500">
            Healthcare & Wellness
          </h3>
        </div>

        {/* Scroll buttons */}
        <button
          onClick={() => scrollVideos(-1)}
          className="flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => scrollVideos(1)}
          className="flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
        >
          <ArrowRight size={18} />
        </button>

        {videoError && (
          <p className="text-center text-sm text-red-600 mb-4">{videoError}</p>
        )}

        {/* Horizontal Scroll */}
        <div
          ref={healthVideosRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        >
          {loadingVideos ? (
            <div className="flex items-center justify-center w-full py-12 text-sm text-gray-600">
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
              const metaText = [viewsText, timeText].filter(Boolean).join(" | ");

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setSelectedVideo(video)}
                  className="flex-shrink-0 w-[250px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow snap-start text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || DEFAULT_THUMBNAIL}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                      {video.title}
                    </h4>
                    {metaText && (
                      <p className="text-xs text-gray-600">{metaText}</p>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex items-center justify-center w-full py-12 text-sm text-gray-600">
              No videos available right now. Please check back soon.
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <a
            href="http://www.youtube.com/@savemedhafoundation7959"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-[#1118A6] text-white px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center gap-3 transition-colors cursor-pointer"
          >
            WATCH NOW
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Play fill="red" className="text-red-200" size={20} />
            </div>
          </a>
        </div>
      </section>
      {/* ===================== TESTIMONIALS ===================== */}
      <section className="bg-gradient-to-b from-green-50 to-green-50 py-10">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              TESTI<span className="text-[#74C425]">MONIALS</span>
            </h2>
            <p className="text-gray-600 mt-2 font-medium">Turning Vision into Reality</p>
          </div>

          <div className="relative w-full">
            {/* Arrows */}
            <button
              onClick={() => scrollTestimonials(-1)}
              className="flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow hover:bg-[#92eeb8]"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollTestimonials(1)}
              className="flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow hover:bg-[#86ff95]"
            >
              <ArrowRight size={18} />
            </button>

            {/* Scroll container */}
            <div
              ref={testimonialsRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3"
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-shrink-0 w-[390px] bg-white border border-[#1D942B] rounded-[2px] rounded-tr-[2px] rounded-tl-[25px] rounded-br-[52px] p-6 relative shadow-sm"
                >
                  <div className="absolute top-4 left-1 w-4 h-4   rounded-full bg-[#74C425] mt-4 ml-2 " />
                  
                  <div className="absolute top-3 left-3 w-12 h-12 rounded-full bg-[#74C425] opacity-70 mt-8 ml-2 " />

                  <div className="relative z-10 flex items-start gap-4 mt-8 ml-4">
                    <div className="relative shrink-0">
                      
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full ring-4 ring-white shadow-md bg-green-600 text-white font-semibold flex items-center justify-center text-lg">
                          {getInitial(t.name)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900">
                        {t.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[#F7C948] my-2">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill="#F7C948"
                            className="text-[#F7C948]"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
                  Unable to play this video here. You can watch it directly on YouTube.
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








