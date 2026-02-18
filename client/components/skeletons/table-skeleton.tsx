import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="size-full flex flex-col">
      {/* Table Header Skeleton */}
      <div className="w-full flex border-b border-gray-200 dark:border-gray-800">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-1 px-4 py-3">
            <Skeleton className="h-4 w-[80%] mx-auto" />
          </div>
        ))}
      </div>

      {/* Table Rows Skeleton */}
      <div className="flex-1 overflow-y-auto">
        {[...Array(10)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="w-full flex border-b border-gray-200 dark:border-gray-800 py-3"
          >
            {[...Array(5)].map((_, cellIndex) => (
              <div key={cellIndex} className="flex-1 px-4">
                <Skeleton className="h-4 w-[70%] mx-auto" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Table Footer/Pagination Skeleton */}
      <div className="w-full flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-800">
        <Skeleton className="h-4 w-[100px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
