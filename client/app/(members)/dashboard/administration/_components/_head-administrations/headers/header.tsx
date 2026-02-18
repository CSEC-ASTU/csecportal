"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSlug } from "@/lib/features/slices/head-administration";
import { RootState } from "@/lib/features/store";

const headAdminLinks = [
  { name: "Members", slug: "members" },
  { name: "Groups", slug: "groups" },
  { name: "Sessions", slug: "sessions" },
  { name: "Attendance", slug: "attendance" },
  { name: "Resources", slug: "resources" },
];

export default function HeadAdministrationHeader() {
  const dispatch = useDispatch();
  const activeSlug = useSelector(
    (state: RootState) => state.headAdminLinks.activeSlug
  );

  return (
    <div className="border-b px-4">
      <div className="flex space-x-8">
        {headAdminLinks.map(({ name, slug }) => (
          <button
            key={slug}
            onClick={() => dispatch(setActiveSlug(slug))}
            className={`py-3 text-sm font-medium transition-all relative ${
              activeSlug === slug
                ? "text-primary border-b-2 border-primary -mb-[2px]"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
