import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

/** Cifra de una `MetricSection`. */
export type Metric = {
  key: string;
  label: string;
  value: ReactNode;
  /** Cifra negativa o en alerta: se pinta en rojo. */
  negative?: boolean;
  /** `text` para nombres, direcciones o fechas: letra normal en vez de cifra grande. */
  kind?: 'number' | 'text';
  /** Ocupa dos columnas (direcciones largas). */
  wide?: boolean;
};

/**
 * Sección de cifras a todo el ancho para las fichas: el título y una línea arriba, y debajo las cifras
 * repartidas en columnas (etiqueta en gris y la cifra debajo). Las secciones se apilan, así no quedan
 * huecos cuando una tiene muchas más cifras que otra. Un valor vacío se muestra como «Sin dato».
 *
 * @param title Título de la sección.
 * @param metrics Cifras ya formateadas.
 */
export function MetricSection({ title, metrics }: { title: string; metrics: Metric[] }) {
  return (
    <section className="grid gap-3 border-t pt-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {metrics.map((metric) => {
          const empty = metric.value === null || metric.value === undefined || metric.value === '';

          return (
            <div key={metric.key} className={cn('grid min-w-0 content-start gap-0.5', metric.wide && 'col-span-2')}>
              <dt className="text-muted-foreground text-xs">{metric.label}</dt>
              <dd
                className={cn(
                  'break-words',
                  metric.kind === 'text' ? 'text-sm font-medium' : 'text-base font-semibold tabular-nums',
                  metric.negative && 'text-destructive',
                  empty && 'text-muted-foreground font-normal',
                )}
              >
                {empty ? 'Sin dato' : metric.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
