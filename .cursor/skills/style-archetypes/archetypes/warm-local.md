# Warm Local — Design DNA

Reference: Cozy restaurants, neighborhood bistros, artisan bakeries, wine bars.
Feel: **Warm, inviting, appetizing, authentic.** Like walking into a cozy restaurant.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#FBF8F3` | `--color-bg` | Main page background (warm cream) |
| Background Alt | `#F5F0EB` | `--color-bg-alt` | Alternating section backgrounds |
| Card Background | `#FDF9F5` | `--color-card` | Cards, menu blocks, content areas |
| Primary Accent | `#B8572A` | `--color-primary` | CTAs, highlights, key icons (burnt orange) |
| CTA Fill | `#B8572A` | `--color-cta` | Primary button backgrounds (terracotta) |
| CTA Text | `#FBF8F3` | `--color-cta-text` | Text on primary CTA buttons |
| Text Primary | `#3B2F2F` | `--color-text` | Headings, body text (warm brown) |
| Text Muted | `#6B5B52` | `--color-text-muted` | Supporting text, descriptions |
| Accent Secondary | `#5B6B4A` | `--color-secondary` | Olive green for tags, labels, accents |
| Gold Accent | `#C9A96E` | `--color-gold` | Specials, quotes, decorative highlights |

**Rules:**
- NEVER use pure black (`#000`) or pure white (`#FFF`) — always warm-shifted
- Backgrounds alternate between `bg` and `bg-alt` per section
- Terracotta primary used for CTAs and key highlights; olive and gold for variety
- Images are the star — let food photography dominate; colors support, not compete

### CSS Theme Block

```css
@theme {
  --color-bg: #FBF8F3;
  --color-bg-alt: #F5F0EB;
  --color-card: #FDF9F5;
  --color-primary: #B8572A;
  --color-cta: #B8572A;
  --color-cta-text: #FBF8F3;
  --color-text: #3B2F2F;
  --color-text-muted: #6B5B52;
  --color-secondary: #5B6B4A;
  --color-gold: #C9A96E;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Playfair Display** | 400–600 | `0.06em` | `1.15` |
| Heading (H2–H3) | **Playfair Display** | 500–600 | `0.04em` | `1.25` |
| Body | **Nunito** | 400 | `0.01em` | `1.65` |
| Label/Tag | **Nunito** | 600 | `0.12em` uppercase | `1.4` |
| Script Accent | **Caveat** | 400 | `0` | `1.3` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Caveat:wght@400&display=swap" rel="stylesheet">
```

