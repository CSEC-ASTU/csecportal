"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSlug } from "@/lib/features/slices/president-administration";
import { RootState } from "@/lib/features/store";

const headAdminLinks = [
  { name: "Members", slug: "members" },
  { name: "Rules", slug: "rules" },
  { name: "Testimonials", slug: "testimonials" },
  { name: "FAQ", slug: "faq" },
  { name: "Divisions", slug: "divisions" },
  { name: "Events", slug: "events" },
];

export default function PresidentAdministrationHeader() {
  const dispatch = useDispatch();
  const activeSlug = useSelector(
    (state: RootState) => state.presidentAdminLink.activeSlug
  );

  return (
    <div className="border-b">
      <div className="flex space-x-8">
        {headAdminLinks.map(({ name, slug }) => (
          <button
            key={slug}
            onClick={() => dispatch(setActiveSlug(slug))}
            className={`py-3 text-sm font-medium transition-all relative ${
              activeSlug === slug
                ? "text-primary border-b-2 border-primary -mb-[2px]"
                : "text-gray-500"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
