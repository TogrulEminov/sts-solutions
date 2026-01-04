import InformationArea from "./information";
import FormContactWrapper from "./form";
import {
  IContactInformation,
  ServicesCategoryItem,
  Social,
} from "@/src/services/interface";
interface Props {
  existingData: IContactInformation;
  socialsData: Social[];
  servicesData: ServicesCategoryItem[];
}
export default async function ContactWrapper({
  existingData,
  socialsData,servicesData
}: Props) {
  return (
    <section className="lg:py-25 py-10">
      <div className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-10">
          <InformationArea
            existingData={existingData}
            socialsData={socialsData}
          />
          <FormContactWrapper servicesData={servicesData}/>
        </div>
      </div>
    </section>
  );
}
