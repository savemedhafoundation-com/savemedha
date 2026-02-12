// Reusable single skeleton block with a soft shimmer.
export default function SkeletonBox({
  className = "",
  roundedClassName = "rounded-xl",
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-slate-200/80 ${roundedClassName} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-skeleton-shimmer" />
    </div>
  );
}
