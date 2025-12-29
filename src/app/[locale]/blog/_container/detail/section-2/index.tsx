import CustomImage from "@/src/globalElements/ImageTag";

export default function SecondSection() {
  return (
    <section className="py-10 lg:py-25">
      <div className="container flex flex-col lg:space-y-10 space-y-5">
        <figure className="h-full w-full">
          <CustomImage
            width={1200}
            height={600}
            title=""
            src={
              "https://res.cloudinary.com/da403zlyf/image/upload/v1766323857/8c68bb091b4236f3d327f181be1279e50b36ca45_zbv9lt.jpg"
            }
            className="w-full h-full rounded-lg max-h-150"
          />
        </figure>
        <article className="font-inter font-normal lg:text-[28px] text-ui-7">
          Avtomatlaşdırma və idarəetmə sistemləri sənaye proseslərinin
          təhlükəsiz, stabil və yüksək səmərəliliklə işləməsini təmin edən əsas
          texnoloji həllərdən biridir. Şirkətimiz istehsal və texnoloji
          proseslərin avtomatlaşdırılması, mövcud sistemlərin modernizasiyası və
          inteqrasiyası üzrə kompleks mühəndislik xidmətləri təqdim edir. Hər
          bir layihə obyektin texniki tələblərinə uyğun şəkildə layihələndirilir
          və beynəlxalq standartlar əsasında icra olunur. Avtomatlaşdırma və
          idarəetmə sistemləri sənaye proseslərinin təhlükəsiz, stabil və yüksək
          səmərəliliklə işləməsini təmin edən əsas texnoloji həllərdən biridir.
        </article>
      </div>
    </section>
  );
}
