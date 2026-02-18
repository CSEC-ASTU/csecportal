"use client";

import React from "react";

import sideBarContents from "@/contents/sidebar";
import Navigation from "@/components/Navigation";

const NavParent = () => {
  return (
    <div className="flex flex-col gap-2">
      {sideBarContents.map((item) => (
        <Navigation
          key={item.id}
          Icon={item.Icon}
          title={item.title}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default NavParent;
