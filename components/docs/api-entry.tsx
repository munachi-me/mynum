import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A structured API entry. Keeps signatures, parameter tables and notes in one
 * consistent shape across both reference sections.
 */
export function ApiEntry({
  name,
  signature,
  children,
  className,
}: {
  name: string;
  signature?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn('not-prose border-fd-border my-8 scroll-mt-24 border-t pt-6', className)}
    >
      <h3 id={name} className="text-fd-foreground font-mono text-[0.9375rem] font-semibold">
        {name}
      </h3>
      {signature ? (
        <pre className="border-fd-border bg-fd-muted/60 text-fd-foreground mt-2 overflow-x-auto rounded-[4px] border px-3 py-2 font-mono text-[0.8125rem] leading-6">
          <code>{signature}</code>
        </pre>
      ) : null}
      <div className="prose prose-sm mt-3 max-w-none">{children}</div>
    </section>
  );
}
