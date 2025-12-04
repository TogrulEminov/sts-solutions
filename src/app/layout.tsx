import React from "react";
import "@/src/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { MessageProvider } from "../globalElements/providers/MessageProvider";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s",
    default: "Ml Group - Master Luxury",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`,
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_BASE_URL}/rss.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"az"} data-scroll-behavior="smooth">
      <body
        className={`antialiased ${inter.variable}}`}
        suppressHydrationWarning={true}
      >
        <MessageProvider maxCount={5} duration={3} top={100}>
          {children}
        </MessageProvider>
      </body>
    </html>
  );
}
