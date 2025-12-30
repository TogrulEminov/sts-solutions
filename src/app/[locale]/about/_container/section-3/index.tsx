import Statistics from "./statistics";
import CustomImage from "@/src/globalElements/ImageTag";

export default function TeamContent() {
  return (
    <section className="pb-10 lg:pb-25">
      <div className="px-0 lg:px-4 container">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 p-5 lg:p-10 bg-ui-23 rounded-2xl lg:rounded-4xl">
          <div className="lg:col-span-8 flex flex-col space-y-10">
            <article className="font-inter font-normal text-base lg:text-2xl text-ui-7">
              Komandamız hər bir sifarişçi üçün hədəf məqsədin effektiv və çevik
              gerçəkləşməsini təmin etməyə xidmət edən fəaliyyət modeli ilə
              çalışır. Şirkətimiz çoxşaxəli istiqamətlərlə geniş texniki
              xidmətlər bacarığı ilə rəqabət üstünlüyü yaradaraq Azərbaycanda öz
              profili üzrə qabaqcıl dünya şirkətləri standartında və
              səviyyəsində çox istiqamətli xidmətlər və həllər təqdim edir.
            </article>
            <Statistics />
          </div>
          <figure className="lg:col-span-4">
            <CustomImage
              width={357}
              height={565}
              title=""
              src={
                "https://res.cloudinary.com/da403zlyf/image/upload/v1766317331/Group_1321314574_nfknny.svg"
              }
              className="w-full h-auto max-h-140"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
