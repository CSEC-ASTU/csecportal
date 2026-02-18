"use client";
import React, { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { setTheme } from "@/lib/features/slices/theme";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      dispatch(setTheme(JSON.parse(storedTheme)));
    }
  }, [dispatch]);

  return (
    <div className="relative w-full flex items-center justify-center gap-1 p-1 rounded-full bg-gradient-to-r from-[#00308710] to-[#0051ba10] backdrop-blur-sm">
      {/* Animated background indicator */}
      <div
        className={`absolute left-1 h-9 w-[calc(50%-0.25rem)] bg-[#003087] rounded-full transition-all duration-500 ease-in-out ${
          isDarkMode ? "translate-x-[calc(100%+0.25rem)]" : ""
        }`}
      />

      <Button
        onClick={() => dispatch(setTheme(false))}
        variant="ghost"
        size="sm"
        className={`relative z-10 flex-1 flex items-center gap-2 transition-all ${
          !isDarkMode ? "text-white" : "text-[#003087] hover:text-[#003087]"
        }`}
      >
        <Sun
          className={`size-5 transition-transform ${
            !isDarkMode ? "scale-110" : "scale-100"
          }`}
        />
        <span className="font-medium">Light</span>
      </Button>

      <Button
        onClick={() => dispatch(setTheme(true))}
        variant="ghost"
        size="sm"
        className={`relative z-10 flex-1 flex items-center gap-2 transition-all ${
          isDarkMode ? "text-white" : "text-[#003087] hover:text-[#003087]"
        }`}
      >
        <Moon
          className={`size-5 transition-transform ${
            isDarkMode ? "scale-110" : "scale-100"
          }`}
        />
        <span className="font-medium">Dark</span>
      </Button>
    </div>
  );
}
