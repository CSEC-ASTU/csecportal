import Image from "next/image";
import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function BeyondCode() {
  return (
    <section className="container mx-auto py-24 transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-text1 leading-tight">
              Beyond <span className="font-normal">Code.</span>
            </h2>
            <p className="text-lg text-text2 leading-relaxed font-light max-w-lg">
              Technical skills are just the beginning. At CSEC ASTU, we provide the resources and mentorship to transform you from a student into a world-class professional.
            </p>
          </div>

          <ul className="space-y-4 mt-2">
            {[
              "Expert mentorship from industry-ready seniors",
              "Hands-on experience with real-world project life cycles",
              "Development of soft skills and professional networking"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-text1 group">
                <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-light text-text2">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image Side */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-secondary/10 rounded-[2.5rem] blur-2xl group-hover:bg-blue-600/5 transition-colors duration-500" />

          <div className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-border bg-secondary/5 shadow-sm">
            <Image
              src="/why/why8.jpg"
              alt="Beyond Code Mentorship"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
