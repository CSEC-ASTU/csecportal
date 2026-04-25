import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllDivisionsQuery,
  useGetGroupsByDivisionQuery,
  useInviteMemberMutation,
} from "@/lib/features/api";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const newMemberValidation = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Please enter at least first and last name",
    }),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormType = z.infer<typeof newMemberValidation>;

export default function AddNewMembers() {
  const [selectedDivision, setSelectedDivision] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: divisionResponse, isLoading: isDivisionsLoading } =
    useGetAllDivisionsQuery();
  const divisions = divisionResponse ?? [];

  const { data: groupResponse, isLoading: isGroupsLoading } =
    useGetGroupsByDivisionQuery(selectedDivision?.id || "", {
      skip: !selectedDivision?.id,
    });
  const groups = groupResponse?.data ?? [];

  const [inviteMember, { isLoading: isAdding }] = useInviteMemberMutation();

  const form = useForm<SignupFormType>({
    resolver: zodResolver(newMemberValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-10);
    form.setValue("password", randomPassword);
    toast.success("Password generated");
  };

  const onSubmit = async (formData: SignupFormType) => {
    if (!selectedDivision?.id || !selectedGroup?.id) {
      toast.error("Please select both division and group");
      return;
    }

    try {
      const [freeName, ...lastParts] = formData.fullName.trim().split(" ");
      const lastName = lastParts.join(" ");

      await inviteMember({
        email: formData.email,
        password: formData.password,
        freeName,
        lastName,
        divisionId: selectedDivision.id,
        groupId: selectedGroup.id,
        studentId: "ugr/302020/14", // TODO: Make this dynamic
      }).unwrap();

      toast.success("Member added successfully");
      form.reset();
      setSelectedDivision(null);
      setSelectedGroup(null);
    } catch {
      toast.error("Failed to add member");
    }
  };

  return (
    <div className="w-full mx-auto p-3 lg:p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text1 mb-1">Add New Member</h1>
        <p className="text-text2 text-sm">Invite new members to the club</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Division & Group */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormLabel className="text-sm text-text2">Division</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selected = divisions.find((d: any) => d.id === value);
                  if (selected) {
                    setSelectedDivision({ id: selected.id, name: selected.name });
                    setSelectedGroup(null);
                  }
                }}
                value={selectedDivision?.id}
                disabled={isDivisionsLoading}
              >
                <SelectTrigger>
                    <SelectValue placeholder="Select a division" />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((d: any) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <FormLabel className="text-sm text-text2">Group</FormLabel>
              <Select
                onValueChange={(value) => {
                  const selected = groups.find((g: any) => g.id === value);
                  if (selected) {
                    setSelectedGroup({ id: selected.id, name: selected.name });
                  }
                }}
                value={selectedGroup?.id}
                disabled={!selectedDivision || isGroupsLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      !selectedDivision
                        ? "Select division first"
                        : "Select group"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((g: any) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                  {!isGroupsLoading && groups.length === 0 && selectedDivision && (
                    <SelectItem disabled value="no-groups">
                      No groups found — creating default groups
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Small status / preview line for UX */}
          <div className="mt-2 text-sm text-text2">
            {!selectedDivision && <div>Select a division to load groups.</div>}
            {selectedDivision && isGroupsLoading && <div>Loading groups...</div>}
            {selectedDivision && !isGroupsLoading && groups.length === 0 && (
              <div>No groups found — default groups were created for this division.</div>
            )}
            {selectedDivision && selectedGroup && (
              <div>
                Selected: <strong className="text-text1">{selectedDivision.name}</strong> — <strong className="text-text1">{selectedGroup.name}</strong>
              </div>
            )}
          </div>

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm text-text2">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm text-text2">Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm text-text2">Password</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Secure password" type="text" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={generatePassword}
                    className="gap-2 whitespace-nowrap"
                  >
                    Generate
                  </Button>
                </div>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.reset();
                setSelectedDivision(null);
                setSelectedGroup(null);
              }}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Invite Member"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
