import CustomImage from "@/src/globalElements/ImageTag";
import s from "./style.module.css";
import { FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
interface Props {
  existingData?: FileType | undefined;
}
export default function HeroImage({ existingData }: Props) {
  return (
    <div className="absolute inset-0 w-full h-full z-1 overflow-hidden">
      <div className={s.imageWrapper}>
        <CustomImage
          width={1920}
          height={1080}
          title="About img"
          src={getForCards(existingData as FileType)}
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
