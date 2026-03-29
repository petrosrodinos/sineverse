import { Skeleton } from "@heroui/skeleton";

export function ProjectPageContentSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row lg:h-full lg:min-h-0 gap-4 p-4">
      <aside className="w-full lg:w-72 max-h-[300px] lg:max-h-none shrink-0 flex flex-col gap-4 rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
        <div className="flex-1 overflow-hidden space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-3 space-y-2">
              <Skeleton className="h-4 w-14 rounded-lg" />
              <Skeleton className="h-5 w-4/5 rounded-lg mt-2" />
              <Skeleton className="h-4 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col gap-4 lg:overflow-auto">
        <div className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4 lg:p-6 shrink-0 space-y-4">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>
        <div className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4 lg:p-6 flex-1 flex flex-col gap-4 min-h-[200px]">
          <Skeleton className="h-5 w-40 rounded-lg" />
          <Skeleton className="w-full aspect-video rounded-xl" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
