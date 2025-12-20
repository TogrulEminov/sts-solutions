"use client";
import { useCallback, useEffect, useId, useState } from "react";
import {
  useToggleState,
  useToggleStore,
} from "@/src/lib/zustand/useMultiToggleStore";
import { Link, usePathname } from "@/src/i18n/navigation";
import { MotionDiv, MotionNav } from "@/src/lib/motion/motion";
import { AnimatePresence, motion } from "framer-motion";
import Icons from "@/public/icons";
import CustomLink from "next/link";
import { 
  Home, 
  Info, 
  Briefcase, 
  FolderKanban, 
  Mail, 
  X,
  ChevronRight,
  Phone,
  MapPin,
  ChevronDown,
  Globe,
  Check
} from "lucide-react";
import Logo from "../../logo";

const mainNavLinks = [
  { href: "/", label: "Ana səhifə", icon: Home },
  { href: "/about", label: "Haqqımızda", icon: Info },
];

const servicesSubMenu = [
  { href: "/services/techizat", label: "Təchizat" },
  { href: "/services/muhendislik", label: "Mühəndislik" },
  { href: "/services/temir", label: "Təmir" },
  { href: "/services/qurasdirma", label: "Quraşdırma" },
];

const afterNavLinks = [
  { href: "/projects", label: "Layihələr", icon: FolderKanban },
  { href: "/contact", label: "Əlaqə", icon: Mail },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: Icons.Facebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Icons.Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Icons.Linkedin,
  },
  {
    name: "Telegram",
    href: "https://t.me",
    icon: Icons.Telegram,
  },
];

const languages = [
  { code: "az", label: "Az", flag: "🇦🇿" },
  { code: "en", label: "En", flag: "🇬🇧" },
  { code: "ru", label: "Ru", flag: "🇷🇺" },
];

