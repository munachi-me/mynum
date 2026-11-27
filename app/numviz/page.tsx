import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/navigation/site-header';
import { SiteFooter } from '@/components/navigation/site-footer';
import { DocLinkList, FeatureSection, LandingHero } from '@/components/marketing/landing';
import { products } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Numviz — data visualization library',
  description:
    'Numviz is a framework-independent JavaScript and TypeScript visualization library: charts, tables, KPI metrics, dashboards, reports and standalone HTML export.',
  alternates: { canonical: '/numviz' },
  openGraph: {
    title: 'Numviz — data visualization library',
    description:
      'Render charts, data tables, KPI metrics and dashboards from plain JavaScript data.',
    url: '/numviz',
  },
};

const features = [
  {
    title: 'Eleven chart types',
    body: 'Bar, grouped bar, stacked bar, horizontal bar, line, area, scatter, histogram, radar, pie and doughnut, all drawn as SVG.',
  },
  {
    title: 'Accessible tables',
    body: 'Columns, formatting, sorting, search, pagination, selection, row numbers and empty, loading and error states.',
  },
  {
    title: 'KPI metrics',
    body: 'Compute an aggregation, compare it with a baseline, and render the value with direction, trend and semantic state.',
  },
  {
    title: 'Dashboards',
    body: 'A responsive grid of charts, tables, metrics and content, with filters, cross-filtering and serializable state.',
  },
  {
    title: 'Reports',
    body: 'Dashboard presets for executive, analytical, KPI, table and chart layouts, with print styles and metadata.',
  },
  {
    title: 'Export',
    body: 'Chart SVG and PNG, table CSV, JSON and HTML, and a standalone HTML dashboard written by a Node.js build script.',
  },
  {
    title: 'Themes',
    body: 'Light, dark and system modes with token overrides per chart, table, metric or dashboard, and no colour leaks between components.',
  },
  {
    title: 'Framework independence',
    body: 'The core package has no runtime dependencies and never imports React. Charts, tables and metrics mount on a selector or an element.',
  },
  {
    title: 'Optional React',
    body: 'Chart, DataTable, Metric, Dashboard and DashboardWidget ship from a separate subpath with client-safe rendering.',
  },
];

const docsLinks = [
  {
    label: 'Introduction',
    href: '/numviz/docs',
    description: 'What Numviz is and how the pieces fit',
  },
  {
    label: 'Getting started',
    href: '/numviz/docs/getting-started',
    description: 'Install and render a first chart',
  },
  {
    label: 'Charts',
    href: '/numviz/docs/charts',
    description: 'Every chart type, option and default',
  },
  {
    label: 'Tables and metrics',
    href: '/numviz/docs/tables',
    description: 'Columns, formatting, states and KPI cards',
  },
  {
    label: 'Dashboards and export',
    href: '/numviz/docs/dashboards',
    description: 'Layouts, filters and standalone output',
  },
  {
    label: 'API reference',
    href: '/numviz/docs/api',
    description: 'Every public export, type and error code',
  },
];

export default function NumvizLandingPage() {
  return (
    <div data-product="numviz" className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <LandingHero
          product="numviz"
          eyebrow={products.numviz.role}
          headline="Visualize and present data."
          description="Numviz turns plain JavaScript data into charts, tables, KPI cards and dashboards. It works in any framework, needs no build-time integration, and can export a finished dashboard as a static site."
          docsLabel="Read the Numviz docs"
        />

        <section aria-labelledby="numviz-example" className="border-fd-border border-t">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <h2
                id="numviz-example"
                className="font-heading text-2xl font-semibold tracking-tight"
              >
                A first chart
              </h2>
              <p className="text-fd-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
                Give Numviz rows and the fields to read. It renders into any container and updates
                in place when the data changes.
              </p>
              <p className="text-fd-muted-foreground mt-4 text-sm leading-relaxed">
                See the{' '}
                <Link
                  href="/numviz/docs/charts"
                  className="font-medium text-[#15803c] hover:underline"
                >
                  chart guide
                </Link>{' '}
                for every type and option.
              </p>
            </div>
            <pre className="border-fd-border bg-fd-muted overflow-x-auto border px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
              <code>{`import { createChart, createMetric } from "@munachi-me/numviz";

const rows = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 41000 },
  { month: "Mar", revenue: 38500 },
];

createChart({
  type: "bar",
  data: rows,
  x: "month",
  y: "revenue",
  title: "Revenue",
}).render("#chart");

createMetric({
  name: "Total revenue",
  data: rows,
  column: "revenue",
  aggregation: "sum",
  format: "currency",
}).render("#metric");`}</code>
            </pre>
          </div>
        </section>

        <FeatureSection
          id="numviz-features"
          title="What Numviz does"
          intro="Capabilities in the published 1.0.2 release. Anything not listed here is not part of the package."
          features={features}
        />

        <section aria-labelledby="numviz-independence" className="border-fd-border border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <h2
              id="numviz-independence"
              className="font-heading text-2xl font-semibold tracking-tight"
            >
              Independent by design
            </h2>
            <p className="text-fd-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              Numviz does not require Numiq. It accepts plain arrays of records, arrays of arrays
              with a column list, and any object that exposes `columns`, `rows` or `data`. React is
              optional too: the core entry never imports it.
            </p>
            <p className="text-fd-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              When you already analyze data with Numiq, pass the resulting dataset straight to a
              chart or table. That combination is convenient, not mandatory.
            </p>
          </div>
        </section>

        <DocLinkList title="Numviz documentation" links={docsLinks} />
      </main>

      <SiteFooter />
    </div>
  );
}
