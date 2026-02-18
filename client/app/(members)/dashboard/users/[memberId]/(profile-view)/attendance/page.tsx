import React from "react";
import Attendance from "../../_components/attendance/Attendance";

const attendanceData = [
  {
    date: "2025-04-01",
    session: "Session A",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    status: "Present",
  },
  {
    date: "2025-04-02",
    session: "Session B",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    status: "Absent",
  },
  {
    date: "2025-04-03",
    session: "Session C",
    startTime: "01:00 PM",
    endTime: "03:00 PM",
    status: "Present",
  },
  {
    date: "2025-04-04",
    session: "Session D",
    startTime: "04:00 PM",
    endTime: "06:00 PM",
    status: "Late",
  },
  {
    date: "2025-04-05",
    session: "Session E",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    status: "Present",
  },
  {
    date: "2025-04-06",
    session: "Session F",
    startTime: "01:00 PM",
    endTime: "03:00 PM",
    status: "Excused",
  },
  {
    date: "2025-04-07",
    session: "Session G",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    status: "Present",
  },
  {
    date: "2025-04-08",
    session: "Session H",
    startTime: "11:00 AM",
    endTime: "01:00 PM",
    status: "Absent",
  },
  {
    date: "2025-04-09",
    session: "Session I",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    status: "Present",
  },
  {
    date: "2025-04-10",
    session: "Session J",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    status: "Late",
  },
];

export default function page() {
  return <Attendance data={attendanceData} />;
}
