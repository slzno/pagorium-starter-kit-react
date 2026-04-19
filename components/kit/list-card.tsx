import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';

/**
 * Tarjeta de las listas: agrupa la barra de búsqueda y filtros, la tabla y la paginación sobre una
 * superficie salvia, donde cada fila de la tabla es una tarjeta blanca separada (en oscuro, la tarjeta es
 * la superficie y las filas un tono más claro).
 *
 * @param props Props de un `<section>`; `className` se suma a las clases de la tarjeta.
 */
export function ListCard({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      data-slot="list-card"
      className={cn('bg-frame ring-foreground/5 flex flex-col rounded-4xl p-4 ring-1 sm:p-5 dark:ring-foreground/10', className)}
      {...props}
    />
  );
}
