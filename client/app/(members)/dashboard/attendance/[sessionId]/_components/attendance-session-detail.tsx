/*   */
"use client";

import React, { useState } from "react";
import {
  useGetSessionAttendanceQuery,
  useMarkAttendanceMutation,
} from "@/lib/features/api";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface IAttendanceDetail {
  sessionId: string;
}

type BadgeVariant =
  | "default"
  | "outline"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "destructive"
  | "secondary";

export default function AttendanceSessionDetail({
  sessionId,
}: IAttendanceDetail) {
  const { data, isLoading } = useGetSessionAttendanceQuery(sessionId);
  const [markAttendance, { isLoading: markAttendanceLoading }] =
    useMarkAttendanceMutation();
  const [tab, setTab] = useState("recorded");

  const statusIcons = {
    PRESENT: <CheckCircle className="h-4 w-4 text-green-500" />,
    ABSENT: <XCircle className="h-4 w-4 text-red-500" />,
    LATE: <Clock className="h-4 w-4 text-yellow-500" />,
    EXCUSED: <AlertCircle className="h-4 w-4 text-blue-500" />,
    NOT_RECORDED: <div className="h-4 w-4 rounded-full bg-gray-200" />,
  };

  function getStatusVariant(status: string | undefined): BadgeVariant | null {
    switch (status) {
      case "PRESENT":
        return "green";
      case "ABSENT":
        return "red";
      case "LATE":
        return "yellow";
      default:
        return "default";
    }
  }

  const handleAttendance = async (
    sessionId: string,
    memberId: string,
    status: "present" | "absent" | "late" | "excused"
  ) => {
    try {
      await markAttendance({
        sessionId,
        memberId,
        status: status.toUpperCase(),
      }).unwrap();
    } catch (error) {
      console.error("Failed to mark attendance:", error);
    }
  };

  const title = data?.session?.title || "Session";
  const attendance = data?.attendance || [];

  const recorded = attendance.filter((a: any) => a.status !== "NOT_RECORDED");
  const notRecorded = attendance.filter(
    (a: any) => a.status === "NOT_RECORDED"
  );

  // Calculate attendance stats
  const totalMembers = attendance.length;
  const presentCount = attendance.filter(
    (a: any) => a.status === "PRESENT"
  ).length;
  const attendanceRate =
    totalMembers > 0 ? (presentCount / totalMembers) * 100 : 0;

  const renderTable = (records: any[], showActions: boolean) => (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="min-w-[200px]">Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            {showActions && (
              <TableHead className="text-right">Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="hover:bg-gray-50/50">
              <TableCell>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={record.member?.profilePicture || undefined}
                    alt={record.member?.freeName}
                  />
                  <AvatarFallback>
                    {record.member?.freeName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>
                    {record.member?.freeName + " " + record.member?.lastName ||
                      "No Name"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {record.member?.email || ""}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {record.member?.role || "MEMBER"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {statusIcons[record.status as keyof typeof statusIcons]}
                  <Badge
                    variant={getStatusVariant(attendance?.status) || "default"}
                  >
                    {record.status.replace("_", " ")}
                  </Badge>
                </div>
              </TableCell>
              {showActions && (
                <TableCell className="text-right">
                  <Select
                    disabled={markAttendanceLoading}
                    onValueChange={(value) =>
                      handleAttendance(sessionId, record.memberId, value as any)
                    }
                  >
                    <SelectTrigger className="w-[140px] ml-auto">
                      <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Attendance Status</SelectLabel>
                        <SelectItem value="present" className="flex gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Present
                        </SelectItem>
                        <SelectItem value="absent" className="flex gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Absent
                        </SelectItem>
                        <SelectItem value="late" className="flex gap-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          Late
                        </SelectItem>
                        <SelectItem value="excused" className="flex gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-500" />
                          Excused
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <section className="size-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Attendance Records
          </h1>
          <p className="text-muted-foreground">
            For session:{" "}
            <span className="font-medium text-primary">{title}</span>
          </p>
        </div>

        {!isLoading && (
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Attendance Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {attendanceRate.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-bold">{totalMembers}</p>
            </div>
          </div>
        )}
      </div>

      {!isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-green-600">
                    Present: {presentCount}
                  </span>
                  <span className="text-sm text-gray-500">
                    {attendanceRate.toFixed(1)}%
                  </span>
                </div>
                <Progress value={attendanceRate} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">
                    Absent:{" "}
                    {
                      attendance.filter((a: any) => a.status === "ABSENT")
                        .length
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">
                    Late:{" "}
                    {attendance.filter((a: any) => a.status === "LATE").length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    Excused:{" "}
                    {
                      attendance.filter((a: any) => a.status === "EXCUSED")
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading attendance data...</p>
        </div>
      ) : (
        <Tabs
          defaultValue="recorded"
          value={tab}
          onValueChange={setTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-xs">
            <TabsTrigger value="recorded">
              Recorded ({recorded.length})
            </TabsTrigger>
            <TabsTrigger value="not-recorded">
              Pending ({notRecorded.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recorded" className="space-y-4">
            {recorded.length > 0 ? (
              renderTable(recorded, false)
            ) : (
              <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
                <AlertCircle className="h-8 w-8 text-gray-400" />
                <h3 className="text-lg font-medium">No attendance recorded</h3>
                <p className="text-sm text-gray-500">
                  Mark attendance for members in the &quot;Pending&quot; tab
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="not-recorded" className="space-y-4">
            {notRecorded.length > 0 ? (
              renderTable(notRecorded, true)
            ) : (
              <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-medium">
                  All members accounted for
                </h3>
                <p className="text-sm text-gray-500">
                  Everyone&apos;s attendance has been recorded
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
}
