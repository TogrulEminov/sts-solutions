import GlobalPagination from "@/src/globalElements/pagination";
import CardContainer from "./cardContainer";
export default function CardWrapper() {
  return (
    <section className="py-15 lg:py-25">
      <div className="container flex flex-col space-y-10">
        <article className="flex flex-col space-y-5 max-w-lg">
          <strong className="text-ui-21 lg:text-[40px] lg:leading-12 font-bold font-inter">
            Layihələrimiz
          </strong>
          <p className="font-inter font-normal lg:text-lg text-ui-7">
            Fərqli sənaye sahələrində həyata keçirdiyimiz uğurlu layihələr
            innovativ yanaşmamızı və texniki bacarığımızı əks etdirir.
          </p>
        </article>
        <CardContainer />
        <GlobalPagination total={120} />
      </div>
    </section>
  );
}
