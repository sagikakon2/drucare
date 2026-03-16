---
name: premium-effects
description: Premium WOW effects catalog and section recipes for landing pages. Each effect is a pattern with full source code — adapt colors and props to each project's design system. Dependencies are only react + framer-motion (already in every project). Read this skill when building sections that need atmospheric, 3D, or animated effects.
---

# Premium Effects — Catalog & Section Recipes

Each effect below is a **pattern** — full source code you adapt per project. Replace color values, speeds, and densities to match the project's `@theme` variables and brand energy.

**Dependencies:** `react`, `framer-motion` (already in every project). No CLI install, no npm packages.

**Where to place:** Create `src/components/effects/` in the client project, one file per effect.

---

## Required CSS Keyframes

Add these to `src/index.css` after the `@theme` block. Only include keyframes for effects you actually use.

```css
@keyframes border-beam-spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes shimmer-sweep {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes beam-move {
  0% { transform: translateX(-5px); opacity: 0.1; }
  50% { opacity: 0.3; }
  100% { transform: translateX(5px); opacity: 0.1; }
}
```

---

## Color Adaptation Rule

Every effect uses color props. **NEVER hardcode hex values** — derive them from the project's `@theme`:

| Effect prop | Map to project variable |
|-------------|------------------------|
| `particleColor` | `--color-primary` hex value |
| `fill` (Spotlight) | `--color-primary` hex value |
| `colorFrom` (borders) | `--color-primary` hex value |
| `colorTo` (borders) | `--color-secondary` hex value |
| `background` (ShimmerButton) | `var(--color-primary)` |
| `color` (LampEffect) | `--color-primary` hex value |
| SVG gradient stops (BackgroundBeams) | primary + secondary hex values |
| `bg-pearl` (BorderBeam inner) | project's `--color-bg` class |

---

## TypeScript Interfaces

Add these interfaces to a shared types file (`src/types/effects.ts`) or at the top of each component file:

```tsx
export interface SparklesCoreProps {
  className?: string;
  background?: string;
  particleColor: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

export interface SpotlightProps {
  className?: string;
  fill?: string;
}

export interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export interface BorderBeamProps {
  children: React.ReactNode;
  className?: string;
  bgClass?: string;
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
}

export interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  background?: string;
}

export interface NumberTickerProps {
  value: number;
  className?: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export interface LampEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export interface MovingBorderProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export interface BackgroundBeamsProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}
```

---

## Light Theme Adaptation

Three effects are designed for dark backgrounds and need adaptation for light themes:

### BackgroundBeams on Light Backgrounds
BackgroundBeams uses light-colored SVG strokes that are invisible on light backgrounds. For light themes:
- **Option A (preferred):** Skip BackgroundBeams entirely — use `gradient-blob` CSS for atmospheric depth instead
- **Option B:** Invert beam colors to dark strokes at very low opacity:
  ```tsx
  <BackgroundBeams primaryColor="#1a1a1a" secondaryColor="#333333" />
  ```
  And set SVG stroke opacity to 5-8% in the component

### Spotlight on Light Backgrounds
Spotlight's radial gradient wash is barely visible on light backgrounds:
- **Option A (preferred):** Use CSS `radial-gradient` in the section background instead
- **Option B:** Increase fill opacity to 15-20% and use a darker primary shade:
  ```tsx
  <Spotlight fill="#8B7355" /> {/* with container opacity-20 */}
  ```

### LampEffect on Light Backgrounds
LampEffect's conic gradient cone uses a white mask that clashes with light backgrounds:
- **Option A (preferred):** Replace with a simple gradient blob above the heading
- **Option B:** Invert the mask to use the bg color and make the cone use `var(--color-primary)` at 10% opacity

**Rule of thumb:** If the archetype has a light background (Wellness Clean, Glam Beauty, Elegant Events, Luxury Minimal, Warm Local), prefer **Option A** (skip the effect, use a simpler alternative). The archetype's Tool Configuration Presets specify this.

---

## Reduced Motion Support

All effects should respect `prefers-reduced-motion`. Add this check at the top of any animated component:

