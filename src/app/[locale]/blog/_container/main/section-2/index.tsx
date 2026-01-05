import {
  BlogItem,
  PaginationItem,
  SectionContent,
} from "@/src/services/interface";
import CardWrapper from "./wrapper";
import GlobalPagination from "@/src/globalElements/pagination";
interface Props {
  existingData: BlogItem[];
  sectionData: SectionContent;
  paginations: PaginationItem;
}
export default function SecondSection({
  existingData,
  sectionData,
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
