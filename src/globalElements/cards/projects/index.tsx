"use client";
import { Link } from "@/src/i18n/navigation";
import CustomImage from "../../ImageTag";
import Icons from "@/public/icons";
import { FileType, Projects } from "@/src/services/interface";
import { getForCards } from "@/src/utils/getFullimageUrl";
import { sanitizeHtml } from "@/src/lib/domburify";
import {
  MotionArticle,
  MotionDiv,
  MotionSpan,
  MotionStrong,
} from "@/src/lib/motion/motion";

interface Props {
  className?: string;
  project: Projects;
}

export default function ProjectsCards({ className, project }: Props) {
  const { translations, imageUrl } = project;
  const { title, slug, description } = translations?.[0];
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
    >
      <Link
        href={{
          pathname: "/projects/[slug]",
          params: {
            slug: slug,
          },
        }}
        className={`${className} group relative h-70 lg:h-90 overflow-hidden rounded-[18px] block w-full xl:min-w-90`}
      >
        <MotionDiv
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
        >
          <CustomImage
            width={356}
            height={426}
            src={getForCards(imageUrl as FileType)}
            title=""
            className="w-full h-full object-cover"
          />
        </MotionDiv>

        <div className="absolute projectsOverlay opacity-100 inset-0 transition-opacity duration-500 lg:group-hover:opacity-0" />

        <div className="absolute inset-0 lg:translate-y-20 transition-transform duration-500 ease-out lg:group-hover:translate-y-0 projectsCardGradinet group-hover:bg-ui-14/68 group-hover:opacity-40" />

        <article className="absolute inset-0 p-3 lg:p-5 flex flex-col justify-end pb-5 lg:pb-8">
          <div className="space-y-2 relative z-10 lg:translate-y-0   lg:group-hover:-translate-y-[10%] transition-transform duration-500 ease-out">
            <MotionStrong
              className="font-inter lg:text-xl text-sm sm:text-base line-clamp-3 min-h-10 lg:min-h-fit text-ellipsis lg:line-clamp-3 text-white font-bold"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
            </MotionStrong>

            <MotionArticle
              className="text-base text-white font-inter font-normal  transition-all duration-500 hidden lg:block max-h-0 opacity-0 group-hover:max-h-24  group-hover:opacity-100 group-hover:mt-3 line-clamp-3 text-ellipsis"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}
            />
          </div>
          <MotionSpan
            className="absolute right-5 top-5 lg:top-[unset] lg:bottom-5 opacity-0 translate-x-2 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Icons.ArrowUp className="text-white w-10 h-10 lg:w-6 lg:h-6" />
          </MotionSpan>
        </article>
      </Link>
    </MotionDiv>
  );
}
