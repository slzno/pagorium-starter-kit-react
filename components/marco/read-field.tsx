import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

/**
 * Dato de una ficha: la etiqueta pequeña en gris y el valor debajo, sin caja, porque no es un formulario.
 * Por omisión el valor va en mayúsculas, como los demás datos del sistema. Va dentro de un `<dl>` (ver
 * `ReadGrid`) con la misma cuadrícula que el formulario de la entidad. Sin valor muestra «Sin dato».
 *
 * @param label Etiqueta.
 * @param value Valor.
 * @param uppercase Si el valor se muestra en mayúsculas.
 * @param className Clases extra, por ejemplo para ocupar más columnas.
 */
export function ReadField({ label, value, uppercase = true, className }: { label: string; value: ReactNode; uppercase?: boolean; className?: string }) {
  const empty = value === null || value === undefined || value === '';

  return (
    <div className={cn('grid min-w-0 content-start gap-1', className)}>
      <dt className="text-muted-foreground text-xs font-medium">{label}</dt>
      <dd className="text-sm font-semibold break-words tabular-nums">
        {empty ? <span className="text-muted-foreground font-normal">Sin dato</span> : <span className={cn('text-foreground', uppercase && 'uppercase')}>{value}</span>}
      </dd>
    </div>
  );
}

/**
 * Datos de una sección de ficha sobre una tarjeta blanca dentro del marco salvia, en una cuadrícula de
 * tres columnas (dos en tableta, una en celular).
 *
 * @param children Los `ReadField` de la sección.
 */
export function ReadGrid({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card rounded-3xl p-5">
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">{children}</dl>
    </div>
  );
}
