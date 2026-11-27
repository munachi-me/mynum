<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Guidance for anyone — human or agent — working in this repository.

## What this repository is

`mynum` is the documentation website for two independent npm packages:

- **Numiq** — `@munachi-me/numiq` — data analysis engine.
- **Numviz** — `@munachi-me/numviz` — data visualization library.

The website is titled `Numiq Documentation` by default (`NEXT_PUBLIC_SITE_NAME`). The repository name (`mynum`) and the website title are separate things: do not rename the packages, and do not hardcode a domain.

## Commands

```bash
npm install          # install dependencies
npm run dev          # development server on :3000
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # next typegen + tsc --noEmit
npm run lint         # eslint
npm run format       # prettier --write
npm run verify       # typecheck, lint, format:check, check:examples, build, check:links
```

Run `npm run verify` before declaring work finished. Never weaken a check to make it pass.

## Architecture

```text
app/
  layout.tsx                        Root layout: local DM Sans fonts, metadata, providers
  page.tsx                          Ecosystem homepage
  numiq/page.tsx                    Numiq landing page
  numiq/docs/layout.tsx             DocsLayout for Numiq (data-product="numiq")
  numiq/docs/[[...slug]]/page.tsx   MDX renderer for Numiq pages
  numviz/...                        Same three files for Numviz
  api/search/route.ts               Search endpoint (dynamic: reads ?query at request time)
  sitemap.ts, robots.ts             SEO routes
  opengraph-image.tsx               Social card
components/
  branding/                         Logo, ProductIcon, ProductLockup, GitHub mark
  docs/                             DocsPageView, Breadcrumbs, RelatedLinks
  marketing/                        LandingHero, FeatureSection, DocLinkList
  navigation/                       SiteHeader, SiteFooter, ProductSwitcher, SearchTrigger, ThemeToggle
  mdx/                              MDX component overrides
content/
  numiq/*.mdx + meta.json           Numiq pages and sidebar order
  numviz/*.mdx + meta.json          Numviz pages and sidebar order
lib/
  products.ts                       Product config: name, version, package name, accent, links
  site.ts                           Site config: title, description, canonical origin
  source.ts                         Fumadocs collections and sources
  search.ts                         Static index for both products
scripts/                            check-examples.mjs, check-links.mjs
```

Conventions:

- Server Components by default. Add `'use client'` only for state, effects or browser APIs (theme toggle, product switcher, search dialog).
- Product accents come from CSS custom properties scoped by `data-product`. Any page that should use an accent renders a wrapper with `data-product="numiq"` or `data-product="numviz"`.
- Use the `--product-accent`, `--product-link`, `--site-border` and `--site-surface` tokens instead of hardcoded hex values, except where a literal colour is required for SVG artwork.
- Keep dependencies minimal. Do not add a UI kit, animation library or third-party search service.
- Strict TypeScript: no `any`, no non-null assertions to silence the compiler, no `@ts-ignore`.

## Documentation authoring

Content lives in `content/<product>/*.mdx`. Frontmatter:

```yaml
---
title: Page title
description: One sentence used for metadata and the page intro.
---
```

`meta.json` controls sidebar order; `---Section---` entries create separators.

Rules:

1. **The installed package is the source of truth.** Check `node_modules/@munachi-me/<pkg>/dist` and its `.d.ts` files, or the published repository, before writing an API.
2. Never invent methods, options, defaults, return values or error codes. If it cannot be verified, leave it out.
3. Never document planned or unreleased work.
4. Distinguish Numiq from Numviz. Neither package requires the other; the combined workflow is optional and must be described that way.
5. Keep the pinned versions in `lib/products.ts` in sync with `package.json`; `npm run check:examples` fails when they drift.
6. Use the published install commands exactly:
   ```bash
   npm install @munachi-me/numiq
   npm install @munachi-me/numviz
   ```
7. Label illustrative output as illustrative. Do not present invented console output as real package behaviour.
8. When an upstream README and the implementation disagree, document the implementation and note the discrepancy.

Code blocks are highlighted by Fumadocs (Shiki) and get copy buttons automatically. Languages used on the site: `ts`, `js`, `json`, `bash`, `css`, `html`.

## Brand

Flat colour only. No gradients, glassmorphism, glow, decorative illustration or heavy shadows.

| Token         | Value     |
| ------------- | --------- |
| Near black    | `#0A0A0A` |
| Charcoal      | `#242424` |
| Off white     | `#F5F5F0` |
| Neutral grey  | `#737373` |
| Light grey    | `#E5E5E5` |
| Numiq accent  | `#FF7900` |
| Numviz accent | `#16A34A` |

- Headings and brand typography: `--font-heading` (Neue Haas Grotesk stack, falling back to Helvetica Neue).
- Body text: DM Sans, self-hosted from `app/fonts` via `next/font/local`.
- Logos: `public/logos/numiq-logo.svg`, `numiq-icon.svg`, `numviz-logo.svg`, `numviz-icon.svg`. Use the approved artwork; never redraw or approximate the marks.
- Numiq is orange, Numviz is green — in both light and dark themes. Colour never carries meaning on its own; pair it with text.

## Search

`lib/search.ts` builds one index for both products and tags each entry with the product name as its breadcrumb, so results are attributable in text, not by colour alone. `app/api/search/route.ts` is intentionally dynamic; marking it `force-static` caches a single empty response for every query.

## Testing and verification

- `npm run check:examples` — every named import in the docs must exist in the installed package; versions, install commands and Numviz error codes must match.
- `npm run check:links` — internal routes, heading fragments and `meta.json` entries. Add `--external` to also request remote URLs (needs network).
- Manual pass before shipping: product switching, sidebar navigation, search (Ctrl/Cmd + K), theme switching, mobile navigation, copy buttons, breadcrumbs, previous/next links.

## Deployment

Vercel, Next.js preset, no overrides. Set `NEXT_PUBLIC_SITE_URL` when the final origin is known; otherwise the build falls back to the Vercel deployment URL and then `http://localhost:3000`. Do not claim a domain is configured unless it actually is.
