import Link from 'next/link';
import type { DocsSource } from '@/lib/source';

/**
 * Renders the `related` frontmatter list as links.
 *
 * Hrefs are resolved against the product source, so a typo drops the link
 * instead of producing a 404. `scripts/check-links.mjs` fails the build when a
 * documented href does not exist.
 */
export function RelatedLinks({ source, hrefs }: { source: DocsSource; hrefs?: string[] }) {
  if (!hrefs?.length) return null;

  const pages = hrefs
    .map((href) => source.getPages().find((page) => page.url === href))
    .filter((page): page is NonNullable<typeof page> => Boolean(page));

  if (!pages.length) return null;

  return (
    <nav
      aria-label="Related documentation"
      className="not-prose border-fd-border mt-12 border-t pt-6"
    >
      <h2 className="font-heading text-fd-muted-foreground text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">
        Related documentation
      </h2>
      <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {pages.map((page) => (
          <li key={page.url}>
            <Link
              href={page.url}
              className="group text-fd-foreground hover:text-fd-primary flex items-baseline gap-2 text-sm"
            >
              <span aria-hidden="true" className="text-fd-muted-foreground">
                →
              </span>
              <span className="decoration-fd-border group-hover:decoration-fd-primary underline underline-offset-4">
                {page.data.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
