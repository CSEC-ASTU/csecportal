import React from "react";
import { TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { VerifiedIcon } from "lucide-react";

interface MemberListProps {
  id: string;
  name: string;
  role: string;
  year: string;
  status: string;
  search: string;
  activePage: number;
  isVerified?: boolean;
  memberId: string;
}

function MemberList({
  id,
  name,
  role,
  year,
  status,
  search,
  isVerified = false,
  memberId,
}: MemberListProps) {
  // Get initials from name
  const getInitials = (fullName: string) => {
    return fullName
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase();
  };

  // Role color mapping
  const roleColors = {
    PRESIDENT: "bg-gradient-to-r from-purple-600 to-indigo-600",
    MEMBER: "bg-gradient-to-r from-blue-600 to-cyan-500",
    DEFAULT: "bg-gradient-to-r from-gray-700 to-gray-600",
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      className="hover:cursor-pointer border-b border-gray-100 dark:border-gray-800"
    >
      {/* Name Column - Enhanced with verification badge */}

      <TableCell className="font-medium px-6 py-4">
        <Link
          href={`/dashboard/users/${id}`}
          className="flex items-center gap-3 w-full hover:text-blue-600 transition-colors group"
        >
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-white shadow-lg group-hover:scale-105 transition-transform">
              <AvatarImage
                src={`https://avatar.vercel.sh/${id}?name=${name}`}
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 p-0.5 rounded-full">
                <VerifiedIcon className="h-4 w-4 text-blue-500 fill-current" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600">
                {name}
              </p>
              {isVerified && (
                <VerifiedIcon className="h-4 w-4 text-blue-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {search || "No Division"}
            </p>
          </div>
        </Link>
      </TableCell>

      {/* Student ID Column - Enhanced */}
      <TableCell className="px-6 py-4">
        <Link
          href={`/dashboard/users${id}`}
          className="block w-full font-mono text-sm hover:text-blue-600 transition-colors bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {memberId}
        </Link>
      </TableCell>

      {/* Status Column - Enhanced */}
      <TableCell className="px-6 py-4">
        {status === "ACTIVE" ? (
          <Badge variant="green" className="px-3 py-1 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Active
          </Badge>
        ) : (
          <Badge variant="red" className="px-3 py-1 rounded-full shadow-sm">
            Inactive
          </Badge>
        )}
      </TableCell>

      {/* Year Column - Enhanced */}
      <TableCell className="px-6 py-4">
        <Link
          href={`/dashboard/users/${id}`}
          className="block w-full hover:text-blue-600 transition-colors font-medium"
        >
          <span className="inline-flex items-center justify-center h-6 w-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full">
            {year}
          </span>
        </Link>
      </TableCell>

      {/* Role Column - Enhanced with gradient badges */}
      <TableCell className="px-6 py-4">
        <Link href={`/dashboard/users/${id}`} className="block w-full">
          {role === "PRESIDENT" && (
            <Badge
              className={`${roleColors.PRESIDENT} text-white font-bold tracking-wide px-3 py-1.5 rounded-md shadow-md hover:shadow-lg transition-shadow`}
            >
              PRESIDENT
            </Badge>
          )}

          {role === "MEMBER" && (
            <Badge
              className={`${roleColors.MEMBER} text-white font-bold tracking-wide px-3 py-1.5 rounded-md shadow-md hover:shadow-lg transition-shadow`}
            >
              MEMBER
            </Badge>
          )}

          {role !== "MEMBER" && role !== "PRESIDENT" && (
            <Badge
              className={`${roleColors.DEFAULT} text-white font-bold tracking-wide px-3 py-1.5 rounded-md shadow-md hover:shadow-lg transition-shadow`}
            >
              DIVISION HEAD
            </Badge>
          )}
        </Link>
      </TableCell>
    </motion.tr>
  );
}

export default MemberList;
