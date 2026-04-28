import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PopupOffer from '@/components/PopupOffer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <PopupOffer />
      <WhatsAppButton />
    </>
  );
}
