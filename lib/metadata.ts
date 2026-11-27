import type { Metadata } from 'next';
import type { ProductConfig } from '@/lib/products';

interface PageLike {
  url: string;
  data: {
    title: string;
    description?: string;
  };
}

export function docsMetadata(page: PageLike, product: ProductConfig): Metadata {
  const title = `${page.data.title} · ${product.name}`;
  const description = page.data.description;

  return {
    title,
    description,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'article',
      title,
      description,
      url: page.url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
