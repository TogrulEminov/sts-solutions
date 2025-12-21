import ServicesTagSection from "@/src/ui/layout/services";
import ContactHero from "./_container/hero";
import ContactWrapper from "./_container/wrapper";
import MapSection from "./_container/wrapper/map";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactWrapper />
      <MapSection lat="40.394694" lng="49.7725592" />
      <ServicesTagSection/> 
    </>
  );
}
