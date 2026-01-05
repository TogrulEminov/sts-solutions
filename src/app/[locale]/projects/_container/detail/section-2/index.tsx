import React from "react";
import ReactFancyBox from "@/src/lib/fancybox";
import GalleryCard from "@/src/globalElements/cards/gallery";
import { FileType, Projects } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";
import { sanitizeHtml } from "@/src/lib/domburify";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  existingData: Projects;
}
export default async function ProjectsContent({ existingData }: Props) {
  const t = await getTranslations("projects");
  const getSpanClass = (index: number) => {
    const patterns = [
      "h-60 shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-6 lg:row-span-2",
      "h-60 shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-3",
      "h-60 shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-3",
      "h-60  shrink-0 w-[250px] lg:w-full lg:h-full lg:col-span-6",
    ];

    return patterns[index % patterns.length];
  };

  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="flex flex-col space-y-2 lg:space-y-4">
          <strong className="font-inter text-ui-21 text-2xl lg:text-[40px] lg:leading-12 font-bold">
            {t("subtitle")}
          </strong>
          <article
            className="font-inter font-normal text-base lg:text-xl text-ui-7"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                existingData?.translations?.[0]?.description
              ),
            }}
          />
        </div>
        {existingData?.gallery && existingData?.gallery?.length > 3 ? (
          <ReactFancyBox className="flex scrollbar-hidden items-center max-w-5xl lg:max-w-full overflow-x-auto lg:overflow-x-hidden lg:items-[unset] lg:grid lg:grid-cols-12  md:auto-rows-[240px] lg:auto-rows-[280px] gap-4 lg:gap-5">
            {existingData?.gallery.slice(3).map((img, index) => {
              return (
                <div key={index} className={getSpanClass(index)}>
                  <GalleryCard
                    img={getForCards(img as FileType)}
                    index={index}
                    className="w-full shrink-0"
                  />
                </div>
              );
            })}
          </ReactFancyBox>
        ) : null}
      </div>
    </section>
  );
}
