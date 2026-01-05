import SliderArea from "./slider";
import { SolutionsItem } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";
interface Props {
  existingData: SolutionsItem[];
}
export default async function SectionFour({ existingData }: Props) {
  const t = await getTranslations("solutions");
  if (!existingData?.length) return null;
  return (
    <section className="pb-10 lg:pb-25 overflow-hidden">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <strong className="font-bold text-2xl lg:text-[40px] text-ui-3 font-inter lg:leading-12">
          {t("relatedSolutions")}
        </strong>
        <SliderArea existingData={existingData} />
      </div>
    </section>
  );
}