```tsx
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

| Component | Reduced Motion Behavior |
|-----------|------------------------|
| SparklesCore | Stop `requestAnimationFrame` loop — render static particles |
| Spotlight | Disable mouse tracking — show static gradient |
| ThreeDCard | Disable tilt — render as flat card |
| BorderBeam | Stop CSS animation — show static border |
| ShimmerButton | Stop shimmer sweep — show solid button |
| NumberTicker | Skip animation — show final number immediately |
| LampEffect | Skip entrance animation — show static cone |
| MovingBorder | Stop CSS rotation — show static border |
| BackgroundBeams | Stop beam movement — show static beams |

**Implementation pattern:**
```tsx
if (prefersReducedMotion) {
  // Render static version — no animation, no rAF
  return <div className={className}>{children}</div>;
}
// Otherwise, render animated version
```

---

## Mobile Density Reduction

SparklesCore and other canvas/particle effects should auto-reduce on mobile:

```tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const effectiveDensity = isMobile ? Math.min(particleDensity, 30) : particleDensity;
const effectiveSpeed = isMobile ? speed * 0.7 : speed;
```

Apply this pattern to SparklesCore's `initParticles` and any other performance-heavy effect.

---

## Effects Catalog

### 1. SparklesCore — Canvas Particle Background

Floating, twinkling particles on a `<canvas>`. Lightweight alternative to tsparticles (~0 DOM nodes).

**Use for:** Hero, full-page backgrounds, behind headings.

**Adapt per project:** `particleColor` to primary, `particleDensity` and `speed` to brand energy (calm wellness = 40/0.2, energetic tech = 100/0.6).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | string | `'transparent'` | Canvas background color |
| `particleColor` | string | — | Particle fill color (use project primary) |
| `particleDensity` | number | `80` | Particle count multiplier |
| `minSize` | number | `0.6` | Smallest particle radius |
| `maxSize` | number | `1.8` | Largest particle radius |
| `speed` | number | `0.4` | Movement speed |

**Performance:** Canvas-based, GPU-friendly. Reduce `particleDensity` to 30 on mobile. Add `IntersectionObserver` to pause the animation loop when off-screen — this prevents wasted frames on long pages with multiple SparklesCore instances.

```jsx
import { useRef, useEffect, useCallback } from 'react';

export const SparklesCore = ({
  className = '',
  background = 'transparent',
  particleColor,
  particleDensity = 80,
  minSize = 0.6,
  maxSize = 1.8,
  speed = 0.4,
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animFrame = useRef(null);

  const initParticles = useCallback((canvas) => {
    const arr = [];
    const count = Math.floor((canvas.width * canvas.height) / (10000 / particleDensity * 100));
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: minSize + Math.random() * (maxSize - minSize),
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.6 + 0.2,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      });
    }
    return arr;
  }, [particleDensity, minSize, maxSize, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      particles.current = initParticles({ width: rect.width, height: rect.height });
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeDir * 0.003;

        if (p.opacity >= 0.8) p.fadeDir = -1;
        if (p.opacity <= 0.1) p.fadeDir = 1;

        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [initParticles, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background, pointerEvents: 'none' }}
    />
  );
};
```

---

### 2. Spotlight — Cursor-Following Light

A large, blurred radial gradient that tracks the mouse. Auto-disables on touch devices.

**Use for:** Hero, feature sections, dark-background areas.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fill` | string | — | Spotlight color (use project primary) |
| `className` | string | `''` | Additional classes |

**Performance:** Single DOM node, CSS transition only.

```jsx
import { useRef, useState, useEffect } from 'react';

export const Spotlight = ({ className = '', fill }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const handleMouse = (e) => {
      const container = containerRef.current?.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-15 blur-[100px] transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle, ${fill}40, transparent 70%)`,
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
```

---

### 3. ThreeDCard — Perspective Tilt on Hover

Any element gains 3D perspective tilt following the mouse. No color adaptation needed.

**Use for:** Product cards, feature cards, portfolio items, testimonials.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intensity` | number | `10` | Max tilt degrees (6-8 = subtle, 12+ = dramatic) |
| `className` | string | `''` | Wrapper classes |
| `children` | ReactNode | — | Card content |

**Performance:** Pure CSS transforms, GPU-composited. Uses direct DOM manipulation (no `useState`) to avoid React re-renders on every mousemove — critical when multiple ThreeDCards are on screen.

```jsx
import { useRef, useCallback } from 'react';

export const ThreeDCard = ({ children, className = '', intensity = 10 }) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform =
      `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transition: 'transform 0.3s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};
