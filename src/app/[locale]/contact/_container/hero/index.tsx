import CustomImage from "@/src/globalElements/ImageTag";
export default function ContactHero() {
  return (
    <section className="pt-20 pb-10 min-h-60 lg:min-h-120 relative flex items-center">
      <div className="absolute inset-0 w-full h-full bg-ui-25/80 z-2"></div>
      <CustomImage
        width={1920}
        height={400}
        title=""
        className="block w-full h-full inset-0 absolute z-1 object-cover"
        src={
          "https://res.cloudinary.com/da403zlyf/image/upload/v1766323857/8c68bb091b4236f3d327f181be1279e50b36ca45_zbv9lt.jpg"
        }
      />
      <div className="container relative z-3 flex flex-col space-y-3">
        <h1 className="text-4xl lg:text-[56px] lg:leading-16 text-white max-w-206 font-extrabold font-inter">
          Smart Technical Solutions
        </h1>
        <p className="font-inter lg:text-[28px] text-white font-normal lg:leading-9">
          Şirkətimiz, müştərinin iş proseslərini effektiv şəkildə
          təkmilləşdirərək, texnologiyaların avtomatlaşması ilə həllər təqdim
          edir.
        </p>
      </div>
    </section>
  );
}
