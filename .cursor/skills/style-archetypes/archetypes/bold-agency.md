# Bold Agency — Design DNA

Reference: Creative agencies, tech startups, SaaS companies, design studios, digital agencies, portfolio sites.
Feel: **Bold, dark, high-energy, futuristic.** Maximum visual impact. Cutting-edge and creative.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#0A0A0F` | `--color-bg` | Main page background (near-black) |
| Background Alt | `#0C0C14` | `--color-bg-alt` | Alternating section backgrounds |
| Card Background | `#12121A` | `--color-card` | Cards, content blocks (slightly lighter) |
| Primary Accent | `#7C3AED` | `--color-primary` | Electric purple — icons, highlights, gradients |
| CTA Fill | `#7C3AED` | `--color-cta` | Primary button (shimmer overlay) |
| CTA Text | `#FFFFFF` | `--color-cta-text` | Text on CTA buttons |
| Text Primary | `#FAFAFA` | `--color-text` | Headings, body text (off-white) |
| Text Muted | `#A1A1AA` | `--color-text-muted` | Supporting text, descriptions |
| Accent Secondary | `#3B82F6` | `--color-secondary` | Electric blue — secondary gradients, neon accents |
| Neon Accent | `#EC4899` | `--color-neon` | Pink/magenta for gradient tails, hover glows |
| Glass Overlay | `rgba(255,255,255,0.05)` | — | Glassmorphism card surfaces |

**Rules:**
- Backgrounds are ALWAYS dark — never light mode
- Primary + Secondary used together for gradients (purple → blue, purple → pink)
- High contrast: white text on near-black, electric accents pop
- Neon accent used sparingly for gradient tails and glow effects

### CSS Theme Block

```css
@theme {
  --color-bg: #0A0A0F;
  --color-bg-alt: #0C0C14;
  --color-card: #12121A;
  --color-primary: #7C3AED;
  --color-cta: #7C3AED;
  --color-cta-text: #FFFFFF;
  --color-text: #FAFAFA;
  --color-text-muted: #A1A1AA;
  --color-secondary: #3B82F6;
  --color-neon: #EC4899;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Syne** | 700–800 | `0.02em` to `0.05em` | `1.05` |
| Heading (H2–H3) | **Syne** | 700 | `0.03em` | `1.15` |
| Body | **DM Sans** | 400 | `0.01em` | `1.6` |
| Label/Tag | **DM Sans** | 600 | `0.2em` uppercase | `1.4` |
| Accent/Quote | **Syne** | 800 | `0.04em` | `1.2` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Rules:**
- Hero text: `clamp(3rem, 6vw, 6.5rem)` for display headings — BIG
- Body: `clamp(1rem, 1.2vw, 1.125rem)`
- Labels always uppercase with wide letter-spacing (0.15em–0.2em)
- Display headings use weight 700–800 — HEAVY
- Headings use Syne (geometric, bold), body uses DM Sans (clean, readable)

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-6xl` (1152px) | Centered with `mx-auto` |
| Section padding | `py-20 md:py-32` | Tight on mobile, dramatic on desktop |
| Horizontal padding | `px-5 md:px-8` | Standard |
| Card padding | `p-6 md:p-8` | Tighter than wellness — energy over breathing room |
| Card border-radius | `rounded-xl` (12px) or `rounded-2xl` | Slightly sharper than organic |
| Section gap between elements | `gap-6` or `gap-8` | Can be tight for grid density |
| Hero height | `min-h-[100vh]` | Full viewport — maximum impact |
| Content alignment | Asymmetric allowed | Hero can be left-aligned, grids can break center |
| Two-column ratio | `4:6` or `1:1` or `6:4` | Vary for visual tension |

**Full-bleed sections.** Asymmetric layouts create energy. When in doubt, go bolder.

---

## Component DNA

### Buttons

```
Primary CTA:
- Component: ShimmerButton (from premium-effects)
- Shape: rounded-lg or rounded-xl (NOT pill — sharper for agency)
- Background: gradient (primary → secondary) with shimmer overlay
- Text: white, Syne or DM Sans 600
- Padding: px-8 py-4
- Min height: 48px
- Hover: shimmer animation intensifies, subtle scale(1.02)

Secondary CTA:
- Shape: rounded-lg
- Background: transparent
- Border: 1.5px solid var(--color-primary) or rgba(124,58,237,0.5)
- Text: var(--color-text)
- Box-shadow: 0 0 20px rgba(124,58,237,0.2) on hover (glow)
- Hover: border glow intensifies, background rgba(124,58,237,0.05)
```

