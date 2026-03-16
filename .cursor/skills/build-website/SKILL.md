---
name: build-website
description: Complete A-to-Z skill for building landing pages. START HERE for any website build. This master skill orchestrates all other skills (section-templates, premium-effects, scroll-kinetics, 3d-scenes, style-archetypes, ui-ux-pro-max) — it tells you WHEN and HOW to read each one.
---

# Build Website — Master Skill

The complete pipeline from client brief to deployed landing page. Follow these phases in order.

**This skill orchestrates everything.** It tells you when to read each sub-skill. Do NOT skip the "READ skill" instructions in Phase 3 — each skill contains full source code that you COPY and ADAPT, not reinvent.

---

## Phase 1: Design System (ALWAYS FIRST)

### Step 1A: Analyze the Client Brief

Before running any tool, extract everything the client specified:

| Extract | Example |
|---------|---------|
| Colors | "צבע ראשי #E0783F, משני #90A89E" |
| Fonts | "פונט Heebo לכותרות" |
| Industry | "סטודיו פילאטיס", "מסעדה איטלקית" |
| Tone/vibe | "נקי ומקצועי", "חם ומזמין" |
| Specific requests | "אני רוצה אפקט ניצנוצים בהירו" |
| Content | Services, team, gallery, pricing — what sections are needed |

Everything the client specified is **locked** — tools adapt to it, never override it.

### Step 1B: Run ui-ux-pro-max

```bash
# Run from the PROJECT directory (after Step 2B copies skills into the project)
# Or from landing-page-studio workspace if skills haven't been copied yet
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<industry keywords>" --design-system -p "<Project Name>"
```

Example: `"beauty nail salon elegant feminine"` → returns palette, fonts, style, layout, anti-patterns.

ui-ux-pro-max fills gaps the client brief didn't specify. If the client gave colors, ui-ux-pro-max colors are ignored. If the client didn't specify fonts, ui-ux-pro-max fonts are used.

### Step 1C: Supplemental Searches (as needed)

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "glassmorphism dark" --domain style
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "scroll animation" --domain ux
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "performance animation" --stack react
```

### Step 1D: Detect Style Archetype

Read the `style-archetypes` skill and scan the brief for archetype triggers:

```
Read: .cursor/skills/style-archetypes/SKILL.md → check trigger keywords
For Hebrew briefs: translate industry terms to English first
  (מכון ציפורניים → nail salon, סטודיו פילאטיס → pilates, מסעדה → restaurant, etc.)
Match found? → Read the archetype file → provides industry-tuned tool configurations
  → COPY the archetype's @theme CSS block for Phase 3 index.css setup
