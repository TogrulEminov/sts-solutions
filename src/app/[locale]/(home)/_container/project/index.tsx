import AnimatedProjectButton from "@/src/ui/link/second";
import SlideArea from "./slide";
import { Projects, SectionContent } from "@/src/services/interface";
import { getTranslations } from "next-intl/server";
interface Props {
  sectionData: SectionContent;
  existingData: Projects[];
}
export default async function ProjectsSection({
  existingData,
  sectionData,
}: Props) {
  if (!existingData?.length || !sectionData) {
    return null;
  }
  const t = await getTranslations();

  return (
    <section className="py-15 lg:py-25 overflow-hidden flex flex-col space-y-10">
      <div className="container flex flex-col space-y-5 lg:flex-row lg:items-center lg:justify-between">
        <article className="flex flex-col space-y-5">
          <strong className="font-inter font-bold text-2xl lg:text-[36px] lg:leading-11 text-ui-13">
            {sectionData?.translations?.[0]?.title}
          </strong>
          <p className="text-base font-normal font-inter text-ui-13 max-w-lg">
            {sectionData?.translations?.[0]?.description}
          </p>
        </article>
        <AnimatedProjectButton
          title={t("home.projectsLink")}
          link="/projects"
        />
      </div>
      <SlideArea existingData={existingData} />
    </section>
  );
}
