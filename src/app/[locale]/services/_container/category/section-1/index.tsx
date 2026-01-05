import { ServicesCategoryItem } from "@/src/services/interface";
import React from "react";
interface Props {
  existingData: ServicesCategoryItem;
}
export default function SectionOne({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-20 bg-ui-21">
      <div className="container">
        <h1
          title={existingData?.translations?.[0]?.seo?.metaTitle}
          className="font-inter font-bold text-2xl lg:text-[46px] lg:leading-14.5 text-ui-1"
        >
          {existingData?.translations?.[0]?.title}
        </h1>
      </div>
    </section>
  );
}
