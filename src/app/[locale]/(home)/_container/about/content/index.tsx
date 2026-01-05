import React from "react";
import Statistics from "../statistics";
import AnimatedProjectButton from "@/src/ui/link/second";
import Icons from "@/public/icons";
import { IAboutHome, InfoGenericType } from "@/src/services/interface";
import { sanitizeHtml } from "@/src/lib/domburify";
import { getTranslations } from "next-intl/server";
import { parseJSON } from "@/src/utils/checkSlug";

interface Props {
  contentData: IAboutHome;
}
export default async function Content({ contentData }: Props) {
  const t = await getTranslations("home");
  const { translations } = contentData;
  return (
    <article className="flex flex-col space-y-6">
      <strong className="font-extrabold font-inter text-[28px] leading-9 lg:text-[60px] lg:leading-[76px] text-ui-7">
        {translations?.[0]?.title}
      </strong>
      {translations?.[0]?.subtitle && (
        <span className="font-normal  max-w-lg text-2xl lg:text-[30px] lg:leading-[38px] text-ui-15">
          {translations?.[0]?.subtitle}
        </span>
      )}
      {translations?.[0]?.description && (
        <article
          className="font-inter text-base lg:text-lg font-normal"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(translations?.[0]?.description),
          }}
        />
      )}
      <Statistics existingData={translations?.[0]?.statistics} />
      <AnimatedProjectButton title={t("moreInfo")} link="/about" />
      <strong className="text-ui-15">{t("sectors")}</strong>
      <div className="flex items-center gap-2 flex-wrap">
        {parseJSON<InfoGenericType>(translations?.[0]?.sectors)?.map(
          (item, index) => {
            return (
              <span
                key={index}
                className="group relative flex items-center gap-x-2 py-2 px-3 rounded-full bg-ui-1/16 border-[0.5px] border-ui-1 text-ui-2 font-inter font-bold text-base lg:text-xl transition-all duration-300 hover:bg-ui-2 hover:text-white hover:border-ui-2 hover:shadow-lg hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Icons.Sector
                  fill="currentColor"
                  className="relative z-10  w-4 h-4 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                />
                <span className="relative z-10">{item?.title}</span>
              </span>
            );
          }
        )}
      </div>
    </article>
  );
}
