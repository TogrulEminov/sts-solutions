"use client";
import useOutSideClick from "@/src/hooks/useOutSideClick";
import { ChevronDown, Globe, Check } from "lucide-react";
import { useRef, useState } from "react";
const languages = [
  { code: "az", label: "Az" },
  { code: "en", label: "En" },
  { code: "ru", label: "Ru" },
];
interface Props {
  isSticky?: boolean;
}
export default function LanguageBtn({ isSticky }: Props) {
  const langRef = useRef(null);
  const { open, handleToggle, handleClose } = useOutSideClick({ ref: langRef });
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  return (
    <div
      ref={langRef}
      className="relative"
      style={{
        animation: isSticky ? "none" : "slideInRight 0.6s ease-out 0.2s both",
      }}
    >
      <button
        onClick={handleToggle}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105 overflow-hidden"
        aria-label="Dil seçimi"
        aria-expanded={open}
      >
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></span>

        <Globe className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-300 group-hover:rotate-360" />
        <span className="text-white text-sm font-manrope font-medium">
          {selectedLang.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/70 group-hover:text-white transition-all duration-500 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`absolute z-100 top-full left-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 origin-top ${
          open
            ? "opacity-100 scale-100 visible translate-y-0"
            : "opacity-0 scale-95 invisible -translate-y-2"
        }`}
      >
        <div className="h-1 bg-linear-to-r from-ui-1 via-cyan-400 to-ui-1"></div>

        <div className="p-2">
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang);
                handleClose();
              }}
              className={`group w-full cursor-pointer flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                selectedLang.code === lang.code
                  ? "bg-ui-1 text-white shadow-lg scale-105"
                  : "hover:bg-gray-100 text-gray-700 hover:scale-102 hover:translate-x-1"
              }`}
              style={{
                animation: open
                  ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                  : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-manrope text-sm font-medium">
                  {lang.label}
                </span>
              </div>

              {selectedLang.code === lang.code && (
                <Check className="w-4 h-4 animate-[scaleIn_0.3s_ease-out]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
