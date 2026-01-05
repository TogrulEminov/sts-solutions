import React from "react";
import SliderArea from "./slider";
import { ServicesCategoryItem } from "@/src/services/interface";
import { sanitizeHtml } from "@/src/lib/domburify";
interface Props {
  existingData: ServicesCategoryItem;
}
export default async function SectionTwo({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-25 lg:pb-10">
      <div className="container mb-10 lg:mb-20">
        <div className={`flex flex-col ${existingData?.gallery && "space-y-5"}`}>
          <h2
            title={existingData?.translations?.[0]?.seo?.metaTitle}
            className="font-inter text-2xl lg:text-[40px] lg:leading-12 text-ui-7 font-bold"
          >
            {existingData?.translations?.[0]?.subtitle}
          </h2>
          <article
            className="font-inter font-normal text-base text-justify lg:text-start lg:text-[28px] lg:leading-9 text-ui-7"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                existingData?.translations?.[0]?.description
              ),
            }}
          />
        </div>
      </div>
      <SliderArea gallery={existingData?.gallery || []} />
    </section>
  );
}
