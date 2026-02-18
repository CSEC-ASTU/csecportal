/*   */
"use client";
import React from "react";
import Add from "@/components/Add";
import { RootState } from "@/lib/features/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Check, Filter } from "lucide-react";
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

import AddRolePopup from "./AddRolePopup";
import AddHeadPopup from "./AddHeadPopup";

interface IViewType {
  view: string;
}
export default function SessionEventActions({ view }: IViewType) {
  return (
    <div className="flex items-center gap-2">
      <ViewAction view={view} />
    </div>
  );
}

export function ViewAction({ view }: IViewType) {
  const userRole = useSelector((state: RootState) => state.user.role);
  const allowedRoles = ["President", "Vice President", "Admin"];
  const [filter, setFilter] = React.useState<string>("");
  const filterOptions = ["All", "Active", "Inactive"];

  return (
    <div className="flex items-center gap-2">
      <Popover>
        {allowedRoles.includes(userRole) && (
          <PopoverTrigger asChild>
            {(view === "heads" && (
              <Add Popup={AddHeadPopup} title={"Add Head"} />
            )) ||
              (view === "roles" && (
                <Add Popup={AddRolePopup} title={"Add Role"} />
              ))}
          </PopoverTrigger>
        )}
      </Popover>
      {(view === "roles" || view === "heads") && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded="false"
              className="flex items-center gap-2"
            >
              <Filter className="h-5 w-5 lg:h-6 lg:w-6" />
              <span className="hidden lg:block text-sm lg:text-base">
                {filter || "Filter"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {filterOptions.map((option) => (
                    <CommandItem
                      key={option}
                      onSelect={() => setFilter(option)}
                    >
                      {option}
                      <Check
                        className={cn(
                          "ml-auto",
                          filter === option ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
