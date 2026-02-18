"use client";

import {
  Mail,
  Info,
  Github,
  Phone,
  BookOpen,
  MapPin,
  Shield,
  Calendar,
  Key,
} from "lucide-react";
import React from "react";
import { useGetMemberByIdQuery } from "@/lib/features/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface IMemberId {
  memberId: string;
}

export default function SeeProfile({ memberId }: IMemberId) {
  const { data: members, isLoading: memberLoading } =
    useGetMemberByIdQuery(memberId);
  const member = (members as any)?.data;

  if (memberLoading) {
    return (
      <div className="w-full  mx-auto p-6 space-y-8">
        <div className="flex items-center gap-6 animate-pulse">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-9 w-56" />
            <div className="flex gap-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-5 p-6 border rounded-xl">
              <Skeleton className="h-6 w-36" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="w-full  mx-auto p-6">
        <div className="p-6 rounded-xl border text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Member not found or data unavailable
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | null;
  }) => (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <p className="font-medium text-foreground">{value || "Not specified"}</p>
    </div>
  );

  const Section = ({ children }: { children: React.ReactNode }) => (
    <div className="p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );

  return (
    <div className="w-full  mx-auto p-6 space-y-6">
      {member.status === "WITHDRAWN" && (
        <div className="p-5 rounded-2xl border bg-muted">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-background border">
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">
                Member Withdrawal Notice
              </h3>
              <p className="text-muted-foreground">
                {member.note || "No withdrawal note provided"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <InfoItem
                  icon={Calendar}
                  label="Removed on"
                  value={formatDate(member.removedFromDivisionAt)}
                />
                <InfoItem
                  icon={Shield}
                  label="Reason"
                  value={member.divisionRemovalReason}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-muted p-1 rounded-full flex w-full justify-start">
          <TabsTrigger value="personal" className="rounded-full px-4 py-2">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="academic" className="rounded-full px-4 py-2">
            Academic
          </TabsTrigger>
          {member.skills?.length > 0 && (
            <TabsTrigger value="skills" className="rounded-full px-4 py-2">
              Skills
            </TabsTrigger>
          )}
          {member.note && (
            <TabsTrigger value="notes" className="rounded-full px-4 py-2">
              Admin Notes
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="personal">
          <Section>
            <InfoItem icon={Mail} label="Email" value={member.email} />
            <InfoItem
              icon={Mail}
              label="Alternate Email"
              value={member.alternateEmail}
            />
            <InfoItem icon={Phone} label="Contact" value={member.contact} />
            <InfoItem
              icon={MapPin}
              label="Address"
              value={member.firstAddress}
            />
            <InfoItem icon={Key} label="Student ID" value={member.studentId} />
            <InfoItem icon={Github} label="Gmail ID" value={member.gmailId} />
          </Section>
        </TabsContent>

        <TabsContent
          value="academic"
          className="bg-primary/[.05] dark:bg-primary/[.05]"
        >
          <Section>
            <InfoItem
              icon={BookOpen}
              label="Field of Study"
              value={member.fieldOfStudy}
            />
            <InfoItem
              icon={Calendar}
              label="Expected Graduation"
              value={member.expectedGenerationYear}
            />
            <InfoItem
              icon={Calendar}
              label="Discovered Date"
              value={formatDate(member.discoveredDate)}
            />
            {member.githubProfile && (
              <div className="col-span-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Github className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </div>
                <a
                  href={member.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {member.githubProfile}
                </a>
              </div>
            )}
          </Section>
        </TabsContent>

        <TabsContent
          value="skills"
          className="bg-primary/[.05] dark:bg-primary/[.03]"
        >
          <Section>
            <div className="col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="rounded-full">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="notes">
          <Section>
            <div className="col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Notes</span>
              </div>
              <p className="text-muted-foreground whitespace-pre-line">
                {member.note}
              </p>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