No match? → Continue with ui-ux-pro-max output + default tool settings
```

**Current archetypes (8):** Wellness Clean, Glam Beauty, Power Fitness, Luxury Minimal, Elegant Events, Bold Agency, Trust Professional, Warm Local

The archetype provides **configuration presets** for all our tools — particle densities, animation speeds, card styles, color intensities. It does NOT disable tools. See the archetype file for the full configuration table.

### Step 1E: Merge Layers → Design Blueprint

Three layers merge into one blueprint. **Client brief always wins:**

```
Layer 1 (highest priority): Client brief — locked values
Layer 2 (fills gaps):       Archetype DNA — industry-tuned tool configs
Layer 3 (baseline):         ui-ux-pro-max — data-driven defaults
```

The Design Blueprint maps every tool's configuration:

| Decision | Source priority | Examples |
|----------|---------------|---------|
| Color palette | Brief > Archetype > ui-ux-pro-max | 3-5 hex colors with roles (primary, secondary, CTA, bg, text) |
| Typography | Brief > Archetype > ui-ux-pro-max | Heading + body font pair |
| Theme (dark/light) | Brief > Archetype > ui-ux-pro-max | Dark for agency/tech, light for wellness/local |
| Hero strategy | Brief > Archetype | 3D scene, kinetic typography, parallax image, illustration |
| Card treatment | Brief > Archetype | Glass intensity, border style, hover behavior |
| Animation speed | Brief > Archetype | Calm 800ms+ / Medium 500ms / Fast 300ms |
| SparklesCore config | Archetype (unless brief overrides) | `particleColor`, `particleDensity`, `speed` — tuned per industry |
| ShimmerButton config | Archetype (unless brief overrides) | `shimmerColor` opacity, `background` — ranges from bold sweep to barely visible |
| BorderBeam config | Archetype (unless brief overrides) | `duration`, `colorFrom/To` opacity — bold to imperceptible |
| ThreeDCard config | Archetype (unless brief overrides) | `intensity` 3 (subtle) to 14 (dramatic) |
| InfiniteMarquee config | Archetype (unless brief overrides) | `speed` 15 (fast) to 60 (zen-slow), opacity, content |
| FlowingBackground config | Archetype (unless brief overrides) | `opacity` 0.02 (ghost) to 0.08 (bold), `speed`, `outlined` |
| BackgroundBeams config | Archetype (unless brief overrides) | Color intensity, beam count |
| LampEffect config | Archetype (unless brief overrides) | `color` opacity range, width |
| 3D scene (optional) | Brief tone | If brief calls for immersive/premium, pick from `3d-scenes` skill. 3D replaces premium-effects atmosphere in that section — never combine both. |

---

## Phase 2: Project Setup

### Step 2A: Create Base44 Project

```bash
cd ~/Desktop/web\ projects
npx base44 create <project-name> -t backend-and-client -p <project-name>
cd <project-name>
```

### Step 2B: Copy Skills & Rules

```bash
mkdir -p .cursor/skills .cursor/rules
cp -r /Users/sagika/landing-page-studio/.cursor/skills/ui-ux-pro-max .cursor/skills/
cp -r /Users/sagika/landing-page-studio/.cursor/skills/build-website .cursor/skills/
cp -r /Users/sagika/landing-page-studio/.cursor/skills/base44-setup .cursor/skills/
cp -r /Users/sagika/landing-page-studio/.cursor/skills/premium-effects .cursor/skills/
cp -r /Users/sagika/landing-page-studio/.cursor/skills/3d-scenes .cursor/skills/
cp -r /Users/sagika/landing-page-studio/.cursor/skills/scroll-kinetics .cursor/skills/
cp -r /Users/sagika/landing-page-studio/.cursor/skills/section-templates .cursor/skills/
cp -r /Users/sagika/landing-page-studio/.cursor/skills/style-archetypes .cursor/skills/
cp /Users/sagika/landing-page-studio/.cursor/rules/*.mdc .cursor/rules/
```

### Step 2C: Upgrade to Tailwind v4

```bash
npm uninstall tailwindcss autoprefixer postcss
npm install tailwindcss@latest @tailwindcss/postcss postcss
rm -f tailwind.config.js
```

```js
// postcss.config.js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

### Step 2D: Install Dependencies

```bash
# Core animation + scroll
npm install gsap lenis framer-motion

# UI components
npx shadcn@latest init
npm install lucide-react

# Forms
npm install react-hook-form zod @hookform/resolvers

# Carousel (if needed)
npm install embla-carousel-react

# 3D scenes (if needed — see 3d-scenes skill)
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing

# Premium effects — create from patterns in premium-effects skill
# No npm deps needed (uses react + framer-motion already installed above)
mkdir -p src/components/effects
# Then generate each effect component from the premium-effects skill,
# adapting colors to the project's @theme variables.

# Scroll kinetics — create from patterns in scroll-kinetics skill
# No npm deps needed (uses react + framer-motion + gsap already installed above)
mkdir -p src/components/kinetics
# Then generate each kinetic component from the scroll-kinetics skill.
```

### Step 2E: Install Premium Component Libraries

**Magic UI** — for animated borders, particles, text effects, backgrounds:
```bash
npx shadcn@latest add "https://magicui.design/r/[component-name]"
```

**Aceternity UI** — for 3D cards, aurora bg, parallax, beams:
Install from [ui.aceternity.com](https://ui.aceternity.com) — copy component code into your project.

**21st.dev** — for additional shadcn-compatible components:
```bash
npx shadcn@latest add "https://21st.dev/r/[author]/[component-name]"
```

### Step 2F: Configure index.html for Hebrew RTL + SEO Meta

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO Core -->
  <title>[Business Name] — [Value Proposition]</title>
  <meta name="description" content="[2-3 sentence description with primary keyword. 150-160 chars max.]" />
  <link rel="canonical" href="https://[domain]/" />

  <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="[Business Name] — [Value Proposition]" />
  <meta property="og:description" content="[Same as meta description]" />
  <meta property="og:image" content="https://[domain]/og-image.jpg" />
  <meta property="og:url" content="https://[domain]/" />
  <meta property="og:locale" content="he_IL" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="[Business Name] — [Value Proposition]" />
  <meta name="twitter:description" content="[Same as meta description]" />
  <meta name="twitter:image" content="https://[domain]/og-image.jpg" />

  <!-- Performance: Preconnect to font CDN -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />

  <!-- Performance: Preload hero image for LCP -->
  <link rel="preload" as="image" href="/hero.webp" type="image/webp" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

**OG Image requirements:**
- Dimensions: 1200x630px
- Format: JPEG (most compatible)
- Include logo + business name + tagline
- Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### Step 2G: Copy Section Templates

```bash
cp -r /Users/sagika/landing-page-studio/.cursor/skills/section-templates .cursor/skills/
```

The `section-templates` skill provides ready-made patterns for Navigation, Hero variants, Testimonials, Pricing, Contact Forms, Gallery, Team, Video, Map, and Social Proof. Use these as the starting point for every section — adapt colors and content to the Design Blueprint.

---

## Phase 3: Build

### CRITICAL: Read Skills Before Building

Before writing ANY component code, READ these skill files in order. Each skill contains full source code patterns — **copy and adapt them**, do NOT write from scratch.

```
Step 3A: READ .cursor/skills/section-templates/SKILL.md
         → Get full TypeScript source for NavigationBar, Hero variants,
           Testimonials, Pricing, ContactForm, Gallery, Team, Video, Map, LogosBar.
         → Each template has effect SLOTS — marked spots for premium-effects.

Step 3B: READ .cursor/skills/premium-effects/SKILL.md
         → Get full source for SparklesCore, BorderBeam, ShimmerButton, etc.
         → Copy the Required CSS Keyframes into src/index.css.
         → Follow the Color Adaptation Rule to map props to @theme variables.

Step 3C: READ .cursor/skills/scroll-kinetics/SKILL.md
         → Get full source for InfiniteMarquee, FlowingBackground, ParallaxText, etc.
         → Copy the Required CSS Keyframes into src/index.css.

Step 3D: (If Design Blueprint calls for 3D) READ .cursor/skills/3d-scenes/SKILL.md
         → Full React Three Fiber patterns. Lazy-load with React.Suspense.
```

### Section Assembly Workflow

For EACH section on the page, follow this process:

```
1. PICK the section template from section-templates skill
   → Hero? Use HeroSplit, HeroCentered, HeroFullBleed, or HeroVideo
   → Testimonials? Use TestimonialCarousel or TestimonialGrid
   → Pricing? Use PricingCards
   → etc.

2. COPY the template source code into src/components/sections/SectionName.tsx

3. ADAPT to the Design Blueprint:
   → Replace placeholder text with client content (Hebrew, RTL)
   → Set variant='dark' or variant='light' based on archetype
   → Map colors to @theme variables (the template already uses them)
   → Apply archetype's Typography DNA (font-family in CSS/Tailwind)

4. FILL effect slots from the archetype's Tool Configuration Presets:
   → Hero backgroundSlot → SparklesCore with archetype-specified density/speed/color
   → Featured cards → BorderBeam or MovingBorder with archetype-specified duration/opacity
   → Primary CTA → ShimmerButton with archetype-specified shimmerColor
   → Between sections → InfiniteMarquee or ParallaxText with archetype speed/opacity

5. ADD scroll entrance animation:
   → Already built into most templates (Framer Motion whileInView)
   → For complex staggered sequences, wrap with ScrollReveal (GSAP)
   → Apply archetype's Animation DNA: y distance, duration, easing, stagger
```

### Setting Up index.css

Before building sections, set up the project's `src/index.css` with ALL required blocks:

```css
/* 1. Tailwind import */
@import "tailwindcss";

