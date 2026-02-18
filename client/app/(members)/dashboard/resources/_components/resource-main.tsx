"use client";

import {
  useGetAllResourcesQuery,
  useGetResourcesByDivisionQuery,
} from "@/lib/features/api";
import ResourceList from "./resource-list";
import { Skeleton } from "@/components/ui/skeleton";

interface IResourceMain {
  id: string;
  look: boolean;
}

const ResourceMain = ({ id, look }: IResourceMain) => {
  const { data: resourceData, isLoading: resourceLoading } =
    useGetResourcesByDivisionQuery(id);

  const { data: allResources, isLoading: resourcesLoading } =
    useGetAllResourcesQuery();

  const isLoading = id === "all" ? resourcesLoading : resourceLoading;
  const resources = id === "all" ? allResources?.data : resourceData?.data;
  const total =
    id === "all" ? allResources?.meta?.total : resourceData?.meta?.total;

  if (isLoading) {
    return (
      <div className="size-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-4/5 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="size-full">
      <ResourceList resources={resources || []} right={look} total={total} />
    </div>
  );
};

export default ResourceMain;
