import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="container mx-auto h-[40vh] bg-gradient-to-r from-background via-muted/20 to-background flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-foreground">
      <div className="flex flex-col items-center md:items-start gap-4">
        <h2 className="text-2xl font-bold text-primary drop-shadow-sm">
          DevHub Portal
        </h2>
        <p className="text-muted-foreground max-w-sm text-center md:text-left">
          Connecting developers and problem solvers from around the globe.
        </p>
        <div className="flex gap-4 mt-2">
          <a href="#" aria-label="Facebook">
            <Facebook className="hover:text-blue-600 transition" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="hover:text-sky-400 transition" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="hover:text-blue-700 transition" />
          </a>
          <a href="#" aria-label="GitHub">
            <Github className="hover:text-zinc-500 transition" />
          </a>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 items-center md:items-start">
        <h3 className="font-semibold text-lg">Quick Links</h3>
        <a href="#" className="text-muted-foreground hover:underline">
          Home
        </a>
        <a href="#" className="text-muted-foreground hover:underline">
          About
        </a>
        <a href="#" className="text-muted-foreground hover:underline">
          Projects
        </a>
        <a href="#" className="text-muted-foreground hover:underline">
          Contact
        </a>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
        <h3 className="font-semibold text-lg">Stay Updated</h3>
        <p className="text-muted-foreground">
          Get the latest updates from our community.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="shadow hover:shadow-md transition"
        >
          Subscribe
        </Button>
      </div>
    </footer>
  );
}
