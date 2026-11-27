'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { ProductIcon } from '@/components/branding/logo';
import { productList, type ProductId } from '@/lib/products';
import { cn } from '@/lib/cn';

export function ProductSwitcher({
  current,
  className,
  compact = false,
  iconOnly = false,
}: {
  current?: ProductId;
  className?: string;
  compact?: boolean;
  iconOnly?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const activeId =
    current ??
    (pathname.startsWith('/numviz') ? 'numviz' : pathname.startsWith('/numiq') ? 'numiq' : null);
  const active = productList.find((product) => product.id === activeId);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={iconOnly ? 'Switch product documentation' : undefined}
        title={iconOnly ? 'Switch product documentation' : undefined}
        className={cn(
          'border-fd-border bg-fd-background hover:border-fd-foreground/40 flex items-center gap-2 border text-sm transition-colors',
          iconOnly ? 'size-7 justify-center' : 'px-2.5 py-1.5',
          compact && !iconOnly && 'py-1',
        )}
      >
        {iconOnly ? (
          <ChevronsUpDown className="text-fd-muted-foreground size-3.5" aria-hidden="true" />
        ) : (
          <>
            {active ? <ProductIcon product={active.id} className="size-4" /> : null}
            <span className="font-medium">{active ? active.name : 'Products'}</span>
            <ChevronDown
              className={cn(
                'text-fd-muted-foreground size-3.5 transition-transform',
                open && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </>
        )}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Documentation products"
          className="border-fd-border bg-fd-popover absolute top-[calc(100%+6px)] left-0 z-50 w-72 border p-1 shadow-sm"
        >
          {productList.map((product) => {
            const isActive = product.id === activeId;
            return (
              <Link
                key={product.id}
                role="menuitem"
                href={product.docsBase}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-start gap-3 px-3 py-2.5 transition-colors',
                  isActive ? 'bg-fd-muted' : 'hover:bg-fd-muted',
                )}
              >
                <ProductIcon product={product.id} className="mt-0.5 size-5" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-heading text-sm font-semibold">{product.name}</span>
                    <span className="text-fd-muted-foreground font-mono text-[0.625rem]">
                      v{product.version}
                    </span>
                  </span>
                  <span className="text-fd-muted-foreground mt-0.5 block text-xs leading-snug">
                    {product.role}
                  </span>
                </span>
                {isActive ? (
                  <Check className="text-fd-muted-foreground mt-1 size-3.5" aria-hidden="true" />
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
