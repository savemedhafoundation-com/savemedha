import SkeletonBox from "./SkeletonBox";

export default function PageShellSkeleton() {
  return (
    <div
      aria-label="Loading page"
      className="min-h-screen bg-white text-slate-900"
    >
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            <SkeletonBox className="h-12 w-40" roundedClassName="rounded-2xl" />
            <div className="hidden items-center gap-3 lg:flex">
              <SkeletonBox className="h-10 w-48" roundedClassName="rounded-full" />
              <SkeletonBox className="h-10 w-32" roundedClassName="rounded-full" />
              <SkeletonBox className="h-10 w-28" roundedClassName="rounded-full" />
            </div>
          </div>
          <div className="mt-5 hidden gap-3 lg:flex">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBox
                key={`nav-skeleton-${index}`}
                className="h-11 w-28"
                roundedClassName="rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <SkeletonBox className="h-8 w-28" roundedClassName="rounded-full" />
            <SkeletonBox className="mt-6 h-14 w-4/5" roundedClassName="rounded-2xl" />
            <SkeletonBox className="mt-4 h-5 w-full" />
            <SkeletonBox className="mt-3 h-5 w-11/12" />
            <SkeletonBox className="mt-10 h-12 w-40" roundedClassName="rounded-xl" />
          </div>
          <SkeletonBox className="min-h-[280px] w-full" roundedClassName="rounded-[28px]" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`content-skeleton-${index}`}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <SkeletonBox className="h-44 w-full" roundedClassName="rounded-2xl" />
              <SkeletonBox className="mt-5 h-4 w-20" roundedClassName="rounded-full" />
              <SkeletonBox className="mt-4 h-6 w-4/5" />
              <SkeletonBox className="mt-3 h-4 w-full" />
              <SkeletonBox className="mt-2 h-4 w-5/6" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
