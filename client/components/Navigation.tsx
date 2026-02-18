"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavigationProps = {
  Icon: React.ElementType;
  title: string;
  link: string;
  exactMatch?: boolean;
};

const Navigation = ({
  Icon,
  title,
  link,
  exactMatch = false,
}: NavigationProps) => {
  const pathname = usePathname();
  const isActive = exactMatch ? pathname === link : pathname.startsWith(link);

  return (
    <li className="list-none">
      <Link
        href={link}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors",
          "text-sm font-medium",
          "group w-full",
          isActive
            ? "text-text1 font-semibold"
            : "text-text2 hover:text-text1"
        )}
      >
        <Icon
          className={cn(
            "size-5",
            isActive
              ? "text-text1"
              : "text-text2 hover:text"
          )}
        />
        <span className="truncate">{title}</span>
      </Link>
    </li>
  );
};

export default Navigation;
