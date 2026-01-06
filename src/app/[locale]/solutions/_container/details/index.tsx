import { SolutionsJsonLdScript } from "@/src/ui/json-ld/solutions";
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
  const solutionsData = existingData?.data?.solutionsDetailData;
  return (
    <>
      <SolutionsJsonLdScript solutionsData={solutionsData} />
      <SolutionsDetailHeroSection existingData={solutionsData} />
      <SectionTwo existingData={solutionsData} />
      <SectionThree existingData={solutionsData} />
      <SectionFour existingData={existingData?.data?.relatedData || []} />
    </>
  );
}
