"use client";

import React from "react";
import Heads from "../_president_administrations/main/Heads";
import { RulesManagement } from "../_president_administrations/main/Rules";
import Roles from "../_president_administrations/main/Roles";

interface ISessionEventsMain {
  view: string;
}

export default function AdministrationMain({ view }: ISessionEventsMain) {
  return (
    <section className="w-full h-[90%] gap-5 py-3 px-5 border-border bg-card rounded-lg shadow-sm overflow-y-auto">
      {view === "rules" && <RulesManagement />}
      {view === "roles" && <Roles />}
      {view === "heads" && <Heads />}
    </section>
  );
}
