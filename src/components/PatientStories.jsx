import React, { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";

const patientStories = [
  {
    id: 1,
    title: "Discussion with Tanjila after full cure from Blood Cancer",
    youtubeUrl: "https://youtu.be/BvBIVuhY3uc?si=s3gDfzzD42Qia1Vg",
    duration: "05:12",
  },
 
  
  {
    id: 4,
    title: "After defeating cancer, Mainul is now healthy and living a normal life",
    youtubeUrl: "https://youtu.be/ld62F0ZhwY0?si=H3PqIt922Bx1pmAT",
    duration: "02:58",
  },
];

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
  const scrollerRef = useRef(null);
  const [activeStoryId, setActiveStoryId] = useState(patientStories[0].id);
  const [openVideo, setOpenVideo] = useState(null);

  const activeStory = useMemo(
    () => patientStories.find((story) => story.id === activeStoryId),
    [activeStoryId]
  );
  const activeIndex = patientStories.findIndex(
    (story) => story.id === activeStoryId
  );
  const sliderPercent =
    patientStories.length > 1
      ? (activeIndex / (patientStories.length - 1)) * 100
      : 0;

  const scrollToStory = (storyId) => {
    setActiveStoryId(storyId);
    const node = scrollerRef.current?.querySelector(
      `[data-story-id="${storyId}"]`
    );
    node?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleArrow = (direction) => {
    const currentIndex = activeIndex === -1 ? 0 : activeIndex;
    const nextIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      patientStories.length - 1
    );
    scrollToStory(patientStories[nextIndex].id);
  };

  const openStoryModal = (story) => {
    scrollToStory(story.id);
    setOpenVideo(toEmbedUrl(story.youtubeUrl));
  };

  const closeModal = () => setOpenVideo(null);

  return (
    <section
      id="patient-stories"
      className="relative w-full bg-[#FBFFF9] border border-gray-200 shadow-[5px_4px_4px_0px_#215C0740] py-16 text-center rounded-3xl"
    >
      <div className="mb-12 text-center">
        <h2 className="relative inline-block text-4xl font-bold text-slate-900">
          <span className="relative">PATIENT </span>
          <div className="absolute bottom-[-10px] left-0 h-1 w-20 bg-[#74C425]" />
          <span className="text-[#74C425]">SUCCESS STORY</span>
        </h2>
      </div>

      <button
        type="button"
        onClick={() => handleArrow(-1)}
        className="absolute left-12 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#0d8b1f] bg-white text-[#0d8b1f] shadow-lg transition hover:bg-[#edfce0]"
        aria-label="Scroll stories left"
      >
        <ArrowLeft size={26} />
      </button>
      <button
        type="button"
        onClick={() => handleArrow(1)}
        className="absolute right-12 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#0d8b1f] bg-white text-[#0d8b1f] shadow-lg transition hover:bg-[#edfce0]"
        aria-label="Scroll stories right"
      >
        <ArrowRight size={26} />
      </button>

      <div
        ref={scrollerRef}
        className="relative mx-auto flex max-w-6xl justify-center gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-6 sm:px-10"
      >
        {patientStories.map((story) => {
          const isActive = story.id === activeStoryId;
          return (
            <button
              key={story.id}
              type="button"
              data-story-id={story.id}
              onClick={() => openStoryModal(story)}
              className="group flex w-[250px] flex-shrink-0 snap-center flex-col text-left focus:outline-none"
            >
              <div className="relative aspect-video overflow-hidden rounded-[26px] bg-gray-200 shadow-[0_18px_26px_rgba(17,50,24,0.25)]">
                <img
                  src={toThumbnailUrl(story.youtubeUrl)}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2231A] shadow-lg">
                    <Play className="ml-1 text-white" size={28} />
                  </div>
                </div>
                {story.duration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                    {story.duration}
                  </span>
                )}
              </div>
              <div
                className={`mt-3 min-h-[72px] rounded-[18px] px-4 py-3 text-center text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#1345c3] text-white"
                    : "bg-[#e0f7d4] text-[#0d8b1f]"
                }`}
              >
                {story.title}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-4 w-72" aria-hidden="true">
        
      </div>

      {openVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative mx-4 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#0a6f1b] shadow-lg hover:bg-white"
              onClick={closeModal}
              aria-label="Close video"
            >
              <X size={22} />
            </button>
            <div className="relative w-full overflow-hidden rounded-3xl bg-black aspect-video">
              <iframe
                key={openVideo}
                src={openVideo}
                title={activeStory?.title || "Patient success story"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-none"
              />
            </div>
            {activeStory && (
              <div className="bg-white px-6 py-4 text-left">
                <p className="text-lg font-semibold text-[#0a6f1b]">
                  {activeStory.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientStories;
