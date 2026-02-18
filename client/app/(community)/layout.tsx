import type { Metadata } from "next";
import "../globals.css";

import CommunityLayout from "@/components/community.lyout";

export const metadata: Metadata = {
  title: "CSEC ASTU",
  description: "CSEC ASTU Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="size-full bg-background1 ">
      <CommunityLayout>{children}</CommunityLayout>
    </div>
  );
}
