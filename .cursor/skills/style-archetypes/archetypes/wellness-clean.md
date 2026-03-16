# Wellness Clean — Design DNA

Reference: [Ativo by VamTam](https://themes.vamtam.com/?theme=ativo&n=2) — Pilates & Yoga theme.
Feel: **Minimal, calm, organic, premium.** High-end but approachable.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#F8F7F5` | `--color-bg` | Main page background |
| Background Alt | `#F7EDE7` | `--color-bg-alt` | Alternating section backgrounds |
| Card Background | `#FDF7F5` | `--color-card` | Cards, content blocks |
| Primary Accent | `#E0783F` | `--color-primary` | Logo dot, icons, highlights |
| CTA Fill | `#FADBD1` | `--color-cta` | Primary button backgrounds (soft peach/coral) |
| CTA Text | `#3F4C47` | `--color-cta-text` | Text on CTA buttons |
| Text Primary | `#3F4C47` | `--color-text` | Headings, body text (dark forest green) |
| Text Muted | `#7A8A84` | `--color-text-muted` | Supporting text, descriptions |
| Accent Secondary | `#90A89E` | `--color-secondary` | Sage/olive green for quotes, tags |
| Quote Block | `#C4A892` | `--color-quote` | Testimonial card backgrounds (dusty rose/mauve) |

**Rules:**
- NEVER use pure black (`#000`) or pure white (`#FFF`) — always warm-shifted
- Backgrounds alternate between `bg` and `bg-alt` per section
- Accent colors used sparingly — max 2 per section

### CSS Theme Block

```css
@theme {
  --color-bg: #F8F7F5;
  --color-bg-alt: #F7EDE7;
  --color-card: #FDF7F5;
  --color-primary: #E0783F;
  --color-cta: #FADBD1;
  --color-cta-text: #3F4C47;
  --color-text: #3F4C47;
  --color-text-muted: #7A8A84;
  --color-secondary: #90A89E;
  --color-quote: #C4A892;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Cormorant Garamond** | 300–400 | `0.04em` | `1.1` |
| Heading (H2–H3) | **Cormorant Garamond** | 500 | `0.03em` | `1.2` |
| Body | **Nunito Sans** | 400 | `0.01em` | `1.7` |
| Label/Tag | **Nunito Sans** | 600 | `0.15em` uppercase | `1.4` |
| Script Accent | **Caveat** | 400 | `0` | `1.3` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Nunito+Sans:wght@400;600;700&family=Caveat:wght@400&display=swap" rel="stylesheet">
```

**Rules:**
- Hero text: `clamp(2.5rem, 5vw, 5rem)` for display headings
- Body: `clamp(1rem, 1.2vw, 1.125rem)`
- Labels always uppercase with wide letter-spacing
- Use Caveat sparingly for one decorative tagline or "just breathe" style accent
- Headings use serif (Cormorant), body uses sans-serif (Nunito Sans)

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-6xl` (1152px) | Centered with `mx-auto` |
| Section padding | `py-28 md:py-36` | Generous — wellness needs breathing room |
| Horizontal padding | `px-6 md:px-10` | Slightly wider than default |
| Card padding | `p-8 md:p-10` | Generous internal spacing |
| Card border-radius | `rounded-2xl` (16px) | Soft, organic |
| Section gap between elements | `space-y-6` or `gap-8` | Never tight |
| Hero height | `min-h-[85vh]` | Near-fullscreen hero |
| Content alignment | Center-dominant | Hero centered, content blocks often centered |
| Two-column ratio | `5:7` or `1:1` | Image slightly larger or equal |

**Whitespace is a first-class design element.** When in doubt, add more space, not less.

---

## Component DNA

### Buttons

```
Primary CTA:
- Shape: pill / fully rounded (`rounded-full`)
- Background: var(--color-cta) (soft peach #FADBD1)
- Text: var(--color-cta-text) (dark forest green #3F4C47)
- Padding: px-8 py-3.5
- Font: Nunito Sans 600, tracking-wide
- Hover: brightness-95, subtle translateY(-1px)
- Optional: small star/sparkle icon (✦) before or after text
- Min height: 48px

Secondary CTA:
- Shape: pill / fully rounded (`rounded-full`)
- Background: transparent
- Border: 1.5px solid var(--color-text-muted)
- Text: var(--color-text)
- Hover: border-color transitions to var(--color-primary)
```

### Cards

```
Style: NO hard borders, NO heavy shadows
- Background: var(--color-card) or var(--color-bg-alt)
- Border: none or 1px solid rgba(0,0,0,0.04)
- Shadow: none or 0 2px 8px rgba(0,0,0,0.03)
- Border-radius: rounded-2xl
- Hover: subtle shadow increase only (no scale, no lift)

Quote Cards (testimonials):
- Background: var(--color-secondary) or var(--color-quote)
- Text: white or var(--color-bg)
- Large decorative quotation mark (") in top-start corner
- Font: Cormorant Garamond italic for quote text
```

### Icons

```
Style: line-art / outline only (stroke-width: 1.5)
- Source: Lucide React
- Size: w-6 h-6 for inline, w-10 h-10 for feature icons
- Color: var(--color-primary) or var(--color-text-muted)
- Container: circular background (rounded-full, bg-bg-alt, p-4)
- NEVER filled/solid icons — always outline
- NEVER emoji
```

### Section Separators

```
- Primary: background color change between sections (bg ↔ bg-alt)
- Decorative: small teardrop/leaf SVG icon centered between sections
  (16x16px, color: var(--color-primary), opacity: 0.4)
- NEVER horizontal rules (<hr>) or thick dividers
- NEVER gradient separators
```

---

## Section Recipes

Build sections in this order. Each section alternates background color.

### 1. Hero
- Layout: centered text + full-width background image or split (text | image)
- Large display heading in Cormorant Garamond (300 weight, huge)
- Optional: decorative large letter (like a big "Y" or first letter) as watermark
- Subheadline in Nunito Sans muted
- Primary CTA (pill, peach) + Secondary CTA (pill, outline)
- Background: subtle warm gradient or lifestyle image with light overlay

### 2. Philosophy / Intro
- Layout: centered heading + 3-column icon grid below
- Heading: "Understanding the foundation of movement" style
- Each column: circular icon container + short title + description
- Icons: line-art in primary accent

### 3. About / Approach
- Layout: 2-column (image | text) or (text | image), alternating
- Multiple blocks: "Mind", "Mental Health", "Body" style
- Each with line-art icon, heading, paragraph
- Generous spacing between blocks

### 4. Classes / Services
- Layout: centered heading + horizontal scroll or grid of circular/rounded cards
- Each card: icon (line-art in circle) + class name + brief description
- Heading: "Find the right class for you"
- 3-4 cards per row on desktop, horizontal scroll on mobile

### 5. Events / Schedule
- Layout: 2-column (info block | photo)
- Date, time, instructor name
- CTA to book/register
- Background: bg-alt

### 6. Trainers / Team
- Layout: 2-column (photo | bio card in bg-alt)
- Heading: "Meet our people"
- Trainer name, role, short bio
- Optional: multiple trainers in grid

### 7. Membership / Pricing
- Layout: centered heading + pricing cards
- Clean, minimal pricing cards — no heavy borders
- Highlight recommended plan with primary accent border
- CTA: "Choose Plan" pill button

### 8. Community / Gallery
- Layout: 3-column mixed grid (text block + 2 image cards)
- Or: social media hashtag grid (#ativoyoga style)
- Mix of lifestyle photos and quote cards (sage/dusty rose backgrounds)

### 9. Shop (optional)
- Layout: hero image + text block overlay
- "Organic cotton collection" style
- CTA to browse products

### 10. Footer
- Layout: centered
- Inspirational closing line: "Invest in your health"
- Contact info, navigation links, social icons
- Thin line separator above copyright
- Back-to-top button (small "UP" circle)
- Background: bg or bg-alt

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `800ms` |
| Easing | `cubic-bezier(0.25, 0.1, 0.25, 1)` or `ease-out` |
| Scroll entrance | Fade up only (`y: 30px → 0, opacity: 0 → 1`) |
| Stagger | `100ms` between sibling elements |
| Hover transitions | `200ms ease` — color/opacity only |
| Page scroll | Smooth (Lenis, lerp: `0.08`) — slower than default |

**Preferred animation style:**
- Fade in on scroll
- Subtle slide up on scroll (max 30px travel)
- Color/opacity hover transitions
- Smooth scroll

**Avoid or use with extreme restraint:**
- Scale transforms on cards — use `translateY(-2px)` instead
- Bounce or elastic easing — use `ease-out` only
- Parallax on text — images OK with very subtle parallax
- Glitch, flash, or abrupt transitions — breaks the calm

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | Natural, lifestyle-focused, soft natural light |
| Subjects | Yoga poses, meditation, studio settings, nature elements |
| Colors in photos | Olive green, cream, beige, sage, soft greys |
| Backgrounds | Light walls, wood floors, minimal props |
| Overlays | Very light warm tint (rgba(248,247,245,0.1)) or none |
| Shape | Rectangular with `rounded-2xl`, or circular for instructor portraits |
| Aspect ratio | 4:3 or 3:4 for content, 16:9 for hero, 1:1 for portraits |
| Filters | None — photos should feel real, not filtered |

---

## Anti-Patterns (things that BREAK this archetype)

- Dark mode / dark backgrounds — wellness is light and airy
- Neon or electric colors — kills the calm
- Brutalist or blocky typography — breaks the elegance
- Dense information layouts — wellness needs breathing room
- Pure black text — use warm dark green/charcoal instead
- System fonts or Inter/Roboto — too generic, use serif + sans pairing
- Emoji icons — use line-art Lucide icons only

---

## Tool Configuration Presets

Every tool adapts to this archetype's calm, organic feel. These are the **recommended presets** — the Design Blueprint can adjust further based on the client brief.

### premium-effects configurations

| Tool | Wellness Config | Notes |
|------|----------------|-------|
| `SparklesCore` | `particleDensity=20`, `speed=0.15`, `particleColor=` primary at warm gold, `minSize=0.4`, `maxSize=1.0` | Barely-there warm dust. Use in hero only, behind content. |
| `Spotlight` | `fill=` primary hex, container opacity 8% | Very soft warm glow, barely visible. Optional — gradient blobs may suffice. |
| `ThreeDCard` | `intensity=3` | Barely perceptible tilt. Alternative: `translateY(-2px)` hover only. |
| `BorderBeam` | `duration=16`, `colorFrom/colorTo=` primary/secondary at 8% opacity | Ghost-like rotation, almost invisible. Alternative: 1px CSS border. |
| `ShimmerButton` | `shimmerColor='rgba(255,255,255,0.05)'`, `background='var(--color-cta)'` | Near-invisible sweep over soft peach fill. Alternative: plain pill button. |
| `NumberTicker` | `duration=2.5` | Slightly slower count. Standard usage. |
| `LampEffect` | `color=` primary at 15% opacity, narrow width | Very faint warm cone. Alternative: simple heading with gradient blob behind. |
| `MovingBorder` | `duration=14`, `colorFrom/colorTo=` primary/cta at 10% opacity | Extremely subtle. Alternative: static warm border. |
| `BackgroundBeams` | `primaryColor/secondaryColor=` primary/secondary at 5% opacity | Ghost beams. Use in footer only. Alternative: clean dark footer. |

### scroll-kinetics configurations

| Tool | Wellness Config | Notes |
|------|----------------|-------|
| `InfiniteMarquee` | `speed=55`, content at `opacity-25`, `tracking-[0.3em] uppercase text-xs` | Zen-slow whisper. Alternative: decorative leaf/teardrop icon separator. |
| `FlowingBackground` | `opacity=0.02`, `speed=60`, `fontSize='clamp(4rem, 8vw, 7rem)'` | Ghost text, barely visible. Alternative: alternating bg/bg-alt sections. |
| `ParallaxText` | `baseVelocity=1`, `className='text-primary/5'` | Extremely subtle movement. Alternative: static centered quote. |
| `SplashLoader` | `duration=3000`, `fadeDuration=1000` | Slow, meditative intro. |

### Animation overrides

| Property | Wellness Value |
|----------|---------------|
| ScrollReveal `y` | `30` (not default 40) |
| ScrollReveal `duration` | `0.8` |
| Lenis `lerp` | `0.08` (slower than default 0.1) |
| Stagger between items | `100ms` |
| Letter-spacing on headings | `0.03-0.04em` (subtler than default 0.1em+) |

### Card treatment

- Background: `var(--color-card)` or `var(--color-bg-alt)` — soft warm fill
- Border: `none` or `1px solid rgba(0,0,0,0.04)`
- Shadow: `none` or `0 2px 8px rgba(0,0,0,0.03)`
- Hover: subtle shadow increase only — no scale, no lift
- Glassmorphism: dial down to `bg-white/60 backdrop-blur-sm` or skip blur entirely

### CTA treatment

- Shape: `rounded-full` pill
- Fill: `var(--color-cta)` (soft peach `#FADBD1`)
- Text: `var(--color-cta-text)` (dark forest green)
- ShimmerButton: use with near-invisible shimmer, or plain `<button>` with `transition-colors`

### Gradient text

- Preferred: solid warm text in `var(--color-text)`
- If gradient desired: very subtle tonal shift within the warm palette (e.g. `from-[#3F4C47] to-[#5a6c7d]`) — no bright or multi-color gradients
