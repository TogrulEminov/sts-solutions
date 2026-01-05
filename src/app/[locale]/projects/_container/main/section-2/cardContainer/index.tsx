import ProjectsCards from "@/src/globalElements/cards/projects";
import { Projects } from "@/src/services/interface";
import { Suspense } from "react";
interface Props {
  existingData: Projects[];
}
export default function CardContainer({ existingData }: Props) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-100 rounded-xl h-80 w-full"></div>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {existingData?.map((project, index) => {
          return <ProjectsCards key={index} project={project} />;
        })}
      </div>
    </Suspense>
  );
}
