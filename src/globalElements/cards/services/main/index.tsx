import Icons from "@/public/icons";
import CustomImage from "@/src/globalElements/ImageTag";
import { Link } from "@/src/i18n/navigation";
import React from "react";
import logo from "@/public/assets/logo/sts-logo.svg";
import { ServicesCategoryItem } from "@/src/services/interface";
interface Props {
  service: ServicesCategoryItem;
}
export default function ServicesMainCard({ service }: Props) {
  const { translations } = service;

  const { title, slug } = translations?.[0];
  return (
    <Link
      href={{
        pathname: "/services/[category]",
        params: { category: slug },
      }}
      className="flex flex-col relative p-4 h-60 lg:h-80 rounded-2xl overflow-hidden group  border border-ui-27 group-hover:border-ui-27"
    >
      <div className="transition-all duration-300 absolute w-full h-full inset-0 z-1 max-h-full group-hover:max-h-0 bg-ui-2"></div>
      <figure className="w-10 lg:w-16 h-10 lg:h-16 mb-3 lg:mb-5 rounded-lg lg:rounded-xl relative z-2 bg-white duration-300 group-hover:bg-ui-1   flex items-center justify-center">
        <CustomImage
          width={64}
          height={64}
          title={title}
          src={logo}
          className="w-8 lg:w-13 h-auto lg:h-10 brightness-0 invert-0 duration-300 transition-all group-hover:invert-100"
        />
      </figure>
      <strong className="relative 0 z-2 text-xl lg:text-[28px] lg:leading-8 duration-300 transition-all text-white  group-hover:text-ui-1 font-extrabold">
        {title}
      </strong>

      <span className="w-10 h-10 lg:w-14 lg:h-14 absolute z-2 rounded-xl lg:rounded-2xl bg-ui-1 bottom-4  text-white flex items-center justify-center right-4">
        <Icons.ArrowEast
          fill="currentColor"
          className="duration-300 transition-all group-hover:rotate-45"
        />
      </span>
    </Link>
  );
}