/* 2. Theme colors from archetype (or Design Blueprint) */
@theme {
  --color-bg: #____;
  --color-bg-alt: #____;
  --color-card: #____;
  --color-primary: #____;
  --color-cta: #____;
  --color-cta-text: #____;
  --color-text: #____;
  --color-text-muted: #____;
  --color-secondary: #____;
}

/* 3. Hebrew global styles */
body, p, h1, h2, h3, h4, span, a, button, li {
  word-break: keep-all;
  overflow-wrap: break-word;
}
a, button, [role="button"] { cursor: pointer; }

/* 4. Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* 5. CSS keyframes — only include what you use */
/* From premium-effects: */
@keyframes border-beam-spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes shimmer-sweep {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes gradient-mesh-shift {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(3deg); }
  100% { transform: scale(1) rotate(-3deg); }
}
@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 var(--glow-size, 8px) var(--glow-color, currentColor)); }
  50% { filter: drop-shadow(0 0 calc(var(--glow-size, 8px) * 2.5) var(--glow-color, currentColor)); }
}

/* From scroll-kinetics: */
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-scroll-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* From build-website: */
.gradient-blob {
  position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15;
  animation: blob-float 12s ease-in-out infinite alternate;
}
@keyframes blob-float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, -30px) scale(1.1); }
}
```

**When an archetype matched:** Open the archetype file (e.g. `archetypes/glam-beauty.md`) and copy its complete `@theme` block into the placeholders above. Only override colors that the client explicitly specified.

**When no archetype matched:** Use the Color Palette Derivation logic (see Quick Reference) to derive a full palette from the client's colors, or use the ui-ux-pro-max output.

---

### Cross-Skill Decision Tree — Which Skill When?

```
Need a SECTION LAYOUT (navigation, hero, testimonials, pricing, form, gallery)?
└── section-templates skill → provides structure + slots for effects