```

---

### 4. BorderBeam — Rotating Gradient Border

A conic gradient that spins around the card edge, creating a glowing beam.

**Use for:** Featured cards, pricing cards, CTAs needing extra attention.

**Requires:** `border-beam-spin` keyframe. Change `bg-pearl` inner background to match your project's `--color-bg`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number | `200` | Beam gradient size (% of card) |
| `duration` | number | `8` | Rotation speed in seconds |
| `colorFrom` | string | — | Start gradient color (project primary) |
| `colorTo` | string | — | End gradient color (project secondary) |

```jsx
export const BorderBeam = ({
  className = '',
  size = 200,
  duration = 8,
  colorFrom,
  colorTo,
  bgClass = 'bg-pearl',
}) => (
  <div className={`absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none ${className}`}>
    <div
      className="absolute inset-0"
      style={{
        background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
        width: `${size}%`,
        height: `${size}%`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: `border-beam-spin ${duration}s linear infinite`,
      }}
    />
    <div className={`absolute inset-[1.5px] rounded-[inherit] ${bgClass}`} />
  </div>
);
```

**Usage:**
```jsx
<div className="relative glass-card p-8 overflow-hidden">
  <BorderBeam size={300} duration={10} colorFrom="PRIMARY" colorTo="SECONDARY" bgClass="bg-pearl" />
  <div className="relative z-10">Card content</div>
</div>
```

---

### 5. ShimmerButton — Sweeping Light CTA

A button with a continuously sweeping light shimmer across its surface.

**Use for:** Primary CTA buttons only (hero, modals). Keep secondary/WhatsApp buttons as-is.

**Requires:** `shimmer-sweep` keyframe.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | string | `'var(--color-primary)'` | Button background (use CSS variable) |
| `shimmerColor` | string | `'rgba(255,255,255,0.15)'` | Shimmer highlight |
| `onClick` | function | — | Click handler |
| `className` | string | `''` | Button classes (add padding, font, etc.) |

```jsx
export const ShimmerButton = ({
  children,
  className = '',
  shimmerColor = 'rgba(255,255,255,0.15)',
  background = 'var(--color-primary)',
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden cursor-pointer ${className}`}
    style={{ background }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(110deg, transparent 33%, ${shimmerColor} 50%, transparent 67%)`,
        backgroundSize: '300% 100%',
        animation: 'shimmer-sweep 3s ease-in-out infinite',
      }}
    />
    <span className="relative z-10 flex items-center justify-center gap-3">
      {children}
    </span>
  </button>
);
```

---

### 6. NumberTicker — Animated Counter

A number that counts up from 0 when scrolled into view. Eased with cubic ease-out.

**Use for:** Stats sections, social proof, metrics.

**No color adaptation needed** — style via parent element classes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Target number |
| `suffix` | string | `''` | Text after number (`+`, `%`, ` min`) |
| `prefix` | string | `''` | Text before number (`$`, `₪`) |
| `duration` | number | `2` | Animation duration in seconds |
| `className` | string | `''` | Span classes |

**Performance:** `requestAnimationFrame` based, triggers once via Framer Motion `useInView`.

```jsx
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const NumberTicker = ({ value, suffix = '', prefix = '', duration = 2, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(end * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}{display.toLocaleString()}{suffix}
    </motion.span>
  );
};
```

---

### 7. LampEffect — Conic Light Cone

A spreading conic gradient "lamp" above a heading, creating a dramatic reveal on scroll.

**Use for:** About section headings, feature intros, any section needing a dramatic entrance.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | — | Lamp cone color (project primary hex) |
| `className` | string | `''` | Wrapper classes |
| `children` | ReactNode | — | Content below lamp |

**Performance:** Single animated `div` with CSS mask, GPU-composited.

```jsx
import { motion } from 'framer-motion';

