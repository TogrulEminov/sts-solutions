import FirstArea from "./first-area";
import SecondArea from "./second-area";
import { SectionContent, ServicesCategoryItem } from "@/src/services/interface";
interface Props {
  sectionData: SectionContent;
  existingData: ServicesCategoryItem[];
}
export default async function ServicesCategorySection({
  sectionData,
  existingData,
}: Props) {
  if (!existingData.length || !sectionData) {
    return null;
  }

  return (
    <section className="py-10 lg:py-20 bg-ui-2   overflow-hidden  rounded-tl-2xl lg:rounded-tl-[50px] rounded-br-2xl lg:rounded-br-[50px]">
      <div className="container flex flex-col  space-y-6 lg:space-y-10">
        <div className="flex flex-col  space-y-6 lg:flex-row lg:items-center lg:justify-between">
          <strong className="max-w-sm font-inter font-extrabold text-2xl lg:text-[46px] lg:leading-[54px] text-white">
            {sectionData?.translations?.[0]?.title}
          </strong>
          <p className="font-inter font-normal lg:max-w-lg text-base text-start lg:text-right text-white">
            {sectionData?.translations?.[0]?.description}
          </p>
        </div>
        <FirstArea  existingData={existingData}/>
        <SecondArea existingData={existingData}/>
      </div>
    </section>
  );
}
