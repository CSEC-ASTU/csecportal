"use client";

import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Loader2,
  MessageSquare,
  PlusCircle,
  Quote
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useListTestimonialsQuery,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
} from "@/lib/features/api";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const testimonialFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Testimonial must be at least 10 characters.",
  }),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

export  function TestimonialManagement() {
  const [activeTab, setActiveTab] = useState("view");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const {
    data: testimonials = [],
    isLoading,
    refetch,
  } = useListTestimonialsQuery();

  const [createTestimonial, { isLoading: creating }] = useCreateTestimonialMutation();
  const [deleteTestimonial, { isLoading: deleting }] = useDeleteTestimonialMutation();

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      role: "",
      description: "",
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      await createTestimonial(data).unwrap();
      toast.success("Testimonial created!");
      form.reset();
      refetch();
      setActiveTab("view");
    } catch (err) {
      toast.error("Failed to create testimonial.");
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteTestimonial(confirmDeleteId).unwrap();
      toast.success("Testimonial deleted.");
      setConfirmDeleteId(null);
      refetch();
    } catch (err) {
      toast.error("Failed to delete testimonial.");
    }
  };

  const tabs = [
    {
      id: "view",
      label: "View Testimonials",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
      component: (
        <div className="p-4 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-text2">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading testimonials...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-10 text-text2">No testimonials found.</div>
          ) : (
            <div className="divide-y divide-border border rounded-lg overflow-hidden">
              {testimonials.map((testimonial: any) => (
                <div
                  key={testimonial.id}
                  className="flex justify-between items-start p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex gap-3">
                    <Quote className="w-5 h-5 text-text2 mt-1 shrink-0 opacity-50" />
                    <div>
                      <h3 className="font-medium text-text1">{testimonial.name}</h3>
                      <p className="text-text2 text-xs mb-2">{testimonial.role}</p>
                      <p className="text-sm text-text2 leading-relaxed italic">
                        "{testimonial.description}"
                      </p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-text2 hover:text-red-500 shrink-0"
                        onClick={() => setConfirmDeleteId(testimonial.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Delete Testimonial</DialogTitle>
                      <p className="text-text2 text-sm">Are you sure you want to delete this testimonial? This action cannot be undone.</p>
                      <DialogFooter className="mt-4">
                        <Button variant="outline" size="sm" onClick={() => setConfirmDeleteId(null)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteTestimonial}
                          disabled={deleting}
                        >
                          {deleting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "create",
      label: "Add Testimonial",
      icon: <PlusCircle className="w-4 h-4 mr-2" />,
      highlight: true,
      component: (
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text2">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text2">Role / Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Member" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text2">Testimonial Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share the experience..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" disabled={creating}>
                  {creating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Create Testimonial
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-2">
      <div className="w-full mx-auto mb-2">
        <div className="border-b mb-5">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-1 font-medium text-sm flex items-center transition-all ${
                  activeTab === tab.id
                    ? "text-text1 border-b border-b-text1"
                    : "border-transparent text-text2 hover:text-text1"
                } ${tab.highlight ? "font-semibold" : ""}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="rounded-lg border overflow-hidden bg-card">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}
