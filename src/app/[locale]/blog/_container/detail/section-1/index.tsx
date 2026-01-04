import { BlogItem } from "@/src/services/interface";
import DateArea from "./date";
interface Props {
  existingData: BlogItem;
}
export default async function FirstSection({ existingData }: Props) {
  return (
    <section className="lg:py-25 py-10 bg-ui-3">
      <div className="container flex lg:space-y-10 flex-col space-y-5">
        <h1
          title={existingData?.translations?.[0]?.seo?.metaTitle}
          className="font-inter text-2xl font-bold lg:text-[46px] text-white lg:leading-14.5"
        >
          {existingData?.translations?.[0]?.title}
        </h1>
        <DateArea
          date={existingData?.updatedAt}
          locale={existingData?.translations?.[0]?.locale}
          readTime={existingData?.translations?.[0]?.readTime}
        />
      </div>
    </section>
  );
}
