import AboutImage from "./image";
import Content from "./content";
export default function AboutSection() {
  return (
    <section className="lg:py-25 py-10">
      <div className="container">
        <div className="lg:grid  gap-y-10  flex flex-col-reverse lg:grid-cols-2 items-start gap-2">
          <AboutImage />
          <Content />
        </div>
      </div>
    </section>
  );
}
