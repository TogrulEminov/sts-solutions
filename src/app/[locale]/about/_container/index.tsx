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
interface Props {
  existingData: any;
}
export default async function AboutPageContainer({ existingData }: Props) {
  return (
    <>
      <HeroAbout existingData={existingData?.data?.aboutData} />
      <AboutContent existingData={existingData?.data?.aboutData} />
      <TeamContent existingData={existingData?.data?.aboutData} />
      <ProcessSection
        existingData={existingData?.data?.aboutData}
        sectionData={existingData?.sections?.processSection}
      />
      <PurposeSection existingData={existingData?.data?.strategicGoals} />
      <TeamArea
        existingData={existingData?.data?.employeeData}
        sectionData={existingData?.sections?.employeeSection}
      />
      <PartnerSection
        existingData={existingData?.data?.partnersData}
        sectionData={existingData?.sections?.partnersSection}
      />
      <ProjectsSection
        existingData={existingData?.data?.projectsData}
        sectionData={existingData?.sections?.projectsSection}
      />
      <FagSection
        existingData={existingData?.data?.fagData}
        sectionData={existingData?.sections?.fagSection}
      />
      <ServicesTagSection
        sectionData={existingData?.sections?.servicesMainSection}
        services={existingData?.data?.servicesData}
      />
    </>
  );
}
