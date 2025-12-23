import SliderArea from "./slider";

export default function SecondArea() {
  return (
    <div className="flex flex-col">
      <div className="container flex flex-col space-y-10 relative">
        <div className="flex items-center h-14.5  relative   justify-between rounded-[10px]">
          <strong className="font-inter font-bold lg:text-[30px] lg:leading-[38px] py-2.5 px-6 text-white">
            Təchizat xidmətlərimiz
          </strong>
          <div className="servicesSecond absolute bottom-0  top-0 w-full h-full -right-10 rounded-[10px]"></div>
        </div>
        <SliderArea />
      </div>
    </div>
  );
}