export const LampEffect = ({ children, className = '', color }) => (
  <div className={`relative flex flex-col items-center ${className}`}>
    <div className="relative w-full flex justify-center overflow-hidden">
      <motion.div
        initial={{ width: '8rem', opacity: 0.5 }}
        whileInView={{ width: '24rem', opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-36 md:h-48"
        style={{
          background: `conic-gradient(from 90deg at 50% 0%, ${color}00, ${color}30 25%, ${color}60 50%, ${color}30 75%, ${color}00)`,
          maskImage: 'linear-gradient(to bottom, white, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)',
        }}
      />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative -mt-16 md:-mt-24"
    >
      {children}
    </motion.div>
  </div>
);
```

---

### 8. MovingBorder — Animated Conic Border

A continuously rotating conic gradient border around any element.

**Use for:** Product cards, testimonial cards, featured items.

**Requires:** `border-beam-spin` keyframe. Child must set its own background and border-radius.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderRadius` | string | `'20px'` | Border radius |
| `duration` | number | `6` | Rotation speed in seconds |
| `colorFrom` | string | — | Start gradient color (project primary) |
| `colorTo` | string | — | End gradient color (project secondary) |

```jsx
export const MovingBorder = ({
  children,
  className = '',
  borderRadius = '20px',
  duration = 6,
  colorFrom,
  colorTo,
}) => (
  <div
    className={`relative p-[2px] overflow-hidden ${className}`}
    style={{ borderRadius }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: `conic-gradient(from 0deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        animation: `border-beam-spin ${duration}s linear infinite`,
        borderRadius,
      }}
    />
    <div
      className="relative w-full h-full"
      style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
    >
      {children}
    </div>
  </div>
);
```

---

### 9. BackgroundBeams — SVG Light Beams

Subtle diagonal light beams as SVG lines with gradient strokes. No JS runtime cost.

**Use for:** Dark footer backgrounds, dark hero sections, any section needing depth.

**Adapt:** Replace SVG gradient `stopColor` values with project primary + secondary hex values.

```jsx
export const BackgroundBeams = ({ className = '', primaryColor, secondaryColor }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="beam-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
          <stop offset="50%" stopColor={primaryColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beam-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0" />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[15, 30, 45, 60, 75].map((x, i) => (
        <line
          key={`b1-${i}`}
          x1={`${x}%`} y1="-10%" x2={`${x + 20}%`} y2="110%"
          stroke="url(#beam-grad-1)" strokeWidth="1"
          style={{ animation: `beam-move ${8 + i * 2}s ease-in-out infinite alternate` }}
        />
      ))}
      {[20, 50, 80].map((x, i) => (
        <line
          key={`b2-${i}`}
          x1={`${x}%`} y1="-10%" x2={`${x - 15}%`} y2="110%"
          stroke="url(#beam-grad-2)" strokeWidth="0.5"
          style={{ animation: `beam-move ${10 + i * 3}s ease-in-out infinite alternate-reverse` }}
        />
      ))}
    </svg>
  </div>
);
```

---

## Section Recipes

Each recipe maps effects to a section type. These are **patterns**, not copy-paste — adapt content, colors, and structure to the project.

### Hero Recipe

```
SparklesCore + Spotlight + gradient blobs + blur entrance + ShimmerButton CTA
```

```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <SparklesCore particleColor="PRIMARY_HEX" particleDensity={60} speed={0.3} />
  <Spotlight fill="PRIMARY_HEX" />
  <div className="absolute inset-0 pointer-events-none">
    <div className="gradient-blob w-[500px] h-[500px] bg-primary/20 -top-32 -right-32" />
  </div>
  <div className="max-w-6xl mx-auto px-5 md:px-8 text-center relative z-10">
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
      <img src="/logo.png" className="animate-hero-blur" />
    </motion.div>
    <motion.h1>
      <span className="bg-gradient-to-l from-primary to-primary-light bg-clip-text text-transparent">
        Headline
      </span>
    </motion.h1>
    <ShimmerButton>CTA Text <ArrowLeft /></ShimmerButton>
  </div>
</section>
```

### Features / Why Recipe

```
ScrollReveal + glass-card + icon micro-animations (no heavy effects — contrast with hero)
```

```jsx
<ScrollReveal delay={i * 0.15}>
  <div className="glass-card p-8 text-center group">
    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10
         flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3>Title</h3>
    <p>Description</p>
  </div>
</ScrollReveal>
```

### Catalog / Product Card Recipe

```
ThreeDCard + BorderBeam + glassmorphism modal
```

```jsx
<ThreeDCard intensity={8}>
  <button className="relative glass-card p-8 overflow-hidden">
    <BorderBeam size={300} duration={10} colorFrom="PRIMARY_HEX" colorTo="SECONDARY_HEX" />
    <div className="relative z-10">
      <h3>Item name</h3>
      <span>Price</span>
    </div>
  </button>
</ThreeDCard>
```

### Stats Recipe

```
NumberTicker + glass-card row + ScrollReveal
```

```jsx
<ScrollReveal>
  <div className="glass-card p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    {stats.map(s => (
      <div key={s.label}>
        <div className="text-3xl font-black text-primary">
          <NumberTicker value={s.value} suffix={s.suffix} />
        </div>
        <p className="text-sm opacity-60">{s.label}</p>
      </div>
    ))}
  </div>
</ScrollReveal>
```

### About / Team Recipe

```
LampEffect + profile card + staggered philosophy cards
```

```jsx
<LampEffect color="PRIMARY_HEX">
  <div className="text-center mb-16">
    <span className="section-label">Label</span>
    <h2>
      <KineticText charClassName="bg-gradient-to-l from-primary to-primary-light bg-clip-text text-transparent">
        Heading
      </KineticText>
    </h2>
  </div>
