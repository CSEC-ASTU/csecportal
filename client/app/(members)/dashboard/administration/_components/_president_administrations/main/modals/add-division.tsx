"use client";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCreateDivisionMutation } from "@/lib/features/api";
import { toast } from "sonner";

const divisionValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Division name must be at least 3 characters" }),
  description: z
    .string()
    .min(300, { message: "Description must be at least 300 characters" }),
});

type DivisionFormType = z.infer<typeof divisionValidation>;

const CreateDivisionPopup = () => {
  const [open, setOpen] = useState(false);

  const [createDivision, { isLoading }] = useCreateDivisionMutation();

  const form = useForm<DivisionFormType>({
    resolver: zodResolver(divisionValidation),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: DivisionFormType) => {
    try {
      await createDivision(data).unwrap();
      toast("Division created successfully!");
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast(error?.data?.message || "Failed to create division");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Division</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Create New Division
              </DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Define a new division for your organization
              </p>
            </DialogHeader>

            <div className="space-y-4">
              {/* Division Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Engineering, Design, Marketing"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the purpose and responsibilities of this division (minimum 300 characters)"
                        rows={5}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {field.value?.length || 0}/300 characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="px-6 py-3"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-6 py-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Division"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDivisionPopup;
