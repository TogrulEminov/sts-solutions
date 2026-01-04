import SolutionsDetailHeroSection from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import SectionFour from "./section-4";
interface Props {
  existingData: any;
}
export default async function SolutionsDetailContainer({
  existingData,
}: Props) {
  return (
    <>
      <SolutionsDetailHeroSection
        existingData={existingData?.data?.solutionsDetailData}
      />
      <SectionTwo existingData={existingData?.data?.solutionsDetailData} />
      <SectionThree existingData={existingData?.data?.solutionsDetailData} />
      <SectionFour existingData={existingData?.data?.relatedData || []} />
    </>
  );
}
