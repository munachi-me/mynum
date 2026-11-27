import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/navigation/site-header';
import { SiteFooter } from '@/components/navigation/site-footer';
import { DocLinkList, FeatureSection, LandingHero } from '@/components/marketing/landing';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Numiq — data analysis engine',
  description:
    'Numiq is a JavaScript and TypeScript data analysis engine: load CSV, TSV and JSON, build immutable datasets, query, aggregate, run statistics and validate pipelines.',
  alternates: { canonical: '/numiq' },
  openGraph: {
    title: 'Numiq — data analysis engine',
    description: 'Load, prepare, query and analyze structured data with an immutable dataset API.',
    url: '/numiq',
  },
};

const features = [
  {
    title: 'Data loading',
    body: 'Parse CSV, TSV and JSON from strings, URLs, Blobs, File objects and in-memory rows, with an import report for every load.',
  },
  {
    title: 'Immutable datasets',
    body: 'Filter, sort, select, rename, cast and derive columns. Each operation returns a new dataset and never mutates the input.',
  },
  {
    title: 'Query builder',
    body: 'Compose conditions with comparison, range, set, string and null operators, then combine them with and/or/not.',
  },
  {
    title: 'Grouping and aggregation',
    body: 'Group by one or more columns and aggregate with built-ins or your own reducer, keeping group order under your control.',
  },
  {
    title: 'Statistics',
    body: 'Describe, correlate, rank, standardize, detect outliers, build five-number summaries and run hypothesis tests.',
  },
  {
    title: 'Joins and reshaping',
    body: 'Inner, left, right and full joins with key mapping and collision suffixes, plus pivot, melt and row concatenation.',
  },
  {
    title: 'Window functions',
    body: 'Row numbers, rank, dense rank, lag, lead, running totals and rolling windows over partitioned, ordered rows.',
  },
  {
    title: 'Time series',
    body: 'Parse timestamps, sort chronologically, extract periods and resample to hourly, daily, weekly, monthly or yearly buckets.',
  },
  {
    title: 'Pipelines and validation',
    body: 'Chain steps, validate against a schema, collect a report per step and inspect the lineage of the final dataset.',
  },
];

const docsLinks = [
  {
    label: 'Introduction',
    href: '/numiq/docs',
    description: 'What Numiq is and how it fits together',
  },
  {
    label: 'Getting started',
    href: '/numiq/docs/getting-started',
    description: 'Install, create a dataset, run a first analysis',
  },
  {
    label: 'Data loading',
    href: '/numiq/docs/data-loading',
    description: 'Sources, options, type inference and import reports',
  },
  {
    label: 'Datasets and transformation',
    href: '/numiq/docs/transformation',
    description: 'Cleaning, deriving columns and chaining operations',
  },
  {
    label: 'Statistics and analysis',
    href: '/numiq/docs/statistics',
    description: 'Descriptions, correlations, outliers and tests',
  },
  {
    label: 'API reference',
    href: '/numiq/docs/api',
    description: 'Every public export, signature and error',
  },
];

export default function NumiqLandingPage() {
  return (
    <div data-product="numiq" className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <LandingHero
          product="numiq"
          eyebrow={products.numiq.role}
          headline="Analyze and prepare structured data."
          description="Numiq is a JavaScript and TypeScript data analysis engine. Load a file or a URL, get an immutable dataset, then clean, query, group and summarize it with an API that stays out of your way."
          docsLabel="Read the Numiq docs"
        />

        <section aria-labelledby="numiq-example" className="border-fd-border border-t">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <h2 id="numiq-example" className="font-heading text-2xl font-semibold tracking-tight">
                A first analysis
              </h2>
              <p className="text-fd-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
                Load a sample dataset, keep the rows you care about and aggregate them by region.
                The result is another dataset, so you can chain the next step directly.
              </p>
              <p className="text-fd-muted-foreground mt-4 text-sm leading-relaxed">
                This example uses the exports documented in the{' '}
                <Link href="/numiq/docs/api" className="font-medium text-[#c24100] hover:underline">
                  API reference
                </Link>
                .
              </p>
            </div>
            <pre className="border-fd-border bg-fd-muted overflow-x-auto border px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
              <code>{`import { useSampleDataset } from "@munachi-me/numiq";

const data = await useSampleDataset();

const byRegion = data
  .filter((row) => Number(row.revenue) > 0)
  .groupBy("region")
  .aggregate({
    revenue: { column: "revenue", op: "sum" },
    orders: { column: "order_id", op: "count" },
  });

console.log(byRegion.toRows());
console.log(byRegion.describe().table());`}</code>
            </pre>
          </div>
        </section>

        <FeatureSection
          id="numiq-features"
          title="What Numiq does"
          intro="Capabilities in the published 2.0.1 release. Anything not listed here is not part of the package."
          features={features}
        />

        <section aria-labelledby="numiq-independence" className="border-fd-border border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <h2
              id="numiq-independence"
              className="font-heading text-2xl font-semibold tracking-tight"
            >
              Independent by design
            </h2>
            <p className="text-fd-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              Numiq has no visualization dependency and never imports Numviz. Use it in a script, a
              server action, a data pipeline or a test suite. When you also need to present the
              results, the dataset exposes plain rows that any consumer can read.
            </p>
            <p className="text-fd-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              The reverse is also true: Numviz does not require Numiq. The two packages share a data
              shape, not a dependency.
            </p>
          </div>
        </section>

        <DocLinkList title="Numiq documentation" links={docsLinks} />
      </main>

      <SiteFooter />
    </div>
  );
}
