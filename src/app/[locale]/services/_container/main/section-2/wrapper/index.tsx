import ServicesMainCard from "@/src/globalElements/cards/services/main";
import React from "react";

export default function CardWrapper() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {Array.from({ length: 7 }).map((_, index) => {
        return <ServicesMainCard key={index} />;
      })}
    </div>
  );
}
