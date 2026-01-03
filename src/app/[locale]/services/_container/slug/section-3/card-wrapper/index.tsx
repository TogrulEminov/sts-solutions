import { InfoGenericType } from "@/src/services/interface";
import ServicesProduct from "./card";
import { parseJSON } from "@/src/utils/checkSlug";
interface Props{
features:InfoGenericType[]
}
export default async function CardWrapper({features}:Props) {
  return (
    <div className="flex flex-col space-y-5 lg:space-y-10">
      {parseJSON<InfoGenericType>(features)?.map((item, index) => {
        return <ServicesProduct index={index + 1} key={index}  item={item}/>;
      })}
    </div>
  );
}
