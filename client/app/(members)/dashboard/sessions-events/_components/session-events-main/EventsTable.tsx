"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2, Clock, Globe, Lock, Calendar } from "lucide-react";
import PaginationTable from "@/components/PaginationTable";
import { IEvent } from "@/types/events";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setLimit, setPage } from "@/lib/features/slices/events";
import { useDeleteEventMutation } from "@/lib/features/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";

function formatStatus(startDate: string, endDate: string) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now > end) return { label: "Completed", class: "bg-gray-100 text-gray-600" };

  const diffInMs = start.getTime() - now.getTime();
  const days = Math.floor(Math.abs(diffInMs) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((Math.abs(diffInMs) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffInMs < 0) return { label: "Ongoing", class: "bg-green-100 text-green-700" };
  return { label: `${days}d ${hours}h left`, class: "bg-blue-50 text-blue-600" };
}

export default function EventTable({ data, total, right, loading }: any) {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: RootState) => state.pagination);
  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteEvent(deleteId).unwrap();
      toast.success("Event removed");
      setDeleteId(null);
    } catch (err) {
      toast.error("Failed to delete event");
    }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2 px-6">Event Details</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2">Visibility</TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-wider text-text2">Status</TableHead>
              {right && <TableHead className="text-right px-6">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((event: IEvent) => {
              const status = formatStatus(event.date, event.endDate);
              return (
                <TableRow key={event.id} className="group hover:bg-muted/20 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-md bg-primary/5 text-primary">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-text1">{event.title}</div>
                        <div className="flex items-center gap-2 text-xs text-text2 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1.5  text-[11px] font-medium ${
                      event.status === "PRIVATE" ? "border-amber-200 text-amber-700" : "text-green-700"
                    }`}>
                      {event.status === "PRIVATE" ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      {event.status === "PRIVATE" ? "Members" : "Public"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${status.class}`}>
                      {status.label}
                    </span>
                  </TableCell>
                  {right && (
                    <TableCell className="text-right px-6">
                      <div className="flex justify-end gap-1 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text2 hover:text-text1">
                          <PencilLine className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-text2 hover:text-red-500"
                          onClick={() => setDeleteId(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <PaginationTable
          page={page}
          setPage={(p) => dispatch(setPage(p))}
          pageSize={limit}
          setPageSize={(l) => dispatch(setLimit(l))}
          total={total}
        />
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              This action is permanent. Are you sure you want to remove this event from the calendar?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
