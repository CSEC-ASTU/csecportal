"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { useGetMemberByIdQuery } from "@/lib/features/api";
import {
  Mail, Phone, BookOpen, MapPin, Github,
  Calendar, Key, Shield, Info
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function SeeProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const memberId = useSelector((state: RootState) => state?.auth?.user.id);
  const { data: members, isLoading: memberLoading } = useGetMemberByIdQuery(memberId);
  const member = (members as any)?.data;

  if (memberLoading) {
    return (
      <div className="w-full p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 gap-6 pt-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      </div>
    );
  }

  if (!member) return <div className="p-10 text-center text-muted-foreground">Member not found.</div>;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "academic", label: "Academic" },
    { id: "skills", label: "Skills", hide: !member.skills?.length },
    { id: "notes", label: "Admin Notes", hide: !member.note },
  ];

  return (
    <div className="w-full mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">{member.fullName || "Member Profile"}</h1>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
        <Badge variant={member.status === "ACTIVE" ? "default" : "secondary"}>
          {member.status}
        </Badge>
      </div>

      {/* Navigation (Matching your Header Style) */}
      <div className="border-b flex space-x-8">
        {tabs.filter(t => !t.hide).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary -mb-[px]"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="pt-4">
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InfoRow icon={Mail} label="Email Address" value={member.email} />
            <InfoRow icon={Phone} label="Phone Number" value={member.contact} />
            <InfoRow icon={MapPin} label="Address" value={member.firstAddress} />
            <InfoRow icon={Key} label="Student ID" value={member.studentId} />
            <InfoRow icon={Github} label="Github ID" value={member.gmailId} />
          </div>
        )}

        {activeTab === "academic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InfoRow icon={BookOpen} label="Field of Study" value={member.fieldOfStudy} />
            <InfoRow icon={Calendar} label="Graduation Year" value={member.expectedGenerationYear} />
            <InfoRow icon={Calendar} label="Discovered Date" value={formatDate(member.discoveredDate)} />
            {member.githubProfile && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Github Profile</p>
                <a href={member.githubProfile} target="_blank" className="text-sm text-primary hover:underline block truncate">
                  {member.githubProfile}
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="flex flex-wrap gap-2">
            {member.skills?.map((skill: string) => (
              <Badge key={skill} variant="outline" className="px-3 py-1">{skill}</Badge>
            ))}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="bg-muted/30 p-4 rounded-lg border border-dashed">
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {member.note}
            </p>
          </div>
        )}
      </div>

      {/* Withdrawal Alert Section */}
      {member.status === "WITHDRAWN" && (
        <div className="mt-12 p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          <div className="flex items-center gap-2 text-destructive mb-2">
            <Shield className="size-4" />
            <span className="font-semibold text-sm">Withdrawal Information</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{member.note}</p>
          <div className="grid grid-cols-2 gap-4 border-t border-destructive/10 pt-4">
            <InfoRow icon={Calendar} label="Removal Date" value={formatDate(member.removedFromDivisionAt)} />
            <InfoRow icon={Info} label="Reason" value={member.divisionRemovalReason} />
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for clean rows
function InfoRow({ icon: Icon, label, value }: { icon: any, label: string, value: string | null }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium">{value || "—"}</p>
    </div>
  );
}
