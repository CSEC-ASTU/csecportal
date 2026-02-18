"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationTable from "@/components/PaginationTable";
import MemberList from "@/app/(members)/dashboard/users/_components/MemberList";
// import Add from "@/components/Add";

import { Input } from "@/components/ui/input";
import { SearchIcon, Trash2 } from "lucide-react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { IMemberData } from "@/types/member.type";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Member {
  right: boolean;
  members: IMemberData[];
  membersLoading: boolean;
}

function Members({ membersLoading, members, right }: Member) {
  const [search, setSearch] = useState("");

  if (membersLoading) return <TableSkeleton />;

  const handlePageSize = (number: number) => {
    console.log("Page size changed to:", number);
  };

  const handlePageLimit = (number: number) => {
    console.log("Page changed to:", number);
  };

  const handleDelete = (id: string) => {
    console.log("Delete member with ID:", id);
    // Add deletion logic here
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="size-full flex flex-col space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 rounded-lg shadow-sm">
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="relative h-10 w-72 lg:w-96"
        >
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="size-full pl-10 pr-4 rounded-lg border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500"
          />
        </motion.div>

        {right && (
          <motion.div whileHover={{ scale: 1.03 }}>
            {/* <Add Popup={AddMemberPopup} title={"Add Member"} /> */}
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 w-full">
        <div className="h-full overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
              <TableRow>
                <TableHead className="px-6 py-4">Name</TableHead>
                <TableHead className="px-6 py-4">Member ID</TableHead>
                <TableHead className="px-6 py-4">Attendance</TableHead>
                <TableHead className="px-6 py-4">Year</TableHead>
                <TableHead className="px-6 py-4">Status</TableHead>
                {right && (
                  <TableHead className="px-6 py-4 text-center">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {members?.map((member: IMemberData) => (
                <TableRow key={member.studentId || member.email}>
                  <MemberList
                    id={member?.studentId || member.email}
                    name={member.freeName}
                    attendance={
                      <Badge
                        variant="outline"
                        className="border-green-200 text-green-800 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    }
                    year={member.expectedGenerationYear || "-"}
                    status={<Badge variant="default">{member.status}</Badge>}
                    search={search}
                    activePage={1}
                  />
                  {right && (
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          handleDelete(member.studentId || member.email)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="p-4 rounded-lg shadow-sm">
        <PaginationTable
          page={1}
          pageSize={20}
          setPage={handlePageLimit}
          setPageSize={handlePageSize}
          total={members.length}
        />
      </div>
    </motion.section>
  );
}

export default Members;
