import { useRef, useEffect, useCallback } from 'react';

export const SparklesCore = ({
  className = '',
  background = 'transparent',
  particleColor = '#2E7D32',
  particleDensity = 25,
  minSize = 0.6,
  maxSize = 1.2,
  speed = 0.2,
}) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);
  const isVisible = useRef(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveDensity = isMobile ? Math.min(particleDensity, 30) : particleDensity;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    particles.current = Array.from({ length: effectiveDensity }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, [effectiveDensity, maxSize, minSize, speed, dpr]);

  useEffect(() => {
    init();
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const animate = () => {
      if (!isVisible.current) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (const p of particles.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animate();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [init, particleColor, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{ background }}
      className={`w-full h-full ${className}`}
    />
  );
};
