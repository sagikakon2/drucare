---
name: section-templates
description: Reusable section templates for landing pages — navigation, hero variants, testimonials, pricing, contact forms, galleries, team, social proof, video, and maps. Each template is a pattern with full TypeScript source code, dark + light variants, RTL-ready. Read this skill when building any landing page section.
---

# Section Templates — Landing Page Building Blocks

Each template below is a **pattern** — full TypeScript source code you adapt per project. Replace colors, content, and layout to match the project's `@theme` variables, archetype, and client brief.

**Dependencies:** `react`, `framer-motion`, `gsap`, `@shadcn/ui` components (already in every project via build pipeline).

**Where to place:** Create components in `src/components/sections/` in the client project, one file per section.

**Integration with effects:** Each template has designated **effect slots** — clearly marked spots where you drop in components from `premium-effects`, `scroll-kinetics`, or `3d-scenes`. The template provides the layout; the effects provide the atmosphere.

---

## Theme Awareness

Every template supports both dark and light backgrounds. Use these utility classes:

| Element | Dark Background | Light Background |
|---------|----------------|-----------------|
| Heading | `text-white` | `text-text` |
| Body text | `text-white/70` | `text-text-muted` |
| Muted text | `text-white/50` | `text-text-muted/70` |
| Card bg | `bg-white/5 backdrop-blur-md` | `bg-card` |
| Card border | `border-white/10` | `border-black/5` |
| Section bg | `bg-bg` or `bg-bg-alt` | Same — theme colors handle it |

The archetype determines which theme applies. Pass variant where noted.

---

## 1. NavigationBar — Sticky Scroll-Aware Navigation

Fixed navigation that transitions from transparent (over hero) to solid on scroll. Mobile hamburger menu using shadcn Sheet.

**Use for:** Every landing page. Place above the hero.

**Adapt per project:** Logo, link labels, CTA text, colors from `@theme`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `ReactNode` | — | Logo component or image |
| `links` | `NavLink[]` | — | Navigation links with section IDs |
| `cta` | `{ label: string; href: string }` | — | Primary CTA button |
| `variant` | `'dark' \| 'light'` | `'light'` | Text color scheme for transparent state |

### TypeScript Interface

```tsx
interface NavLink {
  label: string;
  href: string;
}

interface NavigationBarProps {
  logo: React.ReactNode;
  links: NavLink[];
  cta?: { label: string; href: string };
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
import { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const NavigationBar = ({
  logo,
  links,
  cta,
  variant = 'light',
}: NavigationBarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const textClass = scrolled
    ? 'text-text'
    : variant === 'dark'
      ? 'text-white'
      : 'text-text';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="shrink-0">{logo}</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${textClass}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        {cta && (
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection(cta.href)}
              className="bg-cta text-cta-text hover:brightness-95 rounded-full px-6 min-h-[44px] cursor-pointer"
            >
              {cta.label}
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className={`p-2 cursor-pointer ${textClass}`}>
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="end" className="w-72 bg-bg p-6">
            <div className="flex flex-col gap-6 mt-8">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-start text-lg font-medium text-text hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              {cta && (
                <Button
                  onClick={() => scrollToSection(cta.href)}
                  className="bg-cta text-cta-text hover:brightness-95 rounded-full min-h-[48px] mt-4 cursor-pointer"
                >
                  {cta.label}
                  <ArrowLeft className="w-4 h-4 ms-2" />
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
```

### Usage

```tsx
<NavigationBar
  logo={<img src="/logo.svg" alt="Brand" className="h-8" />}
  links={[
    { label: 'שירותים', href: '#services' },
    { label: 'אודות', href: '#about' },
    { label: 'המלצות', href: '#testimonials' },
    { label: 'צור קשר', href: '#contact' },
  ]}
  cta={{ label: 'קביעת תור', href: '#contact' }}
  variant="light"
/>
```

### Mobile Notes
- Sheet slides from `end` (right in LTR, left in RTL) — correct for both directions
- Min tap target 44x44px on all interactive elements
- Links stack vertically with generous spacing

---

## 2. HeroSplit — Text + Image Side by Side

Two-column hero with text on one side and image/3D on the other. Flips automatically in RTL.

**Use for:** Service businesses, product showcases, portfolios with hero imagery.

**Effect slots:** `backgroundSlot` behind entire hero, image side can hold a 3D scene instead of `<img>`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Small colored label above heading |
| `heading` | `string` | — | Main heading text |
| `subheading` | `string` | — | Supporting paragraph |
| `primaryCta` | `CtaProps` | — | Primary CTA button |
| `secondaryCta` | `CtaProps` | — | Secondary CTA button |
| `media` | `ReactNode` | — | Image, video, or 3D scene |
| `reversed` | `boolean` | `false` | Swap text/media sides |
| `backgroundSlot` | `ReactNode` | — | Background effects (SparklesCore, gradient blobs) |
| `variant` | `'dark' \| 'light'` | `'light'` | Color scheme |

### TypeScript Interface

