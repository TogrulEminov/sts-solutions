import { fetchLayout } from "@/src/actions/ui/layout.actions";
import { CustomLocales } from "@/src/services/interface";
import CallAction from "@/src/ui/layout/call-action";
import ContactModal from "@/src/ui/layout/contact-modal";
import Footer from "@/src/ui/layout/footer";
import Header from "@/src/ui/layout/header";
import Sidebar from "@/src/ui/layout/sidebar";
import StickySocial from "@/src/ui/layout/sticky";

interface LocalLayoutProps {
  children: React.ReactNode;
  locale: string;
}
export default async function ProviderComponent({
  children,
  locale,
}: LocalLayoutProps) {
  const layoutData = await fetchLayout({
    locale: locale as CustomLocales,
  });
  return (
    <>
      <Header
        socialData={layoutData?.data?.socialData as any}
        contactData={layoutData?.data?.contactData as any}
      />
      <StickySocial socialData={layoutData?.data?.socialData} />
      <Sidebar
        socialData={layoutData?.data?.socialData as any}
        contactData={layoutData?.data?.contactData as any}
      />
      <main className="pt-19 lg:pt-[167px] bg-ui-28 overflow-hidden">
        {children}
      </main>
      <CallAction sectionData={layoutData?.sections?.contactCta} />
      <ContactModal servicesData={layoutData?.data?.servicesData as any} />
      <Footer
        servicesData={layoutData?.data?.servicesData as any}
        socialData={layoutData?.data?.socialData as any}
        contactData={layoutData?.data?.contactData as any}
      />
    </>
  );
}
