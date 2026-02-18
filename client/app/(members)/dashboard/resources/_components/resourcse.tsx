"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "@/lib/features/store";
import { setLimit, setPage } from "@/lib/features/slices/events";
import { useGetAllDivisionsQuery } from "@/lib/features/api";
import ResourcesHeader from "./resource-header";
import ResourceMain from "./resource-main";
import PaginationTable from "@/components/PaginationTable";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutGrid, Layers } from "lucide-react";

interface IResources {
  look: boolean;
  show: boolean;
  divId?: string;
}

export default function Resources({ look, show, divId }: IResources) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");

  const { data: divisions = [], isLoading: divisionsLoading } = useGetAllDivisionsQuery();

  const { limit, page, total } = useSelector(
    (state: RootState) => state.pagination
  );

  return (
    <div className="flex flex-col h-full gap-3 py-6">
      <div className="shrink-0 border-b py-2">
        <ResourcesHeader look={look} />
      </div>

      {show && (
        <div className="shrink-0 bg-card border-b">
          <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "all"
                  ? "border-primary text-primary"
                  : "border-transparent text-text2 hover:text-text1"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              All Resources
            </button>

            {divisionsLoading ? (
              Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-4 w-24 rounded my-4" />
              ))
            ) : (
              divisions.map((division: any) => (
                <button
                  key={division.id}
                  onClick={() => setActiveTab(division.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                    activeTab === division.id
                      ? "border-primary text-primary"
                      : "border-transparent text-text2 hover:text-text1"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  {division.name}
                </button>
              ))
            )}
          </nav>
        </div>
      )}

      <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={show ? activeTab : divId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {divisionsLoading ? (
              <ResourceLoadingSkeleton />
            ) : (
              <ResourceMain id={show ? activeTab : (divId || "all")} look={look} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Professional Footer / Pagination */}
      <footer className="shrink-0 border-t bg-card px-6 py-3 flex items-center justify-between">
        <div className="text-xs text-text2 font-medium hidden md:block">
          Showing <span className="text-text1">{page * limit - limit + 1}</span> -{" "}
          <span className="text-text1">{Math.min(page * limit, total)}</span> of{" "}
          <span className="text-text1">{total}</span> resources
        </div>

        <div className="flex items-center gap-4">
          <PaginationTable
            page={page}
            pageSize={limit}
            setPage={(p) => dispatch(setPage(p))}
            setPageSize={(l) => dispatch(setLimit(l))}
            total={total}
          />
        </div>
      </footer>
    </div>
  );
}

function ResourceLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3 border border-border p-4 rounded-xl">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
}
