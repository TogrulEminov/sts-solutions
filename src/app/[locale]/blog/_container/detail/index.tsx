import { BlogJsonLdScript } from "@/src/ui/json-ld/blog";
import FirstSection from "./section-1";
import SecondSection from "./section-2";
import ThirdSection from "./section-3";
interface Props {
  existingData: any;
}
export default async function BlogDetailPageContainer({ existingData }: Props) {
  return (
    <>
      <BlogJsonLdScript blogData={existingData?.data?.blogDetailData} />
      <FirstSection existingData={existingData?.data?.blogDetailData} />
      <SecondSection existingData={existingData?.data?.blogDetailData} />
      <ThirdSection existingData={existingData?.data?.relatedData} />
    </>
  );
}
