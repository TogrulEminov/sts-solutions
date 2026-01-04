import React from "react";
import CountArea from "./count";
import { Plus } from "lucide-react";
import { IAbout } from "@/src/services/interface";
import { sanitizeHtml } from "@/src/lib/domburify";
interface Props {
  existingData: IAbout;
}
export default async function AboutContent({ existingData }: Props) {
  const translations = existingData?.translations?.[0];
  return (
    <section className="py-10 lg:py-20">
      <div className="container">
        <div className="flex flex-col space-y-5 lg:space-y-10">
          <strong className="font-inter font-extrabold text-[28px] leading-10 lg:text-[56px] lg:leading-16 text-ui-21">
            {translations?.subTitle}
          </strong>
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-10">
            <div className="flex gap-3  items-center lg:col-span-4">
              <CountArea count={existingData?.experienceYears} />
              <div className="flex flex-col space-y-1">
                <span className="lg:text-[80px] leading-normal font-extrabold font-inter">
                  <Plus className="text-ui-1" size={80} />
                </span>
                <span className="font-inter font-bold lg:text-[28px] lg:leading-9 text-ui-2">
                  {translations?.experienceDescription}
                </span>
              </div>
            </div>
            {translations?.subDescription && (
              <article
                className="lg:col-span-8 font-inter lg:text-2xl text-ui-7 highlight font-normal"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(translations?.subDescription),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
