# Elegant Events — Design DNA

Reference: [Once Wed](https://oncewed.com/) — elegant wedding and event inspiration.
Feel: **Romantic, celebratory, timeless, editorial.** Emotion-driven, photography-forward.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#FDFBF8` | `--color-bg` | Warm ivory |
| Background Alt | `#F6F0E8` | `--color-bg-alt` | Soft champagne |
| Card Background | `#FFFFFF` | `--color-card` | Clean white |
| Primary Accent | `#B08968` | `--color-primary` | Warm gold/amber — elegant warmth |
| CTA Fill | `#8B6F4E` | `--color-cta` | Deeper gold — sophisticated |
| CTA Text | `#FFFFFF` | `--color-cta-text` | White on gold |
| Text Primary | `#2A2520` | `--color-text` | Rich warm dark brown |
| Text Muted | `#8C8178` | `--color-text-muted` | Warm taupe |
| Accent Secondary | `#D4C5B5` | `--color-secondary` | Soft tan/linen |

**Rules:**
- Palette is warm and neutral — golds, ivories, tans
- NEVER cold or clinical — always warm-shifted
- Gold/amber is the hero accent — used for CTAs, lines, highlights
- White + ivory create depth without color

### CSS Theme Block

```css
@theme {
  --color-bg: #FDFBF8;
  --color-bg-alt: #F6F0E8;
  --color-card: #FFFFFF;
  --color-primary: #B08968;
  --color-cta: #8B6F4E;
  --color-cta-text: #FFFFFF;
  --color-text: #2A2520;
  --color-text-muted: #8C8178;
  --color-secondary: #D4C5B5;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Italiana** | 400 | `0.05em` | `1.1` |
| Heading (H2–H3) | **Cormorant Garamond** | 400–500 | `0.03em` | `1.2` |
| Body | **Nunito Sans** | 300–400 | `0.01em` | `1.75` |
| Label/Tag | **Nunito Sans** | 500 | `0.18em` uppercase | `1.4` |
| Script Accent | **Great Vibes** | 400 | `0` | `1.2` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Cormorant+Garamond:wght@400;500;600&family=Nunito+Sans:wght@300;400;500&family=Great+Vibes&display=swap" rel="stylesheet">
```

**Rules:**
- Hero: Italiana for dramatic elegance (one font just for display)
- H2-H3: Cormorant Garamond for refined readability
- Body: light Nunito Sans for airiness
- Great Vibes for one romantic accent (couple names, "forever" style text)
- Never use Great Vibes for body text or buttons

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-6xl` (1152px) | |
| Section padding | `py-28 md:py-36` | Generous and romantic |
| Horizontal padding | `px-6 md:px-10` | |
| Card padding | `p-6 md:p-10` | |
| Card border-radius | `rounded-xl` to `rounded-2xl` | Soft but not bubbly |
| Hero height | `min-h-screen` | Full viewport with dramatic image |
| Content alignment | Center-dominant | Romantic centering |
| Two-column ratio | `1:1` | Balanced for elegance |
| Gallery grid | Masonry or tight grid with `gap-3` | |

**The images are the star.** Every layout decision serves the photography.

---

## Component DNA

### Buttons

```
Primary CTA:
- Shape: rounded (`rounded-lg` or `rounded-full`)
- Background: var(--color-cta) (deep gold #8B6F4E)
- Text: white
- Padding: px-8 py-3.5
- Font: Nunito Sans 500, tracking-wide
- Hover: brightness-110, subtle gold glow
- Min height: 48px

Secondary CTA:
- Shape: rounded
- Background: transparent
- Border: 1.5px solid var(--color-primary)
- Text: var(--color-text)
- Hover: bg-primary/5
```

### Cards

```
Style: Warm, light, editorial
- Background: var(--color-card) (white)
- Border: 1px solid var(--color-secondary) at 30%
- Shadow: 0 2px 12px rgba(0,0,0,0.04)
- Border-radius: rounded-xl
- Hover: subtle shadow increase

Event Cards:
- Large image (16:9 or 3:2)
- Event name, date, venue below
- Gold accent line or small decorative flourish
```

### Icons

```
Style: thin line-art (stroke-width: 1.5)
- Source: Lucide React
- Size: w-5 h-5 inline, w-8 h-8 feature
- Color: var(--color-primary) (gold)
- Container: optional thin circle or no container
```

### Section Separators

```
- Primary: background color alternation (ivory ↔ champagne)
- Decorative: small ornamental flourish centered (thin gold line with diamond ◇)
  or thin gold line (1px, max-w-24, centered, primary at 20%)
- NEVER heavy dividers
```

---

## Section Recipes

### 1. Hero
- Layout: full-bleed image with centered overlay text
- Italiana display heading — dramatic and large
- Optional: Great Vibes accent text (couple name, event tagline)
- Single gold CTA or scroll indicator
- Image: stunning event photography (wide, cinematic)
- Overlay: gentle gradient from bottom (30-40% dark)

### 2. About / Story
- Layout: centered or 2-column (portrait | story text)
- Personal narrative: "Our Story" / "הסיפור שלנו"
- Elegant typography with generous line-height
- Gold decorative accent (small flourish or line)

### 3. Services / Packages
- Layout: 2-3 column grid
- Each card: image + package name + brief description + starting price
- Featured package with gold border accent
- CTA: "Learn More" / "לפרטים נוספים"

### 4. Portfolio / Gallery
- Layout: masonry grid or curated grid
- Large, high-quality event photos
- Click-to-expand lightbox
- Optional: category tabs (Weddings, Corporate, Social)
- Captions with event name and venue

### 5. Testimonials
- Layout: centered single quote or elegant carousel
- Large italic serif quote (Cormorant Garamond)
- Gold quotation marks as decorative element
- Couple name + event type below

### 6. Timeline / Process
- Layout: vertical timeline with alternating sides
- Steps: Consultation → Planning → Day-Of → Memories
- Gold line connecting steps
- Icons at each step in gold circles

### 7. Contact / Inquiry
- Layout: split (romantic image | inquiry form)
- Fields: names, event date, event type, venue, message
- Gold CTA button
- Side: romantic image or floral accent

### 8. Footer
- Elegant, centered
- Script accent text ("Creating memories" / "יוצרים רגעים")
- Social icons (Instagram, Pinterest prominent)
- Copyright in muted text
- Gold accent on hover

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `800ms` |
| Easing | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Scroll entrance | Fade up (`y: 30px → 0, opacity: 0 → 1`) |
| Stagger | `100ms` between siblings |
| Hover transitions | `250ms ease` — soft and romantic |
| Page scroll | Lenis, lerp: `0.08` — smooth and dreamy |

**Preferred animation style:**
- Graceful fade-ins
- Image zoom on hover (1.05x, overflow hidden)
- Parallax on hero image (subtle, 10-15%)
- Smooth page scroll with buttery feel

**Avoid or use with extreme restraint:**
- Aggressive motion or quick snapping
- Glitch or tech-style effects
- Heavy particles or beams
- Bounce easing — use smooth curves

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | Editorial, romantic, warm natural light, golden hour |
| Subjects | Events, celebrations, venues, floral arrangements, details |
| Colors in photos | Warm golds, greens, whites, champagne, candlelight |
| Backgrounds | Outdoor venues, elegant interiors, garden settings |
| Overlays | Very light warm tint or gentle vignette |
| Shape | Rounded corners (`rounded-xl`), or flush for full-bleed |
| Aspect ratio | 3:2 or 16:9 for hero, 4:5 for portrait, 1:1 for grid |
| Filters | Slight warmth OK, warm and film-like feel preferred |

---

## Anti-Patterns (things that BREAK this archetype)

- Dark mode — events are warm and light
- Neon or electric colors — kills the romance
- Sharp, angular, brutalist design — too aggressive
- Dense layouts with small text — events need breathing room
- Cold stock photography — quality and warmth essential
- System or tech fonts — use serif elegance
- Multiple bright CTAs competing — one gold action per section
- Heavy glassmorphism or tech-forward effects

---

## Tool Configuration Presets

Every tool adapts to this archetype's romantic, warm elegance.

### premium-effects configurations

| Tool | Elegant Events Config | Notes |
|------|----------------------|-------|
| `SparklesCore` | `particleDensity=30`, `speed=0.18`, `particleColor=` gold (#B08968), `minSize=0.3`, `maxSize=1.5` | Golden fairy dust — perfect for hero and gallery sections. |
| `Spotlight` | `fill=` primary hex (#B08968), container opacity 8% | Warm gold glow. Subtle, romantic. |
| `ThreeDCard` | `intensity=4` | Subtle tilt on portfolio/service cards. |
| `BorderBeam` | `duration=12`, `colorFrom=#B08968`, `colorTo=#D4C5B5` at 12% opacity | Gold-to-linen rotation. Use on featured package card. |
| `ShimmerButton` | `shimmerColor='rgba(176,137,104,0.1)'`, `background='var(--color-cta)'` | Warm gold shimmer over deep gold button. |
| `NumberTicker` | `duration=2` | For stats: "200+ אירועים", "10 שנות ניסיון". |
| `LampEffect` | `color=` primary at 15% opacity | Warm golden cone above headings. Fits the romantic feel. |
| `MovingBorder` | `duration=12`, `colorFrom=#B08968`, `colorTo=#D4C5B5` at 10% | On featured testimonial or package card. |
| `BackgroundBeams` | `primaryColor/#B08968`, `secondaryColor/#D4C5B5` at 5% opacity | Very subtle in hero. Alternative: simple gradient overlay. |

### scroll-kinetics configurations

| Tool | Elegant Events Config | Notes |
|------|----------------------|-------|
| `InfiniteMarquee` | `speed=45`, content at `opacity-20`, `tracking-[0.2em] text-sm` | Slow romantic scroll: "Love · Joy · Celebration · Memories" |
| `FlowingBackground` | `opacity=0.02`, `speed=55`, font: Great Vibes or Italiana | Ghost script text, dreamy depth. |
| `ParallaxText` | `baseVelocity=1`, `className='text-primary/5'` | Subtle gold text movement. |
| `SplashLoader` | `duration=3000`, `fadeDuration=1000` | Romantic intro with gold accent and Great Vibes text. |

### Animation overrides

| Property | Elegant Events Value |
|----------|---------------------|
| ScrollReveal `y` | `30` |
| ScrollReveal `duration` | `0.8` |
| Lenis `lerp` | `0.08` |
| Stagger between items | `100ms` |
| Letter-spacing on headings | `0.03-0.05em` |

### Card treatment

- Background: `white`
- Border: `1px solid var(--color-secondary)` at 30% — warm linen edge
- Shadow: `0 2px 12px rgba(0,0,0,0.04)` — very soft
- Hover: shadow increase, image zoom (1.05x)
- Border-radius: `rounded-xl`

### CTA treatment

- Shape: `rounded-lg` or `rounded-full`
- Fill: `var(--color-cta)` (deep gold `#8B6F4E`)
- Text: white
- ShimmerButton: gold shimmer, subtle and warm

### Gradient text

- Preferred: `from-[#B08968] to-[#D4C5B5]` (gold-to-linen)
- Fits romantic headings well — use on 1-2 display headings
- Alternative: solid `var(--color-text)` with gold accent elsewhere
