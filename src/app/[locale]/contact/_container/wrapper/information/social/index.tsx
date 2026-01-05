import { Social } from "@/src/services/interface";
import { renderSocialIcon } from "@/src/utils/renderSocials";
import Link from "next/link";
interface Props {
  socialLinks: Social[];
}

export default function SocialComponent({ socialLinks }: Props) {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {socialLinks.map((social, index) => {
        return (
          <div key={index} className="relative group">
            <Link
              href={social.socialLink}
              className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-md lg:rounded-lg bg-ui-23 items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg flex border border-ui-24"
              aria-label={social.socialName}
            >
              <div
                className={`absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full`}
              />

              {/* Icon */}
              <div className="relative z-10 w-[18px] h-[18px] text-ui-2 flex items-center justify-center group-hover:text-ui-1 transition-colors duration-300">
                {renderSocialIcon({
                  iconName: social?.iconName,
                  fill: "currentColor",
                  width: 16,
                  height: 16,
                  className:
                    "transition-all duration-300  w-4 h-4 lg:w-6 lg:h-6",
                })}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
