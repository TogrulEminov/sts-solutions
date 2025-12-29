import CustomImage from "@/src/globalElements/ImageTag";
import { Link } from "@/src/i18n/navigation";

export default function BlogsCards() {
  return (
    <Link
      href={{
        pathname: "/blog/[slug]",
        params: {
          slug: "test",
        },
      }}
      className="flex flex-col lg:grid items-start lg:grid-cols-12 gap-3 bg-white/11 overflow-hidden p-4 rounded-xl lg:rounded-2xl"
    >
      <figure className="lg:h-full order-2 lg:order-1 lg:col-span-4 w-full overflow-hidden rounded-xl lg:rounded-2xl">
        <CustomImage
          width={280}
          height={260}
          className="w-full h-full max-h-50 lg:max-h-70 object-cover"
          title=""
          src={
            "https://res.cloudinary.com/da403zlyf/image/upload/v1767002852/Frame_1618874166_bp7qiq.png"
          }
        />
      </figure>
      <article className="order-1 lg:order-2  flex flex-col space-y-3   py-4  pr-3 col-span-8">
        <strong className="font-inter text-2xl lg:text-[36px] lg:leading-normal text-white font-bold">
          Bloq başlığı
        </strong>
        <p className="font-inter lg:min-h-20 line-clamp-4 text-ellipsis text-base lg:text-lg text-white font-normal">
          Sənaye proseslərinin avtomatlaşdırılması, real vaxtda monitorinq və
          mərkəzləşdirilmiş idarəetmə həlləri təqdim edirik.PLC və SCADA
          sistemləri istehsal və sənaye proseslərinin avtomatik idarə olunmasını
          təmin edir. Bu həllər vasitəsilə avadanlıqların işi mərkəzləşdirilmiş
          şəkildə nəzarətdə saxlanılır, insan faktorundan yaranan risklər azalır
          və istehsalın səmərəliliyi artır.
        </p>
      </article>
    </Link>
  );
}
