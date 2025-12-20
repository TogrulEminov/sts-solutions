import Icons from "@/public/icons";
import Logo from "@/src/ui/logo";
import Link from "next/link";
import HeaderBottom from "./bottom";
import HamburgerButton from "./menuButton";

interface Props {
  isSticky?: boolean;
}

export default function HeaderCenter({ isSticky }: Props) {
  return (
    <>
      <div className={`bg-ui-2 flex items-center transition-all duration-500 ${
        isSticky ? "min-h-20 pb-3 lg:pb-5 pt-3" : "min-h-25 lg:pb-8 pt-5"
      }`}>
        <div className="container flex justify-between">
          {/* Logo with animation */}
          <div className={`transition-all duration-500 ${
            isSticky ? "scale-90" : "scale-100"
          }`}>
            <Logo isWhite={true} />
          </div>

          <ul className="hidden lg:flex items-center gap-3">
            {/* Phone */}
            <li className="group relative flex items-center p-2.5 gap-2 rounded-lg border-[0.5px] border-white/50 bg-white/8 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/15 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-100">
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></span>
              
              <Icons.Phone className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
              
              <article className="relative z-10 flex flex-col space-y-2">
                <span className="font-manrope text-xs text-white font-extrabold transition-all duration-300 group-hover:tracking-wide">
                  Bizimlə əlaqə
                </span>
                <Link
                  href="tel:+994567788899"
                  className="font-normal font-manrope text-xs text-white transition-all duration-300 hover:text-white/80 hover:translate-x-1"
                >
                  +994 567 78 89
                </Link>
              </article>
            </li>

            {/* Email */}
            <li className="group relative flex items-center p-2.5 gap-2 rounded-lg border-[0.5px] border-white/50 bg-white/8 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/15 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-100">
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></span>

              <Icons.Email className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />

              <article className="relative z-10 flex flex-col space-y-2">
                <span className="font-manrope text-xs text-white font-extrabold transition-all duration-300 group-hover:tracking-wide">
                  Bizimlə əlaqə
                </span>
                <Link
                  href="mailto:example@example.com"
                  className="font-normal font-manrope text-xs text-white transition-all duration-300 hover:text-white/80 hover:translate-x-1"
                >
                  example@example.com
                </Link>
              </article>
            </li>

            {/* Address */}
            <li className="group relative flex items-center p-2.5 gap-2 rounded-lg border-[0.5px] border-white/50 bg-white/8 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/15 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-100">
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></span>
              
              <Icons.Address className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
              
              <article className="relative z-10 flex flex-col space-y-2">
                <span className="font-manrope text-xs text-white font-extrabold transition-all duration-300 group-hover:tracking-wide">
                  Ünvanımız
                </span>
                <address className="font-normal not-italic font-manrope text-xs text-white transition-all duration-300 group-hover:translate-x-1">
                  Baku, Azerbaijan
                </address>
              </article>
            </li>
          </ul>
        <HamburgerButton/>
        </div>
      </div>
      <HeaderBottom isSticky={isSticky} />
    </>
  );
}