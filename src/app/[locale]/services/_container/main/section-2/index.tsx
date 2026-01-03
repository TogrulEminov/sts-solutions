import CardWrapper from "./wrapper";
import { SectionContent, ServicesCategoryItem } from "@/src/services/interface";
interface Props {
  sectionData: SectionContent;
  existingData: ServicesCategoryItem[];
}
export default  async function SectionTwo({ sectionData, existingData }: Props) {
  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="max-w-2xl flex flex-col space-y-3 lg:space-y-5">
          <h2 className="font-inter text-2xl lg:text-[40px] font-bold lg:leading-12 text-ui-21">
            {sectionData?.translations?.[0]?.title}
          </h2>
          <p className="font-inter text-base text-ui-21 font-medium">
            {sectionData?.translations?.[0]?.description}
          </p>
        </div>
        <CardWrapper  existingData={existingData}/>
      </div>
    </section>
  );
}
