/*  react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { StatusCard } from "../_components/StatusCard";
import { EventList } from "../_components/EventList";
import { UpcomingEvent } from "../_components/UpcomingEvent";
import { statusCardData } from "@/contents/dashboard/statusCard";

export default function DashboardHome() {
  return (
    <div className="p-6 space-y-8 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here&apos;s a summary of your organization&apos;s activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <UpcomingEvent />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statusCardData.map((card, index) => (
              <StatusCard key={index} {...card} />
            ))}
          </div>
        </div>

        <div className="border rounded-xl bg-card p-5 h-fit">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-lg">Event Schedule</h2>
              <p className="text-xs text-muted-foreground">Your upcoming activities</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">
              View All
            </button>
          </div>
          <EventList />
        </div>
      </div>
    </div>
  );
}
