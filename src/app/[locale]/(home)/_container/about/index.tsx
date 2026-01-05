import AboutImage from "./image";
import Content from "./content";
import { IAboutHome } from "@/src/services/interface";
interface Props {
  exisingData: IAboutHome;
}
export default async function AboutSection({ exisingData }: Props) {
  if (!exisingData?.translations?.length) return null;
  return (
    <section className="lg:py-25 py-10">
      <div className="container">
        <div className="lg:grid  gap-y-10  flex flex-col-reverse lg:grid-cols-2 items-start gap-2">
          <AboutImage
            title={exisingData?.translations?.[0]?.title}
            gallery={exisingData?.gallery}
          />
          <Content contentData={exisingData} />
        </div>
      </div>
    </section>
  );
}
