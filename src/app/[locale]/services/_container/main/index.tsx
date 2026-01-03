import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import PartnerSection from "../../../(home)/_container/partner";
interface Props {
  existingData: any;
}
export default function ServicesPageMainContainer({ existingData }: Props) {
  return (
    <>
      <SectionOne existingData={existingData?.data?.categoriesData} />
      <SectionTwo
        sectionData={existingData?.sections?.servicesSection}
        existingData={existingData?.data?.servicesData}
      />
      <PartnerSection
        sectionData={existingData?.sections?.partnersSection}
        existingData={existingData?.data?.partnersData}
      />
    </>
  );
}
