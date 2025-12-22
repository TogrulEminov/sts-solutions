import { Link } from "@/src/i18n/navigation";
import SliderArea from "./slider";
import HeroImage from "./img";

export default function HeroAbout() {
  return (
    <section className="py-20 h-screen flex items-center relative overflow-hidden">
      <HeroImage />
      <div className="absolute inset-0 w-full h-full z-2 bg-black/45"></div>
      <div className="container relative z-4 py-10">
        <article className="flex flex-col space-y-10 max-w-4xl animate-fadeInUp">
          <h1 className="font-manrope font-extrabold lg:text-[56px] lg:leading-16 text-white">
            Gələcəyi dizayn edən texniki həllər
          </h1>
          <p className="font-manrope font-normal lg:text-[28px] lg:leading-9 text-white">
            Komandamız hər bir sifarişçi üçün hədəf məqsədin effektiv və çevik
            gerçəkləşməsini təmin etməyə xidmət edən fəaliyyət modeli ilə
            çalışır
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={"/"}
              className="flex items-center justify-center bg-ui-20 px-6 py-2 min-w-38.5 min-h-10 h-fit w-fit bg-20 border-[0.5px] border-white rounded-[30px] font-manrope font-semibold text-base text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 hover:border-white/80"
            >
              Xidmətlərimiz
            </Link>
            <Link
              href={"/"}
              className="flex items-center justify-center bg-ui-20 px-6 py-2 min-w-38.5 min-h-10 h-fit w-fit bg-20 border-[0.5px] border-white rounded-[30px] font-manrope font-semibold text-base text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 hover:border-white/80"
            >
              Həllərimiz
            </Link>
            <Link
              href={"/"}
              className="flex items-center justify-center bg-ui-20 px-6 py-2 min-w-38.5 min-h-10 h-fit w-fit bg-20 border-[0.5px] border-white rounded-[30px] font-manrope font-semibold text-base text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 hover:border-white/80"
            >
              Layihələrimiz
            </Link>
          </div>
        </article>
      </div>
      <SliderArea />
    </section>
  );
}
