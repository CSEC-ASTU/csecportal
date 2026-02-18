"use client";

import EventsList from "./EventsList";
import EventsTable from "./EventsTable";
import SessionsList from "./SessionsList";
import SessionsTable from "./SessionsTable";
import {
  useGetAllEventsQuery,
  useGetAllSessionQuery,
} from "@/lib/features/api";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";

interface ISessionEventsMain {
  type: string;
  view: string;
}

export default function SessionEventsMain({ type, view }: ISessionEventsMain) {
  const { limit, page, search, sort } = useSelector(
    (state: RootState) => state.pagination
  );

  const { data: sessionData, isLoading: sessionLoading } =
    useGetAllSessionQuery({
      page,
      limit,
      sort,
      search,
    });

  console.log(sessionData);

  console.log(sessionData);
  const { data: eventsData, isLoading: eventsLoading } = useGetAllEventsQuery({
    page,
    limit,
    sort,
    search,
  });

  console.log(eventsData);

  return (
    <section className="w-full h-[80%]">
      {type === "event" && view === "list" && (
        <EventsList
          data={eventsData?.data}
          total={eventsData?.meta?.total}
          loading={eventsLoading}
        />
      )}

      {type === "event" && view === "table" && (
        <EventsTable
          right={true}
          data={eventsData?.data}
          total={eventsData?.meta?.total}
          loading={eventsLoading}
        />
      )}

      {type === "session" && view === "list" && (
        <SessionsList
          data={sessionData?.data || []}
          loading={sessionLoading}
          total={eventsData?.meta?.total}
          right={false}
        />
      )}
      {type === "session" && view === "table" && (
        <SessionsTable
          right={false}
          data={sessionData?.data}
          total={sessionData?.meta?.total}
          loading={sessionLoading}
        />
      )}
    </section>
  );
}