</LampEffect>
<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
  <div className="lg:col-span-2">
    <ScrollReveal><div className="glass-card">Profile</div></ScrollReveal>
  </div>
  <div className="lg:col-span-3 space-y-4">
    {items.map((item, i) => (
      <ScrollReveal key={i} delay={i * 0.15}>
        <div className="glass-card-dark p-6">Philosophy card</div>
      </ScrollReveal>
    ))}
  </div>
</div>
```

### Shop / E-Commerce Recipe

```
MovingBorder + hover scale images + purchase CTA
```

```jsx
<MovingBorder borderRadius="20px" duration={8} colorFrom="PRIMARY_HEX" colorTo="SECONDARY_HEX">
  <div className="bg-white/60 backdrop-blur-xl rounded-[18px] overflow-hidden">
    <div className="aspect-square overflow-hidden">
      <img className="group-hover:scale-105 transition-transform duration-700" />
    </div>
    <div className="p-6 text-center">
      <h3>Product</h3>
      <span className="text-2xl font-black text-primary">Price</span>
      <a className="bg-primary text-white rounded-xl px-6 py-3">Purchase CTA</a>
    </div>
  </div>
</MovingBorder>
```

### Footer Recipe

```
BackgroundBeams + contact form + social links + back-to-top
```

```jsx
<footer className="relative bg-charcoal text-white overflow-hidden">
  <BackgroundBeams primaryColor="PRIMARY_HEX" secondaryColor="SECONDARY_HEX" />
  <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
    <div className="grid md:grid-cols-2 gap-12">
      <ScrollReveal>
        <form>Contact form</form>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div>Contact details + social icons + back-to-top</div>
      </ScrollReveal>
    </div>
  </div>
</footer>
```

### CTA Button Recipe

| Type | Component | Style |
|------|-----------|-------|
| Primary | `<ShimmerButton>` | Solid primary + shimmer sweep |
| Secondary | `<button>` | Outline border, transparent bg |
| WhatsApp | `<a>` | `bg-whatsapp` solid green + pulse animation |

All buttons: `min-h-[48px]`, `rounded-2xl`, `px-8 py-4`, `font-bold`.

---

## 14. DecorativeShapes — Dynamic Shape Particle System

Canvas-based decorative floating shapes. One component, 11 shape types, unlimited combinations. Each project picks shapes + colors that match its brand DNA.

**When to use:** Only when the brief or archetype calls for decorative floating elements. NOT every project needs this. The Design Blueprint decides IF decorative shapes appear, and WHICH shapes fit the brand.

| Industry fit | Suggested shapes | Notes |
|---|---|---|
| Boutique / Kids | `heart`, `star` | Playful, warm |
| Beauty / Glam | `sparkle`, `orb`, `petal` | Soft, glamorous |
| Wellness / Spa | `leaf`, `petal` | Organic, calm |
| Luxury / Events | `diamond`, `sparkle` | Elegant, slow |
| Tech / Agency | `hexagon`, `triangle` | Geometric, modern |
| Minimal / Professional | `ring`, `dot` | Subtle, clean |
| NOT appropriate | Corporate, legal, medical, news | Skip entirely |

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shapes` | `string[]` | `['orb']` | Shape types to randomly use (see registry below) |
| `palette` | `{r,g,b}[]` | — | Color palette derived from project `@theme` |
| `count` | number | `10` | Desktop count (mobile auto-halves) |
| `speed` | `'very-slow' \| 'slow' \| 'medium'` | `'slow'` | Movement speed preset |
| `rotation` | boolean | `false` | Whether shapes rotate over time |
| `className` | string | `''` | Wrapper classes |

### Available Shapes

`orb` `star` `sparkle` `heart` `leaf` `petal` `diamond` `hexagon` `triangle` `ring` `dot`

### Placement Rules (learned from real feedback)

| Rule | Guideline |
|------|-----------|
| Max sections | 2 per page — never blanket every section |
| Desktop count | 8-12 (10 sweet spot) |
| Mobile count | 4-6 (auto-halved) |
| Speed | Start with `'slow'` or `'very-slow'` — designers consistently request slower |
| On light bg | Use brand primary colors with moderate opacity |
| On dark bg | Use lighter/white-ish palette with subtle opacity |

**Performance:** Canvas-based, `IntersectionObserver` pauses off-screen, debounced resize, capped `devicePixelRatio` at 2.

