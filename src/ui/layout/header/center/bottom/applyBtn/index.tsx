import Icons from "@/public/icons";
export default function ApplyBtn() {
  return (
    <button
      type="button"
      aria-label="Bizimlə əlaqə saxlayın və müraciət edin"
      className="cursor-pointer group relative flex items-center gap-2 justify-center py-2 px-5 rounded-4xl bg-ui-1 text-white font-inter text-sm font-normal overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      <span className="absolute inset-0 rounded-4xl bg-white/20 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-700 pointer-events-none"></span>
      <span className="absolute inset-0 rounded-4xl bg-white/15 scale-0 group-hover:scale-[2] opacity-100 group-hover:opacity-0 transition-all duration-900 delay-100 pointer-events-none"></span>
      <span className="absolute inset-0 rounded-4xl bg-white/10 scale-0 group-hover:scale-[2.5] opacity-100 group-hover:opacity-0 transition-all duration-1100 delay-200 pointer-events-none"></span>

      <span className="relative z-10">Müraciət et</span>

      <Icons.ArrowEast
        fill="currentColor"
        className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-360"
        aria-hidden="true"
      />
    </button>
  );
}
