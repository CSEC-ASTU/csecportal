"use client";

import React from "react";
import { useGetAllDivisionsQuery } from "@/lib/features/api";
import { motion } from "framer-motion";
import {  Users, Calendar, ArrowRight, Layers } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AllDivisions() {
  const { data: divisions, isLoading, isError } = useGetAllDivisionsQuery();

  if (isLoading) return <DivisionSkeleton />;
  if (isError) return (
    <div className="p-10 text-center text-red-500 font-medium">
      Error loading divisions. Please try again later.
    </div>
  );

  return (
    <div className="w-full mx-auto space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {divisions?.map((division: any, index: number) => (
          <motion.div
            key={division.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative flex flex-col rounded-xs border border-primary/10 p-6 transition-all duration-300 hover:shadow-xs hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="flex-1">
              <h3 className="text-xl font-normal text-text1 transition-colors mb-2">
                {division.name}
              </h3>
              <p className="text-text2 text-sm leading-relaxed line-clamp-3 mb-6">
                {division.description}
              </p>
            </div>

            <div className="flex items-center gap-5 text-xs font-medium text-text2 mb-6 pb-6 border-b border-border/50">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary/60" />
                <span>24 Members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary/60" />
                <span>{new Date(division.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            <Link
              href={`/dashboard/all-divisions/${division?.id}`}
              className="mt-auto"
            >
              <Button
                variant={"outline"}
                className=""
              >
                <span className="text-sm font-semibold">Explore Division</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DivisionSkeleton() {
  return (
    <div className="container mx-auto space-y-10">
      <div className="space-y-3">
        <Skeleton className="h-10 w-64 rounded-lg" />
        <Skeleton className="h-5 w-96 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-border p-6 space-y-5">
            <div className="flex justify-between">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
