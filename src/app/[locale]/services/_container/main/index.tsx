import React from "react";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import PartnerSection from "../../../(home)/_container/partner";
import CallAction from "@/src/ui/layout/call-action";

export default function ServicesPageMainContainer() {
  return (
    <>
      <SectionOne />
      <SectionTwo />
      <PartnerSection />
      <CallAction />
    </>
  );
}
