import MemberPage from "@/app/(members)/dashboard/users/_components/MemberPage";
import { IMemberData } from "@/types/member.type";
import React from "react";

interface IMember {
  right: boolean;
  members: IMemberData[];
  membersLoading: boolean;
}

export default function DivisionMembers({
  members,
  membersLoading,
  right,
}: IMember) {
  return (
    <MemberPage
      members={members}
      membersLoading={membersLoading}
      right={right}
      total={20}
    />
  );
}
