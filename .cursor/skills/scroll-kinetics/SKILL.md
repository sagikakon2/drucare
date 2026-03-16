---
name: scroll-kinetics
description: Scroll-driven kinetic UI effects for landing pages — infinite marquees, scroll-direction-aware tickers, flowing background text, parallax text layers, and splash loaders. Each effect is a self-contained pattern with full source code. Dependencies are only react + framer-motion + gsap (already in every project). Read this skill when building sections that need motion, movement, or kinetic energy.
---

# Scroll Kinetics — Motion & Movement Catalog

Each effect below is a **pattern** — full source code you adapt per project. Replace color values, speeds, fonts, and content to match the project's `@theme` variables and brand energy.

**Dependencies:** `react`, `framer-motion`, `gsap` (already in every project), `react-fast-marquee` (install per project: `npm install react-fast-marquee`).

**Where to place:** Create `src/components/kinetics/` in the client project, one file per effect. Hooks go in `src/hooks/`.

---

## Required CSS Keyframes

Add these to `src/index.css` after the `@theme` block. Only include keyframes for effects you actually use.

```css
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-scroll-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

@keyframes splash-fade-out {
  0% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
}
```

---

## Color & Font Adaptation Rule

Kinetic effects are text-heavy — fonts and colors matter more than in particle effects.

| Effect prop | Map to project variable |
|---|---|
| `textColor` (marquee) | `--color-text` or `--color-primary` hex value |
| `strokeColor` (outlined text) | `--color-primary` hex value |
| `bgColor` (flowing bg) | `--color-primary` at 5-10% opacity |
| `fontFamily` (display text) | Project heading font or decorative display font |
| `fontSize` (flowing bg) | `clamp(4rem, 10vw, 10rem)` — always fluid |
| `gradient` (parallax) | Primary → Secondary gradient |

---

## Light Theme Adaptation

Most examples below use dark-theme classes (`border-white/10`, `text-white/20`). For light themes, swap these:

| Dark Theme | Light Theme |
|-----------|-------------|
| `border-white/10` | `border-black/5` |
| `text-white/20` | `text-text-muted/30` |
| `opacity-20` (on light text) | `opacity-10` (on dark text) |
| `bg-black` (SplashLoader) | `bg-bg` |

**Rule:** On light backgrounds, kinetic text should be DARKER than the background but at LOW opacity. On dark backgrounds, kinetic text should be LIGHTER at low opacity.

---

## Reduced Motion Support

All kinetic effects should respect `prefers-reduced-motion`:

```tsx
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

| Component | Reduced Motion Behavior |
|-----------|------------------------|
| InfiniteMarquee | Stop CSS animation — show static text row |
| ScrollMarquee | Same — static row |
| FlowingBackground | Hide entirely or show static text |
| ParallaxText | Show static centered text, no movement |
| SplashLoader | Skip animation — fade directly to content |
| MarqueeStack | Stop animations — show static tag grid |

---

## Hooks

### useScrollDirection — Detect Up/Down Scroll

Returns `"up"` or `"down"` based on scroll direction. Debounced via threshold to avoid jitter.

**Use for:** Reversing marquee direction, showing/hiding sticky navbars, directional animations.

| Option | Type | Default | Description |
|---|---|---|---|
| `threshold` | number | `10` | Minimum px scrolled to trigger direction change |

**Performance:** Single scroll listener, no RAF, minimal re-renders via state diff.

```tsx
import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down';

