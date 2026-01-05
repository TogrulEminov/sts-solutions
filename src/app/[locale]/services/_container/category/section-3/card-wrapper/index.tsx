import ServicesCategoryCard from "@/src/globalElements/cards/services/category";
import { ServicesSubCategoryItem } from "@/src/services/interface";
import React from "react";
interface Props {
  existingData: ServicesSubCategoryItem[];
  category: string;
}
export default function CardWrapper({ existingData,category }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {existingData?.map((service, index) => {
        return <ServicesCategoryCard key={index} service={service} category={category}/>;
      })}
    </div>
  );
}
