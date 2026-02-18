/*   */
"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Loader2, Link2 } from "lucide-react";
import { useCreateResourceMutation } from "@/lib/features/api";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";

const resourceValidation = z.object({
  name: z.string().min(3, { message: "Name is required (min 3 chars)" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().min(10, { message: "Description is required" }),
});

type ResourceFormType = z.infer<typeof resourceValidation>;

const AddResourcePopup = () => {
  const [open, setOpen] = useState(false);
  const [createResource, { isLoading }] = useCreateResourceMutation();
  const user = useSelector((state: RootState) => state?.auth.user);
  console.log(user);

  const form = useForm<ResourceFormType>({
    resolver: zodResolver(resourceValidation),
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ResourceFormType> = async (data) => {
    try {
      const payload = {
        name: data.name,
        url: data.url,
        type: "LINK",
        description: data.description,
        divisionId: user?.divisionId || "681adb596dd973a9d76ae254", // Hardcoded as requested
      };

      const response = await createResource(payload as any).unwrap();
      console.log(response);

      toast.success("Resource created successfully!", {
        position: "bottom-right",
        style: {
          background: "#4BB543",
          color: "white",
          border: "none",
        },
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error((error as any)?.message || "Failed to create resource", {
        position: "top-center",
        style: {
          background: "#FF3333",
          color: "white",
          border: "none",
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Link2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-normal text-text2">
                Add New Resource
              </DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Share valuable links with your team
              </p>
            </DialogHeader>

            <div className="space-y-6">
              {/* Resource Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Resource Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. AI Research Guidelines"
                        {...field}
                        className="border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* URL */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      URL
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Link2 className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          placeholder="https://example.com/resource"
                          {...field}
                          className="pl-10 border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Brief description of what this resource contains..."
                        {...field}
                        rows={4}
                        className="flex w-full rounded-md border border-gray-300 dark:border-slate-600 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <span className="group-hover:scale-105 transition-transform">
                    Add Resource
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddResourcePopup;
