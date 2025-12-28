import Icons from "@/public/icons";
import CustomImage from "@/src/globalElements/ImageTag";
import { Link } from "@/src/i18n/navigation";
import React from "react";
import logo from "@/public/assets/logo/sts-logo.svg";
export default function ServicesMainCard() {
  return (
    <Link
      href={{
        pathname: "/services/[category]",
        params: { category: "muhendislik-xidmetleri" },
      }}
      className="flex flex-col relative p-4 lg:h-80 rounded-2xl overflow-hidden group  border border-ui-27 group-hover:border-ui-27"
    >
      <div className="transition-all duration-300 absolute w-full h-full inset-0 z-1 max-h-full group-hover:max-h-0 bg-ui-2"></div>
      <figure className="w-16 h-16 mb-5 rounded-xl relative z-2 bg-white duration-300 group-hover:bg-ui-1   flex items-center justify-center">
        <CustomImage
          width={64}
          height={64}
          title=""
          src={logo}
          className="w-13 h-10 brightness-0 invert-0 duration-300 transition-all group-hover:invert-100"
        />
      </figure>
      <strong className="relative 0 z-2 lg:text-[28px] lg:leading-8 duration-300 transition-all text-white  group-hover:text-ui-1 font-extrabold">
        Mühəndislik xidmətlərimiz
      </strong>

      <span className="w-14 h-14 absolute z-2 rounded-2xl bg-ui-1 bottom-4  text-white flex items-center justify-center right-4">
        <Icons.ArrowEast
          fill="currentColor"
          className="duration-300 transition-all group-hover:rotate-45"
        />
      </span>
    </Link>
  );
}
