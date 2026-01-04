import ContactHero from "./hero";
import ContactWrapper from "./wrapper";
import MapSection from "./wrapper/map";
import ServicesTagSection from "@/src/ui/layout/services";
interface Props {
  existingData: any;
}
export default function ContactPageContainer({ existingData }: Props) {
  return (
    <>
      <ContactHero existingData={existingData?.data?.categoriesData} />
      <ContactWrapper
        existingData={existingData?.data?.contactData}
        socialsData={existingData?.data?.socialsData}
        servicesData={existingData?.data?.servicesData}
      />
      <MapSection  existingData={existingData?.data?.contactData}/>
      <ServicesTagSection
        sectionData={existingData?.sections?.servicesMainSection}
        services={existingData?.data?.servicesData}
      />
    </>
  );
}
