import type { ReactNode } from 'react';

import { Text } from '@/design-system/components/Text/Text';
import { cn } from '@/design-system/lib/cn';

import { formatColor, useTokenColor } from './cssVar';

// Layout helpers for the foundation stories. Not part of the library.

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
    <div className="mx-auto flex max-w-5xl flex-col gap-12 pb-12">
      <header className="flex flex-col gap-2">
        <Text variant="title-1">{title}</Text>
        <Text tone="secondary" className="max-w-2xl text-pretty">
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
        <Text variant="title-2">{title}</Text>
        {description && (
          <Text tone="secondary" className="max-w-2xl text-pretty">
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
    <code className="w-fit rounded-xs bg-fill px-1.5 py-0.5 font-mono text-caption text-ink">
      {children}
    </code>
  );
}

/** A swatch for a color role, with the value it resolves to in this theme */
export function TokenSwatch({
  name,
  className,
  usage,
}: {
  name: string;
  className: string;
  usage: string;
}) {
  const value = useTokenColor(name);
  const isLine =
    className.startsWith('border-') || className.startsWith('outline-');
  const isText = className.startsWith('text-');

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'flex h-16 items-end rounded-control p-3',
          isLine || isText
            ? 'bg-surface'
            : 'shadow-[inset_0_0_0_1px_var(--separator)]',
          isLine && 'border-2',
        )}
        style={
          isLine
            ? { borderColor: `var(--${name})` }
            : isText
              ? undefined
              : { backgroundColor: `var(--${name})` }
        }
      >
        {isText && (
          <span
            className="text-title-2 font-semibold"
            style={{ color: `var(--${name})` }}
          >
            Aa
          </span>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <Text variant="headline" className="text-subhead">
          {name}
        </Text>
        <Text variant="code" tone="secondary" className="text-caption">
          {className}
        </Text>
        <Text variant="code" tone="secondary" className="text-caption">
          {formatColor(value)}
        </Text>
        <Text variant="caption">{usage}</Text>
      </div>
    </div>
  );
}
