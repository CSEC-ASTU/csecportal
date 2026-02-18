/*   */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { optionalInformationSchema } from "@/lib/validations/user-profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";

export default function EditOptionalInformation() {
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

  const onSubmit = async function (data: any) {
    console.log("Submitted Optional Info:", data);
    // You can also handle API call or state update here
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
            placeholder="LinkedIn account"
            type="text"
          />
          <FormInput
            form={form}
            is_full={false}
            name="codeforce_handle"
            placeholder="Codeforces handle"
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
            placeholder="University ID"
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
            placeholder="Your bio"
            type="textarea"
          />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
