import React from "react";
import HeroAbout from "./hero";
import AboutContent from "./section-2";
import TeamContent from "./section-3";
import ProcessSection from "./section-4";
import PurposeSection from "./section-5";
import TeamArea from "./section-6";
import ProjectsSection from "../../(home)/_container/project";
import FagSection from "../../(home)/_container/fag";
import ServicesTagSection from "@/src/ui/layout/services";
import PartnerSection from "../../(home)/_container/partner";

export default function AboutPageContainer() {
  return (
    <>
      <HeroAbout />
      <AboutContent />
      <TeamContent />
      <ProcessSection />
      <PurposeSection />
      <TeamArea />
      <PartnerSection />
      <ProjectsSection />
      <FagSection />
      <ServicesTagSection />
    </>
  );
}
