import CustomImage from "@/src/globalElements/ImageTag";
import { sanitizeHtml } from "@/src/lib/domburify";
import { FileType, SolutionsItem } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
import React from "react";
interface Props {
  existingData: SolutionsItem;
}
export default function SectionTwo({ existingData }: Props) {
  const translations = existingData?.translations?.[0];
  return (
    <section className="lg:py-25 py-10">
      <div className="container">
        <div className="grid  grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="flex flex-col space-y-5 lg:col-span-7">
            {translations?.subTitle && (
              <strong className="font-inter font-extrabold text-2xl lg:text-[40px] lg:leading-12 text-ui-2">
                {translations?.subTitle}
              </strong>
            )}
            <article
              className="lg:text-2xl text-ui-7 font-inter font-normal"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(translations?.description),
              }}
            />
          </div>
          <CustomImage
            width={446}
            height={283}
            title={translations?.seo?.metaTitle}
            src={getForCards(existingData?.imageUrl as FileType)}
            className="w-full lg:max-w-[446px] h-full border-4 border-ui-1/18 rounded-tr-[44px] rounded-bl-[44px]  object-cover lg:col-span-5"
          />
        </div>
      </div>
    </section>
  );
}
