import SliderArea from "./slider";
import { ServicesSubCategoryItem } from "@/src/services/interface";
import { sanitizeHtml } from "@/src/lib/domburify";
interface Props {
  existingData: ServicesSubCategoryItem;
}
export default async function SectionTwo({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-25 lg:pb-10">
      <div className="container mb-5 lg:mb-10">
        <div className="flex flex-col space-y-5">
          <h2
            title={existingData?.translations?.[0]?.seo?.metaTitle}
            className="font-inter lg:text-[40px] lg:leading-12 text-ui-7 font-bold"
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
      <SliderArea  existingData={existingData?.gallery || []}/>
    </section>
  );
}
