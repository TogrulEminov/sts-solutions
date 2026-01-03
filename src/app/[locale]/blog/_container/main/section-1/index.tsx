import { CategoryItem } from "@/src/services/interface";
import { highlightActiveWord } from "@/src/utils/highlight";

interface Props {
  existingData: CategoryItem;
}
export default async function FirstSection({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-25 bg-ui-21">
      <div className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-center gap-5">
          <article className="flex flex-col space-y-2 lg:col-span-7">
            <h2
              title={existingData?.translations?.[0]?.seo?.metaTitle}
              className="font-inter text-lg lg:text-2xl text-white font-medium"
            >
              {existingData?.translations?.[0]?.subTitle}
            </h2>
            <h1 className="font-inter text-2xl lg:text-[46px] lg:leading-[58px] text-white font-bold">
              {highlightActiveWord(
                existingData?.translations?.[0]?.title,
                existingData?.translations?.[0]?.highlight,
                "text-ui-1"
              )}
            </h1>
            <p className="font-inter text-base lg:text-lg font-normal text-white">
              {existingData?.translations?.[0]?.description}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
