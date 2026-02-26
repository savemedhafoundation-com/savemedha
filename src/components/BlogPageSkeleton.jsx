import { memo, useMemo } from "react";
import SkeletonBlogCard from "./SkeletonBlogCard";

/**
 * @param {{
 *   count?: number,
 *   className?: string,
 *   showImage?: boolean,
 * }} props
 */
// Renders a responsive skeleton grid for the blog list page.
function BlogPageSkeleton({
  count = 8,
  className = "",
  showImage = true,
}) {
  const skeletons = useMemo(() => {
    const safeCount = Math.max(1, Math.floor(count));
    return Array.from({ length: safeCount }, (_, index) => (
      <SkeletonBlogCard key={`blog-skeleton-${index}`} showImage={showImage} />
    ));
  }, [count, showImage]);

  return (
    <section aria-label="Loading blog posts" className={className}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skeletons}
      </div>
    </section>
  );
}

export default memo(BlogPageSkeleton);
