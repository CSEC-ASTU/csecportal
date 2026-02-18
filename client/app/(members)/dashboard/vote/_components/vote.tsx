"use client";

import Result from "./result";
import VoteNow from "./vote-now";
import VoteOverview from "./vote-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Vote() {
  return (
    <div className="size-full flex flex-col items-start justify-between">
      <h2 className="text-xl lg:text-3xl font-bold uppercase tracking-wider text-neutral-800">
        Vote for 2025 CSEC ASTU Executive Members
      </h2>

      <Tabs defaultValue="candidates" className="w-full h-[90%]">
        <TabsList className="w-full">
          <TabsTrigger
            value="candidates"
            className="data-[state=active]:text-blue-600 data-[state=active]:font-semibold"
          >
            All Candidates
          </TabsTrigger>
          <TabsTrigger
            value="vote"
            className="data-[state=active]:text-blue-600 data-[state=active]:font-semibold"
          >
            Vote
          </TabsTrigger>
          <TabsTrigger
            value="result"
            className="data-[state=active]:text-blue-600 data-[state=active]:font-semibold"
          >
            Result
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candidates" className="size-full">
          <VoteOverview />
        </TabsContent>

        <TabsContent value="vote" className="size-full">
          <VoteNow />
        </TabsContent>

        <TabsContent value="result" className="size-full">
          <Result />
        </TabsContent>
      </Tabs>
    </div>
  );
}
