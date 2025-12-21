"use client";
import CustomImage from "@/src/globalElements/ImageTag";
import styles from "./style.module.css";

interface Props {
  src: string;
}

export default function HeroImageAnimation({ src }: Props) {
  return (
    <div className={styles.imageWrapper}>
      <CustomImage
        className={`w-full h-full absolute inset-0 object-cover ${styles.image}`}
        width={1920}
        title="hero"
        height={1080}
        src={src}
      />
      <div className={styles.overlay}></div>
      <div className={styles.lightSweep}></div>
      <div className={styles.particles}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
