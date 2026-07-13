import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ILF Hacktoberfest 2025",
  description: "Interledger Foundation's Hacktoberfest — four themed sprints, two tracks, all of October.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0f0a1a] text-[#f0e6d3]">
        {children}
      </body>
    </html>
  );
}
