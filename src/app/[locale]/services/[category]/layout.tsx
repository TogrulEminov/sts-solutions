import ServicesTagSection from "@/src/ui/layout/services";
import React from "react";
interface Props {
  children: React.ReactNode;
}
export default function ServicesCategoryLayout({ children }: Props) {
  return (
    <>
      {children}
      <ServicesTagSection />
    </>
  );
}
