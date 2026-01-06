import { ServicesJsonLdScript } from "@/src/ui/json-ld/service-category";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import ServicesTagSection from "@/src/ui/layout/services";
interface Props {
  existingData: any;
}
export default function ServicesCategoryPageContainer({ existingData }: Props) {
  const servicesData = existingData?.data?.servicesDetailData;
  return (
    <>
      <ServicesJsonLdScript
        servicesData={servicesData}
      />
      <SectionOne existingData={servicesData} />
      <SectionTwo existingData={servicesData} />
      <SectionThree existingData={servicesData} />
      <ServicesTagSection
        services={existingData?.data?.servicesData}
        sectionData={existingData?.sections?.servicesCta}
      />
    </>
  );
}
