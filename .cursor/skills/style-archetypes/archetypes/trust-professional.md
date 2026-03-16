# Trust Professional — Design DNA

Reference: Law firms, private banks, medical clinics, financial advisors — industries where **trust and authority** are paramount.
Feel: **Authoritative, clean, trustworthy, refined.** Inspires confidence.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#FFFFFF` | `--color-bg` | Main page background |
| Background Alt | `#F5F6F8` | `--color-bg-alt` | Alternating section backgrounds |
| Card Background | `#FFFFFF` | `--color-card` | Cards, content blocks |
| Primary Accent | `#1a2d4a` | `--color-primary` | Headings, icons, key highlights |
| CTA Fill | `#1a2d4a` | `--color-cta` | Primary button backgrounds (deep navy) |
| CTA Text | `#FFFFFF` | `--color-cta-text` | Text on primary CTA buttons |
| Text Primary | `#1a2d4a` | `--color-text` | Headings, body text (deep navy) |
| Text Muted | `#5a6c7d` | `--color-text-muted` | Supporting text, descriptions |
| Accent Secondary | `#B8860B` | `--color-secondary` | Gold accent for awards, highlights, subtle emphasis |
| Quote Block | `#F0F2F5` | `--color-quote` | Testimonial card backgrounds (light grey) |

**Rules:**
- NEVER use bright or saturated colors — palette is restrained and conservative
- Backgrounds alternate between `bg` and `bg-alt` per section
- Gold accent used sparingly — max 1–2 instances per section (awards, key stats, subtle borders)
- Pure white (`#FFFFFF`) and near-white greys are acceptable — professional aesthetic

### CSS Theme Block

```css
@theme {
  --color-bg: #FFFFFF;
  --color-bg-alt: #F5F6F8;
  --color-card: #FFFFFF;
  --color-primary: #1a2d4a;
  --color-cta: #1a2d4a;
  --color-cta-text: #FFFFFF;
  --color-text: #1a2d4a;
  --color-text-muted: #5a6c7d;
  --color-secondary: #B8860B;
  --color-quote: #F0F2F5;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Playfair Display** | 400–600 | `0.06em` | `1.15` |
| Heading (H2–H3) | **Playfair Display** | 500–600 | `0.05em` | `1.25` |
| Body | **Source Sans 3** | 400 | `0.01em` | `1.65` |
| Label/Tag | **Source Sans 3** | 600 | `0.12em` uppercase | `1.4` |
| Caption | **Source Sans 3** | 400 | `0.02em` | `1.5` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
```

