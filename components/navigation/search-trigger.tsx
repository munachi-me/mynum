'use client';

import { Search } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { cn } from '@/lib/cn';

export function SearchTrigger({ className }: { className?: string }) {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className={cn(
        'border-fd-border text-fd-muted-foreground hover:border-fd-foreground/40 hover:text-fd-foreground flex items-center gap-2 border px-2.5 py-1.5 text-sm transition-colors',
        className,
      )}
    >
      <Search className="size-3.5" aria-hidden="true" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="border-fd-border text-fd-muted-foreground hidden items-center gap-0.5 border px-1 py-px font-mono text-[0.625rem] md:inline-flex">
        <span className="text-[0.6875rem]">⌘</span>K
      </kbd>
    </button>
  );
}