Need ATMOSPHERE / WOW (particles, glowing borders, shimmer, tilt, beams)?
└── premium-effects skill → SparklesCore, BorderBeam, ShimmerButton, etc.
    └── Also: NoiseOverlay, GradientMesh, GlowPulse, BeforeAfterSlider

Need MOTION / MOVEMENT (scrolling text, marquees, kinetic dividers)?
└── scroll-kinetics skill → InfiniteMarquee, FlowingBackground, ParallaxText

Need IMMERSIVE 3D (floating objects, particle fields, globe, WebGL)?
└── 3d-scenes skill → FloatingProduct, ParticleField, GlobeScene, etc.
    ⚠️ NEVER combine 3D + premium-effects in the same section

Need BASE UI (buttons, cards, dialogs, accordion, carousel)?
└── shadcn/ui → Button, Card, Dialog, Sheet, Accordion, Embla

Need TEXT ANIMATION for Hebrew?
└── KineticText (built-in to build-website) — NEVER SplitType for Hebrew

Need something NOT in any skill?
└── Check Magic UI / Aceternity UI → copy-paste only what's missing
```

**Key rules:**
- Section templates provide layout + effect slots. Effects fill the slots.
- NEVER stack 3D scenes + premium-effects in the same section
- Use InfiniteMarquee or ParallaxText BETWEEN sections as kinetic dividers
- One atmospheric effect per section is enough (don't combine SparklesCore + Spotlight + LampEffect)

### Component Source Priority

**Our skills are the PRIMARY source.** Use the self-contained patterns from `premium-effects`, `scroll-kinetics`, and `3d-scenes` FIRST. Fall back to external libraries (Magic UI, Aceternity) ONLY for components not covered by our skills. NEVER mix — if our skill has a component, use it. Do not install the same effect from a library.

**Source priority:** Our Skills → shadcn/ui → Magic UI / Aceternity UI (fallback only)

### Component Quick Reference

#### Section Templates (from `section-templates` skill → `src/components/sections/`)

| Component | Use for |
|-----------|---------|
| `<NavigationBar>` | Sticky nav — transparent over hero, solid on scroll, mobile hamburger |
| `<HeroSplit>` | Two-column hero — text + image/3D side by side |
| `<HeroCentered>` | Centered hero — bold text with background effects |
| `<HeroFullBleed>` | Full-bleed image hero with overlay |
| `<HeroVideo>` | Background video hero |
| `<TestimonialCarousel>` | Embla-powered quote carousel with ratings |
| `<TestimonialGrid>` | Static grid of quote cards |
| `<LogosBar>` | Client/partner logos strip (static or animated) |
| `<PricingCards>` | Tiered pricing with optional monthly/yearly toggle |
| `<ContactForm>` | Lead capture with React Hook Form + Zod |
| `<GalleryGrid>` | Responsive image gallery with lightbox |
| `<TeamGrid>` | Team member cards with photo, role, socials |
| `<VideoSection>` | Video embed with click-to-play overlay |
| `<MapEmbed>` | Google Maps with contact details |

#### Visual Effects (from `premium-effects` skill → `src/components/effects/`)

| Component | Use for |
|-----------|---------|
| `<SparklesCore>` | Canvas particle backgrounds — hero, behind headings |
| `<Spotlight>` | Cursor-following light — hero, feature sections |
| `<ThreeDCard>` | Perspective tilt on hover — product cards, features |
| `<BorderBeam>` | Rotating gradient border — featured cards, pricing |
| `<ShimmerButton>` | Sweeping light CTA — primary hero/modal CTAs |
| `<NumberTicker>` | Animated counter — stats, social proof |
| `<LampEffect>` | Conic light cone — dramatic section intros |
| `<MovingBorder>` | Animated conic border — product cards, testimonials |
| `<BackgroundBeams>` | SVG light beams — dark footers, dark hero |

#### Scroll Motion (from `scroll-kinetics` skill → `src/components/kinetics/`)

| Component | Use for |
|-----------|---------|
| `<InfiniteMarquee>` | Looping ticker — between sections, logos, tags |
| `<ScrollMarquee>` | Direction-aware ticker — reverses on scroll-up |
| `<FlowingBackground>` | Large flowing text behind content — editorial depth |
| `<ParallaxText>` | Scroll-driven horizontal text — section dividers |
| `<SplashLoader>` | Intro loading screen — premium first impression |
| `<MarqueeStack>` | Multi-row tag wall — keyword displays |

#### 3D Scenes (from `3d-scenes` skill → `src/components/scenes/`)

| Component | Use for |
|-----------|---------|
| `<Scene3D>` | Base canvas wrapper for all 3D content |
| `<FloatingProduct>` | Rotating geometric shape — hero, product spotlight |
| `<ParticleField>` | GPU particle system — immersive backgrounds |
| `<GlobeScene>` | Interactive globe — SaaS, global reach |
| `<WavePlane>` | Animated wave mesh — section backgrounds |
| `<MorphingSphere>` | Distorted reactive sphere — hero centerpiece |
| `<ScrollStory>` | Scroll-driven multi-page 3D journey |
| `<ModelViewer>` | Load and display GLTF/GLB models |
| `<CinematicPost>` | Bloom + vignette post-processing |

#### Base UI (from shadcn/ui — accessible primitives)

| Component | Use for |
|-----------|---------|
| `<Button>` | Base button with variants |
| `<Card>` | Content container |
| `<Dialog>` | Modal dialogs |
| `<Sheet>` | Mobile drawer / side panel |
| `<Accordion>` | FAQ, collapsible content |
| `useEmblaCarousel` | Carousel / slider (via Embla) |

#### Fallback Libraries (use ONLY for components NOT in our skills)

| Library | When to use | Install method |
|---------|-------------|----------------|
| Magic UI | Text effects (`TextReveal`, `TypingAnimation`, `BlurIn`), dot/grid patterns, meteors, dock nav | `npx shadcn@latest add "https://magicui.design/r/[component]"` |
| Aceternity UI | Aurora background, hero parallax, infinite moving cards, wavy background, floating navbar, text generate | Copy from `ui.aceternity.com` |

### Animation Decision Tree

Three animation systems coexist. Use the right one for each job — never mix systems for the same task.

| System | Use for | Examples |
|--------|---------|----------|
| **GSAP + ScrollTrigger** | Complex scroll-driven animations, timelines, pinned sections, parallax, staggered sequences with precise control | ScrollReveal, ParallaxText, pinned scrollytelling |
| **Framer Motion** | Simple entrance animations, view-triggered reveals, layout animations, React component lifecycle, Hebrew character animation | KineticText, NumberTicker, SplashLoader, AnimatePresence |
| **CSS keyframes** | Infinite decorative loops that run forever with zero JS runtime cost | Marquee scroll, border-beam spin, shimmer sweep, blob float |

**Rules:**
- For scroll-triggered entrance: prefer GSAP `ScrollReveal` for complex staggered sequences, prefer Framer Motion `whileInView` for simple fade-in on individual elements
- NEVER use GSAP for what CSS keyframes can do (infinite loops)
- NEVER use Framer Motion for scroll-pinned sections (GSAP handles this)
- Archetype animation overrides (duration, travel distance, easing) apply to ALL systems — e.g. if archetype says "max 30px travel," set `y: 30` in both GSAP and Framer entrance animations

### Essential Custom Components

These components are NOT available in any library and must be built custom:

#### KineticText — RTL-Safe Character Animation

NEVER use SplitType or GSAP SplitText for Hebrew. Use this Framer Motion component:

```tsx
import { motion } from 'framer-motion';

