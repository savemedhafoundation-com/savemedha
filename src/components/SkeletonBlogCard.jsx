import SkeletonBox from "./SkeletonBox";

// YouTube-style blog card placeholder.
export default function SkeletonBlogCard({ showMeta = true, showImage = true }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* 16:9 thumbnail placeholder to prevent layout shift */}
      {showImage ? <SkeletonBox className="w-full aspect-video" /> : null}

      <div className={`${showImage ? "mt-4" : "mt-1"} space-y-3`}>
        {/* Title line */}
        <SkeletonBox className="h-6 w-11/12" />

        {/* Excerpt lines */}
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-4/5" />

        {/* Optional author/date row */}
        {showMeta ? <SkeletonBox className="h-3 w-2/5 mt-1" /> : null}
      </div>
    </article>
  );
}
