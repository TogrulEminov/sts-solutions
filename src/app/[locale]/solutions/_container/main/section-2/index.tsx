import React from "react";
import CardWrapper from "./wrapper";
import GlobalPagination from "@/src/globalElements/pagination";
import {
  PaginationItem,
  SectionContent,
  SolutionsItem,
} from "@/src/services/interface";
interface Props {
  sectionData: SectionContent;
  existingData: SolutionsItem[];
  paginations: PaginationItem;
}
export default function SolutionsCardWrapper({
  sectionData,
  existingData,
  paginations,
}: Props) {
  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <article className="lg:max-w-2xl flex flex-col space-y-2">
          <strong className="font-inter font-bold text-2xl lg:text-[40px] lg:leading-12 text-ui-3">
            {sectionData?.translations?.[0]?.title}
          </strong>
          <p className="font-inter font-medium text-base text-ui-3">
            {sectionData?.translations?.[0]?.description}
          </p>
        </article>
        <CardWrapper existingData={existingData} />
        <GlobalPagination paginations={paginations} />
      </div>
    </section>
  );
}
