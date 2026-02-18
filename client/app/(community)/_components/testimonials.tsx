"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import { Sparkles } from "lucide-react";
import { useListTestimonialsQuery } from "@/lib/features/api";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";

export default function Testimonials() {
  const { data: testimonialData, isLoading } = useListTestimonialsQuery();
  console.log("thi is testimonials");
  console.log(testimonialData);

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (!testimonialData || testimonialData.length === 0) {
        return null
  }



  return (
    <section className="w-full py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-float-slower"></div>
      </div>

      <div className="w-full mx-auto flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            Community Voices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
            Hear From Our Members
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Dont just take our word for it. Heres what our community members say
            about their experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <Carousel className="w-full relative group">
            <CarouselContent className="-ml-1">
              {testimonialData &&
                testimonialData.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="h-full p-2"
                    >
                      <div className="relative h-full">
                        <Quote className="size-16 md:size-20 absolute -top-2 -left-2 text-primary/10 dark:text-primary/5 z-0" />

                        <Card className="relative h-full backdrop-blur-sm bg-primary/[.2] dark:bg-primary/[.1] border border-border/50 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                          <CardContent className="flex flex-col gap-6 p-8 h-full">
                            <div className="flex-1">
                              <p className="text-lg text-foreground/90 italic font-light leading-relaxed">
                                {testimonial.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center overflow-hidden border-2 border-white/20">
                                    <span className="text-lg font-medium text-white">
                                      {testimonial.name.charAt(0)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col">
                                <span className="font-semibold text-foreground">
                                  {testimonial.name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {testimonial.role}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
            </CarouselContent>

            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <CarouselPrevious className="left-0 bg-background/80 border-border/50 shadow-lg hover:bg-background/90 hover:border-border size-12" />
              <CarouselNext className="right-0 bg-background/80 border-border/50 shadow-lg hover:bg-background/90 hover:border-border size-12" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
