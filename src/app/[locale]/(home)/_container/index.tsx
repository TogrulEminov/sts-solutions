import CallAction from "@/src/ui/layout/call-action";
import FagSection from "./fag";
import NewsSection from "./news";
import ConsultingSection from "./consulting";
import ProjectsSection from "./project";
import PartnerSection from "./partner";
import SolutionsSection from "./solutions";
import ServicesCategorySection from "./services-category";

export default function HomePageContainer() {
  return (
    <main>
      <ServicesCategorySection />
      <SolutionsSection />
      <PartnerSection />
      <ProjectsSection />
      <ConsultingSection />
      <NewsSection />
      <FagSection />
      <CallAction />
    </main>
  );
}
