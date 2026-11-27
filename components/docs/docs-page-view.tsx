import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/components/mdx';
import { RelatedLinks } from '@/components/docs/related-links';
import { Breadcrumbs, type Crumb } from '@/components/docs/breadcrumbs';
import type { DocsSource } from '@/lib/source';
import type { ProductConfig } from '@/lib/products';

type Page = NonNullable<ReturnType<DocsSource['getPage']>>;

export function DocsPageView({
  source,
  page,
  product,
}: {
  source: DocsSource;
  page: Page;
  product: ProductConfig;
}) {
  const MDX = page.data.body;
  const [section, ...rest] = page.slugs;

  const crumbs: Crumb[] =
    section === 'api' && rest.length > 0
      ? [{ label: 'API reference', href: `${product.docsBase}/api` }]
      : [];

  crumbs.push({ label: page.data.title });

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <Breadcrumbs product={product} crumbs={crumbs} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <RelatedLinks source={source} hrefs={page.data.related} />
      </DocsBody>
    </DocsPage>
  );
}
