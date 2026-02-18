"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";
import { Faq } from "@/types/faq.types";
import { useGetFaqsQuery } from "@/lib/features/api";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";

export default function FaqComponent() {
  const { data: faqs, isLoading } = useGetFaqsQuery();

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (!faqs || faqs.length === 0) {
        return null
    }

  return (
    <section className="w-full px-4 md:px-8 py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-float-slower"></div>
      </div>

      <div className="w-full mx-auto flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            Need Help?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Find quick answers to common questions about our community and
            platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full space-y-4"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs?.map((faq: Faq, i: number) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <AccordionItem value={`item-${i}`} className="overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="rounded-xl bg-primary/[.1] dark:bg-primary/[.05] border border-border/50 shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-lg md:text-xl font-semibold text-foreground px-6 py-4 hover:text-primary hover:no-underline group">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.3 }}
                          className="group-data-[state=open]:rotate-90 text-primary"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 15L12 9L6 3"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>

                    <AnimatePresence>
                      <AccordionContent className="overflow-hidden text-base md:text-lg text-muted-foreground px-6 pb-6">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.answer}
                        </motion.div>
                      </AccordionContent>
                    </AnimatePresence>
                  </motion.div>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
