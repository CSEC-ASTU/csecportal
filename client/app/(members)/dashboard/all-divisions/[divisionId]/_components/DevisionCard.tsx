"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Division } from "@/data/division-group.data";

interface DivisionCardProps {
  division: Division;
}

export default function DivisionCard({ division }: DivisionCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm w-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{division.name}</h3>
        <Link
          href={`/dashboard/all-divisions/${division.id}`}
          className="block"
        >
          <button className="text-blue-500 text-sm flex items-center hover:text-blue-700 transition-colors cursor-pointer">
            View All
          </button>
        </Link>
      </div>

      <p className="text-gray-600 text-sm mb-4 border-b-1 ">
        {division.groups.length} Groups
      </p>

      <div className="space-y-2">
        {division.groups.slice(0, 4).map((group) => (
          <Link
            key={`${division.id}-${group.name}`}
            href={`/dashboard/all-divisions/${division.id}/${group.slug}`}
            className="hover:no-underline py-2 px-0 group flex justify-around"
          >
            <div className="flex flex-col  w-full">
              <span className="text-foreground text-left">{group.name}</span>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-3">
                  {group.memberCount} Members
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