```jsx
import { useRef, useEffect, useCallback } from 'react';

// ─── Speed Presets ───
const SPEED_PRESETS = {
  'very-slow': { vx: 0.03, vy: [0.015, 0.03], ws: [0.08, 0.15], wa: [0.05, 0.1], rs: [0.001, 0.003] },
  'slow':      { vx: 0.06, vy: [0.025, 0.05], ws: [0.12, 0.25], wa: [0.08, 0.18], rs: [0.002, 0.006] },
  'medium':    { vx: 0.12, vy: [0.05, 0.09],  ws: [0.2, 0.4],   wa: [0.12, 0.25], rs: [0.004, 0.01] },
};

const rand = (min, max) => min + Math.random() * (max - min);

// ─── Shape Draw Functions ───
// Each receives (ctx, size) with ctx already translated+rotated to particle center.
const drawStar = (ctx, s) => {
  const spikes = 5, outer = s, inner = s * 0.4;
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i / spikes) - Math.PI / 2;
    ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * r, Math.sin(a) * r);
  }
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

const drawHeart = (ctx, s) => {
  const t = s * 0.6;
  ctx.beginPath();
  ctx.moveTo(0, t * 0.35);
  ctx.bezierCurveTo(-t, -t * 0.1, -t * 0.6, -t, 0, -t * 0.35);
  ctx.bezierCurveTo(t * 0.6, -t, t, -t * 0.1, 0, t * 0.35);
  ctx.closePath();
};

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

const drawDiamond = (ctx, s) => {
  const h = s * 0.9, w = s * 0.55;
  ctx.beginPath();
  ctx.moveTo(0, -h); ctx.lineTo(w, 0); ctx.lineTo(0, h); ctx.lineTo(-w, 0);
  ctx.closePath();
};

const drawHexagon = (ctx, s) => {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI * 2 * i / 6) - Math.PI / 6;
    ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * s * 0.7, Math.sin(a) * s * 0.7);
  }
  ctx.closePath();
};

const drawTriangle = (ctx, s) => {
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.8); ctx.lineTo(s * 0.7, s * 0.5); ctx.lineTo(-s * 0.7, s * 0.5);
  ctx.closePath();
};

const drawRing = (ctx, s) => { ctx.beginPath(); ctx.arc(0, 0, s * 0.55, 0, Math.PI * 2); };
const drawDot = (ctx, s) => { ctx.beginPath(); ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2); };

const SHAPE_REGISTRY = {
  orb: null, star: drawStar, sparkle: drawSparkle, heart: drawHeart,
  leaf: drawLeaf, petal: drawPetal, diamond: drawDiamond, hexagon: drawHexagon,
  triangle: drawTriangle, ring: drawRing, dot: drawDot,
};

// ─── Component ───
export const DecorativeShapes = ({
  shapes = ['orb'],
  palette = [{ r: 130, g: 80, b: 170 }, { r: 90, g: 50, b: 120 }],
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
        } else if (p.shape === 'ring') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          drawRing(ctx, p.size);
          ctx.strokeStyle = `rgba(${r},${g},${b},${p.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
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
```

### Usage Examples

**Boutique kids — hearts + stars:**
```tsx
<DecorativeShapes
  shapes={['heart', 'star']}
  palette={[{ r: 180, g: 100, b: 200 }, { r: 230, g: 150, b: 180 }, { r: 255, g: 200, b: 80 }]}
  count={10}
  speed="slow"
/>
```

**Luxury events — diamonds + sparkles:**
```tsx
<DecorativeShapes
  shapes={['diamond', 'sparkle']}
  palette={[{ r: 200, g: 170, b: 100 }, { r: 180, g: 160, b: 120 }]}
  count={8}
  speed="very-slow"
  rotation
/>
```

**Wellness spa — leaves + petals:**
```tsx
<DecorativeShapes
  shapes={['leaf', 'petal']}
  palette={[{ r: 80, g: 160, b: 100 }, { r: 180, g: 140, b: 100 }]}
  count={10}
  speed="very-slow"
  rotation
/>
```

**Tech agency — hexagons + triangles:**
```tsx
<DecorativeShapes
  shapes={['hexagon', 'triangle']}
  palette={[{ r: 60, g: 140, b: 255 }, { r: 100, g: 200, b: 255 }]}
  count={12}
  speed="slow"
  rotation
/>
```

**Minimal professional — rings + dots:**
```tsx
<DecorativeShapes
  shapes={['ring', 'dot']}
  palette={[{ r: 160, g: 160, b: 180 }, { r: 120, g: 120, b: 150 }]}
  count={14}
  speed="very-slow"
/>
```

**Backward compatible — orbs only (replaces old FloatingOrbs):**
```tsx
<DecorativeShapes
  shapes={['orb']}
  palette={[{ r: 130, g: 80, b: 170 }, { r: 90, g: 50, b: 120 }]}
  count={10}
  speed="slow"
/>
```

---

## 15. Liquid Glass CSS — Vibrant Glass Effect Without Libraries

CSS-only glass effect that preserves full-opacity backgrounds while adding glass-like shine, reflections, and animated gleam. Use this instead of third-party glass libraries.

**Use for:** CTA banners, cards with brand colors, navigation buttons, featured elements — when the project's aesthetic calls for glass/glossy finishes (boutique, luxury, beauty, events, high-end agencies). NOT every project needs liquid glass — minimalist, editorial, corporate, and clean archetypes should use flat or subtle shadow-based treatments instead. The Design Blueprint decides if liquid glass appears at all.

**NEVER use `liquid-glass-react` or similar SVG-filter-based glass libraries** — they wrap content in SVG filter containers that break flex/grid layouts, especially in navbars and inline elements. They also tend to require React 19+ and add 50kb+ to the bundle.

### CSS Classes

Add to `src/index.css` after the `@theme` block:

```css
@keyframes glass-gleam {
  0% { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(200%) skewX(-15deg); }
}

.liquid-glass-dark {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.3),
    inset 0 -1px 2px rgba(0, 0, 0, 0.15),
    0 4px 20px rgba(0, 0, 0, 0.15);
}
.liquid-glass-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.12) 45%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.12) 55%,
    transparent 60%
  );
  animation: glass-gleam 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
