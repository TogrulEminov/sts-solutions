"use client";
import CustomImage from "@/src/globalElements/ImageTag";
import styles from "./style.module.css";
import Link from "next/link";

interface Props {
  index?: number;
  className?: string;
  img:string
}

export default function GalleryCard({ index = 0, className ,img}: Props) {
  return (
    <Link
      data-fancybox="gallery"
      href={img}
      className={`${styles.galleryCard} ${className} rounded-xl overflow-hidden group h-full cursor-pointer relative`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-xl  h-full w-full">
        <CustomImage
          width={300}
          height={300}
          src={img}
          title=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className={styles.gradientOverlay} />
        <div className={styles.radialGlow} />
        <div className={styles.iconWrapper}></div>
        <div className={styles.cornerTopLeft} />
        <div className={styles.cornerBottomRight} />
      </div>
      <div className={styles.bottomBorder} />
    </Link>
  );
}
