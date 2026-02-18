import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

import Wrapper from "@/components/Wrapper";
import ThemeProvider from "@/components/ThemeProvider";

const lexend = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <Wrapper>
          <ThemeProvider>
            <div className="size-full bg-background1 text-text1 font-lexend">
              {children}
            </div>
          </ThemeProvider>
        </Wrapper>
      </body>
    </html>
  );
}
