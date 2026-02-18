/*   */
"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const roles = [
  { slug: "president", name: "President", total: 2 },
  { slug: "vise-president", name: "Vice President", total: 3 },
  {
    slug: "cpd-head",
    name: "Competitive Programming Division - HEAD",
    total: 1,
  },
  { slug: "dev-head", name: "Development Division - HEAD", total: 5 },
  { slug: "cyber-head", name: "Cyber Security Division - HEAD", total: 2 },
  { slug: "ds-head", name: "Data Science Division - HEAD", total: 3 },
  { slug: "cbd-head", name: "Capacity Building Division - HEAD", total: 2 },
];

const mockCandidates = roles.reduce((acc, role) => {
  acc[role.slug] = Array.from({ length: role.total }, (_, i) => ({
    id: `${role.slug}-candidate-${i + 1}`,
    name: `Candidate ${i + 1}`,
    year: "3rd Year",
    image: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? "men" : "women"
    }/${(i + 1) * 10}.jpg`,
  }));
  return acc;
}, {});

export default function VoteNow() {
  const [isVotingOpen] = useState(true);
  const [selections, setSelections] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const handleSelection = (role: any, candidateId: any) => {
    setSelections((prev) => ({ ...prev, [role]: candidateId }));
  };

  const allSelected = roles.every((role) => selections[role.slug]);
  console.log(allSelected);

  return (
    <div className="w-full h-full flex items-center justify-center py-10 overflow-y-auto">
      {isVotingOpen ? (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-green-700 text-center">
            Voting for 2025 is now open!
          </h2>
          <p className="text-sm text-gray-600 mt-2 text-center mb-10">
            Cast your votes below for your preferred candidates.
          </p>

          <form className="space-y-8">
            {roles.map((role) => (
              <div key={role.slug} className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">
                  {role.name}
                </h3>
                <RadioGroup
                  value={selections[role.slug] || ""}
                  onValueChange={(val) => handleSelection(role.slug, val)}
                  className="flex gap-4 flex-wrap"
                >
                  {mockCandidates[role.slug].map((candidate) => (
                    <label
                      key={candidate?.id}
                      htmlFor={candidate?.id}
                      className="flex items-center space-x-3 border rounded-lg p-3 hover:border-primary cursor-pointer w-[280px]"
                    >
                      <RadioGroupItem
                        value={candidate?.id}
                        id={candidate?.id}
                      />
                      <Image
                        src={candidate?.image || ""}
                        alt={"candidate image"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{candidate?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {candidate?.year}
                        </p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  //   disabled={!allSelected}
                  type="button"
                  onClick={() => setOpenDialog(true)}
                >
                  Review & Submit Vote
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review Your Votes</DialogTitle>
                  <DialogDescription>
                    Double check your selections before final submission.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {roles.map((role) => {
                    const candidateId = selections[role.slug];
                    const candidate = mockCandidates[role.slug].find(
                      (c) => c.id === candidateId
                    );
                    return (
                      <div key={role.slug} className="flex items-center gap-4">
                        <Image
                          src={candidate?.image || ""}
                          alt={candidate?.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{role.name}:</p>
                          <p>
                            {candidate?.name} - {candidate?.year}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => alert("Votes submitted successfully!")}
                  >
                    Submit Vote
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Voting is currently closed
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please check back later when the voting period starts.
          </p>
        </div>
      )}
    </div>
  );
}
