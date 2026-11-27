# mynum

The documentation website for the Numiq ecosystem: **Numiq** (data analysis engine) and **Numviz** (data visualization library).

The repository is called `mynum`; the website is titled `Numiq Documentation` by default. Neither name is tied to a domain — the site title, description and canonical origin are read from environment variables (see [Configuration](#configuration)).

- Homepage: `/`
- Numiq: `/numiq` and `/numiq/docs/*`
- Numviz: `/numviz` and `/numviz/docs/*`

## Stack

| Concern              | Choice                                                    |
| -------------------- | --------------------------------------------------------- |
| Framework            | Next.js 16 (App Router, Server Components by default)     |
| Language             | TypeScript, strict                                        |
| Documentation engine | Fumadocs (`fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`) |
| Content              | MDX under `content/`                                      |
| Styling              | Tailwind CSS v4                                           |
| Icons                | Lucide React                                              |
| Package manager      | npm                                                       |

## Requirements

- Node.js 20 or newer (developed on Node 22)
- npm 10 or newer

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command                                   | Purpose                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run dev`                             | Start the development server                                                                            |
| `npm run build`                           | Production build                                                                                        |
| `npm run start`                           | Serve the production build                                                                              |
| `npm run typecheck`                       | Generate Next.js route types, then `tsc --noEmit`                                                       |
| `npm run lint`                            | ESLint (Next.js config)                                                                                 |
| `npm run format` / `npm run format:check` | Prettier write / verify                                                                                 |
| `npm run check:examples`                  | Verify documented imports, versions, install commands and error codes against the installed packages    |
| `npm run check:links`                     | Verify internal links, heading anchors and `meta.json` entries (`--external` also requests remote URLs) |
| `npm run verify`                          | typecheck → lint → format:check → check:examples → build → check:links                                  |

## Documentation accuracy

The installed packages are the source of truth, not memory or the READMEs of the upstream repositories.

- `@munachi-me/numiq@2.0.0` and `@munachi-me/numviz@1.0.1` are pinned in `devDependencies`.
- Every API page is written against the published type declarations and implementation in `node_modules`.
- `npm run check:examples` reads every code example in `content/`, resolves each named import against the installed package (runtime exports and type declarations), and fails if a documented version, install command or Numviz error code does not match the installed package.
- When an upstream README and the implementation disagree, the implementation wins and the discrepancy is called out on the page.

Do not document planned features. If a capability is not in the published package, it does not belong on the site.

## Repository layout

```text
app/
  layout.tsx                 Root layout: fonts, metadata, providers
  page.tsx                   Ecosystem homepage
  numiq/                     Numiq landing page + docs routes
  numviz/                    Numviz landing page + docs routes
  api/search/route.ts        Cross-product search endpoint
  opengraph-image.tsx        Social card
  sitemap.ts, robots.ts      SEO
components/
  branding/                  Logos, icons, product lockups
  docs/                      Docs page shell, breadcrumbs, related links
  marketing/                 Landing page sections
  navigation/                Header, footer, product switcher, search, theme toggle
content/
  numiq/                     Numiq MDX + meta.json sidebar
  numviz/                    Numviz MDX + meta.json sidebar
lib/
  source.ts                  Fumadocs content sources
  products.ts                Product configuration (name, version, colours, links)
  site.ts                    Site configuration (title, description, canonical origin)
  search.ts                  Static search index across both products
public/logos/                Product logos and icons
scripts/                     Example runner and link checker
```

## Configuration

Everything that could be site-specific is an environment variable, so the same build works on any Vercel deployment or custom domain.

| Variable                       | Default                                                                | Used for                                 |
| ------------------------------ | ---------------------------------------------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Canonical URLs, Open Graph URLs, sitemap |
| `NEXT_PUBLIC_SITE_NAME`        | `Numiq Documentation`                                                  | Website title                            |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Documentation summary                                                  | Homepage and social description          |

Product metadata (versions, npm package names, accents) lives in `lib/products.ts` and must be updated when a package is released.

## Deployment on Vercel

1. Import `munachi-me/mynum` into Vercel.
2. Framework preset: Next.js. No build command or output directory overrides are needed.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to the final origin (for example when a custom domain is attached).
4. Deploy.

The project runs locally without any production credentials; there is no database, auth or third-party API key.

`/api/search` is a server route (not a static file) because it reads the query string at request time. It runs on the default Vercel Node.js runtime.

## Brand

| Token         | Value     |
| ------------- | --------- |
| Near black    | `#0A0A0A` |
| Charcoal      | `#242424` |
| Off white     | `#F5F5F0` |
| Neutral grey  | `#737373` |
| Light grey    | `#E5E5E5` |
| Numiq accent  | `#FF7900` |
| Numviz accent | `#16A34A` |

Flat colour only: no gradients, glassmorphism or decorative shadows. Headings use the `--font-heading` stack (Neue Haas Grotesk when the reader has it installed, falling back to Helvetica Neue); body text uses the locally bundled DM Sans files in `app/fonts`.

See `AGENTS.md` for contribution rules.

## Licence

MIT. Numiq and Numviz are separate MIT-licensed packages maintained by [munachi-me](https://github.com/munachi-me).
