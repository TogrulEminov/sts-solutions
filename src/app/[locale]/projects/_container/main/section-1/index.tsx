import Statistics from "./statistics";
import SliderArea from "./slider";

export default function HeroProjectsSection() {
  return (
    <section className="pb-10 pt-40 lg:pt-70 overflow-hidden lg:pb-20 min-h-60   bg-ui-21">
      <div className="container items-center flex flex-col lg:flex-row lg:justify-between gap-25">
        <article className="flex  max-w-xl flex-col space-y-3 shrink-0">
          <h1 className="font-manrope lg:text-[46px]  font-extrabold lg:leading-14.5 text-white">
            Mühəndislikdə Dəqiqlik, Nəticədə Etibar
          </h1>
          <p className="lg:text-xl font-manrope font-normal text-white">
            İllərin Təcrübəsi ilə Reallaşdırılmış Layihələr
          </p>
        </article>
        <Statistics/>
      </div>
      <SliderArea/>
    </section>
  );
}
