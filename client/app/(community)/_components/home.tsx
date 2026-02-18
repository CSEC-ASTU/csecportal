import React from "react";
import Hero from "./hero";
import FaqComponent from "./faq";
import Testimonials from "./testimonials";
import LittleAbout from "./little-about";
import EventsIntro from "./little-events";
import WhyCsec from "./landing/why-csec";
import Some from "./landing/some";

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center gap-10">
      <Hero />
      <LittleAbout />
      <Some />
      <WhyCsec />
      <EventsIntro />
      <FaqComponent />
      <Testimonials />
    </section>
  );
}
