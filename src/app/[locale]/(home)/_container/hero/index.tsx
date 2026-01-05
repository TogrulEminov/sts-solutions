import { SliderItem } from "@/src/services/interface";
import SliderArea from "./slider";
interface Props {
  sliderData: SliderItem[];
}
export default async function HeroSection({ sliderData }: Props) {
  if (!sliderData?.length) return null;
  return (
    <section className="h-[70vh] lg:h-svh relative">
      <SliderArea sliderData={sliderData} />
    </section>
  );
}
