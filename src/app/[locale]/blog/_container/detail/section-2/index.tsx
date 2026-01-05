import CustomImage from "@/src/globalElements/ImageTag";
import { sanitizeHtml } from "@/src/lib/domburify";
import { BlogItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  existingData: BlogItem;
}
export default async function SecondSection({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col lg:space-y-10 space-y-5">
        <figure className="h-full w-full">
          <CustomImage
            width={1200}
            height={600}
            title=""
            src={getForCards(existingData?.imageUrl as FileType)}
            className="w-full h-full rounded-lg max-h-150"
          />
        </figure>
        <article
          className="font-inter font-normal lg:text-[28px] text-ui-7"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(existingData?.translations?.[0]?.description),
          }}
        />
      </div>
    </section>
  );
}
