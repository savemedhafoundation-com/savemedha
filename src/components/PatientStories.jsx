import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
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
    id: 2,
    title:
      "After defeating cancer, Mainul is now healthy and living a normal life",
    youtubeUrl: "https://youtu.be/ld62F0ZhwY0?si=H3PqIt922Bx1pmAT",
    duration: "02:58",
    description:
      "Mainul shares his journey to wellness and a return to everyday life.",
  },
   {id: 3,
    title:
      "Prostate & Rectum Cancer Recovery at 65",
    youtubeUrl: "https://youtu.be/ekq3OG9gWGc?si=QJcLxc1Psx36qFl0",
    duration: "13:25",
    description:
      "Mainul shares his journey to wellness and a return to everyday life.",
  },
   {id: 4,
    title:
      "Natural Immunotherapy Saved My Life | Gallbladder Cancer Patient Testimonial | Fully Recovered",
    youtubeUrl: "https://youtu.be/i16mOr1a4ic?si=tDMFJivcbidmjjcF",
    duration: "13:25",
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

const PatientStories = () => {
  const ringRef = useRef(null);
  const itemRefs = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);

  const currentVideoUrl =
    openIndex !== null ? toEmbedUrl(patientStories[openIndex].youtubeUrl) : null;

  const rotateRing = (direction = 1) => {
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
  }, []);

  return (
    <>
      <section
        id="patient-stories"
        className="relative w-full bg-[#FBFFF9] shadow-[5px_4px_4px_0px_#215C0740] py-16 text-center rounded-3xl  overflow-hidden"
      >
        <div className="mb-10 text-center ">
          <h2 className="relative inline-block text-4xl mb-25  font-bold text-slate-900">
            <span className="relative">PATIENT </span>
            <div className="absolute bottom-[-10px] left-0 h-1 w-20 bg-[#74C425]" />
            <span className="text-[#74C425]">SUCCESS STORY</span>
          </h2>
          <p className=" text-sm -translate-y-20 text-slate-600">
            Drag the carousel to explore stories in 3D, then tap to watch.
          </p>
        </div>

        <div className="relative mx-auto flex items-center justify-center px-4 pb-20">
          <button
            type="button"
            aria-label="Previous story"
            className="absolute left-2 md:left-10 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#215C07] shadow-lg ring-1 ring-[#215C07]/30 transition hover:bg-[#f2f8ec] cursor-pointer"
            onClick={() => rotateRing(1)}
          >
            <ArrowLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next story"
            className="absolute right-2 md:right-10 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#215C07] shadow-lg ring-1 ring-[#215C07]/30 transition hover:bg-[#f2f8ec]  cursor-pointer "
            onClick={() => rotateRing(-1)}
          >
            <ArrowRight size={22} />
          </button>

          <div
            className="relative h-[260px] w-full max-w-[540px]"
            style={{ perspective: "1200px" }}
          >
            <div
              ref={ringRef}
              className="mt-30"
              style={{ transformStyle: "preserve-3d" }}
            >
              {patientStories.map((story, index) => (
                <div
                  key={story.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="absolute left-1/2 top-1/2 h-[220px] w-[360px] md:h-[280px] md:w-[480px] -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-2xl"
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
                  <div className="relative right-26 bottom-45 h-[350px] w-[700px] overflow-visible rounded-2xl bg-[#0f172a] shadow-2xl">
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
                      className="pointer-events-auto absolute left-1/2 bottom-[-90px] z-30 inline-flex items-center gap-2 -translate-x-1/2 rounded-full bg-[#74C425] px-4 py-2 text-[25px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_25px_rgba(33,92,7,0.35)]  transition hover:bg-[#5ea01d]"
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
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
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
