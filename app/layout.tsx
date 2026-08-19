import type { Metadata } from "next";
import { Inter_Tight, Cinzel } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter-tight",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-cinzel",
});

const mason = localFont({
  src: [
    { path: "../public/fonts/mason/Mason-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/mason/Mason-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mason",
  display: "swap",
});

export const metadata: Metadata = {
  title: "atrey.dev",
  description: "Builders ready to bring crazy ideas to life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${cinzel.variable} ${mason.variable} antialiased`}>{children}</body>
    </html>
  );
}
