import Icons from "@/public/icons";

export default function DateArea() {
  return (
    <div className="flex items-center gap-2 lg:gap-10">
      <div className="flex items-center gap-1 lg:gap-3">
        <figure className="bg-white/20 rounded-full w-8 h-8 lg:w-12.5 lg:h-12.5 flex items-center justify-center">
          <Icons.Calendar className="w-4 h-4 lg:w-6 lg:h-6" />
        </figure>
        <article className="flex flex-col space-y-2">
          <span className="font-inter text-[10px] lg:text-xs text-white font-normal">
            Tarix
          </span>
          <time className="text-white text-sm lg:text-base font-inter font-medium">
            12.05.2025
          </time>
        </article>
      </div>
      <div className="flex items-center gap-3">
        <figure className="bg-white/20  rounded-full w-8 h-8 lg:w-12.5 lg:h-12.5 flex items-center justify-center">
          <Icons.Clock className="w-4 h-4 lg:w-6 lg:h-6" />
        </figure>
        <article className="flex flex-col space-y-2">
          <span className="font-inter text-[10px] lg:text-xs text-white font-normal">
            Oxuma müddəti
          </span>
          <strong className="text-white text-sm lg:text-base font-inter font-medium">
            3 dəq.
          </strong>
        </article>
      </div>
    </div>
  );
}
