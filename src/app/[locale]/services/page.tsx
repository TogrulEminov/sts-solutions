import React from "react";
import ServicesPageMainContainer from "./_container/main";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
interface PageProps {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale,
    slug: "services",
    customPath: "services",
    dataType: "category",
    detail: false,
  });
}
export default function ServicesPage() {
  return <ServicesPageMainContainer />;
}
