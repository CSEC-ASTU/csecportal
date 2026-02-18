/*   */

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

export default function EventTable({ data }: any) {
  return (
    <div className="size-full overflow-y-auto">
      <Table className="size-full light-border2 relative overflow-y-auto">
        <TableHeader className="w-full">
          <TableRow>
            <TableHead>Date</TableHead>
            <TableCell>Session</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>EndTime</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHeader>

        {data.map((data: any, index: number) => {
          return (
            <TableBody key={index} className="py-4">
              <TableRow className="py-4">
                <TableCell>July 01, 2025</TableCell>
                <TableCell>Contest</TableCell>
                <TableCell>{data.startTime}</TableCell>
                <TableCell>{data.endTime} </TableCell>
                <TableCell>
                  {data.status === "Absent" ? (
                    <Badge variant={"red"}>Absent</Badge>
                  ) : (
                    <Badge variant={"green"}>Present</Badge>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          );
        })}
      </Table>
    </div>
  );
}
