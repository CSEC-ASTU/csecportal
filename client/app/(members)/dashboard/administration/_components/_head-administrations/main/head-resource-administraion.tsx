"use client";

import Resources from "@/app/(members)/dashboard/resources/_components/resourcse";
import { RootState } from "@/lib/features/store";
import React from "react";
import { useSelector } from "react-redux";

export default function HeadResourcesAdministration() {
  const divisionId = useSelector(
    (state: RootState) => state?.auth.user.divisionId
  );
  return (
    <div className="size-full">
      <Resources look={true} show={false} divId={divisionId} />
    </div>
  );
}
