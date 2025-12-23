import CallAction from "@/src/ui/layout/call-action";
import FagSection from "./fag";
import NewsSection from "./news";
import ConsultingSection from "../../../../ui/layout/consulting";
import ProjectsSection from "./project";
import PartnerSection from "./partner";
import SolutionsSection from "./solutions";
import ServicesCategorySection from "./services-category";
import AboutSection from "./about";
import ServicesSection from "./services";
import HeroSection from "./hero";

export default async function HomePageContainer() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ServicesCategorySection />
      <SolutionsSection />
      <PartnerSection />
      <ProjectsSection />
      <ConsultingSection />
      <NewsSection />
      <FagSection />
      <CallAction />
    </>
  );
}
