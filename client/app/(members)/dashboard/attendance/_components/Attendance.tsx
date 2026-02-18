"use client";

import { useGetHeadSessionsQuery } from "@/lib/features/api";
import React from "react";
import AttendanceOverviewCard from "./attendanc-overview-card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Attendance() {
  const { data: headSession, isLoading: sessionLoading } =
    useGetHeadSessionsQuery();

  return (
    <div className="size-full flex  flex-col items-start justify-between">
      <div className="w-full h-full overflow-y-auto">
        <AttendanceOverviewCard
          data={headSession || []}
          loading={sessionLoading}
        />
      </div>
    </div>
  );
}
