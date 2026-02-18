"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Folder,
  Calendar,
  FileText,
  User,
  ChevronRight
} from "lucide-react";

import DivisionMembers from "./Tabs/division-members";
import DivisionGroups from "./Tabs/groups";
import DivisionResources from "./Tabs/division-resources";
import HeadProfile from "./Tabs/head-profile";
import DivisionSessions from "./Tabs/session-events";

import {
  useGetDivisionMembersQuery,
  useGetGroupsByDivisionQuery,
} from "@/lib/features/api";

interface IDivisions {
  name: string;
  id: string;
}

export default function Divisions({ id, name }: IDivisions) {
  const [activeTab, setActiveTab] = useState("members");

  // API Data
  const { data: groups, isLoading: groupLoading } = useGetGroupsByDivisionQuery(id);
  const { data: divisionMembers, isLoading: divisionMembersLoading } = useGetDivisionMembersQuery(id);

  const tabs = [
    {
      id: "members",
      label: "Members",
      icon: <Users className="w-4 h-4 mr-2" />,
      component: (
        <DivisionMembers
          members={divisionMembers?.data || []}
          membersLoading={divisionMembersLoading}
          right={false}
        />
      ),
    },
    {
      id: "groups",
      label: "Groups",
      icon: <Folder className="w-4 h-4 mr-2" />,
      component: (
        <DivisionGroups
          groups={groups?.data || []}
          isLoading={groupLoading}
        />
      ),
    },
    {
      id: "events",
      label: "Sessions",
      icon: <Calendar className="w-4 h-4 mr-2" />,
      component: <DivisionSessions id={id} />,
    },
    {
      id: "resources",
      label: "Resources",
      icon: <FileText className="w-4 h-4 mr-2" />,
      component: <DivisionResources id={id} />,
    },
    {
      id: "profile",
      label: "Head Profile",
      icon: <User className="w-4 h-4 mr-2" />,
      component: <HeadProfile />,
    },
  ];

  return (
    <div className="w-full p-4 gap-2">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text2 text-sm mb-1">
            <span>Divisions</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary font-medium">{name}</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-normal tracking-[1px] text-text2">
            {name} Division
          </h1>
        </div>
      </header>

      <div className="w-full">
        <div className="border-b border-border mb-6">
          <nav className="-mb-px flex space-x-6 lg:space-x-10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? "text-primary border-primary"
                      : "border-transparent text-text2 hover:text-text1 hover:border-border"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {tabs.find((tab) => tab.id === activeTab)?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
