import React from "react";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import ServicesTagSection from "@/src/ui/layout/services";
import CallAction from "@/src/ui/layout/call-action";

export default function ServicesCategoryPageContainer() {
  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree/>
      <ServicesTagSection/>
      <CallAction/>
    </>
  );
}
