import ServicesCategoryCard from "@/src/globalElements/cards/services/category";
import React from "react";

export default function CardWrapper() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {Array.from({ length: 12 }).map((_, index) => {
        return <ServicesCategoryCard key={index} />;
      })}
    </div>
  );
}
