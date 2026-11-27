import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProductIcon } from '@/components/branding/logo';
import { products, type ProductId } from '@/lib/products';

export function LandingHero({
  product,
  eyebrow,
  headline,
  description,
  docsLabel = 'Read the documentation',
}: {
  product: ProductId;
  eyebrow: string;
  headline: string;
  description: string;
  docsLabel?: string;
}) {
  const config = products[product];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
      <div className="flex items-center gap-3">
        <ProductIcon product={product} className="size-9" />
        <div>
          <p className="font-heading text-lg leading-none font-semibold">{config.name}</p>
          <p className="text-fd-muted-foreground mt-1 text-[0.6875rem] font-medium tracking-[0.1em] uppercase">
            {eyebrow}
          </p>
        </div>
      </div>

      <h1 className="font-heading mt-7 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {headline}
      </h1>
      <p className="text-fd-muted-foreground mt-5 max-w-2xl text-base leading-relaxed">
        {description}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={config.docsBase}
          className="font-heading inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold"
          style={{ backgroundColor: config.accent, color: config.accentForeground }}
        >
          {docsLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a
          href={config.github}
          className="border-fd-border text-fd-foreground hover:border-fd-foreground/40 inline-flex items-center justify-center gap-1.5 border px-5 py-2.5 text-sm transition-colors"
        >
          GitHub
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
        <a
          href={config.npm}
          className="border-fd-border text-fd-foreground hover:border-fd-foreground/40 inline-flex items-center justify-center gap-1.5 border px-5 py-2.5 text-sm transition-colors"
        >
          npm
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <pre className="border-fd-border bg-fd-muted mt-8 w-full max-w-xl overflow-x-auto border px-4 py-3 font-mono text-[0.8125rem] leading-relaxed">
        <code>{config.install}</code>
      </pre>
      <p className="text-fd-muted-foreground mt-3 text-xs">
        Package version documented here: {config.version}
      </p>
    </section>
  );
}

export function FeatureSection({
  id,
  title,
  intro,
  features,
}: {
  id: string;
  title: string;
  intro?: string;
  features: readonly { title: string; body: string }[];
}) {
  return (
    <section aria-labelledby={id} className="border-fd-border border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <h2 id={id} className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {intro ? (
          <p className="text-fd-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">{intro}</p>
        ) : null}

        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title}>
              <dt className="font-heading text-[0.9375rem] font-semibold">{feature.title}</dt>
              <dd className="text-fd-muted-foreground mt-1.5 text-sm leading-relaxed">
                {feature.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function DocLinkList({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; description?: string }[];
}) {
  return (
    <section aria-labelledby={`${title}-heading`} className="border-fd-border border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 id={`${title}-heading`} className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <ul className="divide-fd-border border-fd-border mt-6 divide-y border-y">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-fd-foreground flex flex-col gap-1 py-3.5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-sm font-medium">{link.label}</span>
                {link.description ? (
                  <span className="text-fd-muted-foreground text-sm sm:text-right">
                    {link.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