**Rules:**
- Hero text: `clamp(2.5rem, 5vw, 5rem)` for display headings
- Body: `clamp(1rem, 1.2vw, 1.125rem)`
- Labels uppercase with moderate letter-spacing (menu categories, section labels)
- Use Caveat sparingly for "Today's Special" or handwritten-style accents
- Headings use warm serif (Playfair Display), body uses friendly rounded sans (Nunito)

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-6xl` (1152px) | Centered with `mx-auto` |
| Section padding | `py-20 md:py-28` | Medium — not as generous as wellness, not tight |
| Horizontal padding | `px-5 md:px-8` | Standard |
| Card padding | `p-6 md:p-8` | Comfortable internal spacing |
| Card border-radius | `rounded-2xl` (16px) | Warm, approachable |
| Section gap between elements | `space-y-5` or `gap-6` | Balanced |
| Hero height | `min-h-[80vh]` | Full hero with 2-column option |
| Content alignment | Center-dominant with menu-style grids | Hero can be split; content often centered |
| Two-column ratio | `1:1` or `5:6` | Text | image for hero; menu grids |

**Whitespace is medium.** Warm and inviting without feeling sparse. Menu-style grids feel curated, not cramped.

---

## Component DNA

### Buttons

```
Primary CTA:
- Shape: rounded rectangle (`rounded-xl`)
- Background: var(--color-cta) (terracotta #B8572A)
- Text: var(--color-cta-text) (cream #FBF8F3)
- Padding: px-8 py-3.5
- Font: Nunito 600, tracking-wide
- Hover: brightness-110, subtle translateY(-1px)
- Min height: 48px

Secondary CTA:
- Shape: rounded rectangle (`rounded-xl`)
- Background: transparent
- Border: 1.5px solid var(--color-primary)
- Text: var(--color-primary)
- Hover: bg-primary/5
```

### Cards

```
Style: Warm background cards, subtle shadow, NO glassmorphism
- Background: var(--color-card) or var(--color-bg-alt)
- Border: none or 1px solid rgba(184,87,42,0.08)
- Shadow: 0 4px 12px rgba(59,47,47,0.06)
- Border-radius: rounded-2xl
- Hover: shadow-lg (subtle lift), no scale, no animated borders

Menu Cards:
- Same as above, with optional small gold accent line at top
- Price in Playfair Display, muted
- Description in Nunito

Quote Cards (testimonials):
- Background: var(--color-card) with warm border
- Optional: var(--color-gold) at 10% opacity as accent strip
- Large decorative quotation mark (") in top-start corner
- Font: Playfair Display italic for quote text
```

### Icons

```
Style: line-art / outline only (stroke-width: 1.5)
- Source: Lucide React
- Size: w-5 h-5 for inline, w-8 h-8 for feature icons
- Color: var(--color-primary) or var(--color-text-muted)
- Container: NONE — inline with text, no circular background
- NEVER filled/solid icons — always outline
- NEVER emoji
```

### Section Separators

```
- Primary: background color change between sections (bg ↔ bg-alt)
- Decorative: small utensil/leaf/fork SVG icon centered between sections
  (20x20px, color: var(--color-primary), opacity: 0.35)
- Alternative: thin gold line (1px, var(--color-gold), opacity: 0.5)
- NEVER horizontal rules (<hr>) or thick dividers
- NEVER gradient separators
```

---

## Section Recipes

Build sections in this order. Each section alternates background color.

### 1. Hero
- Layout: 2-column (text | image) — text left, large food photo right
- Large display heading in Playfair Display (warm brown or terracotta)
- Subheadline in Nunito muted
- Primary CTA (rounded-xl, terracotta) + Secondary CTA (outline)
- Background: warm cream; image is hero — high-quality food/ambiance photo
- Optional: Caveat script for "Fresh daily" or tagline

### 2. About / Story
- Layout: 2-column (image | text) or centered text with image below
- Heading: "Our Story" or "Since 2010"
- Paragraph in Nunito, warm and personal
- Image: chef, kitchen, or interior — authentic, not stock

### 3. Menu / Highlights
- Layout: centered heading + menu-style grid (2–3 columns)
- Section label: "What we serve" or "Our Menu"
- Each card: image (optional), dish name (Playfair), description (Nunito muted), price
- Grid: rounded-2xl cards with subtle shadow
- Optional: category tabs (Starters, Mains, Desserts, Drinks)

### 4. Gallery
- Layout: 3-column masonry or uniform grid
- Large, high-quality food photography — THE star of this section
- Rounded corners (rounded-xl), no heavy borders
- Light overlay on hover (optional) — keep focus on images

### 5. Events / Hours
- Layout: 2-column (info block | photo) or single column
- Hours in clear typography, events with date/time
- CTA to reserve or view full schedule
- Background: bg-alt

### 6. Testimonials / Reviews
- Layout: 2–3 column grid of quote cards
- Customer quote in Playfair italic, name in Nunito
- Optional: star rating (Lucide Star outline in gold)
- Cards: warm background, subtle shadow

### 7. Reservation / Contact
- Layout: centered form or 2-column (form | map or image)
- Form: React Hook Form + Zod, warm-styled inputs
- Primary CTA: "Reserve a Table" or "Get in Touch"
- WhatsApp CTA (green) for quick contact

### 8. Footer
- Layout: centered or 3-column (hours | contact | social)
- Address, phone, email, social icons
- Optional: "Visit us" with map embed
- Copyright, back-to-top button
- Background: bg or bg-alt

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `500ms` |
| Easing | `cubic-bezier(0.25, 0.1, 0.25, 1)` or `ease-out` |
| Scroll entrance | Fade up only (`y: 25px → 0, opacity: 0 → 1`) |
| Stagger | `80ms` between sibling elements |
| Hover transitions | `200ms ease` — color/opacity/shadow only |
| Page scroll | Smooth (Lenis, lerp: `0.1`) |

**Preferred animation style:**
- Fade in on scroll (max 25px travel)
- Color/opacity/shadow hover transitions
- Smooth scroll
- Subtle shadow lift on menu cards

**Avoid or use with extreme restraint:**
- Scale transforms on cards — use shadow increase instead
- Bounce or elastic easing — use `ease-out`
- Parallax on text — images OK with very subtle parallax
- Glitch, flash, or abrupt transitions — breaks the warmth

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | Warm, appetizing, natural light, authentic |
| Subjects | Food close-ups, plated dishes, interior shots, chef at work, ingredients |
| Colors in photos | Warm browns, cream, terracotta, olive, gold — earthy and appetizing |
| Backgrounds | Wood tables, linen, brick, warm interiors |
| Overlays | Very light warm tint (rgba(251,248,243,0.08)) or none — let food shine |
| Shape | Rectangular with `rounded-xl` or `rounded-2xl` |
| Aspect ratio | 4:3 or 3:4 for content, 16:9 for hero, 1:1 for gallery tiles |
| Filters | None or very subtle warmth — photos must feel real and appetizing |

**Images are CRITICAL.** Large, high-quality food photography is the star of this archetype. Never use placeholder or low-res images in hero or gallery.

---

## Anti-Patterns (things that BREAK this archetype)

- Dark mode / dark backgrounds — warm local is light and inviting
- Neon or electric colors — kills the appetizing feel
- Brutalist or blocky typography — breaks the warmth
- Pure black text — use warm brown (`#3B2F2F`) instead
- System fonts or Inter/Roboto — use Playfair + Nunito pairing
- Emoji icons — use Lucide outline icons only
- Low-quality or stock-looking food photos — authenticity is key

---

## Tool Configuration Presets

Every tool adapts to this archetype's warm, inviting, appetizing feel.

### premium-effects configurations

| Tool | Warm Local Config | Notes |
|------|------------------|-------|
| `SparklesCore` | `particleDensity=25`, `speed=0.2`, `particleColor=` gold (`#C9A96E`), `maxSize=1.2` | Warm golden dust. Hero background only. |
| `Spotlight` | `fill=` primary (terracotta) at 10% opacity | Warm glow. Optional — gradient blobs may suffice. |
| `ThreeDCard` | `intensity=4` | Gentle tilt on menu cards. Alternative: shadow lift. |
| `BorderBeam` | `duration=14`, `colorFrom/colorTo=` gold/primary at 8% opacity | Warm, slow rotation. Alternative: `border-primary/10`. |
| `ShimmerButton` | `shimmerColor='rgba(255,255,255,0.06)'`, `background='var(--color-cta)'` | Subtle warm sweep. Alternative: solid terracotta `<button>`. |
| `NumberTicker` | `duration=2` | Standard. "15 שנים", "200+ מנות". |
| `LampEffect` | `color=` gold at 15% opacity | Warm cone, like a restaurant pendant light. |
| `MovingBorder` | `duration=12`, gold/primary at 10% opacity | Gentle. Alternative: warm CSS border. |
| `BackgroundBeams` | primary/gold at 5% opacity | Ghost warmth. Footer only. Alternative: clean warm footer. |

### scroll-kinetics configurations

| Tool | Warm Local Config | Notes |
|------|------------------|-------|
| `InfiniteMarquee` | `speed=45`, `opacity-30`, `text-xs tracking-[0.25em]` | Slow, warm ticker. Alternative: decorative fork/leaf icon separator. |
| `FlowingBackground` | `opacity=0.025`, `speed=50`, `fontFamily='Playfair Display'` | Ghost text in display font. Alternative: alternating `bg`/`bg-alt`. |
| `ParallaxText` | `baseVelocity=1.5`, `className='text-primary/5'` | Subtle warm movement. Alternative: centered quote. |
| `SplashLoader` | `duration=2000` | Warm, inviting intro. |

### Animation overrides

| Property | Warm Local Value |
|----------|-----------------|
| ScrollReveal `y` | `25` |
| ScrollReveal `duration` | `0.5` |
| Lenis `lerp` | `0.1` |
| Stagger | `80ms` |
| Letter-spacing | `0.04-0.06em` |

### Card treatment

- Background: `var(--color-card)` with `border border-primary/5`
- Shadow: `0 2px 8px rgba(0,0,0,0.04)`
- Hover: shadow increase to `0 4px 16px rgba(0,0,0,0.08)` — no scale
- Glassmorphism: dial down to `bg-white/70 backdrop-blur-sm` or skip blur

### CTA treatment

- Shape: `rounded-xl`
- Fill: `var(--color-cta)` (terracotta `#B8572A`)
- Text: `var(--color-cta-text)` (warm cream)
- ShimmerButton: near-invisible warm sweep, or solid `<button>`

### Gradient text

- Preferred: solid terracotta `var(--color-primary)` or warm brown `var(--color-text)`
- If gradient desired: warm tonal shift (`from-[#B8572A] to-[#C9A96E]`) — terracotta to gold
