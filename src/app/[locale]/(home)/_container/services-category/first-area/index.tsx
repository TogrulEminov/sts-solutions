import SliderArea from "./slider";

export default function FirstArea() {
  return (
    <div className="flex flex-col">
      <div className="container flex flex-col space-y-10 relative">
        <div className="flex items-center h-14.5   servicesFirst justify-between rounded-[10px]">
          <strong className="font-manrope font-bold lg:text-[30px] lg:leading-[38px] py-2.5 px-6 text-white">
            Mühəndislik xidmətlərimiz
          </strong>
        </div>
        <SliderArea />
      </div>
    </div>
  );
}
