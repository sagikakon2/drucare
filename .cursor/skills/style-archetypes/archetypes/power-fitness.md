# Power Fitness — Design DNA

Reference: [Barry's](https://www.barrys.com/) — high-energy fitness brand.
Feel: **Powerful, energetic, bold, motivating.** Dark, intense, action-driven.

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#0A0A0A` | `--color-bg` | Deep black |
| Background Alt | `#141414` | `--color-bg-alt` | Slightly lighter black |
| Card Background | `#1A1A1A` | `--color-card` | Dark grey for cards |
| Primary Accent | `#FF3B30` | `--color-primary` | High-energy red — power, intensity |
| CTA Fill | `#FF3B30` | `--color-cta` | Red CTA — impossible to miss |
| CTA Text | `#FFFFFF` | `--color-cta-text` | White on red |
| Text Primary | `#FFFFFF` | `--color-text` | Pure white on dark |
| Text Muted | `#8A8A8A` | `--color-text-muted` | Mid grey |
| Accent Secondary | `#FF6B35` | `--color-secondary` | Orange for secondary highlights |

**Rules:**
- Dark mode is the ONLY mode — fitness is dark, intense, powerful
- Red is the hero accent — aggressive, energizing, action-driving
- White text on dark backgrounds for maximum contrast
- Orange as secondary accent — never compete with red, use sparingly

### CSS Theme Block

```css
@theme {
  --color-bg: #0A0A0A;
  --color-bg-alt: #141414;
  --color-card: #1A1A1A;
  --color-primary: #FF3B30;
  --color-cta: #FF3B30;
  --color-cta-text: #FFFFFF;
  --color-text: #FFFFFF;
  --color-text-muted: #8A8A8A;
  --color-secondary: #FF6B35;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display (Hero) | **Bebas Neue** | 400 | `0.08em` | `0.95` |
| Heading (H2–H3) | **Bebas Neue** | 400 | `0.06em` | `1.0` |
| Body | **DM Sans** | 400 | `0.01em` | `1.7` |
| Label/Tag | **DM Sans** | 500 | `0.2em` uppercase | `1.4` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

**Rules:**
- Hero: `clamp(4rem, 10vw, 10rem)` — HUGE, commanding, uppercase
- Bebas Neue is uppercase only — never use it for lowercase body text
- DM Sans for everything readable — clean, modern, no-nonsense
- Tight line-height on display text (0.95) — stacked letters, impactful
- Wide letter-spacing creates power and presence

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-7xl` (1280px) | Wide — fill the screen |
| Section padding | `py-20 md:py-28` | Less padding than luxury — tighter, more intense |
| Horizontal padding | `px-5 md:px-8` | |
| Card padding | `p-6 md:p-8` | |
| Card border-radius | `rounded-xl` | |
| Hero height | `min-h-screen` | Full viewport, always |
| Content alignment | Mixed — centered heroes, left-aligned content |
| Grid | 2-3 columns, tight gaps | |

**Density and intensity.** More content per viewport than calm archetypes.

---

## Component DNA

### Buttons

```
Primary CTA:
- Shape: rounded (`rounded-lg`)
- Background: var(--color-cta) (red #FF3B30)
- Text: white, uppercase, bold
- Padding: px-8 py-4
- Font: DM Sans 700, tracking-wider, uppercase
- Hover: brightness-110, scale(1.02)
- Min height: 52px — larger than default, commanding

Secondary CTA:
- Shape: rounded (`rounded-lg`)
- Background: transparent
- Border: 2px solid white/30
- Text: white, uppercase
- Hover: border-white, bg-white/5
```

### Cards

```
Style: Dark, bordered, glassmorphic
- Background: var(--color-card) or bg-white/5 backdrop-blur-md
- Border: 1px solid white/10
- Shadow: none or 0 0 30px rgba(255,59,48,0.05) (red ambient glow)
- Border-radius: rounded-xl
- Hover: border brightens (white/20), subtle red glow

Class/Program Cards:
- Dark image with red overlay gradient
- Bold title, time, intensity level
- Red accent elements (dot, line, tag)
```

### Icons

```
Style: bold line-art (stroke-width: 2)
- Source: Lucide React
- Size: w-6 h-6 inline, w-10 h-10 feature
- Color: var(--color-primary) (red) or white
- Container: dark circle with red border or red fill
- Bold and visible — fitness doesn't whisper
```

### Section Separators

```
- Primary: subtle change between bg and bg-alt
- Decorative: red accent line (2px, primary, max-w-20, centered)
- Or: InfiniteMarquee strip with motivational text
- Bold dividers OK — this archetype has energy to spare
```

---

## Section Recipes

### 1. Hero
- Layout: full-bleed video or image with bold centered text
- MASSIVE heading in Bebas Neue — takes up 60%+ of hero
- Short motivational subtitle in DM Sans
- Red CTA: "START NOW" / "להתחיל עכשיו" — big and bold
- Background: action video (training footage) or high-contrast photo
- Overlay: 40-50% dark with optional red gradient from bottom

### 2. Programs / Classes
- Layout: grid of cards (2-3 columns)
- Each: dark image with overlay, class name (Bebas Neue), intensity, duration
- Red accent elements: difficulty dots, fire icons, border glow
- Hover: image scale, border brighten
- Heading: "OUR PROGRAMS" style, uppercase

### 3. Results / Transformation
- Layout: stat counters + before/after or testimonials
- Large red numbers (NumberTicker): members, classes/week, years
- Bold impact: "500+ Members | 50 Classes/Week | 8 Years"
- Optional: before/after transformation photos

### 4. Trainers
- Layout: grid of trainer cards
- Dark portrait photos, intense expressions
- Name in Bebas Neue, specialty in DM Sans
- Red accent on hover (border glow or name highlight)
- Social links in red-on-dark circles

### 5. Schedule
- Layout: day-based table or card grid
- Dark table with red highlights for popular classes
- Filter by class type or day
- CTA: "BOOK YOUR SPOT" in red

### 6. Pricing / Membership
- Layout: 2-3 pricing cards
- Featured plan: red border, red glow, "MOST POPULAR" badge
- Dark cards with white text, feature checkmarks in red
- Bold pricing numbers in Bebas Neue

### 7. Testimonials
- Layout: carousel or grid with dark cards
- Bold quotes, white text
- Red quotation marks
- Member name + transformation stats

### 8. CTA Section
- Layout: full-width dark section with centered bold text
- Motivational headline: "YOUR JOURNEY STARTS HERE"
- Red CTA button, centered
- Optional: SparklesCore or BackgroundBeams for atmosphere

### 9. Footer
- Dark, minimal
- Logo, links, social icons
- Red accent on hover
- Strong presence — even the footer is intense

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | `600ms` |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` (fast start, smooth landing) |
| Scroll entrance | Fade up with impact (`y: 40px → 0, opacity: 0 → 1`) |
| Stagger | `60ms` between siblings — fast cascade |
| Hover transitions | `200ms ease` — snappy, responsive |
| Page scroll | Lenis, lerp: `0.12` — faster, more responsive than default |

**Preferred animation style:**
- Fast, impactful entrances
- Card border glow on hover
- Scale + brightness on hover
- Aggressive parallax on images (15-20%)
- Quick stagger — dominoes falling

**Avoid or use with extreme restraint:**
- Slow, dreamy fades — too soft
- Thin, delicate animations — too precious
- Bounce easing — too playful (use strong ease-out)
- Gentle, barely-visible effects — fitness hits hard

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | High-contrast, dramatic lighting, action-focused |
| Subjects | Training, movement, intensity, determination, equipment |
| Colors in photos | Dark backgrounds, warm skin tones, red/orange accents |
| Backgrounds | Gym interiors, dark studios, dramatic lighting |
| Overlays | Dark overlay (40-50%) or red gradient tint |
| Shape | Rounded corners (`rounded-xl`) or full-bleed |
| Aspect ratio | 16:9 for hero, 3:4 for trainers, 1:1 for grid |
| Filters | High contrast, slight desaturation OK for moody feel |

---

## Anti-Patterns (things that BREAK this archetype)

- Light mode / pastel backgrounds — fitness is dark and intense
- Thin, delicate typography — too precious
- Rounded pill buttons — too soft (use rounded-lg, not rounded-full)
- Gentle, slow animations — too sleepy
- Floral or organic motifs — wrong energy
- Serif fonts — too traditional
- Muted, desaturated accent colors — red needs to POP
- Excessive whitespace — fill the space with energy

---

## Tool Configuration Presets

Every tool cranks up to match this archetype's high energy.

### premium-effects configurations

| Tool | Power Fitness Config | Notes |
|------|---------------------|-------|
| `SparklesCore` | `particleDensity=80`, `speed=0.5`, `particleColor=` red (#FF3B30) or orange (#FF6B35), `minSize=0.5`, `maxSize=2.0` | Intense particle field. Use in hero and CTA section. |
| `Spotlight` | `fill=#FF3B30`, container opacity 15% | Red spotlight following cursor — dramatic. |
| `ThreeDCard` | `intensity=10` | Full tilt on program/trainer cards. |
| `BorderBeam` | `duration=6`, `colorFrom=#FF3B30`, `colorTo=#FF6B35` at 30% opacity | Fast, visible red-orange rotation. On featured cards. |
| `ShimmerButton` | `shimmerColor='rgba(255,255,255,0.2)'`, `background='var(--color-cta)'` | Bold white sweep over red. |
| `NumberTicker` | `duration=1.5` | Fast, punchy count-up for stats. |
| `LampEffect` | `color=#FF3B30` at 25% opacity, wide | Red dramatic cone. Perfect for CTA section heading. |
| `MovingBorder` | `duration=6`, `colorFrom=#FF3B30`, `colorTo=#FF6B35` at 25% | Fast, aggressive border. Featured membership card. |
| `BackgroundBeams` | `primaryColor=#FF3B30`, `secondaryColor=#FF6B35` at 15% opacity | Red-orange beams. Hero or CTA section. |

### scroll-kinetics configurations

| Tool | Power Fitness Config | Notes |
|------|---------------------|-------|
| `InfiniteMarquee` | `speed=25`, `tracking-[0.15em] uppercase font-bold` | Fast, aggressive: "PUSH · SWEAT · TRANSFORM · REPEAT" |
| `FlowingBackground` | `opacity=0.04`, `speed=30`, font: Bebas Neue | Bold ghost text, visible. "STRENGTH" / "POWER" |
| `ParallaxText` | `baseVelocity=3`, `className='text-primary/10 font-bold uppercase'` | Visible red text movement. |
| `SplashLoader` | `duration=1800`, `fadeDuration=600` | Fast, punchy intro — no lingering. |

### Animation overrides

| Property | Power Fitness Value |
|----------|---------------------|
| ScrollReveal `y` | `40` (big entrance) |
| ScrollReveal `duration` | `0.6` (fast) |
| Lenis `lerp` | `0.12` (responsive, fast) |
| Stagger between items | `60ms` (rapid cascade) |
| Letter-spacing on headings | `0.06-0.08em` (wide, powerful) |

### Card treatment

- Background: `var(--color-card)` or `bg-white/5 backdrop-blur-md`
- Border: `1px solid white/10`
- Shadow: optional `0 0 30px rgba(255,59,48,0.05)` (red ambient glow)
- Hover: border brightens to `white/20`, subtle red glow, scale(1.01)
- Glassmorphism: YES — dark glass cards are the default

### CTA treatment

- Shape: `rounded-lg` — strong but not soft
- Fill: `var(--color-cta)` (red `#FF3B30`)
- Text: white, uppercase, bold, tracked
- ShimmerButton: bold white sweep, fully visible
- Size: larger than default (`min-h-[52px]`, `text-base` or `text-lg`)

### Gradient text

- Preferred: `from-[#FF3B30] to-[#FF6B35]` (red-to-orange, intense)
- Use on primary display headings — makes them burn
- Alternative: solid white — still powerful on dark
