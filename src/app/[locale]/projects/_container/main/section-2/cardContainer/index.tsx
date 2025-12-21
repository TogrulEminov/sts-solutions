import ProjectsCards from "@/src/globalElements/cards/projects";
import { Suspense } from "react";
export default function CardContainer() {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gray-100 rounded-xl h-80 w-full"></div>
      </div>
    }>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 12 }).map((_, index) => {
          return <ProjectsCards key={index} />;
        })}
      </div>
    </Suspense>
  );
}
