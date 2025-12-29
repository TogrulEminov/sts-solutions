import { highlightActiveWord } from "@/src/utils/highlight";
import SliderArea from "./slider";

export default function SolutionsSection() {
  return (
    <section className="py-10 lg:py-25 overflow-hidden">
      <div className="container flex flex-col space-y-4">
        <div className="grid grid-cols-1 space-y-3 lg:grid-cols-2 items-start">
          <div className="flex flex-col space-y-4">
            <strong className="font-inter font-extrabold text-2xl lg:text-[36px] lg:leading-11 text-ui-7">
              {highlightActiveWord(
                "Çətinliklərə Ağıllı Yanaşma —Həllərimiz",
                "—Həllərimiz",
                "text-ui-1 block"
              )}
            </strong>
          </div>
          <p className="font-inter text-start lg:text-right font-normal text-base text-black">
            Sənayenin müxtəlif sahələri üçün avtomatlaşdırma, proqramlaşdırma və
            kompleks texniki sistemlər üzrə tam inteqrasiya olunmuş mühəndislik
            xidmətləri təqdim edirik.
          </p>
        </div>
        <SliderArea />
      </div>
    </section>
  );
}
