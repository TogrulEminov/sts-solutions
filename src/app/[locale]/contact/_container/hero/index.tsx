import CustomImage from "@/src/globalElements/ImageTag";
import { CategoryItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  existingData: CategoryItem;
}
export default async function ContactHero({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-20 min-h-60 lg:min-h-120 relative flex items-center">
      <div className="absolute inset-0 w-full h-full bg-ui-25/80 z-2"></div>
      <CustomImage
        width={1920}
        height={400}
        title=""
        className="block w-full h-full inset-0 absolute z-1 object-cover"
        src={getForCards(existingData?.imageUrl as FileType)}
      />
      <div className="container relative z-3 flex flex-col space-y-3">
        <h1
          title={existingData?.translations?.[0]?.seo?.metaTitle}
          className="text-2xl lg:text-[56px] lg:leading-16 text-white max-w-206 font-extrabold font-inter"
        >
          {existingData?.translations?.[0]?.title}
        </h1>
        <p className="font-inter  lg:text-[28px] text-white font-normal lg:leading-9">
          {existingData?.translations?.[0]?.description}
        </p>
      </div>
    </section>
  );
}
