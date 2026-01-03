import CustomImage from "@/src/globalElements/ImageTag";
import logo from "@/public/assets/logo/sts-logo.svg";
import { ServicesSubCategoryItem } from "@/src/services/interface";
interface Props {
  existingData: ServicesSubCategoryItem;
}
export default function SectionOne({ existingData }: Props) {
  return (
    <section className="py-10 lg:py-25 bg-ui-23">
      <div className="container">
        <div className="flex flex-col space-y-5 lg:space-y-10">
          <figure className="w-15 h-15 lg:w-20 lg:h-20   flex items-center justify-center bg-ui-1 border-4 border-white rounded-lg lg:rounded-2xl">
            <CustomImage
              width={40}
              title={existingData?.translations?.[0]?.seo?.metaTitle}
              src={logo}
              height={40}
              className="w-8 lg:w-12 brightness-0 invert-100"
            />
          </figure>
          <h1
            title={existingData?.translations?.[0]?.seo?.metaTitle}
            className="font-inter  max-w-3xl font-bold text-2xl lg:text-[46px] lg:leading-14.5 text-ui-1"
          >
            {existingData?.translations?.[0]?.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
