import React from "react";
import CountArea from "./count";
import { Plus } from "lucide-react";

export default function AboutContent() {
  return (
    <section className="lg:py-20">
      <div className="container">
        <div className="flex flex-col space-y-10">
          <strong className="font-inter font-extrabold lg:text-[56px] lg:leading-16 text-ui-21">
            Biz kimik?
          </strong>
          <div className="grid grid-cols-12 gap-10">
            <div className="flex gap-3  items-center col-span-4">
              <CountArea count={10} />
              <div className="flex flex-col space-y-1">
                <span className="lg:text-[80px] leading-normal font-extrabold font-inter">
                  <Plus className="text-ui-1" size={80} />
                </span>
                <span className="font-inter font-bold lg:text-[28px] lg:leading-9 text-ui-2">
                  illik təcrübə
                </span>
              </div>
            </div>
            <article className="col-span-8 font-inter lg:text-2xl text-ui-7 highlight font-normal">
              STS Mühəndislik <b>qida sənayesi</b>, lojistika, enerji və
              alternativ enerji, su təsərrüfatı, kənd təsərrüfatı sektorlarında
              texniki həllərin təqdim edilməsi və icrası, avtomatlaşdırma,
              proqramlaşdırma, proseslərin təşkili və idarə edilməsii sahəsində
              uzun illər təcrübə keçmiş və layihələr icra etmiş professional
              mühəndis komandasıdır.
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
