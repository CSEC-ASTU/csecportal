"use client";

import { motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SessionEventViewType from "./View";
import { Input } from "@/components/ui/input";
import { RootState } from "@/lib/features/store";
import { setSearch } from "@/lib/features/slices/events";
import Filter from "@/components/filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISessionEventsHeader {
  type: "event" | "session";
  viewType: string;
  setViewType: (val: string) => void;
  setType: (val: "event" | "session") => void;
}

export default function SessionEventsHeader({
  type,
  setType,
  setViewType,
  viewType,
}: ISessionEventsHeader) {
  const dispatch = useDispatch();
  const input = useSelector((state: RootState) => state?.pagination.search);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full py-6 space-y-6"
    >
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {/* View type toggle (e.g., table/list view) */}
          <SessionEventViewType view={viewType} setView={setViewType} />

          {/* Select dropdown for event/session */}
          <motion.div whileHover={{ scale: 1.02 }} className="w-[150px]">
            <Select
              value={type}
              onValueChange={(val: "event" | "session") => setType(val)}
            >
              <SelectTrigger className="bg-background border-border shadow-sm focus:ring-2 focus:ring-primary text-sm">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="session">Session</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <EventSessionInput
          type={type}
          inputValue={input}
          setInputValue={(val: string) => dispatch(setSearch(val))}
        />
        <Filter />
      </div>
    </motion.div>
  );
}

interface IEventSessionInput {
  type: string;
  inputValue: string;
  setInputValue: (val: string) => void;
}

export const EventSessionInput = function ({
  type,
  inputValue,
  setInputValue,
}: IEventSessionInput) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/dashboard/search?query=${inputValue}`);
      setInputValue("");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <motion.form
      whileHover={{ scale: 1.01 }}
      whileFocus={{ scale: 1.01 }}
      className="relative flex-1 w-full max-w-2xl"
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors duration-200" />
        <Input
          value={inputValue}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-background/80 backdrop-blur-md text-foreground transition-all duration-200
                     focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none focus:shadow-lg"
          placeholder={`Search ${type === "event" ? "Events" : "Sessions"}`}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-primary opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          Search
        </motion.button>
      </div>
    </motion.form>
  );
};
