"use client";

import Footer from "@/src/ui/layout/footer";

interface LocalLayoutProps {
  children: React.ReactNode;
}
export default function ProviderComponent({ children }: LocalLayoutProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