export const KineticText = ({
  children, className = '', charClassName, delay = 0, stagger = 0.04,
  as: Tag = 'span',
}: {
  children: string; className?: string; charClassName?: string;
  delay?: number; stagger?: number; as?: 'h1'|'h2'|'h3'|'span'|'p';
}) => (
  <Tag className={className}>
    {children.split('').map((char, i) => (
      <motion.span
        key={`${i}-${char}`}
        initial={{ y: '110%', opacity: 0, rotateX: -60 }}
        whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: delay + i * stagger, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={charClassName}
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </Tag>
);
```

**Gradient text on KineticText:** Apply via `charClassName`, NOT on the parent:
```tsx
<KineticText charClassName="bg-gradient-to-l from-pink-400 to-amber-400 bg-clip-text text-transparent">
  טקסט עם גרדיאנט
</KineticText>
```

#### ScrollReveal — GSAP Scroll Entrance

```tsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 40, opacity: 0, duration: 0.8, delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    });
    return () => ctx.revert();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
};
```

#### useSmoothScroll — Lenis + GSAP Sync

```tsx
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);
};
```

#### Glass Card CSS (theme-aware)

Choose the variant that matches the project's background. If a style archetype replaces glass cards, skip this entirely and use the archetype's card style.

**Dark theme (dark backgrounds):**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
```

