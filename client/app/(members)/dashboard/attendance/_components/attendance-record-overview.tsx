import Link from "next/link";
import React from "react";

export default function AttendanceRecordOverview() {
  const mockData: ISessionAttendance[] = [
    {
      sessionId: "1",
      title: "Weekly Standup",
      sessionDate: "2025-05-01T10:00:00Z",
      status: "PRESENT",
    },
    {
      sessionId: "2",
      title: "Project Planning",
      sessionDate: "2025-05-02T11:00:00Z",
      status: "ABSENT",
    },
    {
      sessionId: "3",
      title: "Retrospective",
      sessionDate: "2025-05-03T09:30:00Z",
      status: "PRESENT",
    },
    {
      sessionId: "4",
      title: "Design Review",
      sessionDate: "2025-05-04T13:00:00Z",
      status: "NOT_RECORDED",
    },
    {
      sessionId: "5",
      title: "All Hands",
      sessionDate: "2025-05-05T15:00:00Z",
      status: "PRESENT",
    },
    {
      sessionId: "6",
      title: "Tech Sync",
      sessionDate: "2025-05-06T08:00:00Z",
      status: "ABSENT",
    },
    {
      sessionId: "7",
      title: "Workshop",
      sessionDate: "2025-05-07T14:00:00Z",
      status: "PRESENT",
    },
    {
      sessionId: "8",
      title: "Client Meeting",
      sessionDate: "2025-05-08T16:00:00Z",
      status: "PRESENT",
    },
    {
      sessionId: "9",
      title: "Hackathon Prep",
      sessionDate: "2025-05-09T12:00:00Z",
      status: "NOT_RECORDED",
    },
    {
      sessionId: "10",
      title: "Team Building",
      sessionDate: "2025-05-10T17:00:00Z",
      status: "ABSENT",
    },
  ];

  return (
    <section className="size-full overflow-y-auto flex flex-col gap-4 p-4">
      {mockData.map((item) => (
        <SessionAttendance key={item.sessionId} {...item} />
      ))}
    </section>
  );
}

interface ISessionAttendance {
  sessionId: string;
  title: string;
  sessionDate: string;
  status: "PRESENT" | "ABSENT" | "NOT_RECORDED";
}

const SessionAttendance: React.FC<ISessionAttendance> = ({
  title,
  sessionDate,
  status,
}) => {
  const statusColor =
    status === "PRESENT"
      ? "text-green-600"
      : status === "ABSENT"
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div className="border rounded-lg p-4 shadow-sm relative">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">
        Date: {new Date(sessionDate).toLocaleString()}
      </p>
      <p className={`mt-1 font-medium ${statusColor}`}>Status: {status}</p>
      <Link
        href={"dashboard/attendance"}
        className="py-1 px-3 absolute top-2 right-3 bg-primary text-white rounded-md font-bold tracking-[1px]"
      >
        Review
      </Link>
    </div>
  );
};
