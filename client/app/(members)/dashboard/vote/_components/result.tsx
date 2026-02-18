"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Result() {
  // Result state — set to false to simulate results not being open
  const [isResultOpen, setIsResultOpen] = useState(true);
  console.log(setIsResultOpen);

  // Winners array based on roles
  const winners = [
    {
      name: "Liya Mekonnen",
      role: "President",
      picture: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      name: "Abel Getahun",
      role: "Vice President",
      picture: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      name: "Samrawit Ayele",
      role: "Competitive Programming Division - HEAD",
      picture: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Dawit Taye",
      role: "Development Division - HEAD",
      picture: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
      name: "Ruth Yilma",
      role: "Cyber Security Division - HEAD",
      picture: "https://randomuser.me/api/portraits/women/29.jpg",
    },
    {
      name: "Henok Belay",
      role: "Data Science Division - HEAD",
      picture: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      name: "Mekdes Solomon",
      role: "Capacity Building Division - HEAD",
      picture: "https://randomuser.me/api/portraits/women/37.jpg",
    },
  ];

  return (
    <div className="w-full h-full py-10 flex flex-col items-center">
      {isResultOpen ? (
        <>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
            🎉 2025 Executive Winners
          </h2>
          <div className="w-full flex flex-wrap justify-center gap-6">
            {winners.map((winner, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-5 border shadow-md rounded-xl w-[220px] hover:scale-[1.03] transition-all"
              >
                <Image
                  src={winner.picture}
                  alt={winner.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover aspect-square mb-3"
                />
                <h3 className="font-semibold text-lg text-center text-gray-800">
                  {winner.name}
                </h3>
                <p className="text-sm text-center text-gray-500">
                  {winner.role}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Results are not yet available
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please check back after the voting period ends.
          </p>
        </div>
      )}
    </div>
  );
}
