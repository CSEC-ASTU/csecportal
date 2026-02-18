"use client";

import React, { useState } from "react";
import {
  Trash2,
  Plus,
  HelpCircle,
  PlusCircle,
  Loader2,
  ChevronRight
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
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqsQuery,
} from "@/lib/features/api";
import { toast } from "sonner";

const faqFormSchema = z.object({
  question: z.string().min(5, {
    message: "Question must be at least 5 characters.",
  }),
  answer: z.string().min(10, {
    message: "Answer must be at least 10 characters.",
  }),
});

type FaqFormValues = z.infer<typeof faqFormSchema>;

export  function FaqManagement() {
  const [activeTab, setActiveTab] = useState("view");

  const { data: faqs, isLoading, isError } = useGetFaqsQuery();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (data: FaqFormValues) => {
    try {
      await createFaq(data).unwrap();
      toast.success("FAQ created successfully!");
      form.reset();
      setActiveTab("view");
    } catch (error: any) {
      toast.error("Failed to create FAQ.");
    }
  };

  const handleDeleteFaq = async (faqId: string) => {
    try {
      await deleteFaq(faqId).unwrap();
      toast.success("FAQ deleted.");
    } catch (error) {
      toast.error("Failed to delete FAQ.");
    }
  };

  const tabs = [
    {
      id: "view",
      label: "View FAQs",
      icon: <HelpCircle className="w-4 h-4 mr-2" />,
      component: (
        <div className="divide-y divide-border">
          {isLoading ? (
            <div className="p-10 flex flex-col items-center justify-center text-text2">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              <p>Loading FAQs...</p>
            </div>
          ) : isError ? (
            <div className="p-10 text-center text-red-500">Failed to load FAQs.</div>
          ) : faqs?.length === 0 ? (
            <div className="p-10 text-center text-text2">No FAQs available yet.</div>
          ) : (
            faqs?.map((faq: any) => (
              <div
                key={faq.id}
                className="flex justify-between items-start p-4 hover:bg-muted/30 transition-colors group"
              >
                <div className="flex gap-3">
                  <div className="mt-1">
                    <ChevronRight className="w-4 h-4 text-text2 group-hover:text-text1 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text1 leading-tight">{faq.question}</h3>
                    <p className="text-text2 text-sm mt-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text2 hover:text-red-500 shrink-0"
                  onClick={() => handleDeleteFaq(faq.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))
          )}
        </div>
      ),
    },
    {
      id: "create",
      label: "Create New FAQ",
      icon: <PlusCircle className="w-4 h-4 mr-2" />,
      highlight: true,
      component: (
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text2">Question</FormLabel>
                    <FormControl>
                      <Input placeholder="What is the mission of this division?" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text2">Answer</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a clear, detailed explanation..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" disabled={isCreating}>
                  {isCreating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  {isCreating ? "Saving..." : "Create FAQ"}
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
