import { Resource } from "@/data/users.data";
import { ExternalLink } from "lucide-react";
import React from "react";

interface IProfileResource {
  data: Resource[];
}

export default function ProfileResourses({ data }: IProfileResource) {
  return (
    <section className="size-full flex flex-col">
      <div className="w-full h-[10%] flex items-center">
        <p className="text-base font-bold w-[50%] tracking-[1px] text-text2">
          Resource Name
        </p>
        <p className="text-base font-bold w-[50%] tracking-[1px] text-text2">
          Resource Link
        </p>
      </div>

      <div className="w-full h-[90%] overflow-y-auto flex flex-col gap-2">
        {data.map((el, index) => {
          return (
            <div
              key={index}
              className="w-full h-[10%] flex items-center relative"
            >
              <p className="text-base font-bold w-1/2 tracking-[1px]">
                {el.resourceName}
              </p>
              <p className="text-base font-bold w-1/2 tracking-[1px]">
                {el.resourceLink}
              </p>

              <ExternalLink className="size-4 absolute top-1/2 -translate-y-1/2 right-4" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
