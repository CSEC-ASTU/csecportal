/*   */
"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { useGetPersonAttendanceQuery } from "@/lib/features/api";
import { Skeleton } from "@/components/ui/skeleton";

enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  EXCUSED = "EXCUSED",
  NOT_RECORDED = "NOT_RECORDED",
}

export default function EventTable() {
  const id = useSelector((state: RootState) => state?.auth?.user?.id);
  const {
    data: attendanceData,
    isLoading,
    isError,
  } = useGetPersonAttendanceQuery(id);

  if (isLoading) {
    return (
      <div className="size-full overflow-y-auto space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-full h-16 rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="size-full flex items-center justify-center">
        <p className="text-red-500">Error loading attendance data</p>
      </div>
    );
  }

  if (!attendanceData || attendanceData.length === 0) {
    return (
      <div className="size-full flex items-center justify-center">
        <p className="text-gray-500">No attendance records found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return <Badge variant="green">Present</Badge>;
      case AttendanceStatus.ABSENT:
        return <Badge variant="red">Absent</Badge>;
      case AttendanceStatus.LATE:
        return <Badge variant="yellow">Late</Badge>;
      case AttendanceStatus.EXCUSED:
        return <Badge variant="blue">Excused</Badge>;
      case AttendanceStatus.NOT_RECORDED:
        return <Badge variant="default">Not Recorded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="size-full overflow-y-auto">
      <Table className="size-full light-border2 relative overflow-y-auto">
        <TableHeader className="w-full">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((record: any) => (
            <TableRow key={record.id}>
              <TableCell>{formatDate(record.date)}</TableCell>
              <TableCell>{record.session?.title || "N/A"}</TableCell>
              <TableCell>
                {record.session ? formatTime(record.session.startTime) : "N/A"}
              </TableCell>
              <TableCell>
                {record.session ? formatTime(record.session.endTime) : "N/A"}
              </TableCell>
              <TableCell>{getStatusBadge(record.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
