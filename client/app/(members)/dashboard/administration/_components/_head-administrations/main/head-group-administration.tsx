"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { useDeleteGroupMutation, useGetGroupsByDivisionQuery } from "@/lib/features/api";

import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import AddGroup from "./modals/add-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function HeadGroupAdministration() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: groupsData, isLoading, error } = useGetGroupsByDivisionQuery(user?.divisionId);
  const [deleteGroup] = useDeleteGroupMutation();

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    if (selectedGroupId) {
      await deleteGroup(selectedGroupId);
      setShowDeleteModal(false);
      setSelectedGroupId(null);
    }
  };

  return (
    <div className="w-full mx-auto py-3">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Groups</h1>
          <p className="text-sm text-muted-foreground">Manage and organize your division members into groups.</p>
        </div>
        <AddGroup />
      </div>

      {/* Content Section */}
      <div className="border rounded-lg bg-card">
        {isLoading ? (
          <div className="divide-y">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 flex justify-between items-center">
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <p className="text-destructive font-medium mb-4">Failed to load groups</p>
            <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : (
          <div className="divide-y">
            {groupsData?.data?.length > 0 ? (
              groupsData.data.map((group: any) => (
                <div key={group.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{group.name}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {group.description || "No description provided"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground text-sm">
                No groups found. Create one to get started.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Simplified Delete Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Group</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-4">
            Are you sure? This action will permanently remove the group and all its data.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="outline" onClick={handleDelete} className="text-red-500"destructive>Delete Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
