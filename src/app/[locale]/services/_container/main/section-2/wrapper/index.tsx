import ServicesMainCard from "@/src/globalElements/cards/services/main";
import { ServicesCategoryItem } from "@/src/services/interface";
import NoData from "@/src/ui/essential/no-data";
import React from "react";
interface Props {
  existingData: ServicesCategoryItem[];
}
export default async function CardWrapper({ existingData }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {existingData?.length ? (
        existingData.map((service, index) => {
          return <ServicesMainCard service={service} key={index} />;
        })
      ) : (
        <NoData className="lg:col-span-3 xl:col-span-4" />
      )}
    </div>
  );
}
