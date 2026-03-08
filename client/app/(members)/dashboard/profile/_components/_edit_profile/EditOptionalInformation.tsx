/*   */
"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { optionalInformationSchema } from "@/lib/validations/user-profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { useGetMemberByIdQuery, useUpdateOwnProfileMutation } from "@/lib/features/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditOptionalInformation({ onNext }: { onNext?: () => void }) {
  const router = useRouter();
  const memberId = useSelector((state: RootState) => state?.auth?.user?.id);
  const { data: memberData } = useGetMemberByIdQuery(memberId);
  const member = (memberData as any)?.data;
  const [updateProfile, { isLoading }] = useUpdateOwnProfileMutation();

  const form = useForm<z.infer<typeof optionalInformationSchema>>({
    resolver: zodResolver(optionalInformationSchema),
    defaultValues: {
      instagram_handle: "",
      bio: "",
      birthdate: "",
      codeforce_handle: "",
      cv: "",
      joining_date: "",
      leetcode: "",
      linkedin_account: "",
      university_id: "",
    },
  });

  // Pre-fill form with existing profile data
  useEffect(() => {
    if (!member) return;
    form.reset({
      instagram_handle: "",
      bio: member.bio || "",
      birthdate: "",
      codeforce_handle: member.supportHandle || "",
      cv: "",
      joining_date: "",
      leetcode: "",
      linkedin_account: "",
      university_id: member.studentId || "",
    });
  }, [member]);

  const onSubmit = async (data: z.infer<typeof optionalInformationSchema>) => {
    try {
      const payload: Record<string, any> = {};
      if (data.bio) payload.bio = data.bio;
      if (data.linkedin_account) payload.linkedin = data.linkedin_account;
      await updateProfile(payload).unwrap();
      toast.success("Optional info updated successfully");
      onNext?.();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 items-end p-4"
      >
        <div className="w-full flex justify-between flex-wrap gap-4">
          <FormInput
            form={form}
            is_full={false}
            name="instagram_handle"
            placeholder="Instagram handle"
            type="text"
          />
          <FormInput
            form={form}
            is_full={false}
            name="linkedin_account"
            placeholder={member?.linkedin || "LinkedIn account"}
            type="text"
          />
          <FormInput
            form={form}
            is_full={false}
            name="codeforce_handle"
            placeholder={member?.supportHandle || "Codeforces handle"}
            type="text"
          />
          <FormInput
            form={form}
            is_full={false}
            name="leetcode"
            placeholder="LeetCode account"
            type="text"
          />
          <FormInput
            form={form}
            is_full={false}
            name="university_id"
            placeholder={member?.studentId || "University ID"}
            type="text"
          />
          <FormInput
            form={form}
            is_full={false}
            name="birthdate"
            placeholder="Birthdate"
            type="date"
          />
          <FormInput
            form={form}
            is_full={false}
            name="joining_date"
            placeholder="Joining Date"
            type="date"
          />
          <FormInput
            form={form}
            is_full={false}
            name="cv"
            placeholder="Link to CV"
            type="text"
          />
          <FormInput
            form={form}
            is_full={true}
            name="bio"
            placeholder={member?.bio || "Your bio"}
            type="textarea"
          />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Next"}</Button>
        </div>
      </form>
    </Form>
  );
}
