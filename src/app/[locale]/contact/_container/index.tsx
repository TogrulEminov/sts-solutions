import ContactHero from "./hero";
import ContactWrapper from "./wrapper";
import MapSection from "./wrapper/map";
import ServicesTagSection from "@/src/ui/layout/services";

export default function ContactPageContainer() {
  return (
    <>
      <ContactHero />
      <ContactWrapper />
      <MapSection lat="40.394694" lng="49.7725592" />
      <ServicesTagSection />
    </>
  );
}
