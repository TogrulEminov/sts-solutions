import Icons from "@/public/icons";
import Link from "next/link";
import React from "react";

const socialLinks = [
  {
    icon: Icons.Facebook,
    href: "",
    label: "Facebook",
    gradient: "from-[#1877F2] to-[#0C63D4]",
  },
  {
    icon: Icons.Instagram,
    href: "",
    label: "Instagram",
    gradient: "from-[#405DE6] via-[#C135B4] to-[#E1306C]",
  },
  {
    icon: Icons.Telegram,
    href: "",
    label: "Telegram",
    gradient: "from-[#0088cc] to-[#229ED9]",
  },
  {
    icon: Icons.Linkedin,
    href: "",
    label: "Linkedin",
    gradient: "from-[#0A66C2] to-[#004182]",
  },
  {
    icon: Icons.Youtube,
    href: "",
    label: "Youtube",
    gradient: "from-[#FF0000] to-[#CC0000]",
  },
];

export default function Social() {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <div key={index} className="relative group">
            <Link
              href={social.href}
              className="relative w-10 h-10 rounded-lg bg-ui-23 items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg flex border border-ui-24"
              aria-label={social.label}
            >
              {/* Animated Background Gradient */}
              <div
                className={`absolute bottom-0 left-0 w-full h-0 bg-linear-to-tr ${social.gradient} transition-all duration-300 ease-in-out group-hover:h-full`}
              />

              {/* Icon */}
              <div className="relative z-10 w-[18px] h-[18px] text-2 group-hover:text-white transition-colors duration-300">
                <Icon
                  fill="currentColor"
                  width={18}
                  height={18}
                  className="transition-all duration-300 group-hover:scale-110"
                />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
