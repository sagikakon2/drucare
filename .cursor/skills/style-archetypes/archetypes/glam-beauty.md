# Glam Beauty — Design DNA

Reference: [Glossier](https://www.glossier.com/) — minimalist beauty brand.
Feel: **Glamorous, soft, editorial, feminine.** Luxurious but approachable.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#FFF8F6` | `--color-bg` | Main page background (warm blush white) |
| Background Alt | `#FDF0EC` | `--color-bg-alt` | Alternating sections (soft peach tint) |
| Card Background | `#FFFFFF` | `--color-card` | Cards, content blocks (clean white) |
| Primary Accent | `#D4919B` | `--color-primary` | Dusty rose — icons, highlights, borders |
| CTA Fill | `#C77D88` | `--color-cta` | Rose gold CTA buttons |
| CTA Text | `#FFFFFF` | `--color-cta-text` | White on rose gold |
| Text Primary | `#2D2226` | `--color-text` | Rich dark brown (near-black, warm) |
| Text Muted | `#8A7178` | `--color-text-muted` | Muted mauve |
| Accent Secondary | `#E8C4A0` | `--color-secondary` | Champagne gold for tags, highlights |

**Rules:**
- NEVER use cold greys or blues — always warm-shifted
- Rose gold and champagne are the signature metals
- Backgrounds alternate between blush white and soft peach

### CSS Theme Block

```css
@theme {
  --color-bg: #FFF8F6;
  --color-bg-alt: #FDF0EC;
  --color-card: #FFFFFF;
  --color-primary: #D4919B;
  --color-cta: #C77D88;
  --color-cta-text: #FFFFFF;
  --color-text: #2D2226;
  --color-text-muted: #8A7178;
  --color-secondary: #E8C4A0;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Playfair Display** | 400–500 | `0.02em` | `1.1` |
| Heading (H2–H3) | **Playfair Display** | 500 | `0.02em` | `1.2` |
| Body | **Outfit** | 300–400 | `0.01em` | `1.7` |
| Label/Tag | **Outfit** | 500 | `0.18em` uppercase | `1.4` |
| Script Accent | **Dancing Script** | 400 | `0` | `1.3` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Outfit:wght@300;400;500&family=Dancing+Script:wght@400&display=swap" rel="stylesheet">
```

**Rules:**
- Hero text: `clamp(2.5rem, 5vw, 4.5rem)` — elegant, not overwhelming
- Body: light weight (300–400) for an airy, editorial feel
- Labels always uppercase with wide letter-spacing in champagne gold
- Use Dancing Script sparingly for one decorative accent ("feel beautiful" style tagline)
- Headings use serif (Playfair), body uses geometric sans (Outfit)

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-6xl` (1152px) | Centered with `mx-auto` |
| Section padding | `py-24 md:py-32` | Generous — beauty needs elegance space |
| Horizontal padding | `px-6 md:px-10` | |
| Card padding | `p-6 md:p-8` | |
| Card border-radius | `rounded-2xl` (16px) | Soft, feminine |
| Hero height | `min-h-[90vh]` | Near-fullscreen with imagery |
| Content alignment | Center-dominant | Hero centered, services in grid |
| Two-column ratio | `1:1` or `5:7` | Image equal or slightly larger |

**Whitespace is luxury.** Let the imagery breathe. Less text, more visual impact.

---

## Component DNA

### Buttons

```
Primary CTA:
- Shape: pill / fully rounded (`rounded-full`)
- Background: var(--color-cta) (rose gold #C77D88)
- Text: white
- Padding: px-8 py-3.5
- Font: Outfit 500, tracking-wide
- Hover: brightness-105, subtle glow shadow
- Min height: 48px

Secondary CTA:
- Shape: pill / fully rounded (`rounded-full`)
- Background: transparent
- Border: 1.5px solid var(--color-primary)
- Text: var(--color-text)
- Hover: bg-primary/5, border-color intensifies
```

### Cards

```
Style: Clean, minimal, hint of shadow
- Background: var(--color-card) (white)
- Border: 1px solid rgba(212,145,155,0.1) (rose tint)
- Shadow: 0 4px 20px rgba(0,0,0,0.04)
- Border-radius: rounded-2xl
- Hover: shadow increase + subtle lift (translateY(-2px))

Service Cards:
- Image on top (aspect 3:4 or 1:1)
- Service name + short description below
- Rose gold accent line or dot

Before/After Cards:
- Side-by-side or slider comparison
- Rounded corners, clean framing
```

### Icons

```
Style: line-art / outline (stroke-width: 1.5)
- Source: Lucide React
- Size: w-5 h-5 inline, w-8 h-8 feature
- Color: var(--color-primary) or var(--color-secondary)
- Container: circular background (rounded-full, bg-primary/5, p-3)
- NEVER filled/solid icons
```

### Section Separators

```
- Primary: background color change (bg ↔ bg-alt)
- Decorative: thin rose gold line (1px, primary at 15% opacity, max-w-20, centered)
- Or: small sparkle/diamond icon centered (✦) in primary color
- NEVER heavy dividers or gradient separators
```

---

## Section Recipes

### 1. Hero
- Layout: centered text with full-bleed background image, or split (text | glam photo)
- Large display heading in Playfair Display (400 weight)
- Optional: Dancing Script accent tagline ("feel your best")
- Primary CTA (rose gold pill) + Secondary CTA (outline pill)
- Background: lifestyle beauty image with very light warm overlay

### 2. Services / Treatments
- Layout: heading + 3–4 column grid of service cards
- Each card: image (3:4 portrait), service name, brief description, price range
- Heading: "Our Services" / "הטיפולים שלנו"
- Subtle hover lift on cards

### 3. Before & After / Gallery
- Layout: 2–3 column grid of before/after pairs or portfolio images
- Click-to-expand lightbox
- Clean framing with rounded corners
- Optional: category filter tabs above

### 4. About / Story
- Layout: 2-column (elegant portrait | text block)
- Personal story, qualifications, approach
- Decorative accent (Dancing Script quote or rose gold line)

### 5. Testimonials
- Layout: carousel or 2–3 column grid
- Quote cards with rose-tinted background or white with rose border
- Star ratings in champagne gold
- Client name + avatar

### 6. Booking / Contact
- Layout: split (info + form) or centered form
- Minimal fields: name, phone, service type dropdown
- CTA: rose gold pill "Book Now" / "לקביעת תור"
- Optional: working hours, location info on the side

### 7. Instagram / Social Feed
- Layout: grid of recent posts or curated images
- Link to Instagram profile
- Hashtag in champagne gold

### 8. Footer
- Clean, centered
- Logo, contact info, social icons, navigation
- Rose gold accent on social icon hover
- Copyright with warm muted text

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `700ms` |
| Easing | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Scroll entrance | Fade up (`y: 25px → 0, opacity: 0 → 1`) |
| Stagger | `80ms` between siblings |
| Hover transitions | `250ms ease` — shadow + lift |
| Page scroll | Lenis, lerp: `0.09` |

**Preferred animation style:**
- Smooth fade-in on scroll
- Subtle card lift on hover
- Image scale on hover (1.03x, overflow hidden)
- Elegant page transitions

**Avoid or use with extreme restraint:**
- Heavy parallax on text — images OK with subtle parallax
- Glitch, flash, or aggressive motion
- Bounce easing — use smooth ease-out
- Rapid stagger — keep it slow and elegant

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | Editorial, soft lighting, beauty/lifestyle photography |
| Subjects | Hands/nails close-ups, hair styling, treatment in progress, products |
| Colors in photos | Soft pinks, neutrals, warm tones, rose gold props |
| Backgrounds | Clean, minimal, studio-like or elegant salon interior |
| Overlays | Very light warm tint or none |
| Shape | Rounded corners (`rounded-2xl`), portrait orientation preferred |
| Aspect ratio | 3:4 or 1:1 for services, 16:9 for hero, 1:1 for portraits |
| Filters | Slight warmth (+5% warm) OK, never cold or desaturated |

---

## Anti-Patterns (things that BREAK this archetype)

- Dark mode / dark backgrounds — beauty is light and luminous
- Cold blues or clinical whites — kills the warmth
- Heavy blocky typography — breaks the feminine elegance
- Cluttered layouts — beauty needs space and elegance
- Stock photos that look generic — quality matters immensely
- System fonts — use serif + geometric sans pairing
- Emoji icons — use line-art Lucide icons only
- Aggressive, heavy-handed animations — keep it soft and graceful

---

## Tool Configuration Presets

Every tool adapts to this archetype's soft, glamorous feel.

### premium-effects configurations

| Tool | Glam Beauty Config | Notes |
|------|-------------------|-------|
| `SparklesCore` | `particleDensity=25`, `speed=0.2`, `particleColor=` champagne gold (#E8C4A0), `minSize=0.3`, `maxSize=1.2` | Soft golden dust. Hero only, very subtle. |
| `Spotlight` | `fill=` primary hex (#D4919B), container opacity 6% | Warm rose glow, barely visible. Optional. |
| `ThreeDCard` | `intensity=4` | Subtle tilt on service cards. Alternative: `translateY(-2px)` hover. |
| `BorderBeam` | `duration=14`, `colorFrom=#D4919B`, `colorTo=#E8C4A0` at 10% opacity | Rose-to-gold rotation, very subtle. |
| `ShimmerButton` | `shimmerColor='rgba(232,196,160,0.08)'`, `background='var(--color-cta)'` | Champagne shimmer over rose gold. |
| `NumberTicker` | `duration=2` | Standard. Good for "500+ לקוחות מרוצות" stats. |
| `LampEffect` | `color=` primary at 12% opacity, narrow | Faint rose cone. Alternative: simple heading. |
| `MovingBorder` | `duration=12`, `colorFrom=#D4919B`, `colorTo=#E8C4A0` at 8% opacity | Very subtle rose-gold border on featured card. |
| `BackgroundBeams` | Skip or use at 3% opacity | Too dramatic for beauty — use gradient blobs instead. |

### scroll-kinetics configurations

| Tool | Glam Beauty Config | Notes |
|------|-------------------|-------|
| `InfiniteMarquee` | `speed=50`, content at `opacity-20`, `tracking-[0.25em] uppercase text-xs` | Whisper-slow: "Beauty · Confidence · Elegance" |
| `FlowingBackground` | `opacity=0.015`, `speed=55`, font: Dancing Script | Ghost cursive text, barely visible. |
| `ParallaxText` | `baseVelocity=1.5`, `className='text-primary/5'` | Extremely subtle. |
| `SplashLoader` | `duration=2500`, `fadeDuration=800` | Elegant intro with rose gold accent. |

### Animation overrides

| Property | Glam Beauty Value |
|----------|-------------------|
| ScrollReveal `y` | `25` |
| ScrollReveal `duration` | `0.7` |
| Lenis `lerp` | `0.09` |
| Stagger between items | `80ms` |
| Letter-spacing on headings | `0.02em` |

### Card treatment

- Background: `white` — clean and bright
- Border: `1px solid rgba(212,145,155,0.1)` — rose tint
- Shadow: `0 4px 20px rgba(0,0,0,0.04)` — soft
- Hover: shadow increase + `translateY(-2px)` — subtle lift
- Glassmorphism: skip — prefer clean white cards with rose accent

### CTA treatment

- Shape: `rounded-full` pill
- Fill: `var(--color-cta)` (rose gold `#C77D88`)
- Text: white
- ShimmerButton: use with champagne shimmer, or plain button with `transition-all`

### Gradient text

- Preferred: `from-[#C77D88] to-[#E8C4A0]` (rose-to-champagne)
- Use sparingly — one headline per page maximum
- Alternative: solid `var(--color-text)` for most headings
