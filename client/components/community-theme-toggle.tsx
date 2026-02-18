"use client";
import React, { useEffect } from "react";
import { Moon, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setTheme } from "@/lib/features/slices/theme";

export default function CommunityThemeToggle() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      dispatch(setTheme(storedTheme));
    }
  }, [dispatch]);

  const toggleTheme = () => {
    dispatch(setTheme(!isDarkMode));
    localStorage.setItem("theme", JSON.stringify(!isDarkMode));
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <SunMoon className="size-5 text-primary" />
      ) : (
        <Moon className="size-5 text-primary" />
      )}
    </Button>
  );
}
