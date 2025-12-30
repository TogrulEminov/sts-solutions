import InformationArea from "./information";
import FormContactWrapper from "./form";

export default function ContactWrapper() {
  return (
    <section className="lg:py-25 py-10">
      <div className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-10">
          <InformationArea />
          <FormContactWrapper />
        </div>
      </div>
    </section>
  );
}
