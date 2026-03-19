import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { CDN_VIDEOS } from '@/cdn';

const REELS = [
  { src: CDN_VIDEOS.reel1 },
  { src: CDN_VIDEOS.reel2 },
  { src: CDN_VIDEOS.reel3 },
  { src: CDN_VIDEOS.reel4 },
  { src: CDN_VIDEOS.reel5 },
  { src: CDN_VIDEOS.reel6 },
  { src: CDN_VIDEOS.reel7 },
  { src: CDN_VIDEOS.reel8 },
  { src: CDN_VIDEOS.reel9 },
  { src: CDN_VIDEOS.reel11 },
];

function VideoLightbox({ src, onClose, onPrev, onNext, index, total, muted, onToggleMute }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [src]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const handleCanPlay = () => {
    setLoading(false);
    videoRef.current?.play().catch(() => {});
  };

  return (
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
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 flex flex-col items-center max-h-[90vh]"
        style={{ width: 'min(380px, 85vw)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 end-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover-circle-light z-20"
          aria-label="סגור"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="rounded-2xl overflow-hidden bg-black w-full relative" style={{ aspectRatio: '9/16' }}>
          <video
            ref={videoRef}
            key={src}
            src={src}
            loop
            muted={muted}
            playsInline
            preload="auto"
            onCanPlay={handleCanPlay}
            className="w-full h-full object-cover"
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="w-10 h-10 rounded-full border-3 border-white/20 border-t-gold animate-spin" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between w-full mt-4 px-1">
          <button
            onClick={onToggleMute}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover-circle-light"
            aria-label={muted ? 'הפעל צליל' : 'השתק'}
          >
            {muted
              ? <VolumeX className="w-5 h-5 text-white" />
              : <Volume2 className="w-5 h-5 text-white" />
            }
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover-circle-light"
              aria-label="הקודם"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <span className="text-white/50 text-sm min-w-[40px] text-center" dir="ltr">
              {index + 1}/{total}
            </span>
            <button
              onClick={onNext}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover-circle-light"
              aria-label="הבא"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ReelThumb({ src, onClick }) {
  return (
    <div
      className="relative w-full h-full shrink-0 snap-center rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <video
        src={`${src}#t=0.001`}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 text-white ms-0.5" fill="white" />
        </div>
      </div>
    </div>
  );
}

export const VideoReels = () => {
  const trackRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);
  const count = REELS.length;

  const openLightbox = (i) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const nextLightbox = () => setLightboxIdx((p) => (p + 1) % count);
  const prevLightbox = () => setLightboxIdx((p) => (p - 1 + count) % count);

  const rafRef = useRef(null);

  const computeClosest = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    if (!children.length) return;
    const trackRect = el.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    }
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeClosest);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    computeClosest();
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [computeClosest]);

  const scrollToIndex = useCallback((i) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i];
    if (!child) return;
    child.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
    setActiveIndex(i);
  }, []);

  const scrollByPage = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }, []);

  const scrollPrev = useCallback(() => scrollByPage(1), [scrollByPage]);
  const scrollNext = useCallback(() => scrollByPage(-1), [scrollByPage]);

  return (
    <section
      id="reels"
      className="bg-text relative overflow-hidden"
      style={{ paddingBlock: 'var(--section-py)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(46,125,50,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(201,169,110,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          className="text-center"
          style={{ marginBottom: 'var(--heading-mb)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-gold text-sm font-semibold tracking-[0.15em] uppercase block mb-1">
            ראו בעצמכם
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ letterSpacing: '0.04em' }}>
            תוצאות{' '}
            <span className="bg-gradient-to-l from-gold to-secondary bg-clip-text text-transparent">
              אמיתיות
            </span>
          </h2>
          <p className="text-white/50 mt-2 text-base md:text-lg max-w-xl mx-auto">
            סרטונים מהשטח — שיפור מדהים בעור, בפרווה ובריפוי פצעים
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollPrev}
            className="shrink-0 hidden lg:flex w-11 h-11 items-center justify-center rounded-full cursor-pointer bg-white/5 text-white/60 hover-circle-light"
            aria-label="הקודם"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="min-w-0 flex-1">
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2"
            >
              {REELS.map((reel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="reel-slide"
                >
                  <ReelThumb src={reel.src} onClick={() => openLightbox(i)} />
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            className="shrink-0 hidden lg:flex w-11 h-11 items-center justify-center rounded-full cursor-pointer bg-white/5 text-white/60 hover-circle-light"
            aria-label="הבא"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex lg:hidden items-center justify-center gap-1.5 mt-5">
          {REELS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="cursor-pointer rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                background: i === activeIndex
                  ? 'linear-gradient(135deg, var(--color-gold), var(--color-secondary))'
                  : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`סרטון ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <VideoLightbox
            src={REELS[lightboxIdx].src}
            index={lightboxIdx}
            total={count}
            muted={muted}
            onToggleMute={toggleMute}
            onClose={closeLightbox}
            onNext={nextLightbox}
            onPrev={prevLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
