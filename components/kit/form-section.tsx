import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

/**
 * Sección de formulario o de ficha como tarjeta: marco salvia con esquinas de 32 px y un aro fino; arriba
 * el título de 17 px en negrita con su descripción breve, y el contenido dentro (por ejemplo, `ReadGrid` o
 * una cuadrícula de `FormField` sobre `bg-card`). Las secciones se apilan con su propio espacio.
 *
 * @param title Título de la sección.
 * @param description Descripción breve bajo el título.
 * @param className Clases adicionales.
 * @param children Contenido de la sección.
 */
export function FormSection({ title, description, className, children }: { title: string; description?: string; className?: string; children: ReactNode }) {
  return (
    <section className={cn('bg-frame ring-foreground/5 rounded-4xl px-6.5 py-6 ring-1 dark:ring-foreground/10', className)}>
      <div className="mb-5">
        <h2 className="text-[1.0625rem] font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}
