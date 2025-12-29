import DateArea from "./date";

export default function FirstSection() {
  return (
    <section className="lg:py-25 py-10 bg-ui-3">
      <div className="container flex lg:space-y-10 flex-col space-y-5">
        <h1 className="font-inter text-2xl font-bold lg:text-[46px] text-white lg:leading-14.5">
          Bloq başlığı
        </h1>
        <DateArea />
      </div>
    </section>
  );
}
