import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AttendanceList from "./AttendanceList";

function AttendancePage() {
  interface AttendanceItem {
    id: number;
    date: string;
    session: string;
    startTime: string;
    endTime: string;
    status: "present" | "Absent" | "Excused";
  }

  const data: AttendanceItem[] = [
    {
      id: 1,
      date: "July 01, 2025",
      session: "Contest Analysis",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "present",
    },
    {
      id: 2,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "Absent",
    },
    {
      id: 3,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "present",
    },
    {
      id: 4,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "Excused",
    },
    {
      id: 5,
      date: "July 01, 2025",
      session: "Contest Analysis",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "Absent",
    },
    {
      id: 6,
      date: "July 01, 2025",
      session: "Excused",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "present",
    },
    {
      id: 7,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "Absent",
    },
    {
      id: 8,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "Absent",
    },
    {
      id: 9,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "present",
    },
    {
      id: 10,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "Absent",
    },
    {
      id: 11,
      date: "July 01, 2025",
      session: "Contest",
      startTime: "8:00 Am",
      endTime: "10:00 Am",
      status: "Excused",
    },
  ];

  return (
    <div className="border-1 py-4 px-4 rounded-[10px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Start-Time</TableHead>
            <TableHead>End-Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <AttendanceList
              key={index}
              id={item.id}
              date={item.date}
              session={item.session}
              startTime={item.startTime}
              endTime={item.endTime}
              status={item.status}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AttendancePage;
