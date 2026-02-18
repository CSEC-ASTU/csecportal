"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";

import HeadMemberAdministration from "./head-member-administration";
import HeadSessionsAdministrations from "./head-sessions-administrations";
import HeadAttendanceAdministration from "./head-attendance-administration";
import HeadResourcesAdministration from "./head-resource-administraion";
import HeadGroupAdministration from "./head-group-administration";

export default function HeadAdministrationMain() {
  const activeSlug = useSelector(
    (state: RootState) => state.headAdminLinks.activeSlug
  );

  return (
    <div className="size-full">
      {activeSlug === "members" && <HeadMemberAdministration />}
      {activeSlug === "sessions" && <HeadSessionsAdministrations />}
      {activeSlug === "attendance" && <HeadAttendanceAdministration />}
      {activeSlug === "resources" && <HeadResourcesAdministration />}
      {activeSlug === "groups" && <HeadGroupAdministration />}
    </div>
  );
}
