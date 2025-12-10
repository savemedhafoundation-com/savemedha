import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const patientStories = [
  {
    id: 1,
    title: "Discussion with Tanjila after full cure from Blood Cancer",
    youtubeUrl: "https://youtu.be/BvBIVuhY3uc?si=s3gDfzzD42Qia1Vg",
    duration: "05:12",
    description:
      "Hear how Natural Immunotherapy helped Tanjila recover and regain strength.",
  },
  {
    id: 4,
    title:
      "After defeating cancer, Mainul is now healthy and living a normal life",
    youtubeUrl: "https://youtu.be/ld62F0ZhwY0?si=H3PqIt922Bx1pmAT",
    duration: "02:58",
    description:
      "Mainul shares his journey to wellness and a return to everyday life.",
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

const StoryVisual = ({ story }) => (
  <div
    className="absolute left-0 top-1/2 w-[45%] h-[90%] rounded-2xl shadow-2xl overflow-hidden bg-gray-900 border-2 border-white"
    style={{
      transform:
        "translateX(-5%) translateY(-50%) translateZ(120px) rotateY(-14deg)",
      transformStyle: "preserve-3d",
      zIndex: 20,
    }}
  >
    <img
      src={toThumbnailUrl(story.youtubeUrl)}
      alt={story.title}
      className="h-full w-full object-cover"
      style={{
        transform: "translateZ(40px) scale(1.05)",
        transformStyle: "preserve-3d",
      }}
    />

    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

    <div
      className="pointer-events-none absolute bottom-6 left-6 text-white"
      style={{ transform: "translateZ(80px)" }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">
        Featured Story
      </p>
      <h3 className="text-xl font-bold leading-tight mt-1">{story.title}</h3>
    </div>
  </div>
);

const PatientStories = () => {
  const scrollerRef = useRef(null);
  const [activeStoryId, setActiveStoryId] = useState(patientStories[0].id);
  const [openVideo, setOpenVideo] = useState(null);

  const activeIndex = patientStories.findIndex(
    (story) => story.id === activeStoryId
  );

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
    <>
      <section
        id="patient-stories"
        className="relative w-full bg-[#FBFFF9] border border-gray-200 shadow-[5px_4px_4px_0px_#215C0740] py-16 text-center rounded-3xl overflow-hidden"
      >
        <div className="mb-12 text-center">
          <h2 className="relative inline-block text-4xl font-bold text-slate-900">
            <span className="relative">PATIENT </span>
            <div className="absolute bottom-[-10px] left-0 h-1 w-20 bg-[#74C425]" />
            <span className="text-[#74C425]">SUCCESS STORY</span>
          </h2>
        </div>

        {/* ARROWS */}
        <button
          type="button"
          onClick={() => handleArrow(-1)}
          className="hidden md:flex absolute left-8 lg:left-12 top-1/2 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#74C425] bg-white text-[#74C425] shadow-lg hover:bg-[#edfce0] z-20"
        >
          <ArrowLeft size={26} />
        </button>
        <button
          type="button"
          onClick={() => handleArrow(1)}
          className="hidden md:flex absolute right-8 lg:right-12 top-1/2 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#74C425] bg-white text-[#74C425] shadow-lg hover:bg-[#edfce0] z-20"
        >
          <ArrowRight size={26} />
        </button>

        {/* SCROLLER */}
        <div
          ref={scrollerRef}
          className="relative mx-auto flex max-w-[1500px] justify-center gap-4 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-12 pt-4"
          style={{ perspective: "2500px" }}
        >
          {patientStories.map((story, index) => {
            const isActive = story.id === activeStoryId;
            const offset = index - activeIndex;

            const rotationY = Math.max(Math.min(offset * -30, 45), -45);
            const translateX = offset * -70;
            const scale = isActive ? 1 : 0.9;
            const zIndex = isActive ? 10 : 10 - Math.abs(offset);

            return (
              <button
                key={story.id}
                type="button"
                data-story-id={story.id}
                onClick={() => openStoryModal(story)}
                className="group relative flex w-[340px] sm:w-[480px] lg:w-[580px] h-[320px] flex-shrink-0 snap-center items-center cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) rotateY(${rotationY}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  zIndex: zIndex,
                }}
              >
                <StoryVisual story={story} />

                <div
                  className="relative ml-[15%] w-[99%] h-[70%] bg-[#74C425] rounded-[30px] shadow-[0_15px_30px_rgba(33,92,7,0.3)] flex flex-col justify-center text-left text-white pl-[35%] pr-6 z-10"
                  style={{
                    transform: "translateZ(30px) rotateY(12deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <h3 className="text-3xl font-bold mb-1">
                    Video {index + 1}
                  </h3>

                  <p className="text-sm sm:text-base leading-tight opacity-95 mb-4 line-clamp-3 font-medium">
                    {story.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openStoryModal(story);
                    }}
                    className="inline-block bg-white text-[#74C425] text-[10px] sm:text-xs font-bold px-4 py-2 rounded-md uppercase tracking-wide shadow-md hover:bg-gray-100 transition w-max"
                  >
                    Watch Now
                  </button>
                </div>
              </button>
            );
          })}
        </div>

        {/* MODAL */}
        {openVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition"
                onClick={closeModal}
              >
                <X size={24} />
              </button>

              <div className="relative w-full aspect-video">
                <iframe
                  src={openVideo}
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
