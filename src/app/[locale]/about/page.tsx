import React from "react";
import AboutPageContainer from "./_container";
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
    slug: "about",
    dataType: "category",
    customPath: "about",
  });
}

export default async function AboutPage() {
  return <AboutPageContainer />;
}
