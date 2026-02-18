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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = z.object({
  name: z.string().min(3, "Resource name is required"),
  link: z.string().url("Please enter a valid URL"),
});

type ResourceFormType = z.infer<typeof schema>;

const AddResourcePopup = function () {
  const form = useForm<ResourceFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      link: "",
    },
  });

  const onSubmit = async (data: ResourceFormType) => {
    /*handle the submitted data here*/
    console.log("Form submitted:", { ...data });
  };

  return (
    <Dialog>
      <DialogContent className="max-w-[425px] lg:max-w-[500px] p-6 bg-white rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground border-b border-muted-background pb-4">
            Add New Resource
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Resource Name"
                      {...field}
                      className="py-3 px-4 border border-muted-background rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Resource Link"
                      {...field}
                      className="py-3 px-4 border border-muted-background rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Add Resource
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddResourcePopup;
