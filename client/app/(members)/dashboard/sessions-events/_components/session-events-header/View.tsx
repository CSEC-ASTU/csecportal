"use client";

import React from "react";
import { LayoutDashboard, Table2 } from "lucide-react";

interface IViewType {
  view: string;
  setView: (val: string) => void;
}

export default function SessionEventViewType({ view, setView }: IViewType) {
  const options = [
    {
      id: "list",
      label: "List View",
      icon: <LayoutDashboard className="w-3.5 h-3.5 md:w-4 md:h-4" />,
    },
    {
      id: "table",
      label: "Table View",
      icon: <Table2 className="w-3.5 h-3.5 md:w-4 md:h-4" />,
    },
  ];

  return (
    <div className="flex items-center bg-muted/50 p-1 rounded-lg border border-border/50 w-fit">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => setView(option.id)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all duration-200
            ${
              view === option.id
                ? "bg-background text-text1 shadow-sm border border-border/20"
                : "text-text2 hover:text-text1 hover:bg-muted/80"
            }
          `}
        >
          <span className={`${view === option.id ? "text-primary" : "opacity-70"}`}>
            {option.icon}
          </span>
          <span className="hidden sm:inline-block">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
