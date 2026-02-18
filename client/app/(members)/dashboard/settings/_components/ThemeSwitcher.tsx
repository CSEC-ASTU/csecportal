"use client";

import React, { useEffect, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setTheme } from "@/lib/features/slices/theme";

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDark);

  // Wrap applySystemTheme in useCallback to ensure a stable reference
  const applySystemTheme = useCallback(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    dispatch(setTheme(prefersDark));
  }, [dispatch]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === null) {
      applySystemTheme();
    } else {
      dispatch(setTheme(JSON.parse(storedTheme)));
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applySystemTheme();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [dispatch, applySystemTheme]);

  const handleSetTheme = (theme: "light" | "dark" | "system") => {
    if (theme === "light") {
      dispatch(setTheme(false)); // Light mode
      localStorage.setItem("theme", JSON.stringify(false));
    } else if (theme === "dark") {
      dispatch(setTheme(true)); // Dark mode
      localStorage.setItem("theme", JSON.stringify(true));
    } else {
      localStorage.removeItem("theme");
      applySystemTheme(); 
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1 w-28 justify-between"
        >
          {isDarkMode ? "Dark" : "Light"}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem onClick={() => handleSetTheme("light")}>
          <div className="flex items-center gap-2">
            <span>Light</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("dark")}>
          <div className="flex items-center gap-2">
            <span>Dark</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("system")}>
          <div className="flex items-center gap-2">
            <span>System</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
