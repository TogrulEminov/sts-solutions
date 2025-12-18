import SliderArea from "./slider";

export default function ServicesSection() {
  return (
    <section className="lg:py-20 bg-ui-2 rounded-tl-[28px] rounded-br-[28px]">
      <div className="container flex flex-col space-y-10">
        <div className="flex items-center justify-between">
          <strong className="font-manrope font-extrabold lg:text-[45px] lg:leading-[57px] text-white">
            <span className="text-ui-1 block">Xidmətlərimizdən</span> yararlanın
          </strong>
          <p className="font-manrope max-w-lg text-white text-base text-right">
            İstənilən sənaye prosesini daha təhlükəsiz, sürətli və effektiv edən
            ağıllı mühəndislik və avtomatlaşdırma həllərini sizin üçün
            hazırlayırıq.
          </p>
        </div>
        <SliderArea/>
      </div>
    </section>
  );
}
