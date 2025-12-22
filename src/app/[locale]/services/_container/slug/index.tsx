import CallAction from "@/src/ui/layout/call-action";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import ServicesTagSection from "@/src/ui/layout/services";
import ConsultingSection from "@/src/ui/layout/consulting";
export default function ServicesDetailPageContainer() {
  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <ConsultingSection />
      <ServicesTagSection />
      <CallAction />
    </>
  );
}
