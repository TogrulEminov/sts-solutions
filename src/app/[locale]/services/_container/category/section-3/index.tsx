import React from "react";
import CardWrapper from "./card-wrapper";
import { ServicesCategoryItem } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";
interface Props {
  existingData: ServicesCategoryItem;
}
export default async function SectionThree({ existingData }: Props) {
  const t = await getTranslations("services");

  if (!existingData?.subCategory?.length) return;
  return (
    <section className="pb-10 lg:pb-25">
      <div className="container flex flex-col space-y-5 lg:space-y-15">
        <h2 className="font-inter font-bold text-2xl lg:text-[40px] lg:leading-12 text-ui-7">
          {t("subTitle")}
        </h2>
        <CardWrapper
          existingData={existingData?.subCategory}
          category={existingData?.translations?.[0]?.slug}
        />
      </div>
    </section>
  );
}
