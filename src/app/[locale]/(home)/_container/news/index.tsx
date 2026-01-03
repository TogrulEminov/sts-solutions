import React from "react";
import SliderArea from "./slider";
import { AnimatedLinkV1 } from "@/src/ui/link/first";
import { BlogItem, SectionContent } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";
interface Props {
  sectionData: SectionContent;
  existingData: BlogItem[];
}
export default async function NewsSection({
  existingData,
  sectionData,
}: Props) {
  const t = await getTranslations();
  if (!existingData?.length || !sectionData) return;
  return (
    <section className="py-10 lg:py-25 flex flex-col space-y-10  overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between gap-10">
          <article className="flex flex-col space-y-2">
            <strong className="font-inter font-bold text-2xl lg:text-4xl text-ui-2">
              {sectionData?.translations?.[0]?.title}
            </strong>
            <p className="font-inter font-normal text-base lg:max-w-2xl text-ui-8">
              {sectionData?.translations?.[0]?.description}
            </p>
          </article>
          <AnimatedLinkV1 link="/blog" title={t("home.all")} />
        </div>
      </div>
      <SliderArea existingData={existingData} />
    </section>
  );
}
