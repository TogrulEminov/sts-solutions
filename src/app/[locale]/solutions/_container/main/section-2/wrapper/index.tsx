import SolutionsCard from "@/src/globalElements/cards/solutions";
import { SolutionsItem } from "@/src/services/interface";
import NoData from "@/src/ui/essential/no-data";
import React from "react";
interface Props {
  existingData: SolutionsItem[];
}
export default function CardWrapper({ existingData }: Props) {
  return (
    <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
      {existingData?.length ? (
        existingData?.map((solution, index) => {
          return <SolutionsCard key={index} solution={solution} />;
        })
      ) : (
        <NoData className="lg:col-span-3" />
      )}
    </div>
  );
}
