import ServicesTagSection from "@/src/ui/layout/services";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import ConsultingSection from "@/src/ui/layout/consulting";
interface Props {
  existingData: any;
}
export default function ServicesDetailPageContainer({ existingData }: Props) {
  return (
    <>
      <SectionOne existingData={existingData?.data?.servicesDetailData} />
      <SectionTwo existingData={existingData?.data?.servicesDetailData} />
      <SectionThree existingData={existingData?.data?.servicesDetailData} />
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