.liquid-glass-dark::after {
  content: '';
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  width: 50%;
  height: 30%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 60%
  );
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
}

.liquid-glass-light {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(0, 0, 0, 0.05),
    0 2px 12px rgba(0, 0, 0, 0.08);
}
.liquid-glass-light::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.2) 45%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0.2) 55%,
    transparent 60%
  );
  animation: glass-gleam 5s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
```

### Usage

**Critical rule:** Always set a FULL-OPACITY background on the element. The glass effect adds shine ON TOP of the solid background. Semi-transparent backgrounds will look washed out.

```tsx
{/* CTA Banner — dark glass over vibrant gradient */}
<div className="liquid-glass-dark bg-gradient-to-r from-cta via-primary to-cta rounded-2xl p-8">
  <span className="relative z-10">CTA content here</span>
</div>

{/* Light button — glass over white */}
<a className="liquid-glass-light bg-white rounded-full px-8 py-3">
  <span className="relative z-10 text-primary font-bold">Button text</span>
</a>
```

### When NOT to Use Liquid Glass CSS Classes

The `::before`/`::after` pseudo-elements can clip or overflow on small or circular elements. For these, use **inline styles** instead:

```tsx
{/* Small circular node or pill — inline glass */}
<div
  className="w-12 h-12 rounded-full"
  style={{
    background: 'linear-gradient(135deg, var(--color-cta), var(--color-primary))',
    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
  }}
/>

{/* Filter tab / pill button — inline glass */}
<button
  style={{
    background: 'linear-gradient(135deg, var(--color-cta), var(--color-primary))',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.25)',
  }}
>
  Tab label
</button>
```

---

## Brand Energy Guide

Adjust effect intensity based on the brand personality. Archetype Tool Configuration Presets override these defaults.

| Brand type | Particle density | Speed | Tilt intensity | Animation duration |
|------------|-----------------|-------|---------------|-------------------|
| Calm (wellness, spa, yoga) | 40-60 | 0.2-0.3 | 6-8 | 8-12s |
| Professional (law, finance, consulting) | 30-50 | 0.2-0.3 | 6 | 10-14s |
| Energetic (fitness, tech, gaming) | 80-120 | 0.5-0.7 | 10-14 | 4-6s |
| Playful (kids, pets, food) | 60-80 | 0.4-0.5 | 8-10 | 6-8s |
| Luxury (fashion, jewelry, real estate) | 40-60 | 0.15-0.25 | 6-8 | 10-16s |

---

## Additional Effects

### 10. NoiseOverlay — Grain Texture Layer

Subtle grain/noise texture overlay for depth and tactile feel. Pure CSS — no JS runtime.

**Use for:** Luxury, editorial, boutique — adds film-like texture. Layer on top of any section.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `opacity` | number | `0.03` | Grain visibility (0.02-0.08) |
| `blendMode` | string | `'overlay'` | CSS mix-blend-mode |

```tsx
export interface NoiseOverlayProps {
  opacity?: number;
  blendMode?: string;
  className?: string;
}

