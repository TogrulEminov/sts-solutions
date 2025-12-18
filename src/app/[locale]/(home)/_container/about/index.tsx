import React from "react";
import Statistics from "./statistics";
import AnimatedProjectButton from "@/src/ui/link/second";

export default function AboutSection() {
  return (
    <section className="lg:py-25 py-10">
      <div className="container">
        <div className="grid grid-cols-2 items-start">
          <figure></figure>
          <article>
            <strong>Biz kimik</strong>
            <span>Sənayenin hər sahəsi üçün ağıllı mühəndislik</span>
            <p>
              STS Mühəndislik – qida sənayesi, logistika, enerji və alternativ
              enerji, su və kənd təsərrüfatı sektorları üçün texniki həllər,
              avtomatlaşdırma, proqramlaşdırma və proses idarəetməsi üzrə
              ixtisaslaşmış peşəkar mühəndis komandasıdır.Uzun illik
              təcrübəmizlə hər bir sifarişçinin məqsədinə uyğun, effektiv və
              çevik həllər təqdim edirik.
            </p>
            <Statistics />
            <AnimatedProjectButton title="Daha çox məlumat al" link="/about" />
          </article>
        </div>
      </div>
    </section>
  );
}
