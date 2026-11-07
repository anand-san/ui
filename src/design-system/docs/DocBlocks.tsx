import type { ReactNode } from 'react';

import { Text } from '@/design-system/components/Text/Text';
import { cn } from '@/design-system/lib/cn';

import { hslChannelsToHex, useCssVar } from './cssVar';

// Layout helpers for the foundation stories. Not part of the public library.

export function DocPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 pb-12">
      <header className="flex flex-col gap-2">
        <Text variant="title">{title}</Text>
        <Text variant="body-lg" tone="muted" className="max-w-2xl">
          {intro}
        </Text>
      </header>
      {children}
    </div>
  );
}

export function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Text variant="heading">{title}</Text>
        {description && (
          <Text tone="muted" className="max-w-2xl">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="w-fit rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
      {children}
    </code>
  );
}

/** A swatch for a semantic token, showing its live value in the current theme */
export function TokenSwatch({
  name,
  className,
  usage,
  onColor,
}: {
  name: string;
  className: string;
  usage: string;
  onColor?: string;
}) {
  const value = useCssVar(name);
  const isLine =
    className.startsWith('border-') || className.startsWith('ring-');
  const isText = className.startsWith('text-');

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'flex h-20 items-end rounded-xl p-3',
          isLine && 'border-2 bg-background',
          isText && 'bg-surface',
        )}
        style={
          isLine
            ? { borderColor: `hsl(var(--${name}))` }
            : isText
              ? undefined
              : {
                  backgroundColor: `hsl(var(--${name}))`,
                  boxShadow: 'inset 0 0 0 1px hsl(var(--border))',
                }
        }
      >
        {isText && (
          <span
            className="text-2xl font-semibold"
            style={{ color: `hsl(var(--${name}))` }}
          >
            Aa
          </span>
        )}
        {onColor && (
          <span
            className="text-sm font-medium"
            style={{ color: `hsl(var(--${onColor}))` }}
          >
            Aa
          </span>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <Text variant="body-strong">{name}</Text>
        <Text variant="code" tone="muted">
          {className}
        </Text>
        <Text variant="code" tone="muted">
          {hslChannelsToHex(value)} · hsl({value})
        </Text>
        <Text variant="caption">{usage}</Text>
      </div>
    </div>
  );
}
