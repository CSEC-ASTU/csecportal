/*   */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { requiredInformationSchema } from "@/lib/validations/user-profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";

const initialRequiredData = {
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
};

export default function EditRequiredInformation() {
  const form = useForm<z.infer<typeof requiredInformationSchema>>({
    resolver: zodResolver(requiredInformationSchema),
    defaultValues: initialRequiredData,
  });
  const onSubmit = async function (data: any) {
    console.log(data);
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
            placeholder={"Enter your first name"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"last_name"}
            placeholder={"Enter your last name"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"mobile_number"}
            placeholder={"Enter your mobile number"}
            type="tel"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"email_address"}
            placeholder={"Enter your email address"}
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
            placeholder={"Enter your GitHub username"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"telegram_handle"}
            placeholder={"Enter your Telegram handle"}
            type="text"
          />

          <FormInput
            form={form}
            is_full={false}
            name={"graduation_year"}
            placeholder={"Enter your graduation year"}
            type="number"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"outline"}>Cancel</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
