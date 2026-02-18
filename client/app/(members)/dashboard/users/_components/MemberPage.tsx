"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationTable from "@/components/PaginationTable";
import MemberList from "./MemberList";
import { Input } from "@/components/ui/input";
import { Search, Users, Loader2 } from "lucide-react";
import { IMemberData } from "@/types/member.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setLimit, setPage, setSearch } from "@/lib/features/slices/events";
import { Skeleton } from "@/components/ui/skeleton";

interface IMembers {
  right: boolean;
  members: IMemberData[];
  membersLoading: boolean;
  total: number;
}

export default function MemberPage({ members, membersLoading, total }: IMembers) {
  const dispatch = useDispatch();
  const { page, limit, search } = useSelector(
    (state: RootState) => state?.pagination
  );

  const showEmptyState = !membersLoading && (!members || members.length === 0);

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Action Bar */}
      <div className="p-4 border-b flex items-center justify-between bg-muted/5">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text2" />
          <Input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search members by name, ID or email..."
            className="pl-9 bg-background h-9 text-sm border-border/60 focus:ring-1"
          />
        </div>

        {!membersLoading && (
          <div className="text-xs font-medium text-text2 px-3 py-1 bg-muted rounded-full">
            {total} Total Members
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        {showEmptyState ? (
          <div className="h-full flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-300">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Users className="h-8 w-8 text-text2/50" />
            </div>
            <h3 className="text-text1 font-semibold text-lg">No members found</h3>
            <p className="text-text2 text-sm max-w-[250px] text-center mt-1">
              {search
                ? `No results match "${search}". Try a different term.`
                : "The member directory is currently empty."}
            </p>
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-md z-10">
                <TableRow className="hover:bg-transparent border-b border-border/50">
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2 py-3 px-6">Name & Profile</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2 py-3">Student ID</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2 py-3">Status</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2 py-3">Year</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2 py-3">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {membersLoading ? (
                  Array(8).fill(0).map((_, i) => <MemberListSkeleton key={i} />)
                ) : (
                  members?.map((member) => (
                    <MemberList
                      key={member._id}
                      id={member._id}
                      memberId={member.studentId || member.email}
                      name={member.freeName}
                      role={member.role}
                      year={member.expectedGenerationYear || "N/A"}
                      status={member.status}
                      search={member.division?.name}
                      activePage={page}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Footer / Pagination */}
      {!showEmptyState && (
        <div className="p-4 border-t border-border bg-muted/5">
          <PaginationTable
            page={page}
            pageSize={limit}
            setPage={(p) => dispatch(setPage(p))}
            setPageSize={(l) => dispatch(setLimit(l))}
            total={total}
          />
        </div>
      )}
    </div>
  );
}

function MemberListSkeleton() {
  return (
    <TableRow className="border-b border-border/40">
      <TableCell className="py-4 px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20 opacity-60" />
          </div>
        </div>
      </TableCell>
      <TableCell><Skeleton className="h-4 w-24 rounded" /></TableCell>
      <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
      <TableCell><Skeleton className="h-4 w-12 rounded" /></TableCell>
      <TableCell><Skeleton className="h-4 w-20 rounded" /></TableCell>
    </TableRow>
  );
}
