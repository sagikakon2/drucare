import { useState, useEffect, useRef } from 'react';
import { CDN_IMAGES } from '@/cdn';

const CRITICAL_IMAGES = [
  '/images/logo.png',
  CDN_IMAGES.productJar,
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

function waitForFonts() {
  if (!document.fonts?.ready) return Promise.resolve();
  return Promise.race([
    document.fonts.ready,
    new Promise((r) => setTimeout(r, 2000)),
  ]);
}

export const SplashLoader = ({ onReady }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const total = CRITICAL_IMAGES.length + 1;
    let loaded = 0;

    const tick = () => {
      loaded++;
      if (!cancelled) setProgress(Math.round((loaded / total) * 100));
    };

    const imagePromises = CRITICAL_IMAGES.map((src) =>
      preloadImage(src).then(tick)
    );
    const fontPromise = waitForFonts().then(tick);

    Promise.all([...imagePromises, fontPromise]).then(() => {
      if (cancelled) return;
      setProgress(100);
      setTimeout(() => {
        if (cancelled) return;
        setExiting(true);
        setTimeout(() => {
          if (!cancelled) onReady();
        }, 450);
      }, 200);
    });

    const safety = setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setExiting(true);
        setTimeout(() => {
          if (!cancelled) onReady();
        }, 450);
      }
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #F6F9F2 0%, #ECF2E6 40%, #E8F5E9 100%)',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.45s ease-out',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      <div
        className="flex flex-col items-center gap-6"
        style={{
          transform: exiting ? 'scale(0.97) translateY(-6px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.45s ease-out',
        }}
      >
        <div className="relative">
          <div
            className="absolute -inset-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(46,125,50,0.12) 0%, transparent 70%)',
              animation: 'loader-glow 2s ease-in-out infinite',
            }}
          />
          <img
            src="/images/logo.png"
            alt="DruCare"
            className="relative w-28 h-28 md:w-36 md:h-36 object-contain"
            style={{
              animation: 'loader-breathe 2s ease-in-out infinite',
              filter: 'drop-shadow(0 4px 24px rgba(46,125,50,0.15))',
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p
            className="text-primary text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            DruCare
          </p>
          <p
            className="text-text-muted text-xs tracking-wider"
            style={{ fontFamily: "'Heebo', sans-serif" }}
          >
            בריאות מהטבע
          </p>
        </div>

        <div className="w-48 md:w-56 flex flex-col items-center gap-2 mt-2">
          <div className="w-full h-[3px] rounded-full bg-primary/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                transition: 'width 0.4s ease-out',
              }}
            />
          </div>
          <span className="text-text-muted/60 text-[10px] tabular-nums">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
