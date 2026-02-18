import React from "react";
import { PencilLine, Trash2 } from "lucide-react"; // Example icons, replace with your icon library
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IMember {
  id: string;
  role: string;
  status: "Active" | "Inactive";
  permissions: string[];
}

interface IMember {
  id: string;
  role: string;
  status: "Active" | "Inactive";
  permissions: string[];
}
const member: IMember[] = [
  {
    id: "1",
    role: "Vice President",
    status: "Active",
    permissions: [
      "Add Members",
      "Manage Members",
      "Schedule Sessions",
      "Create A Division",
    ],
  },
  {
    id: "2",
    role: "Dev Head",
    status: "Active",
    permissions: [
      "Upload Resources",
      "Manage Members",
      "Schedule Sessions",
      "Mark Attendance",
    ],
  },
  {
    id: "3",
    role: "CBD President",
    status: "Inactive",
    permissions: ["Schedule Sessions", "View All Division"],
  },
];

export default function Roles() {
  return (
    <div className="space-y-4">
      {member.map((member) => (
        <Card
          key={member.id}
          className="border border-border bg-card shadow-sm rounded-lg"
        >
          <CardHeader className="flex justify-between items-center ">
            <div className="flex items-center gap-4">
              <Badge
                className="px-3 py-1 rounded-md"
                variant={member.status === "Active" ? "green" : "red"}
              >
                {member.status}
              </Badge>
              <h3 className="text-lg font-bold text-foreground">
                {member.role}
              </h3>
            </div>

            <div className="flex ">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted focus:ring-2 focus:ring-muted-foreground"
                aria-label="Edit"
              >
                <PencilLine className="w-5 h-5 text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted focus:ring-2 focus:ring-muted-foreground"
                aria-label="Delete"
              >
                <Trash2 className="w-5 h-5 text-foreground" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-w-[435px]">
            <h4 className="text-sm font-medium text-foreground mb-3">
              Permissions
            </h4>
            <div className="flex flex-wrap gap-3">
              {member.permissions.map((permission, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border border-muted-background px-3 py-1 rounded-md"
                >
                  {permission}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
