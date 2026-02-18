import NoResult from "@/components/no-result";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

interface User {
  id: string;
  freeName: string | null;
  email: string;
  studentId: string | null;
}

interface SessionMembership {
  id: string;
  user: User;
  createdAt: string;
}

interface Division {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  division: Division;
  divisionId: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  location: string;
  sessionStatus: "upcoming" | "completed" | "ongoing";
  userMemberships?: SessionMembership[];
}

interface ISessionList {
  data: Session[];
  loading?: boolean;
}

export default function AttendanceOverviewCard({
  data,
  loading,
}: ISessionList) {
  if (loading) {
    return (
      <div className="size-full flex justify-center items-center">
        <TableSkeleton />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="size-full flex justify-center items-center">
        <NoResult text="No session Is Found" />
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col gap-8 overflow-y-auto">
      {data.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}

interface SessionCardProps {
  session: Session;
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

  const badgeVariant =
    session.sessionStatus === "upcoming"
      ? "green"
      : session.sessionStatus === "ongoing"
      ? "blue"
      : "red";

  return (
    <div className="w-full rounded-md light-border1 px-3 lg:px-4 py-4 lg:py-5 flex justify-between relative">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Badge variant={badgeVariant} className="capitalize">
            {session.sessionStatus}
          </Badge>
          <h3 className="text-base lg:text-[18px] font-bold">
            {session.division.name}
          </h3>
        </div>

        <div className="flex flex-col items-start gap-1">
          <span className="text-sm lg:text-base font-medium">
            {session.title}
          </span>
          <span className="text-xs lg:text-sm text-text2">
            {day}, {date} • {timeRange}
          </span>
          <span className="text-xs text-muted-foreground">
            📍 {session.location}
          </span>
          <p className="text-xs text-text2 max-w-[500px] truncate">
            {session.description}
          </p>
        </div>
      </div>

      <Link
        href={`/dashboard/attendance/${session.id}`}
        className="py-1 px-3 absolute top-2 right-3 bg-primary text-white rounded-md font-bold tracking-[1px]"
      >
        Review
      </Link>
    </div>
  );
};
