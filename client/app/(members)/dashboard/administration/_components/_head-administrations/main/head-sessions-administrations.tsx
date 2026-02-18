"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setSearch } from "@/lib/features/slices/events";
import { useGetAllSessionQuery } from "@/lib/features/api";

import SessionEventViewType from "@/app/(members)/dashboard/sessions-events/_components/session-events-header/View";
import { EventSessionInput } from "@/app/(members)/dashboard/sessions-events/_components/session-events-header/SessionEventsHeader";
import SessionList from "@/app/(members)/dashboard/sessions-events/_components/session-events-main/SessionsList";
import SessionsTable from "@/app/(members)/dashboard/sessions-events/_components/session-events-main/SessionsTable";
import Filter from "@/components/filter";
import AddSessionPopup from "./modals/add-sessions";

export default function HeadSessionsAdministrations() {
  const [view, setView] = useState("table");
  const dispatch = useDispatch();

  const { limit, page, search, sort } = useSelector(
    (state: RootState) => state.pagination
  );
  const input = useSelector((state: RootState) => state?.pagination.search);

  const { data: sessionData, isLoading: sessionLoading } = useGetAllSessionQuery({
    page,
    limit,
    sort,
    search,
  });

  return (
    <div className="w-full mx-auto py-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Sessions</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and schedule training or meeting sessions.
          </p>
        </div>
        <AddSessionPopup />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          <EventSessionInput
            type="session"
            inputValue={input}
            setInputValue={(val: string) => dispatch(setSearch(val))}
          />
          <Filter />
        </div>

        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
          <SessionEventViewType view={view} setView={setView} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full transition-all">
        {view === "list" ? (
          <SessionList
            right={true}
            data={sessionData?.data}
            total={sessionData?.meta?.total}
            loading={sessionLoading}
          />
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <SessionsTable
              right={true}
              data={sessionData?.data}
              total={sessionData?.meta?.total}
              loading={sessionLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
