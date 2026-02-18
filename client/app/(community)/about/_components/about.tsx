import React from "react";
import AboutTexts from "./about-texts";
import AboutLeaderShips from "./about-people";

export default function About() {
  return (
    <div className="size-full flex flex-col items-start">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-base lg:text-2xl font-bold">About Use</h2>
      </div>

      <AboutTexts />

      <AboutLeaderShips />
    </div>
  );
}
