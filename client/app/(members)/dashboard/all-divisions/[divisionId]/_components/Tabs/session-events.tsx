"use client";

import React, { useState } from "react";

import SessionEventViewType from "@/app/(members)/dashboard/sessions-events/_components/session-events-header/View";
import { EventSessionInput } from "@/app/(members)/dashboard/sessions-events/_components/session-events-header/SessionEventsHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setSearch } from "@/lib/features/slices/events";
import { useGetAllSessionByDivisionQuery } from "@/lib/features/api";

import SessionList from "@/app/(members)/dashboard/sessions-events/_components/session-events-main/SessionsList";
import SessionsTable from "@/app/(members)/dashboard/sessions-events/_components/session-events-main/SessionsTable";
import Filter from "@/components/filter";

interface IDivisionSessions {
  id: string;
}

export default function DivisionSessions({ id }: IDivisionSessions) {
  const [view, setView] = useState("table");

  const dispatch = useDispatch();
  const input = useSelector((state: RootState) => state?.pagination.search);

  const { data: sessionData, isLoading: sessionLoading } =
    useGetAllSessionByDivisionQuery(id);

  return (
    <div className="size-full flex flex-col">
      {/* EVENT TOP */}
      <div className="w-full h-[20%]">
        <div className="w-full h-[50%] flex items-center justify-between">
          <SessionEventViewType view={view} setView={setView} />
        </div>

        <div className="w-full flex items-center justify-between">
          <EventSessionInput
            type="session"
            inputValue={input}
            setInputValue={(val: string) => dispatch(setSearch(val))}
          />

          <Filter />
        </div>
      </div>

      {/* SESSION MAIN */}
      <div className="w-full h-[80%]">
        {view === "list" && (
          <SessionList
            right={true}
            data={sessionData?.data}
            total={sessionData?.meta?.total}
            loading={sessionLoading}
          />
        )}

        {view === "table" && (
          <SessionsTable
            right={true}
            data={sessionData?.data}
            total={sessionData?.meta?.total || 30}
            loading={sessionLoading}
          />
        )}
      </div>
    </div>
  );
}
