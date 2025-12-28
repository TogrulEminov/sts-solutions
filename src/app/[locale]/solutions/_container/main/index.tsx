import ConsultingSection from "@/src/ui/layout/consulting";
import SolutionsCardWrapper from "./section-2";
import SolutionsHeroSection from "./section-1";
import ServicesTagSection from "@/src/ui/layout/services";

export default function SolutionsMainPageContainer() {
  return (
    <>
      <SolutionsHeroSection />
      <SolutionsCardWrapper />
      <ConsultingSection />
      <ServicesTagSection/>
    </>
  );
}
