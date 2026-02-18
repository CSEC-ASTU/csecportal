"use client";

import React, { useState } from "react";
import { User, FileText, FolderOpen } from "lucide-react";
import EditRequiredInformation from "./EditRequiredInformation";
import EditOptionalInformations from "./EditOptionalInformation";
import EditProfileResourses from "./EditProfileResources";

export default function EditProfile() {
  const [active, setActive] = useState("req-info");

  const tabs = [
    { id: "req-info", label: "Required Information", icon: User },
    { id: "opt-info", label: "Optional Information", icon: FileText },
    { id: "rs", label: "Resources", icon: FolderOpen },
  ];

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="border-b flex space-x-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 py-3 text-sm font-medium transition-all whitespace-nowrap relative ${
              active === tab.id
                ? "text-primary border-b-2 border-primary -mb-[2px]"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="pt-2">
        {active === "req-info" && <EditRequiredInformation />}
        {active === "opt-info" && <EditOptionalInformations />}
        {active === "rs" && <EditProfileResourses />}
      </div>
    </div>
  );
}
