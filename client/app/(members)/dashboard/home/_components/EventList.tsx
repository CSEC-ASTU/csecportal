/*   */
"use client";

import React from "react";
import { useGetAllSessionQuery } from "@/lib/features/api";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

export function EventList() {
  const { data, isLoading, isError } = useGetAllSessionQuery({
    page: 1,
    limit: 5,
    sort: "desc",
  });

  const groupedSessions = data?.data?.reduce(
    (acc: Record<string, any[]>, session: any) => {
      const dateKey = format(new Date(session.startTime), "yyyy-MM-dd");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(session);
      return acc;
    },
    {}
  );

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6 text-muted-foreground">
        <Calendar className="size-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Upcoming Sessions</span>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 w-full bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive bg-destructive/5 p-4 rounded-lg border border-destructive/10">
          Failed to load sessions.
        </p>
      )}

      <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
        {groupedSessions &&
          Object.entries(groupedSessions).map(([date, sessions]) => (
            <div key={date} className="space-y-4">
              {/* Date Header */}
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-b pb-2">
                {format(new Date(date), "MMM dd, yyyy")}
              </h3>

              <div className="space-y-6">
                {(sessions as any).map((session: any) => (
                  <div key={session.id} className="relative pl-4 group rounded-xs">
                    <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-muted group-hover:bg-primary transition-colors" />

                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                        {session.title}
                      </h4>

                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                        <Clock className="size-3" />
                        <span>
                          {format(new Date(session.startTime), "hh:mm a")} - {format(new Date(session.endTime), "hh:mm a")}
                        </span>
                      </div>

                      {session.description && (
                        <p className="text-xs text-muted-foreground/80 line-clamp-2 mt-1 italic">
                          {session.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {groupedSessions && Object.keys(groupedSessions).length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground border border-dashed rounded-xl">
            No scheduled sessions found.
          </div>
        )}
      </div>
    </div>
  );
}
