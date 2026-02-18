import React from "react";
import { NewPassword } from "./_components/new-password";

export default function Page() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <h3 className="text-base lg:text-xl font-bold">Enter New Password</h3>
      <NewPassword />
    </section>
  );
}
