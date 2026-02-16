'use client';

import { type IconComponent, Monitor, Moon, Sun } from '@/components/icons';
import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { type Appearance, useAppearance } from './use-appearance';

const TABS: { value: Appearance; icon: IconComponent; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Clara' },
  { value: 'dark', icon: Moon, label: 'Oscura' },
  { value: 'system', icon: Monitor, label: 'Del sistema' },
];

/**
 * Pestañas para elegir la apariencia (clara, oscura o del sistema), para una página de ajustes.
 *
 * @param props Props del contenedor; `className` se suma a sus clases.
 */
export function AppearanceTabs({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
      {TABS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => updateAppearance(value)}
          aria-pressed={appearance === value}
          className={cn(
            'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
            appearance === value
              ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
              : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
          )}
        >
          <Icon className="-ml-1 h-4 w-4" />
          <span className="ml-1.5 text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
}
