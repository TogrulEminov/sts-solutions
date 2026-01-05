import React from "react";
import AboutPageContainer from "./_container";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchAbout } from "@/src/actions/ui/about.actions";
import { notFound } from "next/navigation";
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

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const validatedLocale = validateLocale(locale);

  const existingData = await fetchAbout({
    locale: validatedLocale,
  });
  if (!existingData?.data?.aboutData?.translations?.length) {
    return notFound();
  }
  return <AboutPageContainer existingData={existingData} />;
}
