"use client";

import React, { useState } from "react";
import SessionEventViewType from "@/app/(members)/dashboard/sessions-events/_components/session-events-header/View";
import { EventSessionInput } from "@/app/(members)/dashboard/sessions-events/_components/session-events-header/SessionEventsHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setSearch } from "@/lib/features/slices/events";
import { useGetAllEventsQuery } from "@/lib/features/api";

import EventsList from "@/app/(members)/dashboard/sessions-events/_components/session-events-main/EventsList";
import EventTable from "@/app/(members)/dashboard/sessions-events/_components/session-events-main/EventsTable";
import AddEventPopup from "./modals/add-event";

export default function EventAdministrations() {
  const [view, setView] = useState("table");
  const { limit, page, search, sort } = useSelector(
    (state: RootState) => state.pagination
  );

  const dispatch = useDispatch();
  const input = useSelector((state: RootState) => state?.pagination.search);

  const { data: eventsData, isLoading: eventsLoading } = useGetAllEventsQuery({
    page,
    limit,
    sort,
    search,
  });

  console.log(eventsData);

  return (
    <div className="size-full flex flex-col">
      <div className="w-full h-[20%]">
        <div className="w-full h-[50%] flex items-center justify-between">
          <SessionEventViewType view={view} setView={setView} />
        </div>

        <div className="w-full flex items-center justify-between">
          <EventSessionInput
            type="event"
            inputValue={input}
            setInputValue={(val: string) => dispatch(setSearch(val))}
          />

          <AddEventPopup />
        </div>
      </div>

      <div className="w-full h-[80%]">
        {view === "list" && (
          <EventsList
            data={eventsData?.data}
            total={eventsData?.meta?.total}
            loading={eventsLoading}
          />
        )}

        {view === "table" && (
          <EventTable
            right={true}
            data={eventsData?.data}
            total={eventsData?.meta?.total}
            loading={eventsLoading}
          />
        )}
      </div>
    </div>
  );
}
