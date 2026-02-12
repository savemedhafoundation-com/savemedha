import { useEffect, useState } from "react";
import SkeletonBox from "./SkeletonBox";

// Smart image wrapper: shows skeleton until fully loaded, then fades image in.
export default function SmartImage({
  src,
  alt,
  containerClassName = "",
  imgClassName = "",
  skeletonRoundedClassName = "rounded-xl",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  fallbackSrc,
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const shouldShowSkeleton = !isLoaded || hasError;

  useEffect(() => {
    setImageSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {shouldShowSkeleton ? (
        <SkeletonBox
          className="absolute inset-0 h-full w-full"
          roundedClassName={skeletonRoundedClassName}
        />
      ) : null}

      {/* Keep element dimensions stable to avoid CLS while loading */}
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (fallbackSrc && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(false);
            setIsLoaded(false);
            return;
          }
          setHasError(true);
          setIsLoaded(false);
        }}
        className={`${imgClassName} transition-opacity duration-300 ease-out ${
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
