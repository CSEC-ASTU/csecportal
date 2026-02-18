"use client";

import React from "react";
import { IEvent } from "@/types/events";
import PaginationTable from "@/components/PaginationTable";
import { useDispatch, useSelector } from "react-redux";
import { setLimit, setPage } from "@/lib/features/slices/events";
import { RootState } from "@/lib/features/store";
import { MapPin, Clock, Calendar as CalendarIcon, ChevronRight } from "lucide-react";

export default function EventsList({ data, loading, total }: any) {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: RootState) => state.pagination);

  if (loading) return <div className="p-10 text-center text-text2">Loading events...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {data?.map((event: IEvent) => (
          <EventListItem key={event.id} event={event} />
        ))}
      </div>

      <div className="pt-4 border-t mt-4">
        <PaginationTable
          page={page}
          setPage={(p) => dispatch(setPage(p))}
          pageSize={limit}
          setPageSize={(l) => dispatch(setLimit(l))}
          total={total}
        />
      </div>
    </div>
  );
}

const EventListItem = ({ event }: { event: IEvent }) => {
  const isPassed = new Date() > new Date(event.endDate);

  return (
    <div className="group relative  border rounded-xl p-3  transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${
              isPassed ? " text-green-500" : "bg-primary/10 text-red-500"
            }`}>
              {isPassed ? "Past" : event.status}
            </span>
            <h3 className="font-bold text-text1 text-lg  transition-colors">
              {event.title}
            </h3>
          </div>

          <p className="text-text2 text-sm line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2">
            <div className="flex items-center text-xs text-text2 font-medium">
              <CalendarIcon className="w-3.5 h-3.5 mr-2 text-primary/60" />
              {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
            </div>
            <div className="flex items-center text-xs text-text2 font-medium">
              <Clock className="w-3.5 h-3.5 mr-2 text-primary/60" />
              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center text-xs text-text2 font-medium">
              <MapPin className="w-3.5 h-3.5 mr-2 text-primary/60" />
              {event.location}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
           <div className="h-10 w-10 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-text2">
              <ChevronRight className="w-5 h-5" />
           </div>
        </div>
      </div>
    </div>
  );
};
