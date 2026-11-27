/**
 * Site-wide configuration.
 *
 * Everything here can be overridden with environment variables so the
 * deployment URL, title and repository links are never hardcoded into pages.
 * Until a custom domain is configured the site falls back to the Vercel
 * deployment URL (or localhost during development).
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL ?? null;

const fallbackUrl = vercelHost ? `https://${vercelHost}` : 'http://localhost:3000';

export const siteConfig = {
  /** Website title used in metadata and the document head. */
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Numiq Documentation',
  /** One-sentence description used for the homepage and social cards. */
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    'Documentation for Numiq, a data analysis engine, and Numviz, a data visualization library for JavaScript and TypeScript.',
  /** Canonical origin. Configurable; defaults to the current Vercel deployment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, ''),
  /** Author attribution shown in the footer. */
  author: 'munachi-me',
  authorUrl: 'https://github.com/munachi-me',
  /** Repository that hosts this documentation website. */
  repo: 'https://github.com/munachi-me/mynum',
  /** Locale used by Open Graph metadata. */
  locale: 'en_US',
} as const;

export type SiteConfig = typeof siteConfig;
