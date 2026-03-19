import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft, Phone, ShoppingBag } from 'lucide-react';

const NAV_LINKS = [
  { label: 'אודות המשחה', href: '#about' },
  { label: 'תוצאות', href: '#results' },
  { label: 'הוראות שימוש', href: '#instructions' },
  { label: 'המלצות', href: '#testimonials' },
  { label: 'שאלות נפוצות', href: '#faq' },
  { label: 'צור קשר', href: '#contact' },
];

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.62)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.45)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
};

const glassStyleDark = {
  background: 'rgba(45, 59, 45, 0.88)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
};

export const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const scrollTo = useCallback((href) => {
    setMobileOpen(false);
    requestAnimationFrame(() => {
      const el = document.querySelector(href);
      if (el) {
        const headerOffset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }, []);

  return (
    <>
      <header
        className="fixed z-50 transition-all duration-500 ease-out"
        style={{
          top: scrolled ? '12px' : '0px',
          insetInlineStart: scrolled ? '16px' : '0px',
          insetInlineEnd: scrolled ? '16px' : '0px',
          borderRadius: scrolled ? '16px' : '0px',
          border: '1px solid transparent',
          ...(scrolled ? glassStyle : {}),
        }}
      >
        <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-[68px]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="shrink-0 cursor-pointer"
          >
            <img src="/images/logo.png" alt="DruCare" className="h-10 md:h-11 w-auto" />
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-250 ease-out hover:bg-primary/8 hover:text-primary text-text cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="https://app.shopix.global/user/drucare"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white hover:bg-primary/90 rounded-xl px-5 py-2.5 text-sm font-semibold cursor-pointer min-h-[40px] inline-flex items-center gap-2 hover-btn"
              style={{
                boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
              }}
            >
              להזמנה
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 cursor-pointer text-text rounded-lg hover:bg-black/5 transition-colors"
            aria-label="תפריט"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop - simple dark overlay, no blur (cheap opacity animation) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] md:hidden"
              style={{ background: 'rgba(0, 0, 0, 0.5)', touchAction: 'none' }}
              onClick={closeMobile}
            />

            {/* Menu panel - slides in, solid background (no backdrop-filter for perf) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-[360px] z-[101] md:hidden"
              style={{
                background: 'linear-gradient(165deg, #3a5a3a 0%, #2d3b2d 50%, #243024 100%)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '-8px 0 40px rgba(0, 0, 0, 0.3)',
                willChange: 'transform',
                touchAction: 'none',
                overscrollBehavior: 'none',
              }}
            >
              <div className="relative h-full flex flex-col px-6 py-5 overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <img src="/images/logo.png" alt="DruCare" className="h-9 w-auto brightness-0 invert" />
                  <button
                    onClick={closeMobile}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white/80 hover:text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                    aria-label="סגור תפריט"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 flex flex-col justify-center -mt-8">
                  <div className="space-y-1">
                    {NAV_LINKS.map((link, i) => (
                      <div
                        key={link.href}
                        className="mobile-menu-item"
                        style={{ animationDelay: `${0.12 + i * 0.04}s` }}
                      >
                        <button
                          onClick={() => scrollTo(link.href)}
                          className="w-full text-start text-2xl font-semibold text-white/90 hover:text-white py-3.5 px-4 rounded-xl transition-all duration-200 cursor-pointer hover:bg-white/8"
                          style={{ fontFamily: "'Rubik', sans-serif" }}
                        >
                          {link.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </nav>

                <div
                  className="space-y-3 pb-4 mobile-menu-item"
                  style={{ animationDelay: '0.3s' }}
                >
                  <a
                    href="https://app.shopix.global/user/drucare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl min-h-[52px] text-base font-bold cursor-pointer transition-all text-white"
                    style={{
                      background: 'linear-gradient(135deg, #2E7D32, #7CB342)',
                      boxShadow: '0 4px 16px rgba(46, 125, 50, 0.4)',
                    }}
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                    להזמנה עכשיו
                  </a>
                  <a
                    href="tel:0545661535"
                    className="flex items-center justify-center gap-2 w-full rounded-xl min-h-[48px] text-sm font-medium cursor-pointer text-white/70 hover:text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Phone className="w-4 h-4" />
                    054-566-1535
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
