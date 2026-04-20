import { Skeleton } from "@heroui/skeleton";

export function EstateProjectPageSkeleton() {
  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-auto p-4 lg:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col gap-3 rounded-2xl border border-default-200 bg-default-100/30 p-4 dark:border-default-100/20 dark:bg-default-100/5"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-5 w-4/5 rounded-lg" />
                      <Skeleton className="h-3 w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>
          <div className="rounded-2xl border border-default-200 bg-default-100/40 p-4 shadow-sm dark:border-default-100/20 dark:bg-default-100/5 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Skeleton className="h-10 w-32 rounded-xl" />
              <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-default-200 pt-6 dark:border-default-100/20">
            <Skeleton className="h-10 w-20 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
