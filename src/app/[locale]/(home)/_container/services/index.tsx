import SliderArea from "./slider";

export default function ServicesSection() {
  return (
    <section className="py-10 lg:py-20 -mt-3 lg:-mt-5 relative z-5 bg-ui-2 overflow-hidden  rounded-tl-2xl rounded-br-2xl lg:rounded-tl-[28px] lg:rounded-br-[28px]">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <div className="flex items-start lg:items-center gap-y-5 flex-col lg:flex-row lg:justify-between">
          <strong className="font-inter font-extrabold text-2xl lg:text-[45px] lg:leading-[57px] text-white">
            <span className="text-ui-1 block">Xidmətlərimizdən</span> yararlanın
          </strong>
          <p className="font-inter lg:max-w-lg text-white text-base text-start lg:text-right">
            İstənilən sənaye prosesini daha təhlükəsiz, sürətli və effektiv edən
            ağıllı mühəndislik və avtomatlaşdırma həllərini sizin üçün
            hazırlayırıq.
          </p>
        </div>
        <SliderArea />
      </div>
    </section>
  );
}
