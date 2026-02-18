import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton() {
  return (
    <div className="size-full flex flex-col">
      {/* List Header Skeleton */}
      <div className="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <Skeleton className="h-6 w-[200px]" />
      </div>

      {/* List Items Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-full flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
            <Skeleton className="h-4 w-4" />
          </div>
        ))}
      </div>

      {/* List Footer Skeleton */}
      <div className="w-full px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex justify-end">
        <Skeleton className="h-8 w-[120px] rounded-md" />
      </div>
    </div>
  );
}
