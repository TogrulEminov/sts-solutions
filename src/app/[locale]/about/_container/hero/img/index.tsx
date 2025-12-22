import CustomImage from "@/src/globalElements/ImageTag";
import s from "./style.module.css";
export default function HeroImage() {
  return (
    <div className="absolute inset-0 w-full h-full z-1 overflow-hidden">
      <div className={s.imageWrapper}>
        <CustomImage
          width={1920}
          height={1080}
          title=""
          src="https://res.cloudinary.com/da403zlyf/image/upload/v1766308614/fa6fb19805826dc2b4cf44126a363e4cfe52465b_ntpzlp.jpg"
          className="w-full h-full object-cover"
        />
        <div className={s.overlayEffect}></div>
        <div className={s.particles}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
