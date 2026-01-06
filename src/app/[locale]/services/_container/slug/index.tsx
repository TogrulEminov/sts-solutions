import ServicesTagSection from "@/src/ui/layout/services";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import ConsultingSection from "@/src/ui/layout/consulting";
import { ServicesSubCategoryJsonLdScript } from "@/src/ui/json-ld/service-detail";
interface Props {
  existingData: any;
}
export default function ServicesDetailPageContainer({ existingData }: Props) {
  const servicesData = existingData?.data?.servicesDetailData;
  return (
    <>
      <ServicesSubCategoryJsonLdScript subCategoryData={servicesData} />
      <SectionOne existingData={servicesData} />
      <SectionTwo existingData={servicesData} />
      <SectionThree existingData={servicesData} />
      <ConsultingSection
        existingData={existingData?.data?.contactData}
        services={existingData?.data?.servicesData}
        sectionData={existingData?.sections?.consultingSection}
      />
      <ServicesTagSection
        services={existingData?.data?.servicesData}
        sectionData={existingData?.sections?.servicesSection}
      />
    </>
  );
}
