import Resources from "@/app/(members)/dashboard/resources/_components/resourcse";
import React from "react";

interface IDivisionResources {
  id: string;
}

export default function DivisionResources({ id }: IDivisionResources) {
  return (
    <div className="size-full">
      <Resources look={false} show={false} divId={id} />
    </div>
  );
}