export const useScrollDirection = (threshold = 10): ScrollDirection => {
  const [direction, setDirection] = useState<ScrollDirection>('down');
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastY.current;

        if (Math.abs(diff) >= threshold) {
          setDirection(diff > 0 ? 'down' : 'up');
          lastY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
};
```

---

### useScrollSpeed — Detect Scroll Velocity

Returns a normalized scroll speed value (0-1). Useful for dynamically scaling animation speeds.

**Use for:** Speeding up marquees while scrolling, stretching/squashing elements based on velocity.

```tsx
import { useState, useEffect, useRef } from 'react';

export const useScrollSpeed = (smoothing = 0.1): number => {
  const [speed, setSpeed] = useState(0);
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());
  const currentSpeed = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const dy = Math.abs(window.scrollY - lastY.current);
        const raw = Math.min(dy / dt, 1);
        currentSpeed.current += (raw - currentSpeed.current) * smoothing;
        setSpeed(currentSpeed.current);
        lastY.current = window.scrollY;
        lastTime.current = now;
      }
      raf.current = requestAnimationFrame(update);
    };

    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current);
  }, [smoothing]);

  return speed;
};
```

---

## Effects Catalog

### 1. InfiniteMarquee — Looping Text Ticker

Infinite horizontally scrolling content with `autoFill` — the library automatically fills the entire viewport width and loops seamlessly. No gaps, ever.

**Use for:** Ticker bars, client logos, tag clouds, decorative text between sections.

**Adapt per project:** `speed` to brand energy (calm = 30-40, energetic = 15-20), `gap` to content density.

**IMPORTANT — Use `react-fast-marquee`:** Our previous custom CSS marquee (`translateX(-50%)` with 2 copies) fails when the content is shorter than the viewport width, creating visible gaps where text disappears. The `react-fast-marquee` library with `autoFill` solves this definitively by measuring content width and duplicating as needed. Install it in every project: `npm install react-fast-marquee`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | ReactNode | — | Content to repeat (text, icons, tags) |
| `speed` | number | `40` | Pixels per second (higher = faster) |
| `direction` | `'left'` \| `'right'` | `'left'` | Scroll direction |
| `pauseOnHover` | boolean | `true` | Pause animation on mouse hover |
| `gap` | string | `'2rem'` | Gap between repeated items |
| `className` | string | `''` | Wrapper classes |

**Performance:** CSS animation under the hood, GPU-composited. `autoFill` measures once on mount + resize.

**RTL Note:** Wrap with `dir="ltr"` + `unicodeBidi: 'isolate'` on the outer container. Inner content uses `dir="rtl"` to keep Hebrew text readable.

```tsx
import FastMarquee from 'react-fast-marquee';

export const InfiniteMarquee = ({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  gap = '2rem',
  className = '',
}) => (
  <div dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }} className={className}>
    <FastMarquee
      speed={speed}
      gradient={false}
      pauseOnHover={pauseOnHover}
      autoFill
      direction={direction}
    >
      <span className="flex items-center" style={{ gap, paddingInlineEnd: gap }} dir="rtl">
        {children}
      </span>
    </FastMarquee>
  </div>
);
```

**Usage — Text ticker:**
```tsx
<InfiniteMarquee speed={20} className="py-4 bg-primary/5 text-sm tracking-widest uppercase">
  <span>DESIGN</span> <span className="opacity-30">*</span>
  <span>DEVELOP</span> <span className="opacity-30">*</span>
  <span>DEPLOY</span> <span className="opacity-30">*</span>
  <span>DELIVER</span> <span className="opacity-30">*</span>
</InfiniteMarquee>
```

**Usage — Logo bar:**
```tsx
<InfiniteMarquee speed={35} gap="4rem" className="py-8">
  {logos.map(logo => (
    <img key={logo.name} src={logo.src} alt={logo.name}
      className="h-8 opacity-40 hover:opacity-100 transition-opacity" />
  ))}
</InfiniteMarquee>
```

---

### 2. ScrollMarquee — Direction-Aware Ticker

Extends InfiniteMarquee with scroll-direction awareness — reverses when user scrolls up. Creates a "connected to scroll" feeling like jy-contents.com.

**Use for:** Section dividers, tag tickers, decorative elements that feel alive.

**Adapt per project:** Same props as InfiniteMarquee, plus scroll sensitivity.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | ReactNode | — | Content to repeat |
| `speed` | number | `25` | Base animation duration in seconds |
| `pauseOnHover` | boolean | `true` | Pause on hover |
| `gap` | string | `'2rem'` | Gap between items |
| `className` | string | `''` | Wrapper classes |

**Performance:** One scroll listener (shared via hook), CSS animation direction swap. No layout thrash.

```tsx
import { type ReactNode, useMemo } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';

interface ScrollMarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  gap?: string;
  className?: string;
}