**Light theme (light backgrounds):**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}
```

### Page Structure

```tsx
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const App = () => {
  useSmoothScroll();
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <About />
        <Footer />
      </main>
      <WhatsAppFAB />
    </>
  );
};
```

### Section Pattern (every section follows this)

Adapt colors to the project theme. Use `@theme` CSS variables — never hardcode hex values.

**Dark theme:**
```tsx
<section className="py-24 md:py-32 relative">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="gradient-blob w-96 h-96 bg-primary/10 top-20 -end-32" />
  </div>
  <div className="max-w-6xl mx-auto px-5 md:px-8 text-center relative z-10">
    <span className="text-sm font-medium tracking-widest uppercase text-primary mb-3 block">
      Label Text
    </span>
    <h2 style={{ letterSpacing: '0.12em' }} className="text-4xl md:text-6xl font-bold mb-6">
      Section Heading
    </h2>
    <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">Description</p>
  </div>
</section>
```

**Light theme:**
```tsx
<section className="py-24 md:py-32 relative bg-bg">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="gradient-blob w-96 h-96 bg-primary/5 top-20 -end-32" />
  </div>
  <div className="max-w-6xl mx-auto px-5 md:px-8 text-center relative z-10">
    <span className="text-sm font-medium tracking-widest uppercase text-primary mb-3 block">
      Label Text
    </span>
    <h2 style={{ letterSpacing: '0.12em' }} className="text-4xl md:text-6xl font-bold text-text mb-6">
      Section Heading
    </h2>
    <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12">Description</p>
  </div>
