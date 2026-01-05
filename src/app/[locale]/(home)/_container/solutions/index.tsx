import { highlightActiveWord } from "@/src/utils/highlight";
import SliderArea from "./slider";
import { SectionContent, SolutionsItem } from "@/src/services/interface";
interface Props {
  sectionData: SectionContent;
  existingData: SolutionsItem[];
}
export default async function  SolutionsSection({ sectionData, existingData }: Props) {
  if (!existingData.length || !sectionData) {
    return null;
  }

  return (
    <section className="py-10 lg:py-25 overflow-hidden">
      <div className="container flex flex-col space-y-4">
        <div className="grid grid-cols-1 space-y-3 lg:grid-cols-2 items-start">
          <div className="flex flex-col space-y-4">
            <strong className="font-inter font-extrabold text-2xl lg:text-[36px] lg:leading-11 text-ui-7">
              {highlightActiveWord(
                sectionData?.translations?.[0]?.title,
                sectionData?.translations?.[0]?.highlightWord,
                "text-ui-1 lg:block"
              )}
            </strong>
          </div>
          <p className="font-inter text-start lg:text-right font-normal text-base text-black">
            {sectionData?.translations?.[0]?.description}
          </p>
        </div>
        <SliderArea existingData={existingData} />
      </div>
    </section>
  );
}
