"use client";
import React, { useState } from "react";
import AdministrationHeader from "./administrationHead/AdministrationHeader";
import AdministrationMain from "./administrationMain/AdministrationMain";

export default function Administration() {
  const [view, setView] = useState("heads");

  return (
    <div className="size-full flex flex-col bg-yello-200">
      <AdministrationHeader
        setViewType={setView}
        viewType={view}
      />
      <AdministrationMain view={view} />
    </div>
  );
}
