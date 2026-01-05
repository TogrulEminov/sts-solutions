import CardWrapper from "./card-wrapper";
import { getTranslations } from "next-intl/server";
import { ServicesSubCategoryItem } from "@/src/services/interface";
import { parseJSON } from "@/src/utils/checkSlug";
interface Props {
  existingData: ServicesSubCategoryItem;
}
export default async function SectionThree({ existingData }: Props) {
  const t = await getTranslations();

  const features = existingData?.translations?.[0]?.features;
  const parsedFeatures = parseJSON(features);

  if (!parsedFeatures || !Array.isArray(parsedFeatures) || parsedFeatures.length === 0) {
    return null;
  }

  return (
    <section className="pb-10 lg:pb-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <h2 className="font-inter max-w-4xl font-bold lg:text-[40px] lg:leading-12 text-ui-7">
          {t("services.subTitleTwo")}
        </h2>
        <CardWrapper features={features} />
      </div>
    </section>
  );
}
