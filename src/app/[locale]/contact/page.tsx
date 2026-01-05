import { Metadata } from "next";
import ContactPageContainer from "./_container";
import { generatePageMetadata } from "@/src/utils/metadata";
import { validateLocale } from "@/src/helper/validateLocale";
import { fetchContact } from "@/src/actions/ui/contact.actions";
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

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  const validatedLocale = validateLocale(locale);

  const existingData = await fetchContact({
    locale: validatedLocale,
  });
  return <ContactPageContainer  existingData={existingData}/>;
}
