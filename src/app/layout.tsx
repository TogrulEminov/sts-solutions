import React from "react";
import "@/src/styles/globals.css";
import { Inter, Plus_Jakarta_Sans, Manrope } from "next/font/google";
import type { Metadata } from "next";
import { MessageProvider } from "../globalElements/providers/MessageProvider";
import Script from "next/script";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s",
    default: "Sts Solutions- Smart Technology Solutions",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon.png?v=2", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
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
const jakarta = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});
const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"az"} data-scroll-behavior="smooth">
      <body
        className={`antialiased ${inter.variable} ${jakarta.variable} ${manrope.variable}`}
        suppressHydrationWarning={true}
      >
        <MessageProvider maxCount={5} duration={3} top={100}>
          {children}
        </MessageProvider>
        <Script
          src="https://api-maps.yandex.ru/2.1/?lang=az_AZ"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
