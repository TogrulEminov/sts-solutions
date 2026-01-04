import React from "react";
import ProcessSteps from "./line";
import { IAbout, SectionContent } from "@/src/services/interface";
interface Props {
  existingData: IAbout;
  sectionData: SectionContent;
}
export default async function ProcessSection({ existingData, sectionData }: Props) {
  if (
    !existingData?.translations?.[0]?.purpose ||
    !sectionData?.translations?.length
  )
    return null;
  return (
    <section className="pb-10 lg:pb-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <strong className="font-inter font-extrabold text-2xl lg:text-[46px] lg:leading-13.5 text-ui-1">
            {sectionData?.translations?.[0]?.title}
          </strong>
          <p className="lg:text-right lg:max-w-lg  font-inter font-normal text-base lg:text-lg text-ui-7">
            {sectionData?.translations?.[0]?.description}
          </p>
        </div>
        <ProcessSteps
          existingData={existingData?.translations?.[0]?.purpose || []}
        />
      </div>
    </section>
  );
}
