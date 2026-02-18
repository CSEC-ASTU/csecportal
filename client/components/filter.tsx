"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { Button } from "@/components/ui/button";
import { Check, FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { setSort } from "@/lib/features/slices/events";

export default function Filter() {
  return (
    <div className="flex items-center gap-2">
      <FilterData />
    </div>
  );
}

export function FilterData() {
  const sort = useSelector((state: RootState) => state.pagination.sort); // "asc" or "desc"
  const dispatch = useDispatch();

  const handleSortChange = (value: "asc" | "desc") => {
    dispatch(setSort(value));
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded="false"
            className=""
          >
            <span className="hidden lg:block text-sm font-thin">
              {sort === "desc" ? "Newest to Oldest" : "Oldest to Newest"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem onSelect={() => handleSortChange("desc")}>
                  Newest to Oldest
                  <Check
                    className={cn(
                      "ml-auto",
                      sort === "desc" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
                <CommandItem onSelect={() => handleSortChange("asc")}>
                  Oldest to Newest
                  <Check
                    className={cn(
                      "ml-auto",
                      sort === "asc" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
