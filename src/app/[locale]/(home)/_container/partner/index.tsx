"use client";
import React from "react";
import SlideArea from "./slide";
import { ConnectionItem, SectionContent } from "@/src/services/interface";
import { highlightActiveWord } from "@/src/utils/highlight";
interface Props {
  sectionData: SectionContent;
  existingData: ConnectionItem[];
}
export default function PartnerSection({ sectionData, existingData }: Props) {
  if (!existingData.length || !sectionData) {
    return null;
  }

  return (
    <section className="py-10 overflow-hidden bg-ui-1/13">
      <div className="container">
        <div className="flex lg:items-center flex-col lg:flex-row gap-8 ">
          <strong className="font-inter  text-start font-bold text-xl lg:text-2xl lg:text-[43px] lg:leading-16 text-ui-2 whitespace-nowrap">
            {highlightActiveWord(
              sectionData?.translations?.[0]?.title,
              sectionData?.translations?.[0]?.highlightWord,
              "text-ui-1 lg:block"
            )}
          </strong>
          <SlideArea existingData={existingData} />
        </div>
      </div>
    </section>
  );
}
