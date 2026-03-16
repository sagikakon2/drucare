import { MessageCircle } from 'lucide-react';

export const WhatsAppFAB = () => (
  <a
    href="https://wa.me/972545661535?text=היי, אשמח לשמוע פרטים על משחת הפלא של DruCare"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="fixed bottom-5 start-5 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg animate-pulse-gentle cursor-pointer hover-scale"
  >
    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
  </a>
);