### Cards

```
Style: Glassmorphism WITH animated borders
- Background: rgba(255,255,255,0.03) to rgba(255,255,255,0.08)
- Backdrop-filter: blur(12px) to blur(20px)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: rounded-xl
- Animated border: BorderBeam (from premium-effects) — electric purple/blue
- 3D interaction: ThreeDCard with intensity 12+ for product/feature cards
- Hover: BorderBeam animates, ThreeDCard tilts, subtle lift

Portfolio/Work cards:
- Same glass + BorderBeam
- Image with gradient overlay (dark at bottom for text)
- Title + category label overlay
```

### Icons

```
Style: Filled or duotone (stroke-width: 2)
- Source: Lucide React
- Size: w-6 h-6 for inline, w-10 h-10 for feature icons
- Color: var(--color-primary) or var(--color-secondary)
- Container: rounded-lg or rounded-xl with bg-primary/10 or bg-secondary/10, p-3
- Filled icons for primary actions, duotone for features
- NEVER emoji
```

### Section Separators

```
- Primary: InfiniteMarquee or ParallaxText (from scroll-kinetics)
- Content: tech keywords, client logos, or abstract symbols
- Colors: primary, secondary, muted — alternating
- Speed: medium-fast for energy
- NEVER plain horizontal rules
- NEVER static dividers — kinetic energy required
```

---

## Section Recipes

Build sections in this order. Each section can alternate background (bg ↔ bg-alt) or use full-bleed effects.

### 1. Hero
- Layout: full viewport (100vh), centered or left-aligned text
- Large display heading in Syne 800 with gradient text (primary → secondary or primary → neon)
- SparklesCore + Spotlight (from premium-effects) in background
- Subheadline in DM Sans muted
- ShimmerButton primary CTA + outline secondary CTA with glow
- Optional: 3D element (FloatingProduct, MorphingSphere) or abstract gradient blobs

### 2. Manifesto / About
- Layout: centered or asymmetric — large statement block
- Heading: "We build digital experiences that matter" style
- LampEffect or BackgroundBeams for atmosphere
- Short manifesto paragraphs with bold lead lines
- Optional: animated stats (NumberTicker) inline

### 3. Work / Portfolio
- Layout: grid (2-col or 3-col) of ThreeDCard + BorderBeam cards
- Each card: image, gradient overlay, project title, category
- Hover: 3D tilt + BorderBeam animation
- Section label: "Selected Work" or "Our Work"
- Optional: filter tabs (All, Branding, Web, etc.)

### 4. Services
- Layout: 3-column or 4-column grid
- Each: glass card with BorderBeam, icon (filled in colored container), title, short description
- Icons: Lucide filled — Zap, Palette, Code, Rocket, etc.
- Heading: "What we do" or "Our services"

### 5. Clients / Logos
- Layout: InfiniteMarquee of client logos (grayscale or muted, hover: full color)
- Or: static grid with subtle hover scale
- Section label: "Trusted by" or "We've worked with"
- Background: bg-alt

### 6. Stats
- Layout: 4-column grid, full width
- Each: NumberTicker for metric + label
- "50+ Projects" / "12 Years" / "98% Satisfaction" style
- Glass cards or just text on dark bg
- FlowingBackground or gradient blob behind

### 7. Contact
- Layout: 2-column (form | info) or centered form
- Form: React Hook Form + Zod, glass-style inputs
- Primary CTA: ShimmerButton "Send" or "Let's Talk"
- Background: bg-alt, optional LampEffect or Spotlight

