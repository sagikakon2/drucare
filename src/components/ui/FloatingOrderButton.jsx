import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const FloatingOrderButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: bottom bar */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-0 inset-x-0 z-40 md:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              borderTop: '1px solid rgba(46, 125, 50, 0.1)',
              boxShadow: '0 -2px 20px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <a
                href="https://app.shopix.global/user/drucare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-white rounded-xl py-3 text-sm font-semibold cursor-pointer hover-btn"
                style={{ boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)' }}
              >
                להזמנה עכשיו
                <ArrowLeft className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Desktop: small floating button */}
          <motion.a
            href="https://app.shopix.global/user/drucare"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="להזמנה"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="hidden md:inline-flex fixed bottom-7 right-5 z-50 bg-primary text-white rounded-xl px-5 py-2.5 text-sm font-semibold items-center gap-2 cursor-pointer hover-btn animate-fab"
            style={{
              '--fab-shadow': '0 2px 8px rgba(46, 125, 50, 0.3)',
              '--fab-ring': 'rgba(46, 125, 50, 0.2)',
              '--fab-ring-out': 'rgba(46, 125, 50, 0)',
            }}
          >
            להזמנה
            <ArrowLeft className="w-3.5 h-3.5" />
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
};