```tsx
interface CtaProps {
  label: string;
  href: string;
  onClick?: () => void;
}

interface HeroSplitProps {
  label?: string;
  heading: string;
  subheading?: string;
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  media: React.ReactNode;
  reversed?: boolean;
  backgroundSlot?: React.ReactNode;
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSplit = ({
  label,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  media,
  reversed = false,
  backgroundSlot,
  variant = 'light',
}: HeroSplitProps) => {
  const isDark = variant === 'dark';

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Effect slot — behind everything */}
      {backgroundSlot && (
        <div className="absolute inset-0 -z-10">{backgroundSlot}</div>
      )}

      <div
        className={`max-w-6xl mx-auto px-5 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24 lg:py-0 ${
          reversed ? 'lg:[direction:ltr]' : ''
        }`}
      >
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className={`flex flex-col gap-6 ${reversed ? 'lg:order-2' : ''}`}
        >
          {label && (
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase">
              {label}
            </span>
          )}

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide ${
              isDark ? 'text-white' : 'text-text'
            }`}
          >
            {heading}
          </h1>

          {subheading && (
            <p
              className={`text-lg md:text-xl leading-relaxed max-w-lg ${
                isDark ? 'text-white/70' : 'text-text-muted'
              }`}
            >
              {subheading}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-2">
            {primaryCta && (
              <Button
                onClick={primaryCta.onClick}
                className="bg-cta text-cta-text hover:brightness-95 rounded-full px-8 min-h-[48px] text-base cursor-pointer"
              >
                {primaryCta.label}
                <ArrowLeft className="w-4 h-4 ms-2" />
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant="outline"
                onClick={secondaryCta.onClick}
                className="rounded-full px-8 min-h-[48px] text-base cursor-pointer border-text-muted hover:border-primary"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Media Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className={`relative ${reversed ? 'lg:order-1' : ''}`}
        >
          {media}
        </motion.div>
      </div>
    </section>
  );
};
```

### Usage

```tsx
<HeroSplit
  label="סטודיו לפילאטיס"
  heading="תנועה שמשנה את החיים"
  subheading="שיעורי פילאטיס מקצועיים בסביבה שקטה ומזמינה"
  primaryCta={{ label: 'לשיעור ניסיון', href: '#contact' }}
  secondaryCta={{ label: 'לוח שיעורים', href: '#schedule' }}
  media={
    <img
      src="/hero.webp"
      alt="שיעור פילאטיס"
      className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
      loading="eager"
    />
  }
  backgroundSlot={<SparklesCore particleColor="#E0783F" particleDensity={20} speed={0.15} />}
/>
```

---

## 3. HeroCentered — Full-Width Centered Text

Centered hero with large heading, optional badge, and background effects. The most versatile hero layout.

**Use for:** SaaS, agencies, events, any bold statement.

**Effect slots:** `backgroundSlot` fills entire hero area — ideal for SparklesCore, BackgroundBeams, 3D scenes.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `badge` | `string` | — | Small pill badge above heading |
| `heading` | `string \| ReactNode` | — | Main heading (supports gradient text nodes) |
| `subheading` | `string` | — | Supporting paragraph |
| `primaryCta` | `CtaProps` | — | Primary CTA |
| `secondaryCta` | `CtaProps` | — | Secondary CTA |
| `backgroundSlot` | `ReactNode` | — | Background effects |
| `bottomSlot` | `ReactNode` | — | Content below CTAs (logos bar, stats, product image) |
| `variant` | `'dark' \| 'light'` | `'dark'` | Color scheme |
| `minHeight` | `string` | `'min-h-screen'` | Hero minimum height |

### TypeScript Interface

```tsx
interface HeroCenteredProps {
  badge?: string;
  heading: string | React.ReactNode;
  subheading?: string;
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  backgroundSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  variant?: 'dark' | 'light';
  minHeight?: string;
}
```

### Source

```tsx
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroCentered = ({
  badge,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  backgroundSlot,
  bottomSlot,
  variant = 'dark',
  minHeight = 'min-h-screen',
}: HeroCenteredProps) => {
  const isDark = variant === 'dark';

  return (
    <section className={`relative ${minHeight} flex flex-col items-center justify-center overflow-hidden px-5 md:px-8`}>
      {backgroundSlot && (
        <div className="absolute inset-0 -z-10">{backgroundSlot}</div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
      >
        {badge && (
          <span
            className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full ${
              isDark
                ? 'bg-white/10 text-white/80'
                : 'bg-primary/10 text-primary'
            }`}
          >
            {badge}
          </span>
        )}

        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide ${
            isDark ? 'text-white' : 'text-text'
          }`}
        >
          {heading}
        </h1>

        {subheading && (
          <p
            className={`text-lg md:text-xl max-w-2xl leading-relaxed ${
              isDark ? 'text-white/60' : 'text-text-muted'
            }`}
          >
            {subheading}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {primaryCta && (
            <Button
              onClick={primaryCta.onClick}
              className="bg-cta text-cta-text hover:brightness-95 rounded-full px-8 min-h-[48px] text-base cursor-pointer"
            >
              {primaryCta.label}
              <ArrowLeft className="w-4 h-4 ms-2" />
            </Button>
          )}
          {secondaryCta && (
            <Button
              variant="outline"
              onClick={secondaryCta.onClick}
              className={`rounded-full px-8 min-h-[48px] text-base cursor-pointer ${
                isDark
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-text-muted hover:border-primary'
              }`}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </motion.div>

      {bottomSlot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full max-w-5xl mx-auto"
        >
          {bottomSlot}
        </motion.div>
      )}
    </section>
  );
};
```

### Usage

```tsx
<HeroCentered
  badge="הסוכנות הדיגיטלית המובילה"
  heading={
    <>
      אנחנו בונים{' '}
      <span className="bg-gradient-to-l from-purple-400 to-blue-500 bg-clip-text text-transparent">
        חוויות דיגיטליות
      </span>
    </>
  }
  subheading="עיצוב, פיתוח ושיווק דיגיטלי שמביאים תוצאות"
  primaryCta={{ label: 'בואו נדבר', href: '#contact' }}
  secondaryCta={{ label: 'פרויקטים', href: '#portfolio' }}
  backgroundSlot={<BackgroundBeams />}
  bottomSlot={<LogosBar logos={clientLogos} />}
  variant="dark"
/>
```

---

## 4. HeroFullBleed — Full-Width Image with Overlay

Dramatic hero with a full-bleed background image, dark overlay, and centered text on top.

**Use for:** Restaurants, events, real estate, any visually-rich industry with strong photography.

**Effect slots:** Optional `overlaySlot` for subtle particle or beam effects on top of the image.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | — | Main heading |
| `subheading` | `string` | — | Supporting text |
| `primaryCta` | `CtaProps` | — | Primary CTA |
| `secondaryCta` | `CtaProps` | — | Secondary CTA |
| `imageSrc` | `string` | — | Background image URL |
| `imageAlt` | `string` | — | Background image alt text |
| `overlayOpacity` | `number` | `0.5` | Dark overlay strength (0–1) |
| `overlaySlot` | `ReactNode` | — | Effects on top of overlay |
| `align` | `'center' \| 'start'` | `'center'` | Text alignment |

### TypeScript Interface

```tsx
interface HeroFullBleedProps {
  heading: string;
  subheading?: string;
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  imageSrc: string;
  imageAlt: string;
  overlayOpacity?: number;
  overlaySlot?: React.ReactNode;
  align?: 'center' | 'start';
}
```

### Source

```tsx
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroFullBleed = ({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  overlayOpacity = 0.5,
  overlaySlot,
  align = 'center',
}: HeroFullBleedProps) => {
  const isCenter = align === 'center';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Optional effect overlay */}
      {overlaySlot && (
        <div className="absolute inset-0">{overlaySlot}</div>
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full py-24 ${isCenter ? 'text-center' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className={`flex flex-col gap-6 ${isCenter ? 'items-center max-w-3xl mx-auto' : 'max-w-2xl'}`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide text-white">
            {heading}
          </h1>

          {subheading && (
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
              {subheading}
            </p>
          )}

          <div className={`flex flex-wrap gap-4 mt-2 ${isCenter ? 'justify-center' : ''}`}>
            {primaryCta && (
              <Button
                onClick={primaryCta.onClick}
                className="bg-cta text-cta-text hover:brightness-95 rounded-full px-8 min-h-[48px] text-base cursor-pointer"
              >
                {primaryCta.label}
                <ArrowLeft className="w-4 h-4 ms-2" />
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant="outline"
                onClick={secondaryCta.onClick}
                className="rounded-full px-8 min-h-[48px] text-base cursor-pointer border-white/30 text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

### Usage

```tsx
<HeroFullBleed
  heading="חוויה קולינרית שלא תשכחו"
  subheading="מסעדת שף עם תפריט עונתי מחומרי גלם מקומיים"
  primaryCta={{ label: 'להזמנת שולחן', href: '#reserve' }}
  imageSrc="/restaurant-hero.webp"
  imageAlt="מסעדה"
  overlayOpacity={0.45}
/>
```

---

## 5. HeroVideo — Background Video Hero

Full-screen video background with autoplay, muted loop. Text overlay with strong contrast.

**Use for:** Events, fitness, luxury brands, high-energy businesses.

**Performance:** Video should be MP4, max 8MB, compressed to 720p. Provide `posterImage` for LCP.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | — | Main heading |
| `subheading` | `string` | — | Supporting text |
| `primaryCta` | `CtaProps` | — | Primary CTA |
| `videoSrc` | `string` | — | MP4 video URL |
| `posterImage` | `string` | — | Poster for LCP before video loads |
| `overlayOpacity` | `number` | `0.5` | Dark overlay strength |

### TypeScript Interface

```tsx
interface HeroVideoProps {
  heading: string;
  subheading?: string;
  primaryCta?: CtaProps;
  videoSrc: string;
  posterImage?: string;
  overlayOpacity?: number;
}
```

### Source

```tsx
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroVideo = ({
  heading,
  subheading,
  primaryCta,
  videoSrc,
  posterImage,
  overlayOpacity = 0.5,
}: HeroVideoProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 text-center max-w-4xl mx-auto px-5 md:px-8 flex flex-col items-center gap-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide text-white">
          {heading}
        </h1>

        {subheading && (
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
            {subheading}
          </p>
        )}

        {primaryCta && (
          <Button
            onClick={primaryCta.onClick}
            className="bg-cta text-cta-text hover:brightness-95 rounded-full px-8 min-h-[48px] text-base cursor-pointer mt-2"
          >
            {primaryCta.label}
            <ArrowLeft className="w-4 h-4 ms-2" />
          </Button>
        )}
      </motion.div>
    </section>
  );
};
```

### Mobile Notes
- Use `playsInline` to prevent fullscreen on iOS
- Provide `posterImage` — mobile may not autoplay video
- Keep video file under 8MB, compress to 720p
- Consider replacing video with static image on slow connections via `<picture>` fallback

---

## 6. TestimonialCarousel — Embla-Powered Quote Carousel

Carousel of testimonial cards with avatar, name, role, quote, and optional star rating. Uses Embla Carousel (from shadcn).

**Use for:** Social proof section. Works with any archetype.

**Effect slots:** Cards support `MovingBorder` or `BorderBeam` wrapper. Section background supports atmospheric effects.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Section label |
| `heading` | `string` | — | Section heading |
| `testimonials` | `Testimonial[]` | — | Array of testimonial data |
| `variant` | `'dark' \| 'light'` | `'light'` | Color scheme |
| `autoplay` | `boolean` | `true` | Auto-advance slides |

### TypeScript Interface

```tsx
interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  label?: string;
  heading?: string;
  testimonials: Testimonial[];
  variant?: 'dark' | 'light';
  autoplay?: boolean;
}
```

### Source

```tsx
import { useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const TestimonialCarousel = ({
  label,
  heading,
  testimonials,
  variant = 'light',
  autoplay = true,
}: TestimonialCarouselProps) => {
  const isDark = variant === 'dark';
  const isRTL = document.documentElement.dir === 'rtl';

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    direction: isRTL ? 'rtl' : 'ltr',
    slidesToScroll: 1,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!autoplay || !emblaApi) return;
    intervalRef.current = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(intervalRef.current);
  }, [autoplay, emblaApi]);

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {label && (
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
              {label}
            </span>
          )}
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-text'}`}>
              {heading}
            </h2>
          )}
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_33%] min-w-0"
                >
                  <div
                    className={`h-full p-6 md:p-8 rounded-2xl flex flex-col gap-4 ${
                      isDark
                        ? 'bg-white/5 backdrop-blur-md border border-white/10'
                        : 'bg-card border border-black/5 shadow-sm'
                    }`}
                  >
                    {/* Stars */}
                    {t.rating && (
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < t.rating!
                                ? 'text-yellow-400 fill-yellow-400'
                                : isDark ? 'text-white/20' : 'text-black/10'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Quote */}
                    <p className={`text-base leading-relaxed flex-1 ${isDark ? 'text-white/80' : 'text-text'}`}>
                      "{t.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-current/5">
                      {t.avatar && (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-text'}`}>
                          {t.name}
                        </p>
                        {t.role && (
                          <p className={`text-xs ${isDark ? 'text-white/50' : 'text-text-muted'}`}>
                            {t.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className={`absolute top-1/2 -translate-y-1/2 end-full me-2 hidden lg:flex w-10 h-10 items-center justify-center rounded-full cursor-pointer transition-colors ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-text'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute top-1/2 -translate-y-1/2 start-full ms-2 hidden lg:flex w-10 h-10 items-center justify-center rounded-full cursor-pointer transition-colors ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-text'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
```

### Usage

```tsx
<TestimonialCarousel
  label="מה אומרים עלינו"
  heading="הלקוחות שלנו מספרים"
  testimonials={[
    {
      quote: 'השירות המדהים ביותר שקיבלתי. מקצועיות ברמה אחרת.',
      name: 'שרה כהן',
      role: 'בעלת עסק',
      rating: 5,
    },
    {
      quote: 'התוצאות מדברות בעד עצמן. ממליצה בחום!',
      name: 'מיכל לוי',
      role: 'מעצבת פנים',
      avatar: '/avatars/michal.webp',
      rating: 5,
    },
  ]}
/>
```

---

## 7. TestimonialGrid — Static Grid of Quote Cards

Masonry-style grid of testimonial cards. Simpler than carousel, better for 3-6 testimonials.

**Use for:** When you have fewer testimonials and want them all visible at once.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Section label |
| `heading` | `string` | — | Section heading |
| `testimonials` | `Testimonial[]` | — | Array of testimonials |
| `variant` | `'dark' \| 'light'` | `'light'` | Color scheme |
| `columns` | `2 \| 3` | `3` | Grid columns on desktop |

### Source

```tsx
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const TestimonialGrid = ({
  label,
  heading,
  testimonials,
  variant = 'light',
  columns = 3,
}: TestimonialGridProps) => {
  const isDark = variant === 'dark';
  const colClass = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          {label && (
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
              {label}
            </span>
          )}
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-text'}`}>
              {heading}
            </h2>
          )}
        </div>

        <div className={`grid grid-cols-1 ${colClass} gap-6`}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-6 md:p-8 rounded-2xl flex flex-col gap-4 ${
                isDark
                  ? 'bg-white/5 backdrop-blur-md border border-white/10'
                  : 'bg-card border border-black/5'
              }`}
            >
              <Quote className={`w-8 h-8 ${isDark ? 'text-primary/40' : 'text-primary/30'}`} />

              {t.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${
                        j < t.rating! ? 'text-yellow-400 fill-yellow-400' : isDark ? 'text-white/20' : 'text-black/10'
                      }`}
                    />
                  ))}
                </div>
              )}

              <p className={`text-base leading-relaxed flex-1 ${isDark ? 'text-white/80' : 'text-text'}`}>
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-current/5">
                {t.avatar && (
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                )}
                <div>
                  <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-text'}`}>{t.name}</p>
                  {t.role && <p className={`text-xs ${isDark ? 'text-white/50' : 'text-text-muted'}`}>{t.role}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 8. LogosBar — Trust & Social Proof Strip

Horizontal row of client/partner logos. Can be static grid or animated infinite marquee.

**Use for:** Below hero, above footer, or between content sections. Instant credibility.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logos` | `Logo[]` | — | Array of logo items |
| `heading` | `string` | — | Optional small heading above logos |
| `animated` | `boolean` | `false` | Use InfiniteMarquee instead of static grid |
| `variant` | `'dark' \| 'light'` | `'light'` | Color scheme |

### TypeScript Interface

```tsx
interface Logo {
  src: string;
  alt: string;
  href?: string;
}

interface LogosBarProps {
  logos: Logo[];
  heading?: string;
  animated?: boolean;
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
export const LogosBar = ({
  logos,
  heading,
  animated = false,
  variant = 'light',
}: LogosBarProps) => {
  const isDark = variant === 'dark';

  const logoElements = logos.map((logo, i) => (
    <div key={i} className="flex items-center justify-center px-6 md:px-8">
      {logo.href ? (
        <a href={logo.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
          <img
            src={logo.src}
            alt={logo.alt}
            className={`h-8 md:h-10 w-auto object-contain transition-opacity ${
              isDark ? 'opacity-40 hover:opacity-70' : 'opacity-50 hover:opacity-80'
            }`}
            loading="lazy"
          />
        </a>
      ) : (
        <img
          src={logo.src}
          alt={logo.alt}
          className={`h-8 md:h-10 w-auto object-contain ${
            isDark ? 'opacity-40' : 'opacity-50'
          }`}
          loading="lazy"
        />
      )}
    </div>
  ));

  if (animated) {
    return (
      <div className={`py-12 ${isDark ? '' : 'bg-bg-alt/50'}`}>
        {heading && (
          <p className={`text-center text-xs tracking-[0.15em] uppercase mb-8 ${
            isDark ? 'text-white/40' : 'text-text-muted'
          }`}>
            {heading}
          </p>
        )}
        {/* Use InfiniteMarquee from scroll-kinetics skill here */}
        <div className="overflow-hidden">
          <div className="flex animate-[marquee-scroll_30s_linear_infinite]">
            {logoElements}
            {logoElements}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-12 ${isDark ? '' : 'bg-bg-alt/50'}`}>
      {heading && (
        <p className={`text-center text-xs tracking-[0.15em] uppercase mb-8 ${
          isDark ? 'text-white/40' : 'text-text-muted'
        }`}>
          {heading}
        </p>
      )}
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logoElements}
      </div>
    </div>
  );
};
```

---

## 9. PricingCards — Tiered Pricing with Toggle

Pricing cards with optional monthly/yearly toggle. Highlighted recommended tier.

**Use for:** SaaS, memberships, service tiers, subscription businesses.

**Effect slots:** Featured card wraps with `BorderBeam` or `MovingBorder`. Cards support `ThreeDCard` tilt.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Section label |
| `heading` | `string` | — | Section heading |
| `plans` | `PricingPlan[]` | — | Array of pricing plans |
| `showToggle` | `boolean` | `false` | Show monthly/yearly toggle |
| `variant` | `'dark' \| 'light'` | `'light'` | Color scheme |

### TypeScript Interface

```tsx
interface PricingPlan {
  name: string;
  description?: string;
  priceMonthly: string;
  priceYearly?: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
}

interface PricingCardsProps {
  label?: string;
  heading?: string;
  subheading?: string;
  plans: PricingPlan[];
  showToggle?: boolean;
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingCards = ({
  label,
  heading,
  subheading,
  plans,
  showToggle = false,
  variant = 'light',
}: PricingCardsProps) => {
  const [yearly, setYearly] = useState(false);
  const isDark = variant === 'dark';

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {label && (
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
              {label}
            </span>
          )}
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-text'}`}>
              {heading}
            </h2>
          )}
          {subheading && (
            <p className={`mt-4 text-lg ${isDark ? 'text-white/60' : 'text-text-muted'}`}>{subheading}</p>
          )}

          {/* Toggle */}
          {showToggle && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!yearly ? (isDark ? 'text-white' : 'text-text') : (isDark ? 'text-white/50' : 'text-text-muted')}`}>
                חודשי
              </span>
              <button
                onClick={() => setYearly(!yearly)}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  yearly ? 'bg-primary' : isDark ? 'bg-white/20' : 'bg-black/10'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    yearly ? 'start-0.5' : 'start-[calc(100%-1.375rem)]'
                  }`}
                />
              </button>
              <span className={`text-sm ${yearly ? (isDark ? 'text-white' : 'text-text') : (isDark ? 'text-white/50' : 'text-text-muted')}`}>
                שנתי
              </span>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className={`grid grid-cols-1 ${plans.length === 2 ? 'md:grid-cols-2 max-w-3xl' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 mx-auto`}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.featured
                  ? isDark
                    ? 'bg-primary/10 border-2 border-primary ring-1 ring-primary/20'
                    : 'bg-white border-2 border-primary shadow-lg shadow-primary/10'
                  : isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-card border border-black/5'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 start-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                  מומלץ
                </span>
              )}

              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-text'}`}>{plan.name}</h3>
              {plan.description && (
                <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-text-muted'}`}>{plan.description}</p>
              )}

              <div className="mt-6 mb-6">
                <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-text'}`}>
                  {yearly && plan.priceYearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                {showToggle && (
                  <span className={`text-sm ms-1 ${isDark ? 'text-white/50' : 'text-text-muted'}`}>
                    /{yearly ? 'שנה' : 'חודש'}
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-text'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full min-h-[48px] cursor-pointer ${
                  plan.featured
                    ? 'bg-cta text-cta-text hover:brightness-95'
                    : isDark
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-black/5 text-text hover:bg-black/10'
                }`}
              >
                {plan.cta.label}
                <ArrowLeft className="w-4 h-4 ms-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 10. ContactForm — Lead Capture with Zod Validation

Contact/lead form with React Hook Form + Zod validation. Supports configurable fields.

**Use for:** Contact sections, booking forms, lead generation.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Section label |
| `heading` | `string` | — | Section heading |
| `subheading` | `string` | — | Section subtitle |
| `fields` | `FormField[]` | — | Form field configuration |
| `submitLabel` | `string` | `'שליחה'` | Submit button text |
| `onSubmit` | `(data) => void` | — | Form submission handler |
| `variant` | `'dark' \| 'light'` | `'light'` | Color scheme |
| `layout` | `'stacked' \| 'split'` | `'stacked'` | Stacked form or split (text + form) |
| `sideContent` | `ReactNode` | — | Content beside form in split layout |

### TypeScript Interface

```tsx
import { z } from 'zod';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface ContactFormProps {
  label?: string;
  heading?: string;
  subheading?: string;
  fields: FormField[];
  submitLabel?: string;
  onSubmit: (data: Record<string, string>) => void;
  variant?: 'dark' | 'light';
  layout?: 'stacked' | 'split';
  sideContent?: React.ReactNode;
}
```

### Zod Schema Generator

Build the Zod schema dynamically from the `fields` config:

```tsx
const buildSchema = (fields: FormField[]) => {
  const shape: Record<string, z.ZodType> = {};
  for (const f of fields) {
    let rule = z.string();
    if (f.required) rule = rule.min(1, `${f.label} הוא שדה חובה`);
    if (f.type === 'email') rule = rule.email('כתובת אימייל לא תקינה');
    if (f.type === 'tel') rule = rule.regex(/^[\d\-+() ]{7,15}$/, 'מספר טלפון לא תקין');
    shape[f.name] = f.required ? rule : rule.optional().or(z.literal(''));
  }
  return z.object(shape);
};
```

### Source

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContactForm = ({
  label,
  heading,
  subheading,
  fields,
  submitLabel = 'שליחה',
  onSubmit,
  variant = 'light',
  layout = 'stacked',
  sideContent,
}: ContactFormProps) => {
  const isDark = variant === 'dark';
  const schema = buildSchema(fields);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const inputClass = `w-full rounded-xl px-4 py-3 text-base transition-colors outline-none ${
    isDark
      ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary'
      : 'bg-white border border-black/10 text-text placeholder:text-text-muted/50 focus:border-primary'
  }`;

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {fields.map((f) => (
        <div key={f.name}>
          <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-white/70' : 'text-text'}`}>
            {f.label}
            {f.required && <span className="text-red-400 ms-1">*</span>}
          </label>

          {f.type === 'textarea' ? (
            <textarea
              {...register(f.name)}
              placeholder={f.placeholder}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          ) : f.type === 'select' ? (
            <div className="relative">
              <select {...register(f.name)} className={`${inputClass} appearance-none pe-12 cursor-pointer`}>
                <option value="">{f.placeholder || 'בחירה...'}</option>
                {f.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className={`absolute end-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-white/50' : 'text-text-muted'}`} />
            </div>
          ) : (
            <input
              {...register(f.name)}
              type={f.type}
              placeholder={f.placeholder}
              className={inputClass}
            />
          )}

          {errors[f.name] && (
            <p className="text-red-400 text-xs mt-1">{errors[f.name]?.message as string}</p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-cta text-cta-text hover:brightness-95 rounded-full min-h-[48px] text-base cursor-pointer mt-2"
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : submitLabel}
        {!isSubmitting && <ArrowLeft className="w-4 h-4 ms-2" />}
      </Button>
    </form>
  );

  return (
    <section id="contact" className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {layout === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {label && (
                <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
                  {label}
                </span>
              )}
              {heading && (
                <h2 className={`text-3xl md:text-4xl font-bold tracking-wide mb-4 ${isDark ? 'text-white' : 'text-text'}`}>
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className={`text-lg mb-8 ${isDark ? 'text-white/60' : 'text-text-muted'}`}>{subheading}</p>
              )}
              {sideContent}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`p-6 md:p-8 rounded-2xl ${
                isDark ? 'bg-white/5 border border-white/10' : 'bg-card border border-black/5'
              }`}
            >
              {formContent}
            </motion.div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              {label && (
                <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
                  {label}
                </span>
              )}
              {heading && (
                <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-text'}`}>
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className={`mt-4 text-lg ${isDark ? 'text-white/60' : 'text-text-muted'}`}>{subheading}</p>
              )}
            </div>
            <div className={`p-6 md:p-8 rounded-2xl ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-card border border-black/5'
            }`}>
              {formContent}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
```

### Standard Field Configs

Quick presets for common landing page forms:

```tsx
const CONTACT_FIELDS: FormField[] = [
  { name: 'name', label: 'שם מלא', type: 'text', required: true, placeholder: 'הכניסו את שמכם' },
  { name: 'phone', label: 'טלפון', type: 'tel', required: true, placeholder: '050-0000000' },
  { name: 'email', label: 'אימייל', type: 'email', placeholder: 'email@example.com' },
  { name: 'message', label: 'הודעה', type: 'textarea', placeholder: 'ספרו לנו במה נוכל לעזור...' },
];

const BOOKING_FIELDS: FormField[] = [
  { name: 'name', label: 'שם מלא', type: 'text', required: true, placeholder: 'הכניסו את שמכם' },
  { name: 'phone', label: 'טלפון', type: 'tel', required: true, placeholder: '050-0000000' },
  { name: 'service', label: 'סוג שירות', type: 'select', required: true, options: ['ייעוץ ראשוני', 'טיפול', 'חבילה'] },
  { name: 'notes', label: 'הערות', type: 'textarea', placeholder: 'פרטים נוספים...' },
];
```

---

## 11. GalleryGrid — Responsive Image Gallery with Lightbox

Responsive grid gallery with click-to-expand lightbox. Supports mixed aspect ratios.

**Use for:** Portfolio, project showcases, restaurant galleries, event photos.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Section label |
| `heading` | `string` | — | Section heading |
| `images` | `GalleryImage[]` | — | Gallery items |
| `columns` | `2 \| 3 \| 4` | `3` | Grid columns on desktop |
| `variant` | `'dark' \| 'light'` | `'light'` | Color scheme |

### TypeScript Interface

```tsx
interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  aspect?: 'square' | 'landscape' | 'portrait';
}

interface GalleryGridProps {
  label?: string;
  heading?: string;
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const aspectMap = {
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
};

export const GalleryGrid = ({
  label,
  heading,
  images,
  columns = 3,
  variant = 'light',
}: GalleryGridProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const isDark = variant === 'dark';
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns];

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          {label && (
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
              {label}
            </span>
          )}
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-text'}`}>
              {heading}
            </h2>
          )}
        </div>

        <div className={`grid grid-cols-1 ${colClass} gap-4`}>
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelected(i)}
              className="overflow-hidden rounded-xl cursor-pointer group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  aspectMap[img.aspect || 'square']
                }`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 end-4 text-white/80 hover:text-white p-2 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {images[selected].caption && (
              <p className="absolute bottom-8 text-white/70 text-sm text-center">
                {images[selected].caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
```

---

## 12. TeamGrid — Team Members Section

Grid of team member cards with photo, name, role, and optional social links.

**Use for:** About, team, instructors, staff sections.

### TypeScript Interface

```tsx
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials?: { icon: React.ReactNode; href: string }[];
}

interface TeamGridProps {
  label?: string;
  heading?: string;
  members: TeamMember[];
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
import { motion } from 'framer-motion';

export const TeamGrid = ({
  label,
  heading,
  members,
  variant = 'light',
}: TeamGridProps) => {
  const isDark = variant === 'dark';

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          {label && (
            <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
              {label}
            </span>
          )}
          {heading && (
            <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-text'}`}>
              {heading}
            </h2>
          )}
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${members.length >= 3 ? 'lg:grid-cols-3' : ''} ${members.length >= 4 ? 'xl:grid-cols-4' : ''} gap-8`}>
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="overflow-hidden rounded-2xl mb-5 aspect-[3/4]">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-text'}`}>{m.name}</h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-text-muted'}`}>{m.role}</p>

              {m.bio && (
                <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-white/60' : 'text-text-muted'}`}>
                  {m.bio}
                </p>
              )}

              {m.socials && (
                <div className="flex items-center justify-center gap-3 mt-4">
                  {m.socials.map((s, j) => (
                    <a
                      key={j}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                          : 'bg-black/5 text-text-muted hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 13. VideoSection — Embedded Video with Play Button

Video section with inline player or click-to-play overlay. Supports YouTube, Vimeo, or self-hosted.

**Use for:** Explainer videos, brand stories, testimonial videos, demos.

### TypeScript Interface

```tsx
interface VideoSectionProps {
  label?: string;
  heading?: string;
  subheading?: string;
  videoUrl: string;
  posterImage: string;
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const getEmbedUrl = (url: string): string | null => {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

  return null;
};

export const VideoSection = ({
  label,
  heading,
  subheading,
  videoUrl,
  posterImage,
  variant = 'light',
}: VideoSectionProps) => {
  const [playing, setPlaying] = useState(false);
  const isDark = variant === 'dark';
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {(label || heading) && (
          <div className="text-center mb-12">
            {label && (
              <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
                {label}
              </span>
            )}
            {heading && (
              <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-text'}`}>
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`mt-4 text-lg ${isDark ? 'text-white/60' : 'text-text-muted'}`}>{subheading}</p>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
        >
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full cursor-pointer group"
            >
              <img
                src={posterImage}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 md:w-8 md:h-8 text-text ms-1" />
                </div>
              </div>
            </button>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};
```

---

## 14. MapEmbed — Google Maps Location Section

Location section with embedded Google Maps iframe and optional contact details.

**Use for:** Local businesses, restaurants, clinics, studios — any place-based business.

### TypeScript Interface

```tsx
interface ContactDetail {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface MapEmbedProps {
  label?: string;
  heading?: string;
  mapEmbedUrl: string;
  details?: ContactDetail[];
  variant?: 'dark' | 'light';
}
```

### Source

```tsx
import { motion } from 'framer-motion';

export const MapEmbed = ({
  label,
  heading,
  mapEmbedUrl,
  details,
  variant = 'light',
}: MapEmbedProps) => {
  const isDark = variant === 'dark';

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-bg' : 'bg-bg-alt'}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {label && (
              <span className="text-primary text-sm font-semibold tracking-[0.15em] uppercase block mb-4">
                {label}
              </span>
            )}
            {heading && (
              <h2 className={`text-3xl md:text-4xl font-bold tracking-wide mb-8 ${isDark ? 'text-white' : 'text-text'}`}>
                {heading}
              </h2>
            )}

            {details && (
              <div className="flex flex-col gap-5">
                {details.map((d, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isDark ? 'bg-white/10 text-primary' : 'bg-primary/10 text-primary'
                    }`}>
                      {d.icon}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white/50' : 'text-text-muted'}`}>
                        {d.label}
                      </p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className={`text-base font-medium hover:text-primary transition-colors cursor-pointer ${
                            isDark ? 'text-white' : 'text-text'
                          }`}
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className={`text-base font-medium ${isDark ? 'text-white' : 'text-text'}`}>
                          {d.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
          >
            <iframe
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

### Usage

```tsx
import { MapPin, Phone, Clock } from 'lucide-react';

<MapEmbed
  label="איך מגיעים"
  heading="בואו לבקר אותנו"
  mapEmbedUrl="https://www.google.com/maps/embed?pb=..."
  details={[
    { icon: <MapPin className="w-5 h-5" />, label: 'כתובת', value: 'רחוב הרצל 15, תל אביב' },
    { icon: <Phone className="w-5 h-5" />, label: 'טלפון', value: '03-1234567', href: 'tel:031234567' },
    { icon: <Clock className="w-5 h-5" />, label: 'שעות פעילות', value: 'א׳-ה׳ 9:00-20:00' },
  ]}
/>
```

---

## Section Integration Guide

### How to combine templates with effects

Each section template has designated slots. Here's the recommended pairing:

| Section Template | Background Effect | Card Effect | CTA Effect |
|-----------------|-------------------|-------------|------------|
| HeroCentered | SparklesCore, BackgroundBeams, 3D scene | — | ShimmerButton |
| HeroSplit | SparklesCore (subtle), gradient blobs | — | ShimmerButton |
| HeroFullBleed | Spotlight overlay | — | ShimmerButton |
| HeroVideo | — (video is the effect) | — | ShimmerButton |
| TestimonialCarousel | LampEffect above heading | MovingBorder on cards | — |
| TestimonialGrid | — | BorderBeam on featured card | — |
| PricingCards | — | BorderBeam on featured plan | ShimmerButton on featured CTA |
| GalleryGrid | — | ThreeDCard tilt on hover | — |
| TeamGrid | — | ThreeDCard subtle tilt | — |
| ContactForm | SparklesCore (very subtle) | — | ShimmerButton on submit |

### Between sections: kinetic dividers

Use `InfiniteMarquee` or `ParallaxText` from scroll-kinetics between content sections for kinetic energy:

```tsx
<HeroSplit ... />
<InfiniteMarquee items={['איכות', 'מקצועיות', 'מצוינות']} speed={40} />
<TestimonialCarousel ... />
```

### Mobile considerations

- All templates use `grid-cols-1` on mobile, expanding on breakpoints
- Min tap target 44x44px on all buttons and interactive elements
- Cards stack vertically on mobile
- Carousel shows ~90% of one card on mobile for peek affordance
- Lightbox uses full viewport on mobile
