import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Wraps an example that is illustrative rather than executable in the browser.
 * The label is explicit so a reader never mistakes static output for a live run.
 */
export function ExampleFrame({
  title,
  note,
  children,
  className,
}: {
  title?: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn('not-prose border-fd-border my-6 border', className)}>
      {title ? (
        <figcaption className="border-fd-border flex flex-wrap items-baseline justify-between gap-2 border-b px-4 py-2">
          <span className="font-heading text-fd-foreground text-[0.8125rem] font-semibold">
            {title}
          </span>
          <span className="text-fd-muted-foreground text-[0.6875rem] tracking-[0.08em] uppercase">
            {note ?? 'Illustrative example'}
          </span>
        </figcaption>
      ) : null}
      <div className="px-4 py-3 text-sm [&_pre]:my-0">{children}</div>
    </figure>
  );
}
