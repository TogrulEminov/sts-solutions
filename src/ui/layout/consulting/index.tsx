import { IContactInformation, SectionContent, ServicesCategoryItem } from "@/src/services/interface";
import FormContactWrapper from "./form";
import Information from "./information";
interface Props {
  sectionData: SectionContent;
  existingData: IContactInformation;
  services:ServicesCategoryItem[]
}
export default async function ConsultingSection({
  sectionData,
  existingData,services
}: Props) {
  return (
    <section className="py-10 bg-ui-1/11">
      <div className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          <Information sectionData={sectionData} existingData={existingData}/>
          <FormContactWrapper servicesData={services} />
        </div>
      </div>
    </section>
  );
}
