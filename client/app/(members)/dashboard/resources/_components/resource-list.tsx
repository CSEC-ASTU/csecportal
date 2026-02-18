import { IResource } from "@/types/resource.type";
import ResourceCard from "./resource-card";
import NoResult from "@/components/no-result";

interface ResourceListProps {
  resources: IResource[];
  right?: boolean;
  total?: number;
}

const ResourceList = ({ resources, right = false }: ResourceListProps) => {
  console.log(resources);
  return (
    <div className="size-full space-y-4  overflow-y-auto pr-2">
      <div className="w-full h-[100%] flex flex-col items-center gap-2">
        {resources.length === 0 ? (
          <div className="size-full">
            <NoResult text="No resources found." />
          </div>
        ) : (
          resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} right={right} />
          ))
        )}
      </div>
    </div>
  );
};

export default ResourceList;
