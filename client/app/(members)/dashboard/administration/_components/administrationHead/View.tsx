"use client";
import { Button } from "@/components/ui/button";
import { Table2,BookOpen,ShieldCheck } from "lucide-react";
import React from "react";

interface IViewType {
  view: string;
  setView: (val: string) => void;
}

export default function SessionEventViewType({ view, setView }: IViewType) {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setView("heads")}
        className="flex items-center gap-2"
        variant={view === "heads" ? "default" : "outline"}
      >
        <Table2 className="size-5 lg:size-6" />
        <span className="hidden lg:block text-sm lg:text-base">Heads</span>
      </Button>

      <Button
        onClick={() => setView("roles")}
        className="flex items-center gap-2"
        variant={view === "roles" ? "default" : "outline"}
      >
        <ShieldCheck className="size-5 lg:size-6" />
        <span className="hidden lg:block text-sm lg:text-base">Roles</span>
      </Button>
      <Button
        onClick={() => setView("rules")}
        className="flex items-center gap-2"
        variant={view === "rules" ? "default" : "outline"}
      >
        <BookOpen className="size-5 lg:size-6" />
        <span className="hidden lg:block text-sm lg:text-base">Rules</span>
      </Button>
    </div>
  );
}
