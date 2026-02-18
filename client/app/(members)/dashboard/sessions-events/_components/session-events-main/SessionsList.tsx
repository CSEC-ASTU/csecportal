import { Badge } from "@/components/ui/badge";
import { ISession } from "@/types/sessions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimit, setPage } from "@/lib/features/slices/events";
import PaginationTable from "@/components/PaginationTable";
import { RootState } from "@/lib/features/store";

interface ISessionList {
  data: ISession[];
  loading?: boolean;
  total: number;
  right: boolean;
}

export default function SessionList({
  data,
  loading,
  total,
  right,
}: ISessionList) {
  const dispatch = useDispatch();
  console.log(right);
  const { page, limit } = useSelector((state: RootState) => state.pagination);
  if (loading) {
    return (
      <div className="size-full flex justify-center items-center">
        Loading sessions...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="size-full flex justify-center items-center">
        No sessions found
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
  };

  return (
    <div className="size-full">
      <div className="w-full h-[90%] flex flex-col overflow-y-auto gap-3 lg:gap-5">
        {data.map((event) => (
          <SessionCard session={event} key={event.id} />
        ))}
      </div>

      <div className="w-full h-[10%]">
        <PaginationTable
          page={page}
          setPage={handlePageChange}
          pageSize={limit}
          setPageSize={handleLimitChange}
          total={total}
        />
      </div>
    </div>
  );
}

interface SessionCardProps {
  session: ISession;
}

const SessionCard = function ({ session }: SessionCardProps) {
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime);

  const day = startDate.toLocaleDateString("en-US", { weekday: "long" });
  const date = startDate.toLocaleDateString();
  const timeRange = `${startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const now = new Date();
  const timeLeftMs = startDate.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const daysLeft = Math.floor(hoursLeft / 24);
  const remainingHours = hoursLeft % 24;
  const minutesLeft = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="w-full rounded-md light-border1 px-3 lg:px-4 py-4 lg:py-5 flex justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Badge variant={timeLeftMs > 0 ? "green" : "red"}>
            {timeLeftMs > 0 ? "Upcoming" : "Completed"}
          </Badge>
          <h3 className="text-base lg:text-[18px] font-bold">
            {session.division.name}
          </h3>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm lg:text-base font-medium">
            {session.title}
          </span>
          <span className="text-xs lg:text-sm text-text2">
            {day}, {date} • {timeRange}
          </span>
          <span className="text-xs lg:text-sm text-text2">
            📍 {session.location}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end text-right">
        {timeLeftMs > 0 && (
          <span className="text-sm lg:text-[18px] font-bold">
            {daysLeft > 0 ? `${daysLeft}d ` : ""}
            {remainingHours > 0 ? `${remainingHours}h ` : ""}
            {minutesLeft > 0 ? `${Math.round(minutesLeft)}m` : ""}
            {timeLeftMs > 0 && timeLeftMs < 60000 ? "<1m" : ""}
            {" left"}
          </span>
        )}
        <span className="text-xs lg:text-sm text-text2 max-w-[200px] line-clamp-2">
          {session.description || "No description"}
        </span>
      </div>
    </div>
  );
};
