import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsPageView } from '@/components/docs/docs-page-view';
import { numvizSource } from '@/lib/source';
import { products } from '@/lib/products';
import { docsMetadata } from '@/lib/metadata';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = numvizSource.getPage(params.slug);

  if (!page) notFound();

  return <DocsPageView source={numvizSource} page={page} product={products.numviz} />;
}

export function generateStaticParams() {
  return numvizSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = numvizSource.getPage(params.slug);

  if (!page) notFound();

  return docsMetadata(page, products.numviz);
}
