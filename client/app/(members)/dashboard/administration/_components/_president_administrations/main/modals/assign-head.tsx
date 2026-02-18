"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, User } from "lucide-react";
import {
  useAssignDivisionHeadMutation,
  useGetDivisionMembersQuery,
} from "@/lib/features/api";
import { IMemberData } from "@/types/member.type";
import { toast } from "sonner";

interface AssignUpdatePopupProps {
  divisionId: string;
  currentHead?: {
    id: string;
    name: string;
  };
  onClose: () => void;
}

export default function AssignUpdatePopup({
  divisionId,
  currentHead,
  onClose,
}: AssignUpdatePopupProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(
    currentHead?.id || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: membersResponse, isLoading } =
    useGetDivisionMembersQuery(divisionId);
  const [assignHead] = useAssignDivisionHeadMutation();

  const members: IMemberData[] = membersResponse?.data || [];

  const filteredUsers = members.filter(
    (user) =>
      user.freeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = async () => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    try {
      await assignHead({ divId: divisionId, data: { memberId: selectedUser } });
      toast.success("Head Assigned successfully");
      onClose();
    } catch (error) {
      console.error("Failed to assign head:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentHead ? "Change Division Head" : "Assign Division Head"}
          </DialogTitle>
          <DialogDescription>
            Select a member to {currentHead ? "change" : "assign"} as head of
            this division.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {isLoading ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Loading members...
              </p>
            ) : filteredUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No members found
              </p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    selectedUser === user._id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedUser(user._id)}
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{user.freeName}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedUser || isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {currentHead ? "Change Head" : "Assign Head"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
