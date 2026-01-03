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
interface Props {
  homeData: any;
}
export default async function HomePageContainer({ homeData }: Props) {
  
  return (
    <>
      <HeroSection sliderData={homeData?.data?.sliderData} />
      <ServicesSection
        sectionData={homeData?.sections?.servicesMainSection}
        existingData={homeData?.data?.servicesData}
      />
      <AboutSection exisingData={homeData?.data?.aboutData} />
      <ServicesCategorySection  sectionData={homeData?.sections?.servicesSubSection} existingData={homeData?.data?.servicesMainData}/>
      <SolutionsSection  sectionData={homeData?.sections?.solutionsSection} existingData={homeData?.data?.solutionsData}/>
      <PartnerSection   sectionData={homeData?.sections?.partnersSection} existingData={homeData?.data?.partnersData}/>
      <ProjectsSection />
      <ConsultingSection />
      <NewsSection />
      <FagSection />
    </>
  );
}
