---
name: style-archetypes
description: Detects project industry/vibe from a client brief and applies a detailed design DNA archetype. Contains complete visual specifications (colors, typography, layout, components, sections, animation) for each archetype. Use AFTER ui-ux-pro-max in the build pipeline, when analyzing a brief for a landing page. Covers 8 archetypes — wellness, beauty, fitness, real estate, events, restaurants, agencies, professional services.
---

# Style Archetypes — Design DNA Detection & Application

Detects the design archetype from a project brief and provides the complete visual DNA — specific colors, fonts, layout patterns, component styles, section recipes, and animation rules that go far beyond what `ui-ux-pro-max` outputs.

## When to Use

Run this skill **after** `ui-ux-pro-max` generates the base design system, and **before** building sections.

Pipeline position:
```
Brief → ui-ux-pro-max (category) → style-archetypes (DNA) → build sections
```

---

## Step 1: Detect Archetype

Scan the brief for trigger keywords. If a match is found, read the corresponding archetype file from `style-archetypes/archetypes/`.

| Archetype | Trigger Keywords | File |
|-----------|-----------------|------|
| Wellness Clean | yoga, pilates, wellness, meditation, mindfulness, breathwork, holistic, spa, retreat, body & mind, healing, chakra, zen, calm | [wellness-clean.md](archetypes/wellness-clean.md) |
| Glam Beauty | nail salon, nails, hair salon, hairdresser, makeup, makeup artist, esthetics, beauty, lashes, brows, skincare, cosmetics, facial, waxing, beauty studio | [glam-beauty.md](archetypes/glam-beauty.md) |
| Power Fitness | gym, fitness, CrossFit, personal trainer, martial arts, boxing, HIIT, bootcamp, strength, workout, training, athletic, sport, muscle | [power-fitness.md](archetypes/power-fitness.md) |
| Luxury Minimal | real estate, luxury, apartments, architecture, architect, interior design, penthouse, villa, property, hotel, boutique hotel, resort, high-end, premium, exclusive | [luxury-minimal.md](archetypes/luxury-minimal.md) |
| Elegant Events | wedding, event planning, event planner, photography, photographer, DJ, venue, catering, floral, celebration, party, birthday, bat mitzvah, bar mitzvah, engagement | [elegant-events.md](archetypes/elegant-events.md) |
| Bold Agency | creative agency, tech startup, SaaS, design studio, digital agency, portfolio, cutting-edge, futuristic, bold, high-energy, app, product launch | [bold-agency.md](archetypes/bold-agency.md) |
| Trust Professional | law firm, attorney, legal, medical clinic, doctor, healthcare, financial advisor, accounting, accountant, CPA, insurance, consulting, consultant, fiduciary, trust, wealth management, private bank, education, coaching, tutoring, academy | [trust-professional.md](archetypes/trust-professional.md) |
| Warm Local | restaurant, cafe, bakery, bistro, pizzeria, deli, wine bar, local food, eatery, kitchen, chef, menu, dining, brunch, artisan, farm-to-table, cozy, neighborhood, pet, veterinary, grooming | [warm-local.md](archetypes/warm-local.md) |

**Detection rules:**
1. Match is case-insensitive
2. **For Hebrew briefs:** Translate industry terms to English before matching (e.g. מכון ציפורניים → nail salon → Glam Beauty, סטודיו לפילאטיס → pilates studio → Wellness Clean, משרד עורכי דין → law firm → Trust Professional, מסעדה → restaurant → Warm Local)
3. 2+ keyword matches = strong match → apply archetype
4. 1 keyword match + industry context (e.g. "studio" + fitness imagery) = likely match → apply archetype
5. 0 matches = no archetype → use only `ui-ux-pro-max` output

## Step 2: Apply Archetype DNA

Once an archetype is detected, read the archetype file. It provides **configuration presets** for all our tools:

| Section | What It Provides |
|---------|-----------------|
| **Color DNA** | Exact hex codes with roles (background, accent, text, CTA, card-bg) |
| **Typography DNA** | Specific Google Fonts pair, weights, letter-spacing, line-height |
| **Layout DNA** | Whitespace rules, max-width, section padding, grid patterns |
| **Component DNA** | Button shapes, card styles, icon treatment, separators |
| **Section Recipes** | Ordered list of sections with layout specs for each |
| **Animation DNA** | Speed, easing, travel distance, stagger timing |
| **Tool Configuration Presets** | Specific `props` for every premium-effects and scroll-kinetics tool (densities, speeds, opacities, colors) |
| **Image Treatment** | Photography style, overlays, shapes |
| **Anti-Patterns** | Things to avoid (not tool bans — aesthetic mismatches) |

**Key principle:** Archetypes CONFIGURE tools, they don't disable them. A wellness archetype doesn't ban SparklesCore — it tunes it to `density=20, speed=0.15, warm gold`. The Design Blueprint makes the final call.

## Step 3: Merge Three Layers

Three layers merge into the Design Blueprint. **Client brief always wins:**

```
1. Client brief / user instructions     ← ALWAYS wins. Locks colors, fonts, specific requests.
2. Style archetype DNA                  ← Industry-tuned tool configs. Fills what client didn't specify.
3. ui-ux-pro-max output                 ← Data-driven baseline. Fills remaining gaps.
```

| Property | Client brief | Archetype | ui-ux-pro-max | Winner |
|----------|-------------|-----------|---------------|--------|
| Colors | Client gave `#E0783F` | Archetype says `#B8572A` | ui-ux-pro-max says "warm terracotta" | **Client `#E0783F`** |
| Fonts | Not specified | Archetype says Cormorant + Nunito | ui-ux-pro-max says "serif + sans" | **Archetype** (most specific) |
| SparklesCore density | Not specified | Archetype says 20 | Not specified | **Archetype** |
| "I want sparkles in hero" | Client requested | Archetype says subtle | — | **Client** (use it, archetype tunes intensity) |
| UX guidelines | Not specified | Not provided | From ux domain | **ui-ux-pro-max** |

---

## Adding New Archetypes

To add a new archetype:

1. Create `archetypes/<archetype-slug>.md` following the template in [archetypes/TEMPLATE.md](archetypes/TEMPLATE.md)
2. Add a row to the detection table in Step 1 above
3. Base the DNA on a real reference site — browse it, capture every visual detail

Current archetypes (8): **Wellness Clean**, **Glam Beauty**, **Power Fitness**, **Luxury Minimal**, **Elegant Events**, **Bold Agency**, **Trust Professional**, **Warm Local**

### Coverage map — which businesses map to which archetype

| Archetype | Primary Industries | Also Covers (via tweaking) |
|-----------|-------------------|---------------------------|
| Wellness Clean | Yoga, pilates, meditation, spa, holistic health | Massage therapy, naturopathy, mindfulness coaching |
| Glam Beauty | Nail salon, hair salon, makeup artist, esthetics | Skincare clinic, lash studio, beauty academy |
| Power Fitness | Gym, CrossFit, personal trainer, martial arts | Dance studio, sport club, athletic wear |
| Luxury Minimal | Real estate, architecture, interior design | Luxury hotel, boutique resort, premium retail |
| Elegant Events | Weddings, event planning, photography, DJ | Venue rental, florist, catering, birthday parties |
| Bold Agency | Creative agency, tech startup, SaaS, portfolio | App launch, product showcase, personal brand |
| Trust Professional | Law, medical, financial, consulting | Education, coaching, tutoring, non-profit |
| Warm Local | Restaurant, cafe, bakery, food business | Pet services, neighborhood shop, local service |
