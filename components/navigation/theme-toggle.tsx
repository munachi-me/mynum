'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';

const options = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
] as const;

// Renders "system" on the server and the real preference after hydration,
// without a mount effect that would trigger a second render pass.
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const current = mounted ? (theme ?? 'system') : 'system';

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn('border-fd-border inline-flex items-center gap-0.5 border p-0.5', className)}
    >
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          aria-pressed={current === value}
          title={`${label} theme`}
          className={cn(
            'flex size-7 items-center justify-center transition-colors',
            current === value
              ? 'bg-fd-foreground text-fd-background'
              : 'text-fd-muted-foreground hover:text-fd-foreground',
          )}
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