export const ScrollMarquee = ({
  children,
  speed = 25,
  pauseOnHover = true,
  gap = '2rem',
  className = '',
}: ScrollMarqueeProps) => {
  const scrollDir = useScrollDirection();

  const animationName = useMemo(
    () => (scrollDir === 'down' ? 'marquee-scroll' : 'marquee-scroll-reverse'),
    [scrollDir]
  );

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
    >
      <div
        className={`flex w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          gap,
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>{children}</div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>{children}</div>
      </div>
    </div>
  );
};
```

**Usage — Tag cloud that reverses on scroll:**
```tsx
<ScrollMarquee speed={30} gap="1.5rem" className="py-6">
  {tags.map(tag => (
    <span key={tag} className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
      #{tag}
    </span>
  ))}
</ScrollMarquee>
```

---

### 3. FlowingBackground — Large Decorative Background Text

Oversized, semi-transparent text flowing behind section content. Creates depth and editorial feel.

**Use for:** Behind section headings, hero backgrounds, ranking sections, any area needing editorial weight.

**Adapt per project:** `text` to brand keywords, `fontSize` to section scale, `opacity` to subtlety needs.

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | string | — | Text to display (brand name, keyword, section title) |
| `speed` | number | `40` | Animation duration in seconds |
| `direction` | `'left'` \| `'right'` | `'left'` | Flow direction |
| `fontSize` | string | `'clamp(4rem, 10vw, 10rem)'` | Font size (always use clamp) |
| `fontFamily` | string | `'inherit'` | Display font (use decorative heading font) |
| `opacity` | number | `0.04` | Text opacity (0.03-0.08 for subtle, 0.1-0.15 for bold) |
| `outlined` | boolean | `false` | Stroke-only text (no fill) |
| `strokeColor` | string | `'currentColor'` | Stroke color when outlined |
| `repeat` | number | `6` | How many times to repeat the text |
| `className` | string | `''` | Wrapper classes |

**Performance:** Pure CSS animation. Outlined variant uses `WebkitTextStroke` — no SVG overhead.

```tsx
interface FlowingBackgroundProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  fontSize?: string;
  fontFamily?: string;
  opacity?: number;
  outlined?: boolean;
  strokeColor?: string;
  repeat?: number;
  className?: string;
}

export const FlowingBackground = ({
  text,
  speed = 40,
  direction = 'left',
  fontSize = 'clamp(4rem, 10vw, 10rem)',
  fontFamily = 'inherit',
  opacity = 0.04,
  outlined = false,
  strokeColor = 'currentColor',
  repeat = 6,
  className = '',
}: FlowingBackgroundProps) => {
  const repeatedText = Array.from({ length: repeat }, () => text).join(' \u00A0\u00A0\u00A0 ');
  const animationName = direction === 'left' ? 'marquee-scroll' : 'marquee-scroll-reverse';

  const textStyle: React.CSSProperties = {
    fontSize,
    fontFamily,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    ...(outlined
      ? {
          color: 'transparent',
          WebkitTextStroke: `1px ${strokeColor}`,
        }
      : {}),
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <div className="absolute inset-0 flex items-center">
        <div
          className="flex w-max"
          style={{ animation: `${animationName} ${speed}s linear infinite` }}
        >
          <span className="shrink-0 font-black uppercase tracking-wider" style={textStyle}>
            {repeatedText}
          </span>
          <span className="shrink-0 font-black uppercase tracking-wider" style={textStyle} aria-hidden>
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
};
```

**Usage — Brand name behind hero:**
```tsx
<section className="relative min-h-screen">
  <FlowingBackground
    text="STUDIO"
    speed={50}
    fontSize="clamp(5rem, 15vw, 14rem)"
    opacity={0.03}
    fontFamily="'DM Sans', sans-serif"
  />
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</section>
```

**Usage — Outlined text behind section:**
```tsx
<section className="relative py-24">
  <FlowingBackground
    text="CREATIVE"
    speed={35}
    direction="right"
    outlined
    strokeColor="var(--color-primary)"
    opacity={0.08}
  />
  <div className="relative z-10">
    {/* Section content */}
  </div>
</section>
```

**Usage — Multi-layer depth (like jy-contents.com):**
```tsx
<section className="relative py-24 overflow-hidden">
  <FlowingBackground text="DESIGN" speed={50} opacity={0.02} fontSize="clamp(6rem, 14vw, 12rem)" />
  <FlowingBackground text="CREATE" speed={35} direction="right" opacity={0.04} fontSize="clamp(3rem, 8vw, 7rem)"
    className="top-1/3" />
  <div className="relative z-10">
    {/* Content sits above both layers */}
  </div>
</section>
```

---

### 4. ParallaxText — Scroll-Driven Text Movement

Text that moves horizontally as the user scrolls, creating a parallax skew effect. Uses GSAP ScrollTrigger for buttery performance.

**Use for:** Section dividers, between-section decorative strips, section intros.

**Adapt per project:** `baseVelocity` to brand energy, colors to theme.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | string | — | Text content |
| `baseVelocity` | number | `3` | Movement speed multiplier (negative = left, positive = right) |
| `fontSize` | string | `'clamp(2rem, 6vw, 5rem)'` | Font size |
| `className` | string | `''` | Text style classes (gradient, color, weight) |

**Performance:** GSAP ScrollTrigger with `scrub: true` — synced to scroll, GPU-composited.

```tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
  fontSize?: string;
  className?: string;
}

export const ParallaxText = ({
  children,
  baseVelocity = 3,
  fontSize = 'clamp(2rem, 6vw, 5rem)',
  className = '',
}: ParallaxTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        x: () => `${baseVelocity * 100}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, [baseVelocity]);

  const repeatedText = Array.from({ length: 8 }, () => children).join(' \u00A0\u00A0\u2022\u00A0\u00A0 ');

  return (
    <div ref={containerRef} className="overflow-hidden py-4">
      <div
        ref={innerRef}
        className={`whitespace-nowrap font-black uppercase tracking-wider ${className}`}
        style={{ fontSize, willChange: 'transform' }}
      >
        {repeatedText}
      </div>
    </div>
  );
};
```

**Usage — Single strip:**
```tsx
<ParallaxText baseVelocity={-3} className="text-primary/10">
  PREMIUM QUALITY
