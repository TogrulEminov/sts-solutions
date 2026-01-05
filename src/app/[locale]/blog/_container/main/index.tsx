import FirstSection from "./section-1";
import SecondSection from "./section-2";
interface Props {
  existingData: any;
}
export default function BlogPageContainer({ existingData }: Props) {
  return (
    <>
      <FirstSection existingData={existingData?.data?.categoriesData} />
      <SecondSection
        paginations={existingData?.paginations}
        existingData={existingData?.data?.blogData}
        sectionData={existingData?.sections?.blogSection}
      />
    </>
  );
}
