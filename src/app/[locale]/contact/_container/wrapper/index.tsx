import InformationArea from "./information";
import FormContactWrapper from "./form";

export default function ContactWrapper() {
  return (
    <section className="lg:py-25 py-15">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10">
          <InformationArea />
          <FormContactWrapper />
        </div>
      </div>
    </section>
  );
}
