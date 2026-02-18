import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Clock, MapPin, Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PaginationTable from "@/components/PaginationTable";
import { ISession } from "@/types/sessions";
import { setPage, setLimit } from "@/lib/features/slices/events";
import { RootState } from "@/lib/features/store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteSessionMutation } from "@/lib/features/api";

interface ISessionTableProps {
  data: ISession[];
  loading?: boolean;
  total: number;
  right?: boolean;
}

export default function SessionsTable({
  data,
  loading,
  total,
  right = false,
}: ISessionTableProps) {
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: RootState) => state.pagination);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionIdToDelete, setSessionIdToDelete] = useState<string | null>(
    null
  );

  const [deleteSession] = useDeleteSessionMutation();

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
  };

  const handleDelete = async () => {
    if (!sessionIdToDelete) return;
    await deleteSession({ id: sessionIdToDelete });
    setDeleteDialogOpen(false);
    setSessionIdToDelete(null);
  };

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No sessions scheduled</h3>
        <p className="text-sm text-muted-foreground">
          Create a new session to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 size-full">
      <div className="w-full rounded-xl border-[1px] border-gray-800/[.5] dark:border-gray-200/[.5] overflow-hidden h-[90%]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800/[.4] dark:divide-gray-200/[.4]">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Division
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Details
                </th>
                {right && (
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className=" divide-y">
              {data.map((session) => {
                const startDate = new Date(session.startTime);
                const endDate = new Date(session.endTime);
                const day = startDate.toLocaleDateString("en-US", {
                  weekday: "short",
                });
                const date = startDate.toLocaleDateString();
                const timeRange = `${startDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${endDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`;

                const now = new Date();
                const timeLeftMs = startDate.getTime() - now.getTime();
                const hoursLeft = Math.floor(timeLeftMs / (1000 * 60 * 60));
                const daysLeft = Math.floor(hoursLeft / 24);
                const remainingHours = hoursLeft % 24;
                const minutesLeft = Math.floor(
                  (timeLeftMs % (1000 * 60 * 60)) / (1000 * 60)
                );

                return (
                  <tr key={session.id} className="transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={timeLeftMs > 0 ? "default" : "secondary"}
                        className={
                          timeLeftMs > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {timeLeftMs > 0 ? "Upcoming" : "Completed"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                      {session.division.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold ">
                        {session.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                          {`${day}, ${date} • ${timeRange}`}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                          {session.location}
                        </div>
                        {timeLeftMs > 0 && (
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="inline-block h-4 w-4 mr-1.5 text-gray-400">
                              ⌛
                            </span>
                            {daysLeft > 0 && `${daysLeft}d `}
                            {remainingHours > 0 && `${remainingHours}h `}
                            {minutesLeft > 0 && `${minutesLeft}m`}
                            {timeLeftMs < 60000 && "<1m"}
                          </div>
                        )}
                        {session.description && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Info className="h-4 w-4 mr-1.5 text-gray-400" />
                                  {session.description.length > 30
                                    ? `${session.description.substring(
                                        0,
                                        30
                                      )}...`
                                    : session.description}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{session.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </td>
                    {right && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setDeleteDialogOpen(true);
                              setSessionIdToDelete(session.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full h-[10%]">
        <PaginationTable
          page={page}
          setPage={handlePageChange}
          pageSize={limit}
          setPageSize={handleLimitChange}
          total={total}
        />
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this session?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
