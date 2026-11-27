import { numiqSource, numvizSource } from './source';
import { products } from './products';

interface SearchIndexEntry {
  title: string;
  description?: string;
  url: string;
  breadcrumbs: string[];
  content: string;
  keywords: string;
}

/**
 * Build one static index covering both products.
 *
 * Each entry carries the product name as its first breadcrumb so a result can
 * be attributed to Numiq or Numviz in the search dialog.
 */
export async function buildSearchIndexes(): Promise<SearchIndexEntry[]> {
  const groups = [
    { source: numiqSource, product: products.numiq },
    { source: numvizSource, product: products.numviz },
  ] as const;

  const indexes: SearchIndexEntry[] = [];

  for (const { source, product } of groups) {
    for (const page of source.getPages()) {
      const content = await page.data.getText('processed');

      indexes.push({
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        breadcrumbs: [product.name],
        content,
        keywords: [product.name, product.role, product.packageName, ...page.slugs].join(' '),
      });
    }
  }

  return indexes;
}
