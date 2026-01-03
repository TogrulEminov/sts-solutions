import Icons from "@/public/icons";
import Logo from "@/src/ui/logo";
import Link from "next/link";
import HeaderBottom from "./bottom";
import HamburgerButton from "./menuButton";
import { IContactInformation } from "@/src/services/interface";
import { useTranslations } from "next-intl";
import { clearPhoneRegex } from "@/src/lib/domburify";

interface Props {
  isSticky?: boolean;
  contactData?: IContactInformation | undefined;
}

export default function HeaderCenter({ isSticky, contactData }: Props) {
  const t = useTranslations();
  console.log(contactData);
  
  return (
    <>
      <div className="relative">
        <div
          className={`bg-ui-2 flex items-center transition-all duration-500 ${
            isSticky
              ? "py-4 min-h-20 pb-3 lg:pb-5 pt-3"
              : "py-4 min-h-28.5 lg:pb-8 lg:pt-5"
          }`}
        >
          <div className="container flex  items-center justify-between">
            <div
              className={`transition-all duration-500 ${
                isSticky ? "scale-90" : "scale-100"
              }`}
            >
              <Logo isWhite={true} />
            </div>

            <ul className="hidden lg:flex items-center gap-3">
              {contactData?.phone && (
                <li className="group relative flex items-center p-2.5 gap-2 rounded-lg border-[0.5px] border-white/50 bg-white/8 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/15 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-98 active:scale-100">
                  <Icons.Phone className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                  <article className="relative z-10 flex flex-col space-y-2">
                    <span className="font-inter text-xs text-white font-extrabold transition-all duration-300 group-hover:tracking-wide">
                      {t("header.contact_us")}
                    </span>
                    <Link
                      href={`tel:${clearPhoneRegex(contactData?.phone)}`}
                      className="font-normal font-inter text-xs text-white transition-all duration-300 hover:text-white/80 hover:translate-x-1"
                    >
                      {contactData?.phone}
                    </Link>
                  </article>
                </li>
              )}
              {contactData?.email && (
                <li className="group relative flex items-center p-2.5 gap-2 rounded-lg border-[0.5px] border-white/50 bg-white/8 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/15 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-98 active:scale-100">
                  <Icons.Email className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />

                  <article className="relative z-10 flex flex-col space-y-2">
                    <span className="font-inter text-xs text-white font-extrabold transition-all duration-300 group-hover:tracking-wide">
                      {t("header.email_address")}
                    </span>
                    <Link
                      href={`mailto:${contactData?.email}`}
                      className="font-normal font-inter text-xs text-white transition-all duration-300 hover:text-white/80 hover:translate-x-1"
                    >
                      {contactData?.email}
                    </Link>
                  </article>
                </li>
              )}
              {contactData?.translations?.[0]?.adress && (
                <li className="group relative flex items-center p-2.5 gap-2 rounded-lg border-[0.5px] border-white/50 bg-white/8 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/15 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-98 active:scale-100">
                  <Icons.Address className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />

                  <article className="relative z-10 flex flex-col space-y-2">
                    <span className="font-inter text-xs text-white font-extrabold transition-all duration-300 group-hover:tracking-wide">
                      {t("header.address")}
                    </span>
                    <address className="font-normal not-italic font-inter text-xs text-white transition-all duration-300 group-hover:translate-x-1">
                      {contactData?.translations?.[0]?.adress}
                    </address>
                  </article>
                </li>
              )}
            </ul>
            <HamburgerButton />
          </div>
        </div>
        <HeaderBottom isSticky={isSticky} />
      </div>
    </>
  );
}
