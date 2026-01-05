"use client";
import CustomImage from "../../ImageTag";
import { Link } from "@/src/i18n/navigation";
import { BlogItem, FileType } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
import { sanitizeHtml } from "@/src/lib/domburify";
import {
  MotionArticle,
  MotionDiv,
  MotionStrong,
} from "@/src/lib/motion/motion";
interface Props {
  blog: BlogItem;
}
export default function NewsCard({ blog }: Props) {
  const { translations, imageUrl } = blog;
  const { title, slug, description } = translations?.[0];
  return (
    <MotionDiv
      className="flex flex-col space-y-2  relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href={{
          pathname: "/blog/[slug]",
          params: { slug: slug },
        }}
        className="absolute inset-0 w-full h-full opacity-0 z-2"
      >
        {title}
      </Link>
      <figure className="relative overflow-hidden h-40 lg:h-54 rounded-xl">
        <MotionDiv
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <CustomImage
            width={356}
            height={222}
            title=""
            className="w-full h-full object-cover"
            src={getForCards(imageUrl as FileType)}
          />
          <MotionDiv className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </MotionDiv>
      </figure>
      <article className="flex flex-col space-y-3">
        <MotionStrong
          className="font-inter font-bold text-base lg:text-xl text-ui-7 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </MotionStrong>
        <MotionArticle
          className="font-inter text-xs text-ui-9 line-clamp-2 min-h-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
        />
      </article>
    </MotionDiv>
  );
}
