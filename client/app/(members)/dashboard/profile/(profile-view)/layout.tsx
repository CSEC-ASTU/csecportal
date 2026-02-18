import type { Metadata } from "next";
import ProfileLayout from "./ProfileLayout";

export const metadata: Metadata = {
  title: "CSEC ASTU",
  description: "CSEC ASTU Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
