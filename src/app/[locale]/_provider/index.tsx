import Footer from "@/src/ui/layout/footer";
import Header from "@/src/ui/layout/header";
import Sidebar from "@/src/ui/layout/sidebar";
import StickySocial from "@/src/ui/layout/sticky";

interface LocalLayoutProps {
  children: React.ReactNode;
}
export default function ProviderComponent({ children }: LocalLayoutProps) {
  return (
    <>
      <Header />
      <StickySocial/>
      <Sidebar/>
      {children}
      <Footer />
    </>
  );
}
