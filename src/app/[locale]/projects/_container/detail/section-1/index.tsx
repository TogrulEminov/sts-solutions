import GalleryCard from "@/src/globalElements/cards/gallery";
import ReactFancyBox from "@/src/lib/fancybox";

export default function HeroDetailSection() {
  return (
    <section className="py-10 lg:py-25 bg-ui-21">
      <div className="container flex flex-col space-y-5 lg:space-y-10">
        <article className="flex flex-col space-y-3">
          <strong className="font-inter text-base lg:text-xl text-white font-normal">
            İllərin Təcrübəsi ilə Reallaşdırılmış Layihələr
          </strong>
          <h1 className="max-w-5xl font-inter text-2xl lg:text-[46px] lg:leading-14.5 text-white font-bold">
            Tomat və Soyulmuş Pomidor Sahəsinin Kompleks Şəklində Qurulması və
            Avtomatlaşdırılması Layihəsi
          </h1>
        </article>
        <ReactFancyBox className="flex items-center scrollbar-hidden max-w-5xl lg:grid gap-3 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <GalleryCard
                key={index}
                index={index}
                className="w-[250px] h-40! shrink-0 lg:w-full lg:h-full!"
              />
            );
          })}
        </ReactFancyBox>
      </div>
    </section>
  );
}
