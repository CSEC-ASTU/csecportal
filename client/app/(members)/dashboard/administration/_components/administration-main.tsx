"use client";

import React from "react";
import PresidentAdministration from "./president-administration";
import HeadAdministration from "./head-administration";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";

export default function AdministrationMain() {
  const role = useSelector((state: RootState) => state?.auth.user?.role);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering role-dependent UI on the server to prevent
  // hydration mismatch between server and client-rendered content.
  if (!mounted) {
    return <section className="size-full relative" />;
  }

  return (
    <section className="size-full relative">
      {role !== "MEMBER" &&
        (role === "PRESIDENT" ? (
          <PresidentAdministration />
        ) : (
          <HeadAdministration />
        ))}
    </section>
  );
}
