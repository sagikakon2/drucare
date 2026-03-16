# [Archetype Name] — Design DNA

Reference: [Site Name](URL) — description.
Feel: **3-4 adjectives.**

---

## Color DNA

| Role | Hex | Tailwind `@theme` Variable | Usage |
|------|-----|---------------------------|-------|
| Background | `#` | `--color-bg` | Main page background |
| Background Alt | `#` | `--color-bg-alt` | Alternating sections |
| Card Background | `#` | `--color-card` | Cards, content blocks |
| Primary Accent | `#` | `--color-primary` | Icons, highlights |
| CTA Fill | `#` | `--color-cta` | Primary button backgrounds |
| CTA Text | `#` | `--color-cta-text` | Text on CTA buttons |
| Text Primary | `#` | `--color-text` | Headings, body text |
| Text Muted | `#` | `--color-text-muted` | Supporting text |
| Accent Secondary | `#` | `--color-secondary` | Tags, secondary elements |

### CSS Theme Block

```css
@theme {
  --color-bg: #;
  --color-bg-alt: #;
  --color-card: #;
  --color-primary: #;
  --color-cta: #;
  --color-cta-text: #;
  --color-text: #;
  --color-text-muted: #;
  --color-secondary: #;
}
```

---

## Typography DNA

| Role | Font | Weight | Letter Spacing | Line Height |
|------|------|--------|---------------|-------------|
| Display | **** | | | |
| Heading | **** | | | |
| Body | **** | | | |
| Label | **** | | | |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

---

## Layout DNA

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | | |
| Section padding | | |
| Card padding | | |
| Card border-radius | | |
| Hero height | | |

---

## Component DNA

### Buttons
<!-- Primary CTA shape, colors, padding, hover -->
<!-- Secondary CTA shape, colors, hover -->

### Cards
<!-- Background, border, shadow, hover behavior -->

### Icons
<!-- Style (outline/filled), source, size, container -->

### Section Separators
<!-- How sections transition visually -->

---

## Section Recipes

<!-- Ordered list of sections with layout specs -->

---

## Animation DNA

| Property | Value |
|----------|-------|
| Default duration | |
| Easing | |
| Scroll entrance | |
| Hover transitions | |

**ALLOWED:** ...
**FORBIDDEN:** ...

---

## Image Treatment

| Property | Guideline |
|----------|-----------|
| Style | |
| Subjects | |
| Overlays | |
| Shape | |

---

## Anti-Patterns
<!-- Specific things that break this archetype -->

---

## Premium Effects Override

| Standard Requirement | Override |
|---------------------|---------|
<!-- Override project-standards visual bar where this archetype differs -->
