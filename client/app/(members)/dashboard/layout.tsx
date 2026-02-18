import React from "react";

import SideBar from "@/components/SideBar";
import { Header } from "@/components/Header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideBar>
      <section className="flex flex-col gap-3 h-full">
        <Header />
        <div className="w-full h-[85%] lg:h-[90%]">{children}</div>
      </section>
    </SideBar>
  );
}
