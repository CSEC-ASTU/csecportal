/*   */
"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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

const statusColors = {
  [AttendanceStatus.PRESENT]: "hsl(var(--color-primary))",
  [AttendanceStatus.LATE]: "hsl(var(--color-warning))",
  [AttendanceStatus.ABSENT]: "hsl(var(--color-destructive))",
  [AttendanceStatus.EXCUSED]: "hsl(var(--color-info))",
  [AttendanceStatus.NOT_RECORDED]: "hsl(var(--color-muted))",
};

export function ProgressComponent() {
  const id = useSelector((state: RootState) => state?.auth?.user?.id);
  const {
    data: attendanceData,
    isLoading,
    isError,
  } = useGetPersonAttendanceQuery(id);

  // Calculate attendance statistics
  const attendanceStats = React.useMemo(() => {
    if (!attendanceData) return null;

    const counts = {
      [AttendanceStatus.PRESENT]: 0,
      [AttendanceStatus.ABSENT]: 0,
      [AttendanceStatus.LATE]: 0,
      [AttendanceStatus.EXCUSED]: 0,
      [AttendanceStatus.NOT_RECORDED]: 0,
      total: 0,
    };

    attendanceData.forEach((record: any) => {
      counts[record.status as AttendanceStatus]++;
      counts.total++;
    });

    return counts;
  }, [attendanceData]);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (!attendanceStats) return [];

    return Object.values(AttendanceStatus)
      .filter((status) => attendanceStats[status] > 0)
      .map((status) => ({
        status,
        count: attendanceStats[status],
        percentage: Math.round(
          (attendanceStats[status] / attendanceStats.total) * 100
        ),
        fill: statusColors[status],
      }));
  }, [attendanceStats]);

  const totalSessions = attendanceStats?.total || 0;
  const attendancePercentage = attendanceStats
    ? Math.round(
        ((attendanceStats[AttendanceStatus.PRESENT] +
          attendanceStats[AttendanceStatus.LATE] +
          attendanceStats[AttendanceStatus.EXCUSED]) /
          attendanceStats.total) *
          100
      )
    : 0;

  const chartConfig = {
    count: {
      label: "Count",
    },
    ...Object.values(AttendanceStatus).reduce((acc, status) => {
      acc[status] = {
        label: status.charAt(0) + status.slice(1).toLowerCase(),
        color: statusColors[status],
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>),
  } satisfies ChartConfig;

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-[200px]" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <Skeleton className="mx-auto aspect-square max-h-[250px] rounded-full" />
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[220px]" />
        </CardFooter>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 text-center text-destructive">
          Error loading attendance data
        </CardContent>
      </Card>
    );
  }

  if (!attendanceStats || totalSessions === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0 text-center text-muted-foreground">
          No attendance records found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Your attendance statistics</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {attendancePercentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Attendance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {attendancePercentage >= 90 ? (
            <>
              Excellent attendance{" "}
              <TrendingUp className="h-4 w-4 text-success" />
            </>
          ) : attendancePercentage >= 75 ? (
            <>
              Good attendance <TrendingUp className="h-4 w-4 text-warning" />
            </>
          ) : (
            <>
              Needs improvement{" "}
              <TrendingUp className="h-4 w-4 text-destructive" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {totalSessions} sessions recorded
        </div>
      </CardFooter>
    </Card>
  );
}
