import React from "react";
import ServicesPageMainContainer from "./_container/main";
import { Metadata } from "next";
import { generatePageMetadata } from "@/src/utils/metadata";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchServices } from "@/src/actions/ui/services.actions";
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
export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;

  const validatedLocale = validateLocale(locale);

  const existingData = await fetchServices({ locale: validatedLocale });
  return <ServicesPageMainContainer  existingData={existingData}/>;
}
