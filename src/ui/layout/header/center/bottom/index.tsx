import { Link, usePathname } from "@/src/i18n/navigation";
import ApplyBtn from "./applyBtn";

interface Props {
  isSticky?: boolean;
}

const navLinks = [
  { href: "/about", label: "Haqqımızda" },
  { href: "/services", label: "Xidmətlərimiz" },
  { href: "/projects", label: "Layihələrimiz" },
  { href: "/", label: "Həllərimiz" },
  { href: "/", label: "Xəbərlər" },
  { href: "/contact", label: "Əlaqə" },
];

export default function HeaderBottom({ isSticky }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={`hidden absolute w-full  lg:flex items-center transition-all duration-500 ${
        isSticky ? "-bottom-8" : "-bottom-10"
      }`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-[10px] bg-white px-4 transition-all duration-500 ${
            isSticky ? "min-h-12 shadow-md" : "min-h-13.5 shadow-xl"
          }`}
        >
          <div className="flex items-center gap-4">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={index}
                  href={link.href as any}
                  className={`group relative px-2 font-inter font-medium lg:text-base text-ui-18 py-2 transition-all duration-300 hover:text-ui-1 ${
                    active ? "text-ui-1" : ""
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-ui-1 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                  <span
                    className={`absolute inset-0 bg-ui-1/5 rounded transition-all duration-300 ${
                      active
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>
          <ApplyBtn />
        </nav>
      </div>
    </div>
  );
}
