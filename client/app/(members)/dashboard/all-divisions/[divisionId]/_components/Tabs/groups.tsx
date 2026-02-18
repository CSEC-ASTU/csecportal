"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Code, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IGroup } from "@/types/group.type";

interface DivisionGroupsProps {
  groups: IGroup[];
  isLoading: boolean;
}

function DivisionGroups({ groups, isLoading }: DivisionGroupsProps) {
  if (isLoading) return <GroupsSkeleton />;

  return (
    <div className="p-6 space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 lg:size-6 text-primary" />
          <h1 className="text-base lg:text-xl tracking-tight text-gray-900 dark:text-gray-100 font-bold">
            Division Groups
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Specialized teams working on exciting projects
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full flex flex-col border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {group.name}
                    </CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {group.id.split("-")[0]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {group.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>12 Members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-4">
                <Button variant="ghost" className="w-full group" size="sm">
                  View group
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GroupsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
            <div className="px-6 pb-4">
              <Skeleton className="h-9 w-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DivisionGroups;