### 8. Footer
- Layout: multi-column — links, contact, social
- BackgroundBeams for atmosphere
- Social icons with hover glow
- Back-to-top button (small, outline with glow)
- Copyright, legal links
- Thin gradient line (primary → secondary) above footer content

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `400ms` |
| Easing | `cubic-bezier(0.34, 1.56, 0.64, 1)` (elastic) or `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) |
| Scroll entrance | Fade up with BIG travel (`y: 50px → 0` or `60px → 0`, opacity: 0 → 1) |
| Stagger | `80ms` to `120ms` between sibling elements |
| Hover transitions | `300ms` — scale, color, glow, transform |
| Page scroll | Smooth (Lenis, lerp: `0.1`) — responsive |

**Preferred animation style:**
- Fade in on scroll with 40–60px travel
- Scale transforms on cards (1.02–1.05)
- Elastic/bounce easing
- Parallax on text and images
- All premium-effects at high intensity
- All scroll-kinetics at fast speeds
- Staggered reveals with fast stagger (80–120ms)
- Glow pulses on hover

**Avoid:**
- Slow transitions (> 600ms) — too sluggish for this energy
- Linear easing — needs character
- Minimal movement (< 20px travel) — too timid
- Calm, meditative pacing — this is high-energy

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | Bold, high contrast, editorial, tech-forward |
| Subjects | Product shots, team, office, abstract visuals, UI mockups |
| Colors in photos | Dark tones, accent color overlays (purple/blue tint) |
| Backgrounds | Dark gradients, abstract shapes, grid patterns |
| Overlays | Dark gradient (rgba(10,10,15,0.6)) for text legibility |
| Shape | Sharp corners or rounded-xl, full-bleed hero images |
| Aspect ratio | 16:9 for hero, 4:3 or 1:1 for cards, 3:2 for portfolio |
| Filters | Slight desaturation + contrast boost, or accent color overlay |

---

## Anti-Patterns (things that BREAK this archetype)

- Light mode / white backgrounds — bold agency is dark
- Muted, pastel, or warm organic colors — kills the edge
- Serif fonts for headings — use geometric sans (Syne)
- Minimal, sparse layouts — needs density and energy
- Slow, calm animations — needs fast, dramatic motion
- Emoji icons — use Lucide only
- Wellness/calm aesthetic — wrong vibe entirely

---

## Tool Configuration Presets

This archetype uses ALL tools at **maximum intensity**. This is the full power showcase.

### premium-effects configurations

| Tool | Bold Agency Config | Notes |
|------|-------------------|-------|
| `SparklesCore` | `particleDensity=100`, `speed=0.6`, `particleColor=` primary, `maxSize=2.0` | Dense, vibrant particles. Hero + at least one more section. |
| `Spotlight` | `fill=` primary hex at full intensity | Bold cursor glow. Hero + features. |
| `ThreeDCard` | `intensity=12-14` | Dramatic tilt. All portfolio/feature cards. |
| `BorderBeam` | `duration=6`, `colorFrom/colorTo=` primary/secondary | Fast, vivid rotation. Featured cards. |
| `ShimmerButton` | `shimmerColor='rgba(255,255,255,0.15)'`, `background='var(--color-cta)'` | Bold sweep. Primary CTA. |
| `NumberTicker` | `duration=1.5` | Fast, punchy count. |
| `LampEffect` | `color=` primary at full intensity, wide spread | Dramatic cone. About/manifesto section. |
| `MovingBorder` | `duration=5`, vivid colors | Fast, visible rotation. Product/service cards. |
| `BackgroundBeams` | Full intensity primary/secondary | Prominent beams. Footer + dark sections. |

### scroll-kinetics configurations

| Tool | Bold Agency Config | Notes |
|------|-------------------|-------|
| `InfiniteMarquee` | `speed=15`, full opacity, `tracking-[0.2em] uppercase` | Fast, visible ticker. Between sections. |
| `FlowingBackground` | `opacity=0.06`, `speed=25`, outlined text | Bold background text. At least one section. |
| `ParallaxText` | `baseVelocity=5`, `className='text-primary/10'` | Fast, dramatic movement. Section dividers. |
| `SplashLoader` | `duration=1500` | Quick, energetic intro. |

### Animation overrides

| Property | Bold Agency Value |
|----------|------------------|
| ScrollReveal `y` | `50-60` |
| ScrollReveal `duration` | `0.4` |
| Lenis `lerp` | `0.1` |
| Stagger | `80-120ms` |
| Letter-spacing | `0.02-0.05em` |

### Card treatment

- Full glassmorphism: `bg-white/5 backdrop-blur-xl border border-white/10`
- Shadow: `0 8px 32px rgba(0,0,0,0.3)`
- Hover: scale 1.02 + glow shadow
- BorderBeam on featured cards

### CTA treatment

- ShimmerButton with bold shimmer
- Gradient backgrounds welcome: `bg-gradient-to-r from-primary to-secondary`
- Glow effect on hover: `shadow-primary/25`

### Gradient text

- Vivid multi-color gradients: `from-primary via-secondary to-neon`
- At least one hero heading + one section heading