export default function Sidebar() {
  const { close } = useToggleStore();
  const isSidebarOpen = useToggleState("main-sidebar");
  const id = useId();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const handleClose = useCallback(() => {
    document.body.classList.remove("overflow-hidden");
    close("main-sidebar");
  }, [close]);

  useEffect(() => {
    if (pathname) {
      handleClose();
    }
  }, [pathname, handleClose]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        handleClose();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleClose]);

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <MotionNav
            initial={{ x: "100%", opacity: 0 }}
            exit={{ x: "100%", opacity: 0 }}
            animate={{
              x: isSidebarOpen ? "0%" : "100%",
              opacity: isSidebarOpen ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed select-none top-0 right-0 h-screen overflow-y-auto scrollbar-custom flex flex-col w-full max-w-md bg-gradient-to-br from-ui-2 to-ui-2/95 backdrop-blur-xl z-999 shadow-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-white/10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Logo isWhite />
              </motion.div>

              <div className="flex items-center gap-3">
                {/* Language Selector */}
                <div className="relative">
                  <motion.button
                    onClick={() => setLangOpen(!langOpen)}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    aria-label="Dil seçimi"
                    aria-expanded={langOpen}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></span>
                    
                    <Globe className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-300 group-hover:rotate-[360deg]" />
                    <span className="text-white text-sm font-manrope font-medium">
                      {selectedLang.flag}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/70 group-hover:text-white transition-all duration-500 ${
                        langOpen ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  {/* Language Dropdown */}
                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-36 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50"
                      >
                        <div className="h-1 bg-gradient-to-r from-ui-1 via-cyan-400 to-ui-1"></div>
                        
                        <div className="p-1.5">
                          {languages.map((lang, index) => (
                            <motion.button
                              key={lang.code}
                              onClick={() => {
                                setSelectedLang(lang);
                                setLangOpen(false);
                              }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`group w-full cursor-pointer flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                                selectedLang.code === lang.code
                                  ? "bg-ui-1 text-white"
                                  : "hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-base transition-transform duration-300 group-hover:scale-125">
                                  {lang.flag}
                                </span>
                                <span className="font-manrope text-sm font-medium">
                                  {lang.label}
                                </span>
                              </div>
                              
                              {selectedLang.code === lang.code && (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={handleClose}
                  type="button"
                  className="relative w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                  <X className="w-5 h-5 text-white relative z-10" />
                </motion.button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-6 px-4">
              <ul className="space-y-2">
                {/* Main Nav Links */}
                {mainNavLinks.map((navItem, index) => {
                  const Icon = navItem.icon;
                  const isActive = pathname === navItem.href;

                  return (
                    <motion.li
                      key={`${id}-main-${index}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={navItem.href as any}
                        className={`group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                          isActive
                            ? "bg-ui-1 text-white shadow-lg shadow-ui-1/30"
                            : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
                        }`}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-ui-1/0 via-ui-1/20 to-ui-1/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        <div className="relative z-10 flex items-center gap-3">
                          <motion.div
                            className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/10 group-hover:bg-white/20"
                            }`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>

                          <span className="font-manrope font-semibold text-base">
                            {navItem.label}
                          </span>
                        </div>

                        <motion.div
                          animate={{
                            x: isActive ? 0 : -10,
                            opacity: isActive ? 1 : 0,
                          }}
                          className="relative z-10"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>

                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}

                {/* Services Dropdown */}
                <motion.li
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + mainNavLinks.length * 0.05 }}
                >
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="group relative w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-ui-1/0 via-ui-1/20 to-ui-1/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                    <div className="relative z-10 flex items-center gap-3">
                      <motion.div
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Briefcase className="w-5 h-5" />
                      </motion.div>

                      <span className="font-manrope font-semibold text-base">
                        Xidmətlər
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Services Submenu */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 ml-4 space-y-1 overflow-hidden"
                      >
                        {servicesSubMenu.map((service, index) => {
                          const isActive = pathname === service.href;

                          return (
                            <motion.li
                              key={service.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={service.href as any}
                                className={`group relative flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                                  isActive
                                    ? "bg-ui-1/20 text-white border-l-2 border-ui-1"
                                    : "text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-white/30"
                                }`}
                              >
                                <span className="font-manrope text-sm">
                                  {service.label}
                                </span>

                                {isActive && (
                                  <motion.div
                                    layoutId="activeServiceIndicator"
                                    className="absolute right-3 w-1.5 h-1.5 bg-ui-1 rounded-full"
                                  />
                                )}
                              </Link>
                            </motion.li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>

                {/* After Nav Links */}
                {afterNavLinks.map((navItem, index) => {
                  const Icon = navItem.icon;
                  const isActive = pathname === navItem.href;
                  const delay = 0.1 + (mainNavLinks.length + 1 + index) * 0.05;

                  return (
                    <motion.li
                      key={`${id}-after-${index}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay }}
                    >
                      <Link
                        href={navItem.href as any}
                        className={`group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                          isActive
                            ? "bg-ui-1 text-white shadow-lg shadow-ui-1/30"
                            : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
                        }`}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-ui-1/0 via-ui-1/20 to-ui-1/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        <div className="relative z-10 flex items-center gap-3">
                          <motion.div
                            className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/10 group-hover:bg-white/20"
                            }`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>

                          <span className="font-manrope font-semibold text-base">
                            {navItem.label}
                          </span>
                        </div>

                        <motion.div
                          animate={{
                            x: isActive ? 0 : -10,
                            opacity: isActive ? 1 : 0,
                          }}
                          className="relative z-10"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>

                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Info Section */}
            <motion.div
              className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-white/60 text-xs font-manrope font-bold uppercase tracking-wider mb-4">
                Əlaqə məlumatları
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <motion.div
                  className="group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CustomLink
                    href="tel:+994552624037"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-ui-1/30 transition-colors duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-white/50 font-manrope">
                        Telefon
                      </span>
                      <span className="text-sm font-manrope font-medium">
                        +994 55 262 40 37
                      </span>
                    </div>
                  </CustomLink>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CustomLink
                    href="mailto:example@example.com"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-ui-1/30 transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-white/50 font-manrope">
                        Email
                      </span>
                      <span className="text-sm font-manrope font-medium">
                        example@example.com
                      </span>
                    </div>
                  </CustomLink>
                </motion.div>

                {/* Address */}
                <motion.div
                  className="group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-ui-1/30 transition-colors duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-white/50 font-manrope">
                        Ünvan
                      </span>
                      <span className="text-sm font-manrope font-medium">
                        Bakı, Azərbaycan
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-white/60 text-xs font-manrope font-bold uppercase tracking-wider mb-4">
                  Bizi izləyin
                </h3>

                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CustomLink
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-ui-1 border border-white/20 hover:border-ui-1 transition-all duration-300 overflow-hidden"
                          aria-label={social.name}
                        >
                          <span className="absolute inset-0 bg-ui-1/0 group-hover:bg-ui-1/20 blur-xl transition-all duration-300" />

                          <IconComponent
                            width={18}
                            height={18}
                            fill="white"
                            className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                          />
                        </CustomLink>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </MotionNav>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm z-998"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}