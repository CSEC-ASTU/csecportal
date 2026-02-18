import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="size-full flex flex-col items-center justify-between">
      <Skeleton className="w-full h-[85%] rounded-xl" />
      <Skeleton className="w-full h-[7%]" />
      <Skeleton className="w-full h-[7%]" />
    </div>
  );
}
