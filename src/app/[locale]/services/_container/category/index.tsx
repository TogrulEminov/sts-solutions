import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import ServicesTagSection from "@/src/ui/layout/services";
interface Props {
  existingData: any;
}
export default function ServicesCategoryPageContainer({ existingData }: Props) {
  return (
    <>
      <SectionOne existingData={existingData?.data?.servicesDetailData} />
      <SectionTwo existingData={existingData?.data?.servicesDetailData} />
      <SectionThree existingData={existingData?.data?.servicesDetailData} />
      <ServicesTagSection services={existingData?.data?.servicesData} sectionData={existingData?.sections?.servicesCta} />
    </>
  );
}
