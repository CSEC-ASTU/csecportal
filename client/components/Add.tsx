"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { CirclePlus } from "lucide-react";
import { RootState } from "@/lib/features/store";

interface AddProps {
  Popup: React.FC;
  title: string;
}

export default function Add ({ Popup, title }: AddProps) 
 {
  const userRole = useSelector((state: RootState) => state.user.role);

  const allowedRoles = ["President", "Vice President", "Division Head"];
  return (
    <Dialog>
      {allowedRoles.includes(userRole) && (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1 text-xs lg:text-base px-2 py-1 lg:px-3 lg:py-2 cursor-pointer">
            <CirclePlus className="h-4 w-4 lg:h-5 lg:w-5" />
            <span>{title}</span>
          </Button>
        </DialogTrigger>
      )}
      <Popup />
    </Dialog>
  );
};