</ParallaxText>
```

**Usage — Opposing strips (cinema feel):**
```tsx
<div className="space-y-2 py-12">
  <ParallaxText baseVelocity={-3} className="text-primary/10">
    DESIGN
  </ParallaxText>
  <ParallaxText baseVelocity={5} className="text-secondary/10">
    CREATE
  </ParallaxText>
</div>
```

---

### 5. SplashLoader — Intro Loading Screen

Full-screen splash that plays once on first visit. Skipped on subsequent visits using `sessionStorage`. Fades out with a smooth transition.

**Use for:** Landing pages that need a dramatic intro. Adds perceived premium quality.

**Adapt per project:** Logo/text content, background color, animation style, display duration.

| Prop | Type | Default | Description |
|---|---|---|---|
| `duration` | number | `2500` | Display time in ms before fade-out starts |
| `fadeDuration` | number | `800` | Fade-out transition in ms |
| `bgColor` | string | `'#0a0a0a'` | Background color (match page bg) |
| `storageKey` | string | `'splash_shown'` | sessionStorage key |
| `children` | ReactNode | — | Logo, text, or animation to show |

**Performance:** Removed from DOM after fade completes. Uses `sessionStorage` (not `localStorage`) — splash returns per browser session.

```tsx
import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashLoaderProps {
  duration?: number;
  fadeDuration?: number;
  bgColor?: string;
  storageKey?: string;
  children: ReactNode;
}

