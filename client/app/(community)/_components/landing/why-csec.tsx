"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const whyCsecAstu = [
  { _id: "3", title: "Develop Your Skills", why: "Access resources and mentorship to develop your coding, AI, and data science skills for the future.", why_image: "/why/why3.jpg" },
  { _id: "4", title: "Build Community", why: "Be part of a vibrant community that fosters creativity, innovation, leadership, and teamwork.", why_image: "/why/why4.jpg" },
  { _id: "5", title: "Network & Connect", why: "Build a professional portfolio while connecting with startups and tech companies across Ethiopia.", why_image: "/why/why5.jpg" },
  { _id: "6", title: "Real-World Impact", why: "Participate in research-driven initiatives that address real-world technological challenges.", why_image: "/why/why6.jpg" },
  { _id: "7", title: "Career Guidance", why: "Benefit from structured mentorship programs to guide your career path in software engineering.", why_image: "/why/why7.jpg" },
  { _id: "8", title: "Become a Leader", why: "Join a community that values growth and discipline to help you become a future tech leader.", why_image: "/why/why8.jpg" },
];

export default function WhyCsecHorizontal() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center bg-background overflow-hidden py-10">
      <div className="container mx-auto w-full">

        {/* Header - Compact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-thin tracking-tighter text-text2">
              Why <span className="font-normal text-text1">CSEC ASTU?</span>
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-4 rounded-full border border-border hover:bg-secondary transition-colors text-text1"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-4 rounded-full border border-border hover:bg-secondary transition-colors text-text1"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {whyCsecAstu.map((item) => (
            <div
              key={item._id}
              className="min-w-[85vw] md:min-w-[450px] snap-center group"
            >
              <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-border bg-secondary/20">
                <Image
                  fill
                  src={item.why_image}
                  alt={item.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7] dark:brightness-[0.5]"
                />

                <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/30 dark:from-black/80 via-black/20 to-transparent">
                   <h3 className="text-3xl font-light text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-light leading-relaxed text-base max-w-sm">
                    {item.why}
                  </p>

                  {/* Subtle Light Blue Accent Line */}
                  <div className="w-12 h-1 bg-primary mt-6 rounded-full group-hover:w-24 transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}

          {/* Empty spacer at the end for padding */}
          <div className="min-w-[10vw] md:min-w-[5vw]" />
        </div>
      </div>
    </section>
  );
}
