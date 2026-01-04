import EmployeeCard from "@/src/globalElements/cards/employee";
import { Employee, FileType, SectionContent } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  existingData: Employee[];
  sectionData: SectionContent;
}
export default async function TeamArea({ existingData, sectionData }: Props) {
  if (!existingData?.length || !sectionData?.translations?.length) return null;
  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <article className="flex flex-col space-y-5 lg:flex-row lg:items-center lg:justify-between">
          <strong className="font-inter font-extrabold text-2xl lg:text-4xl text-ui-1">
            {sectionData?.translations?.[0]?.title}
          </strong>
          <p className="lg:max-w-3xl lg:text-right text-ui-9  font-inter font-normal lg:text-2xl">
            {sectionData?.translations?.[0]?.description}
          </p>
        </article>
        <div className="flex scrollbar-hidden py-10 lg:py-0 items-center max-w-5xl lg:max-w-full overflow-x-auto lg:overflow-x-hidden pb-2 lg:grid lg:grid-cols-4 gap-3 lg:gap-6">
          {existingData?.map((employee, index) => (
            <EmployeeCard
              key={index}
              index={index}
              name={employee.translations?.[0]?.title}
              position={employee?.position?.translations?.[0]?.title}
              phone={employee.phone}
              email={employee.email}
              image={getForCards(employee?.imageUrl as FileType)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