**Rules:**
- Hero text: `clamp(2.25rem, 4.5vw, 4rem)` for display headings
- Body: `clamp(1rem, 1.2vw, 1.125rem)`
- Labels always uppercase with moderate letter-spacing
- Headings use serif (Playfair Display), body uses sans-serif (Source Sans 3)
- Conservative pairing — no trendy or playful fonts

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-7xl` (1280px) | Wider than default — content-heavy sections |
| Section padding | `py-24 md:py-32` | Generous whitespace |
| Horizontal padding | `px-6 md:px-10` | Consistent with content density |
| Card padding | `p-8 md:p-10` | Generous internal spacing |
| Card border-radius | `rounded-lg` (8px) | Slight rounding — not pill-shaped |
| Section gap between elements | `space-y-6` or `gap-8` | Structured, never cramped |
| Hero height | `min-h-[80vh]` | Substantial but not fullscreen |
| Content alignment | Left-aligned or centered | Hero often centered; content blocks left-aligned for readability |
| Two-column ratio | `1:1` or `3:5` | Balanced, structured grid |
| Grid | Explicit columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) | Structured, predictable layouts |

**Whitespace conveys authority.** Generous margins and clear hierarchy. Content is king.

---

## Component DNA

### Buttons

```
Primary CTA:
- Shape: rounded rectangle (`rounded-lg`) — NOT pill, NOT rounded-full
- Background: var(--color-cta) (deep navy #1a2d4a)
- Text: var(--color-cta-text) (white #FFFFFF)
- Padding: px-8 py-3.5
- Font: Source Sans 3 600, tracking-wide
- Hover: slight darken (brightness-95) or opacity-95, NO translateY
- Min height: 48px

Secondary CTA:
- Shape: rounded rectangle (`rounded-lg`)
- Background: transparent
- Border: 1.5px solid var(--color-text-muted)
- Text: var(--color-text)
- Hover: border-color transitions to var(--color-primary), text darkens

WhatsApp CTA:
- Same as standard — green fill, min-h-[48px]
```

### Cards

```
Style: Clean bordered cards with subtle shadow — NO glassmorphism, NO backdrop-filter
- Background: var(--color-card) (white)
- Border: 1px solid rgba(26, 45, 74, 0.08)
- Shadow: 0 1px 3px rgba(0, 0, 0, 0.06)
- Border-radius: rounded-lg
- Hover: subtle shadow increase (0 4px 12px rgba(0, 0, 0, 0.08)), NO scale, NO 3D tilt

Quote Cards (testimonials):
- Background: var(--color-quote) (#F0F2F5)
- Border: 1px solid rgba(26, 45, 74, 0.06)
- Text: var(--color-text)
- Optional: thin left border (3px solid var(--color-secondary)) for accent
- Font: Source Sans 3 for quote text, Playfair Display for attribution
```

### Icons

```
Style: Outline only (stroke-width: 1.5)
- Source: Lucide React
- Size: w-6 h-6 for inline, w-10 h-10 for feature icons
- Color: var(--color-primary) or var(--color-text-muted)
- Container: circular background (rounded-full, border 1px solid rgba(26,45,74,0.12), p-4)
- NEVER filled/solid icons — always outline
- NEVER emoji
```

### Section Separators

```
- Primary: background color change between sections (bg ↔ bg-alt)
- Alternative: thin horizontal line (1px solid rgba(26, 45, 74, 0.08))
- NEVER decorative icons, gradient separators, or kinetic marquees
- Clean, minimal transitions only
```

---

## Section Recipes

Build sections in this order. Each section alternates background color.

### 1. Hero
- Layout: centered text + optional full-width background image (office, building, team)
- Large display heading in Playfair Display (500–600 weight)
- Subheadline in Source Sans 3 muted
- Primary CTA (solid navy, rounded-lg) + Secondary CTA (outline, rounded-lg)
- Background: white or very light grey; optional subtle gradient overlay on image
- Optional: stat bar below (years in business, clients served, awards)

### 2. About / History
- Layout: 2-column (image | text) or centered text block
- Heading: "Our Story" or "Since [Year]"
- Timeline or narrative blocks with clear hierarchy
- Generous spacing between paragraphs
- Optional: founding date, milestones in a clean list

### 3. Services / Practice Areas
- Layout: centered heading + grid of bordered cards (2–3 columns)
- Each card: icon in bordered circle + service name + brief description
- Heading: "Our Services" or "Practice Areas"
- CTA link per card or single "Learn More" below
- Structured, scannable layout

### 4. Team / Partners
- Layout: grid of team cards (2–4 columns)
- Each card: portrait (rounded-lg or circular) + name + title + short bio
- Heading: "Our Team" or "Meet Our Partners"
- Clean, professional headshots — no casual or lifestyle imagery
- Optional: credentials, bar memberships, certifications

### 5. Testimonials / Client Stories
- Layout: centered heading + 2–3 quote cards in grid or carousel
- Quote cards: light grey background, optional gold left border accent
- Attribution: "— Client Name, Title, Company"
- Optional: star ratings or case outcome summaries
- NO flashy carousel animations — simple fade or static grid

### 6. FAQ
- Layout: centered heading + accordion or expandable list
- Clean borders between items
- Source Sans 3 for questions, body text for answers
- Optional: "Contact us for more" CTA at bottom

### 7. Contact
- Layout: 2-column (form | contact info) or stacked on mobile
- Form: clean inputs with subtle borders
- Contact info: address, phone, email, hours
- Optional: map embed (minimal styling)
- Primary CTA: "Send Message" (solid navy)

### 8. Footer
- Layout: multi-column (links, contact, social) or centered
- Thin 1px separator above footer
- Navigation links, contact info, social icons (outline style)
- Copyright, legal links (Privacy, Terms)
- Back-to-top button (small, subtle)
- Background: bg-alt

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `600ms` |
| Easing | `cubic-bezier(0.25, 0.1, 0.25, 1)` or `ease-out` |
| Scroll entrance | Fade up only (`y: 20px → 0, opacity: 0 → 1`) — max 20px travel |
| Stagger | `80ms` between sibling elements |
| Hover transitions | `200ms ease` — color/opacity only, NO transform |
| Page scroll | Smooth (Lenis, lerp: `0.08`) |

**Preferred animation style:**
- Fade in on scroll (max 20px travel)
- Color/opacity hover transitions
- Smooth scroll
- Subtle shadow increase on card hover

**Avoid or use with extreme restraint:**
- Scale transforms on cards — use shadow increase instead
- Bounce or elastic easing — use `ease-out` only
- Parallax on text or images — too playful for professional
- Glitch, flash, or abrupt transitions — destroys trust

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | Professional, polished, high-end — corporate or institutional |
| Subjects | Office interiors, team portraits, handshakes, buildings, documents (blurred), medical/legal settings |
| Colors in photos | Navy, grey, white, wood tones — muted, desaturated |
| Backgrounds | Clean offices, conference rooms, neutral walls |
| Overlays | Very light grey tint (rgba(245, 246, 248, 0.3)) if needed for text contrast |
| Shape | Rectangular with `rounded-lg`, circular for portraits |
| Aspect ratio | 16:9 for hero, 4:3 or 1:1 for content, 1:1 for team portraits |
| Filters | Slight desaturation OK; avoid heavy filters — photos should feel credible |

---

## Anti-Patterns (things that BREAK this archetype)

- Bright or neon colors — destroys trust
- Playful or trendy fonts — stick to classic serif + sans pairing
- Emoji icons — use Lucide outline icons only
- Dense, cluttered layouts — maintain generous whitespace
- Rounded-full / pill buttons — use `rounded-lg` instead
- Heavy drop shadows — keep shadows subtle

---

## Tool Configuration Presets

Every tool adapts to this archetype's authoritative, restrained feel.

### premium-effects configurations

| Tool | Trust Professional Config | Notes |
|------|--------------------------|-------|
| `SparklesCore` | `particleDensity=12`, `speed=0.1`, `particleColor=` secondary (gold) at low opacity, `maxSize=0.8` | Near-invisible gold dust. Use in hero only if needed. Alternative: clean gradient overlay. |
| `Spotlight` | `fill=` primary at 5% opacity | Extremely faint. Usually better to skip for this archetype. |
| `ThreeDCard` | `intensity=2` | Nearly imperceptible tilt. Alternative: `box-shadow` increase on hover. |
| `BorderBeam` | `duration=18`, `colorFrom/colorTo=` secondary (gold) at 5% opacity | Ghost-like. Alternative: 1px solid border. |
| `ShimmerButton` | `shimmerColor='rgba(255,255,255,0.03)'`, `background='var(--color-cta)'` | Nearly invisible sweep. Alternative: solid navy `<button>`. |
| `NumberTicker` | `duration=2` | Standard. Works well for credentials ("25+ years"). |
| `LampEffect` | `color=` primary at 10% opacity, narrow | Very faint. Alternative: simple section with `bg-bg-alt`. |
| `MovingBorder` | `duration=18`, colors at 5% opacity | Barely visible. Alternative: `border-secondary/20`. |
| `BackgroundBeams` | colors at 3% opacity | Ghost beams. Footer only. Alternative: clean `bg-bg-alt` footer. |

### scroll-kinetics configurations

| Tool | Trust Professional Config | Notes |
|------|--------------------------|-------|
| `InfiniteMarquee` | `speed=60`, content at `opacity-20`, `text-xs tracking-[0.2em]` | Ultra-slow, whisper quiet. Alternative: thin 1px line separator. |
| `FlowingBackground` | `opacity=0.015`, `speed=70` | Ghost text. Alternative: clean alternating `bg`/`bg-alt`. |
| `ParallaxText` | `baseVelocity=0.5`, `className='text-primary/3'` | Nearly static. Alternative: none — static is often better for trust. |
| `SplashLoader` | `duration=2000` | Brief, no-nonsense. |

### Animation overrides

| Property | Trust Professional Value |
|----------|------------------------|
| ScrollReveal `y` | `20` |
| ScrollReveal `duration` | `0.6` |
| Lenis `lerp` | `0.08` |
| Stagger | `80ms` |
| Letter-spacing | `0.05-0.06em` |

### Card treatment

- Background: `var(--color-card)` (white) with `border border-gray-200`
- Shadow: `0 1px 3px rgba(0,0,0,0.05)`
- Hover: shadow increase to `0 4px 12px rgba(0,0,0,0.08)` — no transform
- Glassmorphism: dial down to `bg-white/90 backdrop-blur-sm` or skip blur entirely

### CTA treatment

- Shape: `rounded-lg` (NOT rounded-full)
- Fill: `var(--color-cta)` (deep navy)
- Text: white
- ShimmerButton: near-invisible sweep, or plain solid `<button>`

### Gradient text

- Preferred: solid navy `var(--color-text)`
- If gradient desired: very subtle navy-to-blue shift (`from-[#1a2d4a] to-[#2a4a6b]`)
