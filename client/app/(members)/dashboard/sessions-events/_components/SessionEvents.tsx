"use client";
import React, { useState } from "react";
import SessionEventsHeader from "./session-events-header/SessionEventsHeader";
import SessionEventsMain from "./session-events-main/SessionEventsMain";

export default function SessionEvents() {
  const [type, setType] = useState<"event" | "session">("event");
  const [view, setView] = useState("list");

  return (
    <div className="size-full flex flex-col gap-5">
      <SessionEventsHeader
        setType={setType}
        setViewType={setView}
        type={type}
        viewType={view}
      />
      <SessionEventsMain type={type} view={view} />
    </div>
  );
}
