import FaqAccordion from "./accardion";
import { FagItem, SectionContent } from "@/src/services/interface";
interface Props {
  sectionData: SectionContent;
  existingData: FagItem[];
}
export default async function FagSection({ sectionData, existingData }: Props) {
  if (!existingData?.length || !sectionData) {
    return null;
  }
  return (
    <section className="py-10 lg:py-25">
      <div className="container">
        <div className="flex-col flex lg:grid lg:grid-cols-12 gap-5 lg:gap-10">
          <div className="lg:col-span-4 flex flex-col space-y-2 lg:space-y-4">
            <strong className="font-inter font-bold text-2xl lg:text-[32px] lg:leading-[42px] text-ui-4">
              {sectionData?.translations?.[0]?.title}
            </strong>
            <p className="font-inter font-bold  text-2xl lg:text-[32px] lg:leading-[42px] text-ui-5">
              {sectionData?.translations?.[0]?.description}
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={existingData} />
          </div>
        </div>
      </div>
    </section>
  );
}
