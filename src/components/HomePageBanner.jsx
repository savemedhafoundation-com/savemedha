import React, { useEffect, useMemo, useRef, useState } from "react";
import People from "../assets/Photo/bannerHomepage.png";

const DotPattern = () => (
  <div
    style={{
      display: "flex",
      gap: "4px",
      paddingLeft: "0px",
      top: "12px",
    }}
  >
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        {[...Array(6)].map((_, j) => (
          <div
            key={j}
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              backgroundColor: "#74C425",
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

const DefaultHeroContent = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative z-10 w-full pt-10 sm:pt-12 md:pt-16 text-center md:text-left flex flex-col justify-start">
      <div className="hidden md:block absolute top-4 left-25 opacity-60">
        <DotPattern />
      </div>

      <div className="w-full px-4 sm:px-6 md:px-25">
        <div className="inline-block bg-[#74C425] px-4 py-1.5 sm:px-6 sm:py-2 md:px-[25px] md:py-[5px] text-white rounded-sm mb-4 sm:mb-6 font-bold-250px italic uppercase tracking-wide text-base sm:text-lg md:text-[25px] ">
          Natural Immunotherapy
        </div>

        <h1 className="font-serif font-extrabold text-black leading-tight text-[32px] sm:text-[42px] md:text-[57px]">
          Empowering lives,
        </h1>
        <h2 className="font-serif font-extrabold text-[#74C425] leading-tight text-[28px] sm:text-[40px] md:text-[55px] mb-3 sm:mb-4">
          Saving futures
        </h2>

        <p className="font-sans text-[14px] sm:text-[16px] md:text-[20px] font-semibold mb-4 sm:mb-6">
          Fighting to make a{" "}
          <span className="text-blue-600 font-bold text-[14px] sm:text-[16px] md:text-[20px]">
            CANCER FREE WORLD
          </span>
        </p>

        <a
          href="https://nit.care/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`bg-[#74C425] hover:bg-[#1118A6] cursor-pointer text-white px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 font-medium OpenSans text-base sm:text-lg md:text-xl tracking-wide rounded-sm transition-transform duration-500 ${
            isHovered ? "shadow-lg" : "shadow-md"
          }`}
        >
          DISCOVER
        </a>
      </div>
    </div>
  );
};

export default function HeroBanner({
  backgroundImages,
  imageAlt = "Banner image",
  showDefaultContent = true,
  showArrows = true,
  imageMap,
  containerClassName,
  className = "",
  overlayStyle,
  overlayClassName = "",
  children,
}) {
  const images = useMemo(() => {
    if (Array.isArray(backgroundImages) && backgroundImages.length > 0) {
      return backgroundImages;
    }
    return [People];
  }, [backgroundImages]);

  const [activeIndex, setActiveIndex] = useState(0);
  const imgRef = useRef(null);
  const [scaledMapAreas, setScaledMapAreas] = useState([]);
  const mapName = useMemo(() => {
    if (imageMap?.name) return imageMap.name;
    return `banner-map-${Math.random().toString(36).slice(2)}`;
  }, [imageMap?.name]);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (!imageMap?.areasByIndex?.length) {
      setScaledMapAreas([]);
      return;
    }

    const imgEl = imgRef.current;
    if (!imgEl) return;

    let frame = 0;

    const fit = imageMap.fit || "cover";
    const currentAreas = imageMap.areasByIndex?.[activeIndex] || [];

    const compute = () => {
      const naturalWidth = imgEl.naturalWidth || 0;
      const naturalHeight = imgEl.naturalHeight || 0;
      const boxWidth = imgEl.clientWidth || 0;
      const boxHeight = imgEl.clientHeight || 0;

      if (!naturalWidth || !naturalHeight || !boxWidth || !boxHeight) {
        setScaledMapAreas([]);
        return;
      }

      const scale =
        fit === "contain"
          ? Math.min(boxWidth / naturalWidth, boxHeight / naturalHeight)
          : Math.max(boxWidth / naturalWidth, boxHeight / naturalHeight);

      const renderedWidth = naturalWidth * scale;
      const renderedHeight = naturalHeight * scale;

      const offsetX = (renderedWidth - boxWidth) / 2;
      const offsetY = (renderedHeight - boxHeight) / 2;

      const next = currentAreas
        .map((area) => {
          if (!area?.rect || area.rect.length !== 4) return null;

          const [rx1, ry1, rx2, ry2] = area.rect;
          const x1 = rx1 * naturalWidth * scale - offsetX;
          const y1 = ry1 * naturalHeight * scale - offsetY;
          const x2 = rx2 * naturalWidth * scale - offsetX;
          const y2 = ry2 * naturalHeight * scale - offsetY;

          const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

          const coords = [
            Math.round(clamp(Math.min(x1, x2), 0, boxWidth)),
            Math.round(clamp(Math.min(y1, y2), 0, boxHeight)),
            Math.round(clamp(Math.max(x1, x2), 0, boxWidth)),
            Math.round(clamp(Math.max(y1, y2), 0, boxHeight)),
          ].join(",");

          const left = Math.round(clamp(Math.min(x1, x2), 0, boxWidth));
          const top = Math.round(clamp(Math.min(y1, y2), 0, boxHeight));
          const right = Math.round(clamp(Math.max(x1, x2), 0, boxWidth));
          const bottom = Math.round(clamp(Math.max(y1, y2), 0, boxHeight));

          return {
            href: area.href,
            alt: area.alt || "Donate now",
            title: area.title,
            target: area.target,
            rel: area.rel,
            coords,
            box: { left, top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) },
          };
        })
        .filter(Boolean);

      setScaledMapAreas(next);
    };

    const scheduleCompute = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };

    scheduleCompute();
    window.addEventListener("resize", scheduleCompute);
    imgEl.addEventListener("load", scheduleCompute);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleCompute);
      imgEl.removeEventListener("load", scheduleCompute);
    };
  }, [activeIndex, imageMap]);

  const hasMultipleImages = images.length > 1;
  const shouldShowArrows = showArrows && hasMultipleImages;

  const content =
    typeof children === "function"
      ? children({ activeIndex, total: images.length })
      : children !== undefined
        ? children
        : showDefaultContent
          ? <DefaultHeroContent />
          : null;

  const shouldRenderDefaultSpacer = children === undefined && showDefaultContent;

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  const heightClassName =
    containerClassName ?? "min-h-[420px] sm:min-h-[520px] md:min-h-[620px]";

  return (
    <div
      className={`relative flex flex-row w-full h-full ${heightClassName} ${className}`}
    >
      <img
        src={images[activeIndex]}
        alt={`${imageAlt} ${activeIndex + 1}`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
        ref={imgRef}
        useMap={scaledMapAreas.length ? `#${mapName}` : undefined}
      />

      {scaledMapAreas.length ? (
        <map name={mapName}>
          {scaledMapAreas.map((area) => (
            <area
              key={`${area.href}-${area.coords}`}
              shape="rect"
              coords={area.coords}
              href={area.href}
              alt={area.alt}
              title={area.title}
              target={area.target}
              rel={area.rel}
            />
          ))}
        </map>
      ) : null}

      {scaledMapAreas.length ? (
        <div className="absolute inset-0 z-10" aria-hidden="true">
          {scaledMapAreas.map((area) => (
            <a
              key={`${area.href}-${area.coords}-overlay`}
              href={area.href}
              target={area.target}
              rel={area.rel}
              aria-label={area.alt}
              title={area.title}
              className="absolute cursor-pointer"
              style={{
                left: area.box.left,
                top: area.box.top,
                width: area.box.width,
                height: area.box.height,
              }}
            />
          ))}
        </div>
      ) : null}

      <div
        className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
        style={overlayStyle}
        aria-hidden="true"
      />

      {shouldShowArrows ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-2xl font-bold text-slate-900 shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#74C425]"
            aria-label="Previous banner image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-2xl font-bold text-slate-900 shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#74C425]"
            aria-label="Next banner image"
          >
            ›
          </button>
        </>
      ) : null}

      {content}

      {shouldRenderDefaultSpacer ? <div className="flex-1" /> : null}
    </div>
  );
}