</section>
```

Use whichever matches your design blueprint. Alternate `bg-bg` and `bg-bg-alt` between sections for rhythm.

---

## Phase 4: Review & QA

### 4A: Minimum Visual Quality Bar

Before any viewport testing, verify the quality bar from `project-standards`:

1. **Base Tier (10 patterns):** ALL must be present — section labels, letter-spaced headings, scroll animations, smooth scroll, scroll progress, animated backgrounds, button hierarchy, consistent centering, complete footer, WhatsApp FAB.
2. **Enhancement Tier (8 patterns):** Check if a style archetype was applied. If YES, follow the archetype's override table (some patterns get SKIPped or REPLACEd). If NO archetype, all 8 Enhancement patterns should be ON by default.

If 3+ Base Tier patterns are missing, stop and fix before continuing.

### 4B: Mobile-First Viewport Audit

Test in this order: **360px → 390px → 414px → 768px → 1440px**

At each viewport, check:

**UI (Visual Quality)**
- Typography hierarchy clear (h1 > h2 > h3)
- Line height: body 1.5-1.7, headings 1.05-1.2
- Consistent spacing between sections
- Cards have generous padding (24px+ on mobile)
- All content properly centered, no edge touching
- Background accents subtle (barely visible)
- Buttons have generous padding (px-8 py-4)
- Images not pixelated or awkwardly cropped

**UX (User Experience)**
- Headline communicates value in 3 seconds
- Page follows: Problem → Solution → Proof → Action
- CTAs visible at all times (hero, sticky FAB, footer)
- All tappable elements ≥ 44×44px
- No horizontal scroll
- Forms have large inputs, appropriate keyboard types
- WhatsApp links open correct app with pre-filled message
- Navigation smooth-scrolls to correct sections

### 4C: Functional QA (Browser Automation)

Test every interactive element:
- Navigation: logo click, menu items, mobile hamburger, close on link click
- Hero: CTA buttons work, animations play
- Scroll: reveals trigger, progress bar updates, Lenis smooth
- Carousels: swipe, arrows, RTL direction
- Modals: open/close, scroll lock, escape key
- WhatsApp FAB: visible, correct link format (`https://wa.me/972...`)
- Footer: all links work, back-to-top scrolls smoothly
- Forms: validation, submit, error states

### 4D: Pre-deploy Checks

```bash
# Check for accessibility issues
rg '<button[^>]*>' --include='*.tsx' | rg -v 'aria-label'
rg '<img[^>]*>' --include='*.tsx' | rg -v 'alt='
# Check for RTL violations (should use logical props)
rg '\b(ml-|mr-|pl-|pr-|text-left|text-right)\b' --include='*.tsx'
```

---

## Phase 5: Deploy

```bash
npm run build && npx base44 deploy -y && npx base44 site open
```

---

## Quick Reference

> Note: Gradient Blob CSS, Hebrew Global CSS, and all keyframes are consolidated in the "Setting Up index.css" section in Phase 3. The snippets below are kept as standalone reference.

