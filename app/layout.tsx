/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atrey.dev"),
  title: "atrey.dev — Anshuman Atrey",
  description:
    "Builders ready to bring crazy ideas to life. We craft web apps, AI apps, automation, and design at Atrey.dev.",
  authors: [{ name: "Anshuman Atrey", url: "https://www.linkedin.com/in/anshumanatrey" }],
  keywords: [
    "atrey.dev",
    "Anshuman Atrey",
    "web apps",
    "AI apps",
    "automation",
    "UI/UX",
    "Next.js",
    "React",
  ],
  openGraph: {
    url: "https://atrey.dev",
    siteName: "atrey.dev",
    title: "atrey.dev — Builders of bold software",
    description:
      "We ship web apps, AI apps, automation and design. Builders ready to bring crazy ideas to life.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "atrey.dev — Anshuman Atrey",
    description:
      "We ship web apps, AI apps, automation and design. Builders ready to bring crazy ideas to life.",
  },
  verification: {
    google: "vfl_Z9jHpXJBVtYEGNKNsxdFq_9HMWyKZNYF8ZuH4WE",
  },
  alternates: {
    canonical: "https://atrey.dev",
  },
  icons: {
    icon: "/penguine.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff8c00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="vfl_Z9jHpXJBVtYEGNKNsxdFq_9HMWyKZNYF8ZuH4WE" />
        <meta name="theme-color" content="#ff8c00" />
        <link rel="icon" href="/penguine.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
