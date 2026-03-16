---
name: base44-setup
description: Initialize and manage landing page projects with Base44 CLI. Covers project creation, Base44 SDK client setup, entity schemas, deployment to Base44 hosting, and integration with Base44's built-in skills (base44-cli, base44-sdk, base44-troubleshooter). Use when creating a new landing page project, deploying to Base44, setting up Base44 backend, or connecting to Base44 entities.
---

# Base44 Setup for Landing Pages

## Overview

Base44 CLI creates a full-stack project with:
- **Frontend**: Vite + React + Tailwind CSS (where our landing page skills live)
- **Backend**: Base44 entities, serverless functions, AI agents, OAuth connectors
- **Hosting**: Deploy to Base44's CDN with `base44 deploy`
- **Built-in AI skills**: base44-cli, base44-sdk, base44-troubleshooter auto-installed

Our landing page skills (effects, kinetics, 3D, archetypes) work **inside** the Base44 React frontend.

## First-Time Setup

### 1. Install Base44 CLI

```bash
npm install -g base44@latest
```

Requires Node.js 20.19.0 or higher.

### 2. Authenticate

```bash
npx base44 login
```

Opens browser for device-code authentication. Verify with:

```bash
npx base44 whoami
```

### 3. Create a Landing Page Project

All new projects should be created inside `~/Desktop/web projects/`:

```bash
cd ~/Desktop/web\ projects
npx base44 create
```

Select **"Start from a template"** (Vite + React) when prompted.

Or non-interactive:

```bash
cd ~/Desktop/web\ projects
npx base44 create --name my-landing-page --template backend-and-client --path my-landing-page --deploy
```

This creates the project, pushes entities, builds, and deploys in one step.

## Project Structure After Creation

