import AnimatedProjectButton from "@/src/ui/link/second";
import SlideArea from "./slide";

export default function ProjectsSection() {
  return (
    <section className="py-15 lg:py-25 overflow-hidden flex flex-col space-y-10">
      <div className="container flex items-center justify-between">
        <article className="flex flex-col space-y-5">
          <strong className="font-manrope font-bold lg:text-[36px] lg:leading-11 text-ui-13">
            Layihələrimiz
          </strong>
          <p className="text-base font-normal font-manrope text-ui-13 max-w-lg">
            Fərqli sənaye sahələrində həyata keçirdiyimiz uğurlu layihələr
            innovativ yanaşmamızı və texniki bacarığımızı əks etdirir.
          </p>
        </article>
        <AnimatedProjectButton />
      </div>
      <SlideArea />
    </section>
  );
}
