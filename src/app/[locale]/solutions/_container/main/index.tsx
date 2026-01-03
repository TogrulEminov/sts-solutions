import ConsultingSection from "@/src/ui/layout/consulting";
import SolutionsCardWrapper from "./section-2";
import SolutionsHeroSection from "./section-1";
import ServicesTagSection from "@/src/ui/layout/services";
interface Props {
  existingData: any;
}
export default async function SolutionsMainPageContainer({
  existingData,
}: Props) {
  return (
    <>
      <SolutionsHeroSection existingData={existingData?.data?.categoriesData} />
      <SolutionsCardWrapper
        sectionData={existingData?.sections?.solutionsSection}
        existingData={existingData?.data?.solutionsData}
        paginations={existingData?.paginations}
      />
      <ConsultingSection
        sectionData={existingData?.sections?.consultingSection}
        services={existingData?.data?.servicesData}
        existingData={existingData?.data?.contactData}
      />
      <ServicesTagSection
        services={existingData?.data?.servicesData}
        sectionData={existingData?.sections?.servicesSection}
      />
    </>
  );
}
