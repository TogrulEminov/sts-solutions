import CustomImage from "@/src/globalElements/ImageTag";
import { CategoryItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
import { highlightActiveWord } from "@/src/utils/highlight";
interface Props {
  existingData: CategoryItem;
}
export default async function SectionOne({ existingData }: Props) {
  return (
    <div className="py-10 lg:py-25 bg-ui-24">
      <div className="container grid  grid-cols-1 lg:grid-cols-12 items-center gap-5">
        <div className="flex flex-col space-y-5 lg:col-span-7">
          <h1
            title={existingData?.translations?.[0]?.seo?.metaTitle}
            className="font-inter text-2xl lg:text-[46px] font-semibold lg:leading-14.5 text-ui-1"
          >
            {highlightActiveWord(
              existingData?.translations?.[0]?.title,
              existingData?.translations?.[0]?.highlight,
              "text-ui-2"
            )}
          </h1>
          <p className="text-ui-7 font-inter text-sm text-justify lg:text-start lg:text-2xl">
            {existingData?.translations?.[0]?.description}
          </p>
        </div>
        <CustomImage
          width={446}
          height={283}
          title=""
          src={getForCards(existingData?.imageUrl as FileType)}
          className="w-full lg:max-w-[446px] h-auto border-4 border-ui-1/18 rounded-tr-[44px] rounded-bl-[44px]  lg:col-span-5"
        />
      </div>
    </div>
  );
}
