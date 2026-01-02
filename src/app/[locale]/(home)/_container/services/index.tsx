import { SectionContent, ServicesCategoryItem } from "@/src/services/interface";
import SliderArea from "./slider";
import { highlightActiveWord } from "@/src/utils/highlight";
interface Props {
  sectionData: SectionContent;
  existingData: ServicesCategoryItem[];
}
export default function ServicesSection({ sectionData, existingData }: Props) {
  if (!existingData.length || !sectionData) {
    return null;
  }
  
  return (
    <section className="py-10 lg:py-20 -mt-3 lg:-mt-5 relative z-5 bg-ui-2 overflow-hidden  rounded-tl-2xl rounded-br-2xl lg:rounded-tl-[28px] lg:rounded-br-[28px]">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="flex items-start lg:items-center gap-y-5 flex-col lg:flex-row lg:justify-between">
          <strong className="font-inter font-extrabold text-2xl lg:text-[45px] lg:leading-[57px] text-white">
            {highlightActiveWord(
              sectionData?.translations?.[0]?.title,
              sectionData?.translations?.[0]?.highlightWord,
              "text-ui-1 lg:block"
            )}
          </strong>
          <p className="font-inter lg:max-w-lg text-white text-base text-start lg:text-right">
            {sectionData?.translations?.[0]?.description}
          </p>
        </div>
        <SliderArea existingData={existingData} />
      </div>
    </section>
  );
}
