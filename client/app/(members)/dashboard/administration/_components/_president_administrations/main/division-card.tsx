"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  MoreVertical,
  Trash2,
  UserPlus,
  Calendar,
  User,
  LayoutGrid
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AssignUpdatePopup from "./modals/assign-head";

interface DivisionCardProps {
  division: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    currentHead?: {
      id: string;
      name: string;
    };
  };
  isAdmin?: boolean;
  onDelete?: (divisionId: string) => Promise<void>;
}

export default function DivisionCard({
  division,
  isAdmin = false,
  onDelete,
}: DivisionCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(division.id);
      setShowDeleteDialog(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-4">
      {/* Information Section */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-text1 text-base">{division.name}</h3>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
            Active
          </span>
        </div>

        <p className="text-text2 text-sm line-clamp-2 max-w-2xl">
          {division.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-text2">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {format(new Date(division?.createdAt || Date.now()), "MMM dd, yyyy")}
          </div>
          {division.currentHead && (
            <div className="flex items-center">
              <User className="w-3.5 h-3.5 mr-1.5 opacity-70" />
              Head: <span className="ml-1 font-medium text-text1">{division.currentHead.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 shrink-0">
        {isAdmin && (
          <>
            <Button
              size="sm"
              className="hidden md:flex h-8 text-xs"
              onClick={() => setShowAssignDialog(true)}
            >
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              {division.currentHead ? "Change Head" : "Assign Head"}
            </Button>

            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-text2 hover:text-text1 hover:bg-muted/50 rounded-full transition-all"
    >
      <MoreVertical className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-52 p-1 shadow-xl border-border bg-secondary">
    <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-text2/50">
      Management
    </div>

    <DropdownMenuItem
      className="md:hidden flex items-center cursor-pointer py-2 px-3 rounded-md transition-colors focus:bg-muted focus:text-text1"
      onClick={() => setShowAssignDialog(true)}
    >
      <UserPlus className="mr-2 h-4 w-4 opacity-70" />
      <span className="text-sm font-medium">Assign Head</span>
    </DropdownMenuItem>

    <div className="h-px bg-border my-1" />

    <DropdownMenuItem
      className="flex items-center cursor-pointer py-2 px-3 rounded-md text-red-500  transition-colors"
      onClick={() => setShowDeleteDialog(true)}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      <span className="text-sm font-semibold">Delete Division</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>          </>
        )}
      </div>

      {showAssignDialog && (
        <AssignUpdatePopup
          divisionId={division.id}
          currentHead={division.currentHead}
          onClose={() => setShowAssignDialog(false)}
        />
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Division</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the <span className="font-semibold text-text1">{division.name}</span> division?
              This will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
