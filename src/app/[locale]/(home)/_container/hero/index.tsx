import CustomImage from "@/src/globalElements/ImageTag";
import gradientOne from "@/public/assets/hero-gradient.png";
import gradientTwo from "@/public/assets/hero-gradient-2.png";
export default function HeroSection() {
  return (
    <section className="h-screen overflow-hidden relative">
      <div className="flex max-w-lg  h-full justify-between">
        <CustomImage
          width={808}
          height={940}
          title=""
          src={gradientOne}
          className="h-full w-100"
        />
        <CustomImage
          width={34}
          height={940}
          title=""
          src={gradientTwo}
          className="h-full w-fit"
        />
      </div>
    </section>
  );
}
