"use client";

import { useGetVerifiedMembersQuery } from "@/lib/features/api";
import { RootState } from "@/lib/features/store";
import React from "react";
import { useSelector } from "react-redux";
import MemberPage from "./MemberPage";

export default function HomeMembers() {
  const { page, limit, search } = useSelector(
    (state: RootState) => state?.pagination
  );
  const { data: membersResponse, isLoading } = useGetVerifiedMembersQuery({
    page,
    limit,
    search,
  });

  const members = membersResponse?.data?.user;
  return (
    <section className="size-full overflow-hidden">
      <MemberPage
        members={members || []}
        membersLoading={isLoading}
        right={false}
        total={membersResponse?.data?.meta?.total || 10}
      />
    </section>
  );
}
