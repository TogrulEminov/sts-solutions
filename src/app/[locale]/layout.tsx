import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import ProviderComponent from "./_provider";
interface LocalLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocalLayout({
  children,
  params,
}: LocalLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  setRequestLocale(locale);
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <ProviderComponent>{children}</ProviderComponent>
      </NextIntlClientProvider>
    </>
  );
}
