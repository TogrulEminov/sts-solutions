"use client";
import CustomImage from "@/src/globalElements/ImageTag";
import styles from "./style.module.css";
import Link from "next/link";

interface Props {
  index?: number;
  className?: string;
}

export default function GalleryCard({ index = 0, className }: Props) {
  return (
    <Link
      data-fancybox="gallery"
      href={
        "https://res.cloudinary.com/da403zlyf/image/upload/v1766332215/068b0ad823abd6d13ea028a7c184bda060f72f3d_fwver7.png"
      }
      className={`${styles.galleryCard} ${className} rounded-xl overflow-hidden group h-full cursor-pointer relative`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-xl  h-full w-full">
        <CustomImage
          width={300}
          height={300}
          src={
            "https://res.cloudinary.com/da403zlyf/image/upload/v1766332215/068b0ad823abd6d13ea028a7c184bda060f72f3d_fwver7.png"
          }
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
