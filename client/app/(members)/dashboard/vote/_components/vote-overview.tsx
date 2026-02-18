"use client";

import React, { useEffect, useState } from "react";
import VoteOverviewPerson from "./vote-person-overview";

export default function VoteOverview() {
  const roles = [
    { slug: "president", name: "President", total: 2 },
    { slug: "vise-president", name: "Vice President", total: 3 },
    {
      slug: "cpd-head",
      name: "Competitive Programming Division - HEAD",
      total: 1,
    },
    { slug: "dev-head", name: "Development Division - HEAD", total: 5 },
    { slug: "cyber-head", name: "Cyber Security Division - HEAD", total: 2 },
    { slug: "ds-head", name: "Data Science Division - HEAD", total: 3 },
    { slug: "cbd-head", name: "Capacity Building Division - HEAD", total: 2 },
  ];

  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results || []);
      })
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  const totalNeeded = roles.reduce((sum, role) => sum + (role.total || 1), 0);

  let usedIndex = 0;

  return (
    <div className="size-full flex flex-col items-start gap-4">
      <h3 className="text-sm lg:text-base tracking-[1px]">
        The Following are Candidates For CSEC ASTU Executives Positions
      </h3>
      <p className="text-xs lg:text-sm font-semibold text-gray-600">
        Total Candidates Needed:{" "}
        <span className="text-black">{totalNeeded}</span> | Fetched:{" "}
        <span className="text-black">{people.length}</span>
      </p>

      <div className="w-full h-[90%] overflow-y-auto flex flex-col gap-6">
        {roles.map((role, index) => {
          const count = role.total || 1;
          const candidates = people.slice(usedIndex, usedIndex + count);
          usedIndex += count;

          return (
            <div key={index} className="w-full flex flex-col gap-2">
              <h2 className="text-base lg:text-xl font-bold tracking-[1px]">
                {role.name}{" "}
                <span className="text-xs font-normal text-gray-500">
                  ({count} candidate{count > 1 ? "s" : ""})
                </span>
              </h2>
              <div className="w-full flex gap-5 overflow-x-auto">
                {candidates.length > 0 ? (
                  candidates.map((person, i) => (
                    <VoteOverviewPerson key={i} data={person} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No candidates available
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
