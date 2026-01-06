import { ProjectsJsonLdScript } from "@/src/ui/json-ld/projects";
import HeroDetailSection from "./section-1";
import ProjectsContent from "./section-2";
import ServicesTagSection from "@/src/ui/layout/services";
interface Props {
  existingData: any;
}
export default async function DetailProjectsContainer({ existingData }: Props) {
  const projectsData = existingData?.data?.projectsDetailData;
  return (
    <>
      <ProjectsJsonLdScript projectsData={projectsData} />
      <HeroDetailSection existingData={projectsData} />
      <ProjectsContent existingData={projectsData} />
      <ServicesTagSection
        sectionData={existingData?.sections?.servicesSection}
        services={existingData?.data?.servicesData}
      />
    </>
  );
}
