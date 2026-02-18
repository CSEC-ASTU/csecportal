import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "../ui/badge";

interface AttendanceListProps {
  id: number;
  date: string;
  session: string;
  startTime: string;
  endTime: string;
  status: "present" | "Absent" | "Excused";
}

function AttendanceList({
  id,
  date,
  session,
  startTime,
  endTime,
  status,
}: AttendanceListProps) {
  console.log(id);
  return (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>{session}</TableCell>
      <TableCell>{startTime}</TableCell>
      <TableCell>{endTime}</TableCell>
      <TableCell>
        {status === "Excused" && <Badge variant={"yellow"}>{status}</Badge>}
        {status === "present" && <Badge variant={"green"}> {status} </Badge>}
        {status === "Absent" && <Badge variant={"red"}> {status} </Badge>}
      </TableCell>
    </TableRow>
  );
}

export default AttendanceList;
