import { SolutionsItem } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";

interface Props {
  existingData: SolutionsItem;
}
export default async function SolutionsDetailHeroSection({
  existingData,
}: Props) {
  const translations = existingData?.translations?.[0];
  const t = await getTranslations("solutions");
  return (
    <section className="py-15 lg:py-25 bg-ui-21">
      <div className="container">
        <article className="flex flex-col space-y-2 max-w-3xl">
          <h2
            title={translations?.seo?.metaTitle}
            className="font-inter text-xl lg:text-2xl text-ui-1 font-medium"
          >
            {t("solutions")}
          </h2>
          <h1
            title={translations?.seo?.metaTitle}
            className="font-inter text-2xl lg:text-[46px]  lg:leading-[58px] text-white font-bold"
          >
            {translations?.title}
          </h1>
          <p className="font-inter text-base lg:text-lg font-normal text-white">
            {translations?.subDescription}
          </p>
        </article>
      </div>
    </section>
  );
}