export const SplashLoader = ({
  duration = 2500,
  fadeDuration = 800,
  bgColor = '#0a0a0a',
  storageKey = 'splash_shown',
  children,
}: SplashLoaderProps) => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem(storageKey);
  });

  useEffect(() => {
    if (!visible) return;

    document.body.style.overflow = 'hidden';
    sessionStorage.setItem(storageKey, '1');

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [visible, duration, storageKey]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeDuration / 1000, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

**Usage — Logo splash:**
```tsx
<SplashLoader duration={2500} bgColor="var(--color-bg)">
  <div className="text-center">
    <img src="/logo.svg" alt="Logo" className="w-24 h-24 mx-auto mb-4" />
    <p className="text-sm tracking-[0.3em] uppercase text-white/40">Loading</p>
  </div>
</SplashLoader>
```

**Usage — Animated text splash:**
```tsx
<SplashLoader duration={3000}>
  <h1 className="text-5xl md:text-7xl font-black tracking-tight">
    <motion.span
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="block bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent"
    >
      BRAND NAME
    </motion.span>
  </h1>
</SplashLoader>
```

---

### 6. MarqueeStack — Stacked Multi-Row Ticker

Multiple marquee rows with alternating directions and speeds. Creates a wall-of-text visual like jy-contents.com's tag sections.

**Use for:** Tag clouds, keyword walls, category displays, visual texture sections.

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `MarqueeRow[]` | — | Array of row configs |
| `className` | string | `''` | Wrapper classes |

Each row: `{ items: string[], speed: number, direction: 'left' | 'right', className?: string }`

```tsx
import { InfiniteMarquee } from './InfiniteMarquee';

interface MarqueeRow {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

interface MarqueeStackProps {
  rows: MarqueeRow[];
  className?: string;
}

export const MarqueeStack = ({ rows, className = '' }: MarqueeStackProps) => (
  <div className={`space-y-3 ${className}`}>
    {rows.map((row, i) => (
      <InfiniteMarquee
        key={i}
        speed={row.speed ?? 25 + i * 5}
        direction={row.direction ?? (i % 2 === 0 ? 'left' : 'right')}
        gap="1.5rem"
        className={row.className}
      >
        {row.items.map((item, j) => (
          <span key={j} className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium whitespace-nowrap">
            {item}
          </span>
        ))}
      </InfiniteMarquee>
    ))}
  </div>
);
```

**Usage:**
```tsx
<MarqueeStack
  className="py-12"
  rows={[
    { items: ['#React', '#TypeScript', '#Tailwind', '#GSAP', '#Framer'], speed: 20 },
    { items: ['#Design', '#Motion', '#3D', '#WebGL', '#Animation'], speed: 25 },
    { items: ['#UX', '#Mobile', '#Performance', '#RTL', '#A11y'], speed: 30, direction: 'left' },
  ]}
/>
```

---

## Section Recipes

Each recipe maps effects to a section type. These are **patterns**, not copy-paste — adapt content, colors, and structure to the project.

### Divider Strip Recipe

```
InfiniteMarquee between sections — breaks visual monotony
```

```tsx
<div className="border-y border-white/5">
  <InfiniteMarquee speed={20} gap="3rem" className="py-5 text-xs tracking-[0.3em] uppercase text-white/30">
    <span>DESIGN</span> <span className="text-primary">*</span>
    <span>CREATE</span> <span className="text-primary">*</span>
    <span>INSPIRE</span> <span className="text-primary">*</span>
    <span>BUILD</span> <span className="text-primary">*</span>
  </InfiniteMarquee>
</div>
```

### Hero Background Recipe

```
FlowingBackground + SplashLoader (optional) + main hero content
```

```tsx
<SplashLoader duration={2500}>
  <img src="/logo.svg" className="w-20 h-20" />
</SplashLoader>

<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <FlowingBackground
    text="BRAND"
    speed={50}
    fontSize="clamp(6rem, 15vw, 14rem)"
    opacity={0.03}
    fontFamily="'Your Display Font'"
  />
  <FlowingBackground
    text="STUDIO"
    speed={35}
    direction="right"
    outlined
    strokeColor="var(--color-primary)"
    opacity={0.06}
    fontSize="clamp(4rem, 10vw, 8rem)"
    className="top-2/3"
  />
  <div className="relative z-10 text-center max-w-6xl mx-auto px-5">
    {/* Hero text + CTA */}
  </div>
</section>
```

### Tag Cloud / Keywords Recipe

```
MarqueeStack or ScrollMarquee + FlowingBackground
```

```tsx
<section className="relative py-20 overflow-hidden">
  <FlowingBackground text="KEYWORDS" speed={60} opacity={0.02} />
  <div className="relative z-10">
    <ScrollMarquee speed={25} gap="1rem" className="mb-4">
      {tags.map(t => (
        <span key={t} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
          #{t}
        </span>
      ))}
    </ScrollMarquee>
    <ScrollMarquee speed={30} gap="1rem">
      {moreTags.map(t => (
        <span key={t} className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-sm">
          #{t}
        </span>
      ))}
    </ScrollMarquee>
  </div>
</section>
```

### Ranking / Showcase Separator Recipe

```
ParallaxText opposing strips between ranking cards
```

```tsx
<div className="py-8 overflow-hidden">
  <ParallaxText baseVelocity={-2} fontSize="clamp(2rem, 5vw, 4rem)" className="text-primary/5">
    TOP RATED
  </ParallaxText>
  <ParallaxText baseVelocity={3} fontSize="clamp(1.5rem, 4vw, 3rem)" className="text-secondary/5">
    BEST PICKS
  </ParallaxText>
</div>
```

### Full-Width Impact Statement Recipe

```
ParallaxText large single statement for maximum visual impact
```

```tsx
<section className="py-32 overflow-hidden">
  <ParallaxText baseVelocity={-1.5} fontSize="clamp(3rem, 8vw, 7rem)"
    className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
    WE CREATE AMAZING EXPERIENCES
  </ParallaxText>
</section>
```

---

## Combining with Other Skills

Scroll-kinetics effects are **lightweight decorative layers** — they combine freely with `premium-effects` and `3d-scenes`.

| Combination | When to use |
|---|---|
| `FlowingBackground` + `SparklesCore` | Hero section with particle foreground and text background |
| `InfiniteMarquee` + `BorderBeam` cards | Ticker strip above a card grid with glowing borders |
| `ScrollMarquee` + `LampEffect` | Reversing ticker under a lamp-lit heading |
| `ParallaxText` + `BackgroundBeams` | Moving text strips over dark beam background |
| `SplashLoader` + `3D scene` | Splash hides loading time for heavy WebGL scenes |
| `MarqueeStack` + `ThreeDCard` | Tag wall as backdrop for tilt-enabled cards |

**Rule:** Marquee/flowing effects go behind content (low z-index, low opacity). Premium effects go around content (borders, spotlights). Content sits on top.

---

## Brand Energy Guide

Adjust intensity based on brand personality:

| Brand type | Marquee speed | FlowingBg opacity | ParallaxText velocity | Splash duration |
|---|---|---|---|---|
| Calm (wellness, spa) | 35-50s | 0.02-0.03 | 1-2 | 3000ms |
| Professional (law, finance) | 30-40s | 0.02-0.04 | 1.5-2.5 | 2000ms |
| Energetic (fitness, tech) | 15-20s | 0.05-0.08 | 3-5 | 1500ms |
| Playful (kids, food) | 20-30s | 0.04-0.06 | 2-4 | 2000ms |
| Luxury (fashion, jewelry) | 40-60s | 0.02-0.03 | 1-2 | 3500ms |
| Editorial (blog, magazine) | 25-35s | 0.04-0.06 | 2-3 | 2000ms |

---

## RTL Considerations

- **InfiniteMarquee/ScrollMarquee:** Direction props work identically in RTL — CSS `translateX` is layout-direction agnostic.
- **FlowingBackground:** No RTL issues — decorative text is always LTR-display by convention.
- **ParallaxText:** Negative `baseVelocity` moves text start-ward (right in RTL), positive moves end-ward.
- **SplashLoader:** Fully RTL-compatible — centered content.
- **Hebrew text in marquees:** Use `whitespace-nowrap` and `word-break: keep-all` to prevent mid-word breaks.

---

## Mobile Strategy

| Effect | Mobile behavior |
|---|---|
| InfiniteMarquee | Keep as-is — lightweight, CSS-only |
| ScrollMarquee | Keep — adds engagement on touch scroll |
| FlowingBackground | Reduce opacity to 0.02, reduce fontSize |
| ParallaxText | Reduce `baseVelocity` by 50% |
| SplashLoader | Reduce `duration` by 30% (users are less patient on mobile) |
| MarqueeStack | Limit to 2-3 rows max on mobile |

```tsx
const isMobile = window.innerWidth < 768;
<FlowingBackground opacity={isMobile ? 0.02 : 0.05} fontSize={isMobile ? '4rem' : 'clamp(6rem, 15vw, 14rem)'} />
```
