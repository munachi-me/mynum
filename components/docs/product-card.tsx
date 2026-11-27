import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { products, type ProductId } from '@/lib/products';

export function ProductBadge({
  product,
  children,
  className,
}: {
  product: ProductId;
  children?: ReactNode;
  className?: string;
}) {
  const config = products[product];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-0.5 text-[0.6875rem] font-medium tracking-[0.08em] uppercase',
        className,
      )}
      style={{ borderColor: config.accent, color: config.accent }}
    >
      {children ?? config.name}
    </span>
  );
}

export function ProductCard({
  product,
  title,
  children,
  href,
}: {
  product: ProductId;
  title?: string;
  children: ReactNode;
  href?: string;
}) {
  const config = products[product];
  const content = (
    <>
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="size-2 rounded-[1px]"
          style={{ backgroundColor: config.accent }}
        />
        <span className="font-heading text-base font-semibold">{title ?? config.name}</span>
      </span>
      <span className="text-fd-muted-foreground mt-2 block text-sm leading-relaxed">
        {children}
      </span>
    </>
  );

  const className =
    'block border border-fd-border bg-fd-card/40 p-5 transition-colors hover:border-fd-foreground/30';

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
