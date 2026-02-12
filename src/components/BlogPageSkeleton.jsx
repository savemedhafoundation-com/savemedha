import SkeletonBlogCard from "./SkeletonBlogCard";

// Renders a responsive skeleton grid for the blog list page.
export default function BlogPageSkeleton({
  count = 8,
  className = "",
  showImage = true,
}) {
  return (
    <section aria-label="Loading blog posts" className={className}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonBlogCard key={`blog-skeleton-${index}`} showImage={showImage} />
        ))}
      </div>
    </section>
  );
}