### Gradient Blob CSS
```css
.gradient-blob {
  position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15;
  animation: blob-float 12s ease-in-out infinite alternate;
}
@keyframes blob-float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, -30px) scale(1.1); }
}
```

### Scroll Progress Bar
```tsx
import { motion, useScroll } from 'framer-motion';
const { scrollYProgress } = useScroll();
<motion.div style={{ scaleX: scrollYProgress }}
  className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-amber-500 origin-left z-50" />
```

### WhatsApp FAB
```tsx
<a href="https://wa.me/972XXXXXXXXX?text=היי" target="_blank" rel="noopener"
  className="fixed bottom-6 start-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg animate-pulse-gentle cursor-pointer">
  <MessageCircle className="w-6 h-6 text-white" />
</a>
```

### Hebrew Global CSS
```css
body, p, h1, h2, h3, h4, span, a, button, li {
  word-break: keep-all;
  overflow-wrap: break-word;
}
a, button, [role="button"] { cursor: pointer; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### ResponsiveImage — AVIF/WebP with Fallback

Use for ALL content images. Hero images should also be `<link rel="preload">` in index.html.

```tsx
interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  priority?: boolean;
}

export const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
}: ResponsiveImageProps) => {
  const basePath = src.replace(/\.[^.]+$/, '');
  const actualLoading = priority ? 'eager' : loading;

  return (
    <picture>
      <source srcSet={`${basePath}.avif`} type="image/avif" />
      <source srcSet={`${basePath}.webp`} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={actualLoading}
        decoding={priority ? 'sync' : 'async'}
        sizes={sizes}
        className={className}
      />
    </picture>
  );
};
```

**Image optimization workflow:**
1. Source images as high-quality JPEG/PNG
2. Generate AVIF + WebP versions (use Squoosh, Sharp, or cloud service)
3. Place all 3 formats at same path: `hero.jpg`, `hero.webp`, `hero.avif`
4. Use `priority={true}` for hero/above-fold images (sets `loading="eager"`)
5. All other images get `loading="lazy"` by default
6. Always set explicit `width` and `height` to prevent CLS

### Color Palette Derivation — 2 Client Colors → Full Palette

When the client provides only 2 colors (primary + secondary), derive the full 9-role palette:

```
Given: primary=#E0783F, secondary=#90A89E

Step 1: Determine theme darkness
  - If primary is dark (luminance < 0.3) → dark theme
  - If primary is light (luminance > 0.7) → light theme
  - Otherwise → light theme (safer default for most businesses)

Step 2: Derive background colors
  - Light theme:
    - bg: white shifted toward primary warmth (add 2-3% primary hue to #FAFAFA)
    - bg-alt: bg darkened 3-5% (mix bg with 5% primary)
    - card: pure white or bg lightened 2%
  - Dark theme:
    - bg: #0A0A0A shifted toward primary hue
    - bg-alt: #141414 shifted toward primary hue
    - card: #1A1A1A or bg lightened 5%

Step 3: Derive text colors
  - Light theme:
    - text: primary darkened to luminance 0.15 (near-black with primary warmth)
    - text-muted: text at 50% opacity equivalent
  - Dark theme:
    - text: #FFFFFF
    - text-muted: #8A8A8A

Step 4: Derive CTA colors
  - cta: primary color (or secondary if primary is too muted)
  - cta-text: white if CTA is dark enough (contrast ratio ≥ 4.5:1), otherwise text color

Step 5: Map to @theme
  @theme {
    --color-bg: [derived];
    --color-bg-alt: [derived];
    --color-card: [derived];
    --color-primary: [client primary];
    --color-cta: [derived or client primary];
    --color-cta-text: [derived for contrast];
    --color-text: [derived];
    --color-text-muted: [derived];
    --color-secondary: [client secondary];
  }
```

**Contrast check:** Every text/background pair must pass WCAG AA (4.5:1 for body text, 3:1 for large headings). If derived colors fail, adjust until they pass.

**When archetype exists:** The archetype provides a complete palette — only override with client-specified colors. The derivation above is for cases where NO archetype matches and the client only gave 2 colors.
