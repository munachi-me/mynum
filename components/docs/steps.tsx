import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Steps({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ol className={cn('not-prose border-fd-border my-6 space-y-5 border-s ps-6', className)}>
      {children}
    </ol>
  );
}

export function Step({
  title,
  children,
  index,
}: {
  title: string;
  children?: ReactNode;
  index?: number;
}) {
  return (
    <li className="relative">
      <span className="border-fd-border bg-fd-background text-fd-muted-foreground absolute -start-[1.9rem] flex size-6 items-center justify-center rounded-full border font-mono text-[0.6875rem]">
        {index ?? ''}
      </span>
      <p className="font-heading text-fd-foreground text-sm font-semibold">{title}</p>
      {children ? (
        <div className="text-fd-muted-foreground mt-1.5 text-sm leading-relaxed">{children}</div>
      ) : null}
    </li>
  );
}
