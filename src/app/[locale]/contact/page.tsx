import { Metadata } from "next";
import ContactPageContainer from "./_container";
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
    slug: "contact",
    customPath: "contact",
    dataType: "category",
    detail: false,
  });
}

export default async function ContactPage() {
  return <ContactPageContainer />;
}
