import React from "react";
import { motion } from "framer-motion";
import { Users, Code, Calendar, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LittleAbout() {
  return (
    <main className="container mx-auto">
      <StatsSection />
      <TimelineSection />
      <CTASection />
    </main>
  );
}

const StatsSection = () => {
  const stats = [
    {
      number: "120+",
      label: "Active Members",
      desc: "A vibrant community of passionate developers and tech enthusiasts from ASTU.",
      icon: <Users className="w-5 h-5 " />,
    },
    {
      number: "40+",
      label: "Open Source Projects",
      desc: "Collaborative projects ranging from web apps to machine learning models.",
      icon: <Code className="w-5 h-5 " />,
    },
    {
      number: "20+",
      label: "Annual Workshops",
      desc: "Hands-on sessions covering the latest stacks and industry standards.",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      number: "10+",
      label: "Years of Excellence",
      desc: "Fostering innovation and technical growth since our establishment.",
      icon: <Rocket className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-24 w-full mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl tracking-tight text-text1 mb-6">
          Our Impact by the Numbers
        </h2>
        <p className="text-text2 max-w-2xl mx-auto text-lg">
          We are more than just a club; we are a hub for innovation at ASTU,
          empowering students to build the future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div className="p-8 rounded-3xl bg-secondary/5 border border transition-colors group shadow-sm">
            <div className="mb-4  w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-primary">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold text-text1 mb-1">
              {stat.number}
            </h3>
            <p className="font-semibold text-text2 mb-3">{stat.label}</p>
            <p className="text-sm text-text2 leading-relaxed">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const TimelineSection = () => {
  const milestones = [
    {
      year: "2019",
      title: "The Genesis",
      desc: "CSEC ASTU was founded with a vision to bridge the gap between academic theory and practical software engineering.",
    },
    {
      year: "2021",
      title: "Rapid Growth & First Hackathon",
      desc: "Launched our first campus-wide hackathon and grew to over 200 members during the pandemic era.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2023",
      title: "Industry Partnerships",
      desc: "Established connections with top local tech firms, providing internship pathways for our high-performing members.",
    },
    {
      year: "Today",
      title: "ASTU's Tech Powerhouse",
      desc: "Now serving as the leading technical community at ASTU, driving innovation through daily standups and research.",
    },
  ];

  return (
    <section className="py-24 w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side Content */}
        <div className="lg:sticky lg:top-32">
          <h2 className="text-text2 text-xl md:text-2xl">
            Building a Tech Legacy, <br />
            <span className="text-text1 mt-2 text-3xl sm:text-4xl lg:text-5xl font-thin">
              One Milestone at a Time
            </span>
          </h2>
          <p className="text-lg text-text2 mb-8 max-w-md italic">
            "From a small group of enthusiasts to a community of hundreds,
            here's how CSEC ASTU evolved into a pillar of innovation."
          </p>
          <Button className="">
            View our full history <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="relative pl-8 border-l-2 border-text2 space-y-16">
          {milestones.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-600" />

              <span className="text-sm font-bold text-text1 tracking-widest uppercase mb-2 block">
                {item.year}
              </span>
              <h3 className="text-2xl font-bold text-text1 mb-3">
                {item.title}
              </h3>
              <p className="text-text2 leading-relaxed mb-6">{item.desc}</p>

              {item.image && (
                <div className="rounded-2xl overflow-hidden  shadow-sm">
                  <Image
                    width={500}
                    height={500}
                    src={'/why/why2.jpg'}
                    alt="Milestone"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          width={800}
          height={800}
          src="/why/why3.jpg"
          className="w-full h-full object-cover"
          alt="Team collaboration"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-thin text-white mb-6">
          Code, Create, and Conquer with CSEC
        </h2>
        <p className="text-xl text-slate-200 mb-10">
          Join the most active tech community in ASTU. Start your journey today
          and build things that matter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-lg rounded-full"
          >
            Join the Club
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-slate-900 px-8 h-14 text-lg rounded-full backdrop-blur-md"
          >
            Our Projects
          </Button>
        </div>
      </div>
    </section>
  );
};
