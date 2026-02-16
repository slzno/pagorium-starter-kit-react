'use client';

import { LeafMoon, LeafSun } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppearance } from './use-appearance';

/**
 * Botón redondo de tema claro u oscuro de la barra superior, con su ayuda emergente. Cambia el tema al
 * instante (ver `useAppearance`); `onThemeChange` sirve para guardarlo también en el servidor.
 *
 * @param onThemeChange Se llama con el tema nuevo después de aplicarlo.
 */
export function ThemeToggle({ onThemeChange }: { onThemeChange?: (theme: 'light' | 'dark') => void }) {
  const { resolved, updateAppearance } = useAppearance();
  const isDark = resolved === 'dark';
  const label = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';

  /**
   * Cambia al tema contrario y avisa.
   */
  const toggle = (): void => {
    const next = isDark ? 'light' : 'dark';

    updateAppearance(next);
    onThemeChange?.(next);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="group bg-frame text-foreground/80 hover:text-foreground size-11.5 rounded-full hover:bg-[color-mix(in_oklab,var(--frame),var(--foreground)_8%)]"
            onClick={toggle}
            aria-label={label}
          >
            {isDark ? (
              <LeafSun className="!size-[22px] opacity-80 group-hover:opacity-100" />
            ) : (
              <LeafMoon className="!size-[22px] opacity-80 group-hover:opacity-100" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
