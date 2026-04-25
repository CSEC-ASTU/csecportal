"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/features/slices/auth";
import { useLogoutMutation } from "@/lib/features/api";
import { RootState } from "@/lib/features/store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell, ChevronDown } from "lucide-react";
import { HeaderInput } from "./HeaderInput";

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [backendLogout] = useLogoutMutation();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    await backendLogout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background h-16 ">
      <div className="flex h-full items-center justify-between">
        {/* Left Side: Breadcrumbs */}
        <HeaderInfo />

        {/* Right Side: Tools & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block">
            <HeaderInput />
          </div>

          <div className="h-6 w-[1px] bg-border mx-1 hidden md:block" />

          <HeaderProfile
            name={mounted ? user?.freeName || "User" : "User"}
            role={mounted ? user?.role || "Member" : "Member"}
            image={mounted ? (user?.profileImage || user?.profilePic || user?.avatar) : undefined}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

const HeaderInfo = () => {
  const pathName = usePathname();
  const paths = pathName.split("/").filter(Boolean);
  const displayPaths = paths[0] === "dashboard" ? paths.slice(1) : paths;

  const formatSegment = (segment: string) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  let cumulativePath = "/dashboard";

  return (
    <Breadcrumb className="hidden sm:block">
      <BreadcrumbList>
        {displayPaths.map((segment, i) => {
          cumulativePath += `/${segment}`;
          const isLast = i === displayPaths.length - 1;
          return (
            <React.Fragment key={segment}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={cumulativePath}
                  className={`text-sm font-medium ${isLast ? "text-foreground" : "text-muted-foreground hover:text-primary"}`}
                >
                  {formatSegment(segment)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};



const HeaderProfile = ({ name, role, image, onLogout }: { name: string; role: string; image?: string; onLogout: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-3 outline-none group">
        <div className="flex flex-col items-end hidden md:flex">
          <span className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">{name}</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{role}</span>
        </div>
        <Avatar className="size-9 border transition-all group-hover:border-primary/50">
          <AvatarImage src={image ? image : "https://github.com/shadcn.png"} />
          <AvatarFallback className="text-xs">{(name && name.length) ? name.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-52 mt-2">
      <DropdownMenuItem asChild className="cursor-pointer">
        <Link href="/dashboard/profile" className="flex items-center">
          <User className="mr-2 size-4" />
          <span>My Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout} className="text-destructive focus:bg-destructive/5 focus:text-destructive cursor-pointer">
        <LogOut className="mr-2 size-4" />
        <span>Logout</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
