'use client';

import { type IconComponent, MoreHorizontal } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

/**
 * Acción del menú de una fila: enlace (`href`) o función (`onSelect`); `destructive` la pinta en rojo y
 * `hidden` la oculta (por ejemplo, sin permiso).
 */
export type RowAction = {
  label: string;
  icon: IconComponent;
  href?: string;
  onSelect?: () => void;
  destructive?: boolean;
  hidden?: boolean;
};

/**
 * Botón «⋯» con el menú de acciones de una fila; las destructivas van al final, separadas y en rojo. Sin
 * acciones visibles no dibuja nada.
 *
 * @param label Nombre del registro, para el texto accesible del botón.
 * @param actions Acciones del menú.
 * @param title Etiqueta del menú.
 */
export function RowActions({ label, actions, title = 'Acciones' }: { label: string; actions: RowAction[]; title?: string }) {
  const visible = actions.filter((action) => !action.hidden);
  const regular = visible.filter((action) => !action.destructive);
  const destructive = visible.filter((action) => action.destructive);

  if (visible.length === 0) {
    return null;
  }

  /**
   * Un elemento del menú, como enlace o como acción.
   *
   * @param action Acción.
   */
  const item = (action: RowAction) => {
    const className = action.destructive ? 'text-destructive focus:bg-destructive/10 focus:text-destructive [&_svg]:text-destructive' : undefined;

    return action.href ? (
      <DropdownMenuItem key={action.label} className={className} asChild>
        <Link href={action.href}>
          <action.icon />
          {action.label}
        </Link>
      </DropdownMenuItem>
    ) : (
      <DropdownMenuItem key={action.label} className={className} onSelect={action.onSelect}>
        <action.icon />
        {action.label}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title={title}
          className="bg-muted text-foreground/80 hover:bg-foreground/10 hover:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground size-8 rounded-full"
        >
          <MoreHorizontal />
          <span className="sr-only">
            {title} de {label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {/* La etiqueta del menú va dentro de su grupo. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">{title}</DropdownMenuLabel>
          {regular.map(item)}
        </DropdownMenuGroup>
        {destructive.length > 0 && regular.length > 0 && <DropdownMenuSeparator />}
        {destructive.map(item)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
