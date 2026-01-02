"use client";
import { Link } from "@/src/i18n/navigation";
import LanguageBtn from "./language";
import { Social } from "@/src/services/interface";
import { renderSocialIcon } from "@/src/utils/renderSocials";
import { useTranslations } from "next-intl";
import CustomLink from "next/link";
interface Props {
  className?: string;
  isSticky?: boolean;socialData?: Social[] | undefined;
}

export default function HeaderTop({ className, isSticky, socialData }: Props) {
  const t = useTranslations();
  return (
    <div
      className={`bg-ui-1 hidden lg:flex justify-end items-center w-full  transition-all duration-500 ease-in-out relative ${
        isSticky ? "max-h-0 opacity-0 py-0" : "max-h-16 opacity-100 py-2"
      } ${className}`}
      role="banner"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-size-[20px_20px] animate-[slide_20s_linear_infinite]"></div>
      </div>

      <div className="container flex items-center justify-between gap-4 relative z-10">
        <div
          className="flex items-center gap-3"
          style={{
            animation: isSticky ? "none" : "slideInLeft 0.6s ease-out both",
          }}
        >
          <div className="group flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-white/90 text-sm font-inter font-semibold transition-all duration-300 group-hover:text-white">
                {t("header.newServices")}
              </span>
            </span>

            <div className="h-4 w-px bg-white/30"></div>

            <Link
              href="/services"
              className="flex items-center gap-1 text-white text-sm font-inter transition-all duration-300 group-hover:gap-2"
            >
              <span className="transition-all duration-300 group-hover:-translate-x-0.5">
                {t("header.learnMore")}
              </span>
              <span className="transition-all duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <LanguageBtn isSticky={isSticky} />
          <div className="h-5 w-px bg-white/20"></div>
          <nav aria-label="Sosial media linklər">
            <div className="flex items-center gap-4">
              <span
                className="text-white/60 text-xs font-inter uppercase tracking-wider"
                style={{
                  animation: isSticky
                    ? "none"
                    : "fadeIn 0.6s ease-out 0.3s both",
                }}
              >
                {t("header.follow_us")}
              </span>

              <ul className="flex items-center gap-3">
                {socialData?.map((social, index) => {
                  return (
                    <li
                      key={social.iconName}
                      className="relative"
                      style={{
                        animation: isSticky
                          ? "none"
                          : `fadeInDown 0.5s ease-out ${
                              0.4 + index * 0.1
                            }s both`,
                      }}
                    >
                      <CustomLink
                        href={social.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.iconName}
                        className="group relative inline-flex items-center justify-center w-9 h-9 isolate"
                      >
                        <span className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></span>
                        <span className="absolute inset-0 rounded-full bg-white/10 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></span>
                        <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                          <span className="absolute inset-0 rounded-full border border-white/40 scale-100 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-700"></span>
                          <span className="absolute inset-0 rounded-full border border-white/30 scale-100 group-hover:scale-[1.8] opacity-100 group-hover:opacity-0 transition-all duration-900 delay-75"></span>
                          <span className="absolute inset-0 rounded-full border border-white/20 scale-100 group-hover:scale-[2.2] opacity-100 group-hover:opacity-0 transition-all duration-1000 delay-150"></span>
                        </span>

                        <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300 scale-0 group-hover:scale-100 pointer-events-none"></span>
                        {renderSocialIcon({
                          iconName: social?.iconName,
                          fill: "white",
                          className:
                            "relative z-10 w-4 h-4 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]",
                        })}
                      </CustomLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 20px 20px;
          }
        }
      `}</style>
    </div>
  );
}
