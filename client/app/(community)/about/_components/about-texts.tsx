import React from "react";
// import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CoreValue = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div
    // variants={fadeIn}
    className="p-6 rounded-lg bg-gradient-to-br from-background to-muted border border-border hover:shadow-lg transition-all"
  >
    <h3 className="text-lg font-semibold mb-3 text-primary">{title}</h3>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

export default function AboutTexts() {
  return (
    <div className="w-full px-4 py-12 space-y-16">
      <section
        // initial="hidden"
        // whileInView="visible"
        // viewport={{ once: true, margin: "-100px" }}
        // variants={{
        //   visible: { transition: { staggerChildren: 0.1 } }
        // }}
        className="space-y-8"
      >
        <Badge variant="outline" className="text-sm font-medium mb-4">
          Our Journey
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Every journey begins with a dream. Ours was born from a late-night
            conversation between a few restless minds who believed that the
            world needed something better—something more intentional, more
            human, and more impactful.
          </p>
          <p>
            In the beginning, we had little more than passion, notebooks full of
            ideas, and a shared desire to create something meaningful. We worked
            out of tiny apartments and local cafés, with laptops covered in
            stickers and heads full of ambition.
          </p>
          <p>
            Years later, we ve grown, but our soul remains the same. The dream
            has only expanded. Every client we work with becomes a part of our
            story. And this is still just the beginning.
          </p>
        </div>
      </section>

      <Card className="relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <CardHeader>
          <Badge variant="outline" className="w-fit text-sm font-medium mb-2">
            What Drives Us
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Our mission is rooted in a simple, powerful idea: to use creativity,
            technology, and purpose-driven thinking to improve lives. We re here
            to build solutions that matter.
          </p>
          <p>
            We wake up every day thinking about how we can serve better, think
            deeper, move faster, and stay true to what we believe in. We re not
            interested in shortcuts.
          </p>
          <p className="font-medium text-foreground">
            Our mission is to leave everything we touch a little brighter than
            we found it.
          </p>
        </CardContent>
      </Card>

      <section
        // initial="hidden"
        // whileInView="visible"
        // viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm font-medium">Future Focused</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Our Vision</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 text-muted-foreground border-l-4 border-primary pl-4">
            <p>
              We dream of a future where creativity, integrity, and innovation
              work in harmony to build a better world. A future where ideas are
              not limited by fear.
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We see a world where companies don t just chase profit, but also
              chase progress—for people, for communities, for the planet.
            </p>
            <p>
              We envision becoming a global leader not just by metrics, but by
              impact—by how many lives we touch.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Badge variant="default" className="text-sm font-medium mb-2">
            The Foundation
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            These aren t just words—they re the principles that guide every
            decision we make.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CoreValue title="Authenticity">
            We stay real, even when it s not easy. No fake promises, no
            overhype—just honest work.
          </CoreValue>
          <CoreValue title="Curiosity">
            We never stop learning, questioning, exploring. Growth comes from
            wonder.
          </CoreValue>
          <CoreValue title="Excellence">
            We aim for greatness, not perfection. But we never settle for just
            okay
          </CoreValue>
          <CoreValue title="Community">
            We build together, we grow together. We care for the people who walk
            this journey with us.
          </CoreValue>
          <CoreValue title="Resilience">
            We embrace the hard days. Failure is part of the story. We get back
            up, stronger.
          </CoreValue>
          <CoreValue title="Kindness">
            We believe kindness is a strength. It shapes our culture, our work,
            and our future.
          </CoreValue>
        </div>
      </section>

      <section
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        // viewport={{ once: true }}
        className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/20 border border-border relative overflow-hidden"
      >
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Us</h2>
          <p className="text-muted-foreground">
            Because we don t just do work—we care about it. We care about{" "}
            <span className="text-primary font-medium">you</span>.
          </p>
          <ul className="space-y-3 list-disc pl-5 marker:text-primary">
            <li className="text-muted-foreground">
              <span className="text-foreground">Heart-led approach:</span> Every
              project is infused with passion and purpose
            </li>
            <li className="text-muted-foreground">
              <span className="text-foreground">Detail-oriented:</span> We think
              about every aspect of your experience
            </li>
            <li className="text-muted-foreground">
              <span className="text-foreground">Partnership mindset:</span> Your
              success is our success
            </li>
          </ul>
          <p className="pt-4 font-medium">
            Choose us if you want something built with heart, with purpose, and
            with the kind of energy that makes things unforgettable.
          </p>
        </div>
      </section>
    </div>
  );
}
