"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPublicEventsQuery } from "@/lib/features/api";

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: string;
}

export default function EventsIntro() {
  const { data: eventsData, isLoading } = useGetPublicEventsQuery({
    page: 1,
    limit: 5,
  });
  const events = eventsData?.data || [];
  const featuredEvent = events[0];

  return (
    <section className="py-24  transition-colors duration-300  w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-thin tracking-tighter text-text1 leading-tight">
                Tech <span className="font-normal text-primary">Gatherings.</span>
              </h2>
              <p className="text-lg text-text2 font-light leading-relaxed max-w-md">
                Join our vibrant events featuring industry leaders, hands-on workshops, and networking at ASTU.
              </p>
            </div>

            {/* Featured Event Card */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group relative h-[350px] rounded-[2.5rem] overflow-hidden border border-border shadow-sm"
              >
                <Image
                  src="/event.svg"
                  alt={featuredEvent.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/80 mb-2">Featured Event</span>
                  <h3 className="text-2xl font-light mb-4">{featuredEvent.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/70 font-light">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(featuredEvent.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {featuredEvent.location}</span>
                  </div>
                </div>
              </motion.div>
            )}

            <Button className="">
              Explore All Events <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* RIGHT: Clean Event List */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence>
              {isLoading ? (
                <SkeletonList />
              ) : (
                events.slice(1).map((event: Event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group p-8 rounded-[2rem] border border-border bg-secondary/10 hover:bg-secondary/30 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-xs font-bold text-primary tracking-widest uppercase">
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <div className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-text2 font-normal">{event.location}</span>
                      </div>
                      <h3 className="text-xl font-medium text-text1 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-text2 font-light line-clamp-2 max-w-md">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex items-end">
                       <button className="p-3 rounded-full border border-border group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-5 h-5" />
                       </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {events.length <= 1 && !isLoading && (
               <div className="p-12 text-center rounded-[2rem] border border-dashed border-border text-text2 font-light">
                  No other upcoming events scheduled.
               </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 w-full rounded-[2rem] bg-secondary/20 animate-pulse border border-border/50" />
      ))}
    </div>
  );
}
