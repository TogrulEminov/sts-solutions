import SliderArea from "./slider";
import { BlogItem } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";
interface Props {
  existingData: BlogItem[];
}
export default async function ThirdSection({ existingData }: Props) {
  const t = await getTranslations("blog");
  if (!existingData?.length) return null;
  return (
    <section className="pb-10 lg:pb-20 overflow-hidden">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <strong className="font-bold text-2xl lg:text-[40px] text-ui-3 font-inter lg:leading-12">
          {t("relatedBlog")}
        </strong>
        <SliderArea existingData={existingData} />
      </div>
    </section>
  );
}
