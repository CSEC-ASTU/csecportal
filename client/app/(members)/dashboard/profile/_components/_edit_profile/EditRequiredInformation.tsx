/*   */
"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { requiredInformationSchema } from "@/lib/validations/user-profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { useGetMemberByIdQuery, useUpdateOwnProfileMutation } from "@/lib/features/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditRequiredInformation({ onNext }: { onNext?: () => void }) {
  const router = useRouter();
  const memberId = useSelector((state: RootState) => state?.auth?.user?.id);
  const { data: memberData } = useGetMemberByIdQuery(memberId);
  const member = (memberData as any)?.data;
  const [updateProfile, { isLoading }] = useUpdateOwnProfileMutation();

  const form = useForm<z.infer<typeof requiredInformationSchema>>({
    resolver: zodResolver(requiredInformationSchema),
    defaultValues: {
      image: "",
      first_name: "",
      last_name: "",
      mobile_number: "",
      email_address: "",
      date_of_birth: "",
      github: "",
      gender: "",
      telegram_handle: "",
      graduation_year: new Date().getFullYear(),
      specialization: [],
      department: "",
      mentor: "",
    },
  });

  // Pre-fill form with existing profile data
  useEffect(() => {
    if (!member) return;
    const nameParts = (member.freeName || "").split(" ");
    form.reset({
      image: member.profileImage || "",
      first_name: nameParts[0] || "",
      last_name: nameParts.slice(1).join(" ") || "",
      mobile_number: member.contact || "",
      email_address: member.email || "",
      date_of_birth: "",
      github: member.githubProfile || "",
      gender: "",
      telegram_handle: member.note || "",
      graduation_year: member.expectedGenerationYear
        ? Number(member.expectedGenerationYear)
        : new Date().getFullYear(),
      specialization: member.skills || [],
      department: member.fieldOfStudy || "",
      mentor: "",
    });
  }, [member]);

  const onSubmit = async (data: z.infer<typeof requiredInformationSchema>) => {
    try {
      const payload: Record<string, any> = {
        freeName: `${data.first_name} ${data.last_name}`.trim(),
        phoneNumber: data.mobile_number,
        github: data.github,
        telegram: data.telegram_handle,
      };
      if (data.image) payload.profileImage = data.image;
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully");
      onNext?.();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="size-full overflow-auto flex flex-col gap-4 items-end p-4"
      >
        <div className="w-full flex justify-between flex-wrap gap-y-7">
          <FormInput
            form={form}
            is_full={true}
            name={"image"}
            placeholder={"Upload your profile picture"}
            type="image"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"first_name"}
            placeholder={member?.freeName?.split(" ")[0] || "Enter your first name"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"last_name"}
            placeholder={member?.freeName?.split(" ").slice(1).join(" ") || "Enter your last name"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"mobile_number"}
            placeholder={member?.contact || "Enter your mobile number"}
            type="tel"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"email_address"}
            placeholder={member?.email || "Enter your email address"}
            type="email"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"date_of_birth"}
            placeholder={"Select your date of birth"}
            type="date"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"github"}
            placeholder={member?.githubProfile || "Enter your GitHub username"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"telegram_handle"}
            placeholder={member?.note || "Enter your Telegram handle"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"graduation_year"}
            placeholder={member?.expectedGenerationYear?.toString() || "Enter your graduation year"}
            type="number"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"outline"} type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Next"}</Button>
        </div>
      </form>
    </Form>
  );
}
