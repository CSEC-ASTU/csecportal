import Footer from "@/app/(community)/_components/footer";
import { CommunityHeader } from "@/app/(community)/_components/header";
import React from "react";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full  overflow-y-hidden">
      <section className="">
        <CommunityHeader />
      </section>
      <div className="w-full overflow-y-auto h-[95%] ">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
