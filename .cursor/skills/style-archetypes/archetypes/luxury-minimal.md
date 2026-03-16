# Luxury Minimal — Design DNA

Reference: [Aman Resorts](https://www.aman.com/) — luxury hospitality brand.
Feel: **Aspirational, refined, restrained, architectural.** Less is more, every detail intentional.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#F5F3F0` | `--color-bg` | Warm off-white, almost stone |
| Background Alt | `#EDEAE6` | `--color-bg-alt` | Slightly darker warm grey |
| Card Background | `#FFFFFF` | `--color-card` | Clean white for cards |
| Primary Accent | `#8B7355` | `--color-primary` | Warm bronze — icons, lines, accents |
| CTA Fill | `#2C2824` | `--color-cta` | Near-black (warm charcoal) |
| CTA Text | `#F5F3F0` | `--color-cta-text` | Off-white on dark buttons |
| Text Primary | `#1A1714` | `--color-text` | Rich warm black |
| Text Muted | `#8A857E` | `--color-text-muted` | Warm grey |
| Accent Secondary | `#C4B5A0` | `--color-secondary` | Sand/champagne for subtle accents |

**Rules:**
- Restraint is everything — max 2 colors visible per section
- Bronze is used sparingly — thin lines, small accents, never as a fill
- Black and off-white do the heavy lifting
- NEVER use bright or saturated colors

### CSS Theme Block

```css
@theme {
  --color-bg: #F5F3F0;
  --color-bg-alt: #EDEAE6;
  --color-card: #FFFFFF;
  --color-primary: #8B7355;
  --color-cta: #2C2824;
  --color-cta-text: #F5F3F0;
  --color-text: #1A1714;
  --color-text-muted: #8A857E;
  --color-secondary: #C4B5A0;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Cormorant** | 300 | `0.06em` | `1.05` |
| Heading (H2–H3) | **Cormorant** | 400 | `0.04em` | `1.15` |
| Body | **Inter** | 300–400 | `0.01em` | `1.8` |
| Label/Tag | **Inter** | 400 | `0.2em` uppercase | `1.4` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&family=Inter:wght@300;400&display=swap" rel="stylesheet">
```

**Rules:**
- Hero text: `clamp(3rem, 6vw, 6rem)` — very large, light weight, commanding
- Body: light weight (300) for editorial feel
- Labels: wide letter-spacing creates architectural tension
- Heading-to-body contrast is extreme: thin serif vs. minimal sans
- No decorative or script fonts — purity of two typefaces only

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-7xl` (1280px) | Wider than default — luxury needs space |
| Section padding | `py-32 md:py-40` | Very generous — let sections breathe |
| Horizontal padding | `px-6 md:px-12` | |
| Card padding | `p-8 md:p-12` | Generous |
| Card border-radius | `rounded-none` or `rounded-sm` | Sharp, architectural |
| Hero height | `min-h-screen` | Full viewport |
| Content alignment | Mixed — centered heroes, asymmetric content sections |
| Two-column ratio | `5:7` | Image slightly larger |
| Grid gap | `gap-1` or `gap-2` | Tight grid for gallery, generous for content |

**Negative space is the primary design element.** Resist the urge to fill space.

---

## Component DNA

### Buttons

```
Primary CTA:
- Shape: square / sharp (`rounded-none` or `rounded-sm`)
- Background: var(--color-cta) (warm charcoal #2C2824)
- Text: var(--color-cta-text) (off-white)
- Padding: px-10 py-4
- Font: Inter 400, tracking-[0.15em] uppercase, text-sm
- Hover: opacity-90
- Min height: 48px

Secondary CTA:
- Shape: square (`rounded-none`)
- Background: transparent
- Border: 1px solid var(--color-text)
- Text: var(--color-text)
- Font: Inter 400, tracking-[0.15em] uppercase, text-sm
- Hover: bg-text text-bg (invert)
```

### Cards

```
Style: Sharp, minimal, architectural
- Background: var(--color-card) (white)
- Border: 1px solid rgba(0,0,0,0.06)
- Shadow: none
- Border-radius: rounded-none or rounded-sm
- Hover: none or very subtle border darken
- Property cards: image fills top, content below with bronze accent line
```

### Icons

```
Style: Thin line-art (stroke-width: 1)
- Source: Lucide React
- Size: w-5 h-5 inline, w-6 h-6 feature
- Color: var(--color-primary) (bronze)
- Container: none or minimal (no filled circles)
- Ultra-minimal — only use where functionally needed
```

### Section Separators

```
- Primary: whitespace alone — 80-120px between sections
- Decorative: single thin line (1px, primary at 10%, centered, max-w-16)
- Or: nothing — let content rhythm create separation
- NEVER thick dividers, gradient separators, or decorative icons
```

---

## Section Recipes

### 1. Hero
- Layout: full-bleed image (100vh) with minimal text overlay
- Very large display heading in Cormorant Light (300 weight)
- No subtitle or very short one-liner
- Single CTA: dark button, sharp corners, uppercase
- Image: aspirational architecture, landscape, or interior
- Overlay: minimal (20-30% dark, or bottom gradient only)

### 2. Introduction / Statement
- Layout: centered text only — no images, no icons
- One large statement heading
- Short supporting paragraph in muted text
- Bronze accent line above or below heading (thin, short)
- Pure typography as design element

### 3. Features / Highlights
- Layout: 2-column asymmetric (5:7) — large image + text
- Alternate sides per feature block
- Minimal text: heading + 2-3 sentences
- Image: architectural, wide crop, high quality
- Bronze label above heading

### 4. Gallery / Portfolio
- Layout: tight grid (gap-1 or gap-2) — no rounded corners
- 3-column on desktop, 2 on tablet, 1 on mobile
- Images edge-to-edge within cells
- Click-to-expand lightbox with dark background
- Optional: horizontal scroll on mobile

### 5. Key Numbers / Stats
- Layout: centered row of 3-4 stats
- Large numbers in Cormorant Light (very big: text-6xl)
- Labels below in Inter uppercase, muted
- NumberTicker for animation
- Thin dividers between stats (or generous spacing)

### 6. Testimonial
- Layout: single centered quote — large, editorial
- Quote in Cormorant Italic, very large (text-3xl+)
- No avatar, no card — just the quote
- Attribution below: name + role in Inter uppercase, small, muted
- Bronze quotation mark accent (optional)

### 7. Contact / Inquiry
- Layout: split (text/details | form) or full-width centered
- Minimal fields: name, email, phone, message
- Sharp-cornered inputs matching the architectural style
- Dark CTA button, uppercase

### 8. Footer
- Minimal: logo, few links, copyright
- Horizontal line separator
- Small text, wide letter-spacing
- No social icons or minimal (thin line icons only)
- Bronze accent on hover

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `900ms` |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration) |
| Scroll entrance | Fade only (`opacity: 0 → 1`) or very subtle up (`y: 15px → 0`) |
| Stagger | `120ms` between siblings |
| Hover transitions | `300ms ease` — subtle opacity or border changes |
| Page scroll | Lenis, lerp: `0.06` — very smooth, almost heavy |

**Preferred animation style:**
- Slow, deliberate fade-ins
- Minimal movement — opacity transitions dominate
- Parallax on hero image (very subtle, 5-10% range)
- Smooth, slow page scroll

**Avoid or use with extreme restraint:**
- Card lifts, scales, or bounces — too playful
- Fast stagger — keep it slow and stately
- Sparkles, particles, glowing effects — too decorative
- Marquees or kinetic text at visible opacity

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | Architectural, editorial, cinematic wide shots |
| Subjects | Buildings, interiors, landscapes, lifestyle (aspirational) |
| Colors in photos | Neutrals, stone, wood, warm metals, sky |
| Backgrounds | Natural settings, clean interiors, sky/horizon |
| Overlays | Minimal or none — image quality speaks for itself |
| Shape | Sharp corners (`rounded-none` or `rounded-sm`) |
| Aspect ratio | 16:9 for hero, 3:2 for features, 1:1 for gallery |
| Filters | None — raw, high-quality photography |

---

## Anti-Patterns (things that BREAK this archetype)

- Rounded, bubbly UI elements — too playful
- Bright or saturated accent colors — kills the restraint
- Decorative fonts, scripts, or cursive — too ornamental
- Dense content with icons and badges — too busy
- Gradient backgrounds or gradient text — too trendy
- Card shadows or glassmorphism — too decorative
- Multiple CTAs per section — one action, one focus
- Emoji or playful iconography

---

## Tool Configuration Presets

Every tool adapts to this archetype's restrained, architectural aesthetic. Use with extreme subtlety — luxury is knowing when NOT to add effects.

### premium-effects configurations

| Tool | Luxury Minimal Config | Notes |
|------|----------------------|-------|
| `SparklesCore` | `particleDensity=10`, `speed=0.08`, `particleColor=` secondary (#C4B5A0), `minSize=0.3`, `maxSize=0.8` | Barely-there floating dust. Hero only, almost invisible. Alternative: skip entirely. |
| `Spotlight` | Skip | Too decorative for this archetype. Use natural image lighting instead. |
| `ThreeDCard` | Skip | Too playful. Use `opacity` hover transitions instead. |
| `BorderBeam` | Skip | Too decorative. Use `1px solid` CSS border if any border needed. |
| `ShimmerButton` | `shimmerColor='rgba(139,115,85,0.03)'` over `bg-cta` | Nearly invisible bronze sweep. Alternative: plain dark button (preferred). |
| `NumberTicker` | `duration=3` | Slow, stately count-up. Fits the stats section. |
| `LampEffect` | Skip | Too dramatic. Use whitespace and typography instead. |
| `MovingBorder` | Skip | Too decorative. |
| `BackgroundBeams` | Skip | Too dramatic. |

### scroll-kinetics configurations

| Tool | Luxury Minimal Config | Notes |
|------|----------------------|-------|
| `InfiniteMarquee` | `speed=70`, content at `opacity-10`, `tracking-[0.3em] uppercase text-xs` | Ghost-level text, barely visible. Alternative: skip entirely. |
| `FlowingBackground` | `opacity=0.01`, `speed=80`, font: Cormorant | Almost invisible architectural text. |
| `ParallaxText` | `baseVelocity=0.5`, `className='text-secondary/3'` | Extremely subtle. Alternative: skip. |
| `SplashLoader` | `duration=3500`, `fadeDuration=1200` | Very slow, deliberate intro. |

### Animation overrides

| Property | Luxury Minimal Value |
|----------|---------------------|
| ScrollReveal `y` | `15` (minimal movement) |
| ScrollReveal `duration` | `0.9` (slow) |
| Lenis `lerp` | `0.06` (heavy, smooth) |
| Stagger between items | `120ms` |
| Letter-spacing on headings | `0.04-0.06em` |

### Card treatment

- Background: `white` — clean
- Border: `1px solid rgba(0,0,0,0.06)` — barely visible
- Shadow: `none` — shadows are too decorative
- Hover: border darkens slightly, or `opacity-80` on image
- Border-radius: `rounded-none` or `rounded-sm` — sharp, architectural
- Glassmorphism: never — too trendy

### CTA treatment

- Shape: `rounded-none` or `rounded-sm` — sharp, square
- Fill: `var(--color-cta)` (warm charcoal `#2C2824`)
- Text: off-white, uppercase, tracked
- ShimmerButton: near-invisible or skip entirely
- One CTA per section maximum

### Gradient text

- Avoid gradient text — solid colors preferred
- If absolutely needed: `from-[#8B7355] to-[#C4B5A0]` (bronze-to-sand), very subtle
- Solid `var(--color-text)` is almost always the better choice
