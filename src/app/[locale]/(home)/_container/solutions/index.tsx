import SliderArea from "./slider";

export default function SolutionsSection() {
  return (
    <section className="py-10 lg:py-25 overflow-hidden">
      <div className="container flex flex-col space-y-4">
        <div className="grid grid-cols-2 items-start">
          <div className="flex flex-col space-y-4">
            <strong className="font-inter font-extrabold lg:text-[36px] lg:leading-11 text-ui-7">
              Çətinliklərə Ağıllı Yanaşma
              <span className="block text-ui-1">—Həllərimiz</span>
            </strong>
          </div>
          <p className="font-inter text-right font-normal text-base text-black">
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
