import Link from 'next/link';
import { products } from '@/lib/products';
import { siteConfig } from '@/lib/site';

const columns = [
  {
    title: 'Numiq',
    links: [
      { label: 'Overview', href: '/numiq' },
      { label: 'Getting started', href: '/numiq/docs/getting-started' },
      { label: 'Guides', href: '/numiq/docs/datasets' },
      { label: 'API reference', href: '/numiq/docs/api' },
    ],
  },
  {
    title: 'Numviz',
    links: [
      { label: 'Overview', href: '/numviz' },
      { label: 'Getting started', href: '/numviz/docs/getting-started' },
      { label: 'Guides', href: '/numviz/docs/charts' },
      { label: 'API reference', href: '/numviz/docs/api' },
    ],
  },
  {
    title: 'Packages',
    links: [
      { label: 'Numiq on GitHub', href: products.numiq.github, external: true },
      { label: 'Numiq on npm', href: products.numiq.npm, external: true },
      { label: 'Numviz on GitHub', href: products.numviz.github, external: true },
      { label: 'Numviz on npm', href: products.numviz.npm, external: true },
    ],
  },
  {
    title: 'This site',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Repository', href: siteConfig.repo, external: true },
      { label: 'Compatibility', href: '/numiq/docs/compatibility' },
      { label: 'Troubleshooting', href: '/numviz/docs/troubleshooting' },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-fd-border border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-heading text-fd-foreground text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      className="text-fd-muted-foreground hover:text-fd-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-fd-muted-foreground hover:text-fd-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-fd-border border-t">
        <div className="text-fd-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Built by{' '}
            <a href={siteConfig.authorUrl} className="text-fd-foreground hover:underline">
              {siteConfig.author}
            </a>
            . Numiq and Numviz are MIT-licensed.
          </p>
          <p>Documentation built with Next.js and Fumadocs.</p>
        </div>
      </div>
    </footer>
  );
}
