"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileImage,
  FileVideo,
  FileText,
  FileCode,
  LinkIcon,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useDeleteResourceMutation } from "@/lib/features/api";
import { IResource } from "@/types/resource.type";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IResourceCardProps {
  resource: IResource;
  right?: boolean;
}

const ResourceCard = ({ resource, right = false }: IResourceCardProps) => {
  const [deleteResource, { isLoading: isDeleting }] = useDeleteResourceMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteResource(resource.id).unwrap();
      toast.success("Resource deleted");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete resource");
    }
  };

  const getTypeIcon = () => {
    const iconClass = "size-4 text-muted-foreground";
    switch (resource.type.toLowerCase()) {
      case "image": return <FileImage className={iconClass} />;
      case "video": return <FileVideo className={iconClass} />;
      case "document": return <FileText className={iconClass} />;
      case "code": return <FileCode className={iconClass} />;
      default: return <LinkIcon className={iconClass} />;
    }
  };

  return (
    <div className="group w-full flex items-center justify-between py-4 transition-colors hover:bg-muted/50 border-b last:border-0">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="mt-1 p-2 rounded-md bg-muted group-hover:bg-background transition-colors">
          {getTypeIcon()}
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-medium leading-none truncate mb-1">
            {resource.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
            {resource.description || "No description provided"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <Badge variant="secondary" className="hidden sm:flex text-[10px] uppercase font-bold tracking-tight">
          {resource.type}
        </Badge>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild className="size-8">
            <Link href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" />
            </Link>
          </Button>

          {right && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDialogOpen(true)}
              className="size-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-base">Delete Resource</DialogTitle>
            <DialogDescription className="text-xs">
              Are you sure you want to delete <span className="font-semibold text-foreground">{resource.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 size-3 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceCard;
