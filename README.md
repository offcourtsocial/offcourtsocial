# Offcourt Social

Premium one-page website for **Offcourt Social** — a community-first social gathering concept based in Rotterdam.

> *More than a moment.*

---

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **TypeScript**
- **Google Fonts** via `next/font`: Anton, Bebas Neue, Cormorant Garamond, Inter
- **IntersectionObserver** based reveal-on-scroll (no heavy animation libs needed)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

> **First build needs internet** — `next/font` fetches the Google Fonts at build time and caches them locally. After that, the site is fully self-hosted (no FOUT, no third-party requests in production).

## Open in VS Code

The project ships with a complete `.vscode/` workspace setup. Two ways to open it:

```bash
# Option 1 — open the folder
code offcourt-social

# Option 2 — open the workspace file (recommended)
code offcourt-social/offcourt-social.code-workspace
```

On first open, VS Code will prompt to **Install Recommended Extensions**. Accept it — these are the ones you actually want for this stack:

- **ESLint** + **Prettier** — auto-fix and format on save
- **Tailwind CSS IntelliSense** — class autocomplete, hover-preview, lint
- **Pretty TypeScript Errors** — readable TS errors
- **Error Lens** — inline error display
- **Path Intellisense**, **Auto Rename Tag**, **Color Highlight** — quality of life
- **Material Icon Theme** — clearer file tree

Workspace config included:

| File | Purpose |
|---|---|
| `.vscode/settings.json` | Format on save, Tailwind IntelliSense regex, TS workspace SDK |
| `.vscode/extensions.json` | Recommended extensions (auto-prompt) |
| `.vscode/launch.json` | Debug configs: server, client (Chrome), full-stack |
| `.vscode/tasks.json` | `dev`, `build`, `lint`, `type-check` runnable from the Command Palette |
| `.editorconfig` | LF line endings, 2-space indent (works in any editor) |
| `.prettierrc` | Single quotes, 100-char line width, Tailwind class sorting |
| `.eslintrc.json` | Next.js + TypeScript rules |

### Useful keybindings

- `⌘⇧P` → **Tasks: Run Task** → pick `dev`, `build`, `lint`, or `type-check`
- `F5` → Start debugging (uses `launch.json`)
- `⌥⇧F` → Format current file
- `⌘.` → Quick fix (auto-import, etc.)

## Build

```bash
npm run build
npm run start
```

## Project structure

```
.
├── app/
│   ├── layout.tsx          # Root layout, font loading, metadata, grain overlay
│   ├── page.tsx            # Composes all sections
│   └── globals.css         # Brand tokens, utilities, animations
├── components/
│   ├── Header.tsx          # Sticky transparent → blurred nav
│   ├── Hero.tsx            # Full-screen dark hero
│   ├── Statement.tsx       # Cream editorial block
│   ├── Concept.tsx         # Split text + image
│   ├── Values.tsx          # 4-column values grid
│   ├── VisualBreak.tsx     # Full-width "You had to be there"
│   ├── NextGathering.tsx   # Event details + what-to-expect
│   ├── EditorialCard.tsx   # Cream paper card with tape
│   ├── Community.tsx       # "More than a moment" closer
│   ├── Gallery.tsx         # Instagram-style 5-image grid
│   ├── FinalCTA.tsx        # Closing hero
│   ├── Footer.tsx          # Minimal footer
│   ├── GrainOverlay.tsx    # Site-wide film grain
│   └── Reveal.tsx          # Reveal-on-scroll wrapper
├── public/
│   └── images/             # Placeholder brand imagery (replace with real shots)
├── tailwind.config.js      # Brand colors, fonts, animations
└── next.config.js
```

## Brand tokens

Defined in `tailwind.config.js`:

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B0B0B` | Primary background |
| `forest` | `#111A14` | Dark forest accent |
| `cream` | `#F2EFEA` | Primary text on dark |
| `creamDim` | `#E8E4DC` | Subdued text |
| `moss` | `#6F7D5C` | Accent / values headings |
| `wine` | `#5B1418` | Optional accent |

## Replacing placeholder imagery

The `public/images/` folder ships with brand-aligned dark moody placeholders. Replace them in-place — keep the same filenames:

- `hero.jpg` — full-screen hero (1920×1080+ recommended)
- `concept.jpg` — concept section, dark lifestyle (1600×1100)
- `visual-break.jpg` — wide crowd / atmosphere shot (1920×720)
- `gathering.jpg` — next gathering background (1400×1000)
- `community.jpg` — community close-up (1600×1100)
- `gallery-1.jpg` … `gallery-5.jpg` — IG grid (square, 800×800)

## Sections

1. **Hero** — `Offcourt Social` / *Where people come together, beyond the moment.*
2. **Statement** — *Not every gathering looks the same. But they all feel the same.*
3. **Concept** — Split layout, what is Offcourt Social
4. **Values** — Connect / Move / Vibe / Community
5. **Visual Break** — *You had to be there.*
6. **Next Gathering** — Launch event, Saturday 14 June 2025, Rotterdam
7. **Editorial Card** — Paper-tape *Your day, your way*
8. **Community** — *More than a moment* closer
9. **Gallery** — `@offcourt.social` 5-image grid
10. **Final CTA** — Closing hero
11. **Footer** — Minimal, links + contact

## Design system notes

- **Typography hierarchy**: Anton for the largest editorial display, Bebas Neue for condensed mid-size, Cormorant Garamond Italic for emotional serif accents, Inter for body and UI labels.
- **Spacing**: Generous editorial spacing — sections use `py-20` mobile, `py-28`–`py-32` desktop, with `max-w-[1440px]` outer container and `px-6 / md:px-10 / lg:px-14` gutters.
- **Motion**: Subtle reveal-on-scroll via IntersectionObserver, hover scale on imagery, button line-fill transitions.
- **Grain**: SVG-based fractal noise overlay sitewide; secondary softer grain on cream sections.

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Or any Node-compatible host that supports Next.js 14 (Netlify, Cloudflare Pages, your own VPS).

---

Built for Offcourt Social · Rotterdam, NL
