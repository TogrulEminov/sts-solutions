import FormContactWrapper from "./form";
import Information from "./information";
export default function ConsultingSection() {
  return (
    <section className="py-10 bg-ui-1/11">
      <div className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          <Information />
          <FormContactWrapper />
        </div>
      </div>
    </section>
  );
}
