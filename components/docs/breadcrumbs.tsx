import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ProductConfig } from '@/lib/products';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ product, crumbs }: { product: ProductConfig; crumbs: Crumb[] }) {
  const items: Crumb[] = [
    { label: 'Home', href: '/' },
    { label: product.name, href: product.landing },
    { label: 'Docs', href: product.docsBase },
    ...crumbs,
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="text-fd-muted-foreground flex flex-wrap items-center gap-1 text-xs">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-fd-foreground transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className="text-fd-foreground">
                  {item.label}
                </span>
              )}
              {last ? null : <ChevronRight className="size-3 opacity-60" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
