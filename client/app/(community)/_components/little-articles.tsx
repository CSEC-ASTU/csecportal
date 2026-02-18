"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
}

const dummyArticles: Article[] = [
  {
    id: 1,
    title: "The Future of Tech",
    description:
      "Explore how emerging technologies are shaping our tomorrow, from AI to quantum computing.",
    image: "/30.jpg",
    category: "Innovation",
    readTime: "8 min read",
    author: "Dr. Selam Tekle",
  },
  {
    id: 2,
    title: "Design Trends 2025",
    description:
      "Discover what UI/UX styles will dominate this year's design landscape.",
    image: "/31.jpg",
    category: "Design",
    readTime: "6 min read",
    author: "Liya Getachew",
  },
  {
    id: 3,
    title: "Productivity Hacks for Developers",
    description:
      "Maximize your workflow with these time-saving tips tailored for software engineers.",
    image: "/32.jpg",
    category: "Development",
    readTime: "10 min read",
    author: "Biniam Kassahun",
  },
  {
    id: 4,
    title: "How to Build Accessible Apps",
    description:
      "Make your web apps more inclusive by following accessibility best practices.",
    image: "/33.jpg",
    category: "Accessibility",
    readTime: "12 min read",
    author: "Ruth Abraham",
  },
  {
    id: 5,
    title: "Mastering TypeScript",
    description:
      "Everything you need to take your TypeScript skills from intermediate to advanced.",
    image: "/34.jpg",
    category: "Tutorial",
    readTime: "15 min read",
    author: "Dawit Solomon",
  },
];

export default function ArticlesIntro() {
  return (
    <section className="container mx-auto py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl animate-float-slower"></div>
      </div>

      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <IntroImageSection />
          <ArticlesList />
        </div>
      </div>
    </section>
  );
}

function IntroImageSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="lg:col-span-4 flex flex-col items-start gap-8 relative"
    >
      <div className="relative z-10 w-full">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary  mb-6"
        >
          <Sparkles className="w-4 h-4" />
          Featured Articles
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent mb-6"
        >
          Dive Into Our{" "}
          <span className="text-primary">
            Knowledge Hub
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl text-muted-foreground mb-8"
        >
          Discover thought-provoking insights, tutorials, and industry analysis
          from Africas top tech minds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group"
        >
          <Image
            src="/hero2.jpg"
            alt="Tech Articles"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-1">
                The Future of African Tech
              </h3>
              <p className="text-purple-200 text-sm">
                By Dr. Selam Tekle • 12 min read
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button className="mt-8 px-8 py-4 text-lg bg-primary transition-all duration-300 shadow-lg hover:shadow-xl">
            Browse All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ArticlesList() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="lg:col-span-8"
    >
      <div className="flex flex-col gap-6 h-[80vh] overflow-y-auto pr-3 custom-scrollbar">
        <AnimatePresence>
          {dummyArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border/50 bg-primary/[.03] p-4 flex gap-4 items-center"
            >
              <div className="relative z-10 flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-100 dark:border-purple-900/50 shadow-sm group-hover:border-purple-300 dark:group-hover:border-purple-500 transition-all duration-300">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-600/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    By {article.author}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-purple-600 group-hover:text-white transition-all flex items-center gap-1 px-3 py-1 text-sm"
                  >
                    Read
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
