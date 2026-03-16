import { Phone, Mail, ArrowUp, ExternalLink } from 'lucide-react';
import { SparklesCore } from '@/components/effects/SparklesCore';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-text text-white relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <SparklesCore
          particleColor="#C9A96E"
          particleDensity={15}
          minSize={0.3}
          maxSize={0.8}
          speed={0.1}
        />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-primary/40 to-transparent" />
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/images/logo.png" alt="DruCare" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-gold text-sm font-medium mb-2">בריאות מהטבע</p>
            <p className="text-white/60 leading-relaxed text-sm">
              מוצרי טיפוח וטיפול טבעיים לבעלי חיים.
              <br />
              100% חומרים טבעיים, מיוצר בישראל במפעל קוסמטיקה אורגנית מורשה.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">ניווט מהיר</h4>
            <ul className="space-y-3">
              {[
                { label: 'אודות המשחה', href: '#about' },
                { label: 'תוצאות', href: '#results' },
                { label: 'הוראות שימוש', href: '#instructions' },
                { label: 'המלצות', href: '#testimonials' },
                { label: 'שאלות נפוצות', href: '#faq' },
                { label: 'צור קשר', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/60 hover:text-white transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">יצירת קשר</h4>
            <div className="space-y-4">
              <a href="tel:0545661535" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span className="text-sm" dir="ltr">054-566-1535</span>
              </a>
              <a href="mailto:keren.druker@gmail.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
                <span className="text-sm">keren.druker@gmail.com</span>
              </a>
              <a
                href="https://app.shopix.global/user/drucare/category/-Nn_99HJ3c89138AhEIt/product/-NnA2laDq3QFY8sXf4ke"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">חנות המוצרים</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex items-center justify-between">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} DruCare — כל הזכויות שמורות
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="חזרה למעלה"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};
