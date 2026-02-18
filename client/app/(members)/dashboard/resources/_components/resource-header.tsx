"use client";

import Filter from "@/components/filter";
import { Input } from "@/components/ui/input";
import { setSearch } from "@/lib/features/slices/events";
import { RootState } from "@/lib/features/store";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddResourcePopup from "../../administration/_components/_head-administrations/main/modals/add-resources";

interface IResourceHeader {
  look: boolean;
}

export default function ResourcesHeader({ look }: IResourceHeader) {
  return (
    <div className="w-full h-full flex flex-col">
      {look && (
        <div className="w-full h-[50%] text-base font-bold tracking-[1px] lg:text-xl flex justify-between items-center">
          <h2>Resources</h2>
        </div>
      )}

      <div
        className={`${
          look ? "h-[50%]" : "h-full"
        } w-full  flex items-center justify-between`}
      >
        <ResourcesInput />
        <div className="flex items-center gap-3">
          <Filter />
          {look && <AddResourcePopup />}
        </div>
      </div>
    </div>
  );
}

export const ResourcesInput = function () {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.pagination?.search);

  return (
    <form className="relative w-64 lg:w-96 h-8 lg:h-10">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text2 w-5 h-5" />
      <Input
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="w-full h-full pl-10 pr-4 rounded-md border border-border bg-background text-text2"
        placeholder="Search"
      />
    </form>
  );
};
