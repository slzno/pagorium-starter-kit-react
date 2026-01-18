import { type IconComponent } from '@/components/icons';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

/**
 * Encabezado estándar de página: título de 28 px en extra negrita con su total opcional al lado,
 * descripción de una línea y acciones a la derecha. Sin ícono, salvo que se pase `icon`. El total es una
 * cifra del propio listado (por ejemplo, los registros que cumplen el filtro), en números tabulares.
 *
 * @param title Título de la página.
 * @param count Total que se muestra junto al título (cifra y texto, ya formateados; ver `countLabel`).
 * @param description Descripción corta bajo el título.
 * @param actions Botones a la derecha.
 * @param icon Ícono opcional del título.
 * @param className Clases adicionales.
 */
export function PageHeader({
  title,
  count,
  description,
  actions,
  icon,
  className,
}: {
  title: ReactNode;
  count?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  icon?: IconComponent | false;
  className?: string;
}) {
  const Icon = icon || null;

  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="flex items-center gap-2 text-[1.75rem] leading-tight font-extrabold tracking-tight">
            {Icon && <Icon className="size-5 shrink-0" />}
            {title}
          </h1>
          {count !== undefined && <p className="text-muted-foreground text-sm tabular-nums">{count}</p>}
        </div>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
