"use client";
import Icons from "@/public/icons";
import { usePathname } from "@/src/i18n/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const socialLinks = [
  { name: "Facebook", icon: Icons.Facebook, href: "" },
  { name: "Instagram", icon: Icons.Instagram, href: "" },
  { name: "LinkedIn", icon: Icons.Linkedin, href: "" },
  { name: "YouTube", icon: Icons.Youtube, href: "" },
];

export default function StickySocial() {
  const pathanme = usePathname();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;

      if (window.scrollY > heroHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (pathanme === "/contact") {
    return;
  }
  return (
    <div
      className={`fixed z-90 top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out hidden lg:block ${
        isSticky ? "left-0 opacity-100" : "right-4 lg:right-20 opacity-100"
      }`}
    >
      <div
        className={`flex items-center flex-col justify-center bg-ui-1 transition-all duration-700 ${
          isSticky
            ? "rounded-r-[10px] rounded-l-none py-2.5 pl-2.5 pr-2.5"
            : "rounded-[10px] p-2.5"
        }`}
      >
        {socialLinks.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <div key={index} className="relative group">
              <Link
                href={social.href}
                className={`flex items-center justify-center transition-all duration-300 ${
                  index !== socialLinks.length - 1 ? "mb-1 lg:mb-4" : ""
                } ${
                  isSticky
                    ? "w-12 h-12 hover:w-auto hover:pr-3 hover:pl-3 hover:gap-3"
                    : "w-8 h-8"
                } group-hover:bg-white/10 rounded-lg`}
              >
                <IconComponent
                  width={16}
                  height={16}
                  fill="white"
                  className="transition-all duration-300 group-hover:scale-110 hrink-0"
                />

                {/* Tooltip for non-sticky state */}
                {!isSticky && (
                  <span className="absolute right-12 ml-3 px-3 py-1.5 bg-ui-1 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
                    {social.name}
                    <span className="absolute left-24 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-6"></span>
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
