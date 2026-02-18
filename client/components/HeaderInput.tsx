"use client";

import {
  SearchIcon,
  Calendar,
  Users,
  FileText,
  MapPin,
  List,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Define category options with icons
const CATEGORIES = [
  { value: "all", label: "All", icon: List },
  { value: "events", label: "Events", icon: Calendar },
  { value: "sessions", label: "Sessions", icon: FileText },
  { value: "users", label: "Users", icon: Users },
  { value: "venues", label: "Venues", icon: MapPin },
] as const;

type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const HeaderInput = function () {
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState<CategoryValue>("all");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(
        `/dashboard/search?query=${encodeURIComponent(
          inputValue
        )}&category=${category}`
      );
    } else {
      router.push(`/dashboard/search?category=${category}`);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center w-full max-w-2xl">
      <div>
        <Select
          value={category}
          onValueChange={(val) => setCategory(val as CategoryValue)}
        >
          <SelectTrigger className="h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SelectValue
              placeholder="Select category"
              className="flex items-center gap-2"
            />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                <div className="flex items-center gap-2">
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex-1 relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-10 pl-10 pr-24 rounded-lg border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none"
            placeholder={`Search ${
              category === "all" ? "everything" : category
            }...`}
          />
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-4 flex items-center gap-1"
          >
            <SearchIcon className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
