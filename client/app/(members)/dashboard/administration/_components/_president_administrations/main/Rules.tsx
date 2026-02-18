"use client";

import React, { useState } from "react";
import {
  Trash2,
  Plus,
  List,
  PlusCircle
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

const ruleFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type RuleFormValues = z.infer<typeof ruleFormSchema>;

const mockRules = [
  {
    id: "1",
    title: "Attendance Policy",
    description: "Members must attend at least 80% of all division meetings.",
  },
  {
    id: "2",
    title: "Code of Conduct",
    description:
      "All members must adhere to the professional code of conduct during events.",
  },
  {
    id: "3",
    title: "Project Deadlines",
    description:
      "Projects must be submitted 48 hours before the presentation date.",
  },
];

export  function RulesManagement() {
  const [activeTab, setActiveTab] = useState("view");

  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: RuleFormValues) => {
    console.log("Form submitted:", data);
    form.reset();
    setActiveTab("view"); // Optional: switch back to view after create
  };

  const tabs = [
    {
      id: "view",
      label: "View Rules",
      icon: <List className="w-4 h-4 mr-2" />,
      component: (
        <div className="divide-y divide-border">
          {mockRules.map((rule) => (
            <div key={rule.id} className="flex justify-between items-start p-4">
              <div className="flex-1 pr-4">
                <h3 className="text-text1 font-medium">{rule.title}</h3>
                <p className="text-text2 text-sm mt-1">{rule.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log("Delete", rule.id)}
                className="text-text2 hover:text-red-500 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "create",
      label: "Create New Rule",
      icon: <PlusCircle className="w-4 h-4 mr-2" />,
      component: (
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text2">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Attendance Policy" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text2">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the rule..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Rule
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ),
      highlight: true,
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
                className={`whitespace-nowrap py-2 px-1 border-b-1 font-medium text-sm flex items-center transition-colors ${
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

        <div className="rounded-lg border overflow-hidden">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}
