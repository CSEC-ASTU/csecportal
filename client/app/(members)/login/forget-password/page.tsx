import React from "react";
import { ForgetPassword } from "./_components/ForgetPassword";

export default function Page() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <h3 className="text-base lg:text-xl font-bold">
        Enter your Email Address
      </h3>
      <ForgetPassword />
    </section>
  );
}
