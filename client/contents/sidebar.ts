import type React from "react";
import { makeStore } from "@/lib/features/store";

import {
  LayoutGrid,
  User,
  Layers,
  Clock,
  Folder,
  Users,
  Settings,
  Settings2,
} from "lucide-react";

type sidebar = {
  id: number;
  title: string;
  Icon: React.ElementType;
  link: string;
};
const getUserRole = (): string => {
  const store = makeStore();
  const state = store.getState();
  const userRole = state.auth.user?.role;
  console.log(userRole);
  return "PRESIDENT";
};

const allowedRolesForAdministration = ["PRESIDENT"];

const sidebar: sidebar[] = [
  {
    id: 1,
    title: "Dashboard",
    Icon: LayoutGrid,
    link: "/dashboard/home",
  },
  {
    id: 2,
    title: "Members",
    Icon: Users,
    link: "/dashboard/users",
  },
  {
    id: 3,
    title: "All Divisions",
    Icon: Layers,
    link: "/dashboard/all-divisions",
  },
  {
    id: 5,
    title: "Sessions & Events",
    Icon: Clock,
    link: "/dashboard/sessions-events",
  },
  {
    id: 6,
    title: "Resources",
    Icon: Folder,
    link: "/dashboard/resources",
  },
  {
    id: 7,
    title: "Profile",
    Icon: User,
    link: "/dashboard/profile",
  },
  ...(allowedRolesForAdministration.includes(getUserRole())
    ? [
        {
          id: 8,
          title: "Administration",
          Icon: Settings2,
          link: "/dashboard/administration",
        },
      ]
    : []),
  {
    id: 9,
    title: "Settings",
    Icon: Settings,
    link: "/dashboard/settings",
  },
];

export default sidebar;
