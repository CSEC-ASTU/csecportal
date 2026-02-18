"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(3, "Division name is required"),
  head: z.string().min(1, "Division head is required"),
});

type SignupFormType = z.infer<typeof schema>;

const divisionHeads = [
  { value: "head-1", label: "Darlene Robertson" },
  { value: "head-2", label: "Floyd Miles" },
  { value: "head-3", label: "Dianne Russell" },
  { value: "head-4", label: "Cody Fisher" },
];

const AddDivisionPopup = function () {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      head: "",
    },
  });

  const onSubmit = async (data: SignupFormType) => {
    /*handle the submitted data here*/
    console.log("Form submitted:", { ...data });
  };

  return (
    <DialogContent className="max-w-[425px] lg:max-w-[400px] p-6 bg-background rounded-lg shadow-md">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-foreground border-b border-muted-background pb-4">
          Add New Division
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Division Name Input */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Division Name"
                    {...field}
                    className="py-3 px-4 border border-muted-background rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Division Head Dropdown */}
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
                      <SelectValue placeholder="Select Division Head" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisionHeads.map((head) => (
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

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="py-2 px-4 text-foreground border border-muted-background rounded-md hover:bg-muted-background"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary-dark"
            >
              Add Division
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddDivisionPopup;
