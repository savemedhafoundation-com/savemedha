import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import MobileBanner from '../assets/Photo/mobilebanner.png';
import HomepageHeroFrame from '../assets/homepageimage/Frame 9697.png';
import HeroEthicalBadge from '../assets/homepageimage/Group 9408.png';
import HeroHealingBadge from '../assets/homepageimage/Group 9737.png';

const HOME_BANNER_URL =
  "https://res.cloudinary.com/savemedha/image/upload/f_auto,q_auto,w_1920/v1770891682/homepagebannner_nwnzig_aelxxh.jpg";

const DefaultHeroContent = () => {
  return (
    <>
      <div className="absolute left-[15.5%] top-[13%] z-30 hidden w-[35%] max-w-[610px] font-poppins text-white sm:block">
        <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 text-[16px] font-bold leading-none text-[#159b17] shadow-[0_10px_22px_rgba(0,0,0,0.18)]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#57be2d]" />
          Natural Immunotherapy
        </div>

        <h1 className="mt-7 max-w-[520px] text-[56px] font-black leading-[1.22] tracking-normal text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)]">
          Empowering lives,
          <span className="block">Saving futures</span>
        </h1>

        <p className="mt-7 max-w-[520px] text-[27px] font-semibold leading-[1.22] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          Fighting to make a <span className="font-black text-[#20f11d]">CANCER FREE</span>
          <span className="block font-black text-[#20f11d]">WORLD</span>
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-7 text-[11px] font-semibold text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]">
          {["No Chemotherapy", "No Surgery Needed", "Zero Radiation"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black leading-none text-[#159b17]">
                ✓
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <a
        href="https://nit.care/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discover Natural Immunotherapy"
        className="home-hero-discover-button absolute left-[15.5%] bottom-[20%] z-30 inline-flex min-h-[55px] min-w-[171px] items-center justify-center rounded-[13px] bg-white px-[47px] py-[17px] font-poppins text-[20px] font-bold leading-none text-[#159b17] shadow-[0_12px_26px_rgba(0,0,0,0.24)] transition duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-[#189802]"
      >
        Discover
      </a>
    </>
  );
};

export default function HeroBanner({
  backgroundImages,
  imageAlt = "Banner image",
  showDefaultContent = true,
  showArrows = true,
  autoAdvanceMs = 0,
  imageMap,
  containerClassName,
  className = "",
  showShadows = true,
  overlayStyle,
  overlayClassName = "",
  children,
}) {
  const images = useMemo(() => {
    if (Array.isArray(backgroundImages) && backgroundImages.length > 0) {
      return backgroundImages;
    }
    return [HOME_BANNER_URL];
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
    if (!autoAdvanceMs || images.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, autoAdvanceMs);

    return () => window.clearInterval(intervalId);
  }, [autoAdvanceMs, images.length]);

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
  const shouldUseMobileFallbackImage =
    !imageMap && (!Array.isArray(backgroundImages) || backgroundImages.length === 0);
  const isDefaultHomepageHero =
    shouldUseMobileFallbackImage && showDefaultContent && children === undefined;

  const content =
    typeof children === "function"
      ? children({ activeIndex, total: images.length })
      : children !== undefined
        ? children
        : showDefaultContent
          ? <DefaultHeroContent showShadows={showShadows} />
          : null;

  const shouldRenderDefaultSpacer = children === undefined && showDefaultContent && !isDefaultHomepageHero;

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  // Tablet gets its own intermediate height between sm and lg
  const heightClassName =
    containerClassName ?? "min-h-[420px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[750px]";

  return (
    <div
      className={`relative flex flex-row w-full h-full overflow-hidden ${heightClassName} ${className}`}
    >
      {isDefaultHomepageHero ? (
        <>
          <img
            src={HomepageHeroFrame}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          <img
            src={HeroHealingBadge}
            alt="Healing Active, Restored Immunity"
            className="home-hero-badge-float-up absolute right-[10.5%] top-[13%] z-20 hidden w-[17.25%] min-w-[124px] max-w-[196px] sm:block"
            loading="eager"
          />
          <img
            src={HeroEthicalBadge}
            alt="Verified Ethical Practice"
            className="home-hero-badge-float-down absolute bottom-[16%] left-[50.8%] z-20 hidden w-[17.25%] min-w-[124px] max-w-[196px] sm:block"
            loading="eager"
          />
        </>
      ) : shouldUseMobileFallbackImage ? (
        <>
          {/* Phone: dedicated portrait crop — hidden at sm and above */}
          <img
            src={MobileBanner}
            alt={`${imageAlt} mobile`}
            className="absolute inset-0 h-full w-full object-contain object-bottom sm:hidden"
            loading="eager"
            fetchPriority="high"
          />

          {/*
            Tablet (sm–lg): show the banner image but shift the focal point
            further right so the main subject isn't obscured by the hero text.
            Desktop (lg+): original crop — object-[80%_center].
          */}
          <img
            src={images[activeIndex]}
            alt={`${imageAlt} ${activeIndex + 1}`}
            className="absolute inset-0 hidden h-full w-full object-cover sm:block sm:w-[112%] sm:origin-right sm:object-[70%_center] lg:w-full lg:object-[80%_center]"
            loading="eager"
            fetchPriority="high"
            ref={imgRef}
            useMap={scaledMapAreas.length ? `#${mapName}` : undefined}
          />
        </>
      ) : (
        <img
          src={images[activeIndex]}
          alt={`${imageAlt} ${activeIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          ref={imgRef}
          useMap={scaledMapAreas.length ? `#${mapName}` : undefined}
        />
      )}

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
            className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-2xl font-bold text-slate-900 ${
              showShadows ? "shadow-md" : ""
            } transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#74C425]`}
            aria-label="Previous banner image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-2xl font-bold text-slate-900 ${
              showShadows ? "shadow-md" : ""
            } transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#74C425]`}
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
