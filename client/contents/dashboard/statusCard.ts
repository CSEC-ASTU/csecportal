import { Users, Layers, CalendarCheck, Clock10 } from "lucide-react";

export const statusCardData = [
  {
    icon: Users,
    label: "Total Members",
    value: "11",
    change: "+12%",
    date: "July 16, 2025",
    isNegative: false,
  },
  {
    icon: Layers,
    label: "Total Divisions",
    value: "5",
    change: "+5%",
    date: "July 14, 2025",
    isNegative: false,
  },
  {
    icon: CalendarCheck,
    label: "Your Attendance Rate",
    value: "50%",
    change: "-8%",
    date: "July 14, 2025",
    isNegative: true,
  },
  {
    icon: Clock10,
    label: "Upcoming Sessions",
    value: "7",
    change: "+12%",
    date: "July 10, 2025",
    isNegative: false,
  },
];
