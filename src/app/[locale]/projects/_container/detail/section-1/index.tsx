import GalleryCard from "@/src/globalElements/cards/gallery";
import ReactFancyBox from "@/src/lib/fancybox";
import { FileType, Projects } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  existingData: Projects;
}
export default async function HeroDetailSection({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-25 bg-ui-21">
      <div className="container flex flex-col gap-y-5 lg:gap-y-10">
        <article className="flex flex-col gap-y-3">
          {existingData?.translations?.[0]?.subTitle && (
            <strong className="font-inter text-base lg:text-xl text-white font-normal">
              {existingData?.translations?.[0]?.subTitle}
            </strong>
          )}
          <h1
            title={
              existingData?.translations?.[0]?.seo?.metaTitle ||
              existingData?.translations?.[0]?.title
            }
            className="max-w-5xl font-inter text-2xl lg:text-[46px] lg:leading-14.5 text-white font-bold"
          >
            {existingData?.translations?.[0]?.title}
          </h1>
        </article>
        {existingData?.gallery?.length ? (
          <ReactFancyBox className="flex items-center scrollbar-hidden max-w-5xl lg:grid gap-3 lg:grid-cols-3">
            {existingData?.gallery?.slice(0, 3).map((img, index) => {
              return (
                <GalleryCard
                  key={index}
                  index={index}
                  img={getForCards(img as FileType)}
                  className="w-[250px] h-40! shrink-0 lg:w-full lg:h-full!"
                />
              );
            })}
          </ReactFancyBox>
        ) : null}
      </div>
    </section>
  );
}
