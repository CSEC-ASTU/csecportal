"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import CommunityThemeToggle from "@/components/community-theme-toggle";
import CSECASTULogo from "@/components/Logo";

export const CommunityHeader = function () {
  const router = useRouter();

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "How to Join", href: "/how-to-join" },
    { label: "Articles", href: "/articles" },
    { label: "Events", href: "/events" },
  ];

  return (
    <header className="w-full bg-transparent py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CSECASTULogo />
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <CommunityThemeToggle />
          <Button variant="outline" onClick={() => router.push("/login")}>
            Login
          </Button>
        </div>

        {/* Mobile Sheet Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-lg">Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-4 items-start">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
