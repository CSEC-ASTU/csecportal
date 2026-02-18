"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2, LayoutGrid, Plus } from "lucide-react";
import DivisionCard from "./division-card";
import { RootState } from "@/lib/features/store";
import { useSelector } from "react-redux";
import CreateDivisionPopup from "./modals/add-division";
import {
  useDeleteDivisionMutation,
  useGetAllDivisionsQuery,
} from "@/lib/features/api";
import { toast } from "sonner";

export default function PresidentDivisionAdministrations() {
  const [activeTab, setActiveTab] = useState("divisions");
  const [searchTerm, setSearchTerm] = useState("");

  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const allowedRole = "PRESIDENT";

  const {
    data: divisions = [],
    isLoading: isFetching,
    refetch,
  } = useGetAllDivisionsQuery();

  const [deleteDivision] = useDeleteDivisionMutation();

  const filteredDivisions = divisions?.filter(
    (division: any) =>
      division.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      division.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (divisionId: string) => {
    try {
      await deleteDivision(divisionId).unwrap();
      toast.success("Division deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete division");
    }
  };

  const tabs = [
    {
      id: "divisions",
      label: "Division Management",
      icon: <LayoutGrid className="w-4 h-4 mr-2" />,
      component: (
        <div className="flex flex-col h-full">
          {/* Search and Action Bar */}
          <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/10">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text2" />
              <Input
                placeholder="Search divisions..."
                className="pl-10 h-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {userRole === allowedRole && <CreateDivisionPopup />}
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto">
            {isFetching ? (
              <div className="py-20 flex flex-col items-center justify-center text-text2">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Loading divisions...</p>
              </div>
            ) : filteredDivisions.length === 0 ? (
              <div className="py-20 text-center">
                <LayoutGrid className="h-10 w-10 text-text2/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text1">No divisions found</h3>
                <p className="text-text2 text-sm">Try adjusting your search or create a new one.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredDivisions.map((division: any) => (
                  <DivisionCard
                    key={division.id}
                    division={division}
                    isAdmin={userRole === allowedRole}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-2">
      <div className="w-full mx-auto mb-2">
        <div className="border-b mb-5">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-1 font-medium text-sm flex items-center transition-all ${
                  activeTab === tab.id
                    ? "text-text1 border-b border-b-text1"
                    : "border-transparent text-text2 hover:text-text1"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="rounded-lg border overflow-hidden bg-card min-h-[600px]">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}
