import React from "react";
import CardWrapper from "./card-wrapper";
import { getTranslations } from "next-intl/server";
import { ServicesSubCategoryItem } from "@/src/services/interface";
interface Props {
  existingData: ServicesSubCategoryItem;
}
export default async function SectionThree({ existingData }: Props) {
  const t = await getTranslations();
  if (!existingData?.translations?.[0]?.features?.length) return null;
  return (
    <section className="pb-10 lg:pb-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <h2 className="font-inter max-w-4xl font-bold lg:text-[40px] lg:leading-12 text-ui-7">
          {t("services.subTitleTwo")}
        </h2>
        <CardWrapper features={existingData?.translations?.[0]?.features} />
      </div>
    </section>
  );
}
