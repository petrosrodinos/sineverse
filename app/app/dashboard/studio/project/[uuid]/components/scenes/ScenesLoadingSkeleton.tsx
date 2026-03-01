import { Skeleton } from "@heroui/skeleton";

export function ScenesLoadingSkeleton() {
  return (
    <aside className="w-72 shrink-0 flex flex-col gap-4 rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <div className="flex-1 overflow-auto space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-default-200 bg-default-100 dark:border-default-100/20 dark:bg-default-100/5 p-3 space-y-2">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-5 w-3/4 rounded-lg mt-2" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-5/6 rounded-lg" />
          </div>
        ))}
      </div>
    </aside>
  );
}
