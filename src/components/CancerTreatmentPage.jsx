import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Play,
  Star,
} from "lucide-react";

import DoctorImg from "../assets/Photo/doc.png";
import Dot from "../assets/Photo/dot.png";
import Leaf from "../assets/Photo/leaf.png";
import Computerimg from "../assets/Photo/Remote work and video call with colleagues.png";
import Triangle from "../assets/Photo/triangle.png";
import Virus from "../assets/Photo/virus.png";
import Review1 from "../assets/Photo/review1.png";

const DEFAULT_THUMBNAIL = "https://placehold.co/300x220?text=Video";

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

  const patientStories = [
    { id: 1, duration: "8:24", label: "FEEDBACK 1", color: "blue" },
    { id: 2, duration: "19:52", label: "FEEDBACK 2", color: "green" },
    { id: 3, duration: "6:04", label: "FEEDBACK 3", color: "green" },
    { id: 4, duration: "7:45", label: "FEEDBACK 4", color: "green" },
    { id: 5, duration: "45:24", label: "FEEDBACK 5", color: "green" },
  ];

  const initialHealthVideos = useMemo(
    () => [
      {
        id: "placeholder-1",
        title: "Breast Cancer Treatment by Natural Immunotherapy - A New Hope",
        duration: "2:22",
        viewCount: 47,
        viewCountLabel: "47 views",
        publishedAtLabel: "4 months ago",
       
        videoUrl: "https://youtu.be/RZG-rUkvkSA?si=ssCVM0IOKM3psuMP",
      },
      {
        id: "placeholder-2",
        title: "What is Natural Immunotherapy? The Future of Healing",
        duration: "3:18",
        viewCount: 75,
        viewCountLabel: "75 views",
        publishedAtLabel: "4 months ago",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-3",
        title: "Hope Beyond Blood - Natural Immunotherapy for Thalassemia",
        duration: "4:21",
        viewCount: 25,
        viewCountLabel: "25 views",
        publishedAtLabel: "4 months ago",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
      {
        id: "placeholder-4",
        title: "How Toxins Turn a Healthy Cell into a Cancer Cell",
        duration: "1:45",
        viewCount: 8,
        viewCountLabel: "8 views",
        publishedAtLabel: "4 months ago",
        thumbnail: DEFAULT_THUMBNAIL,
        videoUrl: "https://www.youtube.com/@savemedhafoundation7959",
      },
    ],
    []
  );

  const [healthVideos, setHealthVideos] = useState(initialHealthVideos);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState(null);

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

          const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?${channelParams.toString()}`,
            { signal: controller.signal }
          );

          if (!channelResponse.ok) {
            throw new Error("Unable to locate channel on YouTube.");
          }

          const channelData = await channelResponse.json();
          channelId =
            channelData.items?.[0]?.id?.channelId ||
            channelData.items?.[0]?.snippet?.channelId ||
            "";
        }

        if (!channelId) {
          throw new Error("Could not resolve YouTube channel ID.");
        }

        const searchParams = new URLSearchParams({
          key: apiKey,
          channelId,
          part: "snippet",
          order: "date",
          maxResults: "8",
          type: "video",
        });

        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?${searchParams.toString()}`,
          { signal: controller.signal }
        );

        if (!videosResponse.ok) {
          throw new Error("Unable to load videos from YouTube.");
        }

        const videosData = await videosResponse.json();
        const videoIds =
          videosData.items?.map((item) => item.id?.videoId).filter(Boolean) || [];

        if (!videoIds.length) {
          setHealthVideos([]);
          return;
        }

        const detailsParams = new URLSearchParams({
          key: apiKey,
          id: videoIds.join(","),
          part: "contentDetails,statistics",
        });

        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?${detailsParams.toString()}`,
          { signal: controller.signal }
        );

        if (!detailsResponse.ok) {
          throw new Error("Unable to load video details.");
        }

        const detailsData = await detailsResponse.json();
        const detailsMap = new Map(
          (detailsData.items || []).map((item) => [item.id, item])
        );

        const formattedVideos = videosData.items
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
  }, [initialHealthVideos]);
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                "OUR GOAL" - CANCER FREE WORLD
              </h1>
              <p className="text-gray-600 mt-1">Subhankar Sarkar</p>
              <button className="mt-2 bg-[#74C425] hover:bg-[#1118A6] text-white px-6 py-4 rounded-lg flex items-center gap-2 mx-auto transition-colors font-sans cursor-pointer">
                <Phone size={20} />
                CONTACT US
              </button>
            </div>

            {/* Right: Doctor */}
            <div className="relative w-90 h-60 bg-white rounded-lg overflow-hidden">
              <div className="absolute left-0 top-0 w-60 h-60 rounded-full overflow-hidden border-4 border-gray-200">
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <img
                    src={DoctorImg}
                    alt="Doctor"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
              <div className="absolute top-1 left-60 w-30 h-20">
                <img src={Dot} alt="Dot Pattern" className="w-full h-full" />
              </div>
              <div className="absolute bottom-0 left-60 w-16 h-16">
                <img src={Triangle} alt="Triangle" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== PATIENT STORIES ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <h2 className="text-4xl font-bold text-center mb-8">
          PATIENT <span className="text-green-500">SUCCESS STORY</span>
        </h2>

        {/* Scroll buttons */}
        <button
          onClick={() => scrollStories(-1)}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => scrollStories(1)}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
        >
          <ArrowRight size={18} />
        </button>

        {/* Horizontal Scroll */}
        <div
          ref={patientStoriesRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
        >
          {patientStories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-[250px] snap-start flex flex-col"
            >
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video group cursor-pointer">
                <img
                  src="https://placehold.co/300x200"
                  alt={`Patient ${story.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <Play fill="white" className="text-white ml-1" size={28} />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {story.duration}
                </div>
              </div>
              <div
                className={`mt-2 ${
                  story.color === "blue" ? "bg-blue-700" : "bg-green-500"
                } text-white text-center py-2 rounded font-semibold text-sm`}
              >
                {story.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HEALTHCARE VIDEOS ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
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
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => scrollVideos(1)}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow"
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
              const metaText = [viewsText, timeText].filter(Boolean).join(" � ");

              return (
                <a
                  key={video.id}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[250px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow snap-start focus:outline-none focus:ring-2 focus:ring-green-500"
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
                </a>
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
        <div className="max-w-7xl mx-auto px-4">
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
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow hover:bg-[#92eeb8]"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scrollTestimonials(1)}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-green-500 text-green-700 items-center justify-center shadow hover:bg-[#86ff95]"
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
                  className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[390px] bg-white border border-[#1D942B] rounded-[2px] rounded-tr-[2px] rounded-tl-[25px] rounded-br-[52px] p-6 relative shadow-sm"
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
    </div>
  );
}








