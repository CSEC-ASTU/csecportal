import React from "react";
import SessionEventViewType from "./View";
import SessionEventActions from "./Action";

interface IAdministrationHeader {
  viewType: string;
  setViewType: (val: string) => void;
}

export default function AdministrationHeader({
  setViewType,
  viewType,
}: IAdministrationHeader) {
  return (
    <div className="w-full h-[10%] flex items-center justify-between">
      <SessionEventViewType view={viewType} setView={setViewType} />
      <SessionEventActions view={viewType} />
    </div>
  );
}
