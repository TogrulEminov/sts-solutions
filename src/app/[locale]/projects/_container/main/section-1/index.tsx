import { CategoryItem } from "@/src/services/interface";
import Statistics from "./statistics";
interface Props {
  existingData: CategoryItem;
}
export default function HeroProjectsSection({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-25  overflow-hidden lg:min-h-60   bg-ui-21">
      <div className="container items-center flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-25">
        <article className="flex  lg:max-w-xl flex-col space-y-3 shrink-0">
          <h1
            title={existingData?.translations?.[0]?.seo?.metaTitle}
            className="font-inter text-2xl lg:text-[46px]  font-extrabold lg:leading-14.5 text-white"
          >
            {existingData?.translations?.[0]?.title}
          </h1>
          <h2 className="lg:text-xl font-inter font-normal text-white">
            {existingData?.translations?.[0]?.subTitle}
          </h2>
        </article>
        <Statistics existingData={existingData?.translations?.[0]?.features || []} />
      </div>
    </section>
  );
}