export const NoiseOverlay = ({
  opacity = 0.03,
  blendMode = 'overlay',
  className = '',
}: NoiseOverlayProps) => (
  <div
    className={`pointer-events-none absolute inset-0 z-10 ${className}`}
    style={{
      opacity,
      mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'],
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);
```

**Usage:** Place inside any section with `position: relative`:
```tsx
<section className="relative ...">
  <NoiseOverlay opacity={0.04} />
  {/* section content */}
</section>
```

### 11. GradientMesh — Animated Gradient Orbs

Modern gradient mesh background using multiple animated CSS radial gradients. More sophisticated than simple gradient blobs.

**Use for:** Hero backgrounds, section atmospheres — works on both light and dark themes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | string[] | — | 3-4 gradient colors from project palette |
| `speed` | number | `15` | Animation duration in seconds per cycle |
| `className` | string | `''` | Additional classes |

```tsx
export interface GradientMeshProps {
  colors: string[];
  speed?: number;
  className?: string;
}

export const GradientMesh = ({
  colors,
  speed = 15,
  className = '',
}: GradientMeshProps) => (
  <div
    className={`absolute inset-0 overflow-hidden -z-10 ${className}`}
    style={{
      background: `
        radial-gradient(ellipse 80% 60% at 20% 30%, ${colors[0]}30 0%, transparent 70%),
        radial-gradient(ellipse 60% 80% at 80% 20%, ${colors[1]}25 0%, transparent 70%),
        radial-gradient(ellipse 70% 50% at 50% 80%, ${colors[2] || colors[0]}20 0%, transparent 70%)
        ${colors[3] ? `, radial-gradient(ellipse 50% 70% at 70% 60%, ${colors[3]}15 0%, transparent 70%)` : ''}
      `,
      animation: `gradient-mesh-shift ${speed}s ease-in-out infinite alternate`,
    }}
  />
);
```

**Required CSS keyframe:**
```css
@keyframes gradient-mesh-shift {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(3deg); }
  100% { transform: scale(1) rotate(-3deg); }
}
```

### 12. GlowPulse — Pulsing Glow Effect

Animated glow ring for badges, CTAs, notifications, or status indicators.

**Use for:** "New" badges, live indicators, highlighted CTAs, featured pricing cards.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | — | Glow color (use primary/CTA) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Glow spread size |
| `children` | ReactNode | — | Content to wrap |

```tsx
export interface GlowPulseProps {
  color: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const glowSizeMap = { sm: '4px', md: '8px', lg: '16px' };

export const GlowPulse = ({
  color,
  size = 'md',
  children,
  className = '',
}: GlowPulseProps) => (
  <div
    className={`relative inline-flex ${className}`}
    style={{
      animation: 'glow-pulse 2s ease-in-out infinite',
      '--glow-size': glowSizeMap[size],
      '--glow-color': `${color}66`,
    } as React.CSSProperties}
  >
    {children}
  </div>
);
```

**Required CSS keyframe:**
```css
@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 var(--glow-size) var(--glow-color)); }
  50% { filter: drop-shadow(0 0 calc(var(--glow-size) * 2.5) var(--glow-color)); }
}
```

### 13. BeforeAfterSlider — Comparison Slider

Drag-to-compare slider for before/after images. Touch-friendly with pointer events.

**Use for:** Beauty, fitness, renovation, design — any transformation showcase.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `beforeImage` | string | — | Before image URL |
| `afterImage` | string | — | After image URL |
| `beforeLabel` | string | `'לפני'` | Before label text |
| `afterLabel` | string | `'אחרי'` | After label text |

```tsx
import { useState, useRef, useCallback } from 'react';

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = 'לפני',
  afterLabel = 'אחרי',
  className = '',
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPosition(x * 100);
  }, []);

  const onPointerDown = useCallback(() => { dragging.current = true; }, []);
  const onPointerUp = useCallback(() => { dragging.current = false; }, []);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl select-none cursor-col-resize aspect-[4/3] ${className}`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerMove={onPointerMove}
      onClick={(e) => updatePosition(e.clientX)}
    >
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${containerRef.current?.offsetWidth || 9999}px`, maxWidth: 'none' }}
          loading="lazy"
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <path d="M13 4L17 10L13 16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <span className="absolute top-4 start-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-20">
        {beforeLabel}
      </span>
      <span className="absolute top-4 end-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-20">
        {afterLabel}
      </span>
    </div>
  );
};
```
