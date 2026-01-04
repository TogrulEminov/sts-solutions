import HeroDetailSection from "./section-1";
import ProjectsContent from "./section-2";
import ServicesTagSection from "@/src/ui/layout/services";
interface Props {
  existingData: any
}
export default async function DetailProjectsContainer({ existingData }: Props) {
  return (
    <>
      <HeroDetailSection
        existingData={existingData?.data?.projectsDetailData}
      />
      <ProjectsContent existingData={existingData?.data?.projectsDetailData} />
      <ServicesTagSection
        sectionData={existingData?.sections?.servicesSection}
        services={existingData?.data?.servicesData}
      />
    </>
  );
}
