import CustomImage from "@/src/globalElements/ImageTag";
import { Link } from "@/src/i18n/navigation";

export default function ProjectsCards() {
  return (
    <Link
      href={{
        pathname: "/projects/[slug]",
        params: {
          slug: "test",
        },
      }}
      className="grid grid-cols-12 gap-3 bg-white overflow-hidden rounded-2xl"
    >
      <figure className="lg:h-full col-span-4 w-full">
        <CustomImage
          width={280}
          height={260}
          className="w-full h-full object-cover"
          title=""
          src={
            "https://res.cloudinary.com/da403zlyf/image/upload/v1766328479/cb08a85f7042916d1ef792008d2874dbf4e3738f_twmc8c.png"
          }
        />
      </figure>
      <article className="flex flex-col space-y-3   py-4  pr-3 col-span-8">
        <strong className="font-manrope lg:text-lg leading-normal text-ui-1 font-bold">
          Nar və Digər Şirələr, Konsentrat İstehsalı Müəssisəsinin Qurulması və
          Avtomatlaşdırılması
        </strong>
        <p className="font-manrope lg:min-h-20 line-clamp-4 text-ellipsis lg:text-lg text-ui-7 font-normal">
          2024-cü ildə həyata keçirilmişdir. Layihə çərçivəsində texnoloji
          sxemlərin qurulması, mühəndislik həllərinin hazırlanması,
          layihələndirilmə və texniki nəzarət işləri həyata keçirilmişdir. Eyni
          zamanda müəssisənin avtomatlaşdırılması da tam olaraq icra olunmuşdur.
        </p>
      </article>
    </Link>
  );
}
