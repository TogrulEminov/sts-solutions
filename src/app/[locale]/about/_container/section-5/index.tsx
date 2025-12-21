import PurposeCard from "./card";
const data = [
  {
    icon: "https://res.cloudinary.com/da403zlyf/image/upload/v1766319601/Color_Layer_lsttns.png",
    title: "Missiyamız",
    description:
      "Bizim missiyamız – sənaye və emal sahələrində müasir, etibarlı və çevik texniki həllər təqdim etməklə müştərilərimizin məhsuldarlığını, təhlükəsizliyini və rəqabət qabiliyyətini daim yüksəltməkdir. Yüksək ixtisaslı mühəndis komandamızın peşəkarlığı, innovativ yanaşmamız və layihə idarəetməsindəki səmərəliliyimiz sayəsində hər bir sifarişçinin konkret ehtiyaclarına uyğun özəl həllər yaratmaq, texnoloji prosesləri optimallaşdırmaq və Azərbaycanda sənaye infrastrukturunun davamlı inkişafına töhfə vermək əsas məqsədimizdir",
  },
  {
    icon: "https://res.cloudinary.com/da403zlyf/image/upload/v1766319782/Color_Layer_2_ro9ghz.png",
    title: "Vizyonumuz",
    description:
      "Biz Azərbaycanın sənaye sahəsində texniki xidmətlər göstərən aparıcı gücə çevrilməyi, müasir rəqəmsal texnologiyaları tətbiq edərək ölkəmizin rəqabət qabiliyyətini artırmağı hədəfləyirik. Yüksək keyfiyyətli mühəndislik yanaşmamız və innovativ həllərlə həm yerli, həm də regional bazarlarda nüfuzlu tərəfdaş olmaq, sənaye infrastrukturunun davamlı inkişafına və dayanıqlı gələcəyə töhfə vermək bizim əsas vizyonumuzdur.",
  },
];
export default function PurposeSection() {
  return (
    <section className="py-15 bg-ui-1/11">
      <div className="container flex flex-col space-y-10">
        <strong className="font-manrope max-w-lg font-extrabold lg:text-[56px] lg:leading-16 text-ui-7">
          Bizim Missiyamız və Vizyonumuz
        </strong>
        <div className="grid grid-cols-2 gap-6">
          {data?.map((item, index) => {
            return (
              <PurposeCard
                index={index}
                key={index}
                title={item?.title}
                icon={item?.icon}
                description={item?.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
