import GlobalPagination from "@/src/globalElements/pagination";
import CardContainer from "./cardContainer";
import {
  PaginationItem,
  Projects,
  SectionContent,
} from "@/src/services/interface";
interface Props {
  existingData: Projects[];
  section: SectionContent;
  paginations: PaginationItem;
}
export default function CardWrapper({
  section,
  existingData,
  paginations,
}: Props) {
  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <article className="flex flex-col space-y-2 lg:space-y-5 max-w-lg">
          <strong className="text-ui-21 text-2xl lg:text-[40px] lg:leading-12 font-bold font-inter">
            {section?.translations?.[0]?.title}
          </strong>
          <p className="font-inter font-normal  text-base lg:text-lg text-ui-7">
            {section?.translations?.[0]?.description}
          </p>
        </article>
        <CardContainer existingData={existingData} />
        <GlobalPagination paginations={paginations} />
      </div>
    </section>
  );
}
