"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resourceDataSchema } from "@/lib/validations/user-profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";

type ResourceData = z.infer<typeof resourceDataSchema>;

export default function EditProfileResources() {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);

  const form = useForm<ResourceData>({
    resolver: zodResolver(resourceDataSchema),
    defaultValues: {
      resourceName: "",
      resourceLink: "",
    },
  });

  const onSubmit = (data: ResourceData) => {
    setResourceData((prev) => [...prev, data]);
    form.reset();
  };

  return (
    <div className="size-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Added Resources</h2>

      {resourceData.length > 0 ? (
        <div className="flex flex-col gap-2">
          {resourceData.map((el, i: number) => (
            <div
              key={i}
              className="w-full flex justify-between items-center p-3 rounded-md bg-muted border"
            >
              <span className="font-medium">{el.resourceName}</span>
              <a
                href={el.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {el.resourceLink}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No resources added yet.</p>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 p-4 border rounded-md"
        >
          <div className="w-full flex flex-wrap gap-4">
            <FormInput
              form={form}
              is_full={false}
              name="resourceName"
              placeholder="Resource Name"
              type="text"
            />
            <FormInput
              form={form}
              is_full={false}
              name="resourceLink"
              placeholder="Resource Link"
              type="text"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit">Add Resource</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
