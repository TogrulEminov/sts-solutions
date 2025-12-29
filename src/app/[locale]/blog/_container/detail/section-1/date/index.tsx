import Icons from "@/public/icons";

export default function DateArea() {
  return (
    <div className="flex items-center gap-5 lg:gap-10">
      <div className="flex items-center gap-3">
        <figure className="bg-white/20 rounded-full w-12.5 h-12.5 flex items-center justify-center">
          <Icons.Calendar />
        </figure>
        <article className="flex flex-col space-y-2">
          <span className="font-inter text-xs text-white font-normal">
            Tarix
          </span>
          <time className="text-white text-base font-inter font-medium">
            12.05.2025
          </time>
        </article>
      </div>
      <div className="flex items-center gap-3">
        <figure className="bg-white/20  rounded-full w-12.5 h-12.5 flex items-center justify-center">
          <Icons.Clock />
        </figure>
        <article className="flex flex-col space-y-2">
          <span className="font-inter text-xs text-white font-normal">
            Oxuma müddəti
          </span>
          <strong className="text-white text-base font-inter font-medium">
            3 dəq.
          </strong>
        </article>
      </div>
    </div>
  );
}
