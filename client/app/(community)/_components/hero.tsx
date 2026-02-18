import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto relative w-full min-h-[100vh] flex items-center justify-center  overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/why/why2.jpg"
          alt="ASTU community background"
          fill
          className="object-cover object-center filter brightness-75 dark:brightness-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-primary/20 dark:from-black/30 dark:to-black/50" />
      </div>

      <div className="relative z-10  w-[95%] mx-auto py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-left text-text1 md:text-left gap-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="block text-text2 text-xl md:text-2xl">
              Join the CSEC ASTU
            </span>
            <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl font-thin">
              Community of makers and problem-solvers
            </span>
          </h1>

          <p className="mt-4 text-lg text-text2 max-w-xl">
            Grow your skills, collaborate on impact projects, and connect with
            students and professionals.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button className=" rouded-full font-bold tracking-[1px]">
              <Link href="/about">Learn more</Link>
            </Button>
            <Button
              className="rouded-full"
              variant="outline"
            >
              <Link href="/how-to-join">How to join</Link>
            </Button>
          </div>
        </div>

        {/* Illustration / Visual */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <div className="w-[380px] h-[300px] rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Image
              src="/hero/people.png"
              alt="Community illustration"
              width={320}
              height={220}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
