import { ServicesCategoryItem } from "@/src/services/interface";
import SliderArea from "./slider";
interface Props {
  existingData: ServicesCategoryItem[];
}
export default async function SecondArea({ existingData }: Props) {
  if(!existingData?.[1]?.subCategory?.length) return null
  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-10 relative">
        <div className="flex items-center h-14.5  relative   justify-between rounded-[10px]">
          <strong className="font-inter font-bold text-lg lg:text-[30px] lg:leading-[38px] py-2.5 lg:px-6 text-white">
            {existingData?.[1]?.translations?.[0]?.title}
          </strong>
          <div className="servicesSecond absolute bottom-0  top-0 w-full h-full -right-10 lg:rounded-[10px]"></div>
        </div>
        <SliderArea  category={existingData?.[0]?.translations?.[0]?.slug} existingData={existingData?.[0]?.subCategory}/>
      </div>
    </div>
  );
}
