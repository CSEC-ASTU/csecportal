import React from "react";
import { PencilLine, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const data = [
  {
    id: "1",
    name: "Darlene Robertson",
    division: "CPD",
    role: "Head",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "2",
    name: "Floyd Miles",
    division: "Development",
    role: "Head",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "3",
    name: "Dianne Russell",
    division: "Cyber",
    role: "Head",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "4",
    name: "Cody Fisher",
    division: "Data Science",
    role: "Head",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: "5",
    name: "Jacob Jones",
    division: "All",
    role: "Vice President",
    avatar: "https://via.placeholder.com/40",
  },
];

export default function Heads() {
  return (
    <Card className=" gap-3">
      <CardHeader className="grid grid-cols-4 lg:grid-cols-6 gap-5 border-b border-border">
        <span className="text-sm font-medium text-muted-foreground lg:col-span-3">
          Member Name
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          Division
        </span>
        <span className="text-sm font-medium text-muted-foreground">Role</span>
        <span className="text-sm font-medium text-muted-foreground ">
          Action
        </span>
      </CardHeader>

      <CardContent className="divide-y divide-border">
        {data.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-4 lg:grid-cols-6 gap-5 items-center"
          >
            <div className="flex items-center space-x-4 lg:col-span-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-md  text-foreground">{member.name}</span>
            </div>

            <span className="text-md text-foreground">{member.division}</span>

            <span className="text-md text-foreground">{member.role}</span>

            <div className="flex ">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted focus:ring-2 focus:ring-muted-foreground"
                aria-label="Edit"
              >
                <PencilLine className="w-4 h-4 text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted focus:ring-2 focus:ring-muted-foreground"
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4 text-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
