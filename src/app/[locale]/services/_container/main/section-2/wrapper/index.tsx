import ServicesMainCard from "@/src/globalElements/cards/services/main";
import React from "react";

export default function CardWrapper() {
  return (
    <div className="grid lg:grid-cols-3 gap-3">
      {Array.from({ length: 7 }).map((_, index) => {
        return <ServicesMainCard key={index} />;
      })}
    </div>
  );
}
