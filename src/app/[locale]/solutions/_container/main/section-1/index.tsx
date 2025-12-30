import CustomImage from "@/src/globalElements/ImageTag";
import { highlightActiveWord } from "@/src/utils/highlight";

export default function SolutionsHeroSection() {
  return (
    <section className="py-10 lg:py-25 bg-ui-21">
      <div className="container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-center gap-5">
          <article className="flex flex-col space-y-2 lg:col-span-7">
            <h2 className="font-inter text-lg lg:text-2xl text-white font-medium">
              Həllərimiz
            </h2>
            <h1 className="font-inter text-2xl lg:text-[46px] lg:leading-[58px] text-white font-bold">
              {highlightActiveWord(
                "Layihələndirilmiş Sistemlər, Ölçülə Bilən Nəticələr",
                "Ölçülə Bilən Nəticələr",
                "text-ui-1 lg:block"
              )}
            </h1>
            <p className="font-inter text-base lg:text-lg font-normal text-white">
              Müasir texnologiyalar əsasında qurduğumuz sistemlərlə
              proseslərinizi avtomatlaşdırır, təhlükəsizliyi artırır və davamlı
              inkişaf təmin edirik.
            </p>
          </article>
          <CustomImage
            width={446}
            height={283}
            title=""
            src={
              "https://res.cloudinary.com/da403zlyf/image/upload/v1766332215/068b0ad823abd6d13ea028a7c184bda060f72f3d_fwver7.png"
            }
            className="w-full lg:max-w-[446px] h-auto border-4 border-white/18 rounded-tr-[44px] rounded-bl-[44px]  lg:col-span-5"
          />
        </div>
      </div>
    </section>
  );
}
