import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { NumberTicker } from '@/components/effects/NumberTicker';
import { BorderBeam } from '@/components/effects/BorderBeam';
import { CDN_IMAGES } from '@/cdn';

const IMAGES = [
  { src: CDN_IMAGES.beforeAfterFace, caption: 'שיקום עור הפנים' },
  { src: CDN_IMAGES.result1, caption: 'ריפוי פצע ברגל' },
  { src: CDN_IMAGES.result2, caption: 'שיקום פרווה תוך שבוע' },
  { src: CDN_IMAGES.beforeAfterFur, caption: 'שיקום פרווה מלא' },
  { src: CDN_IMAGES.beforeAfterLeg, caption: 'ריפוי נגע ברגל' },
  { src: CDN_IMAGES.beforeAfterSkin, caption: 'שיקום עור' },
  { src: CDN_IMAGES.result3, caption: 'שיקום עור הגוף' },
  { src: CDN_IMAGES.result4, caption: 'טיפול באזור פגוע' },
  { src: CDN_IMAGES.beforeAfterTail, caption: 'שיקום אזור הזנב' },
  { src: CDN_IMAGES.beforeAfterWound, caption: 'ריפוי פצע פתוח' },
  { src: CDN_IMAGES.beforeAfterWeeks, caption: 'שינוי דרמטי תוך שבועות' },
  { src: CDN_IMAGES.beforeAfterFullbody, caption: 'שיקום גוף מלא' },
  { src: CDN_IMAGES.result5, caption: 'ריפוי אזור רגיש' },
  { src: CDN_IMAGES.result6, caption: 'שיקום מלא' },
  { src: CDN_IMAGES.result7, caption: 'טיפול בגרדת' },
  { src: CDN_IMAGES.result8, caption: 'תוצאות לאחר טיפול' },
];

const STATS = [
  { value: 95, suffix: '%', label: 'שיעור הצלחה' },
  { value: 14, suffix: '', label: 'ימים לתוצאות' },
  { value: 10000, suffix: '+', label: 'סוסים טופלו בארץ' },
];

const Lightbox = ({ image, onClose, onPrev, onNext, index, total }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
    onClick={onClose}
  >
    <div
      className="absolute inset-0"
      style={{
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    />
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative w-full max-w-3xl z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute -top-12 end-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover-circle-light z-20"
        aria-label="סגור"
      >
        <X className="w-5 h-5 text-white" />
      </button>
      <div className="rounded-2xl overflow-hidden bg-black/40">
        <img src={image.src} alt={image.caption} className="w-full max-h-[75vh] object-contain" />
        <div className="p-5 md:p-6 flex items-center justify-between">
          <h3 className="font-bold text-white text-lg">{image.caption}</h3>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={onPrev} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover-circle-light" aria-label="הקודם">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <span className="text-white/50 text-sm min-w-[40px] text-center" dir="ltr">{index + 1}/{total}</span>
            <button onClick={onNext} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover-circle-light" aria-label="הבא">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export const BeforeAfter = () => {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = (i) => {
    setLightboxIdx(i);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxIdx(null);
    document.body.style.overflow = '';
  };
  const nextLightbox = () => setLightboxIdx((p) => (p + 1) % IMAGES.length);
  const prevLightbox = () => setLightboxIdx((p) => (p - 1 + IMAGES.length) % IMAGES.length);

  return (
    <section id="results" className="bg-bg relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="gradient-blob w-96 h-96 bg-primary/6 bottom-0 -end-32" />
        <div className="gradient-blob w-72 h-72 bg-secondary/5 top-1/4 -start-24" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center" style={{ marginBottom: 'var(--heading-mb)' }}>
          <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
            תוצאות אמיתיות
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-2" style={{ letterSpacing: '0.04em' }}>
            <span className="bg-gradient-to-l from-primary via-secondary to-[#C9A96E] bg-clip-text text-transparent">
              לפני ואחרי
            </span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            תוצאות אמיתיות של סוסים שטופלו עם משחת הפלא — לחצו להגדלה
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {IMAGES.map((image, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden cursor-pointer group relative"
              onClick={() => openLightbox(i)}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full aspect-square object-cover hover-zoom"
                loading="lazy"
                width={300}
                height={300}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent hover-reveal flex items-end p-3">
                <p className="text-white text-xs font-medium leading-tight">{image.caption}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center hover-reveal">
                <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-4 h-4 text-text" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8">
          <div
            className="relative overflow-hidden rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 2px rgba(255,255,255,0.5)',
            }}
          >
            <BorderBeam size={400} duration={10} colorFrom="#2E7D32" colorTo="#C9A96E" bgClass="bg-white" />
            <h3 className="relative z-10 text-xl md:text-2xl font-bold text-center text-primary mb-6" style={{ letterSpacing: '0.03em' }}>
              תוצאות מוכחות
            </h3>
            <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <NumberTicker
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                    className="text-xl sm:text-2xl md:text-4xl font-black bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent inline-block tracking-wide"
                  />
                  <p className="text-text-muted text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            image={IMAGES[lightboxIdx]}
            index={lightboxIdx}
            total={IMAGES.length}
            onClose={closeLightbox}
            onNext={nextLightbox}
            onPrev={prevLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
