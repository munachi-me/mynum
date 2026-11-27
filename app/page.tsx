import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProductIcon } from '@/components/branding/logo';
import { SiteHeader } from '@/components/navigation/site-header';
import { SiteFooter } from '@/components/navigation/site-footer';
import { productList, products } from '@/lib/products';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Tools for working with data · ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

const highlights = {
  numiq: [
    'Load CSV, TSV and JSON from files, URLs, Blobs and memory',
    'Immutable datasets with filtering, sorting and casting',
    'Query builder, grouping and aggregation',
    'Descriptions, correlations, outliers and hypothesis tests',
    'Joins, pivots, window functions and calendar resampling',
    'Schema validation and pipelines with per-step reports',
  ],
  numviz: [
    'Eleven SVG chart types with axes, legends and tooltips',
    'Accessible tables with sorting, search and pagination',
    'KPI cards with comparisons, trends and semantic states',
    'Responsive dashboards with filters and cross-filtering',
    'SVG, PNG, CSV, JSON and HTML export',
    'Standalone HTML dashboard export from Node.js',
  ],
} as const;

const workflow = [
  {
    title: 'Load data with Numiq',
    body: 'Read a CSV, TSV or JSON source and get a normalized, immutable dataset with an import report.',
  },
  {
    title: 'Prepare and analyze the data',
    body: 'Clean, filter, group, join and summarize. Every step returns a new dataset, so the input is never mutated.',
  },
  {
    title: 'Visualize results with Numviz',
    body: 'Pass the resulting rows to a chart, table or dashboard. Numviz reads plain records and the public dataset shape.',
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20">
          <p className="text-fd-muted-foreground text-[0.6875rem] font-medium tracking-[0.14em] uppercase">
            Numiq ecosystem
          </p>
          <h1 className="font-heading mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Tools for working with data.
          </h1>
          <p className="text-fd-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            Two focused JavaScript tools for data analysis and data visualization. Use each
            independently, or combine them when your workflow needs both.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={products.numiq.landing}
              className="bg-numiq font-heading inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition-opacity hover:opacity-90"
            >
              Explore Numiq
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={products.numviz.landing}
              className="bg-numviz font-heading inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore Numviz
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="border-fd-border border-t">
          <div className="mx-auto grid w-full max-w-6xl gap-0 px-4 sm:px-6 lg:grid-cols-2">
            {productList.map((product, index) => (
              <section
                key={product.id}
                aria-labelledby={`${product.id}-heading`}
                className={
                  index === 0
                    ? 'py-12 lg:pr-12'
                    : 'border-fd-border border-t py-12 lg:border-t-0 lg:border-l lg:pt-12 lg:pl-12'
                }
              >
                <div className="flex items-center gap-3">
                  <ProductIcon product={product.id} className="size-8" />
                  <div>
                    <h2
                      id={`${product.id}-heading`}
                      className="font-heading text-2xl font-semibold tracking-tight"
                    >
                      {product.name}
                    </h2>
                    <p className="text-fd-muted-foreground text-[0.6875rem] font-medium tracking-[0.1em] uppercase">
                      {product.role}
                    </p>
                  </div>
                </div>

                <p className="text-fd-muted-foreground mt-5 max-w-md text-sm leading-relaxed">
                  {product.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {highlights[product.id].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0"
                        style={{ backgroundColor: product.accent }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <pre className="border-fd-border bg-fd-muted mt-7 overflow-x-auto border px-4 py-3 font-mono text-[0.8125rem] leading-relaxed">
                  <code>{product.install}</code>
                </pre>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <Link
                    href={product.docsBase}
                    className="inline-flex items-center gap-1.5 font-medium hover:underline"
                    style={{ color: product.accent }}
                  >
                    Documentation
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <a
                    href={product.github}
                    className="text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center gap-1"
                  >
                    GitHub
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={product.npm}
                    className="text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center gap-1"
                  >
                    npm
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </section>
            ))}
          </div>
        </div>

        <section aria-labelledby="workflow-heading" className="border-fd-border border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2
                id="workflow-heading"
                className="font-heading text-2xl font-semibold tracking-tight"
              >
                Using both tools together
              </h2>
              <p className="text-fd-muted-foreground text-[0.6875rem] font-medium tracking-[0.1em] uppercase">
                Optional workflow
              </p>
            </div>

            <ol className="mt-8 grid gap-8 sm:grid-cols-3">
              {workflow.map((step, index) => (
                <li key={step.title}>
                  <p className="text-fd-muted-foreground font-mono text-[0.75rem]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-heading mt-2 text-base font-semibold">{step.title}</h3>
                  <p className="text-fd-muted-foreground mt-2 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>

            <p className="text-fd-muted-foreground mt-8 max-w-2xl text-sm leading-relaxed">
              The workflow is a convenience, not a requirement. Numiq has no visualization
              dependency and Numviz accepts plain arrays, so either package works on its own.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
