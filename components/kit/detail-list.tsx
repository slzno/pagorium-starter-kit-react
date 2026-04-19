import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

/**
 * Sección de una ficha: título en negrita y la lista de datos (`<dl>`) separada por líneas.
 *
 * @param title Título de la sección.
 * @param children Filas (`DetailRow`).
 * @param className Clases adicionales.
 */
export function DetailSection({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h2 className="pb-2 text-base font-bold">{title}</h2>
      <dl className="divide-y border-t">{children}</dl>
    </section>
  );
}

/**
 * Fila de una ficha: etiqueta y valor en dos columnas. Un valor vacío se muestra como «Sin dato».
 *
 * @param label Etiqueta.
 * @param children Valor.
 */
export function DetailRow({ label, children }: { label: string; children?: ReactNode }) {
  const empty = children === null || children === undefined || children === '';

  return (
    <div className="grid gap-1 py-2.5 sm:grid-cols-3 sm:gap-4">
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className={cn('text-sm break-words sm:col-span-2', empty ? 'text-muted-foreground' : 'font-medium')}>{empty ? 'Sin dato' : children}</dd>
    </div>
  );
}
