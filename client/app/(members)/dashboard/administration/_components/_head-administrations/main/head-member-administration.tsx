import MemberPage from "@/app/(members)/dashboard/users/_components/MemberPage";
import { useGetVerifiedMembersQuery } from "@/lib/features/api";
import { RootState } from "@/lib/features/store";
import React from "react";
import { useSelector } from "react-redux";

export default function HeadMemberAdministration() {
  const { page, limit, search } = useSelector(
    (state: RootState) => state?.pagination
  );
  const { data: membersResponse, isLoading } = useGetVerifiedMembersQuery({
    page,
    limit,
    search,
  });
  return (
    <MemberPage
      members={membersResponse?.data?.user || []}
      membersLoading={isLoading}
      right={false}
      total={membersResponse?.data?.meta?.total || 10}
    />
  );
}
