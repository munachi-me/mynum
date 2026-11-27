'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { GitHubMark, NpmMark } from '@/components/branding/icons';
import { SiteWordmark } from '@/components/branding/logo';
import { ProductSwitcher } from '@/components/navigation/product-switcher';
import { SearchTrigger } from '@/components/navigation/search-trigger';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { products, type ProductId } from '@/lib/products';
import { cn } from '@/lib/cn';

function useActiveProduct(): ProductId {
  const pathname = usePathname();
  return pathname.startsWith('/numviz') ? 'numviz' : 'numiq';
}

export function SiteHeader() {
  const productId = useActiveProduct();
  const product = products[productId];
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: product.landing, label: 'Overview' },
    { href: product.docsBase, label: 'Docs' },
    { href: `${product.docsBase}/api`, label: 'API' },
    { href: `${product.docsBase}/examples`, label: 'Examples' },
  ];

  return (
    <header className="border-fd-border bg-fd-background sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Numiq Docs home">
          <SiteWordmark />
        </Link>

        <span aria-hidden="true" className="bg-fd-border mx-1 hidden h-5 w-px sm:block" />

        <ProductSwitcher current={productId} className="hidden sm:block" compact />

        <nav aria-label="Main" className="ml-2 hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === pathname ||
              (link.label === 'Docs' &&
                pathname.startsWith(product.docsBase) &&
                !pathname.includes('/api') &&
                !pathname.includes('/examples')) ||
              (link.label === 'API' && pathname.startsWith(`${product.docsBase}/api`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-2.5 py-1.5 text-sm transition-colors',
                  active
                    ? 'text-fd-foreground'
                    : 'text-fd-muted-foreground hover:text-fd-foreground',
                )}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger />
          <a
            href={product.github}
            className="border-fd-border text-fd-muted-foreground hover:border-fd-foreground/40 hover:text-fd-foreground hidden size-8 items-center justify-center border transition-colors sm:flex"
            aria-label={`${product.name} on GitHub`}
          >
            <GitHubMark className="size-4" />
          </a>
          <a
            href={product.npm}
            className="border-fd-border text-fd-muted-foreground hover:border-fd-foreground/40 hover:text-fd-foreground hidden h-8 items-center justify-center border px-2 font-mono text-[0.6875rem] transition-colors sm:flex"
            aria-label={`${product.name} on npm`}
          >
            <NpmMark className="h-3 w-6" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="border-fd-border text-fd-muted-foreground flex size-8 items-center justify-center border md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-menu" className="border-fd-border bg-fd-background border-t md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <ProductSwitcher current={productId} className="mb-3 sm:hidden" />
            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-fd-border text-fd-foreground border-b py-2.5 text-sm last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={product.github}
                className="border-fd-border text-fd-muted-foreground border-b py-2.5 text-sm"
              >
                GitHub
              </a>
              <a href={product.npm} className="text-fd-muted-foreground py-2.5 text-sm">
                npm package
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
