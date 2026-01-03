import PartnerSection from "../../../(home)/_container/partner";
import HeroProjectsSection from "./section-1";
import CardWrapper from "./section-2";
interface Props {
  existingData: any;
}
export default async function ProjectsPageContainer({ existingData }: Props) {
  return (
    <>
      <HeroProjectsSection existingData={existingData?.data?.categoriesData} />
      <CardWrapper
        existingData={existingData?.data?.projectsData}
        section={existingData?.sections?.projectsSection}
        paginations={existingData?.data?.paginations}
      />
      <PartnerSection
        existingData={existingData?.data?.partnersData}
        sectionData={existingData?.sections?.partnersSection}
      />
    </>
  );
}
