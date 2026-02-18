"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const headValidation = z.object({
  role: z.string().min(1, { message: "Role is required" }),
  division: z.string().min(1, { message: "Division is required" }),
  head: z.string().min(1, { message: "Head is required" }),
});

type HeadFormType = z.infer<typeof headValidation>;

const roles = [
  { value: "head", label: "Head" },
  { value: "vice-president", label: "Vice President" },
  { value: "manager", label: "Manager" },
];

const divisions = [
  { value: "cpd", label: "CPD" },
  { value: "development", label: "Development" },
  { value: "cyber", label: "Cyber" },
  { value: "data-science", label: "Data Science" },
];

const heads = [
  { value: "darlene", label: "Darlene Robertson" },
  { value: "floyd", label: "Floyd Miles" },
  { value: "dianne", label: "Dianne Russell" },
  { value: "cody", label: "Cody Fisher" },
];

export default function AddHeadPopup() {
  const form = useForm<HeadFormType>({
    resolver: zodResolver(headValidation),
    defaultValues: {
      role: "",
      division: "",
      head: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: HeadFormType) => {
    console.log("Form submitted:", data);
  };

  return (
    <DialogContent className="w-[383px] p-6 bg-card rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">
              Add New Head
            </DialogTitle>
          </DialogHeader>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((division) => (
                        <SelectItem key={division.value} value={division.value}>
                          {division.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="head"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Head" />
                    </SelectTrigger>
                    <SelectContent>
                      {heads.map((head) => (
                        <SelectItem key={head.value} value={head.value}>
                          {head.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2 items-center mt-4 w-full">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="py-2 px-4 text-foreground border border-muted-background rounded-md hover:bg-muted-background"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary-dark"
            >
              Assign
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
