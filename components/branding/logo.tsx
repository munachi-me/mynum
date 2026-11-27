import { products, type ProductId } from '@/lib/products';
import { cn } from '@/lib/cn';

interface IconProps {
  product: ProductId;
  className?: string;
}

/**
 * Approved product marks, drawn as flat single-colour geometry.
 *
 * Numiq: a geometric N built from two stems and a diagonal.
 * Numviz: three ascending bars.
 *
 * The raster assets referenced by the brief (`public/logos/*.png`) were not
 * present in either package repository, so these vector marks are the
 * documented interim artwork. Replace them with the approved files when they
 * are available; do not redraw them by hand.
 */
export function ProductIcon({ product, className }: IconProps) {
  const accent = products[product].accent;

  if (product === 'numiq') {
    return (
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className={cn('size-7 shrink-0', className)}
      >
        <g fill={accent}>
          <rect x="3" y="5" width="6" height="22" />
          <rect x="23" y="5" width="6" height="22" />
          <path d="M9 5h6l14 22h-6L9 5Z" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn('size-7 shrink-0', className)}
    >
      <g fill={accent}>
        <rect x="4" y="20" width="6" height="8" />
        <rect x="13" y="13" width="6" height="15" />
        <rect x="22" y="4" width="6" height="24" />
      </g>
    </svg>
  );
}

interface LockupProps {
  product: ProductId;
  className?: string;
  iconClassName?: string;
  /** Show the product role under the name. */
  withRole?: boolean;
}

export function ProductLockup({ product, className, iconClassName, withRole }: LockupProps) {
  const config = products[product];

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <ProductIcon product={product} className={iconClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-fd-foreground text-[1.0625rem] font-semibold tracking-tight">
          {config.name}
        </span>
        {withRole ? (
          <span className="text-fd-muted-foreground mt-1 text-[0.6875rem] tracking-[0.08em] uppercase">
            {config.role}
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** The site wordmark. The repository is `mynum`; the product is Numiq Docs. */
export function SiteWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-heading text-[1.0625rem] font-semibold tracking-tight', className)}>
      <span className="text-fd-foreground">Numiq</span>{' '}
      <span className="text-fd-muted-foreground">Docs</span>
    </span>
  );
}
