import React, { useEffect, useState } from "react";

const YOUTUBE_VIDEO_ASPECT_RATIO = 16 / 9;

const getYouTubeVideoId = (url) => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] || null;
    }

    if (
      hostname.endsWith("youtube.com") ||
      hostname.endsWith("youtube-nocookie.com")
    ) {
      if (parsed.pathname === "/watch") return parsed.searchParams.get("v");

      const match = parsed.pathname.match(
        /^\/(?:embed|v|shorts)\/([a-zA-Z0-9_-]{6,})/
      );
      if (match) return match[1];
    }
  } catch {
    // Ignore URL parsing errors and fall back to regex parsing.
  }

  const fallback = String(url).match(
    /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([a-zA-Z0-9_-]{6,})/
  );
  return fallback?.[1] ?? null;
};

const getYouTubeEmbedUrl = (videoId) => {
  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    playsinline: "1",
    loop: "1",
    playlist: videoId,
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

/**
 * TreatmentBanner renders a hero-style banner with either an image or video background.
 * Use mediaType="video" for videos; defaults to image. Call-to-action is optional.
 */
export default function TreatmentBanner({
  title = "how natural immunotherapy method works on your body",
  subtitle = "Understand how toxic load, chronic inflammation, and weak immunity can block recovery — and how natural immunotherapy can support your body's own defense.",
  mediaSrc = "https://images.unsplash.com/photo-1582719478248-54e9f2c9a6b4?auto=format&fit=crop&w=1600&q=80",
  mediaType = "image",
  onCtaClick,
  ctaLabel,
  heightClass = "h-[260px] sm:h-[360px] md:h-[420px]",
  titleColor = "#ffffff",
}) {
  const isVideo = mediaType === "video";
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [showText, setShowText] = useState(true);
  const youtubeVideoId = isVideo ? getYouTubeVideoId(mediaSrc) : null;
  const youtubeEmbedUrl = youtubeVideoId
    ? getYouTubeEmbedUrl(youtubeVideoId)
    : null;

  useEffect(() => {
    setTypedTitle("");
    setTypedSubtitle("");
    setShowText(true);

    let titleIndex = 0;
    let subtitleIndex = 0;
    let titleTimer;
    let subtitleTimer;
    let hideTimer;

    const startSubtitle = () => {
      subtitleTimer = setInterval(() => {
        subtitleIndex += 1;
        setTypedSubtitle(subtitle.slice(0, subtitleIndex));
        if (subtitleIndex >= subtitle.length) {
          clearInterval(subtitleTimer);
        }
      }, 18);
    };

    titleTimer = setInterval(() => {
      titleIndex += 1;
      setTypedTitle(title.slice(0, titleIndex));
      if (titleIndex >= title.length) {
        clearInterval(titleTimer);
        setTimeout(startSubtitle, 150);
      }
    }, 24);

    hideTimer = setTimeout(() => setShowText(false), 10000);

    return () => {
      clearInterval(titleTimer);
      clearInterval(subtitleTimer);
      clearTimeout(hideTimer);
    };
  }, [title, subtitle]);

  return (
    <section className="relative">
      <div className={`relative bg-center bg-cover ${heightClass}`}>
        {!isVideo ? (
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url('${mediaSrc}')` }}
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {youtubeEmbedUrl && (
              <iframe
                title="Treatment banner video"
                src={youtubeEmbedUrl}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] w-[100vw] -translate-x-1/2 -translate-y-1/2"
                style={{
                  minWidth: "100%",
                  minHeight: "100%",
                  aspectRatio: String(YOUTUBE_VIDEO_ASPECT_RATIO),
                }}
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#5ad638]/40 via-black/35 to-[#3bb7ff]/30" />
        <div className="relative max-w-6xl mx-auto h-full flex flex-col items-center justify-center text-center px-4">
          {showText && (
            <>
              <h1
                className="text-6xl w-[850px] sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg mb-3 uppercase tracking-tight"
                style={{
                  color: titleColor,
                  WebkitTextStrokeColor: "transparent",
                }}
              >
                {typedTitle || title}
              </h1>
              <p className="text-sm w-[700px] sm:text-base text-gray-100 max-w-3xl leading-relaxed">
                {typedSubtitle || subtitle}
              </p>
            </>
          )}

          {ctaLabel && (
            <button
              type="button"
              onClick={onCtaClick}
              className="mt-5 inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-[#5cb624] font-semibold text-sm shadow hover:bg-green-50 transition"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
