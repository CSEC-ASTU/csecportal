import React from "react";
import AttendanceSessionDetail from "./_components/attendance-session-detail";

export default async function Page({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return <AttendanceSessionDetail sessionId={sessionId} />;
}
