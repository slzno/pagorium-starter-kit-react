'use client';

import { Monitor, Moon, Sun } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type HTMLAttributes } from 'react';
import { useAppearance } from './use-appearance';

/**
 * Botón con menú para elegir la apariencia: clara, oscura o la del sistema. El ícono del botón muestra la
 * elegida.
 *
 * @param props Props del contenedor.
 */
export function AppearanceDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  const { appearance, updateAppearance } = useAppearance();
  const Current = appearance === 'dark' ? Moon : appearance === 'light' ? Sun : Monitor;

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-11.5 rounded-md">
            <Current className="h-5 w-5" />
            <span className="sr-only">Cambiar apariencia</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => updateAppearance('light')}>
            <span className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Clara
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('dark')}>
            <span className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Oscura
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('system')}>
            <span className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Del sistema
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
