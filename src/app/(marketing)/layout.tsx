import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ChatWidget } from "@/features/chat/chat-widget";
import { BackToTop } from "@/components/site/back-to-top";
import { NewsletterPopup } from "@/components/site/newsletter-popup";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ChatWidget />
      <WhatsAppButton />
      <BackToTop />
      <NewsletterPopup />
    </div>
  );
}
