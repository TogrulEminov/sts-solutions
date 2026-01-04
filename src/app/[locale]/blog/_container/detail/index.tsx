import FirstSection from "./section-1";
import SecondSection from "./section-2";
import ThirdSection from "./section-3";
interface Props {
  existingData: any;
}
export default async function BlogDetailPageContainer({ existingData }: Props) {
  return (
    <>
      <FirstSection existingData={existingData?.data?.blogDetailData} />
      <SecondSection existingData={existingData?.data?.blogDetailData} />
      <ThirdSection existingData={existingData?.data?.relatedData} />
    </>
  );
}
