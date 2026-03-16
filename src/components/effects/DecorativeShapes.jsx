import { useRef, useEffect, useCallback } from 'react';

const SPEED_PRESETS = {
  'very-slow': { vx: 0.03, vy: [0.015, 0.03], ws: [0.08, 0.15], wa: [0.05, 0.1], rs: [0.001, 0.003] },
  'slow': { vx: 0.06, vy: [0.025, 0.05], ws: [0.12, 0.25], wa: [0.08, 0.18], rs: [0.002, 0.006] },
  'medium': { vx: 0.12, vy: [0.05, 0.09], ws: [0.2, 0.4], wa: [0.12, 0.25], rs: [0.004, 0.01] },
};

const rand = (min, max) => min + Math.random() * (max - min);

const drawLeaf = (ctx, s) => {
  const t = s * 0.85;
  ctx.beginPath();
  ctx.moveTo(0, -t);
  ctx.bezierCurveTo(t * 0.5, -t * 0.5, t * 0.5, t * 0.4, 0, t);
  ctx.bezierCurveTo(-t * 0.5, t * 0.4, -t * 0.5, -t * 0.5, 0, -t);
  ctx.closePath();
};

const drawPetal = (ctx, s) => {
  const t = s * 0.75;
  ctx.beginPath();
  ctx.moveTo(0, -t);
  ctx.bezierCurveTo(t * 0.85, -t * 0.35, t * 0.85, t * 0.35, 0, t);
  ctx.bezierCurveTo(-t * 0.85, t * 0.35, -t * 0.85, -t * 0.35, 0, -t);
  ctx.closePath();
};

const drawSparkle = (ctx, s) => {
  const arms = 4, outer = s, inner = s * 0.12;
  ctx.beginPath();
  for (let i = 0; i < arms * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i / arms);
    ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
};

const drawDot = (ctx, s) => { ctx.beginPath(); ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2); };

const SHAPE_REGISTRY = {
  orb: null,
  leaf: drawLeaf,
  petal: drawPetal,
  sparkle: drawSparkle,
  dot: drawDot,
};

export const DecorativeShapes = ({
  shapes = ['orb'],
  palette = [{ r: 46, g: 125, b: 50 }, { r: 124, g: 179, b: 66 }],
  count = 10,
  speed = 'slow',
  rotation = false,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveCount = isMobile ? Math.ceil(count / 2) : count;
  const sp = SPEED_PRESETS[speed] || SPEED_PRESETS.slow;

  const createParticle = useCallback((w, h) => ({
    x: Math.random() * w, y: Math.random() * h,
    size: 18 + Math.random() * 35,
    vx: (Math.random() - 0.5) * sp.vx * 2,
    vy: -(rand(...sp.vy)),
    opacity: 0.15 + Math.random() * 0.3,
    color: palette[Math.floor(Math.random() * palette.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    rot: Math.random() * Math.PI * 2,
    rotSpeed: rotation ? rand(...sp.rs) * (Math.random() > 0.5 ? 1 : -1) : 0,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: rand(...sp.ws),
    wobbleAmp: rand(...sp.wa),
  }), [shapes, palette, sp, rotation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = Array.from({ length: effectiveCount },
        () => createParticle(rect.width, rect.height));
    };

    resize();
    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); };
    window.addEventListener('resize', onResize);

    let visible = true;
    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    observer.observe(canvas);

    const animate = () => {
      if (!visible) { animRef.current = requestAnimationFrame(animate); return; }
      const { width: w, height: h } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach(p => {
        p.wobblePhase += p.wobbleSpeed * 0.016;
        p.x += p.vx + Math.sin(p.wobblePhase) * p.wobbleAmp;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        if (p.y + p.size < -10) { p.y = h + p.size + 10; p.x = Math.random() * w; }
        if (p.x < -p.size * 2) p.x = w + p.size;
        if (p.x > w + p.size * 2) p.x = -p.size;

        const { r, g, b } = p.color;

        if (p.shape === 'orb') {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(${r},${g},${b},${p.opacity * 0.85})`);
          grad.addColorStop(0.5, `rgba(${r},${g},${b},${p.opacity * 0.3})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          const drawer = SHAPE_REGISTRY[p.shape];
          if (!drawer) return;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          drawer(ctx, p.size);
          ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
          ctx.fill();
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [effectiveCount, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
