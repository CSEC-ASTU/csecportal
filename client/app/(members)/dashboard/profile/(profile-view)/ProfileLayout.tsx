"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  NotepadText,
  SquareChartGantt,
  User,
  PencilLine,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const paths = pathName.split("/").filter(Boolean);

  const navLinks = [
    { href: "/dashboard/profile", label: "Profile", icon: User, active: paths[2] === undefined },
    { href: "/dashboard/profile/attendance", label: "Attendance", icon: Calendar, active: paths[2] === "attendance" },
    { href: "/dashboard/profile/progress", label: "Progress", icon: SquareChartGantt, active: paths[2] === "progress" },
    { href: "/dashboard/profile/heads-up", label: "Heads Up", icon: NotepadText, active: paths[2] === "heads-up" },
  ];

  return (
    <div className="w-full mx-auto py-6 space-y-8">
      <ProfileUpper
        name="Klaus Mikaelson"
        role="Original Vampire"
        seen="two days ago"
        completion={23}
      />

      <div className="border-b flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`flex items-center gap-2 py-3 text-sm font-medium transition-all relative ${
              link.active
                ? "text-primary border-b-2 border-primary -mb-[2px]"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <link.icon className="size-4" />
            {link.label}
          </Link>
        ))}
      </div>

      <main className="w-full">
        {children}
      </main>
    </div>
  );
}

function ProfileUpper({ name, role, seen, completion }: { name: string; role: string; seen: string; completion: number }) {
  const isActive = true;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex items-center gap-6">
        <Avatar className="size-24 border">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{name}</h1>
            <Badge variant={isActive ? "outline" : "secondary"} className={isActive ? "text-emerald-600 border-emerald-200 bg-emerald-50" : ""}>
              {isActive ? "Active Member" : "Previous"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {role} • Last seen {seen}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-32 bg-muted rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{completion}% complete</span>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" asChild>
        <Link href="/dashboard/profile/edit">
          Edit Profile
        </Link>
      </Button>
    </div>
  );
}

function Button({ variant, size, className, children, asChild: _asChild, ...props }: any) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border";
  const variants: any = {
    outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizes: any = {
    sm: "h-9 px-3",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