```
my-landing-page/
├── base44/                          # Base44 backend (managed by base44-cli skill)
│   ├── config.jsonc                 # Project config — name, site build settings
│   ├── .app.jsonc                   # App ID link (DO NOT commit)
│   ├── .types/types.d.ts           # Auto-generated TS types
│   ├── entities/                    # Data schemas (leads, contacts, etc.)
│   │   └── task.jsonc               # Example entity (replace with yours)
│   ├── functions/                   # Serverless backend functions
│   ├── agents/                      # AI agent configs
│   └── connectors/                  # OAuth integrations
│
├── src/                             # Frontend — THIS IS WHERE YOU BUILD
│   ├── api/
│   │   └── base44Client.js          # Pre-configured SDK client
│   ├── pages/                       # Route pages
│   ├── components/                  # Shared UI components
│   └── main.jsx                     # App entry
│
├── .cursor/
│   ├── skills/                      # Base44 auto-installs its skills here
│   │   ├── base44-cli/SKILL.md      # CLI commands & entity management
│   │   ├── base44-sdk/SKILL.md      # SDK usage — entities, auth, functions
│   │   └── base44-troubleshooter/SKILL.md
│   └── rules/                       # (empty by default)
│
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Integrating Landing Page Skills

After `base44 create`, copy our skills into the project:

```bash
# From the landing-page-studio repo, copy skills and rules into the Base44 project
cp -r landing-page-studio/.cursor/skills/* my-landing-page/.cursor/skills/
cp -r landing-page-studio/.cursor/rules/* my-landing-page/.cursor/rules/
```

This gives you **both** Base44 skills and landing page skills side by side:

```
.cursor/skills/
├── base44-cli/              # Base44's — entities, deploy, CLI
├── base44-sdk/              # Base44's — SDK, auth, CRUD
├── base44-troubleshooter/   # Base44's — log debugging
├── build-website/           # Ours — Master A-to-Z build pipeline
├── ui-ux-pro-max/           # Ours — Design system generation
├── style-archetypes/        # Ours — Industry-specific design DNA
├── premium-effects/         # Ours — SparklesCore, Spotlight, ThreeDCard, BorderBeam, etc.
├── scroll-kinetics/         # Ours — InfiniteMarquee, FlowingBackground, ParallaxText, etc.
├── 3d-scenes/               # Ours — React Three Fiber scenes (FloatingProduct, Globe, etc.)
└── base44-setup/            # Ours — This skill (Base44 integration)
```

### Fix Tailwind v4 for Base44 Projects

Base44 CLI scaffolds with Tailwind v3. You MUST upgrade to v4 for our skills to work:

```bash
# Remove Tailwind v3 dependencies
npm uninstall tailwindcss autoprefixer postcss

# Install Tailwind v4 with PostCSS plugin
npm install tailwindcss@latest @tailwindcss/postcss postcss

# Delete old v3 config (not needed in v4)
rm -f tailwind.config.js
```

**CRITICAL:** Use `@tailwindcss/postcss` (NOT `@tailwindcss/vite`). The Vite plugin does NOT generate utility classes from `@theme` custom colors. PostCSS approach works correctly.

Create `postcss.config.js` in project root:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

Do NOT add `tailwindcss()` to `vite.config.ts` plugins — PostCSS handles it.

### Initialize shadcn/ui (Optional but Recommended)

After Tailwind v4 is set up, initialize shadcn/ui for pre-built accessible components:

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default** (or New York for refined look)
- Base color: Match your Design Profile (Stone for warm, Slate for dark, Zinc for neutral)
- CSS variables: **Yes**

Then install commonly needed landing page components:

```bash
npx shadcn@latest add button card dialog sheet accordion badge avatar separator
```

**IMPORTANT**: After `shadcn init`, verify it did NOT change your Tailwind setup:
- `postcss.config.js` still uses `@tailwindcss/postcss` (not switched to Vite plugin)
- `vite.config.ts` does NOT have `tailwindcss()` in plugins
- `components.json` has `"rsc": false` (we're NOT using React Server Components)

### Install Landing Page Dependencies

After copying skills, install the libraries referenced by our skills:

```bash
# Core animation + scroll
npm install gsap lenis framer-motion

# UI components
npx shadcn@latest init
npm install lucide-react

# Forms
npm install react-hook-form zod @hookform/resolvers

# Carousel (if needed)
npm install embla-carousel-react

# 3D scenes (only if using 3d-scenes skill)
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing
```

Premium effects and scroll kinetics require NO additional npm packages — they use react + framer-motion + gsap already installed above.

## Skill Responsibility Split

| Task | Skill to Use |
|------|-------------|
| Create new project | **base44-cli** |
| Define entities (leads, contacts) | **base44-cli** |
| Deploy to production | **base44-cli** |
| SDK CRUD operations | **base44-sdk** |
| Auth (login, register) | **base44-sdk** |
| Call backend functions | **base44-sdk** |
| Debug production issues | **base44-troubleshooter** |
| Generate design system | **ui-ux-pro-max** |
| Detect industry archetype | **style-archetypes** |
| Orchestrate full page build | **build-website** |
| Visual effects (sparkles, borders, spotlight, shimmer) | **premium-effects** |
| Motion effects (marquee, flowing text, parallax) | **scroll-kinetics** |
| 3D hero / WebGL scenes | **3d-scenes** |

## Common Entities for Landing Pages

### Lead Capture Entity

```jsonc
// base44/entities/lead.jsonc
{
  "name": "Lead",
  "type": "object",
  "properties": {
    "name": { "type": "string", "description": "Full name" },
    "email": { "type": "string", "format": "email", "description": "Email address" },
    "phone": { "type": "string", "description": "Phone number" },
    "source": {
      "type": "string",
      "enum": ["landing_page", "referral", "organic", "paid"],
      "default": "landing_page"
    },
    "message": { "type": "string", "description": "Optional message" },
    "page_url": { "type": "string", "format": "uri", "description": "Which landing page" }
  },
  "required": ["name", "email"]
}
```

Push to Base44: `npx base44 entities push`

### Using Leads in the Landing Page

```tsx
import { base44 } from "@/api/base44Client";

const ContactForm = () => {
  const handleSubmit = async (formData: FormData) => {
    await base44.entities.Lead.create({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      source: "landing_page",
      page_url: window.location.href,
    });
  };

  return (
    <form action={handleSubmit} className="glass-card p-8 space-y-4">
      <input name="name" placeholder="Name" required className="w-full p-3 bg-white/5 rounded-lg" />
      <input name="email" type="email" placeholder="Email" required className="w-full p-3 bg-white/5 rounded-lg" />
      <input name="phone" placeholder="Phone" className="w-full p-3 bg-white/5 rounded-lg" />
      <button type="submit" className="w-full p-3 bg-purple-600 rounded-lg font-bold">
        Send
      </button>
    </form>
  );
};
```

## Deployment Workflow

```bash
# 1. Build the frontend
npm run build

# 2. Deploy everything (entities + functions + site)
npx base44 deploy -y

# 3. Open the live site
npx base44 site open
```

Or deploy individually:

```bash
npx base44 entities push       # Push entity schemas
npx base44 functions deploy    # Deploy serverless functions
npx base44 site deploy -y      # Deploy frontend only
```

## Base44 config.jsonc for Landing Pages

```jsonc
{
  "name": "client-landing-page",
  "description": "Landing page with 3D, animations, and lead capture",
  "entitiesDir": "./entities",
  "functionsDir": "./functions",
  "site": {
    "installCommand": "npm install",
    "buildCommand": "npm run build",
    "outputDirectory": "../dist"
  }
}
```

## Generate TypeScript Types

After changing entities, regenerate types for SDK autocomplete:

```bash
npx base44 types generate
```

Creates `base44/.types/types.d.ts` — gives you typed `base44.entities.Lead.create(...)`.

## Workflow Summary

```
1. npx base44 create          → Scaffold project
2. Copy landing-page skills   → Add visual capabilities
3. npm install (visual libs)  → Install Three.js, GSAP, etc.
4. Build landing page         → Use skills to create sections
5. Define entities             → Lead capture, analytics
6. npm run build              → Build for production
7. npx base44 deploy -y      → Ship to Base44 hosting
```

## Docs
- Base44 CLI: https://docs.base44.com/developers/references/cli/get-started/overview
- Base44 SDK: https://docs.base44.com/developers/references/sdk/getting-started/overview
- Project Structure: https://docs.base44.com/developers/backend/overview/project-structure
- Base44 Skills: https://docs.base44.com/developers/backend/overview/base44-skills
- React Quickstart: https://docs.base44.com/developers/backend/quickstart/quickstart-with-react
